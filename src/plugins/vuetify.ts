import type { IconProps, IconSet } from 'vuetify'
// Vuetify
import { h } from 'vue'
import { createVuetify } from 'vuetify'

// additional components
import { VIconBtn } from 'vuetify/labs/VIconBtn'
// custom icons
import obs from '@/assets/icons/obs.vue'

import { cotton_candy } from '@/plugins/themes/cotton_candy'
import { forest_dark } from '@/plugins/themes/forest_dark'
import { forest_light } from '@/plugins/themes/forest_light'
import { gold_dark } from '@/plugins/themes/gold_dark'
import { gold_light } from '@/plugins/themes/gold_light'
// themes
import { midnight_purple } from '@/plugins/themes/midnight_purple'
import { red_dark } from '@/plugins/themes/red_dark'
import { red_light } from '@/plugins/themes/red_light'

// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'

const customSvgNameToComponent: any = {
  obs,
}
const custom: IconSet = {
  component: (props: IconProps) =>
    h(props.tag, [h(customSvgNameToComponent[props.icon as string], { class: 'v-icon__svg' })]),
}

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
  components: {
    VIconBtn,
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      custom,
    },
  },
})
