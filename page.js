"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [services, setServices] = useState([
    { name: 'Auth Service (Node.js)', endpoint: '/api/auth', status: 'Loading...', data: null },
    { name: 'Product Service (Python)', endpoint: '/api/products', status: 'Loading...', data: null },
    { name: 'Order Service (Go)', endpoint: '/api/orders', status: 'Loading...', data: null },
  ]);

  useEffect(() => {
    services.forEach((service, index) => {
      fetch(service.endpoint)
        .then(res => res.json())
        .then(data => {
          const newServices = [...services];
          newServices[index].status = '🟢 Online';
          newServices[index].data = data.message;
          setServices(newServices);
        })
        .catch(() => {
          const newServices = [...services];
          newServices[index].status = '🔴 Offline';
          setServices(newServices);
        });
    });
  }, []);

  return (
    <main style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>🚀 Microservices Dashboard</h1>
      <p>Status infrastruktur Anda saat ini:</p>
      
      <div style={{ display: 'grid', gap: '20px', marginTop: '30px' }}>
        {services.map((service, i) => (
          <div key={i} style={{ padding: '20px', borderRadius: '12px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{service.name}</h3>
            <p>Status: <strong>{service.status}</strong></p>
            {service.data && <p style={{ color: '#666', fontStyle: 'italic' }}>" {service.data} "</p>}
            <a href={service.endpoint} target="_blank" style={{ fontSize: '12px', color: '#0070f3' }}>Cek Endpoint Mentah</a>
          </div>
        ))}
      </div>
      
      <footer style={{ marginTop: '50px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
        Berjalan di Vercel Monorepo Infrastruktur
      </footer>
    </main>
  );
}