export type Lang = "ar" | "en";

export const translations = {
  ar: {
    dir: "rtl" as const,
    appTitle: "منشئ السيرة الذاتية",
    appSubtitle: "متوافق مع أنظمة ATS",
    buildTitle: "بناء سيرتك الذاتية",
    buildSubtitle: "أدخل بياناتك في الأقسام أدناه — المعاينة تتحدث فورياً",
    livePreview: "معاينة مباشرة",
    downloadPDF: "تحميل PDF",
    generating: "جارٍ التوليد...",
    downloadSuccess: "✅ تم التحميل",
    downloadSuccessDesc: "تم حفظ السيرة الذاتية كملف PDF",
    downloadError: "خطأ في التحميل",

    // Sections
    personalInfo: "المعلومات الشخصية",
    summary: "الملخص المهني",
    experience: "الخبرة العملية",
    education: "التعليم",
    projects: "المشاريع",
    skills: "المهارات",
    languages: "اللغات",
    certifications: "الشهادات",

    // Personal Info
    fullName: "الاسم الكامل",
    jobTitle: "المسمى الوظيفي",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    location: "الموقع",
    website: "الموقع الشخصي",
    optional: "(اختياري)",

    // Summary
    bioLabel: "نبذة عنك",
    bioPlaceholder: "ملخص مختصر عن خلفيتك المهنية ومهاراتك وأهدافك...",

    // Experience
    addExperience: "إضافة خبرة",
    noExperience: "أضف أول خبرة عملية",
    expTitle: "المسمى الوظيفي",
    expCompany: "الشركة",
    expCity: "المدينة",
    expStart: "تاريخ البدء",
    expEnd: "تاريخ الانتهاء",
    expCurrent: "أعمل هنا حالياً",
    expDesc: "الوصف",
    expDescPlaceholder: "صف مسؤولياتك وإنجازاتك...",

    // Education
    addEducation: "إضافة تعليم",
    noEducation: "أضف سجلك التعليمي",
    degree: "الدرجة العلمية",
    fieldOfStudy: "مجال الدراسة",
    institution: "المؤسسة التعليمية",
    year: "السنة",
    gpa: "المعدل التراكمي",

    // Projects
    addProject: "إضافة مشروع",
    noProjects: "أضف مشروعك الأول",
    projectName: "اسم المشروع",
    technologies: "التقنيات المستخدمة",
    projectDesc: "وصف المشروع",
    projectDescPlaceholder: "وصف مختصر للمشروع وأبرز ما أنجزته...",

    // Skills
    technicalSkills: "المهارات التقنية",
    softSkills: "المهارات الشخصية",
    techSkillsPlaceholder: "اكتب مهارة واضغط Enter (مثل: React, Python)",
    softSkillsPlaceholder: "اكتب مهارة واضغط Enter (مثل: قيادة الفريق)",

    // Languages
    addLanguage: "إضافة لغة",
    noLanguages: "أضف اللغات التي تعرفها",
    language: "اللغة",
    proficiency: "مستوى الإجادة",
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",
    fluent: "طليق / لغة أم",
    selectLevel: "اختر المستوى",

    // Certifications
    addCertification: "إضافة شهادة",
    noCertifications: "أضف شهاداتك وتراخيصك (اختياري)",
    certName: "اسم الشهادة",
    issuer: "جهة الإصدار",

    // CV section headers (preview)
    cvSummary: "الملخص المهني",
    cvExperience: "الخبرة العملية",
    cvProjects: "المشاريع",
    cvEducation: "التعليم",
    cvSkills: "المهارات",
    cvTechnical: "المهارات التقنية:",
    cvSoft: "المهارات الشخصية:",
    cvLanguages: "اللغات",
    cvCertifications: "الشهادات",
    present: "حتى الآن",
  },
  en: {
    dir: "ltr" as const,
    appTitle: "Resume Builder",
    appSubtitle: "ATS Compatible",
    buildTitle: "Build Your Resume",
    buildSubtitle: "Fill in your details below — preview updates live",
    livePreview: "Live Preview",
    downloadPDF: "Download PDF",
    generating: "Generating...",
    downloadSuccess: "✅ Downloaded",
    downloadSuccessDesc: "Your resume has been saved as a PDF",
    downloadError: "Download Error",

    // Sections
    personalInfo: "Personal Information",
    summary: "Professional Summary",
    experience: "Work Experience",
    education: "Education",
    projects: "Projects",
    skills: "Skills",
    languages: "Languages",
    certifications: "Certifications",

    // Personal Info
    fullName: "Full Name",
    jobTitle: "Job Title",
    email: "Email",
    phone: "Phone",
    location: "Location",
    website: "Website",
    optional: "(Optional)",

    // Summary
    bioLabel: "About You",
    bioPlaceholder: "A brief summary of your professional background, skills, and goals...",

    // Experience
    addExperience: "Add Experience",
    noExperience: "Add your first work experience",
    expTitle: "Job Title",
    expCompany: "Company",
    expCity: "City",
    expStart: "Start Date",
    expEnd: "End Date",
    expCurrent: "I currently work here",
    expDesc: "Description",
    expDescPlaceholder: "Describe your responsibilities and achievements...",

    // Education
    addEducation: "Add Education",
    noEducation: "Add your education history",
    degree: "Degree",
    fieldOfStudy: "Field of Study",
    institution: "Institution",
    year: "Year",
    gpa: "GPA",

    // Projects
    addProject: "Add Project",
    noProjects: "Add your first project",
    projectName: "Project Name",
    technologies: "Technologies",
    projectDesc: "Description",
    projectDescPlaceholder: "Brief description of the project and your key achievements...",

    // Skills
    technicalSkills: "Technical Skills",
    softSkills: "Soft Skills",
    techSkillsPlaceholder: "Type a skill and press Enter (e.g. React, Python)",
    softSkillsPlaceholder: "Type a skill and press Enter (e.g. Leadership)",

    // Languages
    addLanguage: "Add Language",
    noLanguages: "Add languages you know",
    language: "Language",
    proficiency: "Proficiency",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    fluent: "Fluent / Native",
    selectLevel: "Select level",

    // Certifications
    addCertification: "Add Certification",
    noCertifications: "Add certifications or licenses (Optional)",
    certName: "Certification Name",
    issuer: "Issuer",

    // CV section headers (preview)
    cvSummary: "Professional Summary",
    cvExperience: "Work Experience",
    cvProjects: "Projects",
    cvEducation: "Education",
    cvSkills: "Skills",
    cvTechnical: "Technical Skills:",
    cvSoft: "Soft Skills:",
    cvLanguages: "Languages",
    cvCertifications: "Certifications",
    present: "Present",
  },
};

export type Translations = typeof translations.en;
