import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems = [], addToCart, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return acc + price * quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 2.00 : 0;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("សូមបន្ថែមទំនិញទៅក្នុងកន្ត្រកជាមុនសិន!");
      return;
    }
    navigate('/contact');
  };

  const btnStyle = {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b' }}>កន្ត្រកទំនិញរបស់អ្នកទទេស្អាត!</p>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Item List */}
          <div style={{ flex: '2', minWidth: '320px' }}>
            {cartItems.map((item, index) => {
              const itemPrice = Number(item.price) || 0;
              const itemQty = Number(item.quantity) || 1;
              const itemId = item.id || index;

              return (
                <div 
                  key={itemId} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '16px 0', 
                    borderBottom: '1px solid #e2e8f0' 
                  }}
                >
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 'bold' }}>
                      {item.title || item.name || 'Product'}
                    </h4>
                    
                    {/* Quantity Controls (+ / -) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#64748b', fontSize: '14px' }}>${itemPrice.toFixed(2)}</span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', padding: '4px 8px', borderRadius: '8px' }}>
                        <button 
                          onClick={() => decreaseQuantity(itemId)} 
                          style={btnStyle}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 'bold', minWidth: '16px', textAlign: 'center' }}>{itemQty}</span>
                        <button 
                          onClick={() => addToCart(item)} 
                          style={btnStyle}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeFromCart(itemId)}
                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', marginLeft: '5px' }}
                      >
                        លុប
                      </button>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                    ${(itemPrice * itemQty).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div style={{ flex: '1', minWidth: '280px', padding: '24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#475569' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#475569' }}>
              <span>Shipping Fee:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
              <span>Total Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleProceedToCheckout}
              style={{ 
                width: '100%', 
                padding: '14px', 
                backgroundColor: '#3b232e', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '10px', 
                fontSize: '15px', 
                fontWeight: 'bold', 
                cursor: 'pointer' 
              }}
            >
              Proceed to Checkout ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}