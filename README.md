# Premium Beauty Salon — Static Website

Project overview
- A small, responsive static website for a premium Pakistani beauty salon. Built from the provided local images and designed for an elegant, luxury aesthetic (burgundy, blush, cream, gold).

Main features
- Home, About, Services, Gallery, Packages, Offers, Team, Contact pages
- Responsive layout for desktop/tablet/mobile
- Gallery with category filters and accessible lightbox (close/prev/next + keyboard)
- Appointment modal with client-side validation and WhatsApp confirmation option
- Contact form with inline validation (frontend-only)
- Scroll-triggered reveal animations using IntersectionObserver
- Fixed WhatsApp FAB for quick chat

Technologies used
- HTML, CSS, vanilla JavaScript
- No external libraries or CDNs — uses only local assets in `assets/image/`

Run locally (VS Code + Live Server)
1. Open the project folder in VS Code: `File → Open Folder` → select the project root.
2. Install the Live Server extension (if you don't have it).
3. Right-click `index.html` and choose **Open with Live Server** or use the Live Server status bar button.
4. The site will open at `http://127.0.0.1:5500/` (or similar). Navigate pages using the header links.

Project folder structure
- `index.html` — Home page
- `about.html`, `services.html`, `gallery.html`, `packages.html`, `offers.html`, `team.html`, `contact.html`
- `css/style.css` — main stylesheet
- `js/main.js` — client-side logic (navigation, animations, lightbox, forms, WhatsApp)
- `assets/image/` — all provided images (used exclusively)

Where to change the WhatsApp number
- Open `js/main.js` and update the `CONTACT_WHATSAPP_NUMBER` constant at the top of the file. The variable is used by the WhatsApp FAB and appointment confirmation button.

Notes & important setup
- The contact and appointment forms are frontend-only; they validate and show confirmations in the browser but do not submit to a server. Integrate a backend or webhook if you need persistent bookings or emails.
- The site intentionally uses only the provided local images (no external image sources).
- Accessibility: keyboard support for the gallery lightbox, aria states for the mobile nav and modals, and reduced-motion respect for users who prefer less motion.
- If you change filenames under `assets/image/`, update the image paths in the HTML files accordingly.
