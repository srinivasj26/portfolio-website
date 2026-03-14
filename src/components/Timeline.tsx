import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GitBranch } from 'lucide-react';

const timelineData = [
  {
    year: "Jun 2022",
    title: "Backend Engineer @ IBM",
    description: "Joined IBM India Software Labs fresh out of college. Spent 3 solid years mastering enterprise Java — building scalable backend systems, APIs, and microservices powering production for large clients.",
    tags: ["Java", "Spring Boot", "REST APIs", "Microservices", "SQL"]
  },
  {
    year: "Late 2023",
    title: "Curious About AI",
    description: "Started self-driven deep learning in AI/ML, LLMs, and what it meant to build intelligent systems. Began connecting the dots between automation and what AI could actually do at enterprise scale.",
    tags: ["Python", "LLMs", "AI/ML fundamentals", "Automation"]
  },
  {
    year: "Feb 2025",
    title: "Stepping Into the Unknown",
    description: "Moved to a high-stakes new project. Had to rapidlearn IBM Z, understand mainframe architecture, and reimagine complex migration workflows. No playbook — just ownership, first principles, and execution.",
    tags: ["IBM Z", "Mainframe", "Complex Systems", "Research"]
  },
  {
    year: "2025 — Now",
    title: "Architecting the Future",
    description: "Designed and built an agentic AI migration platform from scratch — MCP tools running on mainframes, intelligent agents orchestrating them, and a natural language interface for developers. Leading the team. Shipping real impact.",
    tags: ["Agentic AI", "MCP Tools", "LLM Agents", "Technical Lead", "TypeScript"]
  }
];

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="evolution" className="section-padding timeline-section" ref={containerRef} aria-labelledby="timeline-heading">
      <div className="container">
        <div className="scroll-reveal">
          <span className="section-label animate-fade-in-up">Journey</span>
          <div className="section-header animate-fade-in-up delay-100">
            <GitBranch className="section-icon" size={32} aria-hidden />
            <h2 id="timeline-heading">The evolution</h2>
          </div>
        </div>

        <div className="timeline-container">
          <div className="timeline-line-wrapper">
            <svg 
              viewBox="0 0 20 100" 
              preserveAspectRatio="none" 
              className="timeline-svg"
            >
              <line x1="10" y1="0" x2="10" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
              <motion.line 
                x1="10" y1="0" x2="10" y2="100" 
                stroke="url(#timeline-gradient)" 
                strokeWidth="4" 
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1192e8" />
                  <stop offset="100%" stopColor="#0f62fe" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="timeline-items">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index}
                item={item} 
                progress={pathLength} 
                triggerPoint={index / (timelineData.length - 1)} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem: React.FC<{
  item: typeof timelineData[0], 
  progress: any, 
  triggerPoint: number
}> = ({ item, progress, triggerPoint }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return progress.on('change', (v: number) => {
      setIsActive(v >= triggerPoint - 0.1);
    });
  }, [progress, triggerPoint]);

  return (
    <div className={`timeline-node ${isActive ? 'active' : ''}`}>
      <div className="node-dot" />
      <div className="node-content">
        <span className="node-year">{item.year}</span>
        <h3 className="node-title">{item.title}</h3>
        <p className="node-desc">{item.description}</p>
        <div className="node-tags">
          {item.tags.map((tag, i) => (
            <span key={i} className="node-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
