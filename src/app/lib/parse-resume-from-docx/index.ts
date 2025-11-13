import mammoth from "mammoth";
import type { Resume } from "lib/redux/types";
import { 
  initialProfile,
  initialSkills,
  initialCustom,
  initialWorkExperience,
  initialEducation,
  initialProject
} from "lib/redux/resumeSlice";
import { deepClone } from "lib/deep-clone";

/**
 * Resume parser utility that parses a resume from a DOCX file
 * 
 * This parser extracts text from DOCX and attempts to identify
 * resume sections based on common patterns and keywords.
 */
export const parseResumeFromDocx = async (file: File): Promise<Resume> => {
  try {
    // Convert DOCX to plain text
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const text = result.value;

    // Initialize resume with default values
    const resume: Resume = {
      profile: deepClone(initialProfile),
      workExperiences: [],
      educations: [],
      projects: [],
      skills: deepClone(initialSkills),
      custom: deepClone(initialCustom),
    };

    // Split text into lines
    const lines = text.split("\n").map((line: string) => line.trim()).filter((line: string) => line.length > 0);

    // Extract profile information
    extractProfile(lines, resume);

    // Extract sections
    extractWorkExperience(lines, resume);
    extractEducation(lines, resume);
    extractSkills(lines, resume);
    extractProjects(lines, resume);

    // Ensure all array sections have at least one empty entry
    // This allows users to manually add data even when parsing finds nothing
    if (resume.workExperiences.length === 0) {
      resume.workExperiences.push(deepClone(initialWorkExperience));
    }
    if (resume.educations.length === 0) {
      resume.educations.push(deepClone(initialEducation));
    }
    if (resume.projects.length === 0) {
      resume.projects.push(deepClone(initialProject));
    }

    return resume;
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    throw new Error("Failed to parse DOCX file. Please ensure it's a valid resume document.");
  }
};

/**
 * Extract profile information (name, email, phone, location, summary)
 */
function extractProfile(lines: string[], resume: Resume) {
  // Name is typically the first line or first few lines
  if (lines.length > 0) {
    resume.profile.name = lines[0];
  }

  // Email pattern
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  
  // Phone pattern (various formats)
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  
  // URL pattern
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|org|net|io|dev|me)[^\s]*)/;

  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i];
    
    // Extract email
    const emailMatch = line.match(emailRegex);
    if (emailMatch && !resume.profile.email) {
      resume.profile.email = emailMatch[0];
    }

    // Extract phone
    const phoneMatch = line.match(phoneRegex);
    if (phoneMatch && !resume.profile.phone) {
      resume.profile.phone = phoneMatch[0];
    }

    // Extract URL
    const urlMatch = line.match(urlRegex);
    if (urlMatch && !resume.profile.url) {
      resume.profile.url = urlMatch[0].startsWith("http") ? urlMatch[0] : `https://${urlMatch[0]}`;
    }

    // Location keywords
    if (!resume.profile.location && (
      line.toLowerCase().includes("location:") ||
      /\b(city|state|country)\b/i.test(line) ||
      /[A-Z][a-z]+,\s*[A-Z]{2}/i.test(line) // City, ST format
    )) {
      resume.profile.location = line.replace(/location:/i, "").trim();
    }
  }

  // Extract summary/objective
  const summaryKeywords = ["summary", "objective", "about", "profile", "overview"];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (summaryKeywords.some((keyword) => line.includes(keyword))) {
      // Get next few lines as summary
      const summaryLines = [];
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        if (isSectionHeader(lines[j])) break;
        summaryLines.push(lines[j]);
      }
      if (summaryLines.length > 0) {
        resume.profile.summary = summaryLines.join(" ");
      }
      break;
    }
  }
}

/**
 * Extract work experience
 */
function extractWorkExperience(lines: string[], resume: Resume) {
  const keywords = ["experience", "work history", "employment", "professional experience"];
  const sectionStart = findSectionStart(lines, keywords);
  
  if (sectionStart === -1) return;

  let currentExperience: any = null;
  
  for (let i = sectionStart + 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Stop if we hit another section
    if (isSectionHeader(line) && !keywords.some((k) => line.toLowerCase().includes(k))) {
      break;
    }

    // Check if this is a new job entry (company or job title)
    if (line.length > 0 && !line.startsWith("•") && !line.startsWith("-")) {
      if (currentExperience && currentExperience.company) {
        resume.workExperiences.push(currentExperience);
      }
      
      currentExperience = {
        company: line,
        jobTitle: "",
        date: "",
        descriptions: [],
      };

      // Check next line for job title or date
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (containsDate(nextLine)) {
          currentExperience.date = extractDate(nextLine);
        } else if (!nextLine.startsWith("•") && !nextLine.startsWith("-")) {
          currentExperience.jobTitle = nextLine;
          i++;
          
          // Check line after that for date
          if (i + 1 < lines.length && containsDate(lines[i + 1])) {
            currentExperience.date = extractDate(lines[i + 1]);
            i++;
          }
        }
      }
    } else if (line.startsWith("•") || line.startsWith("-")) {
      // This is a bullet point
      if (currentExperience) {
        currentExperience.descriptions.push(line.replace(/^[•\-]\s*/, ""));
      }
    }
  }

  // Add the last experience
  if (currentExperience && currentExperience.company) {
    resume.workExperiences.push(currentExperience);
  }
}

/**
 * Extract education
 */
function extractEducation(lines: string[], resume: Resume) {
  const keywords = ["education", "academic", "qualification"];
  const sectionStart = findSectionStart(lines, keywords);
  
  if (sectionStart === -1) return;

  let currentEducation: any = null;
  
  for (let i = sectionStart + 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Stop if we hit another section
    if (isSectionHeader(line) && !keywords.some((k) => line.toLowerCase().includes(k))) {
      break;
    }

    // Check if this is a new education entry
    if (line.length > 0 && !line.startsWith("•") && !line.startsWith("-")) {
      if (currentEducation && currentEducation.school) {
        resume.educations.push(currentEducation);
      }
      
      currentEducation = {
        school: line,
        degree: "",
        date: "",
        gpa: "",
        descriptions: [],
      };

      // Check next line for degree or date
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        if (containsDate(nextLine)) {
          currentEducation.date = extractDate(nextLine);
        } else if (!nextLine.startsWith("•") && !nextLine.startsWith("-")) {
          currentEducation.degree = nextLine;
          i++;
          
          // Check for GPA or date in next line
          if (i + 1 < lines.length) {
            const followingLine = lines[i + 1];
            if (followingLine.toLowerCase().includes("gpa")) {
              currentEducation.gpa = followingLine;
              i++;
            } else if (containsDate(followingLine)) {
              currentEducation.date = extractDate(followingLine);
              i++;
            }
          }
        }
      }
    } else if (line.startsWith("•") || line.startsWith("-")) {
      // This is a bullet point
      if (currentEducation) {
        currentEducation.descriptions.push(line.replace(/^[•\-]\s*/, ""));
      }
    }
  }

  // Add the last education
  if (currentEducation && currentEducation.school) {
    resume.educations.push(currentEducation);
  }
}

/**
 * Extract skills
 */
function extractSkills(lines: string[], resume: Resume) {
  const keywords = ["skills", "technical skills", "core competencies", "expertise"];
  const sectionStart = findSectionStart(lines, keywords);
  
  if (sectionStart === -1) return;

  const skillDescriptions: string[] = [];
  
  for (let i = sectionStart + 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Stop if we hit another section
    if (isSectionHeader(line) && !keywords.some((k) => line.toLowerCase().includes(k))) {
      break;
    }

    if (line.length > 0) {
      // Remove bullets and add to descriptions
      const cleanedLine = line.replace(/^[•\-]\s*/, "");
      skillDescriptions.push(cleanedLine);
    }
  }

  resume.skills.descriptions = skillDescriptions;

  // Try to extract featured skills (first few skills)
  const featuredSkills = skillDescriptions.slice(0, 6).map((skill) => ({
    skill: skill.split(",")[0].split(":")[0].trim(),
    rating: 4,
  }));
  
  resume.skills.featuredSkills = featuredSkills;
}

/**
 * Extract projects
 */
function extractProjects(lines: string[], resume: Resume) {
  const keywords = ["projects", "personal projects", "key projects", "portfolio"];
  const sectionStart = findSectionStart(lines, keywords);
  
  if (sectionStart === -1) return;

  let currentProject: any = null;
  
  for (let i = sectionStart + 1; i < lines.length; i++) {
    const line = lines[i];
    
    // Stop if we hit another section
    if (isSectionHeader(line) && !keywords.some((k) => line.toLowerCase().includes(k))) {
      break;
    }

    // Check if this is a new project entry
    if (line.length > 0 && !line.startsWith("•") && !line.startsWith("-")) {
      if (currentProject && currentProject.project) {
        resume.projects.push(currentProject);
      }
      
      currentProject = {
        project: line,
        date: "",
        descriptions: [],
      };

      // Check next line for date
      if (i + 1 < lines.length && containsDate(lines[i + 1])) {
        currentProject.date = extractDate(lines[i + 1]);
        i++;
      }
    } else if (line.startsWith("•") || line.startsWith("-")) {
      // This is a bullet point
      if (currentProject) {
        currentProject.descriptions.push(line.replace(/^[•\-]\s*/, ""));
      }
    }
  }

  // Add the last project
  if (currentProject && currentProject.project) {
    resume.projects.push(currentProject);
  }
}

/**
 * Helper: Find the start of a section by keywords
 */
function findSectionStart(lines: string[], keywords: string[]): number {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (keywords.some((keyword) => line.includes(keyword))) {
      return i;
    }
  }
  return -1;
}

/**
 * Helper: Check if a line is a section header
 */
function isSectionHeader(line: string): boolean {
  const sectionKeywords = [
    "experience", "education", "skills", "projects", "summary",
    "objective", "certifications", "awards", "languages", "interests",
    "references", "publications", "volunteer"
  ];
  
  const lowerLine = line.toLowerCase();
  return sectionKeywords.some((keyword) => 
    lowerLine === keyword || 
    lowerLine.startsWith(keyword + ":") ||
    lowerLine.endsWith(keyword)
  ) && line.length < 50;
}

/**
 * Helper: Check if line contains a date
 */
function containsDate(line: string): boolean {
  // Check for common date patterns
  const datePatterns = [
    /\d{4}\s*-\s*\d{4}/,  // 2020 - 2023
    /\d{4}\s*-\s*Present/i,  // 2020 - Present
    /[A-Z][a-z]+\s+\d{4}/,  // January 2020
    /\d{1,2}\/\d{4}/,  // 01/2020
  ];
  
  return datePatterns.some((pattern) => pattern.test(line));
}

/**
 * Helper: Extract date from line
 */
function extractDate(line: string): string {
  // Try to extract just the date portion
  const dateMatch = line.match(/\d{4}\s*-\s*(?:\d{4}|Present)/i) ||
                    line.match(/[A-Z][a-z]+\s+\d{4}\s*-\s*(?:[A-Z][a-z]+\s+\d{4}|Present)/i) ||
                    line.match(/\d{1,2}\/\d{4}\s*-\s*(?:\d{1,2}\/\d{4}|Present)/i);
  
  return dateMatch ? dateMatch[0] : line;
}
