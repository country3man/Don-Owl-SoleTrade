/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  ArrowRight,
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  UserCircle2,
  CircleDashed,
  Mail,
  Send,
  X,
  MessageSquare,
  Menu,
  ChevronDown,
  Check,
  Phone,
  Zap,
  Layout,
  Globe,
  Loader2,
  LogOut
} from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { auth, signInWithGoogle, logout } from "./lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const CATEGORIES = [
  { 
    title: "Booking Tickets", 
    description: "Domestic flights within Papua New Guinea at affordable rates.",
    image: "file_00000000641471fabefc00fe48fe75de.png"
  },
  { 
    title: "Printing Shop", 
    description: "High-quality custom prints, banners, and marketing materials for your brand.",
    image: "https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    title: "Goods & Service", 
    description: "Premium selection of everyday goods and curated service solutions.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    title: "Deposit & Withdraw", 
    description: "Secure and convenient financial transaction points for your daily needs.",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeCategoryTab, setActiveCategoryTab] = useState("Booking Tickets");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setAuthLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setAuthLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const scrollToSection = (id: string, tab?: string) => {
    setIsMenuOpen(false);
    if (tab) setActiveCategoryTab(tab);
    
    // Small delay to let the menu exit transition start for a smoother 'ease-in' feel
    setTimeout(() => {
      // Home section is special - we want to scroll to the very top (0,0)
      if (id === "home-section") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        // Offset for typical fixed headers or just better visual spacing
        const offset = -20;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 150); // Slightly increased delay for smoother transition
  };

  const handleHomeClick = () => {
    scrollToSection("home-section");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        setIsContactOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className={`relative min-h-screen font-sans selection:bg-red-600 selection:text-white overflow-x-hidden ${isMenuOpen ? 'h-screen overflow-hidden' : ''}`}>
      {/* Hero & Nav Section Container */}
      <div id="home-section" className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Image Layer - Isolated to Hero Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <motion.img 
            initial={{ scale: 1.1, x: "5%" }}
            animate={{ 
              x: ["5%", "-5%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover object-right lg:object-center grayscale brightness-90"
            referrerPolicy="no-referrer"
            id="hero-bg"
          />
          <div 
            className="absolute inset-0 z-20 opacity-10 pointer-events-none"
            style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }}
            id="texture-overlay"
          />
        </div>

      {/* Navigation */}
      <nav className="relative z-[100] flex items-center justify-between px-6 py-6 lg:px-12">
        <motion.div 
          animate={{ opacity: isMenuOpen ? 0 : 1, pointerEvents: isMenuOpen ? "none" : "auto" }}
          className="flex items-center gap-2 cursor-pointer transition-opacity duration-300" 
          id="logo-container" 
          onClick={handleHomeClick}
        >
          <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center font-display font-bold italic" id="logo-icon">
            D
          </div>
          <span className="text-2xl font-bold tracking-tight" id="logo-text">Don Owolyea</span>
        </motion.div>

        <div className="flex flex-col items-center gap-4 fixed top-8 right-8 z-[110]" id="right-nav-controls">
          <motion.div 
            animate={{ opacity: isMenuOpen ? 0 : 1, pointerEvents: isMenuOpen ? "none" : "auto" }}
            className="flex flex-col items-center gap-4"
          >
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`w-12 h-12 rounded-full overflow-hidden border transition-all shadow-xl flex items-center justify-center ${authLoading || isProfileOpen ? 'border-red-600' : 'border-white/20 hover:border-red-600'}`}
                  id="user-profile-btn"
                  disabled={authLoading}
                  title="View Account"
                >
                  {authLoading ? (
                    <Loader2 className="animate-spin text-red-600" size={24} />
                  ) : (
                    <img src={user.photoURL || ""} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                  )}
                </button>
                
                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      {/* Click overlay to close dropdown when clicking outside */}
                      <div 
                        className="fixed inset-0 z-[-1]" 
                        onClick={() => setIsProfileOpen(false)} 
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-3 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 min-w-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 origin-top-right"
                      >
                        <div className="flex flex-col items-center mb-4 pb-4 border-b border-white/5">
                          <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-red-600/30">
                            <img src={user.photoURL || ""} alt="" className="w-full h-full object-cover" />
                          </div>
                          <p className="text-white font-black tracking-tight text-lg truncate w-full text-center uppercase">{user.displayName}</p>
                          <p className="text-white/40 text-xs truncate w-full text-center mt-1">{user.email}</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-lg text-white/60 hover:text-white transition-all text-sm group">
                            <Layout className="w-4 h-4 group-hover:text-red-500" />
                            Dashboard
                          </button>
                          <button 
                            onClick={() => {
                              handleLogout();
                              setIsProfileOpen(false);
                            }}
                            disabled={authLoading}
                            className="w-full py-3 mt-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(220,38,38,0.2)] active:scale-95 disabled:opacity-50"
                          >
                            {authLoading ? (
                              <Loader2 size={16} className="animate-spin" />
                            ) : (
                              <LogOut size={16} />
                            )}
                            {authLoading ? 'Signing out...' : 'Sign Out'}
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                disabled={authLoading}
                className={`p-3 hover:text-red-600 bg-black/40 backdrop-blur-md rounded-full border border-white/10 transition-all hover:scale-110 active:scale-95 flex items-center justify-center ${authLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                id="login-btn"
                title="Login with Google"
              >
                {authLoading ? (
                  <Loader2 size={28} strokeWidth={1.5} className="animate-spin text-red-600" />
                ) : (
                  <UserCircle2 size={28} strokeWidth={1.5} />
                )}
              </button>
            )}
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative w-14 h-14 flex items-center justify-center backdrop-blur-xl rounded-full transition-all border border-white/10 shadow-2xl ${isMenuOpen ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-black/80'}`}
              id="mobile-menu-btn"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  >
                    <X size={32} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  >
                    <Menu size={32} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </nav>

    {/* Full Screen Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
            id="full-screen-menu"
          >
            <div className="flex flex-col gap-6 text-center max-w-xl w-full px-6">
              {[
                { name: "Home", id: "home-section" },
                { name: "About Us", id: "about-us" },
                { name: "Categories", id: "categories-section" },
                { name: "Contact Us", id: "footer-section", isContact: true }
              ].map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  onClick={() => {
                    if (item.isContact) setIsContactOpen(true);
                    scrollToSection(item.id);
                  }}
                  className="group py-2"
                >
                  <span className="text-4xl md:text-7xl font-black tracking-tighter text-white/40 group-hover:text-red-600 transition-all uppercase flex items-center justify-center gap-6">
                    {item.name}
                    <ArrowRight className="w-8 h-8 md:w-16 md:h-16 opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all" />
                  </span>
                </motion.button>
              ))}

            </div>

            {/* Absolute close button in the top right for convenience */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <main className="relative z-30 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl flex flex-col items-center"
          id="hero-content-wrapper"
        >
          <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.9] flex flex-col" id="hero-title">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.8, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="opacity-80"
            >
              Welcome to
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-2"
            >
              Don Owolyea
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-4 mt-2"
            >
              Sole Trade <ChevronRight className="w-12 h-12 lg:w-20 lg:h-20" strokeWidth={3} />
            </motion.span>
          </h1>

          <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-5xl" id="description-and-cta">
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 0.8, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg font-medium text-center lg:text-left" 
              id="hero-description"
            >
              Welcome to Don Owol Sole Trade, your trusted source for simple goods and reliable services. 
              We are committed to serving our customers with honesty, quality, and affordable solutions 
              for everyday needs.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-center lg:items-start gap-12"
            >
              <motion.button
                whileHover={!user ? { scale: 1.05, backgroundColor: "#E60000" } : {}}
                whileTap={!user ? { scale: 0.95 } : {}}
                onClick={!user ? handleLogin : () => scrollToSection("categories-section")}
                disabled={authLoading}
                className={`bg-[#FF0000] text-white font-black py-4 px-12 md:py-6 md:px-20 text-xl md:text-2xl rounded-sm tracking-wide transition-colors flex items-center justify-center gap-3 ${authLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                id="signup-btn"
              >
                {authLoading && <Loader2 className="animate-spin" size={24} />}
                {user ? "Explore Services" : "Sign Up"}
              </motion.button>
              
              {/* Sliding Thumbnail Images */}
              <div className="flex gap-6 mt-4" id="hero-thumbnails">
                {[
                  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=20&w=400&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=20&w=400&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=20&w=400&auto=format&fit=crop"
                ].map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 150, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 0.8 + (i * 0.3),
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="w-44 h-28 md:w-64 md:h-40 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                  >
                    <img 
                      src={src} 
                      alt={`Service preview ${i + 1}`} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Animated Dots Indicator */}
              <div className="flex gap-4" id="carousel-indicators">
                {[0, 1, 2].map((i) => (
                  <motion.div 
                    key={i} 
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 1, 0.3] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 rounded-full bg-white" 
                    id={`indicator-${i}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      </div>

      {/* About Us Section */}
      <section className="relative z-30 bg-[#262626] text-white py-32 px-6 lg:px-12 overflow-hidden border-t border-white/5" id="about-us">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center lg:text-left z-10"
          >
            <div className="flex flex-col items-center lg:items-start mb-12">
              <div className="flex items-center gap-4 mb-4">
                <UserCircle2 className="text-red-600" size={40} strokeWidth={1.5} />
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">About Us</h2>
              </div>
              <div className="w-24 h-1.5 bg-red-600 rounded-full" id="about-accent" />
            </div>
            
            <div className="space-y-10 text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                Don Owolyea Sole Trade is a locally owned business based in Sogeri, Hiri-Koiari District, 
                Central Province, Papua New Guinea, specializing in the import and export of quality electronic products.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                We are committed to delivering reliable, affordable electronics while building trust through 
                excellent service and strong customer relationships.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-white font-bold tracking-tight border-l-4 border-red-600 pl-6 italic"
              >
                Connecting Papua New Guinea to the world through technology.
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative group"
          >
            {/* The Image from the prompt: Happy business person pointing */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(255,0,0,0.1)] aspect-[4/5] md:aspect-auto md:h-[700px]">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop" 
                alt="Don Owolyea Commercial Team" 
                className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                <p className="text-sm font-bold tracking-widest text-red-500 uppercase mb-1">Our Mission</p>
                <p className="text-white font-medium">Empowering Papua New Guinea with world-class technology solutions.</p>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] -z-10 group-hover:bg-red-600/20 transition-all duration-700" />
          </motion.div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute bottom-0 right-0 p-12 opacity-5 pointer-events-none select-none">
          <span className="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap">TRUSTED QUALITY</span>
        </div>
      </section>

      {/* Interactive Categories Section */}
      <section className="relative z-30 bg-black text-white py-32 px-6 lg:px-12 overflow-hidden" id="categories-section">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4">Categories</h2>
            <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full" />
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveCategoryTab(cat.title)}
                className="relative group py-2"
              >
                <span className={`text-xl md:text-2xl font-bold tracking-tight transition-all duration-300 ${activeCategoryTab === cat.title ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                  {cat.title}
                </span>
                {activeCategoryTab === cat.title && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeCategoryTab === "Booking Tickets" && (
                <motion.div
                  key="tickets"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full flex flex-col lg:flex-row items-center justify-between gap-12"
                >
                  {/* Left Side: Suitcase Traveler */}
                  <div className="flex-1 relative order-2 lg:order-1">
                    <motion.div 
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative z-10 space-y-6"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-white p-2 rounded-lg">
                          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=100" alt="PNG Air Logo" className="h-12 grayscale" />
                        </div>
                        <div className="text-left font-black leading-none">
                          <p className="text-2xl text-red-600">READY.</p>
                          <p className="text-2xl">SET.</p>
                          <p className="text-4xl text-red-600 italic">FLY!</p>
                        </div>
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1000" 
                        alt="PNG Traveler" 
                        className="w-full h-[600px] object-cover rounded-[3rem] grayscale brightness-90 border-r-4 border-red-600 shadow-2xl"
                      />
                    </motion.div>
                  </div>

                  {/* Middle Content: Service Details */}
                  <div className="flex-[0.8] text-center space-y-16 order-1 lg:order-2">
                    <div className="space-y-6">
                      <motion.h4 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-3xl font-black italic tracking-tight"
                      >
                        And we Provide The Following;
                      </motion.h4>
                      <div className="flex flex-col items-center gap-6">
                        <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-center gap-4 text-3xl font-black italic group cursor-default">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Check className="text-red-600" size={32} strokeWidth={4} />
                          </motion.div>
                          <span className="tracking-tighter uppercase">• Air Niugini</span>
                        </motion.div>
                        <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-4 text-3xl font-black italic group cursor-default">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Check className="text-red-600" size={32} strokeWidth={4} />
                          </motion.div>
                          <span className="tracking-tighter uppercase">• PNG Air</span>
                        </motion.div>
                      </div>
                    </div>

                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="pt-12 border-t border-white/10"
                    >
                      <p className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-4">
                        We resell tickets
                      </p>
                      <p className="text-2xl md:text-3xl font-bold tracking-tight text-white/50 lowercase italic">
                        at the affordable price <span className="text-red-600 font-black not-italic uppercase ml-2">today.</span>
                      </p>
                    </motion.div>
                  </div>

                  {/* Right Side: Support/Booking Agent */}
                  <div className="flex-1 relative order-3">
                    <motion.div 
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative z-10 flex flex-col items-center lg:items-end"
                    >
                      <div className="relative group overflow-hidden rounded-[3rem] border-l-4 border-red-600 shadow-2xl h-[600px] w-full">
                        <img 
                          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000" 
                          alt="Support Agent" 
                          className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                        
                        <div className="absolute bottom-8 left-8 right-8 text-left space-y-4">
                          <p className="text-4xl font-black tracking-tighter leading-none">DON <br /> OWOLYEA</p>
                          <p className="text-red-600 font-bold tracking-widest text-sm uppercase">WE RESPONSIBLE</p>
                          <div className="h-1 w-12 bg-red-600" />
                          <p className="text-xs font-bold text-white/70 leading-relaxed uppercase tracking-widest max-w-[200px]">
                            FOR RESELLING TICKETS AT THE AFFORDABLE PRICE AND BRING SERVICE TO YOUR DOOR STEPS.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex gap-4 w-full">
                        <button className="flex-1 bg-red-600 hover:bg-white hover:text-black font-black text-xs py-5 rounded-2xl transition-all tracking-[0.2em] uppercase">
                          BOOKING NOW
                        </button>
                        <button className="p-5 border border-white/10 rounded-2xl hover:bg-white/5 transition-all">
                          <Phone size={20} />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeCategoryTab === "Goods & Service" && (
                <motion.div
                  key="goods"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-8 md:gap-12"
                >
                  {/* Left Poster: Coca Cola */}
                  <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="flex-1 relative group rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000" 
                      className="w-full h-full min-h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      alt="Coca Cola Poster"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none">
                      <div>
                        <h3 className="text-4xl font-black italic text-red-600 drop-shadow-xl">Coca-Cola</h3>
                        <p className="text-6xl font-black tracking-tighter leading-none mt-4 uppercase drop-shadow-2xl">ICE <br /> COLD.</p>
                      </div>
                      <div className="bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-2">Pure Joy / Pure Magic</p>
                        <p className="text-2xl font-black uppercase tracking-tighter">DON OWOLYEA</p>
                        <p className="text-xs text-white/40 uppercase tracking-widest mt-1">SOLE TRADE</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Middle Content: Checklist & Badge */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 shadow-inner bg-zinc-950/30 rounded-[3rem] border border-white/5">
                    <motion.h4 initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} className="text-3xl font-black italic mb-16 tracking-tight">
                      We sell basic <br /><span className="text-red-600 not-italic uppercase text-5xl">Needs like;</span>
                    </motion.h4>
                    
                    <div className="space-y-8 mb-20">
                      {[
                        "Consumer Goods",
                        "Soft Drinks",
                        "Proteins",
                        "Alcohal & More!!"
                      ].map((item, i) => (
                        <motion.div 
                          key={item}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-6 text-3xl md:text-4xl font-black tracking-tighter uppercase italic group cursor-default"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: -10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Check className="text-red-600" size={32} strokeWidth={5} />
                          </motion.div>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Red Jagged Burst Badge */}
                    <motion.div 
                      initial={{ scale: 0, rotate: -20 }}
                      whileInView={{ scale: 1, rotate: 12 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="relative"
                    >
                      <div 
                        className="w-56 h-56 bg-red-600 flex items-center justify-center text-center p-6 shadow-[0_0_50px_rgba(220,38,38,0.5)]" 
                        style={{ clipPath: "polygon(50% 0%, 63% 18%, 85% 15%, 82% 38%, 100% 50%, 82% 62%, 85% 85%, 63% 82%, 50% 100%, 37% 82%, 15% 85%, 18% 62%, 0% 50%, 18% 38%, 15% 15%, 37% 18%)" }}
                      >
                        <p className="text-white text-xl font-black leading-tight uppercase tracking-tighter">
                          Its Time To <br /> <span className="text-2xl">Refresh</span> <br /> Yourself"
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-red-600/30 blur-3xl -z-10 animate-pulse rounded-full" />
                    </motion.div>
                  </div>

                  {/* Right Poster: Beer/Beverage */}
                  <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="flex-1 relative group rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1618885472118-20c1408c9545?q=80&w=1000" 
                      className="w-full h-full min-h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      alt="Beverage Poster"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none text-right">
                      <div className="flex flex-col items-end">
                        <div className="bg-yellow-500 text-black px-6 py-2 text-3xl font-black italic mb-4">LEGEND</div>
                        <p className="text-6xl font-black tracking-tighter leading-none uppercase drop-shadow-2xl">CRACK. <br /> FIZZ. <br /> LEGEND.</p>
                      </div>
                      <div className="bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-left">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-2">Cold Times. Real Friends.</p>
                        <p className="text-2xl font-black uppercase tracking-tighter">DON OWOLYEA</p>
                        <p className="text-xs text-white/40 uppercase tracking-widest mt-1">RETAIL PRIDE</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeCategoryTab === "Deposit & Withdraw" && (
                <motion.div
                  key="finance"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col lg:flex-row items-center justify-between gap-12"
                >
                  {/* Left: Financial App Card */}
                  <div className="flex-1 w-full lg:max-w-md">
                    <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="bg-zinc-900 border-2 border-white/10 p-12 rounded-[4rem] shadow-2xl relative overflow-hidden group"
                    >
                      <div className="absolute top-0 left-0 w-full h-3 bg-red-600 transition-all group-hover:h-6" />
                      <div className="flex justify-between items-center mb-16">
                        <h5 className="text-3xl font-black tracking-tighter uppercase italic">CASH AGENT</h5>
                        <div className="w-4 h-4 bg-red-600 rounded-full animate-ping" />
                      </div>
                      
                      <div className="space-y-10">
                        <div className="p-8 bg-white/5 rounded-3xl border border-white/5 group-hover:bg-red-600/10 transition-colors">
                          <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] mb-4 font-black">Secure Endpoint</p>
                          <p className="text-3xl font-black tracking-tighter text-red-500 uppercase">Instant Access</p>
                        </div>
                        
                        <div className="space-y-6">
                          {[
                            { name: "Deposits", desc: "Fund your account in seconds." },
                            { name: "Withdrawals", desc: "Local cash-out within Sogeri." },
                            { name: "Banking Services", desc: "BSP & Kina Bank Authorized Agent." }
                          ].map((svc) => (
                            <motion.div whileHover={{ x: 10 }} key={svc.name} className="flex items-start gap-6 group/item cursor-default">
                              <motion.div 
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                className="bg-red-600/20 p-2 rounded-lg text-red-500 group-hover/item:bg-red-600 group-hover/item:text-white transition-all"
                              >
                                <Check size={20} strokeWidth={4} />
                              </motion.div>
                              <div>
                                <p className="font-black text-xl leading-none mb-2 uppercase tracking-tight">{svc.name}</p>
                                <p className="text-sm text-white/30 font-bold tracking-tight uppercase">{svc.desc}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full mt-16 bg-white text-black font-black py-6 rounded-2xl tracking-[0.3em] uppercase hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl">
                        Locate Agent
                      </button>
                    </motion.div>
                  </div>

                  {/* Middle Content: Finance Branding */}
                  <div className="flex-1 text-center space-y-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      className="space-y-6"
                    >
                      <motion.div
                        whileInView={{ 
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-24 h-24 bg-red-600 mx-auto rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Zap className="text-white" size={48} fill="currentColor" />
                      </motion.div>
                      <h3 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.8]">
                        TRUSTED <br /> <span className="text-red-600 italic">TRANSFERS</span>
                      </h3>
                    </motion.div>
                    <div className="h-1 w-20 bg-white/10 mx-auto" />
                    <p className="text-2xl text-white/50 font-bold uppercase tracking-tighter max-w-sm mx-auto leading-tight italic">
                      Bringing full service financial power to <span className="text-white not-italic">the heart of Central Province.</span>
                    </p>
                  </div>

                  {/* Right: Security Visual */}
                  <div className="flex-1 relative">
                    <motion.div 
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="relative rounded-[4rem] overflow-hidden shadow-2xl h-[650px] border border-white/5 group"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000" 
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                        alt="Security Visual"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                      
                      <div className="absolute bottom-12 left-12 right-12 space-y-6">
                        <div className="p-8 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-3xl transform group-hover:-translate-y-2 transition-transform">
                          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-red-500 mb-3">System Status: Active</p>
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-600 rounded-xl">
                              <Phone size={24} className="text-white" />
                            </div>
                            <div>
                              <p className="text-2xl font-black tracking-tighter uppercase">04491-SOG</p>
                              <p className="text-xs font-bold text-white/40 uppercase tracking-widest leading-none">Registered Agent Terminal</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase">Encrypted • Verified • Reliable</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeCategoryTab === "Printing Shop" && (
                <motion.div
                  key="printing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-12"
                >
                  {/* Left Poster: Web Design Focus */}
                  <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="flex-1 relative group rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 h-[700px]"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      alt="Web Design Services"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none">
                      <div className="space-y-4">
                        <div className="bg-red-600 inline-block px-4 py-1 text-xs font-black tracking-[0.3em] uppercase">Need a Website?</div>
                        <h3 className="text-5xl font-black tracking-tighter leading-none italic uppercase">
                          Creating <br /> <span className="text-red-600">Your</span> <br /> Website
                        </h3>
                        <p className="text-xs font-bold text-white/50 tracking-widest uppercase">For Your Business!</p>
                      </div>
                      
                      <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-3xl border border-white/10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-full border-2 border-red-600 flex items-center justify-center font-black italic">D</div>
                          <div>
                            <p className="font-black tracking-tighter uppercase leading-none">Don Owolyea</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Sole Trade</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {["Modern Design", "Responsive", "Fast & Secure", "Grow Business"].map((tag) => (
                            <div key={tag} className="text-[10px] font-black uppercase tracking-tighter border border-white/10 p-2 rounded-lg text-center">
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Middle Section: Detailed Checklist */}
                  <div className="flex-[1.2] flex flex-col items-center justify-center py-12 px-8 bg-zinc-950/20 rounded-[4rem] border border-white/5">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      className="text-center w-full max-w-lg"
                    >
                      <h4 className="text-2xl font-black italic mb-12 tracking-tight">We provide the following service;</h4>
                      
                      <div className="space-y-6 mb-16">
                        {[
                          "Printing & Photocopy",
                          "Writing Cover Letter",
                          "create Your CV",
                          "Editing & typing",
                          "Creating Business Logo"
                        ].map((item, i) => (
                          <motion.div 
                            key={item}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-6 text-2xl md:text-3xl font-black tracking-tighter uppercase italic group cursor-default"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <Check className="text-red-600" size={28} strokeWidth={5} />
                            </motion.div>
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="h-px bg-white/10 w-full mb-12" />
                      
                      <h4 className="text-2xl font-black italic mb-12 tracking-tight">And we Build & Create The Following;</h4>
                      
                      <div className="space-y-6">
                        {[
                          { name: "Ui/ Ux design", Icon: Layout },
                          { name: "Create Website", Icon: Globe }
                        ].map((item, i) => (
                          <motion.div 
                            key={item.name}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className="flex items-center gap-6 text-3xl md:text-4xl font-black tracking-tighter uppercase italic group cursor-default"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: -10 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              className="bg-red-600/20 p-4 rounded-xl flex items-center justify-center"
                            >
                              <item.Icon className="text-red-600" size={32} strokeWidth={3} />
                            </motion.div>
                            <span>{item.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Poster: Branding focus */}
                  <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="flex-1 relative group rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 h-[700px]"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1572044162444-ad60f128bde2?q=80&w=1000" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      alt="Graphic Design Services"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 p-12 flex flex-col justify-center items-center text-center">
                      <div className="space-y-6 transform group-hover:scale-110 transition-transform duration-700">
                        <h3 className="text-6xl font-black tracking-tighter leading-[0.8] uppercase italic">
                          CREATE <br /> <span className="text-red-600">SMART.</span> <br /> 
                          BUILD <br /> <span className="text-yellow-500">STRONG.</span> <br /> 
                          GROW <br /> <span className="text-red-600">FAST.</span>
                        </h3>
                        <div className="pt-12">
                          <p className="text-lg font-black tracking-[0.2em] uppercase">Don Owolyea</p>
                          <p className="text-xs text-white/50 tracking-[0.4em] uppercase mt-2">Sole Trade</p>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between border-t border-white/10 pt-8">
                        <div className="text-left">
                          <p className="text-[10px] font-black text-red-600 uppercase">Your Vision</p>
                          <p className="text-[10px] font-black uppercase">Our Creativity</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-yellow-500 uppercase">Your Success</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Bottom Footer Elements */}
      <footer className="relative z-30 flex flex-col md:flex-row items-center justify-between px-6 py-12 lg:px-12 bg-black border-t border-white/5" id="footer-section">
        <div className="flex gap-8 mb-8 md:mb-0" id="social-links">
          {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
            <a 
              key={i} 
              href="#" 
              className="text-white/40 hover:text-red-600 transition-all hover:scale-125"
              id={`social-link-${i}`}
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
        <div className="text-white/20 text-sm font-bold tracking-widest uppercase">
          © 2024 Don Owolyea Sole Trade • Port Moresby, PNG
        </div>
      </footer>

      {/* Corner Graphic Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none z-0 overflow-hidden">
        <CircleDashed className="w-96 h-96 animate-[spin_60s_linear_infinite]" id="corner-decor" />
      </div>

      {/* Sticky Contact Form */}
      {!isMenuOpen && (
        <div className="fixed bottom-8 right-8 z-[100]" id="sticky-contact-container">
        <AnimatePresence>
          {isContactOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-16 right-0 w-[90vw] md:w-[400px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-8 mb-4 overflow-hidden"
              id="contact-panel"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600" id="panel-accent" />
              
              <div className="flex justify-between items-center mb-8" id="panel-header">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight" id="panel-title">Message Don</h3>
                  <p className="text-white/50 text-sm mt-1" id="panel-subtitle">Expect a response within 24h</p>
                </div>
                <button 
                  onClick={() => setIsContactOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  id="close-panel-btn"
                >
                  <X size={20} />
                </button>
              </div>

              {formStatus === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center"
                  id="success-message"
                >
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                    <Send size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold">Message Sent!</h4>
                  <p className="text-white/60 mt-2">Thank you for reaching out.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-red-600/50 transition-colors text-white placeholder:text-white/20"
                      id="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-red-600/50 transition-colors text-white placeholder:text-white/20"
                      id="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="How can we help?"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-red-600/50 transition-colors text-white placeholder:text-white/20 resize-none"
                      id="input-message"
                    ></textarea>
                  </div>
                  
                  <button 
                    disabled={formStatus === "sending"}
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900/50 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 group"
                    id="submit-form-btn"
                  >
                    {formStatus === "sending" ? "Sending..." : (
                      <>
                        Send Message 
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsContactOpen(!isContactOpen)}
          className={`flex items-center gap-3 px-6 py-4 rounded-full font-bold shadow-2xl transition-all ${
            isContactOpen ? 'bg-white text-black' : 'bg-red-600 text-white'
          }`}
          id="contact-toggle-btn"
        >
          {isContactOpen ? <X size={24} /> : <MessageSquare size={24} />}
          <span className="hidden md:inline">{isContactOpen ? "Close" : "Contact Don"}</span>
        </motion.button>
      </div>
      )}
    </div>
  );
}

