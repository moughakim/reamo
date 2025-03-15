import { useQuery } from '@tanstack/react-query';
import { Property } from '@/types/property';

async function fetchListings(): Promise<Property[]> {
  const response = await fetch('/api/listings');
  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }
  return response.json();
}

export function useListings() {
  return useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });
} 