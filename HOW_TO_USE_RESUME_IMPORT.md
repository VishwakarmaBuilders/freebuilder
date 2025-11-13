# How to Use Resume Import Feature

## Quick Start Guide

### Step 1: Access the Import Page

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Resume Import page:
   - URL: `http://localhost:3000/resume-import`
   - Or click "Import Resume" from the home page

### Step 2: Upload Your Resume

**Option A: Drag & Drop**
- Drag your resume file (PDF or DOCX) onto the upload area
- File will be validated automatically

**Option B: Browse Files**
- Click the "Browse Files" button
- Select your PDF or DOCX resume from your computer
- Click "Open"

### Step 3: Extract Data

1. After selecting a file, you'll see:
   - File name and size
   - "Extract Resume Data" button

2. Click "Extract Resume Data"
   - A loading spinner will appear
   - Processing takes 2-10 seconds depending on file size

### Step 4: Review Extracted Information

The system will display all extracted data in organized sections:

#### ✓ Profile Information
- Name
- Email
- Phone number
- Location
- Website/LinkedIn
- Professional summary

#### ✓ Work Experience
- Company name
- Job title
- Employment dates
- Responsibilities (bullet points)

#### ✓ Education
- School/University name
- Degree
- GPA (if present)
- Graduation date
- Additional details

#### ✓ Projects
- Project name
- Dates
- Project descriptions

#### ✓ Skills
- Featured skills (top 6)
- Complete skills list

### Step 5: Confirm or Re-upload

**If the data looks good:**
- Click "Looks Good - Continue to Editor →"
- You'll be redirected to the resume builder
- All data will be pre-filled
- You can edit any field as needed

**If you want to try a different file:**
- Click "Cancel & Re-upload"
- You'll return to the upload screen
- Upload a different file

### Step 6: Edit in Resume Builder

After importing:
1. Review all sections in the form editor (left side)
2. See live preview of your resume (right side)
3. Edit any information:
   - Click on any field to modify
   - Add new entries (work experience, education, etc.)
   - Remove unwanted sections
   - Rearrange items
4. Customize the theme and styling
5. Download your polished resume

## Tips for Best Results

### ✅ Do:
- Use clear, standard section headers (Experience, Education, Skills)
- Keep a single-column layout
- Use standard date formats (2020-2023, Jan 2020-Present)
- Include contact info at the top of your resume
- Use bullet points for descriptions

### ❌ Avoid:
- Multi-column layouts (may cause parsing errors)
- Heavy formatting or complex designs
- Password-protected files
- Scanned images of resumes (text must be selectable)
- Non-standard section names

## Troubleshooting

### "Only PDF and DOCX files are supported"
**Problem**: Wrong file format
**Solution**: Convert your resume to PDF or DOCX format

### "Failed to extract resume data"
**Problem**: File is corrupted or unreadable
**Solution**: 
1. Try saving as a different format
2. Check if file opens normally on your computer
3. Create a new version of the file

### Missing Information in Preview
**Problem**: Parser couldn't find certain sections
**Solution**: 
1. Don't worry! You can add it manually in the editor
2. Check that your original resume has clear section headers
3. Ensure the missing info is in a standard format

### Incorrect Dates or Formatting
**Problem**: Date parsing didn't work perfectly
**Solution**: Simply edit the dates in the resume builder

### No Contact Information Extracted
**Problem**: Contact info not in expected location/format
**Solution**: Manually add it in the Profile section of the editor

## Example: Sample Resume Structure

Here's what the parser works best with:

```
John Doe
john.doe@email.com | (555) 123-4567 | New York, NY
linkedin.com/in/johndoe

SUMMARY
Experienced software engineer with 5+ years...

EXPERIENCE

Software Engineer
Tech Company Inc. | 2020 - Present
• Developed and maintained web applications
• Led team of 3 developers
• Improved performance by 40%

Junior Developer  
Startup LLC | 2018 - 2020
• Built responsive user interfaces
• Collaborated with cross-functional teams

EDUCATION

Bachelor of Science in Computer Science
University Name | 2014 - 2018
GPA: 3.8/4.0
• Dean's List all semesters

SKILLS

JavaScript, React, Node.js, Python, SQL
Git, Docker, AWS, Agile methodologies

PROJECTS

E-commerce Platform | 2023
• Built full-stack shopping application
• Integrated payment processing
```

## FAQs

**Q: Is my resume data secure?**
A: Yes! All processing happens locally in your browser. No data is uploaded to any server.

**Q: Can I import from LinkedIn?**
A: Not yet, but this is a planned feature. For now, download your LinkedIn profile as PDF.

**Q: What if the extraction is inaccurate?**
A: You can edit everything in the resume builder after importing. The import just saves you time typing.

**Q: Can I import multiple resumes?**
A: Currently, you can import one at a time. Each import will override the previous data.

**Q: Does it work with creative/designed resumes?**
A: It works best with traditional, text-based resumes. Heavily designed resumes may not parse accurately.

**Q: My resume is in another format (RTF, TXT)**
A: Convert it to PDF or DOCX first using your word processor or an online converter.

**Q: Can I edit the data before importing?**
A: Not in the preview screen, but you can edit everything after clicking "Continue to Editor."

## Getting Help

If you encounter issues:

1. **Check the documentation**: Read `RESUME_IMPORT_FEATURE.md` for technical details
2. **Try a simpler resume**: Test with a basic, single-column resume first
3. **Manual entry**: You can always create your resume from scratch if import doesn't work
4. **Report bugs**: If you find a consistent issue, report it with (non-confidential) examples

## Next Steps

After successfully importing your resume:

1. ✏️ **Edit & Enhance** - Polish your content in the editor
2. 🎨 **Customize Design** - Choose colors, fonts, and layout
3. 📄 **Preview** - See your resume in real-time
4. 💾 **Download** - Export as PDF when ready
5. 🔄 **Iterate** - Make updates anytime (data saved in browser)

---

**Ready to get started?**

Visit `http://localhost:3000/resume-import` and upload your resume!
