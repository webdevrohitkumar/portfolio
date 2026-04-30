import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Settings, Server, GitBranch } from 'lucide-react';

const skillGroups = [
  {
    title: "LANGUAGES",
    icon: Code2,
    skills: ["JavaScript", "TypeScript", "Java"]
  },
  {
    title: "FRONTEND",
    icon: Layout,
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "BACKEND",
    icon: Server,
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth"]
  },
  {
    title: "DATABASE",
    icon: Database,
    skills: ["MongoDB", "Mongoose", "MySQL"]
  },
  {
    title: "TOOLS",
    icon: GitBranch,
    skills: ["Git", "GitHub", "Postman", "VS Code", "Vercel"]
  },
  {
    title: "CONCEPTS",
    icon: Settings,
    skills: ["DSA", "OOP", "DBMS", "OS", "CN"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 bg-muted/5">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">TECH STACK</h2>
          <p className="mt-2 text-foreground/40 font-mono text-[10px] tracking-widest uppercase">System//Dependencies_Manifest</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="rounded-lg border border-muted bg-muted/20 p-6 transition-all hover:border-accent/40"
            >
              <div className="mb-4 flex items-center gap-3">
                <group.icon className="h-5 w-5 text-accent" />
                <h3 className="font-mono text-sm font-bold tracking-widest">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="rounded-md border border-white/5 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-foreground/60 transition-colors hover:text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
