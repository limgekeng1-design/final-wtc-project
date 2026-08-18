import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCart } from '../context/CartContext';

export default function Contact() {
  const { cartItems = [], clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const shipping = cartItems.length > 0 ? 2.00 : 0;
  const total = subtotal + shipping;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("មិនមានទំនិញក្នុងកន្ត្រកឡើយ!");
      return;
    }

    if (!customerName || !phoneNumber || !address) {
      alert("សូមបំពេញឈ្មោះ លេខទូរស័ព្ទ និងអាសយដ្ឋានឱ្យបានត្រឹមត្រូវ!");
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        customerName,
        phoneNumber,
        address,
        items: cartItems,
        totalAmount: total,
        cardMessage,
        orderNote,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });

      alert('ការបញ្ជាទិញទទួលបានជោគជ័យ!');
      if (typeof clearCart === 'function') {
        clearCart();
      }
    } catch (error) {
      console.error("Firebase Error Details:", error);
      alert('មានបញ្ហាក្នុងការបញ្ជាទិញ!');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    textAlign: 'left',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px 16px' }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '28px 24px',
        maxWidth: '420px',
        width: '100%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#111827' }}>
          Checkout & Order Details
        </h2>

        {/* Order Summary */}
        <div style={{ backgroundColor: '#f9fafb', padding: '14px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center', border: '1px solid #f3f4f6' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#1f2937' }}>Order Summary</h3>
          {cartItems.map((item, idx) => (
            <p key={idx} style={{ color: '#4b5563', margin: '3px 0', fontSize: '13px' }}>
              {item.title || item.name} x {item.quantity || 1} - ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
            </p>
          ))}
          <h4 style={{ fontSize: '15px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#111827' }}>
            Total Amount: ${total.toFixed(2)}
          </h4>
        </div>

        <form onSubmit={handleSubmitOrder}>
          {/* Full Name */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Full Name / ឈ្មោះពេញ *</label>
            <input 
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              required
              style={inputStyle} 
            />
          </div>

          {/* Phone Number */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Phone Number / លេខទូរស័ព្ទ *</label>
            <input 
              type="tel" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phonenumber"
              required
              style={inputStyle} 
            />
          </div>

          {/* Delivery Address */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Delivery Address / អាសយដ្ឋាន *</label>
            <textarea 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
              required
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' }} 
            />
          </div>

          {/* Card Message */}
          <div style={{ marginBottom: '14px' }}>
            <label style={labelStyle}>Card Message / ពាក្យជូនពរ (Optional)</label>
            <textarea 
              value={cardMessage} 
              onChange={(e) => setCardMessage(e.target.value)}
              placeholder="Happy birthday..."
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' }} 
            />
          </div>

          {/* Order Details */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Order Details / Note (Optional)</label>
            <textarea 
              value={orderNote} 
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="Additional instructions..."
              rows={2}
              style={{ ...inputStyle, resize: 'vertical' }} 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#18181b', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '15px', 
              fontWeight: '600', 
              cursor: 'pointer',
            }}
          >
            Confirm & Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}