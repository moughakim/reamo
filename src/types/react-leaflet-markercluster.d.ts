declare module '@changey/react-leaflet-markercluster' {
  import { FC } from 'react';
  import { MarkerCluster } from 'leaflet';
  import { LayerProps } from '@react-leaflet/core';

  interface MarkerClusterGroupProps extends LayerProps {
    children: React.ReactNode;
    showCoverageOnHover?: boolean;
    maxClusterRadius?: number;
    onClusterClick?: (cluster: MarkerCluster) => void;
  }

  const MarkerClusterGroup: FC<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
} 