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

export function PersonalInfo() {
  const { control } = useFormContext<Resume>();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-primary">المعلومات الشخصية (Personal Information)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="personalInfo.fullName"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>الاسم الكامل (Full Name)</FormLabel>
              <FormControl>
                <Input placeholder="أحمد محمد" {...field} data-testid="input-full-name" />
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
              <FormLabel>المسمى الوظيفي (Job Title)</FormLabel>
              <FormControl>
                <Input placeholder="مطور ويب" {...field} data-testid="input-job-title" />
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
              <FormLabel>البريد الإلكتروني (Email)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ahmed@example.com" {...field} data-testid="input-email" />
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
              <FormLabel>رقم الهاتف (Phone)</FormLabel>
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
              <FormLabel>الموقع (Location)</FormLabel>
              <FormControl>
                <Input placeholder="الرياض، المملكة العربية السعودية" {...field} data-testid="input-location" />
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
              <FormLabel>LinkedIn (اختياري)</FormLabel>
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
              <FormLabel>GitHub (اختياري)</FormLabel>
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
              <FormLabel>الموقع الشخصي (Website) (اختياري)</FormLabel>
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
