import React from "react";

// PUBLIC_INTERFACE
function UserGallery() {
  /** This is a public function representing the User Gallery page. */
  return (
    <section className="feature-page">
      <h2 style={{ fontSize: "2.3rem", fontWeight: "600", color: "#FF6F61", marginBottom: "8px" }}>
        🖼️ User Gallery
      </h2>
      <p className="description" style={{ fontSize: "1.15rem", marginTop: 0 }}>
        Showcase your creations and discover art by fellow ArtFusion users. Upload, share, and discuss artworks in a vibrant, supportive community gallery.
      </p>
    </section>
  );
}

export default UserGallery;
