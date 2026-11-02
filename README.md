# Khang Vo — Personal Portfolio

A personal portfolio showcasing my work in cybersecurity, software development, and robotics. I am pursuing a B.S. in Computer Science, Cybersecurity at Arizona State University, with an interest in understanding systems, investigating vulnerabilities, and improving defensive visibility.

[Download my resume](./Khang_Vo_Resume.pdf) · [Get in touch](mailto:kvongoc@asu.edu)

## Overview

The website brings together my technical projects, education, practical training, and leadership experience in a responsive, accessible layout.

Featured work includes:

- **Aegis — Security & Attack Homelab** — An isolated environment for web security testing, centralized logging with Nginx and Wazuh, custom detection rules, and Python-based detection validation. Includes an embedded walkthrough and the lab architecture diagram.
- **Derich Robots** — A team robotics project combining mechanical design, Arduino programming, and sensor and motor control.
- **Mobile App Projects** — Applications built with React Native and Java, including calculator and reading-tool features.

Additional sections cover cybersecurity training through pwn.college, mathematics tutoring, competition achievements, and technical skills.

## Technology

Built with **HTML5, CSS3, and vanilla JavaScript**. No package installation, build step, or backend is required.

- Dark theme with mint accents, larger typography, and responsive layouts.
- Personal photography, a robotics team photograph, and embedded Aegis and Find Books demos.
- Native project-detail dialogs and a collapsible mobile menu.
- Keyboard navigation, visible focus indicators, a skip link, and reduced-motion support.
- Downloadable resume and an email-copy action.
- Relative asset paths for GitHub Pages compatibility.

Typography uses Be Vietnam Pro from Google Fonts, with local system-font fallbacks.

## Run Locally

Open `index.html` directly in a modern browser. For local development, you can also serve the project with the Live Server extension in Visual Studio Code.

The email-copy action requires clipboard access, typically available over HTTPS or localhost. If access is unavailable, the website prompts visitors to copy the address manually.

## Project Structure

```text
.
├── index.html             # Page content, navigation, and metadata
├── styles.css             # Layout, typography, and responsive styles
├── script.js              # Project details, dialogs, menu, and clipboard interaction
├── favicon.svg            # Personal monogram
├── Khang_Vo_Resume.pdf     # Downloadable resume
├── pic/                    # Portrait photograph
├── aegis/                  # Lab walkthrough video and architecture diagram
├── derich/                 # Robotics team photograph
├── mobile_app/             # Find Books demonstration video
├── .nojekyll               # Bypasses Jekyll processing on GitHub Pages
├── .gitignore             # Git exclusions
└── README.md              # Project documentation
```

## Deployment

The website can be hosted on GitHub Pages or another static hosting service.

For GitHub Pages:

1. Push the website files, including all four media folders, `Khang_Vo_Resume.pdf`, and `.nojekyll`, to the repository's `main` branch. Preserve file names and capitalization.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select **main** and **/ (root)**, then save.
5. Once deployment completes, open the published URL displayed in the Pages settings.

No build command or environment variables are needed.

## Maintenance

| File | What to update |
| --- | --- |
| `index.html` | Biography, education, project summaries, contact information, links, and page metadata. |
| `script.js` | Detailed project descriptions and resource links in `projectDetails`. |
| `styles.css` | Visual styles and responsive layouts; shared colors are defined in `:root`. |
| `Khang_Vo_Resume.pdf` | Replace with the latest resume while keeping the filename unchanged. |
| `favicon.svg` | Browser-tab icon. |

Keep project summaries and dialog descriptions consistent when updating the portfolio. Photographs and videos are served directly from the media folders. The Aegis video loads on demand and uses the architecture diagram as its poster; the mobile demo loads metadata only. Both players have native playback controls and do not autoplay. Starting one video pauses the other.

Before publishing an update, check the mobile layout, keyboard navigation, project dialogs, resume download, and contact actions. Confirm that linked project materials are accessible to visitors without requesting additional permissions.

## Contact

**Khang Vo**  
Computer Science & Cybersecurity · Arizona State University  
Tempe, Arizona  
[kvongoc@asu.edu](mailto:kvongoc@asu.edu)
