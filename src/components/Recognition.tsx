import React from 'react';
import recognitionData from '../data/recognition.json';
import { Award } from 'lucide-react';

type AwardItem = {
  title: string;
  description: string;
  date?: string;
  issuer?: string;
};

type CertificationItem = {
  name: string;
  issuer: string;
  description?: string;
  date?: string | null;
  url?: string | null;
};

type RecognitionData = {
  awards?: AwardItem[];
  certifications?: CertificationItem[];
};

const data = recognitionData as RecognitionData;
const awards = data.awards ?? [];
const certifications = data.certifications ?? [];

const Recognition: React.FC = () => {
  const hasAwards = awards.length > 0;
  const hasCerts = certifications.length > 0;
  if (!hasAwards && !hasCerts) {
    return null;
  }

  return (
    <section id="recognition" className="section-padding recognition-section" aria-labelledby="recognition-heading">
      <div className="container">
        <div className="scroll-reveal">
          <span className="section-label animate-fade-in-up">Recognition</span>
          <div className="section-header animate-fade-in-up delay-100">
            <Award className="section-icon" size={32} aria-hidden />
            <h2 id="recognition-heading">Awards &amp; certifications</h2>
          </div>
        </div>

        {hasAwards && (
          <div className="recognition-block">
            <h3 className="recognition-block-title">Awards &amp; recognition</h3>
            <div className="recognition-list">
              {awards.map((item, idx) => (
                <article
                  key={`award-${item.title}-${idx}`}
                  className="recognition-item scroll-reveal animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="recognition-item-content">
                    <h4 className="recognition-title">{item.title}</h4>
                    {(item.issuer || item.date) && (
                      <p className="recognition-meta">
                        {[item.issuer, item.date].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <p className="recognition-desc">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {hasCerts && (
          <div className="recognition-block certifications-block">
            <h3 className="recognition-block-title">Certifications</h3>
            <div className="certifications-list">
              {certifications.map((cert, idx) => (
                <article
                  key={`cert-${cert.name}-${idx}`}
                  className="certification-item scroll-reveal animate-fade-in-up"
                  style={{ animationDelay: `${(hasAwards ? awards.length * 80 : 0) + idx * 60}ms` }}
                >
                  <div className="certification-item-content">
                    <h4 className="certification-name">{cert.name}</h4>
                    <p className="certification-issuer">{cert.issuer}</p>
                    {cert.description && (
                      <p className="certification-desc">{cert.description}</p>
                    )}
                    {(cert.date || cert.url) && (
                      <p className="certification-meta">
                        {cert.date}
                        {cert.url && (
                          <>
                            {cert.date && ' · '}
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="certification-link">
                              Verify credential
                            </a>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recognition;
