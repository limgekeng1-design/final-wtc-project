import React from "react";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Red Rose Bouquet", price: 25.00, img: "/img/Red Rose.jfif", badge: "Best Seller" },
    { id: 2, name: "Sunflowers Bouquet", price: 18.00, img: "/img/Sunflowers.jfif", badge: "" },
    { id: 3, name: "Pink Rose Bouquet", price: 25.00, img: "/img/Pink rose.jfif", badge: "New" },
    { id: 4, name: "Blue Rose Bouquet", price: 25.00, img: "/img/BLUE [💧].jfif", badge: "Best Seller" },
    { id: 5, name: "Blue Tulip Bouquet", price: 20.00, img: "/img/Blue tulip.jfif", badge: "" },
    { id: 6, name: "Daisy Bouquet", price: 18.00, img: "/img/daisy.jfif", badge: "" },
    { id: 7, name: "Rose and Daisy Bouquet", price: 30.00, img: "/img/Pink Roses And Daisy Bouquet Ideas.webp", badge: "New" },
    { id: 8, name: "Orchid Bouquet", price: 20.00, img: "/img/Orchid.jfif", badge: "" },
    { id: 9, name: "Red Tulips Bouquet", price: 20.00, img: "/img/red turlip.jfif", badge: "" },
    { id: 10, name: "Lilies Bouquet", price: 15.00, img: "/img/download (7).jfif", badge: "" },
    { id: 11, name: "Tulips Bouquet", price: 20.00, img: "/img/turlip.jfif", badge: "" },
    { id: 12, name: "Yellow Rose Bouquet", price: 20.00, img: "/img/yellow rose.jfif", badge: "" },
  ];

  return (
    <div className="products_container">
      <h2 className="page_title">Our Best Products</h2>
      <section className="products_section">
        {products.map((item) => (
          <div key={item.id} className="products_card">
            {item.badge && (
              <span className={`product_badge ${item.badge === "New" ? "new" : ""}`}>
                {item.badge}
              </span>
            )}
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">${item.price.toFixed(2)}</p>
            <button 
              className="btn_order" 
              onClick={() => addToCart(item)}
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}