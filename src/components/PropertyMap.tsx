import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker, InfoWindow } from '@react-google-maps/api';
import type { Clusterer } from '@react-google-maps/marker-clusterer';
import { Property } from '@/types/property';
import { PropertyDrawer } from './PropertyDrawer';
import { useTranslation } from 'next-i18next';
import { Layout } from '@/components/Layout';
import { MapIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
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
    setSelectedProperties([property]);
    setSelectedMarker(property);
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
    <Layout>
      <div className="flex flex-col h-screen">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {t('navigation.map')}
              </h1>
              <div className="flex items-center space-x-4">
                <Link
                  href="/residences"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ListBulletIcon className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
                  {t('navigation.list')}
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="h-full">
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
                  ]
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
                    <div className="text-sm">
                      <p className="font-semibold">{selectedMarker.title}</p>
                      <p className="text-gray-600">${selectedMarker.price.toLocaleString()}</p>
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
    </Layout>
  );
} 