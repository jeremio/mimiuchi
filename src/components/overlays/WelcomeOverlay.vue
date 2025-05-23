<template>
  <v-overlay
    v-model="overlay_state"
    transition="slide-x-transition"
    :contained="overlay_page !== 0"
    :class="overlay_page === 0 ? 'align-center justify-center' : 'align-end justify-end'"
  >
    <v-card
      v-if="overlay_page === 0" :title="t('welcome.intro.title', { name: APP_NAME })" class="pa-2"
      max-width="500"
    >
      <template #prepend>
        <v-avatar
          color="transparent"
        >
          <v-img :src="logo" />
        </v-avatar>
      </template>
      <v-card-text class="text-subtitle-1 py-2">
        {{ t('welcome.intro.description', { name: APP_NAME }) }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="overlay_state = false">
          {{ t('welcome.intro.button') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-scroll-x-transition>
      <v-card v-if="overlay_page === 1" :title="t('welcome.controls.title')" class="mb-2 mr-8">
        <v-divider class="mb-2" />
        <v-card-text class="text-subtitle-1 py-">
          <v-icon class="me-1" color="success">
            mdi-broadcast
          </v-icon>
          <v-icon class="me-1" color="error">
            mdi-broadcast-off
          </v-icon>
          <span class="subheading me-2">{{ t('welcome.controls.broadcast') }}</span>
        </v-card-text>
        <v-card-text class="text-subtitle-1 py-2">
          <v-icon class="me-1" color="success">
            mdi-microphone
          </v-icon>
          <v-icon class="me-1" color="error">
            mdi-microphone-off
          </v-icon>
          <span class="subheading me-2">{{ t('welcome.controls.mic') }}</span>
        </v-card-text>
        <v-card-text class="text-subtitle-1 py-2">
          <v-icon class="me-1">
            mdi-cog
          </v-icon>
          <span class="subheading me-2">{{ t('welcome.controls.settings') }}</span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="overlay_state = false">
            {{ t('welcome.controls.button') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-scroll-x-transition>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import logo from '@/assets/logo-256x256.png'

const props = defineProps<{ overlay: boolean, page: number }>()
const { t } = useI18n()
const APP_NAME = __APP_NAME__
const settingsStore = useSettingsStore()

const overlay_state = ref(props.overlay)
const overlay_page = ref(props.page)

watch(() => props.overlay, (new_val) => {
  overlay_state.value = new_val
})

watch(overlay_state, (new_val) => {
  if (!new_val && overlay_page.value === 0) {
    overlay_state.value = true
    overlay_page.value++
  }
  else if (overlay_page.value === 1) {
    settingsStore.welcome = false
  }
})
</script>
