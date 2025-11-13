import { Resume } from "lib/redux/types";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface ResumePreviewProps {
  resume: Resume;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResumePreview = ({ resume, onConfirm, onCancel }: ResumePreviewProps) => {
  const hasData = (section: any[] | string | { descriptions: string[] }): boolean => {
    if (Array.isArray(section)) return section.length > 0;
    if (typeof section === "object" && "descriptions" in section) {
      return section.descriptions.length > 0;
    }
    return Boolean(section);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Review Extracted Data</h2>
        <p className="mt-2 text-sm text-gray-600">
          Please review the information extracted from your resume. You can edit it after importing.
        </p>
      </div>

      {/* Profile Section */}
      <div className="mb-6">
        <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900">
          <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
          Profile Information
        </h3>
        <div className="ml-7 space-y-2 rounded-lg bg-gray-50 p-4">
          <PreviewField label="Name" value={resume.profile.name} />
          <PreviewField label="Email" value={resume.profile.email} />
          <PreviewField label="Phone" value={resume.profile.phone} />
          <PreviewField label="Location" value={resume.profile.location} />
          <PreviewField label="Website/LinkedIn" value={resume.profile.url} />
          <PreviewField label="Summary" value={resume.profile.summary} multiline />
        </div>
      </div>

      {/* Work Experience Section */}
      {hasData(resume.workExperiences) && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900">
            <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
            Work Experience ({resume.workExperiences.length})
          </h3>
          <div className="ml-7 space-y-4">
            {resume.workExperiences.map((exp, idx) => (
              <div key={idx} className="rounded-lg bg-gray-50 p-4">
                <PreviewField label="Company" value={exp.company} bold />
                <PreviewField label="Job Title" value={exp.jobTitle} />
                <PreviewField label="Date" value={exp.date} />
                {exp.descriptions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Responsibilities:</p>
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      {exp.descriptions.map((desc, i) => (
                        <li key={i} className="text-sm text-gray-600">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {hasData(resume.educations) && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900">
            <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
            Education ({resume.educations.length})
          </h3>
          <div className="ml-7 space-y-4">
            {resume.educations.map((edu, idx) => (
              <div key={idx} className="rounded-lg bg-gray-50 p-4">
                <PreviewField label="School" value={edu.school} bold />
                <PreviewField label="Degree" value={edu.degree} />
                <PreviewField label="Date" value={edu.date} />
                <PreviewField label="GPA" value={edu.gpa} />
                {edu.descriptions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Details:</p>
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      {edu.descriptions.map((desc, i) => (
                        <li key={i} className="text-sm text-gray-600">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {hasData(resume.projects) && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900">
            <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
            Projects ({resume.projects.length})
          </h3>
          <div className="ml-7 space-y-4">
            {resume.projects.map((proj, idx) => (
              <div key={idx} className="rounded-lg bg-gray-50 p-4">
                <PreviewField label="Project Name" value={proj.project} bold />
                <PreviewField label="Date" value={proj.date} />
                {proj.descriptions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Description:</p>
                    <ul className="ml-4 mt-1 list-disc space-y-1">
                      {proj.descriptions.map((desc, i) => (
                        <li key={i} className="text-sm text-gray-600">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {hasData(resume.skills) && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900">
            <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
            Skills
          </h3>
          <div className="ml-7 space-y-3 rounded-lg bg-gray-50 p-4">
            {resume.skills.featuredSkills.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Featured Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.featuredSkills
                    .filter((s) => s.skill)
                    .map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                      >
                        {skill.skill}
                      </span>
                    ))}
                </div>
              </div>
            )}
            {resume.skills.descriptions.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">All Skills:</p>
                <div className="space-y-1">
                  {resume.skills.descriptions.map((desc, idx) => (
                    <p key={idx} className="text-sm text-gray-600">
                      • {desc}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Warning for missing data */}
      <div className="mb-6 rounded-lg bg-yellow-50 p-4">
        <div className="flex">
          <XCircleIcon className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Note</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Some information may not be perfectly extracted. You'll be able to edit and
                add missing details in the next step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Cancel & Re-upload
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="btn-primary"
        >
          Looks Good - Continue to Editor →
        </button>
      </div>
    </div>
  );
};

const PreviewField = ({
  label,
  value,
  bold = false,
  multiline = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  multiline?: boolean;
}) => {
  if (!value) return null;

  return (
    <div className={multiline ? "space-y-1" : "flex items-start gap-2"}>
      <span className="text-sm font-medium text-gray-700">{label}:</span>
      <span
        className={`text-sm text-gray-600 ${bold ? "font-semibold text-gray-900" : ""} ${
          multiline ? "block" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
};
