'use client';
import React, { useState } from 'react';
import { FileText, Calculator, MapPin, Building, Download, Plus, Trash2 } from 'lucide-react';

const ProposalBuilder = () => {
  const [formData, setFormData] = useState({
    country: 'Україна',
    city: 'Київ',
    companyName: 'ТМ PoliBest',
    productName: 'PoliBest 911',
    productDescription: 'ПОЛІМЕРНІ МАТЕРІАЛИ ДЛЯ ЗАХИСНОГО ПОЛІМЕРНОГО ПОКРИТТЯ',
    areas: [
      {
        id: 1,
        name: 'Перше приміщення',
        size: 1500,
        layers: 3,
        discount: 20,
        isSpecial: false,
        selectedMaterials: [1]
      }
    ],
    materials: [
      {
        id: 1,
        name: 'PoliBest 911 (захисна епоксидна емаль для бетону, 2-х компонентна)',
        consumption: 0.300,
        pricePerKg: 1512.00,
        category: 'enamel'
      },
      {
        id: 2,
        name: 'PoliBest 911 (захисний епоксидний глянцевий лак для бетону, 2-х компонентний)',
        consumption: 0.300,
        pricePerKg: 1188.00,
        category: 'paint'
      },
      {
        id: 3,
        name: 'PoliBest 911 (ґрунтівка двокомпонентна універсальна)',
        consumption: 0.300,
        pricePerKg: 864.00,
        category: 'primer'
      }
    ],
    warranty: 5,
    productionDays: 9
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Повний компонент PoliBest 911</h1>
      <p className="text-gray-700 mb-6">
        Тут буде розміщено повну логіку конструктора з усіма розрахунками, табами, стилями та preview.
      </p>
    </div>
  );
};

export default ProposalBuilder;