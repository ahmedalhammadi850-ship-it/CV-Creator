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
      const html2canvas = (await import("html2canvas")).default;

      // Strip SVG icons and get clean HTML (inline styles only, no Tailwind/oklch)
      const clone = previewRef.current.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("svg").forEach((s) => s.remove());
      const resumeHTML = clone.outerHTML;

      // Render in an isolated iframe with NO external CSS → avoids oklch crash
      const iframe = document.createElement("iframe");
      iframe.style.cssText =
        "position:fixed;top:-9999px;left:-9999px;width:794px;border:none;visibility:hidden;";
      document.body.appendChild(iframe);

      const iDoc = iframe.contentDocument!;
      iDoc.open();
      iDoc.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
        <style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#fff;font-family:Arial,Helvetica,sans-serif;}</style>
      </head><body>${resumeHTML}</body></html>`);
      iDoc.close();

      // Let the iframe paint
      await new Promise((r) => setTimeout(r, 250));

      const target = iDoc.body.firstElementChild as HTMLElement;
      iframe.style.height = target.scrollHeight + "px";

      const canvas = await html2canvas(target, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        width: target.scrollWidth,
        height: target.scrollHeight,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight,
      });

      document.body.removeChild(iframe);

      // Build PDF — split into A4 pages if needed
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const pageHeightPx = Math.floor((canvas.width * pageH) / pageW);
      let offset = 0;

      while (offset < canvas.height) {
        const sliceH = Math.min(pageHeightPx, canvas.height - offset);
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceH;
        sliceCanvas.getContext("2d")!.drawImage(
          canvas, 0, offset, canvas.width, sliceH, 0, 0, canvas.width, sliceH
        );
        if (offset > 0) pdf.addPage();
        pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", 0, 0, pageW, (sliceH * pageW) / canvas.width);
        offset += sliceH;
      }

      const name = formData.personalInfo.fullName?.replace(/\s+/g, "-") || "resume";
      pdf.save(`${name}-resume.pdf`);

      toast({ title: "✅ تم التحميل", description: "تم حفظ السيرة الذاتية كملف PDF" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("PDF error:", msg, err);
      toast({ title: "خطأ في التحميل", description: msg, variant: "destructive" });
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
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
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
        <div className="flex items-center justify-between px-5 py-3 bg-card border-b">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground font-medium">معاينة مباشرة</span>
          </div>
          <Button onClick={handleDownloadPDF} disabled={isGenerating} className="gap-2">
            {isGenerating ? (
              <><Loader2 className="w-4 h-4 animate-spin" />جارٍ التوليد...</>
            ) : (
              <><FileDown className="w-4 h-4" />تحميل PDF</>
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="py-6 px-4 flex justify-center items-start">
            <div
              className="shadow-2xl ring-1 ring-black/10"
              style={{ transform: "scale(0.68)", transformOrigin: "top center", marginBottom: "-32%" }}
            >
              <ResumePreview ref={previewRef} data={formData as Resume} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
