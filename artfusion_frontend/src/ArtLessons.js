import React from "react";

// PUBLIC_INTERFACE
function ArtLessons() {
  /** This is a public function representing the Interactive Art Lessons page. */
  return (
    <section className="feature-page">
      <h2 style={{ fontSize: "2.3rem", fontWeight: "600", color: "#FF6F61", marginBottom: "8px" }}>
        🎨 Interactive Art Lessons
      </h2>
      <p className="description" style={{ fontSize: "1.15rem", marginTop: 0 }}>
        Step-by-step tutorials, creative exercises, and learning paths for all skill levels. Explore drawing, painting, and digital art through immersive lessons designed by artists for ArtFusion.
      </p>
    </section>
  );
}

export default ArtLessons;
