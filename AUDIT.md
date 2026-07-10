# GS-Petto Phase 0 UI Audit

Date: 2026-07-09

## Scope Inventory

### Root HTML Pages

- `index.html` - current product homepage; loads `design-system.css`, shared components, `product-ui.css`, and `home.css`.
- `browse.html` - discovery/search/swipe page; shared modern CSS plus inline layout styles.
- `adoption.html` - adoption listing page; shared modern CSS plus inline adoption styles.
- `features.html` - feature overview page; shared CSS plus separate `css/features.css`.
- `post-ad.html` - seller listing wizard; shared modern CSS plus inline wizard styles.
- `login.html` - auth form; shared modern CSS plus inline auth styles.
- `pet-details.html` - listing detail page; shared modern CSS plus many inline detail styles.
- `profile.html` - older account page; loads `css/styles.css` plus large inline styles.
- `chat.html` - older chat page; loads `css/styles.css` plus large inline styles.
- `notifications.html` - older notification center; loads `css/styles.css` plus large inline styles.
- `seller-dashboard.html` - older seller dashboard; loads `css/styles.css` plus large inline styles.
- `admin-dashboard.html` - older admin dashboard; loads `css/styles.css` plus large inline styles.
- `sitemap.html` - older sitemap/project guide; loads `css/styles.css` plus inline styles.
- `showcase.html` - standalone showcase page; currently has its own complete inline style system.

### CSS Files

- `css/design-system.css` - global reset, base tokens, typography, dark-mode variables.
- `css/components.css` - largest shared component library; contains many hardcoded colors and legacy gradients.
- `css/responsive.css` - shared breakpoints and mobile nav rules.
- `css/animations.css` - animation keyframes/utilities; contains loader/particle styles.
- `css/product-ui.css` - current cross-page polish override layer.
- `css/home.css` - homepage-specific layout and trust/listing sections.
- `css/features.css` - feature-page-specific layout with its own `--feature-*` token island.
- `css/styles.css` - import aggregator for older pages.

### JS Files

- `js/data.js` - sample listings/testimonials/category data.
- `js/main.js` - theme toggle, mobile nav, navbar scroll, favorites, reveal setup.
- `js/interactions.js` - shared icon normalization, cursor effect, reveal, counters, favorites.
- `js/swipe.js` - swipe deck interactions.
- `js/animations.js` - GSAP animations if GSAP is present.
- `js/utilities.js` - generic helpers.

### Missing Referenced Asset

- `profile.html`, `chat.html`, `notifications.html`, `seller-dashboard.html`, `admin-dashboard.html`, and `sitemap.html` reference `js/canvas-background.js`, but that file is not present. This creates console errors and a missing background behavior.

## Color System Trace

### Existing Token Sources

- `css/design-system.css` defines the main tokens: `--ink`, `--muted`, `--line`, `--paper`, `--mint`, `--coral`, `--teal`, `--gold`, text variables, glass variables, borders, shadows, radius, spacing, type scale, motion, and z-indexes.
- `css/product-ui.css` defines a second token layer: `--brand-primary`, `--brand-primary-strong`, `--brand-accent`, `--ui-bg`, `--ui-surface`, `--ui-border`, `--ui-soft`, `--font-logo`.
- `css/features.css` defines an independent third token layer: `--feature-ink`, `--feature-muted`, `--feature-line`, `--feature-paper`, `--feature-mint`, `--feature-coral`, `--feature-teal`, `--feature-gold`.
- Inline page styles define old token references such as `--primary`, `--secondary`, `--accent`, `--black`, `--dark-gray`, and `--light-gray`. Those are not defined in `design-system.css`, so they rely on legacy imports or collapse unpredictably.

### Hardcoded Color Bypass Patterns

- `components.css` hardcodes gradients and state colors such as `#27AE60`, `#2ECC71`, `#E74C3C`, `#FF6F61`, many `rgba(255,111,97,...)`, and white text/backgrounds.
- `features.css` hardcodes feature-page backgrounds, safety-band transparencies, `#fff`, `#eef7f5`, `#dcebe7`, `#ffb4aa`, and dark-surface white overlays outside the global token system.
- Older inline page styles hardcode `white`, `black`, `#ef4444`, `#f9fafb`, `rgba(99,102,241,...)`, and status colors.
- `showcase.html` is entirely off-system, using purple/pink gradients (`#667eea`, `#764ba2`, `#FF6B9D`) unrelated to GS-Petto.

## Contrast/Visibility Findings

File: `index.html` / `css/home.css`
Issue: `.trust-band`, `.trust-grid`, and `.trust-item` place white text in a dark section, but only child elements receive dark backgrounds; computed ancestors can resolve as white/transparent, producing fragile text/background pairing.
Root cause: Dark tone is applied section-by-section rather than via a reusable `.tone-dark` scoped token contract.
Fix approach: Introduce `.tone-dark` and apply it to trust/safety/footer bands; ensure all headings, paragraphs, icons, links, and borders inside use dark-surface tokens.

File: `index.html`
Issue: `.nav-link.active` computed contrast is low because dark text is placed over a faint translucent teal active background.
Root cause: Active nav states use transparent fills without explicit text/background pairing.
Fix approach: Use tokenized nav active state with solid enough light-tone background and dark-tone text.

File: `browse.html` / `adoption.html`
Issue: `.pet-card-body`, `.pet-card-price`, `.badge-free`, and inherited coral text fail AA on white (`#ff6f61` on white is about 2.7:1).
Root cause: Price/badge text inherits `--coral` as normal body text instead of using darker text or a filled badge surface.
Fix approach: Use `--accent-coral-text` for text on light surfaces and filled/outlined badge variants with explicit backgrounds.

File: `browse.html`
Issue: Footer text and links use muted light-surface color on a dark teal footer.
Root cause: Footer does not scope dark-surface muted/link tokens.
Fix approach: Footer should be `.tone-dark`.

File: `adoption.html`
Issue: Hero accent `span`, adoption stats, story labels, and free badges use coral on white below AA.
Root cause: Decorative accent color is used as readable text color.
Fix approach: Replace readable accent text with `--accent-coral-text`; reserve bright coral for icons/borders/large fills.

File: `features.html` / `css/features.css`
Issue: Feature page owns a separate `--feature-*` palette and safety section white-on-translucent-white cards are fragile on dark backgrounds.
Root cause: Independent feature tokens bypass the global system and dark section children do not inherit a consistent dark tone.
Fix approach: Map feature tokens to global tone tokens and scope safety sections with `.tone-dark`.

File: `post-ad.html`
Issue: Nav active state has the same low-contrast translucent state as other pages.
Root cause: Shared nav active rule.
Fix approach: Fix in shared nav CSS.

File: `login.html`
Issue: `Forgot password?` and `Create an account` use coral link text on a near-white auth surface below AA.
Root cause: Global link color is bright coral.
Fix approach: Use darker light-surface link token.

File: `profile.html`
Issue: `.sidebar-menu-item.active` uses old purple translucent background with inherited ink, sampled around 3.18:1.
Root cause: Legacy page styles use `rgba(99,102,241,0.1)` outside tokens.
Fix approach: Override active states to use light-tone selected surface and strong teal text/border.

File: `chat.html`
Issue: `.conversation-item.active` uses old purple translucent background; `.message-content` can render white text on very light message bubbles.
Root cause: Legacy chat styles combine inherited message colors with old background values.
Fix approach: Define sent/received message variants with explicit bg/text tokens.

File: `notifications.html`
Issue: `.filter-btn.active` can compute white text over white; unread notification rows use old purple translucent background with low contrast.
Root cause: Legacy active/unread state colors bypass tokens.
Fix approach: Tokenized active buttons and unread row backgrounds.

File: `seller-dashboard.html`
Issue: `.seller-upgrade`, `.feature-btn`, and `.badge` can compute white text over white because button backgrounds are old undefined variables or overridden by shared rules.
Root cause: Old inline styles refer to `--primary` and generic `.badge` without a guaranteed filled background.
Fix approach: Define legacy alias tokens and explicit dashboard button/badge styles in the shared product layer.

File: `admin-dashboard.html`
Issue: Danger buttons and suspended badges use `#ef4444` on white/pale red below 4.5:1.
Root cause: Raw red is used for body-sized action text.
Fix approach: Use darker danger text token and filled/outlined badge pairing.

File: `sitemap.html`
Issue: `.page-path` old purple translucent background is low contrast; CTA section buttons can be white on translucent white.
Root cause: Standalone inline styles and old `btn-secondary` assumptions.
Fix approach: Tokenized code pill and CTA button overrides.

File: `pet-details.html`
Issue: Premium badge, seller avatar, AR button, and adopt/offer CTA styles can compute white text on light/glass backgrounds or purple text on purple translucent fill.
Root cause: Hardcoded inline detail styles and badge/CTA variants lack explicit paired bg/text.
Fix approach: Shared badge/button variant fixes plus detail-page overrides.

File: `showcase.html`
Issue: Entire page is off-brand; pink headings on translucent white cards and white text on translucent white badges fail contrast.
Root cause: Complete standalone style system unrelated to GS-Petto tokens.
Fix approach: Move the page onto the same light/dark tone system or make it an intentionally dark-tone marketing showcase with compliant token colors.

## Phase 1 Implementation Direction

1. Add explicit dual-tone tokens in `design-system.css`.
2. Add `.tone-light` and `.tone-dark` scope classes that set local surface/text/muted/border/link variables.
3. Add legacy aliases (`--primary`, `--secondary`, `--accent`, `--black`, `--dark-gray`, `--light-gray`) mapped to the new system to stabilize older inline styles.
4. Override shared components in `product-ui.css` so cards, buttons, badges, nav, forms, notifications, chat messages, dashboards, and footers use token pairings.
5. Normalize feature and showcase pages away from their independent palettes.
6. Remove or neutralize emoji-like text markers via SVG/icon CSS where practical.

