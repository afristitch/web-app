# TNHC Design System

This document outlines the visual and interactive design system used for the **The New House Church (TNHC)** website. This guide can be used to replicate the aesthetic for other projects.

---

## 1. Core Tokens

### Colors
- **Main Accent**: `#FDDA0D` (Cadmium yellow) - Primary buttons, underlines, highlights.
- **Deep Background**: `#000000` (Pitch Black) - Main cinematic sections.
- **Surface Gray**: `#0A0A0A` (Deep Gray) - Secondary sections, card backgrounds.
- **Light Surface**: `#F2F0EB` (Stone) - Informational/Welcome sections.
- **Text Primary**: `#FFFFFF` (On Dark) / `#000000` (On Light).
- **Text Secondary**: `#78716C` (Stone 500).

### Typography
- **Headlines**: **Plus Jakarta Sans** (Google Font)
  - Style: Bold/Heavy, All-caps, High tracking (`tracking-[0.2em]` or `tracking-tighter` depending on size).
- **Body**: **Inter** (Google Font)
  - Style: Clean, modern, Medium weight for subheaders.

---

## 2. Component Patterns

### Cinematic Hero
- **Visuals**: Full-screen (`70vh` to `90vh`) atmospheric images with a slow-zoom animation.
- **Overlays**: Dark gradients (`from-black/80 to-transparent`) to ensure bold white text pops.

### Feature Cards
- **Structure**: Rounded-2xl corners, subtle borders (`border-white/5` or `border-stone-200`).
- **Interaction**: Grayscale-to-color transitions on hover, scale-up animations.

### Buttons (Rounded-Full)
- **Primary**: Cadmium yellow background, black text, bold tracking.
- **Outline**: Bordered with backdrop blur.

---

## 3. Motion & Animation

### `useFadeUp` Hook
The signature interactive motion. Elements enter from below (`translate-y-8`) while fading from `opacity-0` to `opacity-100` over `1000ms`.

### Visual Texture
- **Grain Overlay**: A `0.03` opacity fixed grain pattern (`/grain.png`) applied site-wide.
- **Slow Zoom**: Modern `transform: scale(1.1)` transition over long durations (`20000ms`).

---

## 4. Layout
- **Container**: Max-width of `max-w-7xl` (1280px).
- **Padding**: Large vertical gaps between sections (`py-28` to `py-48`) to maintain a premium feel.
- **Gradients**: Strategic use of transparency to blend sections smoothly.
