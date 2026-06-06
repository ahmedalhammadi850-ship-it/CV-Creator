import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export function Skills() {
  const { control, setValue, watch } = useFormContext<Resume>();
  const { t } = useLanguage();
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const technicalSkills = watch("technicalSkills") || [];
  const softSkills = watch("softSkills") || [];

  const handleAddTechSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = techInput.trim();
      if (val && !technicalSkills.includes(val)) {
        setValue("technicalSkills", [...technicalSkills, val], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
      setTechInput("");
    }
  };

  const handleAddSoftSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = softInput.trim();
      if (val && !softSkills.includes(val)) {
        setValue("softSkills", [...softSkills, val], {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
      setSoftInput("");
    }
  };

  const removeTechSkill = (skill: string) => {
    setValue("technicalSkills", technicalSkills.filter((s) => s !== skill), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const removeSoftSkill = (skill: string) => {
    setValue("softSkills", softSkills.filter((s) => s !== skill), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary">{t.skills}</h3>

      <div className="space-y-4">
        <FormField
          control={control}
          name="technicalSkills"
          render={() => (
            <FormItem>
              <FormLabel>{t.technicalSkills}</FormLabel>
              <div className="space-y-2">
                <Input
                  placeholder={t.techSkillsPlaceholder}
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleAddTechSkill}
                />
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {technicalSkills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Badge variant="secondary" className="px-2 py-1 flex items-center gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeTechSkill(skill)}
                            className="text-muted-foreground hover:text-foreground focus:outline-none"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="softSkills"
          render={() => (
            <FormItem>
              <FormLabel>{t.softSkills}</FormLabel>
              <div className="space-y-2">
                <Input
                  placeholder={t.softSkillsPlaceholder}
                  value={softInput}
                  onChange={(e) => setSoftInput(e.target.value)}
                  onKeyDown={handleAddSoftSkill}
                />
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {softSkills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Badge variant="outline" className="px-2 py-1 flex items-center gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSoftSkill(skill)}
                            className="text-muted-foreground hover:text-foreground focus:outline-none"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
