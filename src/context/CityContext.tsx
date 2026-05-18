import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Building, BuildingType, Resources } from '../types';

interface CityContextType {
  resources: Resources;
  buildings: Building[];
  addBuilding: (name: string, type: BuildingType) => boolean;
  upgradeBuilding: (id: string) => boolean;
  collectIncome: () => void;
  collectResource: (type: keyof Resources, amount: number) => void;
  calculateIncome: () => number;
  calculateExpenses: () => number;
}

const defaultResources: Resources = {
  money: 500,
  wood: 100,
  stone: 100,
  energy: 50,
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
  const [resources, setResources] = useState<Resources>(defaultResources);
  const [buildings, setBuildings] = useState<Building[]>([]);

  const calculateIncome = () => {
    // Кожна фабрика приносить гроші залежно від її рівня
    return buildings
      .filter((b) => b.type === 'factory')
      .reduce((sum, b) => sum + b.level * 25, 0);
  };

  const calculateExpenses = () => {
    // Кожен будинок і дорога вимагають грошей на утримання
    return buildings
      .filter((b) => b.type === 'house' || b.type === 'road')
      .reduce((sum, b) => sum + b.level * 5, 0);
  };

  const addBuilding = (name: string, type: BuildingType) => {
    // Базова вартість: 100 грошей
    if (resources.money < 100) return false;

    setResources((prev) => ({ ...prev, money: prev.money - 100 }));
    const newBuilding: Building = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      type,
      level: 1,
    };
    setBuildings((prev) => [...prev, newBuilding]);
    return true;
  };

  const upgradeBuilding = (id: string) => {
    const building = buildings.find((b) => b.id === id);
    if (!building) return false;

    const cost = building.level * 150;
    if (resources.money < cost) return false;

    setResources((prev) => ({ ...prev, money: prev.money - cost }));
    setBuildings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, level: b.level + 1 } : b))
    );
    return true;
  };

  const collectIncome = () => {
    const income = calculateIncome();
    const expenses = calculateExpenses();
    const net = income - expenses;
    setResources((prev) => ({ ...prev, money: prev.money + net }));
  };

  const collectResource = (type: keyof Resources, amount: number) => {
    setResources((prev) => ({ ...prev, [type]: prev[type] + amount }));
  };

  return (
    <CityContext.Provider
      value={{
        resources,
        buildings,
        addBuilding,
        upgradeBuilding,
        collectIncome,
        collectResource,
        calculateIncome,
        calculateExpenses,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCityContext() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCityContext must be used within a CityProvider');
  }
  return context;
}
