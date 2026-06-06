import { useFormContext } from "react-hook-form";
import { Resume } from "@/types/resume";
import { PersonalInfo } from "./form-sections/PersonalInfo";
import { ProfessionalSummary } from "./form-sections/ProfessionalSummary";
import { WorkExperience } from "./form-sections/WorkExperience";
import { Education } from "./form-sections/Education";
import { Skills } from "./form-sections/Skills";
import { Languages } from "./form-sections/Languages";
import { Certifications } from "./form-sections/Certifications";
import { Separator } from "@/components/ui/separator";

export function ResumeForm() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Build Your Resume</h2>
        <p className="text-muted-foreground mt-1">Fill in the sections below to generate your professional resume.</p>
      </div>
      
      <PersonalInfo />
      <Separator />
      
      <ProfessionalSummary />
      <Separator />
      
      <WorkExperience />
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
