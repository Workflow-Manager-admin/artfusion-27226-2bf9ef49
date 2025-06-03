import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function ArtFusionMainContainer() {
  // For tab switching
  const [activeSection, setActiveSection] = useState('lessons');
  const navbarRef = useRef();

  // For focus indicator on nav
  const navSections = [
    { key: 'lessons', label: 'Lessons', icon: '🎨', aria: 'Interactive Art Lessons' },
    { key: 'assistant', label: 'AI Assistant', icon: '🤖', aria: 'AI Art Assistant' },
    { key: 'gallery', label: 'Gallery', icon: '🖼️', aria: 'User Gallery' },
    { key: 'resources', label: 'Resources', icon: '📚', aria: 'Resource Library' },
  ];

  // Keyboard navigation for accessibility & arrow keys
  const handleNavKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight') {
      setActiveSection(navSections[(idx + 1) % navSections.length].key);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      setActiveSection(navSections[(idx - 1 + navSections.length) % navSections.length].key);
      e.preventDefault();
    }
  };

  // Auto scroll to top on section change (good for mobile UX)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeSection]);

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
            <span className="logo-symbol" style={{ color: 'var(--accent)', fontSize: '1.4em' }} aria-hidden="true">*</span>
            ArtFusion
          </div>
          <div className="artfusion-navlinks" role="tablist" aria-label="Main Sections">
            {navSections.map((section, i) => (
              <button
                key={section.key}
                className={`artfusion-nav-btn${activeSection === section.key ? ' active' : ''}`}
                aria-current={activeSection === section.key ? 'page' : undefined}
                aria-label={section.aria}
                tabIndex={0}
                role="tab"
                onClick={() => setActiveSection(section.key)}
                onKeyDown={e => handleNavKeyDown(e, i)}
                style={{
                  outline: activeSection === section.key ? '2px solid var(--accent)' : undefined,
                  outlineOffset: 2,
                }}
              >
                <span aria-hidden="true" style={{ marginRight: 6 }}>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Ombre Gradient Background Layer */}
      <div className="artfusion-gradient-bg" aria-hidden="true"></div>

      {/* Main Content */}
      <main className="artfusion-main container">
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
