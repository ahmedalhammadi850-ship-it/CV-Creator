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
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

export function Certifications() {
  const { control } = useFormContext<Resume>();
  const { t } = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">{t.certifications}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", issuer: "", year: "" })}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.addCertification}
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
            {t.noCertifications}
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
                    name={`certifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>{t.certName}</FormLabel>
                        <FormControl>
                          <Input placeholder="AWS Certified Solutions Architect" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`certifications.${index}.issuer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.issuer}</FormLabel>
                        <FormControl>
                          <Input placeholder="Amazon Web Services" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`certifications.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.year}</FormLabel>
                        <FormControl>
                          <Input placeholder="2023" {...field} />
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
