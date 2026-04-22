import React from 'react';
import { FileSection } from '../components/product/FileSection';

export const ProductPage = ({ customerName, productName }) => {
  if (!customerName || !productName) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#888', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>No Product Selected</h2>
        <p>Please select a product from the sidebar.</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: '30px', backgroundColor: '#fafafa', overflowY: 'auto', height: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ marginBottom: '10px', fontSize: '24px', fontWeight: 'bold' }}>{productName}</h1>
      <p style={{ color: '#666', marginBottom: '30px', fontSize: '14px' }}>Customer: {customerName}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        <FileSection 
          title="Blueprint" 
          customerName={customerName} 
          productName={productName} 
          folderType="blueprint" 
          acceptRules={{ 'image/png': ['.png'] }} 
        />
        <FileSection 
          title="Box Label" 
          customerName={customerName} 
          productName={productName} 
          folderType="box-label" 
          acceptRules={{ 'application/pdf': ['.pdf'] }} 
        />
        <FileSection 
          title="Product Label" 
          customerName={customerName} 
          productName={productName} 
          folderType="product-label" 
          acceptRules={{ 'application/pdf': ['.pdf'] }} 
        />
      </div>
    </div>
  );
};
