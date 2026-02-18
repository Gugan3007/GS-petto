# 🚀 PETTO - DEVELOPER'S GUIDE

## Quick Start

```bash
cd /Users/gugansaravanan/Desktop/gs-petto
npx http-server -p 8080
# Visit http://localhost:8080
```

---

## 📂 Project Structure

```
gs-petto/
├── index.html              # Homepage
├── browse.html             # Pet browsing with filters
├── adoption.html           # Adoption program
├── features.html           # Feature showcase
├── post-ad.html            # Post new ad (4-step)
├── login.html              # Authentication
├── profile.html            # User dashboard
├── chat.html               # Messaging system
├── notifications.html      # Notification center
├── seller-dashboard.html   # Seller analytics
├── admin-dashboard.html    # Admin panel
├── sitemap.html            # Site navigation
│
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── animations.css      # GSAP animations
│   └── responsive.css      # Mobile-first design
│
├── js/
│   ├── main.js             # Core functionality
│   ├── animations.js       # Animation controllers
│   ├── canvas-background.js # Particle system
│   └── data.js             # Sample data
│
└── package.json            # Dependencies
```

---

## 🎨 Design System

### Colors
- **Primary:** `#6366F1` (Indigo)
- **Secondary:** `#10B981` (Emerald)
- **Accent:** `#F59E0B` (Amber)

### CSS Variables
```css
/* Colors */
--primary: #6366F1
--secondary: #10B981
--accent: #F59E0B

/* Spacing */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 12px
--spacing-lg: 16px
--spacing-xl: 20px
--spacing-2xl: 24px
--spacing-3xl: 32px
--spacing-4xl: 40px
--spacing-5xl: 48px
--spacing-6xl: 96px

/* Border Radius */
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px
--radius-2xl: 16px
--radius-3xl: 20px
--radius-full: 999px

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px rgba(0,0,0,0.1)
--shadow-2xl: 0 25px 50px rgba(0,0,0,0.25)
```

---

## 🛠️ Development Workflow

### Adding a New Feature

1. **Create HTML markup** in the appropriate page
2. **Add CSS variables** to `css/styles.css`
3. **Add responsive styles** to `css/responsive.css`
4. **Add animations** to `css/animations.css` (if needed)
5. **Add JavaScript** to `js/main.js` or create new file
6. **Test on all breakpoints** (mobile, tablet, desktop)

### Common CSS Patterns

```css
/* Button */
.btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--primary);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

/* Card */
.card {
    background: white;
    border: 1px solid var(--light-gray);
    border-radius: var(--radius-xl);
    padding: var(--spacing-4xl);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--primary);
}

/* Grid Layout */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
}
```

---

## 💻 JavaScript Conventions

### Event Handling
```javascript
// Bad
document.querySelector('.btn').onclick = function() { }

// Good
document.querySelector('.btn').addEventListener('click', () => {
    // Handle click
});
```

### Data Handling
```javascript
// Use localStorage for persistent data
localStorage.setItem('favorites', JSON.stringify(favorites));
const saved = JSON.parse(localStorage.getItem('favorites')) || [];

// Mock API call (for future backend integration)
async function fetchPets() {
    // const response = await fetch('/api/pets');
    // return await response.json();
}
```

### Animations with GSAP
```javascript
// Timeline animation
const tl = gsap.timeline();
tl.to('.element', { duration: 0.6, opacity: 1, y: 0 })
  .to('.element', { duration: 0.3, scale: 1.05 }, '-=0.3');

// Scroll animation
gsap.registerPlugin(ScrollTrigger);
gsap.to('.element', {
    scrollTrigger: { trigger: '.element' },
    duration: 0.6,
    opacity: 1,
    y: 0
});
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

### Mobile-First Approach
```css
/* Base (mobile) */
.card {
    grid-template-columns: 1fr;
    padding: var(--spacing-lg);
}

/* Tablet */
@media (min-width: 768px) {
    .card {
        grid-template-columns: repeat(2, 1fr);
        padding: var(--spacing-xl);
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .card {
        grid-template-columns: repeat(3, 1fr);
        padding: var(--spacing-4xl);
    }
}
```

---

## 🔗 API Integration (Future)

### Authentication
```javascript
// Login with phone/OTP
async function loginWithPhone(phone, otp) {
    const response = await fetch('/api/auth/phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
}

// Login with email
async function loginWithEmail(email, password) {
    const response = await fetch('/api/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
}
```

### Pet Listings
```javascript
// Fetch all pets
async function getPets(filters = {}) {
    const query = new URLSearchParams(filters);
    const response = await fetch(`/api/pets?${query}`);
    return await response.json();
}

// Post new ad
async function createPet(petData) {
    const response = await fetch('/api/pets', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(petData)
    });
    return await response.json();
}

// Update pet ad
async function updatePet(petId, updates) {
    const response = await fetch(`/api/pets/${petId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
    });
    return await response.json();
}
```

### Chat
```javascript
// WebSocket connection for real-time chat
const socket = new WebSocket('wss://api.petto.com/chat');

socket.onopen = () => {
    socket.send(JSON.stringify({ 
        type: 'join', 
        conversationId: 'conv-123' 
    }));
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    addMessageToChat(message);
};

// Send message
function sendMessage(conversationId, text) {
    socket.send(JSON.stringify({
        type: 'message',
        conversationId,
        text,
        timestamp: new Date()
    }));
}
```

---

## 🔐 Security Best Practices

### Authentication Token
```javascript
// Store token securely
const token = localStorage.getItem('token');

// Include in all API requests
function apiCall(endpoint, options = {}) {
    return fetch(endpoint, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });
}

// Remove token on logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}
```

### Input Validation
```javascript
// Validate email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validate phone
function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone.replace(/\D/g, ''));
}

// Sanitize user input
function sanitizeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
```

---

## 📊 Analytics Integration (Future)

```javascript
// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_ID');

// Track page view
gtag('event', 'page_view', {
    'page_title': document.title,
    'page_location': window.location.href
});

// Track custom events
gtag('event', 'ad_posted', {
    'ad_id': adId,
    'pet_type': petType,
    'price': price
});

gtag('event', 'message_sent', {
    'conversation_id': convId,
    'sender_id': senderId
});
```

---

## 🧪 Testing Checklist

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Chrome Mobile
- [ ] Safari iOS

### Responsive Testing
- [ ] Mobile (360px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px)
- [ ] Large desktop (1440px)
- [ ] Ultra-wide (1920px)

### Functionality Testing
- [ ] Navigation works on all pages
- [ ] Forms validate inputs
- [ ] Search/filter functionality
- [ ] Favorites persist (localStorage)
- [ ] Animations smooth
- [ ] Images load
- [ ] Videos work
- [ ] Chat mock responses
- [ ] Notifications display

### Performance Testing
- [ ] Page load < 3s
- [ ] Animations 60fps
- [ ] No console errors
- [ ] Images optimized
- [ ] Code minified

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All pages tested
- [ ] CSS/JS minified
- [ ] Images optimized
- [ ] SEO tags added
- [ ] 404 page created
- [ ] Robots.txt configured

### Deployment
- [ ] Choose hosting (Vercel, Netlify, AWS)
- [ ] Set up domain
- [ ] Configure SSL/HTTPS
- [ ] Set up CDN
- [ ] Deploy to production

### Post-Deployment
- [ ] Test all pages
- [ ] Monitor analytics
- [ ] Set up monitoring
- [ ] Create backup
- [ ] Document deployment

---

## 🔧 Debugging Tips

### Common Issues

**Issue:** CSS not loading
```javascript
// Check if stylesheet is linked
console.log(document.styleSheets);

// Force reload
Ctrl + Shift + R (hard refresh)
```

**Issue:** JavaScript errors
```javascript
// Check console
F12 > Console tab

// Add debugging
console.log('value:', variable);
console.table(data);
console.error('error:', error);
```

**Issue:** Images not showing
```javascript
// Check image path
console.log(document.querySelectorAll('img'));

// Verify path is correct relative to HTML file
```

**Issue:** Animations not working
```javascript
// Check GSAP is loaded
console.log(gsap);

// Check timeline
tl.resume(); // If paused
```

---

## 📚 Resources

### Documentation
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [GSAP Documentation](https://greensock.com/docs/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Tools
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [HTML Validator](https://validator.w3.org/)
- [Color Picker](https://htmlcolorcodes.com/)
- [Responsive Tester](https://responsively.app/)

---

## 🎓 Code Standards

### Naming Conventions
```javascript
// Classes: PascalCase
class UserProfile { }

// Functions: camelCase
function getUserData() { }

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// CSS Classes: kebab-case
.user-profile { }
.btn-primary { }
```

### Code Style
```javascript
// Use const/let, not var
const name = 'Petto';
let count = 0;

// Use arrow functions
const add = (a, b) => a + b;

// Use template strings
const message = `Hello, ${name}!`;

// Use async/await
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 📞 Support

For issues or questions:
1. Check documentation files (README.md, OLX_FEATURES_COMPLETE.md)
2. Review inline code comments
3. Check browser console for errors
4. Test in different browsers
5. Verify file paths and assets

---

## 🎉 Next Steps

1. **Backend Development**
   - Set up Node.js/Express server
   - Create MongoDB/PostgreSQL database
   - Implement REST APIs

2. **Real-Time Features**
   - Add Socket.io for chat
   - Implement push notifications
   - Real-time view counts

3. **Payment Integration**
   - Integrate Stripe/Razorpay
   - Build subscription system
   - Transaction history

4. **Deployment**
   - Choose hosting provider
   - Set up CI/CD pipeline
   - Configure monitoring

---

*Last Updated: February 2024*
*Version: 1.0.0*
