import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// The main App container implements a modern minimal navigation using ArtFusion theme.
// Placeholder components replaced once real screens/pages are introduced.

// PUBLIC_INTERFACE
function ArtLessons() {
  /** This is a public function. */
  return (
    <section className="feature-page">
      <h2>🎨 Interactive Art Lessons</h2>
      <p>Step-by-step tutorials and creative exercises for all skill levels. (Placeholder)</p>
    </section>
  );
}

// PUBLIC_INTERFACE
function AIArtAssistant() {
  /** This is a public function. */
  return (
    <section className="feature-page">
      <h2>🤖 AI Art Assistant</h2>
      <p>Your AI-powered companion offering tips, feedback, and creative ideas. (Placeholder)</p>
    </section>
  );
}

// PUBLIC_INTERFACE
function UserGallery() {
  /** This is a public function. */
  return (
    <section className="feature-page">
      <h2>🖼️ User Gallery</h2>
      <p>Showcase, share, and discuss your artwork with the community. (Placeholder)</p>
    </section>
  );
}

// PUBLIC_INTERFACE
function ResourceLibrary() {
  /** This is a public function. */
  return (
    <section className="feature-page">
      <h2>📚 Resource Library</h2>
      <p>Discover curated art references, guides, and downloads. (Placeholder)</p>
    </section>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container nav-inner">
            <div className="logo">
              <span className="logo-symbol">✦</span>
              ArtFusion
            </div>
            <div className="nav-links">
              <NavLink
                to="/art-lessons"
                className={({ isActive }) => `nav-link${isActive ? ' active-nav-link' : ''}`}
                end
              >
                Art Lessons
              </NavLink>
              <NavLink
                to="/ai-assistant"
                className={({ isActive }) => `nav-link${isActive ? ' active-nav-link' : ''}`}
              >
                AI Assistant
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) => `nav-link${isActive ? ' active-nav-link' : ''}`}
              >
                User Gallery
              </NavLink>
              <NavLink
                to="/resources"
                className={({ isActive }) => `nav-link${isActive ? ' active-nav-link' : ''}`}
              >
                Resources
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<ArtLessons />} />
              <Route path="/art-lessons" element={<ArtLessons />} />
              <Route path="/ai-assistant" element={<AIArtAssistant />} />
              <Route path="/gallery" element={<UserGallery />} />
              <Route path="/resources" element={<ResourceLibrary />} />
              <Route path="*" element={<ArtLessons />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
