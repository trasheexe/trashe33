# trashe33 Cybersecurity Portfolio

A personal learning journal for **trashe33 · Cybersecurity Student**. Built with semantic HTML, CSS and vanilla JavaScript, with no framework, build step or runtime dependencies.

## About

This portfolio documents a cybersecurity learning journey: Linux, networking, web security, Python, controlled labs and defensive security concepts. It uses a public pseudonym and links only to [@trasheexe](https://github.com/trasheexe).

The content represents a student building practical experience. It does not claim professional security experience, certifications or completed projects that do not exist.

## Features

- Dark, terminal-inspired design with responsive layouts and local SVG icons.
- Sticky navigation, current-section highlighting and a keyboard-accessible mobile menu.
- Introductory terminal, subtle typing, scroll reveals and card hover effects.
- Respects `prefers-reduced-motion`, including changes while the page is open.
- Security focus cards, categorized skill badges and a current-focus tree.
- Six study areas with working Learning, In Progress and Planned filters.
- Explicitly planned future projects and an eight-step learning roadmap.
- Security ethics statement and GitHub as the only contact channel.
- Skip link, visible focus, semantic landmarks and native anchor navigation.
- All content and navigation remain available without JavaScript.
- Basic Open Graph metadata, a local social image and SVG favicon.
- No analytics, cookies, remote fonts, external scripts or API requests.

## Tech Stack

| Technology         | Purpose                                                |
| ------------------ | ------------------------------------------------------ |
| HTML5              | Semantic content, navigation and metadata              |
| CSS3               | Layout, responsive breakpoints, tokens and animations  |
| Vanilla JavaScript | Menu, section tracking, typing, reveal and lab filters |
| SVG / PNG          | Local icons, favicon and social preview                |
| Vercel             | Static hosting and response headers                    |

## Project Structure

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── icons/
│   │   ├── favicon.svg
│   │   └── sprite.svg
│   └── images/
│       └── social-card.png
├── vercel.json
├── .vercelignore
├── .gitignore
└── README.md
```

## Running Locally

Serve the project directory with any static HTTP server. For example, with Python installed:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000`. On Windows, `py -m http.server 8000 --bind 127.0.0.1` is another option. A static-server editor extension also works. Use HTTP rather than opening the HTML as a local file so the browser can load the SVG sprite reliably.

There are no packages to install, environment variables to set or build commands to run.

### Editing the site

- Change text, skills and study statuses in `index.html`.
- Adjust the CSS tokens at the start of `css/style.css` for colors and fonts.
- Responsive breakpoints are grouped at the end of the stylesheet: 1100, 860 and 600 pixels.
- Keep each lab's visible badge and `data-status` consistent (`learning`, `in-progress`, `planned`). If adding cards, also update the initial filter count in the HTML.
- Add repository links only when a real public repository exists. Keep planned work clearly labeled.
- The terminal is illustrative. It does not execute commands or show live system data.
- Update the footer year and hero edition manually when appropriate.

## Deployment

The repository is ready for a static Vercel deployment:

1. Import the repository into Vercel.
2. Choose **Other** as the framework preset and the repository root as the root directory.
3. Leave the build and install commands empty; serve the root directory (`.`).
4. Deploy. No backend, secrets or environment variables are required.

`vercel.json` defines the static output and security headers. `.vercelignore` excludes development documentation from deployment. There is no catch-all rewrite: nonexistent URLs should return 404.

Configuration reference: [Vercel project configuration](https://vercel.com/docs/project-configuration).

After choosing the final public domain, add a canonical link and `og:url` to `index.html`, and change `og:image` to the absolute URL of `/assets/images/social-card.png` for maximum compatibility with social preview crawlers. These domain values are intentionally not invented.

If enabling third-party scripts in the future, review the Content Security Policy first. The current policy permits local scripts, styles and images and disallows outgoing application requests, embedding and form submissions.

## Security Focus

Learning topics include Linux administration, TCP/IP, HTTP, authentication, authorization, REST APIs, input validation, OWASP concepts and traffic analysis. Tools listed on the site are being studied or practiced; badges are not proficiency scores.

The public identity is **trashe33**. The sole contact is **https://github.com/trasheexe**. Keep personal names, location, school, private contact details and unrelated accounts out of site content, metadata, assets and future updates. Before publishing, review repository visibility and commit author metadata separately from the website files.

## Roadmap

Study sequence: Linux → Networking → Python → Web Security → OWASP → API Security → Security Labs → CTFs. This is a direction of study, not a completion tracker.

Planned public projects:

- HTTP Security Headers Checker
- Security Log Analyzer
- Password Strength Checker
- Cybersecurity Notes
- Web Security Labs
- CTF Writeups
- Network Analysis Labs
- Linux Security Scripts

Personal note-taking is in progress; publication as a project remains planned. Repository buttons should be introduced only when there is actual public work to share.

### Review before publishing updates

- Check internal anchors and all local assets over HTTP.
- Check mobile navigation, Escape, keyboard focus and lab filters.
- Check desktop, tablet and narrow mobile layouts for overflow.
- Check reduced motion and readability with JavaScript disabled.
- Inspect browser console and network failures.
- Keep status labels honest and external profile links limited to the intended account.

## Verification

Checked locally in Chromium (Microsoft Edge), served over HTTP with the headers from `vercel.json`:

- HTML5 parser: no errors. JavaScript syntax: valid.
- Viewports: 320, 375, 390, 600, 768, 860, 900, 1024, 1280, 1440 and 1920 pixels; no horizontal overflow.
- Mobile menu opens, closes on navigation and Escape, and restores keyboard focus.
- Skip link focuses the main content. Section links reach existing targets.
- Lab filters show 3 learning areas, 1 in-progress area, 2 planned areas and 6 total.
- Scroll reveal, hover, terminal typing and reduced-motion behavior checked.
- With JavaScript disabled, navigation and all six study areas remain visible.
- Axe accessibility audit: zero reported violations. Text over gradients was checked separately; conservative contrast calculations exceed 4.5:1.
- Local assets return HTTP 200; browser console has no site errors.
- Public files contain no personal identity details; site profile links point only to the intended account.
- Vercel configuration values validated against the published schema.

These are local Chromium checks, not a claim of manual testing in Safari or Firefox. Production-domain metadata and deployed response headers should be checked after publication.

## Disclaimer

All security-related content is intended for educational, defensive and authorized environments.
