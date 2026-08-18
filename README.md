# Govinda Rai — portfolio

Static, dependency-free portfolio site. Five pages, no build step, no external
requests (no CDN fonts, no analytics) — so it works offline and loads instantly.

```
index.html          Hero, highlights stat row, what-I-do cards, pipeline graphic
experience.html     Role timeline by employer + domain, and how I work
skills.html         Skills grouped by job, as chips
achievements.html   Awards, certifications, education, languages
contact.html        Email, phone, LinkedIn, résumé, location, time zone
404.html            Custom not-found page
assets/css/         Single stylesheet with design tokens
assets/js/          Mobile nav, scroll reveal, active-link, footer year
assets/img/         portrait.jpg, monogram favicon, animated pipeline /
                    code-window / pyramid SVGs, social preview card
assets/files/       Résumé PDF (download target)
```

## Run locally

Any static server works. With Python:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

## Publish to GitHub Pages

You need a **personal** github.com account for this (the machine's git is
configured against an enterprise GitHub instance, which is not public).

1. Create a new **public** repo on github.com. To get the clean
   `https://<username>.github.io` URL, name it exactly `<username>.github.io`.
   Any other name gives you `https://<username>.github.io/<repo>/`.

2. Push this folder:

   ```bash
   cd govinda-portfolio
   git init -b main
   git add .
   git commit -m "Add portfolio site"
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```

   Use a **Personal Access Token** as the password when prompted
   (github.com → Settings → Developer settings → Tokens), or install GitHub CLI
   and run `gh auth login`.

3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, branch `main`, folder `/ (root)`. Save.

4. Wait ~1 minute. Your URL appears at the top of that Settings → Pages screen.

`.nojekyll` is already present, so GitHub serves the files as-is rather than
running them through Jekyll.

### Custom domain (optional)

Add a `CNAME` file containing your domain (e.g. `govindarai.com`), point a DNS
`CNAME` record at `<username>.github.io`, then tick **Enforce HTTPS** in
Settings → Pages.

## Notes

- **No client or project names.** The site describes roles, domains, skills and
  work delivered only — employers are named, engagements are not. Keep it that
  way when editing. Note the linked résumé PDF is a *separate* document and is
  not redacted.
- **Palette (light theme)** — page `#FBFAF7`, cards `#FFFFFF`, tinted band
  `#F0EBE0`. Marks use the light-surface set `#2a78d6` / `#c9531d` / `#0f8f5c`,
  which passes all six validator checks (lightness band, chroma floor, CVD
  separation, normal-vision floor, 3:1 contrast). Text-weight variants are
  stepped darker so body copy clears WCAG AA on every surface: `#1F68C2`
  (5.3:1), `#B4491A` (4.5:1), `#0C7A4E` (4.5:1). Ink `#14181F` 17:1,
  secondary `#414B59` 8.5:1, muted `#57616F` 5.3:1.
- **Rhythm** — page → tinted band → page, with diagonal transitions, plus one
  inverted dark band (the CTA) per page as a contrast anchor. `code-window.svg`
  stays dark on purpose: it reads as an editor screenshot inside a white card.
- **Layout** — uneven bento grid, animated aurora hero over a masked blueprint
  grid, hover-pausable tech marquee, count-up statistics, pointer spotlight.
- **Motion** — cross-document view transitions plus IntersectionObserver scroll
  reveals; all of it disabled under `prefers-reduced-motion: reduce`.
- **No skill percentage bars** by design — invented proficiency numbers are a
  known résumé anti-pattern. Skills are grouped by the job they do instead.
- **Updating the résumé PDF** — replace `assets/files/Govinda_Rai_Resume.pdf`;
  the filename is referenced from every page's footer.
- **Photo** — `assets/img/portrait.jpg` (720x720, cropped head-and-shoulders from
  a 1254x1254 original so the circular frame lands on the face). Used in the hero,
  on the contact page and in the social card. To replace it, drop in a square crop
  already centred on the face — the CSS uses `object-position: 50% 50%`, so a
  loose full-body square will render small.
- **Animated figures are SVG, not GIF** — a few KB each, crisp at any zoom, and
  no colour banding. Each one's resting state is the *finished* drawing and the
  keyframes only fade layers in, so the diagram is never blank if animation does
  not run; motion is wrapped in `prefers-reduced-motion: no-preference`.
- **Interactive bits** — skills filter buttons, back-to-top, pointer spotlight on
  cards, count-up figures, hover-pausable marquee, scroll progress.
