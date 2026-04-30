import { Terminal, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
  onSearchClick: () => void;
}

const navLinks = ['HOME', 'PROJECTS', 'ABOUT', 'CONTACT'];

const Navbar = ({ toggleTheme, isDark, onSearchClick }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 w-full border-b border-muted bg-background/80 backdrop-blur-md"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-accent" />
            <span className="font-mono text-base sm:text-lg font-bold tracking-tighter">ROHIT.SYS</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs font-medium tracking-widest text-foreground/60 transition-colors hover:text-accent"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search - hidden on mobile */}
            <button 
              onClick={onSearchClick}
              className="hidden h-9 items-center gap-2 rounded-md border border-muted bg-muted/20 px-3 md:flex hover:bg-muted/40 transition-colors"
            >
              <Search className="h-4 w-4 text-foreground/40" />
              <span className="font-mono text-[10px] text-foreground/40 uppercase">COMMANDS (⌘K)</span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="rounded-md p-2 hover:bg-muted/40 transition-all active:scale-95"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="rounded-md p-2 hover:bg-muted/40 transition-all active:scale-95 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-muted bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm font-bold tracking-widest text-foreground/60 hover:text-accent transition-colors py-1 border-b border-muted/30 last:border-0"
                >
                  {item}
                </a>
              ))}
              <button 
                onClick={() => { onSearchClick(); setMenuOpen(false); }}
                className="flex items-center gap-2 font-mono text-xs text-foreground/40 hover:text-accent transition-colors"
              >
                <Search className="h-4 w-4" />
                COMMAND PALETTE (⌘K)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
