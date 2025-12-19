# Performance & SEO Improvements

This document outlines recommended improvements for your portfolio website to enhance loading speed, user experience, and search engine visibility.

## 1. Performance Optimization

### A. 3D Graphics (Three.js / R3F)
The 3D elements are the heaviest part of your site. Optimizing them yields the biggest gains.

*   **Draco Compression**: Ensure all `.gltf` or `.glb` models (in `public/planet` and `public/desktop_pc`) are compressed using **Draco**. This can reduce model size by 80-90%.
    *   *Action*: Use the `gltf-pipeline` tool to compress models.
    *   *Code*: Update `useGLTF` to use the `useDraco` loader or `drei`'s automatic handling.
*   **Demand Rendering**: You are already using `frameloop='demand'` in `Earth.jsx`. Ensure this is applied to **all** Canvases (`Stars`, `HeroBackground`, `Computers`) where continuous animation isn't strictly necessary.
    *   *Note*: If an object floats/rotates constantly, `demand` might not be suitable, but for interaction-based scenes, it saves battery.
*   **Pixel Ratio (DPR)**: Cap the device pixel ratio to prevent rendering at 3x or 4x resolution on high-end mobile screens, which causes overheating and lag.
    *   *Suggestion*: Add `dpr={[1, 2]}` to all `<Canvas>` components.
*   **Texture Resizing**: Ensure textures used on 3D models are not larger than necessary (e.g., max 2048x2048 for desktop, 1024x1024 for mobile).

### B. Image Optimization
*   **Format**: Convert remaining `.png` and `.jpg` assets (especially in `src/assets/company/` and `src/assets/projects/`) to **WebP** or **AVIF**.
*   **Lazy Loading**: Ensure standard `<img>` tags have `loading="lazy"` and `decoding="async"`.
*   **Explicit Dimensions**: Add `width` and `height` attributes to images to prevent Cumulative Layout Shift (CLS).

### C. Font Loading
*   **Render Blocking**: Currently, fonts are loaded via `@import` in `index.css`, which blocks rendering.
*   **Fix**: Move the font loading to `index.html` using `<link rel="preload">` or standard `<link>` tags with `display=swap`.
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;...&display=swap" rel="stylesheet">
    ```

### D. Code Splitting & Lazy Loading
*   **Route-Based**: You are using `React.lazy` for components. Ensure that if you add more pages (e.g., a separate blog page), they are lazy loaded via React Router.
*   **Component-Based**: For a long single-page application, consider lazy loading heavy sections that are "below the fold" (like `Feedbacks` or `Works`) using `react-intersection-observer`. They will only load when the user scrolls near them.

### E. Service Worker (PWA)
*   **Registration**: You have a `sw.js` file in `public/`, but it is **not registered** in `src/main.jsx` or `index.html`.
*   **Action**: Register the service worker to enable offline caching and faster repeat visits.

## 2. SEO (Search Engine Optimization)

### A. Meta Tags & Manifest
*   **Theme Color**: Add a theme color meta tag for mobile browsers.
    ```html
    <meta name="theme-color" content="#050816" />
    ```
*   **Web App Manifest**: Create a `manifest.json` in `public/` and link it in `index.html`. This allows users to "install" your site as an app and defines the icon/name.
    ```html
    <link rel="manifest" href="/manifest.json" />
    ```

### B. Robots & Sitemap
*   **Robots.txt**: Create a `public/robots.txt` file to guide search engine crawlers.
    ```text
    User-agent: *
    Allow: /
    Sitemap: https://varadportfolio.web.app/sitemap.xml
    ```
*   **Sitemap**: You are using `vite-plugin-sitemap`, which is good. Ensure the `hostname` in `vite.config.js` matches your final production URL exactly.

### C. Accessibility (A11y)
*   **Alt Text**: Ensure every `img` tag has a descriptive `alt` attribute. This is crucial for SEO and screen readers.
*   **Contrast**: Your background gradient goes from white to light purple (`#ffffff` to `#D7B6FF`). Ensure text placed on top of this has sufficient contrast (dark gray/black).
*   **Headings**: Ensure a proper hierarchy (`h1` -> `h2` -> `h3`). Do not skip levels.

## 3. Code Quality & Stability

### A. Error Boundaries
*   **WebGL Crashes**: 3D contexts can crash on older devices. Wrap your `<Canvas>` components in a **React Error Boundary**. If the 3D scene fails, show a static image fallback instead of a white screen.

### B. Bundle Analysis
*   **Analyzer**: Run `npx vite-bundle-visualizer` to see exactly what is taking up space.
*   **Tree Shaking**: Verify that `three.js` is being tree-shaken correctly. Importing from `@react-three/drei` is usually safe, but avoid `import * as THREE from 'three'` if possible.

## 4. Quick Wins (Actionable Now)

1.  **Add `dpr={[1, 2]}`** to all `<Canvas>` components.
2.  **Register the Service Worker** in `main.jsx`.
3.  **Move Font Imports** from CSS to HTML.
4.  **Create `robots.txt`** and `manifest.json`.
