import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "lib/redux/resumeSlice";
import type { Resume } from "lib/redux/types";
import { deepClone } from "lib/deep-clone";

export const END_HOME_RESUME: Resume = {
  profile: {
    name: "Aarav Mehta",
    summary:
      "Full-stack developer passionate about building scalable and user-friendly web applications.",
    email: "aarav.mehta@example.com",
    phone: "76311****1",
    location: "Bangalore, IN",
    url: "linkedin.com/in/aaravmehta-example",
  },
  workExperiences: [
    {
      company: "TechWave Solutions",
      jobTitle: "Frontend Developer",
      date: "Jun 2022 - Present",
      descriptions: [
        "Built responsive UIs with React and Tailwind CSS, improving engagement by 25%.",
        "Integrated REST APIs and optimized performance by 30%.",
        "Worked with a 5-member team to deliver production features faster.",
      ],
    },
    {
      company: "CloudWorks Systems",
      jobTitle: "Software Developer Intern",
      date: "Jan 2022 - May 2022",
      descriptions: [
        "Developed backend services using Node.js and MongoDB.",
        "Built internal dashboards and automated reporting tools.",
        "Improved accessibility and fixed major UI bugs.",
      ],
    },
    {
      company: "IIT Delhi",
      jobTitle: "Research Assistant",
      date: "Summer 2021",
      descriptions: [
        "Researched text classification models using Python and TensorFlow.",
        "Presented results to a research panel of 15+ faculty members.",
      ],
    },
  ],
  educations: [
    {
      school: "Indian Institute of Technology Delhi",
      degree: "B.Tech in Computer Science and Engineering",
      date: "Aug 2018 - May 2022",
      gpa: "8.7/10",
      descriptions: [
        "Top 10% in class with consistent academic performance.",
        "Led hackathons and coding bootcamps for juniors.",
        "Key courses: DSA, Web Dev, Cloud Computing, AI.",
      ],
    },
  ],
  projects: [
    {
      project: "AI Resume Builder",
      date: "Spring 2023",
      descriptions: [
        "Built a resume builder with live preview and PDF export using React.",
        "Designed a responsive UI for quick and easy resume creation.",
      ],
    },
    {
      project: "SmartTask App",
      date: "Winter 2022",
      descriptions: [
        "Developed a task management app with cloud sync and authentication.",
        "Added progress tracking, improving productivity by 40%.",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "JavaScript", rating: 4 },
      { skill: "React", rating: 4 },
      { skill: "Next.js", rating: 4 },
      { skill: "TypeScript", rating: 3 },
      { skill: "Python", rating: 3 },
      { skill: "Node.js", rating: 3 },
    ],
    descriptions: [
      "Tech: React, Next.js, Node.js, SQL, MongoDB, REST API, Git, Docker",
      "Soft: Communication, Problem Solving, Teamwork, Agile Mindset",
    ],
  },
  custom: {
    descriptions: [],
  },
};

export const START_HOME_RESUME: Resume = {
  profile: deepClone(initialProfile),
  workExperiences: END_HOME_RESUME.workExperiences.map(() =>
    deepClone(initialWorkExperience)
  ),
  educations: [deepClone(initialEducation)],
  projects: END_HOME_RESUME.projects.map(() => deepClone(initialProject)),
  skills: {
    featuredSkills: END_HOME_RESUME.skills.featuredSkills.map((item) => ({
      skill: "",
      rating: item.rating,
    })),
    descriptions: [],
  },
  custom: {
    descriptions: [],
  },
};
