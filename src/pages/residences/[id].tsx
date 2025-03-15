import { ContactModal } from '@/components/ContactModal';
import { useProperty } from '@/hooks/useProperty';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps, GetStaticPaths } from 'next';

export default function PropertyDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: property, isLoading, error } = useProperty(id as string);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-[600px] bg-gray-100 rounded-xl mb-4" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-100 rounded w-3/4" />
                  <div className="h-6 bg-gray-100 rounded w-1/2" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-100 rounded-lg" />
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-100 rounded w-1/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                    <div className="h-4 bg-gray-100 rounded w-4/6" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-xl h-64" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">
              {t('common.notFound')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('common.error')}
            </p>
            <button
              onClick={() => router.push('/residences')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t('common.backToListings')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={property.images[selectedImageIndex]}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {property.images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative h-24 rounded-lg overflow-hidden shadow-sm transition-all ${
                  selectedImageIndex === index
                    ? 'ring-2 ring-blue-500 shadow-md'
                    : 'hover:opacity-90 hover:shadow-md'
                }`}
              >
                <Image
                  src={image}
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  {property.title}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  {property.location.address}, {property.location.city},{' '}
                  {property.location.state} {property.location.zipCode}
                </p>
              </div>
              <p className="text-3xl font-semibold text-blue-600">
                ${property.price.toLocaleString()}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">{t('property.beds')}</p>
                <p className="text-lg font-medium text-gray-900">{property.beds}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">{t('property.baths')}</p>
                <p className="text-lg font-medium text-gray-900">{property.baths}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">{t('property.sqft')}</p>
                <p className="text-lg font-medium text-gray-900">{property.sqft.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">{t('property.type')}</p>
                <p className="text-lg font-medium text-gray-900">{property.type}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('property.description')}</h2>
              <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('property.features')}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {t('property.interested')}
              </h2>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t('property.contactBroker')}
              </button>
              <div className="mt-6 space-y-2 text-sm text-gray-500">
                <p>{t('property.propertyId')}: {property.id}</p>
                <p>{t('property.listed')}: {new Date(property.createdAt).toLocaleDateString()}</p>
                <p>{t('property.lastUpdated')}: {new Date(property.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <ContactModal
          property={property}
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
}; 