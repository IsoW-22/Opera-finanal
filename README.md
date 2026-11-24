# OPÉRA — Ultra Volume Mascara

Landing page, About and Contact pages for Maison Opéra. Built with **Vite 6 +
React 19 + TypeScript + Tailwind CSS v4** (CSS-first config, no component
libraries, no router package).

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build → dist/
npm run preview  # production build at http://localhost:4173/opera-finanal/
```

## Deploy — GitHub Pages

Live URL: **https://isow-22.github.io/opera-finanal/**

| Piece | Role |
| --- | --- |
| `vite.config.ts` | `base: '/opera-finanal/'` for production builds (dev stays `/`) |
| `src/router.tsx` | history router that prefixes routes with `import.meta.env.BASE_URL` |
| `public/404.html` | redirects deep links (`/about`, `/contact`) into the SPA |
| `index.html` | restores the clean path from the redirect before React boots |
| `.github/workflows/deploy.yml` | builds and deploys `dist/` on every push to `main` |

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub
Actions** (the workflow handles the rest; `dist/` is not committed).

If the repository is renamed, update `base` in `vite.config.ts`,
`segmentsToKeep` in `public/404.html`, and the URL above.
