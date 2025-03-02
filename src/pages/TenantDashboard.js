// pages/TenantDashboard.js
import React from 'react';

const TenantDashboard = () => {
  return (
    <div style={styles.container}>
      <h2>Welcome to Your Tenant Dashboard!</h2>

      {/* Apartment Info Section */}
      <div style={styles.card}>
        <h3>Apartment Information</h3>
        <p><strong>Address:</strong> 123 Main St, Apt 5</p>
        <p><strong>Status:</strong> Active</p>
        <p><strong>Lease Expiry:</strong> 12th Dec 2025</p>
      </div>

      {/* Issues Section */}
      <div style={styles.card}>
        <h3>Current Issues</h3>
        <ul>
          <li><strong>Plumbing issue in the kitchen</strong> - In progress</li>
          <li><strong>Broken window in bedroom</strong> - Resolved</li>
        </ul>
      </div>

      {/* Payments Section */}
      <div style={styles.card}>
        <h3>Payments</h3>
        <p><strong>Next Payment Due:</strong> 5th February 2025</p>
        <p><strong>Amount Due:</strong> $350</p>
        <button style={styles.payButton}>Pay Now</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '10px 0',
    width: '80%',
    maxWidth: '600px',
  },
  payButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default TenantDashboard;
