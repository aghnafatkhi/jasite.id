import { Link, Outlet, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, Code2, Languages, ArrowUp } from "lucide-react";
import { useStore } from "../store";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const { theme, toggleTheme, language, setLanguage } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const t = {
    id: {
      home: "Beranda",
      catalog: "Katalog",
      portfolio: "Portofolio",
      admin: "Admin",
      footerDesc: "Solusi pembuatan website profesional dengan harga yang sangat terjangkau. Kami bantu bisnis Anda online dengan cepat dan berkualitas.",
      contact: "Kontak",
      navigation: "Navigasi",
      rights: "Semua hak dilindungi.",
      terms: "Syarat & Ketentuan",
      privacy: "Kebijakan Privasi"
    },
    en: {
      home: "Home",
      catalog: "Catalog",
      portfolio: "Portfolio",
      admin: "Admin",
      footerDesc: "Professional website creation solutions at highly affordable prices. We help your business go online quickly and with quality.",
      contact: "Contact",
      navigation: "Navigation",
      rights: "All rights reserved.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy"
    }
  }[language];

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleThemeToggle = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    // If browser doesn't support view transitions, use fallback animation
    if (!document.startViewTransition) {
      setClickPos({ x, y });
      setIsTransitioning(true);
      
      // Wait for circle to expand, then toggle theme
      setTimeout(() => {
        toggleTheme();
      }, 400);

      // Wait for fade out
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Fallback Theme Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ clipPath: `circle(0% at ${clickPos.x}px ${clickPos.y}px)`, opacity: 1 }}
            animate={{ clipPath: `circle(150% at ${clickPos.x}px ${clickPos.y}px)`, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed inset-0 pointer-events-none z-[999] ${theme === 'light' ? 'bg-[#050505]' : 'bg-slate-50'}`}
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-slate-50/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter text-slate-900 dark:text-white">jasite.id</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              <Link to="/" className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                <motion.span key={"nav-home-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t.home}</motion.span>
              </Link>
              <Link to="/katalog" className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary ${location.pathname === '/katalog' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                <motion.span key={"nav-catalog-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t.catalog}</motion.span>
              </Link>
              <Link to="/testimoni" className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-primary ${location.pathname === '/testimoni' ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                <motion.span key={"nav-portfolio-" + language} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t.portfolio}</motion.span>
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white"
              >
                <Languages className="w-4 h-4" />
                {language}
              </button>
              <button
                onClick={handleThemeToggle}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-yellow-400" />}
              </button>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-90"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden border-t border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-[#0f172a] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-8 space-y-2">
                <motion.div variants={itemVariants}>
                  <Link to="/" className="block px-4 py-4 rounded-2xl text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">{t.home}</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link to="/katalog" className="block px-4 py-4 rounded-2xl text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">{t.catalog}</Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link to="/testimoni" className="block px-4 py-4 rounded-2xl text-lg font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">{t.portfolio}</Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-[#080808] border-t border-slate-200 dark:border-slate-800/50">
        <div className="container-custom py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6 group">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
                  <Code2 className="w-5 h-5 text-black" />
                </div>
                <span className="font-display font-black text-xl tracking-tighter text-slate-900 dark:text-white">jasite.id</span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-sm leading-relaxed">
                {t.footerDesc}
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm">{t.navigation}</h3>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 font-medium">
                <li><Link to="/" className="hover:text-primary transition-colors">{t.home}</Link></li>
                <li><Link to="/katalog" className="hover:text-primary transition-colors">{t.catalog}</Link></li>
                <li><Link to="/testimoni" className="hover:text-primary transition-colors">{t.portfolio}</Link></li>
                <li><Link to="/secret-admin" className="opacity-0 cursor-default">{t.admin}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-sm">{t.contact}</h3>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 font-medium">
                <li>WhatsApp: 0812-3456-7890</li>
                <li>Email: hello@jasite.id</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <p>&copy; {new Date().getFullYear()} jasite.id. {t.rights}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary">{t.terms}</a>
              <a href="#" className="hover:text-primary">{t.privacy}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.544 4.197 1.582 6.06L0 24l6.117-1.605a11.793 11.793 0 005.93 1.587h.005c6.632 0 12.028-5.391 12.032-12.024a11.812 11.812 0 00-3.537-8.502z" />
        </svg>
        <span className="absolute right-full mr-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-sm font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-200 dark:border-slate-800">
          {language === 'id' ? 'Tanya Kami' : 'Ask Us'}
        </span>
      </a>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-28 right-8 z-[60] w-12 h-12 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-full flex items-center justify-center shadow-2xl border border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-black dark:hover:bg-primary dark:hover:text-black transition-all active:scale-95"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
