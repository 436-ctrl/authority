# Kufiya Feet

Single-page React experience built with Vite, TypeScript, Tailwind CSS, and Framer Motion.

Includes two fully separated profile modes (`Alpha` and `Wolf`) selected from a startup modal, each with its own theme-ready assets and store catalog paths.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS
- Framer Motion v11

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

Push to `main` and the GitHub Actions workflow in `.github/workflows/deploy-pages.yml` will build and publish the site to GitHub Pages.

The workflow automatically builds with the repository subpath as the Vite base path, so assets and links work correctly on Pages.

## Project Structure

```text
src/
  App.tsx
  index.css
  main.tsx
  config/
    masters.ts
    storeCatalog.ts
  components/
    About.tsx
    Booking.tsx
    FloatingTelegramButton.tsx
    Footer.tsx
    Gallery.tsx
    Hero.tsx
    Lightbox.tsx
    MasterSelectorModal.tsx
    MonoFlag.tsx
    Services.tsx
    StorePage.tsx
  hooks/
    useParallax.ts
public/
  place/
    PLACEHOLDER_ASSETS.txt
  store/
    list.txt
    alpha/list.txt
    wolf/list.txt
```
