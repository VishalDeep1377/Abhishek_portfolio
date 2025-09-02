# Abhishek Kumar — Professional Portfolio

A fast, modern, and accessible personal portfolio for Abhishek Kumar (Team Lead — Business Development). Built with semantic HTML, responsive CSS, and progressive, privacy‑friendly JavaScript.

## Live Demo

- Website: [GitHub Pages — Abhishek_portfolio](https://VishalDeep1377.github.io/Abhishek_portfolio)

## Highlights

- Advanced UI with polished visual design (dark/light themes, accent gradients)
- Engaging interactions: scroll progress, animated KPI counters, parallax hero, card tilt
- Clear information architecture: Summary, Experience, Skills, Education, Certifications, Projects, Contact
- Accessibility‑first: semantic landmarks, keyboard‑friendly nav, reduced‑motion support
- Performance‑minded: no heavy frameworks, optimized assets, lazy visual effects

## Tech Stack

- HTML5, CSS3 (modern properties with graceful fallbacks)
- Vanilla JavaScript (IntersectionObserver, requestAnimationFrame)
- Deployed via GitHub Pages

## Project Structure

```
.
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   ├── img/
│   │   └── headshot.jpg
│   ├── favicon.svg
│   └── Abhishek_Kumar_Resume.pdf
├── index.html
└── README.md
```

## Getting Started

- Local preview: open `index.html` in any browser
- Or serve with a static server (recommended):
  - VS Code Live Server extension, or
  - Python: `python -m http.server 5500` then open `http://localhost:5500`

## Customize

- Content: edit sections directly in `index.html`
- Colors/Theme: update CSS variables in `assets/css/styles.css`
- Interactions: tune options in `assets/js/script.js`
- Headshot: replace `assets/img/headshot.jpg` (square 800×800 recommended)
- Resume: replace `assets/Abhishek_Kumar_Resume.pdf` (download button is wired)

### Hero Photo Controls (no CSS needed)
Adjust via data attributes in `index.html`:

```html
<img class="hero-photo" src="assets/img/headshot.jpg"
  alt="Abhishek Kumar headshot"
  data-x="50%" data-y="30%"
  data-fit="cover"
  data-size="clamp(180px, 26vw, 260px)" />
```

- `data-x`, `data-y`: crop focus (e.g., `data-y="25%"` to show more hair)
- `data-fit`: `cover` (crop) or `contain` (no crop)
- `data-size`: responsive size or fixed (e.g., `220px`)

## Deployment (GitHub Pages)

1. Push to GitHub (branch `main`).
2. In the repository, open Settings → Pages.
3. Source: select `Branch: main` and folder `/root`, then Save.
4. Wait ~1–2 minutes; the site will be live at the Pages URL.

If you use a custom domain:
- Add your domain in Pages settings; follow DNS instructions
- Optionally add a `CNAME` file at the project root

## Accessibility

- Keyboard‑navigable primary nav and focus states
- Reduced‑motion support (prefers‑reduced‑motion respected)
- High‑contrast text on backgrounds

## Performance & SEO

- Minimal JS, no frameworks
- Preconnected Google Fonts, theme‑color, Open Graph tags
- JSON‑LD Person schema embedded

## Roadmap (nice to have)

- Contact form (Formspree/Netlify)
- Social links and testimonials
- `og:image`, `sitemap.xml`, `robots.txt`
- GitHub Actions to validate links and deploy Pages

## License

MIT — free to use and modify.

## Contact

- Email: `ag26824@gmail.com`
- Location: BTM Layout, Bangalore, India 