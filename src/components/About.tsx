import { motion } from 'framer-motion';
import { Award, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-2">
          {/* Left Column: Education */}
          <div>
            <div className="mb-8">
              <h2 className="font-mono text-3xl font-bold tracking-tighter md:text-4xl">EDUCATION</h2>
              <p className="mt-2 text-foreground/40 font-mono text-[10px] tracking-widest uppercase">System//Academic_Log</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  degree: "Bachelor of Technology in Computer Science",
                  school: "Babu Banarasi Das Institute of Technology",
                  location: "Ghaziabad",
                  period: "2022 – 2026",
                  detail: "CGPA: 7.8"
                },
                {
                  degree: "Intermediate",
                  school: "Bindeshwari Singh College",
                  location: "Patna",
                  period: "2022",
                  detail: "Result: 67.20%"
                },
                {
                  degree: "High School",
                  school: "Gandhi High School",
                  location: "Patna",
                  period: "2020",
                  detail: "Result: 71%"
                }
              ].map((edu, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
                  className="relative border-l border-muted pl-6 pb-6 last:pb-0"
                >
                  <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] font-bold text-accent">{edu.period}</span>
                    <h3 className="font-mono text-lg font-bold">{edu.degree}</h3>
                    <p className="text-sm text-foreground/60">{edu.school}, {edu.location}</p>
                    <p className="font-mono text-[11px] text-accent/80 font-bold">{edu.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience/Philosophy/Contact */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
              className="rounded-lg border border-muted bg-muted/10 p-8"
            >
              <h3 className="mb-4 font-mono text-xl font-bold">CORE PHILOSOPHY</h3>
              <p className="text-sm leading-relaxed text-foreground/60">
                I believe in building software that is not just functional but also performs exceptionally well. 
                My focus is on writing clean, scalable code and creating user interfaces that feel intuitive and alive.
                Continuous learning and problem-solving are what drive me every day.
              </p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
                className="rounded-lg border border-muted bg-muted/20 p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <h4 className="mb-2 font-mono text-sm font-bold">CERTIFICATIONS</h4>
                <p className="text-xs text-foreground/40 font-mono">Web Development Certification - BE10x & Ducat (2025)</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
                className="rounded-lg border border-muted bg-muted/20 p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <h4 className="mb-2 font-mono text-sm font-bold">LOCATION</h4>
                <p className="text-xs text-foreground/40 font-mono">Currently in Ghaziabad, IN. Open to relocation.</p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
              className="rounded-lg border border-accent/20 bg-accent/5 p-8"
            >
              <h3 className="mb-2 font-mono text-xl font-bold text-accent">CURRENT STATUS</h3>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                <span className="font-mono text-xs font-bold tracking-widest text-foreground/80">SEEKING OPPORTUNITIES</span>
              </div>
              <p className="mt-4 text-xs text-foreground/40">Looking for SDE-1 or Full Stack Developer roles in dynamic tech environments.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
