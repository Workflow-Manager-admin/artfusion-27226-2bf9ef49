import React from "react";

// PUBLIC_INTERFACE
function ResourceLibrary() {
  /** This is a public function representing the Resource Library page. */
  return (
    <section className="feature-page">
      <h2 style={{ fontSize: "2.3rem", fontWeight: "600", color: "#FF6F61", marginBottom: "8px" }}>
        📚 Resource Library
      </h2>
      <p className="description" style={{ fontSize: "1.15rem", marginTop: 0 }}>
        Browse curated references, guides, and downloadable materials to elevate your art. The Resource Library is your go-to hub for inspiration, best practices, and technical resources.
      </p>
    </section>
  );
}

export default ResourceLibrary;
