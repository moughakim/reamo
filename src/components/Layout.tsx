import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0];
  const isRTL = currentLanguage.dir === 'rtl';

  const navigation = [
    { name: t('navigation.residences'), href: '/residences' },
    { name: t('navigation.map'), href: '/map' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: languageCode });
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen ${isRTL ? 'font-arabic' : ''}`}>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Image
                        width={32}
                        height={32}
                        className="h-8 w-auto"
                        src="/logo.png"
                        alt="Logo"
                      />
                    </Link>
                  </div>
                  <div className={`hidden sm:ml-6 sm:flex sm:space-x-8 ${isRTL ? 'sm:space-x-reverse' : ''}`}>
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`inline-flex items-center ${
                          router.pathname === item.href
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        } px-1 pt-1 border-b-2 text-sm font-medium`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <GlobeAltIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                      <span>{currentLanguage.name}</span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {languages.map((language) => (
                          <Menu.Item key={language.code}>
                            {({ active }) => (
                              <button
                                onClick={() => handleLanguageChange(language.code)}
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } ${
                                  router.locale === language.code ? 'font-medium' : ''
                                } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                                dir={language.dir}
                              >
                                {language.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">{t('common.openMenu')}</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.href}
                    as={Link}
                    href={item.href}
                    className={`block py-2 px-3 ${
                      router.pathname === item.href
                        ? 'border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                    } text-base font-medium`}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="space-y-1">
                  {languages.map((language) => (
                    <Disclosure.Button
                      key={language.code}
                      as="button"
                      onClick={() => handleLanguageChange(language.code)}
                      className={`block w-full px-4 py-2 text-left text-base font-medium ${
                        router.locale === language.code
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                      dir={language.dir}
                    >
                      {language.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </div>
  );
} 