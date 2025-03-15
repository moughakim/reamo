import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Property } from '@/types/property';
import { useTranslation } from 'next-i18next';

interface PropertyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}

export function PropertyDrawer({ isOpen, onClose, properties }: PropertyDrawerProps) {
  const { t } = useTranslation();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 sm:px-6 py-6 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          {properties.length > 1
                            ? t('property.propertiesInArea', { count: properties.length })
                            : t('property.details')}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="sr-only">{t('common.close')}</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1 px-4 sm:px-6">
                      <div className="space-y-6">
                        {properties.map((property) => (
                          <div
                            key={property.id}
                            className="bg-white shadow sm:rounded-lg overflow-hidden"
                          >
                            <div className="relative h-48">
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                {property.title}
                              </h3>
                              <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>{property.description}</p>
                              </div>
                              <div className="mt-3 text-sm">
                                <span className="font-medium text-gray-900">
                                  ${property.price.toLocaleString()}
                                </span>
                              </div>
                              <div className="mt-5">
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  onClick={() => {
                                    // Handle contact action
                                  }}
                                >
                                  {t('contact.contactUs')}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 