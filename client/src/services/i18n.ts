import i18next from 'i18next'
import backend from 'i18next-xhr-backend'

export const init = () => i18next.use(backend).init({
  fallbackLng: 'es',
  preload: ['es'],
  debug: process.env.NODE_ENV === 'development',
  backend: {
    loadPath: '/translations/{{lng}}.json',
    crossDomain: false,
  },
})

export const $t = i18next.t.bind(i18next)