// themes
import { cotton_candy } from '@/plugins/themes/cotton_candy'
import { forest_dark } from '@/plugins/themes/forest_dark'

import { forest_light } from '@/plugins/themes/forest_light'

import { gold_dark } from '@/plugins/themes/gold_dark'
import { gold_light } from '@/plugins/themes/gold_light'

import { midnight_purple } from '@/plugins/themes/midnight_purple'
import { red_dark } from '@/plugins/themes/red_dark'
import { red_light } from '@/plugins/themes/red_light'
// Vuetify
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'midnight_purple',
    themes: {
      cotton_candy,
      midnight_purple,
      red_light,
      red_dark,
      gold_light,
      gold_dark,
      forest_light,
      forest_dark,
    },
  },
})
