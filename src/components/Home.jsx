import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Search,
  User,
  ShoppingBag,
  ArrowUpRight,
  Star,
  Check,
  Heart,
  Sparkles,
  Droplets,
  ShieldCheck,
  Leaf,
  Plus,
  Minus,
  X,
  ChevronRight,
  Menu
} from 'lucide-react';
import './Home.css';

// Import local images from src/assets/images
import heroModelImg from '../assets/images/hero-model.jpg';
import cardModel1 from '../assets/images/card-model-1.jpg';
import cardModel2 from '../assets/images/card-model-2.jpg';
import cardModel3 from '../assets/images/card-model-3.jpg';
import pureglowElixirImg from '../assets/images/pureglow-elixir.jpg';
import revitaluxeCreamImg from '../assets/images/revitaluxe-cream.jpg';
import lumicrestSerumImg from '../assets/images/lumicrest-serum.jpg';
import hydrabloomImg from '../assets/images/hydrabloom-moisturizer.jpg';
import brandLifestyleImg from '../assets/images/brand-lifestyle.jpg';
import textureCreamImg from '../assets/images/texture-cream.jpg';
import textureSerumImg from '../assets/images/texture-serum.jpg';
import textureBotanicalsImg from '../assets/images/texture-botanicals.jpg';
import aloeVeraImg from '../assets/images/aloe-vera-botanical.jpg';
import creamSwatchImg from '../assets/images/cream-swatch-marble.jpg';
import veganCleanBeautyImg from '../assets/images/vegan-clean-beauty.jpg';
import cleanFormulaDropletImg from '../assets/images/clean-formula-droplet.jpg';

export default function Home() {
  // State for interactive features
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'PureGlow Elixir',
      price: 1999,
      quantity: 1,
      image: pureglowElixirImg,
      size: '30ml / 1.0 fl oz'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeRoutineStep, setActiveRoutineStep] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');

  // Smooth scroll handler for navbar links
  const scrollToSection = (e, sectionId) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveNav(sectionId);
    }
  };

  // Why Choose Us Section state & observer
  const [whyChooseSlide, setWhyChooseSlide] = useState(0);
  const [isWhyChooseInView, setIsWhyChooseInView] = useState(false);
  const whyChooseRef = useRef(null);

  // Parallax mouse position for Hero Mosaic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    // Reset scroll position on refresh so the entrance animation plays from top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    AOS.init({
      duration: 850,
      once: true,
      easing: 'ease-out-cubic',
      offset: 60
    });

    // Observer for Why Choose Us section scroll-in entrance animations
    const whyChooseObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsWhyChooseInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (whyChooseRef.current) {
      whyChooseObserver.observe(whyChooseRef.current);
    }

    // Scroll spy to update active navbar link as user scrolls
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 140;
      const sectionIds = ['home', 'shop', 'about', 'routine', 'journal'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });

    return () => {
      whyChooseObserver.disconnect();
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  // Handle hero mouse parallax
  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Toast trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Add to cart handler
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to bag`);
  };

  // Update cart item quantity
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Cart total calculations
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Products Data
  const products = [
    {
      id: 1,
      name: 'PureGlow Elixir',
      category: 'Elixirs',
      price: 1999,
      rating: 4.9,
      reviews: 142,
      tag: 'Best Seller',
      description:
        'A concentrated facial elixir infused with cold-pressed rosehip, jojoba, and 24k botanical lipids for an instant glass-skin radiance.',
      image: pureglowElixirImg,
      size: '30ml / 1.0 fl oz'
    },
    {
      id: 2,
      name: 'RevitaLuxe Cream',
      category: 'Creams',
      price: 2499,
      rating: 5.0,
      reviews: 98,
      tag: 'Award Winner',
      description:
        'Velvety whipped barrier repair cream with multi-molecular ceramides, shea butter, and peptides for 72-hour deep moisture cushion.',
      image: revitaluxeCreamImg,
      size: '50ml / 1.7 fl oz'
    },
    {
      id: 3,
      name: 'LumiCrest Serum',
      category: 'Serums',
      price: 2199,
      rating: 4.8,
      reviews: 215,
      tag: 'Staff Favorite',
      description:
        'Stabilized 15% Vitamin C and camellia essence formulated to fade dark spots, even tone, and shield skin against daily oxidative stress.',
      image: lumicrestSerumImg,
      size: '30ml / 1.0 fl oz'
    },
    {
      id: 4,
      name: 'HydraBloom Moisturizer',
      category: 'Moisturizers',
      price: 1699,
      rating: 4.9,
      reviews: 178,
      tag: 'New Arrival',
      description:
        'Lightweight, soothing blossom-infused gel-cream that drenches thirsty skin with micro-droplets of hyaluronic acid and damask rose water.',
      image: hydrabloomImg,
      size: '50ml / 1.7 fl oz'
    }
  ];

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: 'Elena Rostova',
      location: 'Milan, Italy',
      role: 'Beauty Editor',
      rating: 5,
      product: 'PureGlow Elixir',
      text: '“Glisty has genuinely transformed my morning skincare ritual. The PureGlow Elixir melts effortlessly into the skin without greasy residue, leaving a luminous, healthy glow that lasts all day.”'
    },
    {
      id: 2,
      name: 'Sophia Chen',
      location: 'San Francisco, CA',
      role: 'Verified Buyer',
      rating: 5,
      product: 'RevitaLuxe Cream',
      text: '“I have dry, sensitive skin that reacts to almost everything. The RevitaLuxe Cream healed my compromised moisture barrier within two weeks. My complexion looks plump, hydrated, and calm.”'
    },
    {
      id: 3,
      name: 'Camille Laurent',
      location: 'Paris, France',
      role: 'Dermatology Aesthetician',
      rating: 5,
      product: 'LumiCrest Serum',
      text: '“The ingredient biocompatibility is sublime. The formulation delivers active botanical nutrients right where the skin needs it most. Glisty represents the pinnacle of modern clean luxury.”'
    }
  ];

  // Routine Steps Data with Model Images and Paired Essentials
  const routineSteps = [
    {
      step: 1,
      title: 'Cleanse',
      subtitle: 'Start Fresh & Balanced',
      desc: 'Melt away daily impurities, makeup, and urban pollutants with our pH-balanced botanical gel cleanser that respects your skin’s natural lipid barrier without tightness.',
      action: 'Step 1 • Morning & Night',
      keyIngredient: 'White Camellia & Chamomile',
      frequency: 'Twice daily • 60 seconds',
      texture: 'Silky botanical gel-to-milk',
      image: cardModel1,
      imageAlt: 'Model demonstrating gentle botanical cleansing routine',
      badge: 'Step 01 • Purify & Prep',
      product: {
        id: 1,
        name: 'PureGlow Elixir',
        price: 1999,
        image: pureglowElixirImg,
        size: '30ml / 1.0 fl oz'
      }
    },
    {
      step: 2,
      title: 'Treat',
      subtitle: 'Nourish & Illuminate',
      desc: 'Deliver concentrated active vitamins, peptides, and natural antioxidants deep into the dermal layers using LumiCrest Serum and PureGlow Elixir for cellular renewal.',
      action: 'Step 2 • Active Infusion',
      keyIngredient: 'Bio-Fermented Vitamin C & Squalane',
      frequency: 'Daily morning & night • 3-4 drops',
      texture: 'Weightless micro-essence',
      image: cardModel2,
      imageAlt: 'Model applying luminous active serum to cheekbones',
      badge: 'Step 02 • Active Radiance',
      product: {
        id: 3,
        name: 'LumiCrest Serum',
        price: 2199,
        image: lumicrestSerumImg,
        size: '30ml / 1.0 fl oz'
      }
    },
    {
      step: 3,
      title: 'Moisturize',
      subtitle: 'Lock In Dewy Hydration',
      desc: 'Seal in essential moisture and fortify your skin’s natural defense with RevitaLuxe Cream. Formulated to cushion skin against moisture loss for supple plumpness.',
      action: 'Step 3 • Barrier Protection',
      keyIngredient: 'Ceramide Complex & Botanical Hyaluronic',
      frequency: 'Lock-in step • Dime-sized amount',
      texture: 'Whipped velvety cloud cream',
      image: cardModel3,
      imageAlt: 'Model smoothing luxurious moisturizer into skin',
      badge: 'Step 03 • Seal & Hydrate',
      product: {
        id: 2,
        name: 'RevitaLuxe Cream',
        price: 2499,
        image: revitaluxeCreamImg,
        size: '50ml / 1.7 fl oz'
      }
    }
  ];

  const currentRoutine =
    routineSteps.find((s) => s.step === activeRoutineStep) || routineSteps[0];

  // Why Choose Us Slides Data (matching reference layout & dots)
  const whyChooseSlides = [
    {
      id: 1,
      title: 'Why Choose Us',
      subtitle: 'Pure Botanical Synergy',
      description:
        'Crafted with cold-pressed natural botanicals and clinically proven bio-peptides. Formulated without parabens, sulfates, or artificial fragrances. Gentle enough for the most sensitive skin, effective enough for a lasting youthful glow.',
      leftImage: aloeVeraImg,
      leftAlt: 'Fresh sliced natural organic aloe vera succulent leaf with soothing gel',
      rightImage: creamSwatchImg,
      rightAlt: 'Whipped luxury moisturizer cream swatch on marble stone'
    },
    {
      id: 2,
      title: 'Ethical & Cruelty-Free',
      subtitle: 'Our Clean Beauty Promise',
      description:
        'Every single formulation is 100% cruelty-free, vegan, and dermatologically tested. We preserve your skin’s delicate moisture barrier while protecting the planet with ethically harvested botanicals and sustainable packaging.',
      leftImage: veganCleanBeautyImg,
      leftAlt: 'Sustainable cruelty-free vegan skincare dropper bottles with natural chamomile botanicals',
      rightImage: cleanFormulaDropletImg,
      rightAlt: 'Pristine pure clean hydrating gel formula droplet on white ceramic with flower petal'
    }
  ];

  // Mosaic tile layout definition
  // Master canvas: 540px width x 580px height
  // Sliced into 10 rounded rectangular tiles matching the reference composition exactly
  const mosaicCanvasWidth = 540;
  const mosaicCanvasHeight = 580;
  const mosaicBgWidth = 740;
  const mosaicBgHeight = 740;
  const mosaicBgOffsetX = -110;
  const mosaicBgOffsetY = -35;

  const mosaicTiles = [
    // 1. Top-left decorative peach skin glow swatch tile (matching reference)
    {
      id: 'tile-peach-top',
      type: 'peach',
      x: 38,
      y: 135,
      w: 88,
      h: 82,
      radius: 18,
      depth: 0.7,
      bg: 'linear-gradient(145deg, #FAD5C3 0%, #EEA790 100%)'
    },
    // 2. Left middle shoulder contour tile
    {
      id: 'tile-shoulder-left',
      type: 'portrait',
      x: 0,
      y: 232,
      w: 126,
      h: 125,
      radius: 22,
      depth: 1.1
    },
    // 3. Left bottom collarbone skin tile
    {
      id: 'tile-collar-left',
      type: 'portrait',
      x: 35,
      y: 372,
      w: 91,
      h: 84,
      radius: 18,
      depth: 0.8
    },
    // 4. Center-top face tile (forehead, brow, left eye, bridge of nose)
    {
      id: 'tile-face-top',
      type: 'portrait',
      x: 142,
      y: 20,
      w: 154,
      h: 216,
      radius: 26,
      depth: 1.4
    },
    // 5. Center-middle smile tile (radiant white smile, lips, cheekbone)
    {
      id: 'tile-face-smile',
      type: 'portrait',
      x: 142,
      y: 252,
      w: 154,
      h: 104,
      radius: 22,
      depth: 1.3
    },
    // 6. Center-bottom neck & throat tile
    {
      id: 'tile-neck-center',
      type: 'portrait',
      x: 142,
      y: 372,
      w: 154,
      h: 194,
      radius: 26,
      depth: 1.0
    },
    // 7. Right-top temple & right eye tile
    {
      id: 'tile-eye-right',
      type: 'portrait',
      x: 312,
      y: 65,
      w: 132,
      h: 171,
      radius: 22,
      depth: 1.4
    },
    // 8. Right-middle jaw & ear tile
    {
      id: 'tile-jaw-right',
      type: 'portrait',
      x: 312,
      y: 252,
      w: 132,
      h: 104,
      radius: 20,
      depth: 1.2
    },
    // 9. Right-bottom glowing bare shoulder tile
    {
      id: 'tile-shoulder-right',
      type: 'portrait',
      x: 312,
      y: 372,
      w: 148,
      h: 194,
      radius: 26,
      depth: 0.9
    },
    // 10. Far right background / hair tile (matching reference)
    {
      id: 'tile-side-right',
      type: 'portrait',
      x: 460,
      y: 185,
      w: 78,
      h: 171,
      radius: 22,
      depth: 1.0
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSuccess(true);
      showToast('Welcome to the Glow Club! 15% discount code sent.');
      setNewsletterEmail('');
    }
  };

  return (
    <div className="glisty-page" id="top">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <Sparkles size={16} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Particles Canvas / Background Element */}
      <div className="particle-container" aria-hidden="true">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="glow-sphere glow-sphere-1"></div>
        <div className="glow-sphere glow-sphere-2"></div>
      </div>

      {/* ─── NAVIGATION BAR ─── */}
      <header className="navbar-container">
        <div className="navbar-content">
          {/* Mobile Menu Hamburger Button */}
          <button
            className="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Left Navigation Links */}
          <nav className="nav-links-left" aria-label="Main Navigation">
            <a
              href="#home"
              className={`nav-link ${activeNav === 'home' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'home')}
            >
              Home
            </a>
            <a
              href="#shop"
              className={`nav-link ${activeNav === 'shop' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'shop')}
            >
              Shop
            </a>
            <a
              href="#about"
              className={`nav-link ${activeNav === 'about' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'about')}
            >
              About
            </a>
            <a
              href="#routine"
              className={`nav-link ${activeNav === 'routine' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'routine')}
            >
              Routine
            </a>
            <a
              href="#journal"
              className={`nav-link ${activeNav === 'journal' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'journal')}
            >
              Journal
            </a>
          </nav>

          {/* Centered Brand Logo */}
          <div className="brand-logo-center">
            <a
              href="#home"
              className="brand-logo-link"
              onClick={(e) => scrollToSection(e, 'home')}
            >
              <span className="logo-text">
                G<span className="logo-sparkle">li</span>sty
              </span>
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="nav-actions-right">
            <button
              className="nav-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
            >
              <Search size={21} strokeWidth={1.8} />
            </button>
            <button
              className="nav-icon-btn"
              onClick={() => showToast('Account sign in coming soon')}
              aria-label="User Account"
            >
              <User size={21} strokeWidth={1.8} />
            </button>
            <button
              className="nav-icon-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={21} strokeWidth={1.8} />
              {totalCartCount > 0 && (
                <span className="cart-badge">{totalCartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Slide-Over Drawer */}
        {isMobileMenuOpen && (
          <div
            className="mobile-nav-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="mobile-nav-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-nav-header">
                <span className="logo-text">
                  G<span className="logo-sparkle">li</span>sty
                </span>
                <button
                  className="mobile-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mobile-nav-links">
                <a
                  href="#home"
                  className={`mobile-nav-link ${
                    activeNav === 'home' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(e, 'home');
                  }}
                >
                  <span>Home</span>
                  <ChevronRight size={16} />
                </a>
                <a
                  href="#shop"
                  className={`mobile-nav-link ${
                    activeNav === 'shop' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(e, 'shop');
                  }}
                >
                  <span>Shop</span>
                  <ChevronRight size={16} />
                </a>
                <a
                  href="#about"
                  className={`mobile-nav-link ${
                    activeNav === 'about' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(e, 'about');
                  }}
                >
                  <span>About</span>
                  <ChevronRight size={16} />
                </a>
                <a
                  href="#routine"
                  className={`mobile-nav-link ${
                    activeNav === 'routine' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(e, 'routine');
                  }}
                >
                  <span>Routine</span>
                  <ChevronRight size={16} />
                </a>
                <a
                  href="#journal"
                  className={`mobile-nav-link ${
                    activeNav === 'journal' ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(e, 'journal');
                  }}
                >
                  <span>Journal</span>
                  <ChevronRight size={16} />
                </a>
              </nav>

              <div className="mobile-nav-footer">
                <button
                  className="mobile-bag-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                >
                  <ShoppingBag size={17} />
                  <span>View Shopping Bag ({totalCartCount})</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ─── SEARCH MODAL ─── */}
      {isSearchOpen && (
        <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
          <div
            className="search-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-header">
              <Search size={22} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search serums, moisturizers, elixirs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                className="close-modal-btn"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="search-quick-tags">
              <span>Popular:</span>
              <button onClick={() => setSearchQuery('PureGlow')}>PureGlow Elixir</button>
              <button onClick={() => setSearchQuery('RevitaLuxe')}>RevitaLuxe Cream</button>
              <button onClick={() => setSearchQuery('Vitamin C')}>Vitamin C</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CART SLIDE-OVER DRAWER ─── */}
      {isCartOpen && (
        <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Shopping Cart Drawer"
          >
            <div className="cart-drawer-header">
              <div className="cart-drawer-title">
                <ShoppingBag size={20} />
                <h3>Your Bag ({totalCartCount})</h3>
              </div>
              <button
                className="cart-close-btn"
                onClick={() => setIsCartOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="cart-drawer-body">
              {cartItems.length === 0 ? (
                <div className="empty-cart-view">
                  <div className="empty-cart-icon">
                    <ShoppingBag size={48} strokeWidth={1.2} />
                  </div>
                  <p>Your bag is currently empty.</p>
                  <button
                    className="explore-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      window.location.hash = '#shop';
                    }}
                  >
                    Explore Essentials
                  </button>
                </div>
              ) : (
                <div className="cart-item-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <div className="cart-item-thumb">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <span className="cart-item-size">{item.size}</span>
                        <div className="cart-item-price">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                        <div className="cart-qty-controls">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-summary-line">
                  <span>Complimentary Shipping</span>
                  <span className="free-tag">Included</span>
                </div>
                <div className="cart-summary-line subtotal-line">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <button
                  className="checkout-btn"
                  onClick={() =>
                    showToast('Proceeding to secure SSL checkout...')
                  }
                >
                  <span>Proceed to Checkout</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ─── SECTION 1: HERO LANDING PAGE ─── */}
      <section
        className="hero-section"
        id="home"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Background decorative curved lines inspired by reference image */}
        <svg
          className="hero-bg-curves"
          viewBox="0 0 1440 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Main sweeping looping line matching reference image */}
          <path
            d="M -60,650 C 40,780 180,820 180,680 C 180,540 20,490 20,620 C 20,740 240,760 420,680 C 600,600 640,480 720,530 C 800,580 880,720 1020,720 C 1220,720 1340,540 1380,380 C 1420,220 1280,140 1200,240 C 1120,340 1140,560 1280,640 C 1420,720 1520,660 1580,580"
            stroke="#E9CFC0"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="flowing-stroke-path"
          />
          {/* Secondary looping arc on far right matching reference */}
          <path
            d="M 1340,110 C 1460,110 1560,210 1560,330 C 1560,450 1460,550 1340,550"
            stroke="#E9CFC0"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>

        <div className="hero-container">
          {/* HERO LEFT COLUMN */}
          <div className="hero-left-column">
            <span className="hero-eyebrow">Glow Naturally With</span>
            <h1 className="hero-title">Glisty Skincare</h1>
            <p className="hero-description">
              Your skin deserves the best. Discover our all-natural, cruelty-free
              skincare products.
            </p>

            {/* Shop Now CTA Pill Button with Arrow Icon */}
            <div className="hero-cta-wrapper">
              <a
                href="#shop"
                className="hero-shop-pill-btn"
                onClick={(e) => scrollToSection(e, 'shop')}
              >
                <span>Shop Now</span>
                <span className="pill-arrow-circle">
                  <ArrowUpRight size={17} strokeWidth={2.4} />
                </span>
              </a>
            </div>

            {/* Three Skincare Product Cards at Bottom Left (matching reference exactly) */}
            <div className="hero-product-cards-row">
              {/* Card 1: PureGlow Elixir (slides in from left on refresh) */}
              <div
                className="hero-mini-card hero-mini-card-left"
                onClick={() => {
                  const p = products.find((x) => x.id === 1);
                  if (p) addToCart(p);
                }}
              >
                <div className="mini-card-image-wrap">
                  <img src={cardModel1} alt="PureGlow Elixir model application" />
                  <span className="mini-card-arrow-badge">
                    <ArrowUpRight size={13} strokeWidth={2.4} />
                  </span>
                </div>
                <span className="mini-card-label">PureGlow Elixir</span>
              </div>

              {/* Card 2: RevitaLuxe Cream (center card in background) */}
              <div
                className="hero-mini-card hero-mini-card-center"
                onClick={() => {
                  const p = products.find((x) => x.id === 2);
                  if (p) addToCart(p);
                }}
              >
                <div className="mini-card-image-wrap">
                  <img src={cardModel2} alt="RevitaLuxe Cream model application" />
                  <span className="mini-card-arrow-badge">
                    <ArrowUpRight size={13} strokeWidth={2.4} />
                  </span>
                </div>
                <span className="mini-card-label">RevitaLuxe Cream</span>
              </div>

              {/* Card 3: LumiCrest Serum (slides in from right on refresh) */}
              <div
                className="hero-mini-card hero-mini-card-right"
                onClick={() => {
                  const p = products.find((x) => x.id === 3);
                  if (p) addToCart(p);
                }}
              >
                <div className="mini-card-image-wrap">
                  <img src={cardModel3} alt="LumiCrest Serum model application" />
                  <span className="mini-card-arrow-badge">
                    <ArrowUpRight size={13} strokeWidth={2.4} />
                  </span>
                </div>
                <span className="mini-card-label">LumiCrest Serum</span>
              </div>
            </div>
          </div>

          {/* HERO RIGHT COLUMN — MOSAIC FACIAL PORTRAIT */}
          <div className="hero-right-column">
            <div className="mosaic-canvas-wrapper">
              <div
                className="mosaic-portrait-canvas"
                style={{
                  width: `${mosaicCanvasWidth}px`,
                  height: `${mosaicCanvasHeight}px`
                }}
              >
                {mosaicTiles.map((tile) => {
                  // Interactive parallax translation for each tile
                  const parallaxX = mousePos.x * 18 * tile.depth;
                  const parallaxY = mousePos.y * 18 * tile.depth;

                  if (tile.type === 'peach') {
                    // Peach textured blank swatch tile matching reference
                    return (
                      <div
                        key={tile.id}
                        className="mosaic-tile mosaic-peach-tile"
                        style={{
                          left: `${tile.x}px`,
                          top: `${tile.y}px`,
                          width: `${tile.w}px`,
                          height: `${tile.h}px`,
                          borderRadius: `${tile.radius}px`,
                          background: tile.bg,
                          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
                        }}
                      >
                        <div className="peach-tile-glow"></div>
                      </div>
                    );
                  }

                  // Continuous portrait tile: background position is offset exactly by tile coordinates
                  return (
                    <div
                      key={tile.id}
                      className="mosaic-tile mosaic-image-tile"
                      style={{
                        left: `${tile.x}px`,
                        top: `${tile.y}px`,
                        width: `${tile.w}px`,
                        height: `${tile.h}px`,
                        borderRadius: `${tile.radius}px`,
                        backgroundImage: `url(${heroModelImg})`,
                        backgroundSize: `${mosaicBgWidth}px ${mosaicBgHeight}px`,
                        backgroundPosition: `${mosaicBgOffsetX - tile.x}px ${mosaicBgOffsetY - tile.y}px`,
                        backgroundRepeat: 'no-repeat',
                        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
                      }}
                    >
                      <div className="tile-inner-sheen"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: FEATURED SKINCARE PRODUCTS ─── */}
      <section className="products-section" id="shop">
        <div className="section-container">
          <div className="section-header-center" data-aos="fade-up">
            <span className="section-sub-eyebrow">Pure Botanical Radiance</span>
            <h2 className="section-main-heading">Your Daily Glow Essentials</h2>
            <p className="section-lead-text">
              Crafted with cold-pressed active botanicals, clean bio-peptides,
              and nourishing barrier lipids for effortless healthy radiance.
            </p>

            {/* Category Filter Pills */}
            <div className="product-category-pills">
              {['All', 'Elixirs', 'Creams', 'Serums', 'Moisturizers'].map(
                (cat) => (
                  <button
                    key={cat}
                    className={`category-pill-btn ${
                      activeCategory === cat ? 'active' : ''
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Product Grid: Left-side 2 products scroll in from left, Right-side 2 products scroll in from right */}
          <div className="products-grid">
            {filteredProducts.map((product, idx) => {
              const isLeftSide = idx < 2;
              const scrollAnim = isLeftSide ? 'fade-right' : 'fade-left';
              const animDelay = (idx === 0 || idx === 3) ? 100 : 240;

              return (
                <div
                  key={product.id}
                  className={`luxury-product-card ${
                    isLeftSide ? 'card-scroll-left' : 'card-scroll-right'
                  }`}
                  data-aos={scrollAnim}
                  data-aos-delay={animDelay}
                  data-aos-duration="900"
                  data-aos-offset="120"
                >
                  <div className="card-image-box">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-img"
                      loading="lazy"
                    />
                    <span className="product-badge">{product.tag}</span>
                    <button
                      className="wishlist-btn"
                      onClick={() =>
                        showToast(`Saved ${product.name} to favorites`)
                      }
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} />
                    </button>
                  </div>

                <div className="card-info-box">
                  <div className="card-rating-row">
                    <div className="stars-group">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          fill="#D49969"
                          color="#D49969"
                        />
                      ))}
                    </div>
                    <span className="rating-score">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-short-desc">{product.description}</p>
                  <span className="product-size-label">{product.size}</span>

                  <div className="card-bottom-row">
                    <span className="product-price">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      className="add-to-bag-btn"
                      onClick={() => addToCart(product)}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      <span>Add to Bag</span>
                      <ShoppingBag size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: BRAND STORY & BENEFITS ─── */}
      <section className="story-benefits-section" id="about">
        <div className="section-container">
          <div className="story-split-grid">
            {/* Story Visual Left */}
            <div
              className="story-visual-column"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              <div className="lifestyle-image-card">
                <img
                  src={brandLifestyleImg}
                  alt="Glisty Skincare natural application ritual"
                  className="lifestyle-img"
                  loading="lazy"
                />
                <div className="floating-stat-badge">
                  <div className="stat-icon-circle">
                    <Sparkles size={20} color="#C28B5E" />
                  </div>
                  <div>
                    <h4>100% Bio-Compatible</h4>
                    <p>Gentle for sensitive barriers</p>
                  </div>
                </div>
                <div className="floating-quote-badge">
                  <p>“Skin that breathes with clean vitality.”</p>
                </div>
              </div>
            </div>

            {/* Story Content Right */}
            <div
              className="story-content-column"
              data-aos="fade-left"
              data-aos-duration="900"
            >
              <span className="section-sub-eyebrow">Our Philosophy</span>
              <h2 className="story-main-heading">Nature Meets Your Skin</h2>
              <p className="story-paragraph">
                At Glisty, we believe authentic radiance begins when clean
                botanical wisdom works in harmony with dermatological science.
                Our formulations are crafted from potent organic extracts,
                reparative plant oils, and gentle cell-communicating peptides.
              </p>
              <p className="story-paragraph">
                No harsh sulfates, no synthetic silicones, and zero parabens.
                Every drop honors your skin’s inherent rhythm, providing lasting
                deep cellular hydration and an effortless, dewy finish.
              </p>

              {/* Three Benefit Items */}
              <div className="benefit-items-list">
                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <Leaf size={22} color="#C28B5E" />
                  </div>
                  <div className="benefit-text">
                    <h4>Naturally Inspired Ingredients</h4>
                    <p>
                      Cold-extracted jojoba, damask rose, and biocompatible plant
                      squalane handpicked for pure dermal harmony.
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <Droplets size={22} color="#C28B5E" />
                  </div>
                  <div className="benefit-text">
                    <h4>Gentle Everyday Care</h4>
                    <p>
                      Dermatologist-tested micro-emulsions formulated for
                      sensitive skin without clogging pores or irritation.
                    </p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon-wrapper">
                    <ShieldCheck size={22} color="#C28B5E" />
                  </div>
                  <div className="benefit-text">
                    <h4>Cruelty-Free Beauty</h4>
                    <p>
                      Leaping Bunny certified. 100% vegan formulations packaged
                      in endlessly recyclable frosted glass vessels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: INTERACTIVE SKINCARE ROUTINE ─── */}
      <section className="routine-section" id="routine">
        <div className="section-container">
          <div className="section-header-center" data-aos="fade-up">
            <span className="section-sub-eyebrow">Simple. Ritualistic. Radiant.</span>
            <h2 className="section-main-heading">Find Your Everyday Glow</h2>
            <p className="section-lead-text">
              A streamlined three-step regimen created to purify, nourish, and
              seal in all-day dewy moisture.
            </p>

            {/* Step Selector Tabs */}
            <div className="routine-steps-nav">
              {routineSteps.map((s) => (
                <button
                  key={s.step}
                  className={`routine-nav-tab ${
                    activeRoutineStep === s.step ? 'active' : ''
                  }`}
                  onClick={() => setActiveRoutineStep(s.step)}
                >
                  <span className="tab-number">0{s.step}</span>
                  <span className="tab-title">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Routine Showcase with Image and Details */}
          <div className="routine-showcase-wrapper" key={currentRoutine.step}>
            {/* Visual Media Showcase with Model Ritual Photo */}
            <div className="routine-showcase-media">
              <div className="routine-image-frame">
                <img
                  src={currentRoutine.image}
                  alt={currentRoutine.imageAlt}
                  className="routine-main-img"
                />
                <div className="routine-img-glass-overlay">
                  {currentRoutine.product && (
                    <div className="routine-product-chip">
                      <img
                        src={currentRoutine.product.image}
                        alt={currentRoutine.product.name}
                      />
                      <div className="chip-text">
                        <span className="chip-sub">Paired Ritual</span>
                        <span className="chip-name">
                          {currentRoutine.product.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Details Column */}
            <div className="routine-showcase-content">
              <div className="routine-card-step-badge">
                <span>Step 0{currentRoutine.step} of 03</span>
              </div>
              <h3 className="routine-showcase-title">{currentRoutine.title}</h3>
              <h4 className="routine-showcase-subtitle">
                {currentRoutine.subtitle}
              </h4>
              <p className="routine-showcase-desc">{currentRoutine.desc}</p>

              {/* Ritual Specifications */}
              <div className="routine-specs-grid">
                <div className="routine-spec-card">
                  <span className="spec-label">Key Actives</span>
                  <span className="spec-val">{currentRoutine.keyIngredient}</span>
                </div>
                <div className="routine-spec-card">
                  <span className="spec-label">Ritual Frequency</span>
                  <span className="spec-val">{currentRoutine.frequency}</span>
                </div>
                <div className="routine-spec-card">
                  <span className="spec-label">Sensory Texture</span>
                  <span className="spec-val">{currentRoutine.texture}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="routine-actions-row">
                {currentRoutine.product && (
                  <button
                    className="add-step-product-btn"
                    onClick={() => addToCart(currentRoutine.product)}
                    aria-label={`Add ${currentRoutine.product.name} to bag`}
                  >
                    <ShoppingBag size={16} />
                    <span>
                      Add {currentRoutine.product.name} — ₹
                      {currentRoutine.product.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                )}
                <button
                  className="routine-next-btn"
                  onClick={() =>
                    setActiveRoutineStep(
                      currentRoutine.step === 3 ? 1 : currentRoutine.step + 1
                    )
                  }
                  aria-label="Next routine step"
                >
                  <span>
                    {currentRoutine.step === 3
                      ? 'Back to Step 01'
                      : `Next: Step 0${currentRoutine.step + 1}`}
                  </span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Step Preview Cards */}
          <div className="routine-step-thumbnails-row">
            {routineSteps.map((item) => (
              <button
                key={item.step}
                className={`routine-thumb-card ${
                  activeRoutineStep === item.step ? 'active' : ''
                }`}
                onClick={() => setActiveRoutineStep(item.step)}
                aria-label={`Select step ${item.step}: ${item.title}`}
              >
                <div className="thumb-card-img">
                  <img src={item.image} alt={item.title} />
                  <span className="thumb-badge">0{item.step}</span>
                </div>
                <div className="thumb-card-info">
                  <span className="thumb-title">{item.title}</span>
                  <span className="thumb-sub">{item.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4.5: WHY CHOOSE US (SCROLL-IN ANIMATION BEFORE REAL SKIN. REAL GLOW) ─── */}
      <section
        className={`why-choose-section ${isWhyChooseInView ? 'in-view' : ''}`}
        ref={whyChooseRef}
        id="why-choose"
      >
        <div className="section-container">
          <div className="why-choose-grid">
            {/* Left Image: Scrolls in from the left and fixes clearly into place */}
            <div className="why-choose-media why-choose-media-left">
              <div className="why-choose-image-card">
                <img
                  src={whyChooseSlides[whyChooseSlide].leftImage}
                  alt={whyChooseSlides[whyChooseSlide].leftAlt}
                />
                <div className="why-choose-badge left-badge">
                  <span>100% Organic</span>
                </div>
              </div>
            </div>

            {/* Center Content: Interactive Dots, Heading, Description, Shop Now */}
            <div className="why-choose-center-content">
              {/* Pagination Dots Matching Reference Image */}
              <div className="why-choose-dots-row" role="tablist" aria-label="Feature slides">
                {whyChooseSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={`why-dot-btn ${whyChooseSlide === index ? 'active' : ''}`}
                    onClick={() => setWhyChooseSlide(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                    role="tab"
                    aria-selected={whyChooseSlide === index}
                  />
                ))}
              </div>

              <h2 className="why-choose-title">
                {whyChooseSlides[whyChooseSlide].title}
              </h2>

              <p className="why-choose-description">
                {whyChooseSlides[whyChooseSlide].description}
              </p>

              <div className="why-choose-cta-wrap">
                <a
                  href="#shop"
                  className="hero-shop-pill-btn why-choose-btn"
                  onClick={(e) => scrollToSection(e, 'shop')}
                >
                  <span>Shop Now</span>
                  <span className="pill-arrow-circle">
                    <ArrowUpRight size={17} strokeWidth={2.4} />
                  </span>
                </a>
              </div>
            </div>

            {/* Right Image: Scrolls in from the right and fixes clearly into place */}
            <div className="why-choose-media why-choose-media-right">
              <div className="why-choose-image-card">
                <img
                  src={whyChooseSlides[whyChooseSlide].rightImage}
                  alt={whyChooseSlides[whyChooseSlide].rightAlt}
                />
                <div className="why-choose-badge right-badge">
                  <span>Clean Formula</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: CUSTOMER TESTIMONIALS & GLOW GALLERY ─── */}
      <section className="testimonials-gallery-section" id="journal">
        <div className="section-container">
          <div className="section-header-center" data-aos="fade-up">
            <span className="section-sub-eyebrow">Real Experiences</span>
            <h2 className="section-main-heading">Real Skin. Real Glow.</h2>
            <p className="section-lead-text">
              Read how thousands of women embraced radiant, nourished skin with
              clean luxury formulations.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className="testimonial-card"
                data-aos="fade-up"
                data-aos-delay={idx * 130}
              >
                <div className="testimonial-header-row">
                  <div className="stars-group">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="#D49969"
                        color="#D49969"
                      />
                    ))}
                  </div>
                  <span className="product-mention-tag">{t.product}</span>
                </div>
                <p className="testimonial-quote-text">{t.text}</p>
                <div className="testimonial-author-row">
                  <div className="author-avatar-initial">
                    {t.name.charAt(0)}
                  </div>
                  <div className="author-details">
                    <h4>{t.name}</h4>
                    <span>
                      {t.role} • {t.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skincare Textures & Ingredients Glow Gallery */}
          <div className="gallery-header-row" data-aos="fade-up">
            <h3>Sensory Textures & Botanicals</h3>
            <p>From velvety creams to golden elixir drops</p>
          </div>

          <div className="gallery-mosaic-grid">
            <div
              className="gallery-item-tile"
              data-aos="zoom-in"
              data-aos-delay="50"
            >
              <img
                src={textureSerumImg}
                alt="Golden serum droplet refraction"
                loading="lazy"
              />
              <div className="gallery-hover-overlay">
                <span>Dewy Lipid Drops</span>
              </div>
            </div>

            <div
              className="gallery-item-tile"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src={textureCreamImg}
                alt="Whipped velvety face cream swirl"
                loading="lazy"
              />
              <div className="gallery-hover-overlay">
                <span>Whipped Barrier Cream</span>
              </div>
            </div>

            <div
              className="gallery-item-tile"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <img
                src={textureBotanicalsImg}
                alt="Organic camellia and botanical petals"
                loading="lazy"
              />
              <div className="gallery-hover-overlay">
                <span>Organic Botanicals</span>
              </div>
            </div>

            <div
              className="gallery-item-tile"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src={cardModel2}
                alt="Radiant dewy skin finish"
                loading="lazy"
              />
              <div className="gallery-hover-overlay">
                <span>Luminous Glow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: NEWSLETTER & LUXURY FOOTER ─── */}
      <footer className="luxury-footer-section">
        {/* Newsletter Conversion Block */}
        <div className="newsletter-card-block" data-aos="fade-up">
          <div className="newsletter-inner">
            <span className="newsletter-eyebrow">The Glow Club</span>
            <h2 className="newsletter-heading">Your Glow Journey Starts Here</h2>
            <p className="newsletter-desc">
              Subscribe to receive exclusive botanical skincare rituals, private
              launches, and enjoy 15% off your very first order.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="newsletter-form-row"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                <span>Join the Glow Club</span>
                <ArrowUpRight size={17} />
              </button>
            </form>

            {newsletterSuccess && (
              <div className="newsletter-success-tag">
                <Check size={16} />
                <span>You’re in! Check your inbox for your 15% glow code.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-main-container">
          <div className="footer-columns-grid">
            {/* Col 1: Brand Info */}
            <div className="footer-col brand-col">
              <a href="#top" className="footer-brand-logo">
                G<span className="logo-sparkle">li</span>sty
              </a>
              <p className="footer-brand-desc">
                Clean, biocompatible luxury skincare crafted to nourish your
                innate dermal luminosity with pure botanical intelligence.
              </p>
              <div className="social-links-row">
                <a
                  href="#top"
                  aria-label="Instagram"
                  className="social-icon-circle"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="#top"
                  aria-label="Facebook"
                  className="social-icon-circle"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="#top"
                  aria-label="Twitter"
                  className="social-icon-circle"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </a>
                <a
                  href="#top"
                  aria-label="YouTube"
                  className="social-icon-circle"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Shop Navigation */}
            <div className="footer-col">
              <h4>Shop Essentials</h4>
              <ul>
                <li><a href="#shop">PureGlow Elixir</a></li>
                <li><a href="#shop">RevitaLuxe Cream</a></li>
                <li><a href="#shop">LumiCrest Serum</a></li>
                <li><a href="#shop">HydraBloom Moisturizer</a></li>
                <li><a href="#shop">All Botanical Care</a></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="footer-col">
              <h4>About Glisty</h4>
              <ul>
                <li><a href="#about">Our Clean Ethos</a></li>
                <li><a href="#about">Botanical Sourcing</a></li>
                <li><a href="#routine">Skincare Rituals</a></li>
                <li><a href="#gallery">Clinical Studies</a></li>
                <li><a href="#about">Sustainability</a></li>
              </ul>
            </div>

            {/* Col 4: Support & Ethics */}
            <div className="footer-col">
              <h4>Client Care</h4>
              <ul>
                <li><a href="#top">Complimentary Shipping</a></li>
                <li><a href="#top">Returns & Exchanges</a></li>
                <li><a href="#top">FAQ & Help Center</a></li>
                <li><a href="#top">Contact Our Aestheticians</a></li>
                <li><a href="#top">Privacy Policy & Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p>
              © {new Date().getFullYear()} Glisty Skincare Laboratories. All
              rights reserved. Designed with pure elegance.
            </p>
            <div className="footer-bottom-links">
              <a href="#top">Privacy Policy</a>
              <span>•</span>
              <a href="#top">Terms of Service</a>
              <span>•</span>
              <a href="#top">Cookie Preferences</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
