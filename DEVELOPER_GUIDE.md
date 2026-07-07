# GS-Petto UI and Developer Guide

## Project Summary

GS-Petto is a static pet marketplace and adoption platform. It is built with plain HTML, CSS, and JavaScript, so it does not need a framework build step. The app presents an OLX-style pet marketplace focused on verified listings, pet adoption, seller tools, chat, notifications, dashboards, and admin moderation.

The latest UI work is on `features.html`. It turns the old feature-list page into a premium product showcase page for the app.

## How to Run

```bash
cd /Users/gugansaravanan/Desktop/gs-petto
npm install
npm run serve
```

Open:

```text
http://127.0.0.1:3100/features.html
```

Build check:

```bash
npm run build
```

The build script currently prints `Production build ready` because this is a static project.

## UI Given

The new `features.html` UI is a polished product-style feature page for GS-Petto.

### Main Screen

The first screen includes:

- Sticky GS-Petto navigation
- Large hero headline: `Everything Petto can do`
- Supporting copy explaining the marketplace system
- Primary CTA: `Explore pets`
- Secondary CTA: `Post a listing`
- Product-style preview area with pet imagery and floating UI panels
- Proof stats for marketplace systems, seller plans, and trust coverage
- A feature command strip visible at the bottom of the first desktop viewport

### Page Sections

The page is organized into these sections:

- Hero product preview
- Feature command strip
- Trust and identity
- Listing studio
- Discovery engine
- Guided workflow
- Seller dashboard and analytics
- Subscription plans
- Safety and moderation
- Final CTA

### Mobile UI

The mobile version was tuned separately:

- Headline wraps cleanly on narrow screens
- CTAs become full-width buttons
- Proof stats stack vertically
- Product preview stays clipped inside the viewport
- Mobile menu button appears beside the logo
- Layout avoids horizontal scrolling

## What I Used

### Core Technologies

- HTML5 for page structure
- CSS3 for layout, theme, responsive behavior, and UI components
- JavaScript for mobile menu behavior and existing app interactions
- `http-server` for local development
- Google Fonts: `Outfit` for headings and `Inter` for body text

### Existing Project Assets

The UI uses the existing local pet images:

- `images/hero-puppy.png`
- `images/cat-persian.png`
- `images/husky-puppy.png`

### Existing Shared CSS

The page imports:

```html
<link rel="stylesheet" href="css/design-system.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/responsive.css">
```

Then `features.html` adds page-specific CSS inside its own `<style>` block. This keeps the redesign scoped to the features page and avoids breaking other pages.

### Visual Direction

The design uses:

- Off-white and white backgrounds
- Deep teal for primary action and trust
- Coral for accents and active states
- Soft glass panels
- Clean product-dashboard styling
- 8px-style component radius
- Editorial pet imagery
- Native SVG icons instead of emoji feature cards

The goal was to make the app feel premium, trustworthy, and unique while still being practical to implement as static HTML/CSS.

## Project Structure

```text
gs-petto/
├── index.html              # Homepage
├── browse.html             # Browse pets
├── adoption.html           # Adoption page
├── features.html           # Premium features showcase
├── post-ad.html            # Post listing flow
├── login.html              # Login page
├── profile.html            # User profile
├── chat.html               # Messaging UI
├── notifications.html      # Notifications
├── seller-dashboard.html   # Seller analytics dashboard
├── admin-dashboard.html    # Admin tools
├── sitemap.html            # Site navigation
├── css/
│   ├── design-system.css   # Theme tokens, base typography, global styles
│   ├── components.css      # Shared nav, cards, buttons, layout components
│   ├── responsive.css      # Responsive rules
│   └── animations.css      # Animation helpers
├── js/
│   ├── main.js             # Shared UI interactions
│   ├── animations.js       # Animation logic
│   ├── utilities.js        # Helpers
│   ├── swipe.js            # Swipe interactions
│   └── data.js             # Sample data
├── images/
│   ├── hero-puppy.png
│   ├── cat-persian.png
│   └── husky-puppy.png
├── package.json
└── README.md
```

## Design System

### Colors Used on the New Features Page

```css
--feature-ink: #10242b;
--feature-muted: #627177;
--feature-line: rgba(16, 36, 43, 0.1);
--feature-paper: #fffaf8;
--feature-mint: #e8f6f2;
--feature-coral: #ff6f61;
--feature-teal: #004e64;
--feature-gold: #e9a93f;
--feature-radius: 8px;
```

### Typography

- Headings: `Outfit`
- Body: `Inter`
- Hero headline uses a large bold display style
- Body copy uses a calm readable line height
- Buttons and labels use heavier weights for clarity

### Components Added in `features.html`

- `.features-hero`
- `.hero-grid`
- `.feature-button`
- `.product-stage`
- `.app-panel`
- `.feature-command-strip`
- `.story-grid`
- `.workflow-row`
- `.toolkit-board`
- `.plans-board`
- `.safety-grid`
- `.final-cta`
- `.mobile-local-menu`

## Page Explanation

### 1. Hero

The hero explains the entire product in one sentence and gives users two clear actions:

- Explore the marketplace
- Post a pet listing

The right side shows a product preview with floating panels for verification, safer chat, and trust moderation. This makes the app feel like a real marketplace system, not just a list of features.

### 2. Command Strip

The command strip summarizes the main feature families:

- Identity
- Listings
- Discovery
- Messaging

This acts like a quick product map below the hero.

### 3. Feature Stories

Instead of generic cards, the page groups features into meaningful user stories:

- Trust and identity
- Listing studio
- Discovery engine

Each story includes a short explanation and specific capabilities.

### 4. Workflow Section

This explains how a user moves through the platform:

1. Create or verify an account
2. Publish a complete pet profile
3. Match with the right family
4. Chat with context
5. Measure, moderate, and grow

This makes the project easier to understand for users, developers, and reviewers.

### 5. Seller Growth

The seller dashboard mockup shows:

- Views
- Inquiries
- Conversion
- Active ads
- Boosts
- Reviews
- Listing performance

The plan panel explains Free, Pro, and Business tiers.

### 6. Safety

The safety section uses a deep teal band and covers:

- Ad moderation
- Reports
- Access control
- Health records

This reinforces that GS-Petto is designed for trust, not just browsing.

## JavaScript Used

The page uses the existing `js/main.js` for:

- Navbar scroll state
- Dark mode toggle
- Mobile nav behavior
- Shared click interactions

The features page also includes a tiny local script:

```javascript
document.getElementById('features-mobile-menu')?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('nav-links')?.classList.toggle('open');
});
```

This keeps the mobile menu visible and reliable on the custom features layout.

## Verification Done

I verified the page by:

- Running the local server with `npm run serve`
- Opening `http://127.0.0.1:3100/features.html`
- Capturing desktop and mobile screenshots with local Chrome
- Checking the generated visual concept against the implementation
- Running `npm run build`

Result:

```text
Production build ready
```

Note: this folder is not currently a git repository, so `git diff` and `git status` are not available.

## Recommended Next Improvements

1. Move the large inline CSS from `features.html` into `css/features.css`.
2. Add `features.css` only on the features page.
3. Replace static sample metrics with real data when a backend exists.
4. Add real listing upload and verification flows.
5. Add backend support for auth, chat, payments, and admin moderation.
6. Optimize pet images for web delivery.
7. Add automated visual regression tests later if the project grows.

## Short Pitch

GS-Petto is a full pet marketplace UI for buying, selling, and adopting pets. The new Features page presents it as a serious product: verified identities, safer listings, guided seller tools, discovery, chat, subscriptions, analytics, and moderation all in one clean responsive interface.
