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
    <section className="artfusion-section artfusion-lessons">
      <h2>
        <span role="img" aria-label="Palette">🎨</span> Interactive Art Lessons
      </h2>
      <p>
        Step-by-step art tutorials and lessons for all skill levels.<br />
        Try sketching, painting, or exploring digital art!
      </p>
      <div className="artfusion-lessons-grid">
        {/* Placeholder Cards */}
        <LessonCard
          title="Introduction to Digital Sketching"
          level="Beginner"
          color="#FF6F61"
        />
        <LessonCard
          title="Shading and Light Techniques"
          level="Intermediate"
          color="#FFBB00"
        />
        <LessonCard
          title="Dynamic Color Composition"
          level="Advanced"
          color="#66F1FF"
        />
      </div>
    </section>
  )
}

// PUBLIC_INTERFACE
function AIArtAssistantSection() {
  return (
    <section className="artfusion-section artfusion-ai-assistant">
      <h2>
        <span role="img" aria-label="Robot">🤖</span> AI Art Assistant
      </h2>
      <p>
        Chat with our AI to get real-time artistic feedback, inspiration, or quick tips.
      </p>
      <div className="artfusion-ai-widget">
        {/* Placeholder Chat UI */}
        <div className="artfusion-ai-chat">
          <div className="artfusion-ai-bubble artfusion-ai-bubble-in">Hi! Ask me anything about art or your creative process 🚀</div>
          <div className="artfusion-ai-bubble artfusion-ai-bubble-out">How can I create depth with color?</div>
          <div className="artfusion-ai-bubble artfusion-ai-bubble-in">Try layering cooler and warmer tones to build dimensionality!</div>
        </div>
        <input
          className="artfusion-ai-input"
          type="text"
          placeholder="Type your question or upload your artwork for feedback..."
          disabled
        />
      </div>
      <div className="artfusion-ai-note">
        <em>Note: Demo chat UI only. Full AI integration coming soon.</em>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function UserGallerySection() {
  return (
    <section className="artfusion-section artfusion-gallery">
      <h2>
        <span role="img" aria-label="Gallery">🖼️</span> User Gallery
      </h2>
      <p>
        Upload and showcase your artwork! Browse, like, and comment on other artists' creations.
      </p>
      <div className="artfusion-gallery-grid">
        {/* Demo artwork cards */}
        <GalleryCard username="artist_rose" imgSrc="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80" title="Blossom" />
        <GalleryCard username="sketchy_jay" imgSrc="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=facearea&w=400&q=80" title="Urban Improv" />
        <GalleryCard username="colorcarefree" imgSrc="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&q=80" title="Chromatic" />
      </div>
      <div className="artfusion-upload-hint">
        <button className="btn btn-large" disabled>Upload Artwork (Demo)</button>
      </div>
    </section>
  )
}

// PUBLIC_INTERFACE
function ResourceLibrarySection() {
  return (
    <section className="artfusion-section artfusion-resources">
      <h2>
        <span role="img" aria-label="Books">📚</span> Resource Library
      </h2>
      <p>
        Curated art resources, references, and downloadable materials to support your artistic journey.
      </p>
      <ul className="artfusion-resource-list">
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

function LessonCard({ title, level, color }) {
  return (
    <div className="artfusion-lesson-card" style={{
      borderLeft: `6px solid ${color}`,
      background: "rgba(32,36,50,0.85)"
    }}>
      <div className="lesson-title">{title}</div>
      <div className="lesson-level">{level}</div>
      <button className="btn btn-small" disabled>Start</button>
    </div>
  );
}

function GalleryCard({ username, imgSrc, title }) {
  return (
    <div className="artfusion-gallery-card">
      <div className="gallery-img" style={{
        backgroundImage: `url(${imgSrc})`
      }}></div>
      <div className="gallery-info">
        <div>{title}</div>
        <small>by <b>@{username}</b></small>
      </div>
    </div>
  );
}

export default ArtFusionMainContainer;
