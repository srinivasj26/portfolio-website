import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Server, Cpu } from 'lucide-react';
import MagneticButton from './MagneticButton';

const defaultResponses: Record<string, string> = {
  "Analyze Legacy Code": "Scanning COBOL framework... Identified 452 business logic rules. Translating to Node.js microservices. Estimated refactor time: Accelerated by 85% via automated workflows.",
  "Query: Tech Stack": "Current Matrix:\n- Backend: Node.js, Express, Go\n- Frontend: React, TypeScript, Vite\n- AI: MCP tools, LLM Orchestration\n- Systems: IBM Enterprise Platforms",
  "Deploy Modernization": "Initializing deployment sequence. Bypassing manual approval gates via verified agentic checks. Deployment successful. System uptime maximized.",
};

const AgentSandbox: React.FC = () => {
  const [history, setHistory] = useState<{role: 'user' | 'agent', text: string}[]>([
    { role: 'agent', text: 'IBM Systems Agent v2.4 initialized. Awaiting commands.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handlePrompt = (prompt: string) => {
    if (isTyping) return;
    
    setHistory(prev => [...prev, { role: 'user', text: `> ${prompt}` }]);
    setIsTyping(true);

    const response = defaultResponses[prompt] || "Command not recognized.";
    
    // Simulate thinking delay
    setTimeout(() => {
      // Add empty agent message to start filling
      setHistory(prev => [...prev, { role: 'agent', text: '' }]);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < response.length) {
          // Use functional state update to ensure we always append the exact current character
          setHistory(prev => {
            const newHistory = [...prev];
            const lastMsg = newHistory[newHistory.length - 1];
            // Only append the specific character for this tick
            newHistory[newHistory.length - 1] = {
                ...lastMsg,
                text: response.slice(0, currentIndex + 1)
            };
            return newHistory;
          });
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30); // Speed of typing
    }, 600);
  };

  return (
    <section className="section-padding sandbox-section">
      <div className="container">
        <div className="section-header animate-fade-in-up">
          <Terminal className="section-icon" size={32} />
          <h2>Agent Sandbox.</h2>
        </div>
        <p className="sandbox-desc animate-fade-in-up delay-100">
          Interact with a simulation of the core agent frameworks I build to automate enterprise workflows.
        </p>

        <div className="sandbox-container glass-panel animate-fade-in-up delay-200">
          <div className="sandbox-header">
            <div className="sandbox-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="sandbox-title">
              <Server size={14} className="icon-subtle" />
              <span>srinivas-agentic-runtime</span>
            </div>
          </div>

          <div className="sandbox-terminal" ref={scrollRef}>
            {history.map((msg, idx) => (
              <div key={idx} className={`terminal-message ${msg.role}`}>
                {msg.role === 'agent' && <Cpu size={14} className="agent-icon" />}
                <span style={{ whiteSpace: 'pre-line' }}>{msg.text}</span>
              </div>
            ))}
            {isTyping && (
              <div className="terminal-message agent">
                <Cpu size={14} className="agent-icon" />
                <span className="typing-cursor">█</span>
              </div>
            )}
          </div>

          <div className="sandbox-actions">
            {Object.keys(defaultResponses).map((prompt, idx) => (
              <MagneticButton 
                key={idx} 
                className="btn btn-outline prompt-btn" 
                onClick={() => handlePrompt(prompt)}
              >
                {prompt} <Send size={14} style={{ marginLeft: '8px' }} />
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSandbox;
