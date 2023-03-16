import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const light = {
    dark: false,
    colors: {
      background: '#dddddd',
      primary: '#ededed',
      secondary: '#20a78c',
      navbar: '#fff',
      color: '#000000',
      cardprimary: '#fff'
    }
}

const dark = {
    dark: true,
    colors: {
      background: '#293340',
      primary: '#161b22',
      secondary: '#20a78c',
      navbar: '#161b22',
      color: '#fff',
      cardprimary: '#293340'
    }
}


export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
          light,
          dark,
        }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})