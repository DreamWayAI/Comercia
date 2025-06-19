'use client'

import React, { useState } from 'react';
import { FileText, Calculator, MapPin, Building, Download, Plus, Trash2 } from 'lucide-react';

interface Material {
  id: number;
  name: string;
  consumption: number;
  pricePerKg: number;
  category: 'primer' | 'enamel' | 'paint';
}

interface Area {
  id: number;
  name: string;
  size: number;
  layers: number;
  discount: number;
  isSpecial: boolean;
  selectedMaterials: number[];
}

interface FormData {
  country: string;
  city: string;
  companyName: string;
  productName: string;
  productDescription: string;
  areas: Area[];
  materials: Material[];
  warranty: number;
  productionDays: number;
}

const ProposalBuilder = () => {
  const [formData, setFormData] = useState<FormData>({
    country: 'Україна',
    city: 'Київ',
    companyName: 'ТМ PoliBest',
    productName: 'PoliBest 911',
    productDescription: 'ПОЛІМЕРНІ МАТЕРІАЛИ ДЛЯ ЗАХИСНОГО ПОЛІМЕРНОГО ПОКРИТТЯ',
    areas: [],
    materials: [],
    warranty: 12,
    productionDays: 7
  });

  const generateProposal = () => {
    alert('Комерційну пропозицію згенеровано успішно!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-xl border-l-8 border-red-600 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-xl shadow-lg">
                <div className="text-white font-bold text-2xl">P</div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">ТМ PoliBest</h1>
                <h2 className="text-xl font-semibold text-red-600">Конструктор комерційних пропозицій</h2>
                <p className="text-gray-600 mt-1">Полімерні матеріали для захисного покриття</p>
              </div>
            </div>
            <button
              onClick={generateProposal}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Завантажити</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalBuilder;
