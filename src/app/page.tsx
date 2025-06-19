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

  const [activeTab, setActiveTab] = useState('basic');

  const countries = ['Україна', 'Польща', 'Німеччина', 'Чехія', 'Словаччина'];
  const cities: Record<string, string[]> = {
    'Україна': ['Київ', 'Харків', 'Одеса', 'Дніпро', 'Львів'],
    'Польща': ['Варшава', 'Краків', 'Вроцлав'],
    'Німеччина': ['Берлін', 'Мюнхен', 'Гамбург'],
    'Чехія': ['Прага', 'Брно'],
    'Словаччина': ['Братислава', 'Кошице']
  };

  const calculateAreaCost = (area: Area): number => {
    let totalCost = 0;
    
    const selectedMaterials = formData.materials.filter(material => 
      area.selectedMaterials && area.selectedMaterials.includes(material.id)
    );
    
    selectedMaterials.forEach(material => {
      let consumption = material.consumption;
      
      if (area.isSpecial && material.category === 'primer') {
        consumption = material.consumption * 1.2;
      }
      
      const quantity = area.size * consumption;
      const cost = quantity * material.pricePerKg;
      totalCost += cost;
    });
    
    return totalCost * (1 - area.discount / 100);
  };

  const calculateTotalCost = (): number => {
    return formData.areas.reduce((total, area) => total + calculateAreaCost(area), 0);
  };

  const updateArea = (id: number, field: keyof Area, value: any) => {
    setFormData({
      ...formData,
      areas: formData.areas.map(area => 
        area.id === id ? { ...area, [field]: value } : area
      )
    });
  };

  const toggleMaterialForArea = (areaId: number, materialId: number) => {
    setFormData({
      ...formData,
      areas: formData.areas.map(area => {
        if (area.id === areaId) {
          const selectedMaterials = area.selectedMaterials || [];
          const isSelected = selectedMaterials.includes(materialId);
          
          return {
            ...area,
            selectedMaterials: isSelected
              ? selectedMaterials.filter(id => id !== materialId)
              : [...selectedMaterials, materialId]
          };
        }
        return area;
      })
    });
  };

  const addArea = () => {
    const newArea: Area = {
      id: Date.now(),
      name: `Приміщення ${formData.areas.length + 1}`,
      size: 1000,
      layers: 3,
      discount: 20,
      isSpecial: false,
      selectedMaterials: [1]
    };
    setFormData({
      ...formData,
      areas: [...formData.areas, newArea]
    });
  };

  const removeArea = (id: number) => {
    setFormData({
      ...formData,
      areas: formData.areas.filter(area => area.id !== id)
    });
  };

  const addMaterial = () => {
    const newMaterial: Material = {
      id: Date.now(),
      name: 'Новий матеріал PoliBest',
      consumption: 0.3,
      pricePerKg: 1000,
      category: 'primer'
    };
    setFormData({
      ...formData,
      materials: [...formData.materials, newMaterial]
    });
  };

  const updateMaterial = (id: number, field: keyof Material, value: any) => {
    setFormData({
      ...formData,
      materials: formData.materials.map(material =>
        material.id === id ? { ...material, [field]: value } : material
      )
    });
  };

  const generateProposal = () => {
    alert('Комерційну пропозицію згенеровано успішно!');
    // Тут можна додати логіку експорту в PDF
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
                <h2 className="text-xl font-semibold polibest-red">Конструктор комерційних пропозицій</h2>
                <p className="text-gray-600 mt-1">Полімерні матеріали для захисного покриття</p>
              </div>
            </div>
            <button
              onClick={generateProposal}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg"
            >
              <Download className="h-5 w-5" />
              <span className="font-semibold">Створити пропозицію</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-xl mb-8 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'basic', label: 'Основні дані', icon: Building },
              { id: 'areas', label: 'Приміщення', icon: MapPin },
              { id: 'materials', label: 'Матеріали', icon: Calculator },
              { id: 'preview', label: 'Перегляд', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-3 py-5 px-6 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'polibest-red border-b-4 polibest-border-red bg-red-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Basic Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-8">
                <div className="border-l-4 polibest-border-red pl-6">
                  <h3 className="text-2xl font-bold text-gray-800">Основна інформація</h3>
                  <p className="text-gray-600">Налаштуйте базові параметри пропозиції</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Країна</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        country: e.target.value, 
                        city: cities[e.target.value][0] 
                      })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-red-200 focus:border-red-500"
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Місто</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-red-200 focus:border-red-500"
                    >
                      {cities[formData.country] && cities[formData.country].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Назва продукту</label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-red-200 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Опис продукту</label>
                  <textarea
                    value={formData.productDescription}
                    onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-red-200 focus:border-red-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Гарантія (роки)</label>
                    <input
                      type="number"
                      value={formData.warranty}
                      onChange={(e) => setFormData({ ...formData, warranty: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-red-200 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Термін виготовлення (дні)</label>
                    <input
                      type="number"
                      value={formData.productionDays}
                      onChange={(e) => setFormData({ ...formData, productionDays: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-red-200 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Areas Tab */}
            {activeTab === 'areas' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="border-l-4 polibest-border-red pl-6">
                    <h3 className="text-2xl font-bold text-gray-800">Налаштування приміщень</h3>
                    <p className="text-gray-600">Додайте параметри кожного приміщення</p>
                  </div>
                  <button
                    onClick={addArea}
                    className="polibest-bg-red text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:opacity-90 transition-opacity"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Додати приміщення</span>
                  </button>
                </div>

                {formData.areas.map(area => (
                  <div key={area.id} className="bg-gray-50 rounded-xl p-8 border-l-4 polibest-border-red">
                    <div className="flex justify-between items-start mb-6">
                      <input
                        type="text"
                        value={area.name}
                        onChange={(e) => updateArea(area.id, 'name', e.target.value)}
                        className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2"
                      />
                      {formData.areas.length > 1 && (
                        <button
                          onClick={() => removeArea(area.id)}
                          className="polibest-red hover:text-red-800 p-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Площа (кв.м)</label>
                        <input
                          type="number"
                          value={area.size}
                          onChange={(e) => updateArea(area.id, 'size', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Шарів</label>
                        <input
                          type="number"
                          value={area.layers}
                          onChange={(e) => updateArea(area.id, 'layers', parseInt(e.target.value))}
                          className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Знижка (%)</label>
                        <input
                          type="number"
                          value={area.discount}
                          onChange={(e) => updateArea(area.id, 'discount', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="flex items-center space-x-2 mt-6">
                          <input
                            type="checkbox"
                            checked={area.isSpecial}
                            onChange={(e) => updateArea(area.id, 'isSpecial', e.target.checked)}
                            className="w-5 h-5 text-red-600"
                          />
                          <span className="text-sm">Іскробезпечне</span>
                        </label>
                      </div>
                    </div>

                    {/* Material Selection */}
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold mb-4">Матеріали:</h5>
                      <div className="grid md:grid-cols-2 gap-4">
                        {formData.materials.map(material => (
                          <div key={material.id} className="bg-white rounded p-4 border">
                            <label className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={area.selectedMaterials && area.selectedMaterials.includes(material.id)}
                                onChange={() => toggleMaterialForArea(area.id, material.id)}
                                className="w-5 h-5 text-red-600 mt-1"
                              />
                              <div>
                                <div className="font-medium">{material.name}</div>
                                <div className="text-sm text-gray-600">
                                  {material.consumption} кг/кв.м • {material.pricePerKg} грн/кг
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded p-6 border-2 border-red-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-semibold text-gray-600">Розрахункова вартість:</div>
                          <div className="text-3xl font-bold polibest-red">
                            {calculateAreaCost(area).toLocaleString('uk-UA', { minimumFractionDigits: 2 })} грн
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">З ПДВ</div>
                          <div className="text-sm font-semibold polibest-red">{formData.warranty} років гарантії</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="border-l-4 polibest-border-red pl-6">
                    <h3 className="text-2xl font-bold text-gray-800">Матеріали PoliBest</h3>
                    <p className="text-gray-600">Налаштуйте матеріали та їх параметри</p>
                  </div>
                  <button
                    onClick={addMaterial}
                    className="polibest-bg-red text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:opacity-90 transition-opacity"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Додати матеріал</span>
                  </button>
                </div>

                {formData.materials.map(material => (
                  <div key={material.id} className="bg-gray-50 rounded-xl p-6 border-l-4 polibest-border-red">
                    <input
                      type="text"
                      value={material.name}
                      onChange={(e) => updateMaterial(material.id, 'name', e.target.value)}
                      className="text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 w-full mb-4"
                    />

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Витрата (кг/кв.м)</label>
                        <input
                          type="number"
                          step="0.001"
                          value={material.consumption}
                          onChange={(e) => updateMaterial(material.id, 'consumption', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                          <option value="primer">Ґрунтівка</option>
                          <option value="enamel">Емаль</option>
                          <option value="paint">Фарба</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalBuilder;
