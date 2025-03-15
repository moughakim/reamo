import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyFilters } from '@/components/PropertyFilters';
import { fetchProperties } from '@/lib/api';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

export default function ResidencesPage() {
  const { t } = useTranslation();
  const { setProperties, filteredProperties } = useStore();

  useEffect(() => {
    const loadProperties = async () => {
      const properties = await fetchProperties();
      setProperties(properties);
    };
    loadProperties();
  }, [setProperties]);

  const properties = filteredProperties();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('navigation.residences')}</h1>
          <p className="text-lg text-gray-600">
            {t('common.discoverProperties')}
          </p>
        </div>

        <PropertyFilters />

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('common.noProperties')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}; 