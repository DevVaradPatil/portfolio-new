# Varad Patil | 3D Developer Portfolio

An animated, 3D-heavy personal portfolio built with React, Three.js and Spline. It covers my
services, tech stack, work experience, projects and testimonials, and has a working contact form.

## Highlights

- **3D scenes:** a hero background, a rotating Earth and a star field built with React Three Fiber
  and Drei, plus Spline scenes.
- **Sections:** About, Experience (vertical timeline), Tech, Projects, Testimonials and Contact.
- **Motion:** Framer Motion section reveals, tilt cards and carousels.
- **Contact form** that sends straight to my inbox through EmailJS, with toast feedback.
- **Performance work:** on-demand rendering for the 3D canvases, WebP assets and an optimized loader
  (see [`IMPROVEMENTS.md`](IMPROVEMENTS.md)).

## Tech stack

React 18 · Vite · Tailwind CSS · Three.js (React Three Fiber, Drei) · Spline · Framer Motion ·
EmailJS · Firebase Hosting

## Project structure

```
src/
  components/         page sections (Hero, About, Experience, Tech, Works, Feedbacks, Contact)
  components/canvas/  3D scenes (Earth, Stars, HeroBackground)
  constants/          all content: nav links, services, tech, experience, projects
  hoc/                SectionWrapper for consistent section animation
  assets/             images, logos, tech icons
public/               3D models
```

All text content lives in `src/constants/index.js`, so you can update the portfolio without
touching components.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
firebase deploy   # Firebase Hosting
```
