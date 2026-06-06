import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const workExperienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  city: z.string().min(1, "City is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
});

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  institution: z.string().min(1, "Institution is required"),
  year: z.string().min(1, "Year is required"),
  gpa: z.string().optional(),
});

export const languageSchema = z.object({
  name: z.string().min(1, "Language is required"),
  proficiency: z.string().min(1, "Proficiency is required"),
});

export const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  year: z.string().min(1, "Year is required"),
});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().optional(),
  experience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  technicalSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
  languages: z.array(languageSchema),
  certifications: z.array(certificationSchema),
});

export type Resume = z.infer<typeof resumeSchema>;

export const defaultResumeData: Resume = {
  personalInfo: {
    fullName: "أحمد محمد العلي",
    jobTitle: "مهندس برمجيات أول",
    email: "ahmed.ali@email.com",
    phone: "+966 50 123 4567",
    location: "الرياض، المملكة العربية السعودية",
    linkedin: "https://linkedin.com/in/ahmed-ali",
    website: "",
  },
  summary:
    "مهندس برمجيات متمرس بخبرة تزيد على 6 سنوات في تطوير تطبيقات الويب والحلول السحابية. متخصص في بناء أنظمة قابلة للتوسع باستخدام تقنيات حديثة. أسعى دائماً إلى تقديم منتجات عالية الجودة وحل المشكلات المعقدة بطرق مبتكرة.",
  experience: [
    {
      title: "مهندس برمجيات أول",
      company: "شركة الحلول التقنية",
      city: "الرياض",
      startDate: "يناير 2022",
      endDate: "",
      current: true,
      description:
        "قيادة فريق من 5 مطورين لبناء منصة SaaS خدمت أكثر من 50,000 مستخدم.\nتحسين أداء قاعدة البيانات بنسبة 40% من خلال تحسين الاستعلامات والفهارس.\nتصميم وتنفيذ بنية microservices باستخدام Node.js و Docker.",
    },
    {
      title: "مطور Full Stack",
      company: "مجموعة الابتكار الرقمي",
      city: "جدة",
      startDate: "مارس 2019",
      endDate: "ديسمبر 2021",
      current: false,
      description:
        "تطوير تطبيقات ويب متعددة باستخدام React و Node.js.\nتكامل مع أنظمة الدفع الإلكتروني وبوابات API خارجية.\nتوجيه المطورين الجدد وإجراء مراجعات الكود.",
    },
  ],
  education: [
    {
      degree: "بكالوريوس",
      fieldOfStudy: "هندسة الحاسب الآلي",
      institution: "جامعة الملك عبدالله للعلوم والتقنية",
      year: "2019",
      gpa: "4.7 / 5.0",
    },
  ],
  technicalSkills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS", "Git"],
  softSkills: ["القيادة", "التواصل", "حل المشكلات", "العمل الجماعي"],
  languages: [
    { name: "العربية", proficiency: "متقن" },
    { name: "الإنجليزية", proficiency: "متقدم" },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023",
    },
  ],
};
