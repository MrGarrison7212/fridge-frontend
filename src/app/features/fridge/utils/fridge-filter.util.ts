import { FridgeItem } from '../interface/fridge-item';

export function filterFridgeItems(
  items: FridgeItem[],
  search: string
): FridgeItem[] {
  const term = search.toLowerCase().trim();

  if (!term) {
    return items;
  }

  return items.filter((item) =>
    item.name.toLowerCase().includes(term)
  );
}
