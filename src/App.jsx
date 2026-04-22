import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ProductPage } from './pages/ProductPage';
import { getCustomers, getProductsForCustomer } from './services/storageService';
import './App.css';

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const customerList = await getCustomers();
        const fullData = await Promise.all(
          customerList.map(async (c) => {
            const products = await getProductsForCustomer(c);
            return { name: c, products };
          })
        );
        setCustomers(fullData.length ? fullData : [{ name: 'Demo Customer', products: ['Product A', 'Product B'] }]);
      } catch (err) {
        setCustomers([{ name: 'Demo Customer', products: ['Product A', 'Product B'] }]);
      }
    };
    loadData();
  }, []);

  const handleCreateCustomer = () => {
    const name = window.prompt("Enter new customer name:");
    if (name && !customers.find(c => c.name === name)) {
      setCustomers([...customers, { name, products: [] }]);
    }
  };

  const handleCreateProduct = () => {
    if (!selectedCustomer) return;
    const name = window.prompt("Enter new product name:");
    if (name) {
      setCustomers(customers.map(c => {
        if (c.name === selectedCustomer && !c.products.includes(name)) {
          return { ...c, products: [...c.products, name] };
        }
        return c;
      }));
      setSelectedProduct(name);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <Sidebar 
        customers={customers} 
        selectedCustomer={selectedCustomer}
        selectedProduct={selectedProduct}
        onSelectCustomer={(c) => { setSelectedCustomer(c); setSelectedProduct(null); }}
        onSelectProduct={setSelectedProduct}
        onCreateCustomer={handleCreateCustomer}
        onCreateProduct={handleCreateProduct}
      />
      <ProductPage 
        customerName={selectedCustomer}
        productName={selectedProduct}
      />
    </div>
  );
}

export default App;
