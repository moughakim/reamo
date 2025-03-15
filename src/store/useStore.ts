import { create } from 'zustand';
import { Property } from '@/types/property';

interface Filters {
  searchQuery: string;
  priceRange: [number | null, number | null];
  propertyType: string[];
  status: string;
  beds: number | null;
  city: string;
}

interface Store {
  properties: Property[];
  filters: Filters;
  setProperties: (properties: Property[]) => void;
  setFilters: (filters: Partial<Filters>) => void;
  filteredProperties: () => Property[];
}

export const useStore = create<Store>((set, get) => ({
  properties: [],
  filters: {
    searchQuery: '',
    priceRange: [null, null],
    propertyType: [],
    status: '',
    beds: null,
    city: '',
  },
  setProperties: (properties) => set({ properties }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  filteredProperties: () => {
    const { properties, filters } = get();
    return properties.filter((property) => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          property.title.toLowerCase().includes(query) ||
          property.location.address.toLowerCase().includes(query) ||
          property.location.city.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Price range filter
      if (filters.priceRange[0] !== null && property.price < filters.priceRange[0]) return false;
      if (filters.priceRange[1] !== null && property.price > filters.priceRange[1]) return false;

      // Property type filter
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) return false;

      // Status filter
      if (filters.status && property.status !== filters.status) return false;

      // Beds filter
      if (filters.beds !== null && property.beds < filters.beds) return false;

      // City filter
      if (filters.city && property.location.city.toLowerCase() !== filters.city.toLowerCase()) return false;

      return true;
    });
  },
})); 