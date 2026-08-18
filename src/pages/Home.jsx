import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // ប្រើ BASE_URL ដើម្បីទាញយករូបភាពពី public/img/ ឱ្យត្រូវ Path ទាំងលើ Local និង GitHub Pages
  const bgImage = `${import.meta.env.BASE_URL}img/hero-bg.jfif`;

  return (
    <div
      className="hero_section"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <div
        className="hero_content"
        style={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "16px",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
          }}
        >
          Welcome to Our Flower Shop
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#374151",
            marginBottom: "28px",
            lineHeight: "1.6",
            fontWeight: "500",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
          }}
        >
          We provide fresh and beautiful flowers for all your special occasions.
        </p>

        <Link
          to="/products"
          className="hero_btn"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            backgroundColor: "#18181b",
            color: "#ffffff",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          View Bouquet
        </Link>
      </div>
    </div>
  );
}