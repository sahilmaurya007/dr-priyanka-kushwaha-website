# Dr. Priyanka Kushwaha — Personal Website

Peptide chemist's academic portfolio website — clean, modern, single-page design.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Page structure + all styles (single-file design) |
| `data.js` | **EDIT THIS** — profile, about, publications, links, gallery |
| `app.js` | Renderer — reads `data.js` and builds the page |

## For Dr. Kushwaha — how to update content

**Sab kuch `data.js` file me hai.** Notepad/VS Code me kholo, badlo, save karo:

1. **Photo**: `image/priyanka.jpg` — apni photo isi naam se `image/` folder me daalo (ya `data.js` me `photo: "image/yourphoto.jpg"` kar do)
2. **Email**: `email: ""` me apni email daalo — contact card aur hero button automatic aayega
3. **Links**: Google Scholar / ResearchGate / YouTube URLs `links:` array me bharo — khali (`url: ""`) links **hide** ho jaate hain automatically, isliye jo chahiye wahi dikhega
4. **Publications / Awards / Gallery**: `PUBLICATIONS`, `AWARDS`, `PHOTO_GALLERY` arrays me entries add karo — format existing entries se copy karo
5. **Gallery albums**: `GALLERY_CATEGORIES` me albums banao

## Hosting (GitHub Pages)

1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch** → Branch: **main** → Folder: **/ (root)** → Save
3. 2-3 min me live: `https://<username>.github.io/dr-priyanka-kushwaha-website/`

(Netlify / Vercel / cPanel par bhi zip upload karke host kar sakte hain — static site hai, koi server nahi chahiye.)

## Features

- Light / Night theme toggle (saved preference)
- Contact section with link pill-boxes (platform symbols) + live Google Map (UKZN, Durban)
- Publications with DOI/Link/PDF buttons + tags
- Gallery with albums + category tabs
- Responsive — mobile par hamburger menu
- Footer with location link
