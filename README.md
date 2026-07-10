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

Primary product tokens live in `css/design-system.css`. GS-Petto now uses a deliberate dual-tone system:

```css
--surface-light-bg: #fffaf8;
--surface-light-bg-alt: #e8f6f2;
--surface-light-surface: #ffffff;
--surface-light-text: #10242b;
--surface-light-text-muted: #4b585d;
--surface-light-border: rgba(16, 36, 43, 0.14);

--surface-dark-bg: #004e64;
--surface-dark-bg-alt: #013847;
--surface-dark-surface: #073f4f;
--surface-dark-text: #f5faf9;
--surface-dark-text-muted: #c8dcdf;
--surface-dark-border: rgba(245, 250, 249, 0.18);

--accent-coral: #ff6f61;
--accent-coral-text: #c74337;
--accent-coral-on-dark: #ff9a8f;
--accent-gold: #e9a93f;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 16px;
```

Typography:

- Headings: `Outfit`
- Body: `Inter`
- Type scale: 12, 14, 16, 18, 24, 32, 40, 56, 64, 72, 88

Color intent:

- Light tone is used for browsing, forms, profiles, listings, and normal content.
- Dark tone is reserved for trust, safety, premium, footer, and high-emphasis product sections.
- Coral is an accent. Use `--accent-coral-text` for readable text on light surfaces and `--accent-coral-on-dark` on dark surfaces.
- New colors must be added as tokens in `css/design-system.css`. Do not introduce hardcoded hex/rgb/hsl colors in page CSS, inline styles, or JS-generated UI.
- Components that change background must set text, muted text, border, link, and icon color from the same tone. Use `.tone-light` or `.tone-dark` instead of one-off color overrides.

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
