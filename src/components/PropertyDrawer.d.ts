import { Property } from '@/types/property';

export interface PropertyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}

export function PropertyDrawer(props: PropertyDrawerProps): JSX.Element; 