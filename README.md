# GS-Petto

GS-Petto is a static, product-grade pet marketplace and adoption frontend. It is built with plain HTML, CSS, and vanilla JavaScript so it can run locally with no framework, bundler, or backend.

## Product Scope

The app presents a full marketplace surface for:

- Pet discovery and browsing
- Adoption listings
- Seller listing creation
- User profiles
- Messaging
- Notifications
- Seller analytics
- Admin moderation
- Product feature education

The UI has been tightened toward a professional consumer marketplace standard: restrained color, consistent typography, accessible focus states, SVG/CSS icon treatment, responsive layouts, and subtle motion.

## Run Locally

```bash
npm install
npm run serve
```

Open:

```text
http://127.0.0.1:3100
```

Build check:

```bash
npm run build
```

## Project Structure

```text
gs-petto/
--------- index.html
--------- browse.html
--------- adoption.html
--------- features.html
--------- post-ad.html
--------- login.html
--------- profile.html
--------- chat.html
--------- notifications.html
--------- seller-dashboard.html
--------- admin-dashboard.html
--------- sitemap.html
--------- css/
---   --------- design-system.css
---   --------- components.css
---   --------- product-ui.css
---   --------- features.css
---   --------- responsive.css
---   --------- animations.css
--------- js/
---   --------- main.js
---   --------- interactions.js
---   --------- animations.js
---   --------- utilities.js
---   --------- swipe.js
---   --------- data.js
--------- images/
```

## Design Tokens

Primary product tokens live in `css/design-system.css`:

```css
--ink: #10242b;
--muted: #627177;
--line: rgba(16, 36, 43, 0.10);
--paper: #fffaf8;
--mint: #e8f6f2;
--coral: #ff6f61;
--teal: #004e64;
--gold: #e9a93f;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 16px;
```

Typography:

- Headings: `Outfit`
- Body: `Inter`
- Type scale: 12, 14, 16, 18, 24, 32, 40, 56, 64, 72, 88

Color intent:

- Teal is used for trust, primary action, and system confidence.
- Coral is used for highlight, active states, and high-emphasis calls to action.
- Mint is used for soft support surfaces.
- Gold is reserved for premium or rating emphasis.

## Shared Interaction System

The shared interaction layer lives in:

- `css/product-ui.css`
- `js/interactions.js`

It provides:

- Desktop-only cursor ring with eased pointer tracking
- Button hover, active, and focus-visible states
- Card lift and image scale transitions
- SVG/CSS icon replacement for legacy text icons
- Scroll reveal with IntersectionObserver
- Count-up animation for numeric stats
- Smooth mobile menu and navigation feedback
- Reduced-motion fallbacks through `prefers-reduced-motion`

## Page-Specific Styling

`features.html` uses `css/features.css` for its product showcase layout. Shared tokens still come from `design-system.css`, while cross-page motion and polish come from `product-ui.css`.

## Accessibility Notes

- Icon-only buttons use `aria-label`.
- Focus-visible rings are provided globally.
- Motion is reduced when the user requests reduced motion.
- Layouts are constrained to avoid horizontal scrolling from mobile to desktop.

## Development Notes

- Keep the stack plain HTML, CSS, and JavaScript.
- Use shared tokens instead of page-specific color values.
- Use SVG or CSS-mask icons, not emoji.
- Keep page-specific CSS in its own file when it becomes substantial.
- Do not add dependencies unless the product genuinely needs them.
