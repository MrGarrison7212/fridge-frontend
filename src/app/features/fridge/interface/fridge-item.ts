import {FridgeCategory} from '../enum/fridge-category';

export interface FridgeItem {
  id: number;
  name: string;
  category: FridgeCategory;
  quantity: number;
  unit: string;
  storedAt: string;
  bestBefore: string;
  notes?: string | null;
}

export interface FridgeItemCreateRequest {
  name: string;
  category: FridgeCategory;
  quantity: number;
  unit: string;
  storedAt: string;
  bestBefore: string;
  notes: string | null;
}
