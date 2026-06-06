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
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

export function Projects() {
  const { control } = useFormContext<Resume>();
  const { t } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">{t.projects}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-testid="button-add-project"
          onClick={() =>
            append({
              name: "",
              description: "",
              technologies: "",
              year: "",
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.addProject}
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
            {t.noProjects}
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
                  data-testid={`button-remove-project-${index}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name={`projects.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.projectName}</FormLabel>
                        <FormControl>
                          <Input placeholder={t.lang === "ar" ? "نظام إدارة المهام" : "Task Manager App"} {...field} data-testid={`input-project-name-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`projects.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.year}</FormLabel>
                        <FormControl>
                          <Input placeholder="2024" {...field} data-testid={`input-project-year-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`projects.${index}.technologies`}
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>{t.technologies}</FormLabel>
                        <FormControl>
                          <Input placeholder="React, Node.js, PostgreSQL" {...field} data-testid={`input-project-tech-${index}`} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`projects.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>{t.projectDesc}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t.projectDescPlaceholder}
                            className="min-h-[100px]"
                            {...field}
                            data-testid={`textarea-project-desc-${index}`}
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
