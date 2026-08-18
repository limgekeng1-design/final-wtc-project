import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from Firestore real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  // គណនាប្រាក់ចំណូលសរុប និងចំនួន Order
  const totalOrders = orders.length;
  
  // គណនាប្រាក់ចំណូលសរុប (គិតតែ Order ដែល Completed ឬ ទាំងអស់តាមតម្រូវការ)
  const totalRevenue = orders.reduce((sum, order) => {
    return sum + (Number(order.totalAmount) || 0);
  }, 0);

  const completedOrders = orders.filter((o) => o.status === 'Completed').length;

  // Function សម្រាប់ Update Status ទៅ Firebase
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      alert('មានបញ្ហាក្នុងការកែប្រែ Status!');
    }
  };

  // Function កំណត់ពណ៌ Badge តាម Status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return { backgroundColor: '#22c55e', color: '#ffffff' }; // ពណ៌បៃតង
      case 'Processing':
        return { backgroundColor: '#3b82f6', color: '#ffffff' }; // ពណ៌ខៀវ
      case 'Cancelled':
        return { backgroundColor: '#ef4444', color: '#ffffff' }; // ពណ៌ក្រហម
      default:
        return { backgroundColor: '#f59e0b', color: '#ffffff' }; // Pending - ពណ៌លឿង/ទឹកក្រូច
    }
  };

  const cardStyle = {
    flex: '1',
    minWidth: '180px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
    border: '1px solid #f1f5f9'
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        Order Dashboard
      </h2>

      {/* Summary Cards Section (ប្រអប់សរុបលុយ និងចំនួន Orders) */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <div style={cardStyle}>
          <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
            Total Sales (ចំណូលសរុប)
          </p>
          <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#059669' }}>
            ${totalRevenue.toFixed(2)}
          </h3>
        </div>

        <div style={cardStyle}>
          <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
            Total Orders (ការកុម្ម៉ង់សរុប)
          </p>
          <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#1e293b' }}>
            {totalOrders}
          </h3>
        </div>

        <div style={cardStyle}>
          <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
            Completed Orders
          </p>
          <h3 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: '#2563eb' }}>
            {completedOrders}
          </h3>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f472b6', color: '#ffffff' }}>
              <th style={{ padding: '14px 16px' }}>Order ID</th>
              <th style={{ padding: '14px 16px' }}>អតិថិជន</th>
              <th style={{ padding: '14px 16px' }}>ទំនិញ</th>
              <th style={{ padding: '14px 16px' }}>តម្លៃ</th>
              <th style={{ padding: '14px 16px' }}>ស្ថានភាព</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const itemNames = order.items
                ? order.items.map((i) => `${i.title || i.name || 'Product'} (x${i.quantity || 1})`).join(', ')
                : 'N/A';

              return (
                <tr key={order.id || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#334155' }}>
                    #{order.id ? order.id.slice(0, 7) : index + 1}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>
                    {order.customerName || 'N/A'}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>
                    {itemNames}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>
                    ${Number(order.totalAmount || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <select
                      value={order.status || 'Pending'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{
                        ...getStatusStyle(order.status),
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: 'none',
                        fontWeight: 'bold',
                        fontSize: '13px',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <option value="Pending" style={{ color: '#000', backgroundColor: '#fff' }}>
                        Pending
                      </option>
                      <option value="Processing" style={{ color: '#000', backgroundColor: '#fff' }}>
                        Processing
                      </option>
                      <option value="Completed" style={{ color: '#000', backgroundColor: '#fff' }}>
                        Completed
                      </option>
                      <option value="Cancelled" style={{ color: '#000', backgroundColor: '#fff' }}>
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}