import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// Tooltip and animated transitions utility (custom, no dependencies)
function Tooltip({ children, text, position = "top", visible }) {
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
 * Refined Main Container for ArtS+ with gradient accent theme.
 */
function ArtSPlusMainContainer() {
  // Section state and onboarding state
  const [activeSection, setActiveSection] = useState('lessons');
  const [onboarding, setOnboarding] = useState(() => {
    try {
      return window.localStorage.getItem('artsplus_seen_onboarding') !== 'yes';
    } catch {
      return true;
    }
  });
  const [navTooltip, setNavTooltip] = useState(null);
  const [focusIdx, setFocusIdx] = useState(-1);
  const navbarRef = useRef();
  const contentRef = useRef();

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

  useEffect(() => {
    if (focusIdx >= 0) {
      const navBtns = navbarRef.current.querySelectorAll('.artfusion-nav-btn');
      if (navBtns[focusIdx]) navBtns[focusIdx].focus();
    }
  }, [focusIdx]);
  useEffect(() => {
    if (onboarding) {
      const timer = setTimeout(() => setNavTooltip('lessons'), 800);
      return () => clearTimeout(timer);
    } else {
      setNavTooltip(null);
    }
  }, [onboarding]);
  const dismissOnboarding = () => {
    setOnboarding(false);
    setNavTooltip(null);
    try {
      window.localStorage.setItem('artsplus_seen_onboarding', 'yes');
    } catch { /* ignore */ }
  };
  const [fadeKey, setFadeKey] = useState(0);
  useEffect(() => { setFadeKey((k) => k + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeSection]);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.setAttribute('tabindex', -1);
      contentRef.current.focus();
    }
  }, [fadeKey]);

  return (
    <div className="artsplus-app" role="main">
      {/* Gradient BG always edge-to-edge */}
      <div className="artsplus-gradient-bg" aria-hidden="true"></div>

      {/* Navigation Bar */}
      <nav
        className="navbar artsplus-navbar"
        aria-label="Main navigation"
        ref={navbarRef}
        tabIndex={-1}
      >
        <div className="artsplus-navbar-inner">
          <div
            className="logo artsplus-logo"
            role="heading"
            aria-level={1}
            tabIndex={0}
          >
            <span
              className="logo-symbol"
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '1.32em',
                lineHeight: '1.1',
                marginRight: 1,
              }}
            >
              <svg
                width="34"
                height="27"
                viewBox="0 0 44 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  display: 'block',
                  verticalAlign: 'middle',
                  marginRight: 2,
                  filter: 'drop-shadow(0 0 1px #0008)'
                }}
                aria-hidden="true"
              >
                <path
                  d="M23,2
                  C34,2 42,9.5 42,17.2
                  C42,23.5 35,32 25,32
                  C19,32 14.9,29.7 15.8,27.1
                  C17.2,23.1 22.8,27 22.6,23.1
                  C22.5,19.8 17.4,21.1 13.6,20
                  C8,18.5 2.4,12.9 2,8
                  C1.2,3.3 11.4,2 23,2
                  Z"
                  fill="#D2B48C"
                  stroke="#654321"
                  strokeWidth="2.2"
                  opacity="0.98"
                />
                <ellipse
                  cx="36.3"
                  cy="23.6"
                  rx="3.3"
                  ry="2.18"
                  fill="#3d2416"
                  opacity="0.80"
                />
                <ellipse cx="14.2" cy="8.9" rx="2" ry="1.33" fill="#FFEB3B" stroke="#fffde7" strokeWidth="0.32"/>
                <ellipse cx="20.8" cy="6.8" rx="1.6" ry="1.05" fill="#2196F3" stroke="#bbdeff" strokeWidth="0.24"/>
                <ellipse cx="11.4" cy="13.8" rx="1.56" ry="1.0" fill="#FF4081" stroke="#ffdcef" strokeWidth="0.24"/>
                <ellipse cx="27.2" cy="10.6" rx="1.45" ry="1.01" fill="#3DDC97" stroke="#e5fff3" strokeWidth="0.18"/>
                {/* Gradient accent below */}
                <ellipse cx="31.2" cy="17.9" rx="1.3" ry="0.91" fill="#A259FF" stroke="#e5d5fd" strokeWidth="0.18"/>
                <ellipse
                  cx="22.5"
                  cy="4.6"
                  rx="4.5"
                  ry="1.1"
                  fill="#fff"
                  opacity="0.13"
                  transform="rotate(-14 22.5 4.6)"
                />
              </svg>
            </span>
            ArtS+
          </div>
          <div className="artsplus-navlinks" role="tablist" aria-label="Main Sections">
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
                    outline: activeSection === section.key ? '2px solid transparent' : undefined,
                    outlineOffset: 2,
                    position: "relative",
                    transition: "outline 0.18s, box-shadow 0.2s",
                    background: "none",
                    boxShadow: "none"
                  }}
                  id={`navbtn-${section.key}`}
                  data-feature={section.key}
                >
                  <span aria-hidden="true" style={{ marginRight: 6 }}>
                    {section.icon}
                  </span>
                  <span className="artfusion-nav-tab-label">{section.label}</span>
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
                      background: "linear-gradient(90deg, #FF70A6, #A259FF, #56CCF2)",
                      borderRadius: 2,
                      opacity: 0.92,
                      boxShadow: "0 2px 8px 0 #A259FF",
                      transition: "opacity 0.24s",
                    }}
                  ></span>
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
        {onboarding && (
          <div
            className="artsplus-onboarding-nudge"
            style={{
              position: 'absolute',
              left: '50%',
              top: 70,
              transform: 'translateX(-50%)',
              zIndex: 200,
              background: 'linear-gradient(90deg, #FF70A6, #A259FF, #56CCF2)',
              color: '#fff',
              padding: '9px 22px',
              borderRadius: 18,
              fontWeight: 600,
              fontSize: '1.13rem',
              boxShadow: '0 4px 18px 0 rgba(162,89,255,0.16)',
              cursor: "pointer",
              animation: "artsplus-fade-up-in 0.9s cubic-bezier(.35,1.11,.54,.99)",
              backgroundClip: "padding-box"
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
            Welcome to ArtS+! Tap the tabs above to begin your creative journey. <span aria-hidden="true" style={{marginLeft: 10}}>✨</span>
            <span style={{ marginLeft: 16, textDecoration: "underline", fontWeight: 500, cursor: "pointer" }}>Dismiss</span>
          </div>
        )}
      </nav>

      {/* Main content flex & fill */}
      <div className="artsplus-main-flex" style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          background: "none"
      }}>
        <main
          className="artsplus-main"
          ref={contentRef}
          style={{
            animation: "artsplus-fade-in 0.65s cubic-bezier(.36,1.17,.53,1.1) both",
            flex: 1,
            width: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "none"
          }}
          aria-live="polite"
          tabIndex={-1}
          key={fadeKey}
        >
          {activeSection === 'lessons' && <InteractiveLessonsSection />}
          {activeSection === 'assistant' && <AIArtAssistantSection />}
          {activeSection === 'gallery' && <UserGallerySection />}
          {activeSection === 'resources' && <ResourceLibrarySection />}
        </main>
      </div>
      
      <footer className="artsplus-footer" tabIndex={0}>
        <span>
          ArtS+ &copy; {new Date().getFullYear()} &ndash;
          <span
            style={{
              background: "linear-gradient(90deg, #FF70A6, #A259FF, #56CCF2)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700
            }}
          >
            Unleash Your Inner Artist
          </span>
        </span>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * InteractiveLessonsSection: Art lessons section with accent gradient
 */
function InteractiveLessonsSection() {
  const lessonTitles = [
    "Beginner: Sketching Basics",
    "Beginner: Shapes & Forms",
    "Beginner: Simple Shading",
    "Beginner: Still Life Setup",
    "Novice: Color Introduction",
    "Novice: Blending Techniques",
    "Novice: Drawing Faces",
    "Novice: Simple Landscapes",
    "Intermediate: Figure Drawing",
    "Intermediate: Perspective",
    "Intermediate: Composition",
    "Intermediate: Lighting & Shadows",
    "Advanced: Dynamic Poses",
    "Advanced: Digital Painting",
    "Advanced: Mixed Media",
    "Advanced: Creative Masterclass"
  ];
  const lessonLevels = [
    "Beginner", "Beginner", "Beginner", "Beginner",
    "Novice", "Novice", "Novice", "Novice",
    "Intermediate", "Intermediate", "Intermediate", "Intermediate",
    "Advanced", "Advanced", "Advanced", "Advanced"
  ];
  // Descriptions: keep it concise and relevant to lesson level and focus
  const lessonDescriptions = [
    "Beginner: Learn the basics of sketching lines, curves, and proportions.",
    "Beginner: Master simple shapes and forms as building blocks for art.",
    "Beginner: Explore basic shading techniques for depth and contrast.",
    "Beginner: Set up and sketch a simple still life composition.",
    "Novice: Introduction to color theory and using color in your art.",
    "Novice: Practice blending colors and making soft transitions.",
    "Novice: Step-by-step to drawing expressive faces and features.",
    "Novice: Create simple landscapes with perspective and layers.",
    "Intermediate: Figure drawing fundamentals, gesture and anatomy.",
    "Intermediate: Study the rules of perspective for realistic scenes.",
    "Intermediate: Compose stronger artworks through layout planning.",
    "Intermediate: Use light and shadows to add mood and realism.",
    "Advanced: Draw dynamic poses with energy and motion.",
    "Advanced: Digital painting workflows and advanced techniques.",
    "Advanced: Combine different media for creative expression.",
    "Advanced: Take your skills to the next level in a creative masterclass."
  ];
  const videoUrls = Array(16).fill("https://www.w3schools.com/html/mov_bbb.mp4");

  return (
    <section className="artfusion-section artfusion-lessons" aria-labelledby="lessons-heading">
      <h2 id="lessons-heading" className="visually-hidden">Interactive Art Lessons</h2>
      <header style={{ marginBottom: 12, display: "flex", gap: 14, alignItems: "center" }}>
        <span
          role="img"
          aria-label="Palette"
          style={{ fontSize: "1.7em" }}
        >🎨</span>
        <span className="artsplus-section-title">
          Interactive Art Lessons
        </span>
      </header>
      <p>
        16 immersive, hour-long lesson videos.<br />
        <strong>Unlock your creative potential</strong> by following in-depth tutorials—accessible to all skill levels.
      </p>
      <div
        className="artfusion-lessons-videogrid"
        aria-label="Lesson Videos"
        role="region"
        tabIndex={0}
      >
        {videoUrls.map((url, idx) => (
          <div className="artfusion-lesson-videocell" key={idx}>
            <div className="artfusion-lesson-video-wrapper">
              <video
                src={url}
                controls
                preload="metadata"
                poster={`https://placehold.co/480x270/222/fff?text=Art+Lesson+${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "12px",
                  background: "none",
                  border: "none",
                  boxShadow: "none",
                  outline: "none"
                }}
                aria-label={`Art Lesson Video ${idx + 1}: ${lessonTitles[idx]}`}
                tabIndex={0}
              />
            </div>
            {/* Lesson title and description now beneath video */}
            <div
              className={`artfusion-lesson-videolabel artfusion-lesson-level-${lessonLevels[idx].toLowerCase()}`}
              style={{ flexDirection: "column", alignItems: "flex-start", gap: 2, padding: 0, background: "none", boxShadow: "none" }}
            >
              <span className="lesson-title-text">{lessonTitles[idx]}</span>
              <span className="lesson-label-meta">
                | {lessonLevels[idx]}
                <span className="lesson-duration-meta">| Duration: 1 hr</span>
              </span>
              {/* Description block, visually separated below title & meta */}
              <span className="lesson-desc-text">{lessonDescriptions[idx]}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * AI Art Assistant Section: Accent gradient for headers and button.
 */
function AIArtAssistantSection() {
  const [messages, setMessages] = React.useState([
    { role: "ai", text: "Hi! Ask me anything about art or your creative process 🚀" }
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef();

  function getSimulatedAIResponse(userMessage) {
    const normalized = userMessage.trim().toLowerCase();
    if (normalized.match(/color|depth/gi)) {
      return "Try layering cooler and warmer tones, and use contrast or atmospheric perspective for depth!";
    }
    if (normalized.match(/inspiration|ideas/gi)) {
      return "Browse artwork, experiment with themes, or remix a classic painting to spark ideas!";
    }
    if (normalized.match(/improve|skill|how/i)) {
      return "Practice daily sketches, study anatomy, and seek critique from fellow artists.";
    }
    if (normalized.match(/hello|hi|hey/i)) {
      return "Hello! What would you like to talk about in art today?";
    }
    return "That's a great question! Try to break it down: Start with composition, then detail, and always trust your creative instincts.";
  }

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { role: "user", text: trimmed }]);
    setIsLoading(true);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: getSimulatedAIResponse(trimmed) }
      ]);
      setIsLoading(false);
    }, 900 + Math.floor(Math.random() * 700));
  };

  React.useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);
  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend(e);
    }
  };
  const chatRef = React.useRef();
  React.useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <section
      className="artfusion-section artfusion-ai-assistant"
      aria-labelledby="ai-assistant-heading"
      style={{ minHeight: 333, display: "flex", flexDirection: "column", justifyContent: "flex-start"}}
    >
      <h2 id="ai-assistant-heading" className="visually-hidden">AI Art Assistant</h2>
      <header style={{ marginBottom: 10, display: "flex", gap: 14, alignItems: "center" }}>
        <span role="img" aria-label="Robot" style={{ fontSize: "1.4em" }}>🤖</span>
        <span className="artsplus-section-title">AI Art Assistant</span>
      </header>
      <p>
        Chat with our AI for instant artistic feedback, spark new ideas,
        and get creative <b>tips</b>.
      </p>
      <div
        className="artfusion-ai-widget"
        aria-label="AI chat"
        role="region"
        style={{ marginBottom: 8, background: "none", boxShadow: "none" }}
      >
        <div
          className="artfusion-ai-chat"
          style={{ marginBottom: "0.3em", minHeight: 112, maxHeight: 192, overflowY: "auto" }}
          ref={chatRef}
        >
          {messages.map((msg, idx) =>
            <AssistantBubble
              key={idx}
              inout={msg.role === "user" ? "out" : "in"}
              text={msg.text}
            />
          )}
          {isLoading && (
            <AssistantBubble inout="in" text={<span><span className="visually-hidden">AI is writing...</span><span aria-hidden="true">…</span></span>} />
          )}
        </div>
        <form
          onSubmit={handleSend}
          style={{ display: "flex", gap: 4, alignItems: "flex-end" }}
          aria-label="Ask the AI Assistant"
        >
          <input
            ref={inputRef}
            className="artfusion-ai-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your art question or 'upload artwork' for feedback…"
            aria-label="Type your art-related question"
            autoComplete="off"
            disabled={isLoading}
            style={{ flex: 1, marginBottom: 0, background: "none", boxShadow: "none"}}
          />
          <button
            className="btn"
            style={{
              minWidth: 77,
              marginLeft: 6,
              background: "linear-gradient(90deg, #FF70A6, #A259FF, #56CCF2)",
              color: "#fff",
              borderRadius: 7,
              opacity: input.length ? 0.90 : 0.53,
              fontWeight: 600,
              transition: "opacity 0.16s",
              border: "none",
              boxShadow: "none"
            }}
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send question"
          >Send</button>
        </form>
      </div>
      <div className="artfusion-ai-note" style={{ marginTop: 4 }}>
        <em>
          Note: <b>AI answers are simulated for demo.</b>
          {" "}
          <span style={{
            background: "linear-gradient(90deg, #FF70A6, #A259FF, #56CCF2)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 600
          }}>Live AI integration coming soon.</span>
        </em>
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
        <span className="artsplus-section-title">User Gallery</span>
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
        <GalleryCard username="artist_rose" imgSrc="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80" title="Blossom" />
        <GalleryCard username="sketchy_jay" imgSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=facearea&w=400&q=80" title="Urban Improv" />
        <GalleryCard username="colorcarefree" imgSrc="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&q=80" title="Chromatic" />
      </div>
      <div className="artfusion-upload-hint">
        <button className="btn btn-large" style={{
          background: "linear-gradient(90deg, #FF70A6, #A259FF, #56CCF2)",
          opacity: 0.89,
          color: "#fff",
          border: "none",
          boxShadow: "none"
        }} disabled>
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
        <span className="artsplus-section-title">Resource Library</span>
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
        borderLeft: "none",
        background: "none",
        boxShadow: "none",
        minHeight: 152,
        marginTop: 6,
        backgroundImage: "none",
        borderImage: "none"
      }}
    >
      <div className="lesson-title" style={{ marginBottom: 2 }}>{title}</div>
      <span
        className="lesson-level"
        style={{
          fontSize: "1.03rem",
          background: "linear-gradient(90deg, #FF70A6, #A259FF, #56CCF2)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent"
        }}
      >{level}</span>
      <div style={{
        color: "var(--text-secondary)",
        fontSize: "0.98rem",
        marginBottom: 11,
        marginTop: 7,
      }}>{desc}</div>
      <button className="btn btn-small" disabled
        style={{
          background: "linear-gradient(90deg, #FF70A6, #A259FF, #56CCF2)",
          color: "#fff",
          marginTop: "auto",
          opacity: 0.93,
          boxShadow: "none",
          border: "none"
        }}>Start</button>
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
        boxShadow: "none",
        background: "none",
        border: "none"
      }}
    >
      <div className="gallery-img"
        style={{
          backgroundImage: `url(${imgSrc})`,
          borderBottom: "none",
          minHeight: 145,
          boxShadow: "none",
          background: "none",
          border: "none"
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
        background: "none",
        boxShadow: "none",
        border: "none"
      }}
    >
      {text}
    </div>
  );
}

export default ArtSPlusMainContainer;
