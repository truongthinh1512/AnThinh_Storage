import React from 'react';
import { Folder, FolderOpen, ChevronRight, Plus } from 'lucide-react';

export const Sidebar = ({ customers, selectedCustomer, selectedProduct, onSelectCustomer, onSelectProduct, onCreateCustomer, onCreateProduct }) => {
  return (
    <div style={{ width: '250px', backgroundColor: '#f5f5f5', borderRight: '1px solid #ddd', height: '100vh', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', margin: 0, fontWeight: 'bold' }}>AnThinh Storage</h2>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '14px', color: '#666', textTransform: 'uppercase' }}>Customers</h3>
        <button onClick={onCreateCustomer} title="Add Customer" style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex' }}>
          <Plus size={16} color="#666" />
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {customers.map((c) => (
          <li key={c.name} style={{ marginBottom: '5px' }}>
            <div 
              style={{
                display: 'flex', 
                alignItems: 'center', 
                padding: '8px 10px', 
                cursor: 'pointer',
                borderRadius: '4px',
                backgroundColor: selectedCustomer === c.name ? '#e0e0e0' : 'transparent',
                fontWeight: selectedCustomer === c.name ? 'bold' : 'normal'
              }}
              onClick={() => onSelectCustomer(c.name)}
            >
              {selectedCustomer === c.name ? <FolderOpen size={18} style={{ marginRight: '8px', color: '#1976d2' }} /> : <Folder size={18} style={{ marginRight: '8px', color: '#757575' }} />}
              <span style={{ flexGrow: 1 }}>{c.name}</span>
            </div>

            {selectedCustomer === c.name && (
              <ul style={{ listStyle: 'none', paddingLeft: '20px', margin: '5px 0' }}>
                {c.products.map((p) => (
                  <li 
                    key={p} 
                    style={{
                      padding: '6px 10px 6px 15px', 
                      cursor: 'pointer', 
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: selectedProduct === p ? '#bbdefb' : 'transparent',
                      color: selectedProduct === p ? '#0d47a1' : '#333'
                    }}
                    onClick={(e) => { e.stopPropagation(); onSelectProduct(p); }}
                  >
                    {p}
                  </li>
                ))}
                <li 
                  style={{
                    padding: '6px 10px 6px 15px', 
                    cursor: 'pointer', 
                    fontSize: '13px',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onClick={(e) => { e.stopPropagation(); onCreateProduct(); }}
                >
                  <Plus size={14} style={{ marginRight: '5px' }} /> Add Product
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
      
      {customers.length === 0 && (
         <div style={{ fontSize: '14px', color: '#888', textAlign: 'center', marginTop: '20px' }}>No customers found.</div>
      )}
    </div>
  );
};
