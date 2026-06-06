import { Resume } from "@/types/resume";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import React from "react";

interface ResumePreviewProps {
  data: Resume;
}

export const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data }, ref) => {
    const {
      personalInfo,
      summary,
      experience,
      education,
      technicalSkills,
      softSkills,
      languages,
      certifications,
    } = data;

    const hasContactInfo =
      personalInfo.email ||
      personalInfo.phone ||
      personalInfo.location ||
      personalInfo.linkedin ||
      personalInfo.website;

    return (
      <div
        ref={ref}
        className="resume-preview-print bg-white text-gray-900 w-[210mm] min-h-[297mm] p-[10mm] shadow-lg overflow-hidden flex flex-col font-sans"
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 uppercase">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-xl text-primary mt-1 font-medium">
            {personalInfo.jobTitle || "Job Title"}
          </p>

          {hasContactInfo && (
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mt-4 text-sm text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-5">
          {summary && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-200 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                {summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-200 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-md font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-sm text-gray-700 font-medium">
                          {exp.company}{exp.city ? `, ${exp.city}` : ""}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 font-medium whitespace-nowrap">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="mt-1.5 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-200 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                      <p className="text-sm text-gray-700 font-medium">{edu.institution}</p>
                      {edu.gpa && <p className="text-xs text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-sm text-gray-500 font-medium whitespace-nowrap">
                      {edu.year}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-5">
              {(technicalSkills.length > 0 || softSkills.length > 0) && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-200 pb-1 mb-3">
                    Skills
                  </h2>
                  {technicalSkills.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase">Technical</p>
                      <div className="flex flex-wrap gap-1.5">
                        {technicalSkills.map((skill, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 rounded-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {softSkills.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase">Professional</p>
                      <div className="flex flex-wrap gap-1.5">
                        {softSkills.map((skill, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 text-gray-700 border border-gray-200 rounded-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>

            <div className="space-y-5">
              {languages.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-200 pb-1 mb-3">
                    Languages
                  </h2>
                  <div className="space-y-1.5">
                    {languages.map((lang, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{lang.name}</span>
                        <span className="text-xs text-gray-500">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {certifications.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-gray-900 uppercase border-b-2 border-gray-200 pb-1 mb-3">
                    Certifications
                  </h2>
                  <div className="space-y-2.5">
                    {certifications.map((cert, i) => (
                      <div key={i}>
                        <h3 className="text-sm font-semibold text-gray-900">{cert.name}</h3>
                        <div className="flex justify-between items-center mt-0.5">
                          <span className="text-xs text-gray-600">{cert.issuer}</span>
                          <span className="text-xs text-gray-500 font-medium">{cert.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
ResumePreview.displayName = "ResumePreview";
