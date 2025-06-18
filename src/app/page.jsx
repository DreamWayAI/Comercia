'use client';

import React, { useState } from 'react';
import { FileText, Calculator, MapPin, Building, Download, Plus, Trash2 } from 'lucide-react';

export default function ProposalBuilder() {
  const [formData, setFormData] = useState({
    country: 'Україна',
    city: 'Київ',
    companyName: 'ТМ PoliBest',
    productName: 'PoliBest 911',
    productDescription: 'ПОЛІМЕРНІ МАТЕРІАЛИ ДЛЯ ЗАХИСНОГО ПОЛІМЕРНОГО ПОКРИТТЯ',
    areas: [
      {
        id: 1,
        name: 'Приміщення 1',
        size: 100,
        layers: 4,
        discount: 0,
        isSpecial: false,
        selectedMaterials: []
      }
    ],
    materials: [
      {
        id: 1,
        name: 'Фарба',
        consumption: 0.3,
        pricePerKg: 1180,
        category: 'paint'
      }
    ],
    warranty: 7,
    productionDays: 9
  });

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">PoliBest Generator</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Назва компанії</label>
          <input
            className="border p-2 w-full"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block font-medium">Місто</label>
          <input
            className="border p-2 w-full"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block font-medium">Опис продукту</label>
          <textarea
            className="border p-2 w-full"
            rows="4"
            value={formData.productDescription}
            onChange={(e) =>
              setFormData({ ...formData, productDescription: e.target.value })
            }
          />
        </div>
      </div>
    </main>
  );
}