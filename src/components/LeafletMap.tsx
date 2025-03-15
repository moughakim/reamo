import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { Property } from '@/types/property';
import 'leaflet/dist/leaflet.css';
import '@changey/react-leaflet-markercluster/dist/styles.min.css';

function SetViewOnChange({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
}

interface LeafletMapProps {
  center: [number, number];
  properties: Property[];
  onMarkerClick: (property: Property) => void;
  onClusterClick: (properties: Property[]) => void;
}

export function LeafletMap({ 
  center, 
  properties, 
  onMarkerClick, 
  onClusterClick 
}: LeafletMapProps) {
  useEffect(() => {
    // Initialize Leaflet icons
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnChange coords={center} />
      
      <MarkerClusterGroup
        showCoverageOnHover={false}
        maxClusterRadius={40}
        onClusterClick={(cluster) => {
          const markers = cluster.getAllChildMarkers() as any[];
          const clusterProperties = markers.map(marker => (marker as any)._propertyData);
          onClusterClick(clusterProperties);
        }}
      >
        {properties.map((property) => {
          const position: [number, number] = [
            property.location.coordinates.lat,
            property.location.coordinates.lng
          ];
          
          return (
            <Marker
              key={property.id}
              position={position}
              eventHandlers={{
                click: () => onMarkerClick(property),
              }}
              ref={(markerRef) => {
                if (markerRef) {
                  (markerRef as any)._propertyData = property;
                }
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{property.title}</p>
                  <p className="text-gray-600">${property.price.toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
} 