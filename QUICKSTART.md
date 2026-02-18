# 🚀 Quick Start Guide - Petto

## Welcome to Petto! 🐾

This guide will help you get started with your pet marketplace in just a few minutes.

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm run dev
```
or
```bash
npx http-server -p 8080 -o
```

### Step 3: Open Your Browser
The website should automatically open at:
- `http://localhost:8080` (or the port shown in terminal)

**That's it!** 🎉

---

## 📂 File Structure Overview

```
gs-petto/
├── index.html           ← Main homepage (START HERE)
├── browse.html          ← Pet browsing with filters
├── adoption.html        ← Adoption section
├── showcase.html        ← Feature showcase
├── css/
│   ├── styles.css       ← Main styles
│   ├── animations.css   ← All animations
│   └── responsive.css   ← Mobile styles
└── js/
    ├── main.js          ← Core functionality
    ├── animations.js    ← GSAP animations
    ├── canvas-background.js ← Particle effects
    └── data.js          ← Sample pet data
```

---

## 🎨 Pages to Explore

1. **Homepage** (`index.html`)
   - Splash screen animation
   - Hero section
   - Category browsing
   - Featured pets
   - Adoption banner

2. **Browse Pets** (`browse.html`)
   - Filter sidebar
   - All pet listings
   - Sort options

3. **Adoption** (`adoption.html`)
   - Free adoption pets
   - How it works
   - Success stories

4. **Showcase** (`showcase.html`)
   - Feature overview
   - Tech stack
   - Quick navigation

---

## 🎯 What to Test

### Animations ✨
- Watch the splash screen (refresh to see again)
- Scroll to see cards animate in
- Hover over category cards
- Hover over pet cards
- Check the floating background particles

### Interactions 🖱️
- Click category cards
- Click favorite hearts (❤️)
- Open login modal
- Try mobile menu (resize window)
- Use search bar
- Test responsive design

### Favorites System 💝
- Click heart icons on pet cards
- Favorites persist on page reload
- Check browser localStorage

---

## 🛠️ Customization Tips

### Change Colors
Edit `css/styles.css`, look for `:root` variables:
```css
--primary: #FF6B9D;      /* Main pink color */
--secondary: #4ECDC4;    /* Teal color */
--accent: #FFE66D;       /* Yellow color */
```

### Add More Pets
Edit `js/data.js`:
```javascript
petData.featured.push({
    id: 7,
    name: "New Pet",
    breed: "Breed Name",
    // ... add more details
});
```

### Adjust Animations
Edit `js/animations.js` for GSAP settings
Edit `css/animations.css` for CSS animations

---

## 📱 Responsive Testing

Test on different screen sizes:
- **Desktop**: 1920px, 1440px, 1280px
- **Tablet**: 1024px, 768px
- **Mobile**: 480px, 375px, 360px

Or use browser DevTools:
1. Press `F12` (Chrome/Firefox)
2. Click device toggle icon
3. Select different devices

---

## 🐛 Troubleshooting

### Server Port Already in Use?
```bash
npx http-server -p 8080 -o    # Try port 8080
npx http-server -p 3001 -o    # Or try 3001
```

### Animations Not Working?
1. Check console for errors (F12)
2. Ensure GSAP CDN is loading
3. Clear browser cache (Ctrl/Cmd + Shift + R)

### Images Not Loading?
- This is normal! Using placeholder URLs
- Replace with your own images in production

---

## 🎨 Design Guidelines

### Kid-Friendly Features
- Large, readable text
- Bright, soft colors
- Emoji icons
- Simple navigation
- Smooth animations

### Accessibility
- Semantic HTML
- Keyboard navigation
- Readable font sizes
- Good color contrast

---

## 🚀 Next Steps

### For Development
1. Add backend API (Node.js/Express)
2. Setup database (MongoDB/PostgreSQL)
3. Implement user authentication
4. Add image upload
5. Create admin dashboard

### For Production
1. Optimize images
2. Minify CSS/JS
3. Setup CDN
4. Add SEO meta tags
5. Configure analytics
6. Setup error tracking

---

## 📚 Learning Resources

### GSAP Animation
- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger](https://greensock.com/scrolltrigger/)

### Canvas API
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

### Responsive Design
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

## 💡 Pro Tips

1. **Refresh to See Splash**: The splash screen shows once - refresh page to see it again

2. **Inspect Animations**: Open DevTools and watch the GSAP animations in slow motion

3. **LocalStorage**: Open DevTools > Application > LocalStorage to see saved favorites

4. **Mobile First**: Always test mobile view first, then scale up

5. **Performance**: The canvas background can be disabled for better performance if needed

---

## 🎉 Have Fun!

Petto is built with love for pets and pet lovers. Feel free to:
- Experiment with colors
- Add your own animations
- Create new pages
- Build the backend
- Share with friends

**Questions or Issues?**
Check the README.md for more details!

---

**Made with ❤️ by GS**

🐾 Happy coding! 🐾
