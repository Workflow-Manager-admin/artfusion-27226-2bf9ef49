import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// Tooltip and animated transitions utility (custom, no dependencies)
function Tooltip({ children, text, position = "top", visible }) {
  // Lightweight tooltip, for accessibility/onboarding. See usage in nav and discoverability.
  return (
    <span className="artfusion-tooltip-wrapper" style={{ position: "relative", display: "inline-flex" }}>
      {children}
      <span
        role="tooltip"
        aria-hidden={!visible}
        className={`artfusion-tooltip${visible ? " visible" : ""} artfusion-tooltip-${position}`}
        style={{
          position: "absolute",
          [position === "top" ? "bottom" : "top"]: "110%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 104,
          whiteSpace: "nowrap",
          minWidth: 90,
        }}
      >
        {text}
      </span>
    </span>
  );
}

/**
 * PUBLIC_INTERFACE
 * Refined Main Container for ArtFusion:
 * - Animations (fade, slide-in, border accent hover/entry)
 * - ARIA improvements, focus trap for nav, more keyboard support
 * - Tooltips for nav (onboarding + always-on)
 * - Onboarding hint at first session
 * - Discoverability: assistant/lessons nudge
 */
function ArtFusionMainContainer() {
  // For tab switching & onboarding state
  const [activeSection, setActiveSection] = useState('lessons');
  const [onboarding, setOnboarding] = useState(() => {
    try {
      return window.localStorage.getItem('artfusion_seen_onboarding') !== 'yes';
    } catch {
      return true;
    }
  });
  const [navTooltip, setNavTooltip] = useState(null);
  const [focusIdx, setFocusIdx] = useState(-1); // for keyboard nav highlighting
  const navbarRef = useRef();
  const contentRef = useRef();

  // For ARIA & accessibility
  const navSections = [
    { key: 'lessons', label: 'Lessons', icon: '🎨', aria: 'Interactive Art Lessons', onboarding: 'Explore interactive tutorials & skills!' },
    { key: 'assistant', label: 'AI Assistant', icon: '🤖', aria: 'AI Art Assistant', onboarding: 'Ask for help, tips, or critiques.' },
    { key: 'gallery', label: 'Gallery', icon: '🖼️', aria: 'User Gallery', onboarding: 'See & share artwork from the community.' },
    { key: 'resources', label: 'Resources', icon: '📚', aria: 'Resource Library', onboarding: 'Find curated art references.' },
  ];

  // Keyboard navigation for nav tab bar.
  const handleNavKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % navSections.length;
      setActiveSection(navSections[next].key);
      setFocusIdx(next);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + navSections.length) % navSections.length;
      setActiveSection(navSections[prev].key);
      setFocusIdx(prev);
      e.preventDefault();
    } else if ([' ', 'Enter'].includes(e.key)) {
      setActiveSection(navSections[idx].key);
      e.preventDefault();
    }
  };

  // Trap focus on nav if tabbing from menu for accessibility
  useEffect(() => {
    if (focusIdx >= 0) {
      const navBtns = navbarRef.current.querySelectorAll('.artfusion-nav-btn');
      if (navBtns[focusIdx]) navBtns[focusIdx].focus();
    }
  }, [focusIdx]);

  // Onboarding state; after a short delay, show slight onboarding tooltip pointer
  useEffect(() => {
    if (onboarding) {
      const timer = setTimeout(() => setNavTooltip('lessons'), 800);
      return () => clearTimeout(timer);
    } else {
      setNavTooltip(null);
    }
  }, [onboarding]);

  // After initial onboarding, mark as seen & stop showing onboarding nudge
  const dismissOnboarding = () => {
    setOnboarding(false);
    setNavTooltip(null);
    try {
      window.localStorage.setItem('artfusion_seen_onboarding', 'yes');
    } catch { /* ignore */ }
  };

  // Fade/slide animation on section change
  const [fadeKey, setFadeKey] = useState(0);
  useEffect(() => { setFadeKey((k) => k + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeSection]);
  // for ARIA
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.setAttribute('tabindex', -1);
      contentRef.current.focus();
    }
  }, [fadeKey]);

  return (
    <div className="artfusion-app" role="main">
      {/* Navigation Bar */}
      <nav
        className="navbar artfusion-navbar"
        aria-label="Main navigation"
        ref={navbarRef}
        tabIndex={-1}
      >
        <div className="artfusion-navbar-inner container">
          <div className="logo artfusion-logo" role="heading" aria-level={1} tabIndex={0}>
            <span className="logo-symbol" style={{ color: 'var(--accent)', fontSize: '1.1em', lineHeight: '1.1' }} aria-hidden="true">*</span>
            ArtFusion
          </div>
          <div className="artfusion-navlinks" role="tablist" aria-label="Main Sections">
            {navSections.map((section, i) => (
              <Tooltip
                key={section.key}
                text={
                  navTooltip === section.key
                    ? section.onboarding
                    : section.key === "assistant"
                      ? "Try the AI Art Assistant!" : undefined
                }
                visible={!!navTooltip && navTooltip === section.key}
                position="bottom"
              >
                <button
                  className={`artfusion-nav-btn${activeSection === section.key ? ' active' : ''}`}
                  aria-current={activeSection === section.key ? 'page' : undefined}
                  aria-label={section.aria}
                  aria-describedby={navTooltip === section.key ? `tooltip-${section.key}` : undefined}
                  tabIndex={i === focusIdx ? 0 : 0}
                  role="tab"
                  onClick={() => {
                    setActiveSection(section.key);
                    if (onboarding) dismissOnboarding();
                  }}
                  onKeyDown={e => handleNavKeyDown(e, i)}
                  onMouseEnter={() => setNavTooltip(section.key)}
                  onMouseLeave={() => setNavTooltip(null)}
                  style={{
                    outline: activeSection === section.key ? '2px solid var(--accent)' : undefined,
                    outlineOffset: 2,
                    position: "relative",
                    transition: "outline 0.18s, box-shadow 0.2s",
                  }}
                  id={`navbtn-${section.key}`}
                  data-feature={section.key}
                >
                  <span aria-hidden="true" style={{ marginRight: 6 }}>
                    {section.icon}
                  </span>
                  <span>{section.label}</span>
                  {/* Animated accent border */}
                  <span
                    className="artfusion-animated-accent"
                    aria-hidden="true"
                    style={{
                      display: activeSection === section.key ? "block" : "none",
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: -3,
                      height: 3,
                      background: "linear-gradient(90deg, var(--accent) 60%, transparent 100%)",
                      borderRadius: 2,
                      opacity: 0.88,
                      boxShadow: "0 2px 8px 0 var(--accent)",
                      transition: "opacity 0.24s",
                    }}
                  ></span>
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
        {/* Contextual onboarding nudge (for first-time users) */}
        {onboarding && (
          <div
            className="artfusion-onboarding-nudge"
            style={{
              position: 'absolute',
              left: '50%',
              top: 70,
              transform: 'translateX(-50%)',
              zIndex: 200,
              background: 'var(--accent)',
              color: '#fff',
              padding: '9px 22px',
              borderRadius: 18,
              fontWeight: 600,
              fontSize: '1.13rem',
              boxShadow: '0 4px 18px 0 rgba(255,111,97,0.12)',
              cursor: "pointer",
              animation: "artfusion-fade-up-in 0.9s cubic-bezier(.35,1.11,.54,.99)",
            }}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Quick start help"
            onClick={dismissOnboarding}
            onKeyDown={e => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                dismissOnboarding();
              }
            }}
          >
            Welcome to ArtFusion! Tap the tabs above to begin your creative journey. <span aria-hidden="true" style={{marginLeft: 10}}>✨</span>
            <span style={{ marginLeft: 16, textDecoration: "underline", fontWeight: 500, cursor: "pointer" }}>Dismiss</span>
          </div>
        )}
      </nav>

      {/* Ombre Gradient Background Layer */}
      <div className="artfusion-gradient-bg" aria-hidden="true"></div>

      {/* Main Content with subtle fade-in */}
      <main
        className="artfusion-main container"
        ref={contentRef}
        style={{ animation: "artfusion-fade-in 0.65s cubic-bezier(.36,1.17,.53,1.1) both" }}
        aria-live="polite"
        tabIndex={-1}
        key={fadeKey}
      >
        {activeSection === 'lessons' && <InteractiveLessonsSection />}
        {activeSection === 'assistant' && <AIArtAssistantSection />}
        {activeSection === 'gallery' && <UserGallerySection />}
        {activeSection === 'resources' && <ResourceLibrarySection />}
      </main>

      {/* Footer */}
      <footer className="artfusion-footer" tabIndex={0}>
        <span>
          ArtFusion &copy; {new Date().getFullYear()} &ndash; <span style={{color: "var(--accent)"}}>Unleash Your Inner Artist</span>
        </span>
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function InteractiveLessonsSection() {
  return (
    <section className="artfusion-section artfusion-lessons" aria-labelledby="lessons-heading">
      <h2 id="lessons-heading" className="visually-hidden">Interactive Art Lessons</h2>
      <header style={{ marginBottom: 12, display: "flex", gap: 14, alignItems: "center" }}>
        <span
          role="img"
          aria-label="Palette"
          style={{ fontSize: "1.7em" }}
        >🎨</span>
        <span style={{
          color: "var(--accent)",
          fontSize: "2.1rem",
          fontWeight: 800,
          letterSpacing: 1
        }}>
          Interactive Art Lessons
        </span>
      </header>
      <p>
        Step-by-step art tutorials and lessons for&nbsp;
        <b>every skill level</b>.<br />
        Try <strong>sketching</strong>, <strong>painting</strong>, or exploring <strong>digital art</strong> – new lessons weekly!
      </p>
      <div
        className="artfusion-lessons-grid"
        style={{ justifyContent: "center" }}
        aria-label="Lesson topics"
        role="region"
      >
        {/* Accessible Demo Lesson Cards */}
        <LessonCard
          title="Intro to Digital Sketching"
          level="Beginner"
          color="#FF6F61"
          desc="Basic tools, structure, and line confidence."
        />
        <LessonCard
          title="Shading & Light Techniques"
          level="Intermediate"
          color="#FFBB00"
          desc="Learn shadows, blending, and form illumination."
        />
        <LessonCard
          title="Dynamic Color Composition"
          level="Advanced"
          color="#66F1FF"
          desc="Master palette choice and dramatic scenes."
        />
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function AIArtAssistantSection() {
  return (
    <section className="artfusion-section artfusion-ai-assistant" aria-labelledby="ai-assistant-heading">
      <h2 id="ai-assistant-heading" className="visually-hidden">AI Art Assistant</h2>
      <header style={{ marginBottom: 10, display: "flex", gap: 14, alignItems: "center" }}>
        <span role="img" aria-label="Robot" style={{ fontSize: "1.4em" }}>🤖</span>
        <span style={{
          color: "var(--accent)",
          fontSize: "2.1rem",
          fontWeight: 800
        }}>AI Art Assistant</span>
      </header>
      <p>
        Chat with our AI for instant artistic feedback, spark new ideas,
        and get creative <b>tips</b>. <span style={{ color: "var(--base-light)" }}>Coming soon!</span>
      </p>
      <div className="artfusion-ai-widget" aria-label="Demo AI chat" role="region">
        <div className="artfusion-ai-chat" style={{ marginBottom: "0.3em" }}>
          <AssistantBubble inout="in" text="Hi! Ask me anything about art or your creative process 🚀" />
          <AssistantBubble inout="out" text="How can I create depth with color?" />
          <AssistantBubble inout="in" text="Try layering cooler and warmer tones to build dimensionality!" />
        </div>
        <input
          className="artfusion-ai-input"
          type="text"
          placeholder="Type your question or upload your artwork for feedback..."
          disabled
          aria-label="AI art assistant entry (demo only, disabled)"
        />
      </div>
      <div className="artfusion-ai-note">
        <em>Note: <b>Demo chat UI only</b>. <span style={{ color: "var(--accent)" }}>Full AI coming soon.</span></em>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function UserGallerySection() {
  return (
    <section className="artfusion-section artfusion-gallery" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="visually-hidden">User Gallery</h2>
      <header style={{ marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
        <span role="img" aria-label="Gallery" style={{ fontSize: "1.4em" }}>🖼️</span>
        <span style={{
          color: "var(--accent)",
          fontSize: "2.1rem",
          fontWeight: 800
        }}>User Gallery</span>
      </header>
      <p>
        Upload and showcase your <b>artwork</b>! Browse, like, and comment on other artists' creations.
      </p>
      <div
        className="artfusion-gallery-grid"
        style={{ justifyContent: "left", marginBottom: 10 }}
        aria-label="User artwork"
        role="list"
      >
        {/* Demo artwork cards */}
        <GalleryCard username="artist_rose" imgSrc="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80" title="Blossom" />
        <GalleryCard username="sketchy_jay" imgSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=facearea&w=400&q=80" title="Urban Improv" />
        <GalleryCard username="colorcarefree" imgSrc="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&q=80" title="Chromatic" />
      </div>
      <div className="artfusion-upload-hint">
        <button className="btn btn-large" style={{ background: "var(--accent)", opacity: 0.85 }} disabled>
          Upload Artwork (Demo)
        </button>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function ResourceLibrarySection() {
  return (
    <section className="artfusion-section artfusion-resources" aria-labelledby="resources-heading">
      <h2 id="resources-heading" className="visually-hidden">Resource Library</h2>
      <header style={{ marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
        <span role="img" aria-label="Books" style={{ fontSize: "1.35em" }}>📚</span>
        <span style={{
          color: "var(--accent)",
          fontSize: "2.1rem",
          fontWeight: 800
        }}>Resource Library</span>
      </header>
      <p>
        Curated <b>art resources</b>, references, and downloadable materials to support your artistic journey.
      </p>
      <ul className="artfusion-resource-list" role="list">
        <li>
          <a href="https://www.artstation.com/learning" target="_blank" rel="noopener noreferrer">
            ArtStation Learning <span className="resource-chip">Video</span>
          </a>
        </li>
        <li>
          <a href="https://www.pixiv.net/en/artworks" target="_blank" rel="noopener noreferrer">
            Pixiv Artworks <span className="resource-chip">Gallery</span>
          </a>
        </li>
        <li>
          <a href="https://thevirtualinstructor.com/" target="_blank" rel="noopener noreferrer">
            The Virtual Instructor <span className="resource-chip">Tutorial</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

// --- Demo Subcomponents ---

function LessonCard({ title, level, color, desc }) {
  return (
    <article
      className="artfusion-lesson-card"
      tabIndex={0}
      aria-label={`${title}, ${level} level`}
      style={{
        borderLeft: `6px solid ${color}`,
        background: "rgba(32,36,50,0.88)",
        boxShadow: "0 3px 14px 0 rgba(25,35,45,0.13)",
        minHeight: 152,
        marginTop: 6
      }}
    >
      <div className="lesson-title" style={{ marginBottom: 2 }}>{title}</div>
      <span className="lesson-level" style={{ fontSize: "1.03rem" }}>{level}</span>
      <div style={{
        color: "var(--text-secondary)",
        fontSize: "0.98rem",
        marginBottom: 11,
        marginTop: 7,
      }}>{desc}</div>
      <button className="btn btn-small" disabled style={{ background: color, color: "#fff", marginTop: "auto", opacity: 0.9 }}>Start</button>
    </article>
  );
}

function GalleryCard({ username, imgSrc, title }) {
  return (
    <article
      className="artfusion-gallery-card"
      tabIndex={0}
      aria-label={`Artwork: ${title} by @${username}`}
      style={{
        boxShadow: "0 2px 13px 0 rgba(30,31,50,0.11)",
        background: "rgba(33,37,48,0.95)"
      }}
    >
      <div className="gallery-img"
        style={{
          backgroundImage: `url(${imgSrc})`,
          borderBottom: "1px solid var(--border-color)",
          minHeight: 145
        }}
        aria-hidden="true"
      ></div>
      <div className="gallery-info">
        <div style={{ fontWeight: 600, fontSize: "1.09rem", marginBottom: 3 }}>{title}</div>
        <small>by <b>@{username}</b></small>
      </div>
    </article>
  );
}

// AI Assistant message bubble with direction and accessibility
function AssistantBubble({ inout, text }) {
  return (
    <div
      className={
        "artfusion-ai-bubble artfusion-ai-bubble-" + (inout === "out" ? "out" : "in")
      }
      role="status"
      aria-live="polite"
      tabIndex={0}
      style={{
        fontWeight: inout === "in" ? 500 : 400,
        fontStyle: inout === "in" ? "normal" : "italic",
      }}
    >
      {text}
    </div>
  );
}

export default ArtFusionMainContainer;
