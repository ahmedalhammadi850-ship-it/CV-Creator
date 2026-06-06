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
// @ts-ignore
import domtoimage from "dom-to-image-more";
import { useLanguage } from "@/hooks/useLanguage";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t, lang, toggleLang } = useLanguage();

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
      const el = previewRef.current;
      const scale = 2;

      const dataUrl = await domtoimage.toPng(el, {
        width: el.scrollWidth * scale,
        height: el.scrollHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${el.scrollWidth}px`,
          height: `${el.scrollHeight}px`,
        },
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise((r) => { img.onload = r; });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const pageHeightPx = Math.floor((imgW * pageH) / pageW);
      let offset = 0;

      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = imgW;

      while (offset < imgH) {
        const sliceH = Math.min(pageHeightPx, imgH - offset);
        offscreenCanvas.height = sliceH;
        const ctx = offscreenCanvas.getContext("2d")!;
        ctx.clearRect(0, 0, imgW, sliceH);
        ctx.drawImage(img, 0, offset, imgW, sliceH, 0, 0, imgW, sliceH);

        if (offset > 0) pdf.addPage();
        pdf.addImage(offscreenCanvas.toDataURL("image/png"), "PNG", 0, 0, pageW, (sliceH * pageW) / imgW);
        offset += sliceH;
      }

      const name = formData.personalInfo.fullName?.replace(/\s+/g, "-") || "resume";
      pdf.save(`${name}-resume.pdf`);
      toast({ title: t.downloadSuccess, description: t.downloadSuccessDesc });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("PDF error:", msg, err);
      toast({ title: t.downloadError, description: msg, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden" dir={t.dir}>
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 h-full border-r flex flex-col bg-card/50">
        <div className="p-4 border-b bg-card flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            CV
          </div>
          <div>
            <h1 className="font-bold text-base leading-none">{t.appTitle}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{t.appSubtitle}</p>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLang}
              className="font-semibold text-xs px-3"
            >
              {lang === "ar" ? "EN" : "عربي"}
            </Button>
            <div className="lg:hidden">
              <Button size="sm" onClick={handleDownloadPDF} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
              </Button>
            </div>
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
            <span className="text-xs text-muted-foreground font-medium">{t.livePreview}</span>
          </div>
          <Button onClick={handleDownloadPDF} disabled={isGenerating} className="gap-2">
            {isGenerating ? (
              <><Loader2 className="w-4 h-4 animate-spin" />{t.generating}</>
            ) : (
              <><FileDown className="w-4 h-4" />{t.downloadPDF}</>
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
