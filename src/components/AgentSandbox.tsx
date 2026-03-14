import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Server, Cpu } from 'lucide-react';
import MagneticButton from './MagneticButton';

const defaultResponses: Record<string, string> = {
  "Explain this code": "Analyzing codebase... Found 3 functions with high complexity. Summary: Main handler delegates to helpers; consider extracting validation. Estimated readability score: 7/10.",
  "Suggest improvements": "Recommendations:\n1. Add error boundaries for async flows\n2. Cache repeated API calls\n3. Use TypeScript strict mode for safer refactors\n— Apply these? (demo only)",
  "Run tests": "Running test suite... Unit: 42 passed. Integration: 8 passed. Coverage: 87%. No regressions detected.",
};

const FALLBACK_RESPONSE = "Got it. This is a demo — pick a command above to see how I’d respond to a problem like that.";

function nextId(): string {
  return (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

type ChatMessage = { id: string; role: 'user' | 'agent'; text: string };

const AgentSandbox: React.FC = () => {
  const [history, setHistory] = useState<ChatMessage[]>([
    { id: nextId(), role: 'agent', text: 'Ready to turn complexity into clarity. Try a command below.' }
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
    const userMsgId = nextId();
    const agentMsgId = nextId();
    setHistory(prev => [...prev, { id: userMsgId, role: 'user', text: `> ${prompt}` }]);
    setIsTyping(true);

    const response = defaultResponses[prompt] ?? FALLBACK_RESPONSE;
    
    setTimeout(() => {
      setHistory(prev => [...prev, { id: agentMsgId, role: 'agent', text: '' }]);
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < response.length) {
          setHistory(prev => {
            const newHistory = [...prev];
            const lastMsg = newHistory[newHistory.length - 1];
            if (lastMsg.id !== agentMsgId) return prev;
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
      }, 30);
    }, 600);
  };

  return (
    <section className="section-padding sandbox-section" aria-labelledby="sandbox-heading">
      <div className="container">
        <div className="scroll-reveal">
          <span className="section-label animate-fade-in-up">Demo</span>
          <div className="section-header animate-fade-in-up delay-100">
            <Terminal className="section-icon" size={32} aria-hidden />
            <h2 id="sandbox-heading">Agent sandbox</h2>
          </div>
        </div>
        <p className="sandbox-desc animate-fade-in-up delay-100">
          A small taste of how I think about software and AI—problems without a playbook, turned into systems people can rely on. Try a command to see a simulated response.
        </p>

        <div className="sandbox-container glass-panel animate-fade-in-up delay-200" role="region" aria-label="Agent simulation terminal">
          <div className="sandbox-header">
            <div className="sandbox-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="sandbox-title">
              <Server size={14} className="icon-subtle" />
              <span>problem-solver-demo</span>
            </div>
          </div>

          <div className="sandbox-terminal" ref={scrollRef}>
            {history.map((msg) => (
              <div key={msg.id} className={`terminal-message ${msg.role}`}>
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
