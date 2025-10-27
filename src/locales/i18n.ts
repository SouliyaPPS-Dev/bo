import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enData from './en.json' with { type: 'json' }
import loData from './lo.json' with { type: 'json' }

// Type assertion for JSON imports
const en = enData as Record<string, string>
const lo = loData as Record<string, string>

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('language') || 'en'

// Set initial HTML lang attribute
document.documentElement.lang = savedLanguage

void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      lo: { translation: lo },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng)
  // Update HTML lang attribute for font switching
  document.documentElement.lang = lng
})

export default i18n

