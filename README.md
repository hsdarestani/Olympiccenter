# Olympic Center Ebnoutalib

Responsive German language website for the Olympic Center Ebnoutalib in Frankfurt am Main. Static HTML, CSS and JavaScript, with no build dependencies.

## Cloudflare Pages deployment

1. Open Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Connect GitHub repository hsdarestani/Olympiccenter.
3. Production branch: main.
4. Framework preset: None.
5. Build command: leave empty (or use exit 0 if required).
6. Build output directory: . (a single dot, the project root).
7. Click Deploy and add your custom domain when ready.

## Project files

* index.html: complete landing page with training, team, schedule, FAQ and trial enquiry
* styles.css: visual design, motion and responsive styling
* app.js: working mobile menu, local enquiry generation and clipboard copy
* favicon.svg: temporary typographic logo
* _headers: security and cache configuration for Cloudflare Pages
* impressum.html and datenschutz.html: legal drafts
* legal.css and 404.html: supporting pages

## Before public launch

IMPORTANT: Legal information on Impressum and Datenschutz is incomplete. The club operator's verified legal name, official business address, email and responsible entity are not yet known and must be added. Training location must not be assumed to be the official address.

Training timetable in the newer-looking screenshot: Tuesday and Thursday, group 1 from 18:00 to 19:00 and group 2 from 19:00 to 20:00. A second screenshot shows Wednesday and Friday sessions. Please verify current times, groups and venue before announcing them as final.

The trial enquiry form generates a personalized message locally for the visitor to copy and send via Instagram. There is no backend, automatic registration or email sending, so no enquiry will be lost to an unavailable form endpoint.

Photos are illustrative Pexels assets loaded remotely and are not photos of this club. For production, replace with authorized real team photographs and consider hosting them locally after licensing review.

The OC logo is a temporary typographic brandmark pending a high resolution official club logo.

## Public channel

https://www.instagram.com/oc.ebnoutalib/
