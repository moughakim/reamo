import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();

  const changeLanguage = (locale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <div className="flex items-center space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            i18n.language === lang.code
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
} 