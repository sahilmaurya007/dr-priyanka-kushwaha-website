# Dr. Priyanka Kushwaha — Personal Website

Peptide chemist's academic portfolio website — clean, modern, single-page design.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Page structure + all styles (single-file design) |
| `data1.js` | **EDIT THIS** — profile, about, research interests, education |
| `data2.js` | **EDIT THIS** — publications, projects, skills, awards |
| `data3.js` | **EDIT THIS** — journey timeline, gallery, references, quote |
| `app.js` | Renderer — reads data files and builds the page (do not edit) |

## For Dr. Kushwaha — how to update content

**Sab kuch data files me hai.** Notepad/VS Code me kholo, badlo, save karo:

1. **Photo**: `image/priyanka.jpg` — apni photo isi naam se `image/` folder me daalo (ya `data1.js` me `photo: "image/yourphoto.jpg"` kar do). Square photo best (800x800px).
2. **Email**: `email: ""` me apni email daalo — contact card aur hero button automatic aayega
3. **Links**: Google Scholar / ResearchGate / YouTube URLs `links:` array me bharo — khali (`url: ""`) links **hide** ho jaate hain automatically. YouTube optional hai — chaho to add karo, warna hidden rahega.
4. **Publications**: `data2.js` me `PUBLICATIONS` array me entries add karo — DOI/Link/PDF buttons automatic ban jaate hain
5. **Gallery albums**: `data3.js` me `GALLERY_CATEGORIES` me albums banao:
   ```js
   const GALLERY_CATEGORIES = [
     { name: "Lab Moments", photos: [{ src: "image/lab1.jpg", caption: "At the bench" }] },
   ];
   ```
6. **Journey timeline**: `data3.js` me `JOURNEY` array — new milestones add karo
7. **Awards / References**: `data2.js` (Awards) aur `data3.js` (References) me add karo

## Hosting (GitHub Pages)

1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch** → Branch: **main** → Folder: **/ (root)** → Save
3. 2-3 min me live: `https://<username>.github.io/dr-priyanka-kushwaha-website/`

(Netlify / Vercel / cPanel par bhi zip upload karke host kar sakte hain — static site hai, koi server nahi chahiye.)

## Features

- Light / Night theme toggle (saved preference — sirf 2 options)
- Contact section with link pill-boxes (platform symbols) + live Google Map (UKZN, Durban)
- Research journey timeline
- Publications with DOI/Link/PDF buttons + tags (Chem. Eur. J. 2024 paper included)
- Gallery with albums + category tabs
- Responsive — mobile par hamburger menu
- Footer with location link
