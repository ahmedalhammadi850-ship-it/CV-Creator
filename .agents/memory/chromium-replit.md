---
name: Chromium on Replit
description: How to use Puppeteer/Chromium on Replit NixOS for PDF generation
---

Chromium is installed via `installSystemDependencies({ packages: ["chromium"] })` in code_execution.

**Why:** No Chromium pre-installed; puppeteer-core alone is not enough.

**How to apply:**
- Use `puppeteer-core` (not `puppeteer`) to avoid double-downloading Chromium.
- Pass `executablePath: process.env.CHROMIUM_PATH || "<path-from-which-chromium>"` to `puppeteer.launch()`.
- The nix store path includes a hash that changes on upgrades — use `which chromium` to get the current path.
- Required launch args for sandboxless env: `--no-sandbox`, `--disable-setuid-sandbox`, `--disable-dev-shm-usage`, `--disable-gpu`, `--no-zygote`, `--single-process`.
- Env var `CHROMIUM_PATH` can override the hardcoded path without code changes.
