import { PLANT_CARE_GUIDES, PlantCareGuide } from '../data/plantCareGuides';

export function getDailyFeaturedPlant(targetDate?: Date): {
  plant: PlantCareGuide;
  dayIndex: number;
  formattedDate: string;
  totalGuidesCount: number;
} {
  const date = targetDate || new Date();
  
  // Deterministic Day of Year Calculation
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = Math.abs(dayOfYear) % PLANT_CARE_GUIDES.length;
  const plant = PLANT_CARE_GUIDES[index] || PLANT_CARE_GUIDES[0];

  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return {
    plant,
    dayIndex: index,
    formattedDate,
    totalGuidesCount: PLANT_CARE_GUIDES.length
  };
}

export function getAllPlantGuides(): PlantCareGuide[] {
  return PLANT_CARE_GUIDES;
}

export function getPlantGuideBySlug(slug: string): PlantCareGuide | undefined {
  return PLANT_CARE_GUIDES.find(p => p.slug === slug || p.id === slug);
}
