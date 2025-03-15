import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker, InfoWindow } from '@react-google-maps/api';
import type { Clusterer } from '@react-google-maps/marker-clusterer';
import { Property } from '@/types/property';
import { PropertyDrawer } from './PropertyDrawer';
import { useTranslation } from 'next-i18next';
import { MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 36.7538,
  lng: 3.0588  // Coordinates for Algiers, Algeria
};

const algeriaBounds = {
  north: 37.3,  // Northern boundary of Algeria
  south: 18.96, // Southern boundary of Algeria
  west: -8.67,  // Western boundary of Algeria
  east: 12.0    // Eastern boundary of Algeria
};

interface PropertyMapProps {
  properties: Property[];
}

interface MarkerWithProperty extends google.maps.Marker {
  property?: Property;
}

export function PropertyMap({ properties }: PropertyMapProps) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Property | null>(null);
  const { t } = useTranslation();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const center = properties.length > 0
    ? {
        lat: properties.reduce((sum, p) => sum + p.location.coordinates.lat, 0) / properties.length,
        lng: properties.reduce((sum, p) => sum + p.location.coordinates.lng, 0) / properties.length
      }
    : defaultCenter;

  const handleMarkerClick = useCallback((property: Property) => {
    setSelectedMarker(property);
  }, []);

  const handleInfoWindowClick = useCallback((property: Property) => {
    setSelectedProperties([property]);
    setIsDrawerOpen(true);
  }, []);

  const handleClusterClick = useCallback((cluster: Clusterer) => {
    const markers = cluster.getMarkers() as MarkerWithProperty[];
    const clusterProperties = markers
      .map(marker => marker.property)
      .filter((property): property is Property => property !== undefined);
    setSelectedProperties(clusterProperties);
    setIsDrawerOpen(true);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  return (
    <div className="h-full relative">
      <main className="absolute inset-0">
        <div className="h-full w-full">
          {!isLoaded ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-600">{t('common.loading')}</p>
              </div>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              options={{
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                  }
                ],
                restriction: {
                  latLngBounds: algeriaBounds,
                  strictBounds: false
                },
                minZoom: 6,  // Restrict zoom out to keep focus on Algeria
                maxZoom: 18  // Maximum zoom level for detailed view
              }}
            >
              <MarkerClusterer
                options={{
                  imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                }}
                onClick={handleClusterClick}
              >
                {(clusterer) => (
                  <>
                    {properties.map((property) => (
                      <Marker
                        key={property.id}
                        position={{
                          lat: property.location.coordinates.lat,
                          lng: property.location.coordinates.lng
                        }}
                        onClick={() => handleMarkerClick(property)}
                        clusterer={clusterer}
                        onLoad={(marker) => {
                          (marker as MarkerWithProperty).property = property;
                        }}
                      />
                    ))}
                  </>
                )}
              </MarkerClusterer>

              {selectedMarker && (
                <InfoWindow
                  position={{
                    lat: selectedMarker.location.coordinates.lat,
                    lng: selectedMarker.location.coordinates.lng
                  }}
                  onCloseClick={handleInfoWindowClose}
                >
                  <div className="text-sm bg-white">
                    <p className="font-semibold text-gray-900">{selectedMarker.title}</p>
                    <p className="text-gray-600 mb-2">{selectedMarker.price.toLocaleString()} DA</p>
                    <button
                      onClick={() => handleInfoWindowClick(selectedMarker)}
                      className="w-full bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      {t('property.details')}
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </main>

      <PropertyDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        properties={selectedProperties}
      />
    </div>
  );
} 