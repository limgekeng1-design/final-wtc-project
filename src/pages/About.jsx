import React from 'react';

export default function About() {
  return (
    <div className="about_page_wrapper">
      {/* Top Section: Side-by-Side Image and Text */}
      <section className="about_hero_section">
        <div className="about_hero_image">
          <img
            src="/img/Bloom Flower Shop.jfif"
            alt="Graceful Flowers Arrangement"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop";
            }}
          />
        </div>
        <div className="about_hero_text">
          <h2>Our Story</h2>
          <p>
            Graceful Flowers was founded on love and a genuine passion for bringing elegance and smiles to everyone. We believe that flowers are more than just a gift—they are heartfelt messages crafted to turn your special occasions into unforgettable memories.
          </p>
          <p>
            Every bouquet is thoughtfully curated by hand, using premium fresh blooms and timeless creativity.
          </p>
        </div>
      </section>

      {/* Bottom Section: Why Choose Us Cards */}
      <section className="about_features_section">
        <h2>Why Choose Us</h2>
        <div className="about_cards_grid">
          <div className="about_card_item">
            <h3>Fresh Flowers</h3>
            <p>
              We hand-select top-quality, fresh blooms daily to ensure your arrangements stay vibrant and beautiful for longer.
            </p>
          </div>
          <div className="about_card_item">
            <h3>Custom Designs</h3>
            <p>
              Tailored floral designs created to match your unique style, preferences, and special event themes seamlessly.
            </p>
          </div>
          <div className="about_card_item">
            <h3>Handcrafted with Love</h3>
            <p>
              Every stem is arranged with passion, care, and meticulous attention to detail to deliver pure elegance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}