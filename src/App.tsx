import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import CommandPalette from './components/CommandPalette';
import { BGPattern } from './components/ui/bg-pattern';
import { useState, useEffect } from 'react';
import Lenis from 'lenis';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen text-foreground transition-colors duration-300 selection:bg-accent selection:text-white relative`}>
      <BGPattern className="fixed inset-0" variant="grid" mask="fade-bottom" />
      <Navbar toggleTheme={toggleTheme} isDark={isDark} onSearchClick={() => setIsCommandPaletteOpen(true)} />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        
        <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
        
        {/* Footer */}
        <footer className="border-t border-muted py-8 sm:py-12 px-4 sm:px-6 bg-muted/5">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="font-mono text-xs text-foreground/40 text-center sm:text-left">
              © 2026 ROHIT KUMAR. ALL SYSTEMS OPERATIONAL.
            </div>
            <div className="flex gap-4 sm:gap-6">
              {[
                { label: 'GITHUB', href: 'https://github.com/webdevrohitkumar' },
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/rohit-kumar-870rrr/' },
                { label: 'X', href: 'https://x.com/RohitRaj870996' },
              ].map((s) => (
                <a 
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[10px] font-bold tracking-widest text-foreground/40 hover:text-accent transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
