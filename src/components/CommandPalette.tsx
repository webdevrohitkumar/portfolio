import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, FileText, Layout, User, Command } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const commands = [
  { icon: Terminal, name: 'Go to Home', href: '#home', shortcut: 'G H' },
  { icon: Layout, name: 'View Projects', href: '#projects', shortcut: 'G P' },
  { icon: FileText, name: 'View Skills', href: '#skills', shortcut: 'G S' },
  { icon: User, name: 'About Me', href: '#about', shortcut: 'G A' },
  { icon: Search, name: 'Search Documentation', href: '#', shortcut: 'S D' },
];

const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed left-1/2 top-1/4 z-[70] w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-muted bg-background shadow-2xl"
          >
            <div className="flex items-center border-b border-muted p-4">
              <Search className="mr-3 h-5 w-5 text-foreground/40" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-foreground/40"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="rounded border border-muted bg-muted/20 px-1.5 py-0.5 font-mono text-[10px] text-foreground/40">
                ESC
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => (
                  <a
                    key={idx}
                    href={cmd.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-foreground/60 transition-colors hover:bg-accent/10 hover:text-accent"
                  >
                    <div className="flex items-center gap-3">
                      <cmd.icon className="h-4 w-4" />
                      <span className="font-mono text-xs font-medium">{cmd.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-foreground/20">{cmd.shortcut}</span>
                  </a>
                ))
              ) : (
                <div className="p-4 text-center font-mono text-xs text-foreground/40">
                  No results found for "{query}"
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-muted bg-muted/5 p-3">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-foreground/40">
                <Command className="h-3 w-3" />
                <span>TO SELECT</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-foreground/40">
                <span className="rounded border border-muted px-1">↑↓</span>
                <span>TO NAVIGATE</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
