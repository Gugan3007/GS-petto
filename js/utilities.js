/* ========================================
   PETTO PERFORMANCE & UTILITIES
   ========================================  */

/**
 * Debounce utility for scroll/resize events
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Throttle utility for frequent events
 */
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Detect if element is in viewport
 */
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.bottom >= 0 &&
        rect.right >= 0
    );
};

/**
 * Detect browser and device capabilities
 */
const BrowserDetect = {
    isTouch: () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    },
    
    isPrefersReducedMotion: () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    
    supportsCSSBackdrop: () => {
        const element = document.createElement('div');
        return element.style.backdropFilter !== undefined;
    },
    
    supportsWebGL: () => {
        try {
            return !!document.createElement('canvas').getContext('webgl');
        } catch (e) {
            return false;
        }
    },
    
    getDevicePixelRatio: () => {
        return window.devicePixelRatio || 1;
    },
    
    isHighDPI: () => {
        return window.devicePixelRatio >= 2;
    }
};

/**
 * Performance timing utilities
 */
const PerformanceMetrics = {
    start: {},
    
    mark(name) {
        this.start[name] = performance.now();
    },
    
    measure(name) {
        if (!this.start[name]) return null;
        const duration = performance.now() - this.start[name];
        console.log(`   ${name}: ${duration.toFixed(2)}ms`);
        return duration;
    },
    
    logMetrics() {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.group(' Performance Metrics');
            console.log(`DNS: ${perfData.domainLookupEnd - perfData.domainLookupStart}ms`);
            console.log(`TCP: ${perfData.connectEnd - perfData.connectStart}ms`);
            console.log(`TTFB: ${perfData.responseStart - perfData.requestStart}ms`);
            console.log(`DOM Content: ${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`);
            console.log(`Page Load: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            console.groupEnd();
        }
    }
};

/**
 * Request animation frame wrapper for smooth animations
 */
const RAFQueue = {
    queue: [],
    isScheduled: false,
    
    add(callback) {
        this.queue.push(callback);
        this.schedule();
    },
    
    schedule() {
        if (!this.isScheduled) {
            this.isScheduled = true;
            requestAnimationFrame(() => this.flush());
        }
    },
    
    flush() {
        const callbacks = this.queue.slice();
        this.queue = [];
        this.isScheduled = false;
        callbacks.forEach(cb => cb());
    }
};

/**
 * Intersection Observer wrapper for lazy loading
 */
class LazyObserver {
    constructor(selector, callback, options = {}) {
        const defaultOptions = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { ...defaultOptions, ...options });
        
        document.querySelectorAll(selector).forEach(el => this.observer.observe(el));
    }
    
    disconnect() {
        this.observer.disconnect();
    }
}

/**
 * Resource loading with fallback
 */
const ResourceLoader = {
    loadScript(src, attributes = {}) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            
            Object.entries(attributes).forEach(([key, value]) => {
                script.setAttribute(key, value);
            });
            
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },
    
    loadStylesheet(href, attributes = {}) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            
            Object.entries(attributes).forEach(([key, value]) => {
                link.setAttribute(key, value);
            });
            
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }
};

/**
 * Local storage wrapper with expiration
 */
class StorageManager {
    static set(key, value, expirationMinutes = null) {
        const data = {
            value: value,
            timestamp: Date.now(),
            expiration: expirationMinutes ? expirationMinutes * 60 * 1000 : null
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    static get(key) {
        const data = JSON.parse(localStorage.getItem(key));
        if (!data) return null;
        
        if (data.expiration && Date.now() - data.timestamp > data.expiration) {
            localStorage.removeItem(key);
            return null;
        }
        
        return data.value;
    }
    
    static remove(key) {
        localStorage.removeItem(key);
    }
    
    static clear() {
        localStorage.clear();
    }
}

/**
 * URL utilities
 */
const URLUtils = {
    getQueryParam(key) {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    },
    
    setQueryParam(key, value) {
        const params = new URLSearchParams(window.location.search);
        params.set(key, value);
        window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    },
    
    hasQueryParam(key) {
        const params = new URLSearchParams(window.location.search);
        return params.has(key);
    },
    
    getAllQueryParams() {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    }
};

/**
 * Color utilities
 */
const ColorUtils = {
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    
    isDarkColor(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return false;
        const luminance = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return luminance < 128;
    }
};

/**
 * Array utilities
 */
const ArrayUtils = {
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },
    
    chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    
    unique(array) {
        return [...new Set(array)];
    },
    
    findDuplicates(array) {
        return array.filter((value, index, self) => self.indexOf(value) !== index);
    }
};

/**
 * String utilities
 */
const StringUtils = {
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    camelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
            index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '');
    },
    
    slugify(str) {
        return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    },
    
    truncate(str, length) {
        return str.length > length ? str.slice(0, length) + '...' : str;
    },
    
    isEmpty(str) {
        return !str || str.trim() === '';
    }
};

/**
 * Object utilities
 */
const ObjectUtils = {
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    merge(...objects) {
        return Object.assign({}, ...objects);
    },
    
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },
    
    keys(obj) {
        return Object.keys(obj);
    },
    
    values(obj) {
        return Object.values(obj);
    }
};

/**
 * Cookie utilities
 */
const CookieUtils = {
    set(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    },
    
    get(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length);
            }
        }
        return null;
    },
    
    remove(name) {
        this.set(name, "", -1);
    }
};

/**
 * Validation utilities
 */
const ValidationUtils = {
    isEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    isPhoneNumber(phone) {
        const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        return regex.test(phone);
    },
    
    isStrongPassword(password) {
        return password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /[0-9]/.test(password) &&
               /[^A-Za-z0-9]/.test(password);
    },
    
    isURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
};

/**
 * Initialize and log utilities availability
 */
console.log('  Utility libraries loaded:');
console.log('    BrowserDetect, PerformanceMetrics, RAFQueue');
console.log('    StorageManager, URLUtils, ColorUtils');
console.log('    ArrayUtils, StringUtils, ObjectUtils');
console.log('    CookieUtils, ValidationUtils');
console.log('    debounce(), throttle(), isInViewport()');
