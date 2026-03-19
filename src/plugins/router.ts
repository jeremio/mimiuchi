import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

import Connections from '@/components/settings/connections/Connections.vue'
import OSCTriggers from '@/components/settings/osctriggers/OSCTriggers.vue'
import Home from '@/pages/Home.vue'
import Settings from '@/pages/Settings.vue'
import Appearance from '@/pages/settings/Appearance.vue'
import SettingsGeneral from '@/pages/settings/General.vue'
import OSC from '@/pages/settings/OSC.vue'
import STT from '@/pages/settings/STT.vue'
import Translation from '@/pages/settings/Translation.vue'
import TTS from '@/pages/settings/TTS.vue'
import WordReplace from '@/pages/settings/WordReplace.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home,
      // Header,
      Footer,
    },
  },
  {
    path: '/settings/',
    name: 'settings',
    components: {
      Header,
      default: Settings,
      Footer,
    },
    children: [
      {
        path: 'general',
        name: 'general',
        component: SettingsGeneral,
      },
      {
        path: 'appearance',
        name: 'appearance',
        component: Appearance,
      },
      {
        path: 'stt',
        name: 'stt',
        component: STT,
      },
      {
        path: 'tts',
        name: 'tts',
        component: TTS,
      },
      {
        path: 'wordreplace',
        name: 'wordreplace',
        component: WordReplace,
      },
      {
        path: 'translation',
        name: 'translation',
        component: Translation,
      },
      {
        path: 'connections',
        name: 'connections',
        component: Connections,
      },
      {
        path: 'osc',
        name: 'osc',
        component: OSC,
      },
      {
        path: 'osctriggers',
        name: 'osctriggers',
        component: OSCTriggers,
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory('./'),
  routes: routes as RouteRecordRaw[],
})
