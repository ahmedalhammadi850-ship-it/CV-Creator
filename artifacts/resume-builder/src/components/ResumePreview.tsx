import { Resume } from "@/types/resume";
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
        className="bg-white text-gray-900 w-[210mm] min-h-[297mm] p-[15mm] flex flex-col"
        style={{ boxSizing: "border-box", fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {/* Header */}
        <header className="text-center mb-5 pb-4 border-b-2 border-[#1e3a5f]">
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "#1e3a5f", marginBottom: "4px" }}>
            {personalInfo.fullName || "الاسم الكامل"}
          </h1>
          {personalInfo.jobTitle && (
            <p style={{ fontSize: "13px", color: "#3b5f8a", marginBottom: "6px", fontWeight: "500" }}>
              {personalInfo.jobTitle}
            </p>
          )}
          {hasContactInfo && (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 14px", fontSize: "11px", color: "#444" }}>
              {personalInfo.email && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Mail size={11} />{personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Phone size={11} />{personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPin size={11} />{personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Linkedin size={11} />
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                </span>
              )}
              {personalInfo.github && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Github size={11} />
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                </span>
              )}
              {personalInfo.website && (
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Globe size={11} />
                  {personalInfo.website.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              )}
            </div>
          )}
        </header>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "11px" }}>

          {/* Professional Summary */}
          {summary && (
            <section>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e3a5f", paddingBottom: "3px", marginBottom: "6px" }}>
                Professional Summary
              </h2>
              <p style={{ lineHeight: "1.6", color: "#333", fontSize: "11px" }}>{summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <section>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e3a5f", paddingBottom: "3px", marginBottom: "6px" }}>
                Work Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {experience.map((exp, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ fontWeight: "bold", fontSize: "11px", color: "#111" }}>{exp.title}</p>
                        <p style={{ fontSize: "11px", color: "#3b5f8a", fontWeight: "600" }}>
                          {exp.company}{exp.city ? `, ${exp.city}` : ""}
                        </p>
                      </div>
                      <p style={{ fontSize: "11px", color: "#666", whiteSpace: "nowrap" }}>
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <p style={{ marginTop: "4px", fontSize: "11px", color: "#444", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
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
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e3a5f", paddingBottom: "3px", marginBottom: "6px" }}>
                Projects
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {projects.map((proj, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={{ fontWeight: "bold", fontSize: "11px", color: "#111" }}>{proj.name}</p>
                      {proj.year && <p style={{ fontSize: "11px", color: "#666" }}>{proj.year}</p>}
                    </div>
                    {proj.technologies && (
                      <p style={{ fontSize: "11px", color: "#3b5f8a", fontStyle: "italic", marginTop: "2px" }}>
                        {proj.technologies}
                      </p>
                    )}
                    {proj.description && (
                      <p style={{ marginTop: "3px", fontSize: "11px", color: "#444", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
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
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e3a5f", paddingBottom: "3px", marginBottom: "6px" }}>
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {education.map((edu, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontWeight: "bold", fontSize: "11px", color: "#111" }}>
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p style={{ fontSize: "11px", color: "#3b5f8a", fontWeight: "600" }}>{edu.institution}</p>
                      {edu.gpa && (
                        <p style={{ fontSize: "11px", color: "#666" }}>GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <p style={{ fontSize: "11px", color: "#666" }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {(technicalSkills.length > 0 || softSkills.length > 0) && (
            <section>
              <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e3a5f", paddingBottom: "3px", marginBottom: "6px" }}>
                Skills
              </h2>
              {technicalSkills.length > 0 && (
                <div style={{ marginBottom: "6px" }}>
                  <p style={{ fontSize: "11px", fontWeight: "bold", color: "#555", marginBottom: "4px" }}>Technical Skills:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {technicalSkills.map((s, i) => (
                      <span key={i} style={{ fontSize: "11px", padding: "2px 8px", backgroundColor: "#e8f0f7", color: "#1e3a5f", borderRadius: "3px", fontWeight: "500" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {softSkills.length > 0 && (
                <div>
                  <p style={{ fontSize: "11px", fontWeight: "bold", color: "#555", marginBottom: "4px" }}>Soft Skills:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {softSkills.map((s, i) => (
                      <span key={i} style={{ fontSize: "11px", padding: "2px 8px", border: "1px solid #ccc", color: "#555", borderRadius: "3px" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Languages + Certifications */}
          {(languages.length > 0 || certifications.length > 0) && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {languages.length > 0 && (
                <section>
                  <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e3a5f", paddingBottom: "3px", marginBottom: "6px" }}>
                    Languages
                  </h2>
                  {languages.map((lang, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                      <span style={{ color: "#111" }}>{lang.name}</span>
                      <span style={{ color: "#666" }}>{lang.proficiency}</span>
                    </div>
                  ))}
                </section>
              )}
              {certifications.length > 0 && (
                <section>
                  <h2 style={{ fontSize: "12px", fontWeight: "bold", color: "#1e3a5f", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e3a5f", paddingBottom: "3px", marginBottom: "6px" }}>
                    Certifications
                  </h2>
                  {certifications.map((cert, i) => (
                    <div key={i} style={{ marginBottom: "5px" }}>
                      <p style={{ fontSize: "11px", fontWeight: "bold", color: "#111" }}>{cert.name}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#666" }}>
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
