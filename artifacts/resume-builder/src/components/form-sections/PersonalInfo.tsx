import { useFormContext } from "react-hook-form";
import { Resume } from "@/types/resume";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/useLanguage";

export function PersonalInfo() {
  const { control } = useFormContext<Resume>();
  const { t, lang } = useLanguage();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">{t.personalInfo}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="personalInfo.fullName"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>{t.fullName}</FormLabel>
              <FormControl>
                <Input placeholder={lang === "ar" ? "أحمد محمد" : "John Smith"} {...field} data-testid="input-full-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalInfo.jobTitle"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>{t.jobTitle}</FormLabel>
              <FormControl>
                <Input placeholder={lang === "ar" ? "مطور ويب" : "Software Engineer"} {...field} data-testid="input-job-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.email}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} data-testid="input-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.phone}</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+966 50 000 0000" {...field} data-testid="input-phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalInfo.location"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>{t.location}</FormLabel>
              <FormControl>
                <Input placeholder={lang === "ar" ? "الرياض، المملكة العربية السعودية" : "San Francisco, CA"} {...field} data-testid="input-location" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalInfo.linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn {t.optional}</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/username" {...field} data-testid="input-linkedin" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalInfo.github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub {t.optional}</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/username" {...field} data-testid="input-github" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="personalInfo.website"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>{t.website} {t.optional}</FormLabel>
              <FormControl>
                <Input placeholder="https://mysite.com" {...field} data-testid="input-website" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
