import { useFormContext } from "react-hook-form";
import { Resume } from "@/types/resume";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/useLanguage";

export function ProfessionalSummary() {
  const { control } = useFormContext<Resume>();
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">{t.summary}</h3>
      <FormField
        control={control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.bioLabel}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t.bioPlaceholder}
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
