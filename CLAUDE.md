# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # TypeScript check + production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

There are no tests.

## Architecture

This is a single-page React + TypeScript + Vite app for **Isu Elihle Solutions**, a South African ICT/connectivity company. The entire application lives in **`src/App.tsx`** (~1136 lines) — there are no separate component files, page files, or CSS modules.

### Routing

Navigation is client-side state only — no React Router or similar. The root `App` component holds a `page` string in `useState("home")` and conditionally renders page components. `navigate(p)` sets the page and scrolls to top.

Valid page IDs: `"home"`, `"services"`, `"coverage"`, `"order"`, `"track"`, `"about"`, `"contact"`, and service IDs: `"fibre"`, `"5g"`, `"ict"`, `"analytics"`, `"iot"`, `"digital"`.

### Styling

All styles are inline React style objects — no CSS files (except `index.css` for resets). Global CSS (keyframe animations, scrollbar, font imports) is injected via a template string `G` rendered as `<style>{G}</style>`.

Brand colors are defined in the `C` constant object at the top of App.tsx. The gradient helper `grad(deg)` and `gradText` style object are used throughout for the magenta→purple→navy brand gradient.

### Key components (all in App.tsx)

- **`ParticleCanvas`** — Full-viewport `<canvas>` with 120 mouse-interactive particles and connecting lines, rendered via `requestAnimationFrame`. Fixed-positioned, `z-index: 0`, pointer-events none.
- **`TiltCard`** — 3D perspective tilt on mouse move via inline transform.
- **`FloatingOrb`** — Blurred circle for background depth.
- **`Nav`** — Fixed top nav with desktop dropdown for Services and mobile hamburger menu. `isMobile` is `window.innerWidth < 900`.
- **`WhatsAppButton`** — Fixed bottom-right floating button.
- **`Footer`** — Grid layout with nav links.
- **`Btn`** — Shared button with `"primary"`, `"outline"`, and `"ghost"` variants.

### Service pages

All six service pages (`fibre`, `5g`, `ict`, `analytics`, `iot`, `digital`) are rendered by the single **`ServicePage`** component, driven by the **`SERVICE_DATA`** object. To update service content (descriptions, features, pricing plans), edit `SERVICE_DATA`.

### Logo

The company logo is embedded as a base64 PNG string (`ICON_B64`) at the very top of App.tsx — it is not a file import.

### Mobile responsiveness

`isMobile` is computed inline per component with `window.innerWidth < 768` (or `< 900` in Nav). There is no resize listener in most components — layout is fixed on initial render.

### Vite config note

`vite.config.ts` configures esbuild to treat `.js` and `.ts` files as JSX, in addition to `.jsx`/`.tsx`. This is intentional.
