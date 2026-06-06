import { PersonalInfo } from "./form-sections/PersonalInfo";
import { ProfessionalSummary } from "./form-sections/ProfessionalSummary";
import { WorkExperience } from "./form-sections/WorkExperience";
import { Education } from "./form-sections/Education";
import { Projects } from "./form-sections/Projects";
import { Skills } from "./form-sections/Skills";
import { Languages } from "./form-sections/Languages";
import { Certifications } from "./form-sections/Certifications";
import { Separator } from "@/components/ui/separator";

export function ResumeForm() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">بناء سيرتك الذاتية</h2>
        <p className="text-muted-foreground mt-1">أدخل بياناتك في الأقسام أدناه — المعاينة تتحدث فورياً</p>
      </div>

      <PersonalInfo />
      <Separator />

      <ProfessionalSummary />
      <Separator />

      <WorkExperience />
      <Separator />

      <Projects />
      <Separator />

      <Education />
      <Separator />

      <Skills />
      <Separator />

      <Languages />
      <Separator />

      <Certifications />
    </div>
  );
}
