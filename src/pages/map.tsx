import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { PropertyMap } from '@/components/PropertyMap';
import { fetchProperties } from '@/lib/api';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

export default function MapPage() {
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
    <div className="h-[calc(100vh-4rem)]">
      <PropertyMap properties={properties} />
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