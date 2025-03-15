export interface Location {
  type: 'Point';
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  location: Location;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
} 