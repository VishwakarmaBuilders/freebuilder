# Resume Import Feature Documentation

## Overview

The Resume Import feature allows users to upload an existing resume (PDF or DOCX format) and automatically extract key information to populate the resume builder form. This streamlines the process of creating a new resume by leveraging existing content.

## Features

### 🎯 Key Capabilities

1. **Multi-Format Support**
   - PDF files (using pdfjs-dist)
   - DOCX files (using mammoth)

2. **Intelligent Data Extraction**
   - Profile information (name, email, phone, location, summary)
   - Work experience (company, job title, dates, responsibilities)
   - Education (school, degree, GPA, dates)
   - Projects (name, dates, descriptions)
   - Skills (featured and detailed lists)

3. **Review & Confirmation**
   - Visual preview of extracted data
   - Section-by-section display
   - Option to cancel and re-upload
   - Confirmation before importing

4. **Privacy-First Design**
   - All processing happens locally in the browser
   - No data is sent to external servers
   - Files are processed in-memory only

## User Workflow

### Step 1: Upload Resume
1. Navigate to `/resume-import`
2. Drag and drop a PDF/DOCX file or click "Browse Files"
3. File is validated for correct format
4. Click "Extract Resume Data"

### Step 2: Review Extracted Data
1. System displays all extracted information organized by sections:
   - Profile Information
   - Work Experience
   - Education
   - Projects
   - Skills
2. User reviews the data for accuracy
3. Warning message reminds users they can edit after importing

### Step 3: Import to Editor
1. Click "Looks Good - Continue to Editor"
2. Data is saved to local storage
3. User is redirected to `/resume-builder`
4. All extracted data is pre-filled in the form
5. User can edit, add, or remove any information

## Technical Implementation

### File Structure

```
src/app/
├── lib/
│   ├── parse-resume-from-pdf/     # Existing PDF parser
│   └── parse-resume-from-docx/    # New DOCX parser
│       └── index.ts
├── components/
│   ├── ResumeDropzone.tsx         # Updated to support PDF & DOCX
│   └── ResumePreview.tsx          # New review component
└── resume-import/
    └── page.tsx                   # Enhanced import workflow
```

### Key Components

#### 1. DOCX Parser (`lib/parse-resume-from-docx/index.ts`)

**Purpose**: Extract structured resume data from DOCX files

**Key Functions**:
- `parseResumeFromDocx(file: File): Promise<Resume>`
- `extractProfile()` - Name, contact info, summary
- `extractWorkExperience()` - Job history
- `extractEducation()` - Academic background
- `extractSkills()` - Technical and soft skills
- `extractProjects()` - Project experience

**Pattern Matching**:
- Email: `/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/`
- Phone: `/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/`
- URL: `/(https?:\/\/[^\s]+)|(www\.[^\s]+)/`
- Date: `/\d{4}\s*-\s*\d{4}/`, `/\d{4}\s*-\s*Present/i`

**Section Detection**:
- Uses keyword matching for section headers
- Supports common variations (e.g., "Experience", "Work History", "Employment")
- Handles bullet points (• and -)

#### 2. ResumePreview Component

**Purpose**: Display extracted data for user review

**Features**:
- Color-coded sections with checkmarks
- Formatted display of all resume sections
- Warning message about potential extraction errors
- Action buttons (Cancel/Confirm)

**Props**:
```typescript
interface ResumePreviewProps {
  resume: Resume;
  onConfirm: () => void;
  onCancel: () => void;
}
```

#### 3. Enhanced ResumeDropzone

**Updates**:
- Accept both `.pdf` and `.docx` files
- Conditional parsing based on file type
- Improved error handling
- Visual feedback during upload

#### 4. Resume Import Page

**State Management**:
```typescript
type ImportStep = "upload" | "review";

const [currentStep, setCurrentStep] = useState<ImportStep>("upload");
const [file, setFile] = useState<File | null>(null);
const [extractedResume, setExtractedResume] = useState<Resume | null>(null);
const [isProcessing, setIsProcessing] = useState(false);
const [error, setError] = useState<string>("");
```

**Workflow States**:
1. **Upload**: File selection and validation
2. **Processing**: Data extraction (with loading indicator)
3. **Review**: Preview extracted data
4. **Confirm**: Save to local storage and redirect

## Dependencies

### New Dependency
```json
"mammoth": "^1.8.0"
```

### Existing Dependencies
- `pdfjs-dist`: ^5.4.394 (PDF parsing)
- `@heroicons/react`: ^2.2.0 (Icons)
- `next`: 16.0.1 (Framework)

## Data Flow

```
User uploads file
      ↓
File validation (PDF or DOCX?)
      ↓
Parse file (parseResumeFromPdf or parseResumeFromDocx)
      ↓
Extract structured data → Resume object
      ↓
Display in ResumePreview component
      ↓
User reviews and confirms
      ↓
Save to localStorage
      ↓
Redirect to /resume-builder with pre-filled data
```

## Error Handling

### Upload Errors
- Invalid file format → "Please upload a PDF or DOCX file"
- File read failure → "Failed to read file"

### Parsing Errors
- PDF parsing failure → Uses existing error handling
- DOCX parsing failure → "Failed to parse DOCX file. Please ensure it's a valid resume document."

### User Feedback
- Loading spinner during extraction
- Clear error messages in red alert boxes
- Success indicators on review page

## Best Practices for Users

### For Best Extraction Results:
1. **Use single-column resume layouts**
2. **Include clear section headers** (Experience, Education, Skills, etc.)
3. **Use standard formats for dates** (2020-2023, Jan 2020 - Present)
4. **Include contact information at the top**
5. **Use bullet points for descriptions**

### Common Issues:
- Multi-column layouts may cause incorrect parsing
- Non-standard section headers may not be recognized
- Heavy formatting may affect text extraction
- Embedded images or charts are not processed

## Future Enhancements

### Potential Improvements:
1. **AI-Enhanced Parsing**
   - Use LLM to better understand context
   - Improve accuracy for non-standard formats

2. **Multi-Column Support**
   - Enhanced layout detection
   - Better handling of complex designs

3. **Additional Formats**
   - RTF support
   - Google Docs integration
   - LinkedIn profile import

4. **Smart Suggestions**
   - Recommend improvements to extracted content
   - Suggest missing sections
   - Optimize bullet points

5. **Batch Import**
   - Import multiple resumes
   - Merge information from different sources

## Testing

### Manual Testing Checklist:
- [ ] Upload PDF resume
- [ ] Upload DOCX resume
- [ ] Verify all sections are extracted
- [ ] Check contact information accuracy
- [ ] Verify work experience dates and descriptions
- [ ] Confirm education details
- [ ] Test with multi-column resume (should show limitations)
- [ ] Test with minimal resume (only name and email)
- [ ] Test error handling (invalid file, corrupted file)
- [ ] Verify data persistence to local storage
- [ ] Confirm smooth transition to resume builder

### Test Files Needed:
1. Simple single-column PDF
2. Simple single-column DOCX
3. Complex multi-column PDF
4. Resume with minimal information
5. Resume with all sections filled
6. Invalid/corrupted files

## Security & Privacy

### Data Protection:
- ✅ All processing happens client-side
- ✅ No server uploads
- ✅ No external API calls
- ✅ Files stored temporarily in browser memory only
- ✅ Data saved only to localStorage (user's browser)
- ✅ No analytics or tracking of resume content

### Browser Compatibility:
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Limited (file upload may vary)

## Troubleshooting

### Common Issues & Solutions:

**Issue**: "Only PDF and DOCX files are supported"
- **Solution**: Ensure file has correct extension (.pdf or .docx)

**Issue**: Extraction failed
- **Solution**: 
  1. Try saving resume in different format
  2. Ensure resume is not password-protected
  3. Check if file is corrupted

**Issue**: Missing information in preview
- **Solution**: 
  1. Manually add missing info in the editor
  2. Ensure original resume has clear section headers
  3. Use standard resume format

**Issue**: Incorrect dates or formatting
- **Solution**: Edit in the resume builder after import

## Support

For issues or questions:
1. Check this documentation
2. Review the component code comments
3. Test with a simple resume first
4. Report bugs with sample file (if not confidential)
