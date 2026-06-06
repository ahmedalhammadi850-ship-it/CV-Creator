import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resume, resumeSchema, defaultResumeData } from "@/types/resume";
import { Form } from "@/components/ui/form";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Printer } from "lucide-react";

export default function Home() {
  const previewRef = useRef<HTMLDivElement>(null);

  const form = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues: defaultResumeData,
    mode: "onChange",
  });

  const formData = form.watch();

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 h-full border-r flex flex-col bg-card/50">
        <div className="p-6 border-b bg-card">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold font-serif">
              R
            </div>
            <h1 className="font-bold text-xl">Resume Builder</h1>
          </div>
        </div>
        <ScrollArea className="flex-1 p-6 lg:p-8">
          <Form {...form}>
            <form className="max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <ResumeForm />
            </form>
          </Form>
        </ScrollArea>
      </div>

      {/* Right Panel: Preview */}
      <div className="hidden lg:flex w-1/2 h-full bg-muted flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full p-4 flex justify-end z-10">
          <Button 
            onClick={handleDownloadPDF} 
            className="shadow-sm"
            data-testid="button-download-pdf"
          >
            <Printer className="w-4 h-4 mr-2" />
            تحميل PDF
          </Button>
        </div>
        <ScrollArea className="w-full h-full">
          <div className="min-h-full py-20 px-8 flex justify-center items-start">
            <div className="shadow-2xl ring-1 ring-black/5 bg-white scale-[0.8] origin-top md:scale-[0.9] xl:scale-100 transition-transform">
              <ResumePreview ref={previewRef} data={formData as Resume} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
