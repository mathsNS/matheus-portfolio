# Matheus Nogueira — Portfolio

A creative engineering portfolio. React + TypeScript + Vite + Tailwind CSS + GSAP/ScrollTrigger + Lenis. Built for static hosting, with hash-based case studies and a standalone version.

## Quick start

Requirements: **Node.js >=20.19** and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production compilation:

```bash
npm run build
npm run preview
```

The generated website lives in `dist/`. The project also includes `standalone/index.html`, which runs **without npm** and has its own JavaScript/CSS animations. The primary React version has the full GSAP/Lenis animation implementation. The former floating 3D object has been removed. Movement is now built into each chapter: scroll-revealed project compositions, a scroll-drawn experience line, interactive technology categories, an editorial About wipe, staggered education entries, and a kinetic contact sequence. The existing orbital graphic stays confined to the hero.

### Version 5 — ROTOR-informed atmosphere and chapter transitions

The original ROTOR landing page was used solely as a reference for **animation choreography**, not for its brand, layout or media. Version 5 adds an original low-contrast SVG drafting system behind the existing typography and projects; no floating 3D mesh was reintroduced.

- Six section-specific atmospheric layers with contour geometry, line routes, node accents and subtle lighting, all `aria-hidden`.
- Curved transitions at chapter boundaries, animated by scroll on desktop and simplified on mobile.
- Scroll-linked parallax of geometry and a slow line drift that pauses outside its section.
- Progressive emphasis on the active professional role and project, without autoplay switching text or blocking interactions.
- CSS slow drift on touch layouts and full `prefers-reduced-motion` support.
- The standalone version now includes locally served GSAP + ScrollTrigger vendor distributions in `standalone/vendor/`; it still works without npm or network access (system fonts fall back if Google Fonts cannot load).

**Edit visual intensity:** `src/styles/index.css` (and the standalone copy in `standalone/styles.css`) contains a dedicated `V5` section. `src/components/Atmosphere.tsx` is the reusable line art. React motion rules are in `src/hooks/useMotion.ts`; the standalone version uses `standalone/ambient.js`.

**Validation:** standalone tested in Chromium screenshots at 1440px, 820px and 390px, with no reported page JavaScript exceptions or horizontal overflow. React/TypeScript sources passed TSX transpiler syntax diagnostics. A full npm-based React production build remains pending because the required npm packages were not available in this runtime; run `npm install && npm run build` locally before deployment.

## Before publication — edit real contact details

Edit `src/data/content.ts`:

- `identity.github` — currently empty: **add your actual GitHub profile URL**.
- `identity.email` — currently empty: **add an e-mail address**.
- `identity.resume` — currently empty: **put a PDF in `public/` and set the URL** (using `import.meta.env.BASE_URL` for subpath-compatible links).
- `identity.linkedin` — populated from the link previously provided by the portfolio owner; check it before publication.
- `projects`, `experiences`, `expertise`, `education` — edit texts, results, verification links and tags. Do not add confidential company data.

Missing contacts are shown explicitly as unavailable, rather than pointing to fabricated URLs. The twelve gallery visuals (three per project) are **conceptual illustrations**, not screenshots of actual software.

### Version 4 — restrained art direction, more meaningful movement

The website has four project entries: EstoqueSensor, V.I.T.A., Transparência de Obras and EcoTech. All supplied gallery artwork is labeled conceptual. Project panels remain compact and leave room for the actual role, description and stack. Intro, section and contact text is primarily in Portuguese; decorative English headlines have been removed.

- **No floating 3D and no gallery loading/progress bar.** The progress indicator on the page header was removed as well.
- Gallery autoplay changes slides every **3.2 seconds**. It pauses while the mouse hovers an image and resumes when the mouse leaves; it also pauses if the tab is inactive, the lightbox is open or reduced motion is requested.
- Work: opposite-direction clipping masks, scroll-driven artwork parallax and staggered information.
- Experience: scroll-linked vertical line and individually revealed roles.
- Technology categories: live tabs with animated content and subtle technical grid backdrop.
- About: typographic clip reveal, line-draw and accent symbol motion.
- Education: staggered rows and ruled entry reveals.
- Contact: sequential kinetic typography and subtle pointer spotlight, no global 3D overlays.

The standalone version reproduces the main visual direction and interactions using native browser JavaScript/CSS, without needing React dependencies. The React version adds GSAP and Lenis motion choreography.

### Add real project images to the carousel

1. Export project screenshots as `.webp`/`.png` (prefer 1600px wide, compressed). Remove private customer and business data before publication.
2. Save them in `public/projects/<project-slug>/`, e.g. `public/projects/estoquesensor/screen-01.webp`.
3. Edit `projects[].images` in `src/data/content.ts`, keeping an array such as:

```ts
images: [
  { src: 'projects/estoquesensor/screen-01.webp', alt: 'Tela de consulta de materiais' },
  { src: 'projects/estoquesensor/screen-02.webp', alt: 'Tela de registro de movimento' },
]
```

These example filenames and descriptions are illustrative; **do not publish them as actual product capabilities** without verifying the screenshots. One image also works: the navigation hides and autoplay disables automatically.

- Autoplay: **3.2 seconds per slide**. It advances automatically, including after manual interaction. It pauses while a mouse pointer is over the **image itself**, or while the fullscreen viewer is open / browser tab is hidden. A reduced-motion preference disables automatic transitions.
- Navigation: slide markers, previous/next buttons, image click for fullscreen, Escape to close, Left/Right arrow keys in fullscreen.
- Images appear as editorial gallery panels. A separate **Ver projeto** button opens the detailed case study, so clicking an image never opens an unrelated modal.
- Accessibility: image alt text, disabled hidden slides, semantic dialogs, focus containment, keyboard navigation, motion reduction.

For the independent no-build version, mirror contact updates and gallery HTML in `standalone/index.html`, case study data in `standalone/app.js`, and copy image files to the matching folder in `standalone/`.


## Project structure

```text
src/
  App.tsx                  # bootstrap, hash-based case study routing, intro
  data/content.ts          # centralized profile/project/experience data
  components/
    Orbital.tsx             # animated authorial SVG system diagram
    CaseStudy.tsx           # accessible case-study detail dialog
    ProjectGallery.tsx      # autoplay carousel + fullscreen lightbox
    Magnetic.tsx, Cursor.tsx, SectionLabel.tsx
  hooks/useMotion.ts       # GSAP, ScrollTrigger, Lenis, reduced motion
  sections/                # seven page sections
  styles/index.css         # Tailwind v4 + art-directed CSS
public/art/                # twelve color-matched conceptual SVG illustrations
public/projects/           # optional real screenshots (add as needed)
.github/workflows/deploy.yml
standalone/                # immediately viewable non-React static alternative
```

## GitHub Pages deployment

1. Create a public GitHub repository and push these files to its `main` branch.
2. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` or trigger **Actions → Deploy portfolio to GitHub Pages → Run workflow**.
4. The workflow installs dependencies, builds, and deploys `dist/` automatically. It detects whether the repo is a user site (`username.github.io`) or project site (`username.github.io/repo-name`), setting `VITE_BASE_PATH` accordingly.

If you prefer a manual deployment, run `VITE_BASE_PATH=/repo-name/ npm run build` (macOS/Linux), or `$env:VITE_BASE_PATH='/repo-name/'; npm run build` (PowerShell). Use `/` for a user site. **Do not upload raw React source to a static drag-and-drop service**; upload `dist/` instead. The `standalone/` folder is already self-contained and can be uploaded directly to a static host.

Case study URLs use `#project/slug`, so all routes work on GitHub Pages without server rewrites. Anchor navigation uses normal hashes.

## Animation/accessibility notes

- GSAP provides the hero reveal, alternating scroll-triggered project masks, image parallax, a scroll-drawn professional timeline, about/education entrance choreography and kinetic contact typography. The lightweight gallery uses CSS opacity transitions and visibility-scoped JavaScript timers.
- Lenis smooth scrolling is enabled for fine-pointer devices when reduced-motion is not requested; its GSAP ticker callbacks are cleaned up.
- The orbital artwork is SVG (no expensive WebGL runtime), with pointer response and independent orbit timelines.
- Magnetic interactions are fine-pointer-only; touch remains native.
- Users with `prefers-reduced-motion: reduce` get a simplified experience. Dialog can be closed with Escape, focus is contained, and links have focus-visible styles.
- Fonts load from Google Fonts and use system fallbacks when offline.

## Testes realizados nesta revisão

**Validação executada:**

- A versão independente (`standalone/`) foi renderizada no Chromium em **1440, 820 e 390 px**; nenhuma largura apresentou scroll horizontal.
- Carrossel: avançou automaticamente após **3,2 s**, ficou parado durante o hover e retomou depois da saída do mouse (1440 e 820 px).
- Galeria: a imagem abriu ampliada e fechou com `Escape`; o projeto EcoTech abriu seu estudo de caso; a interação das abas de tecnologia funcionou.
- No mobile: abertura/fechamento do menu e carregamento das ilustrações nos **quatro projetos** foram verificados.
- Preferência por movimento reduzido: navegação e imagens testadas com esse modo ativo no Chromium.
- Nenhum erro JavaScript foi observado nesses testes; `node --check` e a análise de sintaxe dos arquivos TypeScript/TSX concluíram sem diagnósticos.

**Não foi verificado:** o build final da versão React (o registro npm estava inacessível e as dependências não estavam presentes em cache); tampouco foi realizado deploy real no GitHub Pages. Execute `npm install && npm run build` num ambiente com acesso ao npm para concluir essa etapa.

## Ajustes antes de publicar

- Configurar os dados de contato em `src/data/content.ts` e, se usar a versão sem React, espelhá-los no HTML estático.
- Confirmar e complementar o escopo da EcoTech e demais projetos. **As artes são conceituais**, não capturas de produtos existentes.
- Adicionar capturas reais autorizadas em `public/projects/` (ou `standalone/projects/` na versão estática).
- Manter nomes, datas, certificados e resultados estritamente verificáveis; não divulgar código, clientes nem informações empresariais confidenciais.
