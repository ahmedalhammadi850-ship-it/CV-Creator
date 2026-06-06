import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  linkedin: z.string().optional().or(z.literal("")),
  github: z.string().optional().or(z.literal("")),
  website: z.string().optional().or(z.literal("")),
});

export const workExperienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  city: z.string().optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional().or(z.literal("")),
});

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  institution: z.string().min(1, "Institution is required"),
  year: z.string().min(1, "Year is required"),
  gpa: z.string().optional(),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().optional().or(z.literal("")),
  year: z.string().optional().or(z.literal("")),
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
  projects: z.array(projectSchema),
  technicalSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
  languages: z.array(languageSchema),
  certifications: z.array(certificationSchema),
});

export type Resume = z.infer<typeof resumeSchema>;

export const defaultResumeData: Resume = {
  personalInfo: {
    fullName: "أحمد عبد الله عقالن الحمادي",
    jobTitle: "AI Automation Developer | Laravel Developer",
    email: "devahmedabduallah@gmail.com",
    phone: "770722520",
    location: "صنعاء - اليمن",
    linkedin: "",
    github: "https://github.com/ahmed-alhamadi",
    website: "",
  },
  summary:
    "مطور ويب ومتخصص في أتمتة الأعمال باستخدام الذكاء الاصطناعي، حاصل على درجة البكالوريوس في معلم الحاسوب من جامعة صنعاء. أمتلك خبرة في تطوير تطبيقات الويب باستخدام Laravel وPHP، بالإضافة إلى بناء أنظمة أتمتة ذكية تعتمد على الذكاء الاصطناعي وn8n وواجهات البرمجة API. لدي خبرة في تطوير أنظمة إدارة المحتوى، أنظمة ATS للتوظيف، بوتات تيليجرام الذكية، وحلول أتمتة البريد الإلكتروني وخدمة العملاء.",
  experience: [],
  education: [
    {
      degree: "بكالوريوس",
      fieldOfStudy: "معلم حاسوب",
      institution: "جامعة صنعاء",
      year: "2025",
      gpa: "80.99%",
    },
  ],
  projects: [
    {
      name: "نظام ATS ذكي للتوظيف باستخدام الذكاء الاصطناعي",
      description:
        "تطوير نظام متكامل لإدارة عمليات التوظيف. تحليل وفرز السير الذاتية تلقائياً باستخدام الذكاء الاصطناعي. مطابقة المرشحين مع الوظائف وفق المهارات والخبرات. إرسال إشعارات ورسائل تلقائية للمتقدمين. لوحة تحكم لإدارة الوظائف والمتقدمين.",
      technologies: "AI, n8n, Laravel, PHP",
      year: "2024",
    },
    {
      name: "نظام أتمتة البريد الإلكتروني بالذكاء الاصطناعي",
      description:
        "تصنيف الرسائل الواردة تلقائياً. إنشاء ردود ذكية على الرسائل. تنظيم البريد حسب الأولوية. تقليل الوقت المستغرق في إدارة البريد الإلكتروني.",
      technologies: "AI Agents, n8n, API Integration",
      year: "2024",
    },
    {
      name: "منصة حجز وإدارة المطاعم مع الأتمتة الذكية",
      description:
        "إدارة الحجوزات والطلبات. الرد التلقائي على استفسارات العملاء. إرسال تأكيدات الحجز والتنبيهات. ربط النظام مع أدوات الأتمتة والذكاء الاصطناعي.",
      technologies: "Laravel, MySQL, n8n, Telegram Bots",
      year: "2024",
    },
    {
      name: "نظام متعدد المستخدمين باستخدام Laravel",
      description:
        "إدارة صلاحيات المستخدمين. تسجيل الدخول بواسطة Google وGitHub. إشعارات للمشرف عند تسجيل مستخدم جديد. لوحة تحكم متكاملة للإدارة.",
      technologies: "Laravel, PHP, MySQL, OAuth",
      year: "2023",
    },
    {
      name: "نظام ديناميكي متعدد اللغات (عربي / إنجليزي)",
      description:
        "إدارة المحتوى بشكل كامل من لوحة التحكم. دعم اللغتين العربية والإنجليزية. استخدام Laravel Components لإعادة استخدام الكود. تطبيق Rate Limiting لتحسين الأداء والحماية.",
      technologies: "Laravel, PHP, MySQL, JavaScript",
      year: "2023",
    },
  ],
  technicalSkills: ["PHP", "Laravel", "MySQL", "HTML5", "CSS3", "JavaScript", "React", "AI Automation", "n8n", "Workflow Automation", "API Integration", "Telegram Bots", "Git & GitHub"],
  softSkills: ["حل المشكلات", "تحليل الأنظمة", "العمل الجماعي"],
  languages: [
    { name: "العربية", proficiency: "اللغة الأم" },
    { name: "الإنجليزية", proficiency: "جيد" },
  ],
  certifications: [],
};
