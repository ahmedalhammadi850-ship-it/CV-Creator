import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resume, resumeSchema, defaultResumeData } from "@/types/resume";
import { Form } from "@/components/ui/form";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileDown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues: defaultResumeData,
    mode: "onChange",
  });

  const formData = form.watch();

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const element = previewRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const pdfImgHeight = pdfWidth / ratio;

      if (pdfImgHeight <= pdfHeight) {
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfImgHeight);
      } else {
        let yOffset = 0;
        let remaining = imgHeight;
        while (remaining > 0) {
          const sliceHeight = Math.min(remaining, (imgWidth * pdfHeight) / pdfWidth);
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = imgWidth;
          sliceCanvas.height = sliceHeight;
          const ctx = sliceCanvas.getContext("2d")!;
          ctx.drawImage(canvas, 0, yOffset, imgWidth, sliceHeight, 0, 0, imgWidth, sliceHeight);
          const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.95);
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(sliceData, "JPEG", 0, 0, pdfWidth, (sliceHeight * pdfWidth) / imgWidth);
          yOffset += sliceHeight;
          remaining -= sliceHeight;
        }
      }

      const name = formData.personalInfo.fullName
        ? formData.personalInfo.fullName.replace(/\s+/g, "-")
        : "resume";
      pdf.save(`${name}-resume.pdf`);

      toast({
        title: "تم التحميل",
        description: "تم تحميل السيرة الذاتية بنجاح كملف PDF",
      });
    } catch (err) {
      console.error("PDF generation error:", err);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء توليد الملف. حاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 h-full border-r flex flex-col bg-card/50">
        <div className="p-4 border-b bg-card flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            CV
          </div>
          <div>
            <h1 className="font-bold text-base leading-none">منشئ السيرة الذاتية</h1>
            <p className="text-xs text-muted-foreground mt-0.5">متوافق مع أنظمة ATS</p>
          </div>
          <div className="ml-auto lg:hidden">
            <Button
              size="sm"
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              data-testid="button-download-mobile"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FileDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1 p-5 lg:p-7">
          <Form {...form}>
            <form className="max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <ResumeForm />
            </form>
          </Form>
        </ScrollArea>
      </div>

      {/* Right Panel: Preview */}
      <div className="hidden lg:flex w-1/2 h-full bg-muted flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 bg-card border-b">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground font-medium">معاينة مباشرة</span>
          </div>
          <Button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="gap-2"
            data-testid="button-download-pdf"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                جارٍ التوليد...
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" />
                تحميل PDF (ATS)
              </>
            )}
          </Button>
        </div>

        {/* Preview area — scrollable, full CV visible */}
        <ScrollArea className="flex-1">
          <div className="py-6 px-4 flex justify-center items-start">
            <div
              className="shadow-2xl ring-1 ring-black/10 origin-top-center"
              style={{
                transform: "scale(0.68)",
                transformOrigin: "top center",
                marginBottom: "-32%",
              }}
            >
              <ResumePreview ref={previewRef} data={formData as Resume} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
