import { Property } from '@/types/property';

// Mock data for development
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Villa de Luxe à Hydra',
    type: 'house',
    status: 'for-sale',
    price: 85000000,
    beds: 5,
    baths: 4,
    sqft: 4500,
    yearBuilt: 2020,
    description: 'Magnifique villa moderne avec vue panoramique sur Alger, située dans le prestigieux quartier d\'Hydra.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1600596542815-ffad4c153aee9?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
    ],
    location: {
      address: '15 Rue des Oliviers',
      city: 'Hydra',
      state: 'Alger',
      zipCode: '16035',
      coordinates: {
        lat: 36.7470,
        lng: 3.0382,
      },
    },
    features: [
      'Vue Panoramique',
      'Piscine',
      'Jardin',
      'Garage',
      'Système de Sécurité',
    ],
    broker: {
      name: 'Karim Benali',
      phone: '(213) 555-123-456',
      email: 'karim.benali@example.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60',
    },
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Appartement Moderne à Sidi Yahia',
    type: 'apartment',
    status: 'for-rent',
    price: 180000,
    beds: 3,
    baths: 2,
    sqft: 1500,
    yearBuilt: 2022,
    description: 'Superbe appartement contemporain dans une résidence sécurisée à Sidi Yahia, proche de toutes commodités.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&auto=format&fit=crop&q=60',
    ],
    location: {
      address: '45 Boulevard des Martyrs',
      city: 'Sidi Yahia',
      state: 'Alger',
      zipCode: '16000',
      coordinates: {
        lat: 36.7539,
        lng: 3.0500,
      },
    },
    features: [
      'Résidence Sécurisée',
      'Ascenseur',
      'Parking Sous-sol',
      'Climatisation',
      'Terrasse',
    ],
    broker: {
      name: 'Amina Khelifi',
      phone: '(213) 555-987-654',
      email: 'amina.khelifi@example.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    },
    createdAt: '2024-03-14T15:30:00Z',
    updatedAt: '2024-03-14T15:30:00Z',
  },
  {
    id: '3',
    title: 'Local Commercial à Bab Ezzouar',
    type: 'commercial',
    status: 'for-sale',
    price: 45000000,
    beds: 0,
    baths: 2,
    sqft: 3000,
    yearBuilt: 2021,
    description: 'Local commercial stratégique situé dans le quartier d\'affaires de Bab Ezzouar, idéal pour bureau ou commerce.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop&q=60',
    ],
    location: {
      address: '120 Route Nationale',
      city: 'Bab Ezzouar',
      state: 'Alger',
      zipCode: '16042',
      coordinates: {
        lat: 36.7210,
        lng: 3.1894,
      },
    },
    features: [
      'Emplacement Stratégique',
      'Grande Vitrine',
      'Parking',
      'Climatisation',
      'Sécurité 24/7',
    ],
    broker: {
      name: 'Mohamed Larbi',
      phone: '(213) 555-456-789',
      email: 'mohamed.larbi@example.com',
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