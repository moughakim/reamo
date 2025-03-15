import { Property } from '@/types/property';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useTranslation();

  return (
    <Link 
      href={`/residences/${property.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden"
    >
      <div className="relative w-full h-[240px] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-900 shadow-sm">
          {property.status === 'for-sale' ? t('property.forSale') : t('property.forRent')}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 truncate flex-1">
            {property.title}
          </h3>
          <p className="text-xl font-semibold text-blue-600 ml-4">
            ${property.price.toLocaleString()}
          </p>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 truncate flex items-center">
          <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location.address}, {property.location.city}, {property.location.state}
        </p>
        
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-sm font-medium text-gray-900">{property.beds}</span>
            <span className="text-xs text-gray-500">{t('property.beds')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">{property.baths}</span>
            <span className="text-xs text-gray-500">{t('property.baths')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="text-sm font-medium text-gray-900">{property.sqft.toLocaleString()}</span>
            <span className="text-xs text-gray-500">{t('property.sqft')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 