import { Property } from '@/types/property';

// Mock data for development
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa with Ocean View',
    type: 'house',
    status: 'for-sale',
    price: 2500000,
    beds: 4,
    baths: 3,
    sqft: 3500,
    yearBuilt: 2021,
    description: 'Stunning luxury villa with panoramic ocean views and modern amenities.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60', // Luxury house exterior
      'https://images.unsplash.com/photo-1600596542815-ffad4c153aee9?w=800&auto=format&fit=crop&q=60', // Modern living room
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60', // Kitchen
    ],
    location: {
      address: '123 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      zipCode: '33139',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918,
      },
    },
    features: [
      'Ocean View',
      'Swimming Pool',
      'Smart Home System',
      'Wine Cellar',
      'Home Theater',
    ],
    broker: {
      name: 'John Smith',
      phone: '(555) 123-4567',
      email: 'john.smith@example.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60',
    },
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Modern Downtown Apartment',
    type: 'apartment',
    status: 'for-rent',
    price: 3500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    yearBuilt: 2020,
    description: 'Contemporary apartment in the heart of downtown with premium amenities.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60', // Modern apartment exterior
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60', // Apartment living room
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&auto=format&fit=crop&q=60', // Apartment bedroom
    ],
    location: {
      address: '456 Downtown Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      coordinates: {
        lat: 25.7743,
        lng: -80.1977,
      },
    },
    features: [
      'Gym Access',
      'Rooftop Pool',
      '24/7 Security',
      'Pet Friendly',
      'Parking Included',
    ],
    broker: {
      name: 'Sarah Johnson',
      phone: '(555) 987-6543',
      email: 'sarah.johnson@example.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    },
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-14T15:30:00Z',
  },
  {
    id: '3',
    title: 'Commercial Office Space',
    type: 'commercial',
    status: 'for-sale',
    price: 5000000,
    beds: 0,
    baths: 2,
    sqft: 5000,
    yearBuilt: 2019,
    description: 'Prime commercial office space in a prestigious business district.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60', // Modern office building
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60', // Office interior
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60', // Conference room
    ],
    location: {
      address: '789 Business Blvd',
      city: 'Miami',
      state: 'FL',
      zipCode: '33132',
      coordinates: {
        lat: 25.7833,
        lng: -80.2100,
      },
    },
    features: [
      'High Ceilings',
      'Conference Rooms',
      'Kitchenette',
      'Parking Garage',
      'Security System',
    ],
    broker: {
      name: 'Michael Brown',
      phone: '(555) 456-7890',
      email: 'michael.brown@example.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60',
    },
    createdAt: '2024-03-13T09:15:00Z',
    updatedAt: '2024-03-13T09:15:00Z',
  },
];

export async function fetchProperties(): Promise<Property[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockProperties;
}

export async function fetchProperty(id: string): Promise<Property | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const property = mockProperties.find((p) => p.id === id);
  return property || null;
} 