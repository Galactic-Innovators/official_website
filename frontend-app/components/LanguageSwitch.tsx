'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200"
    >
      {language === 'en' ? '中文' : 'English'}
    </button>
  )
}

