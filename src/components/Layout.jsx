import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageSquare, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore Schemes', path: '/' },
    { name: 'Track Status', path: '/tracker' },
    { name: 'Operator Portal', path: '/operator' },
    { name: 'Grievance', path: '/grievance' },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white relative overflow-hidden flex flex-col">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-900/30 blur-[120px] mix-blend-screen animate-float" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-900/20 blur-[120px] mix-blend-screen animate-float-delay" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-violet-900/20 blur-[100px] mix-blend-screen animate-pulse-glow" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-navy-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-violet-500 to-teal-400 p-[2px] shadow-glow-brand group-hover:shadow-glow-violet transition-all duration-300">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent group-hover:opacity-100 transition-opacity"></div>
                   <span className="font-display font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-300">S</span>
                </div>
              </div>
              <span className="text-2xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 group-hover:to-white transition-all duration-300">
                SchemeAI
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-300 hover:text-brand-400 relative py-2 ${location.pathname === link.path ? 'text-brand-400' : 'text-slate-300'}`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-400 to-teal-400 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
              <Link to="/login" className="btn-primary flex items-center gap-2 group">
                <span>Login / Signup</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden relative z-50">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy-950/95 backdrop-blur-3xl pt-24 pb-8 px-4 flex flex-col h-screen"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-4 rounded-xl text-lg font-medium transition-colors ${location.pathname === link.path ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-auto">
                 <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full flex justify-center py-4 text-lg">
                    Login / Signup
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex-grow flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-navy-950/50 backdrop-blur-lg py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-400 p-[1px]">
                        <div className="w-full h-full bg-navy-950 rounded-[7px] flex items-center justify-center">
                            <span className="font-display font-bold text-sm text-brand-400">S</span>
                        </div>
                    </div>
                    <span className="font-display font-bold text-lg text-slate-200">SchemeAI</span>
                </div>
                <div className="text-center md:text-right text-slate-500 text-sm">
                    © 2026 SchemeAI. Empowering Citizens through Information.<br/>
                    <span className="text-xs mt-1 block opacity-70">Designed with precision. Built for scale.</span>
                </div>
            </div>
        </div>
      </footer>

      {/* Floating Help Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-brand-500 to-violet-600 rounded-full shadow-glow-brand hover:shadow-glow-violet flex items-center justify-center group transform transition-all hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <MessageSquare className="w-6 h-6 text-white group-hover:animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500 border-2 border-navy-950"></span>
        </span>
      </motion.button>
    </div>
  );
};

export default Layout;
