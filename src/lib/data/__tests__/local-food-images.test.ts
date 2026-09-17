import fs from 'fs';
import path from 'path';
import { localFoods } from '@/lib/data/local-foods';
import { localFoodImageCredits } from '@/lib/data/local-food-image-credits';

const CTS_LIBRARY_IMAGES = new Set([
  'beijing-001',
  'shanghai-001',
  'chongqing-002',
  'hangzhou-002',
]);

describe('local food imagery', () => {
  it('uses reviewed local assets instead of the old repeated stock photos', () => {
    for (const food of localFoods) {
      if (!food.imageUrl) continue;
      expect(food.imageUrl).toBe(`/images/food-guide/${food.id}.webp`);
      expect(fs.existsSync(path.join(process.cwd(), 'public', food.imageUrl))).toBe(true);
    }
  });

  it('credits every reviewed image that is not from the CTS library', () => {
    for (const food of localFoods) {
      if (!food.imageUrl || CTS_LIBRARY_IMAGES.has(food.id)) continue;
      expect(localFoodImageCredits[food.id]).toBeDefined();
    }
  });
});
