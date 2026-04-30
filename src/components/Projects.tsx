import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GitHubIcon } from './SocialIcons';

const projects = [
  {
    title: "AI JOB SEEKER RECOMMENDATION",
    category: "MERN STACK + LLM",
    description: "Full-stack job portal with AI recommendations. Implemented role-based auth and optimized MongoDB queries.",
    tech: ["React", "Node.js", "MongoDB", "LLM"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    link: "#",
    github: "#",
    status: "LIVE"
  },
  {
    title: "INTERACTIVE SNAKE GAME",
    category: "JAVASCRIPT GAME",
    description: "Browser-based classic Snake game with high score persistence using localStorage.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    link: "https://snake-game-rho-azure.vercel.app/",
    github: "https://github.com/webdevrohitkumar/snake-game",
    status: "COMPLETED"
  },
  {
    title: "AEROCARDS",
    category: "REACT UI/UX",
    description: "Interactive draggable cards interface with smooth Framer Motion animations.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    link: "https://aero-card.vercel.app/",
    github: "https://github.com/webdevrohitkumar/aero-card",
    status: "FEATURED"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-12 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">SELECTED PROJECTS</h2>
            <p className="mt-2 text-foreground/40 font-mono text-[10px] tracking-widest uppercase">System//Development_Portfolio</p>
          </div>
          <div className="h-[1px] flex-grow mx-8 bg-muted hidden md:block" />
          <button 
            className="rounded-md border border-muted px-4 py-2 font-mono text-xs font-bold hover:border-accent hover:text-accent transition-colors"
            onClick={() => window.open('https://github.com/webdevrohitkumar?tab=repositories', '_blank')}
          >
            VIEW ALL REPOS
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
              }}
              className="group relative overflow-hidden rounded-lg border border-muted bg-muted/10 transition-all hover:border-accent/40 flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold tracking-widest text-accent uppercase">{project.category}</span>
                  <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 font-mono text-[8px] font-bold text-green-500 tracking-tighter">{project.status}</span>
                </div>
                
                <h3 className="mb-2 font-mono text-base sm:text-lg font-bold tracking-tight">{project.title}</h3>
                <p className="mb-4 text-xs text-foreground/60 leading-relaxed flex-1">{project.description}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded bg-muted/40 px-2 py-1 font-mono text-[9px] text-foreground/40">{t}</span>
                  ))}
                </div>

                <div className="flex gap-4 border-t border-muted pt-4">
                  <a href={project.link} target='_blank' rel="noreferrer" className="flex items-center gap-1.5 font-mono text-[10px] font-bold hover:text-accent transition-colors">
                    <ExternalLink className="h-3 w-3" /> LIVE DEMO
                  </a>
                  <a href={project.github} target='_blank' rel="noreferrer" className="flex items-center gap-1.5 font-mono text-[10px] font-bold hover:text-accent transition-colors">
                    <GitHubIcon className="h-3 w-3" /> SOURCE
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
