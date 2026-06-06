import { useFormContext } from "react-hook-form";
import { Resume } from "@/types/resume";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function ProfessionalSummary() {
  const { control } = useFormContext<Resume>();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">الملخص المهني (Professional Summary)</h3>
      <FormField
        control={control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio (نبذة عنك)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="A brief summary of your professional background, skills, and goals..." 
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
