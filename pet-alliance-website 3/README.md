# Pet Alliance website

A responsive, static website introducing Pet Alliance to pet business owners and the public.

## Preview

Open `index.html` in a browser. The site uses `styles.css` and `script.js` from the same folder. It loads DM Sans and Manrope from Google Fonts when the visitor has internet access; system sans-serif fallbacks are defined.

## Before publishing

1. Add the approved Pet Alliance contact email in `script.js` at `const email = '';`. When it is set, the inquiry form opens the visitor's email app with their message addressed to Pet Alliance. Without it, the site explains that sending is not configured and offers to copy the inquiry text.
2. Replace or supplement the team description with approved names, biographies, and substantiated credentials.
3. Add the selected legal entity name, privacy notice, and any other disclosures required in the launch jurisdiction.
4. Confirm the content, contact route, and domain before publication.

The site contains no visitor-tracking code and the inquiry form does not transmit information to a server.

The homepage hero uses a locally rendered canvas network animation over a CSS gradient, rather than a downloaded video. This keeps the effect lightweight and self-contained; visitors who prefer reduced motion see a still network field.

Partner logos are stored as transparent PNGs in `assets/` and displayed on the existing page background. The logo strip moves from left to right, pauses on hover, and stays still when reduced motion is enabled.
