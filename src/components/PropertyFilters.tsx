import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const propertyTypes = [
  { value: 'house', label: 'house' },
  { value: 'apartment', label: 'apartment' },
  { value: 'land', label: 'land' },
  { value: 'commercial', label: 'commercial' },
  { value: 'condo', label: 'condo' },
  { value: 'townhouse', label: 'townhouse' },
];

const statusOptions = [
  { value: 'for-sale', label: 'forSale' },
  { value: 'for-rent', label: 'forRent' },
];

const bedOptions = [
  { value: 1, label: '1+' },
  { value: 2, label: '2+' },
  { value: 3, label: '3+' },
  { value: 4, label: '4+' },
  { value: 5, label: '5+' },
];

export function PropertyFilters() {
  const { t } = useTranslation();
  const filters = useStore((state) => state.filters);
  const setFilters = useStore((state) => state.setFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceChange = (min: number, max: number) => {
    setFilters({ ...filters, priceRange: [min, max] });
  };

  const handleSearchChange = (query: string) => {
    setFilters({ ...filters, searchQuery: query });
  };

  const handleTypeChange = (type: string) => {
    const newTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter((t) => t !== type)
      : [...filters.propertyType, type];
    setFilters({ ...filters, propertyType: newTypes });
  };

  const handleStatusChange = (status: string) => {
    setFilters({ ...filters, status });
  };

  const handleBedsChange = (beds: number) => {
    setFilters({ ...filters, beds: filters.beds === beds ? null : beds });
  };

  const handleCityChange = (city: string) => {
    setFilters({ ...filters, city });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{t('filters.title')}</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {isExpanded ? t('common.collapse') : t('common.expand')}
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden'}`}>
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.search')}
          </label>
          <input
            type="text"
            placeholder={t('filters.search')}
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.priceRange')}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              placeholder={t('filters.min')}
              value={filters.priceRange[0] || ''}
              onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder={t('filters.max')}
              value={filters.priceRange[1] || ''}
              onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.propertyType')}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleTypeChange(type.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  filters.propertyType.includes(type.value)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(`filters.types.${type.label}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.status')}
          </label>
          <div className="flex gap-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                  filters.status === status.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(`filters.statuses.${status.label}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Beds */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.beds')}
          </label>
          <div className="flex gap-2">
            {bedOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleBedsChange(option.value)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                  filters.beds === option.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label} {t('property.beds')}
              </button>
            ))}
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('filters.city')}
          </label>
          <input
            type="text"
            placeholder={t('filters.city')}
            value={filters.city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
} 