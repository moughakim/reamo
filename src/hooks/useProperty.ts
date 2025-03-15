import { useQuery } from '@tanstack/react-query';
import { Property } from '@/types/property';

async function fetchProperty(id: string): Promise<Property> {
  const response = await fetch(`/api/listings/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch property');
  }
  return response.json();
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id),
    enabled: !!id,
  });
} 