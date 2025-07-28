# SAPO Studio Extension

## Project Structure

```
my-sidebar-extension/
├── background.js
├── index.html
├── manifest.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.node.tsbuildinfo
├── tsconfig.tsbuildinfo
├── vite.config.d.ts
├── vite.config.js
├── vite.config.ts
├── content/
│   ├── content.css
│   └── content.js
├── icons/
│   ├── icon128.png
│   ├── icon16.png
│   └── icon48.png
├── src/
│   ├── App.tsx
│   ├── content-script.css
│   ├── content-script.tsx
│   ├── index.css
│   └── main.tsx
```

## Key Files
- `manifest.json`: Extension configuration (permissions, scripts, icons, etc.)
- `background.js`: Background service worker for extension events.
- `content/`: Content scripts and styles injected into web pages.
- `icons/`: Extension icons for different sizes.
- `src/`: React source code for sidebar UI and logic.
- `index.html`: Main HTML file for the extension popup or sidebar.
- `vite.config.*`: Vite build configuration files.

## How to Build
1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Build the project:
   ```sh
   pnpm build
   ```
   Output will be in `dist/`.

## How to Load in Browser
- **Chrome/Edge/Opera**:
  1. Go to Extensions > Load unpacked.
  2. Select the project folder.
- **Firefox**:
  1. Zip the extension files.
  2. Go to `about:debugging` > This Firefox > Load Temporary Add-on.
  3. Select the manifest file or zip.

## Manifest Version
- Uses Manifest V3 for cross-browser compatibility.

## Future Notes
- For new features, update `manifest.json` and add scripts/components in `src/` or `content/`.
- For browser support, check API compatibility and use browser-specific settings if needed.
- Document any major changes in this file for future reference.

## Useful Links
- [MDN WebExtension Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Vite Docs](https://vitejs.dev/)

---
_Last updated: 28 July 2025_
