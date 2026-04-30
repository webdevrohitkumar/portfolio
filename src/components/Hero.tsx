import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Mail, ExternalLink, Copy, Check } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, XIcon } from './SocialIcons';
import { useState } from 'react';

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const email = "stevenrohitraj@gmail.com";

  const words = ["ROHIT KUMAR", "SOFTWARE DEV.", "BACKEND DEV.", "MERN DEV.", "FRONTEND DEV."];
  const [index, setIndex] = useState(0);

  const [githubStats, setGithubStats] = useState({
    repos: 0,
    stars: 0,
    liveProjects: 0,
    contributions: "0",
    loading: true,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  React.useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const username = 'webdevrohitkumar';
        
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposRes.json();
        
        let totalStars = 0;
        let liveProjectsCount = 0;
        
        if (Array.isArray(reposData)) {
          totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
          liveProjectsCount = reposData.filter(repo => repo.homepage && repo.homepage !== "").length;
        }

        let totalContributions = "30";
        try {
          const profileHtmlRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://github.com/${username}`)}`);
          const profileHtmlData = await profileHtmlRes.json();
          const html = profileHtmlData.contents;
          const match = html.match(/(\d{1,3}(?:,\d{3})*|\d+)\s+contributions\s+in\s+the\s+last\s+year/i);
          if (match && match[1]) {
            totalContributions = match[1];
          }
        } catch (e) {
          console.error("Failed to fetch contributions", e);
        }

        setGithubStats({
          repos: userData.public_repos || 0,
          stars: totalStars,
          liveProjects: liveProjectsCount || 0,
          contributions: totalContributions,
          loading: false,
        });

        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`);
        const eventsData = await eventsRes.json();
        
        if (Array.isArray(eventsData)) {
          const activities = eventsData
            .filter(event => event.type === 'PushEvent' || event.type === 'PullRequestEvent')
            .slice(0, 3)
            .map(event => {
              const date = new Date(event.created_at);
              const now = new Date();
              const diffMs = now.getTime() - date.getTime();
              const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
              const diffDays = Math.floor(diffHrs / 24);
              
              let timeAgo = `${diffHrs}h ago`;
              if (diffHrs === 0) timeAgo = 'Just now';
              else if (diffHrs > 24) timeAgo = `${diffDays}d ago`;
              else if (diffHrs === 1) timeAgo = '1h ago';

              const repoName = event.repo.name.split('/')[1];
              
              if (event.type === 'PushEvent') {
                return { type: 'push', repo: repoName, time: timeAgo, color: 'bg-green-500' };
              } else {
                const action = event.payload.action;
                return { type: 'pr', action, repo: repoName, time: timeAgo, color: 'bg-accent' };
              }
            });
            
          setRecentActivity(activities);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        setGithubStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchGithubData();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden py-16 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-4xl"
      >
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-5">
          
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex w-fit items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold tracking-widest text-accent"
          >
            FULL STACK DEVELOPER
          </motion.div>

          {/* Animated Heading */}
          <h1 className="font-mono font-extrabold tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl w-full">
            <span className="block md:inline">I'M </span>
            <span className="relative inline-flex md:ml-4">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: "-100%", opacity: 0, rotateX: 90 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="text-accent whitespace-nowrap"
                  style={{ display: "inline-block" }}
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-xl text-sm sm:text-base text-foreground/60 leading-relaxed">
            Final-year Computer Science student specializing in MERN stack development. 
            Passionate about building responsive web applications, API development, 
            and frontend performance optimization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center md:justify-start">
            <button className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-bold text-white transition-all hover:bg-accent/80 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              HIRE ME <ExternalLink className="h-4 w-4" />
            </button>
            <div className="flex items-center rounded-md border border-muted bg-muted/20 overflow-hidden max-w-[260px] sm:max-w-none">
              <span className="px-3 font-mono text-xs text-foreground/60 truncate">{email}</span>
              <button 
                onClick={copyEmail}
                className="shrink-0 border-l border-muted p-2.5 hover:bg-accent/10 hover:text-accent transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {[
              { icon: GitHubIcon, href: "https://github.com/webdevrohitkumar", label: "GITHUB" },
              { icon: LinkedInIcon, href: "https://www.linkedin.com/in/rohit-kumar-870rrr/", label: "LINKEDIN" },
              { icon: XIcon, href: "https://x.com/RohitRaj870996", label: "X" },
              { icon: Mail, href: `mailto:${email}`, label: "EMAIL" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-muted px-3 py-2 font-mono text-[10px] font-bold tracking-widest transition-all hover:border-accent hover:text-accent"
              >
                <social.icon className="h-3 w-3" />
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* GitHub Stats Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 sm:mt-16 w-full rounded-lg border border-muted bg-muted/10 p-4 sm:p-6 backdrop-blur-sm"
        >
          {/* Dashboard Header */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-muted/50 pb-4">
            <div className="flex items-center gap-3">
              <GitHubIcon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
              <a href="https://github.com/webdevrohitkumar" target="_blank" rel="noreferrer" className="font-mono text-xs sm:text-sm font-bold tracking-tight hover:text-accent transition-colors">
                @webdevrohitkumar
              </a>
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-accent uppercase tracking-widest bg-accent/10 px-2 py-1 rounded border border-accent/20">
              {githubStats.loading ? "Fetching..." : "Live System Stats"}
            </span>
          </div>

          {/* Stats Grid - 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {[
              { label: "Total Contributions", value: githubStats.contributions, color: "text-accent" },
              { label: "Public Repos", value: githubStats.repos, color: "text-foreground" },
              { label: "Live Projects", value: githubStats.liveProjects, color: "text-foreground" },
              { label: "Total Stars", value: githubStats.stars, color: "text-yellow-500" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 p-3 rounded-md bg-muted/20 border border-muted/30">
                <span className="font-mono text-[9px] sm:text-[10px] text-foreground/40 uppercase leading-tight">{stat.label}</span>
                <span className={`font-mono text-lg sm:text-xl font-bold ${stat.color}`}>
                  {githubStats.loading ? "..." : stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Latest Activity */}
          <div className="flex flex-col gap-3 border-t border-muted/50 pt-4">
            <span className="font-mono text-[9px] sm:text-[10px] text-foreground/40 uppercase tracking-widest">Latest Activity</span>
            <div className="flex flex-col gap-2 min-h-[60px]">
              {githubStats.loading ? (
                <div className="text-xs text-foreground/40 font-mono animate-pulse">Syncing with GitHub...</div>
              ) : recentActivity.length > 0 ? (
                recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono py-0.5">
                    <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${act.color}`} />
                    <span className="text-foreground/80 truncate min-w-0">
                      {act.type === 'push' ? 'Pushed to ' : `${act.action} PR in `}
                      <span className="text-accent">{act.repo}</span>
                    </span>
                    <span className="text-foreground/40 shrink-0 whitespace-nowrap ml-auto">{act.time}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-foreground/40 font-mono">No recent public activity found.</div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
