import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const light = {
    dark: false,
    colors: {
      background: '#dddddd',
      surface: '#FFFFFF',
      primary: '#ededed',
      secondary: '#555',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    }
}

const dark = {
    dark: true,
    colors: {
      background: '#293340',
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