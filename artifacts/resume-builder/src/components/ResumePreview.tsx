import { Resume } from "@/types/resume";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";
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
      projects,
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
      personalInfo.github ||
      personalInfo.website;

    return (
      <div
        ref={ref}
        className="resume-preview-print bg-white text-gray-900 w-[210mm] min-h-[297mm] p-[12mm] flex flex-col font-sans"
        style={{ boxSizing: "border-box" }}
      >
        {/* Header */}
        <header className="text-center mb-5 pb-4 border-b-2 border-[#1e3a5f]">
          <h1 className="text-3xl font-bold tracking-tight text-[#1e3a5f]">
            {personalInfo.fullName || "الاسم الكامل"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-base text-[#3b5f8a] mt-1 font-medium">
              {personalInfo.jobTitle}
            </p>
          )}
          {hasContactInfo && (
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-3 text-xs text-gray-600">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />{personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />{personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3" />
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3" />
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {personalInfo.website.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              )}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4 text-sm">

          {/* Professional Summary */}
          {summary && (
            <section>
              <h2 className="text-[11px] font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-[#1e3a5f] pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="leading-relaxed text-gray-700 text-[11px]">{summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-[#1e3a5f] pb-1 mb-2">
                Work Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-[11px] text-gray-900">{exp.title}</p>
                        <p className="text-[10px] text-[#3b5f8a] font-medium">
                          {exp.company}{exp.city ? `, ${exp.city}` : ""}
                        </p>
                      </div>
                      <p className="text-[10px] text-gray-500 whitespace-nowrap">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="mt-1 text-[10px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-[#1e3a5f] pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-[11px] text-gray-900">{proj.name}</p>
                      {proj.year && (
                        <p className="text-[10px] text-gray-500">{proj.year}</p>
                      )}
                    </div>
                    {proj.technologies && (
                      <p className="text-[10px] text-[#3b5f8a] italic mt-0.5">
                        {proj.technologies}
                      </p>
                    )}
                    {proj.description && (
                      <p className="mt-1 text-[10px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-[#1e3a5f] pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-[11px] text-gray-900">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className="text-[10px] text-[#3b5f8a] font-medium">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-[10px] text-gray-500">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(technicalSkills.length > 0 || softSkills.length > 0) && (
            <section>
              <h2 className="text-[11px] font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-[#1e3a5f] pb-1 mb-2">
                Skills
              </h2>
              {technicalSkills.length > 0 && (
                <div className="mb-2">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Technical</p>
                  <div className="flex flex-wrap gap-1">
                    {technicalSkills.map((s, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 bg-[#e8f0f7] text-[#1e3a5f] rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {softSkills.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Soft Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {softSkills.map((s, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 border border-gray-200 text-gray-600 rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Languages + Certifications side by side */}
          {(languages.length > 0 || certifications.length > 0) && (
            <div className="grid grid-cols-2 gap-4">
              {languages.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-[#1e3a5f] pb-1 mb-2">
                    Languages
                  </h2>
                  {languages.map((lang, i) => (
                    <div key={i} className="flex justify-between text-[10px]">
                      <span className="text-gray-900">{lang.name}</span>
                      <span className="text-gray-500">{lang.proficiency}</span>
                    </div>
                  ))}
                </section>
              )}
              {certifications.length > 0 && (
                <section>
                  <h2 className="text-[11px] font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-[#1e3a5f] pb-1 mb-2">
                    Certifications
                  </h2>
                  {certifications.map((cert, i) => (
                    <div key={i} className="mb-1">
                      <p className="text-[10px] font-bold text-gray-900">{cert.name}</p>
                      <div className="flex justify-between text-[9px] text-gray-500">
                        <span>{cert.issuer}</span>
                        <span>{cert.year}</span>
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
