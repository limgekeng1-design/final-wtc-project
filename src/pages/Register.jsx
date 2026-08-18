import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="form_card">
      <h2>Create New Account</h2>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="btn_primary">
          Register
        </button>
      </form>
      <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#666' }}>
        Already have an account? <Link to="/login" style={{ color: '#e8a0bf', fontWeight: '600' }}>Login here</Link>
      </p>
    </div>
  );
}