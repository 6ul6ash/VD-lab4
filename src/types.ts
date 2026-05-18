export type Resources = {
  money: number;
  wood: number;
  stone: number;
  energy: number;
};

export type BuildingType = 'house' | 'road' | 'factory';

export type Building = {
  id: string;
  name: string;
  level: number;
  type: BuildingType;
};