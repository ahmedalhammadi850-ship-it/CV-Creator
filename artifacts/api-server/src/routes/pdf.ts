import { Router, type IRouter } from "express";
import puppeteer from "puppeteer-core";

const router: IRouter = Router();

const CHROMIUM_PATH =
  process.env["CHROMIUM_PATH"] ||
  "/nix/store/qa9cnw4v5xkxyip6mb9kxqfq1z4x2dx1-chromium-138.0.7204.100/bin/chromium";

router.post("/pdf", async (req, res) => {
  const { html, filename } = req.body as { html?: string; filename?: string };

  if (!html) {
    res.status(400).json({ error: "html is required" });
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROMIUM_PATH,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
        "--single-process",
      ],
    });

    const page = await browser.newPage();

    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: white; }
    @page { margin: 0; size: A4; }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" rel="stylesheet" />
</head>
<body>${html}</body>
</html>`;

    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    const name = (filename || "resume").replace(/[^a-z0-9_\-]/gi, "-");
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  } finally {
    if (browser) await browser.close();
  }
});

export default router;
