import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="form_card">
      <h2>Login to Your Account</h2>
      <form>
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn_primary">
          Login
        </button>
      </form>
      <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#666' }}>
        Don't have an account? <Link to="/register" style={{ color: '#e8a0bf', fontWeight: '600' }}>Register here</Link>
      </p>
    </div>
  );
}