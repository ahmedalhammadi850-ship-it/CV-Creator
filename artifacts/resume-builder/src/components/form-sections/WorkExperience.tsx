import { useFormContext, useFieldArray } from "react-hook-form";
import { Resume } from "@/types/resume";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

export function WorkExperience() {
  const { control } = useFormContext<Resume>();
  const { t } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">{t.experience}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              title: "",
              company: "",
              city: "",
              startDate: "",
              endDate: "",
              current: false,
              description: "",
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.addExperience}
        </Button>
      </div>

      <AnimatePresence>
        {fields.length === 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-center p-8 bg-muted/50 rounded-lg border border-dashed text-muted-foreground"
          >
            {t.noExperience}
          </motion.div>
        )}
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative"
          >
            <Card>
              <CardContent className="pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`experience.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.expTitle}</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`experience.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.expCompany}</FormLabel>
                        <FormControl>
                          <Input placeholder="Tech Corp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`experience.${index}.city`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.expCity}</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={control}
                      name={`experience.${index}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.expStart}</FormLabel>
                          <FormControl>
                            <Input placeholder="Jan 2020" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`experience.${index}.endDate`}
                      render={({ field }) => {
                        const isCurrent = control._formValues.experience?.[index]?.current;
                        return (
                          <FormItem>
                            <FormLabel>{t.expEnd}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.present} disabled={isCurrent} {...field} value={isCurrent ? "" : field.value} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <FormField
                    control={control}
                    name={`experience.${index}.current`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 col-span-1 md:col-span-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{t.expCurrent}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>{t.expDesc}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t.expDescPlaceholder}
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
