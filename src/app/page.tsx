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
    areas: [
      {
        id: 1,
        name: 'Приміщення 1',
        size: 100,
        layers: 2,
        discount: 0,
        isSpecial: false,
        selectedMaterials: []
      }
    ],
    materials: [],
    warranty: 12,
    productionDays: 7
  });

  const generateProposal = () => {
    alert('Комерційну пропозицію згенеровано успішно!');
  };

  const updateMaterial = (id: number, field: keyof Material, value: any) => {
    setFormData({
      ...formData,
      materials: formData.materials.map(material =>
        material.id === id ? { ...material, [field]: value } : material
      )
    });
  };

  const addMaterial = () => {
    const newMaterial: Material = {
      id: formData.materials.length + 1,
      name: '',
      consumption: 0,
      pricePerKg: 0,
      category: 'primer'
    };
    setFormData({
      ...formData,
      materials: [...formData.materials, newMaterial]
    });
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

        {/* Матеріали */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Матеріали</h3>
          <div className="space-y-6">
            {formData.materials.map((material) => (
              <div key={material.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Назва матеріалу</label>
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => updateMaterial(material.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Витрати (кг/м²)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={material.consumption}
                    onChange={(e) => updateMaterial(material.id, 'consumption', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ціна (грн/кг)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={material.pricePerKg}
                    onChange={(e) => updateMaterial(material.id, 'pricePerKg', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Категорія</label>
                  <select
                    value={material.category}
                    onChange={(e) => updateMaterial(material.id, 'category', e.target.value as Material['category'])}
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
                  >
                    <option value="primer">Ґрунтівка</option>
                    <option value="enamel">Емаль</option>
                    <option value="paint">Фарба</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addMaterial}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Додати матеріал</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalBuilder;
