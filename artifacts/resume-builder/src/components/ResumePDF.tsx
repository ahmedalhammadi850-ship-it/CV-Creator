import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Resume } from "@/types/resume";

Font.register({
  family: "Amiri",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.woff2",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/amiri/v27/J7acnpd8CGxBHpUutLMA7w.woff2",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: "15mm 15mm 15mm 15mm",
    fontFamily: "Amiri",
    fontSize: 10,
    color: "#1a1a2e",
    backgroundColor: "#ffffff",
  },
  header: {
    textAlign: "center",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#1e3a5f",
    borderBottomStyle: "solid",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a5f",
    marginBottom: 3,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 12,
    color: "#3b5f8a",
    marginBottom: 6,
    textAlign: "center",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  contactItem: {
    fontSize: 8.5,
    color: "#444",
    marginHorizontal: 5,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e3a5f",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#1e3a5f",
    borderBottomStyle: "solid",
    paddingBottom: 2,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: "#333",
  },
  entryContainer: {
    marginBottom: 7,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  entrySubtitle: {
    fontSize: 9,
    color: "#3b5f8a",
    fontWeight: "bold",
  },
  entryDate: {
    fontSize: 9,
    color: "#666",
  },
  entryDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#444",
    marginTop: 3,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 3,
  },
  skillBadge: {
    backgroundColor: "#e8f0f7",
    color: "#1e3a5f",
    fontSize: 8.5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  skillLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#555",
    marginTop: 4,
    marginBottom: 2,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  langName: {
    fontSize: 9.5,
    color: "#1a1a2e",
  },
  langLevel: {
    fontSize: 9,
    color: "#666",
  },
  technologies: {
    fontSize: 8.5,
    color: "#3b5f8a",
    marginTop: 2,
    fontStyle: "italic",
  },
});

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

interface ResumePDFProps {
  data: Resume;
}

export function ResumePDF({ data }: ResumePDFProps) {
  const { personalInfo, summary, experience, education, projects, technicalSkills, softSkills, languages, certifications } = data;

  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin ? personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "") : "",
    personalInfo.github ? personalInfo.github.replace(/^https?:\/\/(www\.)?/, "") : "",
    personalInfo.website ? personalInfo.website.replace(/^https?:\/\/(www\.)?/, "") : "",
  ].filter(Boolean);

  return (
    <Document title={personalInfo.fullName || "Resume"} author={personalInfo.fullName}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || "Full Name"}</Text>
          {personalInfo.jobTitle && (
            <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>
          )}
          <View style={styles.contactRow}>
            {contactParts.map((part, i) => (
              <Text key={i} style={styles.contactItem}>
                {i > 0 ? "  |  " : ""}{part}
              </Text>
            ))}
          </View>
        </View>

        {/* Professional Summary */}
        {summary && (
          <View style={styles.section}>
            <SectionTitle>Professional Summary</SectionTitle>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Work Experience</SectionTitle>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <View>
                    <Text style={styles.entryTitle}>{exp.title}</Text>
                    <Text style={styles.entrySubtitle}>
                      {exp.company}{exp.city ? `, ${exp.city}` : ""}
                    </Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.entryDesc}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj, i) => (
              <View key={i} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{proj.name}</Text>
                  {proj.year && <Text style={styles.entryDate}>{proj.year}</Text>}
                </View>
                {proj.technologies && (
                  <Text style={styles.technologies}>Technologies: {proj.technologies}</Text>
                )}
                {proj.description && (
                  <Text style={styles.entryDesc}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, i) => (
              <View key={i} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <View>
                    <Text style={styles.entryTitle}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </Text>
                    <Text style={styles.entrySubtitle}>{edu.institution}</Text>
                    {edu.gpa && (
                      <Text style={styles.entryDesc}>GPA: {edu.gpa}</Text>
                    )}
                  </View>
                  <Text style={styles.entryDate}>{edu.year}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {(technicalSkills.length > 0 || softSkills.length > 0) && (
          <View style={styles.section}>
            <SectionTitle>Skills</SectionTitle>
            {technicalSkills.length > 0 && (
              <View>
                <Text style={styles.skillLabel}>Technical Skills:</Text>
                <View style={styles.skillsGrid}>
                  {technicalSkills.map((s, i) => (
                    <Text key={i} style={styles.skillBadge}>{s}</Text>
                  ))}
                </View>
              </View>
            )}
            {softSkills.length > 0 && (
              <View style={{ marginTop: 4 }}>
                <Text style={styles.skillLabel}>Soft Skills:</Text>
                <View style={styles.skillsGrid}>
                  {softSkills.map((s, i) => (
                    <Text key={i} style={styles.skillBadge}>{s}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Languages</SectionTitle>
            {languages.map((lang, i) => (
              <View key={i} style={styles.langRow}>
                <Text style={styles.langName}>{lang.name}</Text>
                <Text style={styles.langLevel}>{lang.proficiency}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Certifications</SectionTitle>
            {certifications.map((cert, i) => (
              <View key={i} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <View>
                    <Text style={styles.entryTitle}>{cert.name}</Text>
                    <Text style={styles.entrySubtitle}>{cert.issuer}</Text>
                  </View>
                  <Text style={styles.entryDate}>{cert.year}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
