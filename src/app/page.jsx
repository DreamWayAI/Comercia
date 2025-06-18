'use client';
import { useState } from 'react';

export default function HomePage() {
  const [company, setCompany] = useState("PoliBest 911");
  const [client, setClient] = useState("ТОВ Комфортбуд");
  const [date, setDate] = useState("2025-06-18");
  const [currency, setCurrency] = useState("грн");

  const [rooms, setRooms] = useState([
    {
      name: "Цех 1",
      area: 52,
      materials: [
        { name: "Фарба", price: 1180, amount: 4.5 }
      ]
    }
  ]);

  const handleGenerate = async (format) => {
    const endpoint = format === 'pdf' ? '/generate/pdf' : '/generate/word';
    const res = await fetch('https://proposal-api.up.railway.app' + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, client, date, currency, rooms }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `proposal.${format}`;
    link.click();
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>PoliBest Proposal Builder</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Компанія: </label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Клієнт: </label>
        <input value={client} onChange={(e) => setClient(e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Дата: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Валюта: </label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="грн">грн</option>
          <option value="€">€</option>
          <option value="$">$</option>
        </select>
      </div>

      <button onClick={() => handleGenerate('word')} style={{ marginRight: '1rem' }}>
        Завантажити Word
      </button>
      <button onClick={() => handleGenerate('pdf')}>
        Завантажити PDF
      </button>
    </main>
  );
}