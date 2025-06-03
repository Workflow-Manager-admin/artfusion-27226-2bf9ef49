import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

// Color palette
const ART_FUSION_COLORS = {
  primary: '#000000',
  gradient: 'linear-gradient(90deg, #000000 0%, #434343 100%)',
  accent: '#FF6F61',
};

// Placeholder Components
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
      <div className="app" style={{ background: ART_FUSION_COLORS.primary, minHeight: '100vh' }}>
        <nav
          className="navbar"
          style={{
            background: ART_FUSION_COLORS.gradient,
            borderBottom: `2px solid ${ART_FUSION_COLORS.accent}`,
            color: '#fff',
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="logo" style={{ fontWeight: 700, letterSpacing: '0.5px' }}>
              <span className="logo-symbol" style={{ color: ART_FUSION_COLORS.accent, fontSize: 22 }}>
                ✦
              </span>
              ArtFusion
            </div>
            <div className="nav-links" style={{ display: 'flex', gap: '18px' }}>
              <NavLink
                to="/art-lessons"
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active-nav-link' : ''}`
                }
              >
                Art Lessons
              </NavLink>
              <NavLink
                to="/ai-assistant"
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active-nav-link' : ''}`
                }
              >
                AI Assistant
              </NavLink>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active-nav-link' : ''}`
                }
              >
                User Gallery
              </NavLink>
              <NavLink
                to="/resources"
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active-nav-link' : ''}`
                }
              >
                Resources
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="main-content" style={{ paddingTop: 90, flex: 1 }}>
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
      {/* Extra styles for navigation and accent */}
      <style>
        {`
          .nav-link {
            color: #fff;
            text-decoration: none;
            padding: 8px 0;
            margin: 0 8px;
            font-size: 1rem;
            font-weight: 500;
            border-bottom: 2px solid transparent;
            transition: color .2s, border-bottom .2s;
          }
          .nav-link:hover {
            color: ${ART_FUSION_COLORS.accent};
            border-bottom: 2px solid ${ART_FUSION_COLORS.accent};
          }
          .active-nav-link {
            color: ${ART_FUSION_COLORS.accent};
            border-bottom: 2px solid ${ART_FUSION_COLORS.accent};
          }
          .feature-page {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            background: linear-gradient(120deg, #000 40%, #434343 100%);
            border-radius: 22px;
            box-shadow: 0 7px 26px 0 rgba(0,0,0,0.13);
            margin: 24px 0;
            padding: 54px 20px 48px 20px;
            animation: fade-in 0.6s;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(32px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </Router>
  );
}

export default App;
