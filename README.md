# Princess Ehima Elema — Business Analyst Portfolio

## What this project is

A static Business Analyst portfolio website. It is built with plain **HTML, CSS and JavaScript**:

- no npm, Node.js, React, Next.js or build step
- upload the files to GitHub and the site works
- it works on GitHub Pages, Netlify, Vercel or any static host, and you can open `index.html` straight from your computer

## What is in the folder

```
business-analyst-portfolio/
├── index.html                  ← the main page (start here)
├── favicon.ico                 ← browser tab icon
├── README.md                   ← this guide
├── PORTFOLIO-INPUT.md          ← questionnaire for future updates
├── .gitignore
├── assets/
│   ├── css/style.css           ← all styling (colours, fonts, layout)
│   ├── js/data.js              ← your links and contact settings
│   ├── js/script.js            ← menu, dark mode, animations, contact form
│   ├── images/                 ← photo, project covers, icons
│   └── documents/              ← your CV (PDF)
└── projects/
    ├── crestline-bank.html     ← case study page
    └── bright-bank.html        ← case study page
```

---

## How to upload it to GitHub

1. Sign in at **github.com**.
2. Click the **+** in the top right, then **New repository**.
3. For the **Repository name**, type exactly: `princessehimaelema.github.io`
   (Using this exact name makes your site address `https://princessehimaelema.github.io`.)
4. Set it to **Public** and click **Create repository**.
5. On the next page, click **uploading an existing file**.
6. Open the `business-analyst-portfolio` folder on your computer, select **everything inside it** (not the folder itself) and drag it into the GitHub page.
   - `index.html` must sit at the top level of the repository, not inside another folder.
   - The `.gitignore` file may be hidden on your computer. That's fine: the site works without it.
7. Scroll down and click **Commit changes**.

## Turn on GitHub Pages

1. In your repository, open **Settings**.
2. In the left menu, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Choose branch **main** and folder **/ (root)**, then click **Save**.
5. Wait 1–3 minutes, then refresh. GitHub shows your site address at the top of the Pages screen.

GitHub Pages automatically uses `index.html` as the home page.

> **Using a different repository name?** The site will then live at `https://princessehimaelema.github.io/REPOSITORY-NAME/`. Everything still works, but update the link-preview addresses (search for `princessehimaelema.github.io` in `index.html` and the files in `projects/`).

---

## How to update your information

| What to change | Where |
|---|---|
| Email, LinkedIn, GitHub, location | `assets/js/data.js` |
| Formspree endpoint (contact form) | `assets/js/data.js` → `formspreeEndpoint` |
| Google Drive links for projects | `assets/js/data.js` → `projects` |
| CV file name | `assets/js/data.js` → `resume` |
| Name, title, tagline, hero text, stats | `index.html` → section marked `HERO` |
| Bio and "How I approach a business problem" | `index.html` → section marked `ABOUT` |
| Experience | `index.html` → section marked `EXPERIENCE` (one `<li class="tl-item">` per job) |
| Skills, tools, methodologies | `index.html` → section marked `SKILLS` (one `<li class="chip">` per skill) |
| Project cards | `index.html` → section marked `PROJECTS` |
| Full case studies | `projects/crestline-bank.html`, `projects/bright-bank.html` |
| Education and certifications | `index.html` → section marked `EDUCATION & CERTIFICATIONS` |
| Page title and link previews (SEO) | top of `index.html`, inside `<head>` |

**Tip:** on GitHub you can edit any file in the browser. Open the file, click the **pencil icon**, make your change, then click **Commit changes**. The live site updates within a minute or two.

The links in `data.js` are also written directly into the HTML as a backup, so the site works even if JavaScript is switched off. If you change a link, change it in `data.js`. To be thorough, you can also search the HTML files for the old link and replace it.

## How to add or change images

Put images in `assets/images/`.

- `profile.jpg` — your photo (portrait shape works best)
- `project-01.jpg`, `project-02.jpg` — project cover images (landscape, about 1600 × 1000)
- `og-image.jpg` — the picture shown when your link is shared on LinkedIn or WhatsApp (1200 × 630)

To replace an image, upload a new file with **the same name**. Keep images under about 300 KB so the site loads quickly. You can make them smaller for free at squoosh.app.

## How to update your CV

Put the PDF in `assets/documents/`. The current file is `Princess-Ehima-Elema-CV.pdf`.
To replace it, upload a new PDF with the same name. If you use a different name, update `resume` in `assets/js/data.js` and the CV links in the HTML files.

## How to add a project (for example, Hexagon Networks)

1. **Cover image:** add `project-03.jpg` to `assets/images/`.
2. **Case study page:** copy `projects/bright-bank.html`, rename it (for example `projects/hexagon-recruitment.html`) and replace the text in each numbered step: Business problem → Objective → Approach → Analysis → Findings → Recommendations → Outcome → Business impact. Update the details box on the right (role, methodology, data source).
3. **Project card:** in `index.html`, copy one `<article class="project-card">…</article>` block inside the `PROJECTS` section. Paste it after the others and change the image, title, category, description, chips and links.
4. **Drive link (optional):** add it in `assets/js/data.js` under `projects`, e.g. `hexagon: "https://drive.google.com/..."`, and use `data-href="projects.hexagon"` on the button.
5. Delete the "A further project… will be added soon" block in `index.html`.

## Contact form (Formspree)

The form sends messages to Formspree, which then emails them to you. There is no backend and nothing private is stored in the code. Only the public endpoint is used.

- Endpoint: `https://formspree.io/f/mbgdqeel` (set in `assets/js/data.js`, and in `index.html` as a backup)
- After going live, send yourself a test message. Formspree may ask you to confirm the first one by email.
- The form has validation, a loading state, and success and error messages. A hidden "honeypot" field blocks simple spam bots.

## How to change colours

Open `assets/css/style.css`. At the top you'll find:

- `:root { … }` — light mode colours
- `[data-theme="dark"] { … }` — dark mode colours

Change `--accent` to change the main highlight colour (currently dark orange, `#b04a17`; `--gold` is the brighter orange used for lines and dots). `--ink` is the navy used for text and buttons. Change `--bg` and `--ink` for the background and text colours.

## How to change fonts

1. In `assets/css/style.css`, change `--font-sans` and `--font-display` at the top.
2. In the `<head>` of `index.html` and of each page in `projects/`, replace the Google Fonts `<link>` with the one for your new font (from fonts.google.com).

## Favicon

The browser tab icon is `favicon.ico` in the main folder, with `assets/images/favicon.svg` and `assets/images/apple-touch-icon.png` for modern browsers and phones. To change it, replace those files and keep the same names.

## Dark mode

The site opens in **dark mode** (navy background with orange highlights). Visitors can switch to light mode with the sun/moon button, and their choice is remembered in their browser.

To make light mode the default instead, change `t = "dark"` to `t = "light"` in the small script near the top of `index.html` and of each page in `projects/`.
