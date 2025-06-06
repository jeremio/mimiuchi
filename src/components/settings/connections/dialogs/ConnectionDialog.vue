<template>
  <v-dialog v-model="value" max-width="600">
    <v-card>
      <v-form v-model="form" @submit.prevent>
        <v-card-title>
          <span class="text-subtitle-1">{{ t('settings.connections.update') }}</span>
        </v-card-title>
        <v-divider class="pb-2" />
        <v-card-text>
          <v-row>
            <v-col :cols="12" class="d-flex justify-center">
              <v-icon
                icon="mdi-transit-connection-horizontal"
                size="20"
                color="secondary"
                class="mr-2"
              />
              <h2>{{ connection?.title }}</h2>
            </v-col>
            <v-col class="d-flex justify-center text-center px-8">
              <label
                v-if="connection?.type === 'ws'"
                class="text-subtitle-1"
              >
                {{ t('settings.connections.ws.description') }}
              </label>
              <label
                v-if="connection?.type === 'wh'"
                class="text-subtitle-1"
              >
                {{ t('settings.connections.wh.description') }}
                <v-col>
                  <code>=> { transcript: 'text here' }</code>
                </v-col>
              </label>
            </v-col>
            <v-col :cols="12" class="pt-2">
              <v-divider />
            </v-col>
          </v-row>
          <WebSocketOptions v-if="connection?.type === 'ws'" v-model="ws" />
          <WebHookOptions v-if="connection?.type === 'wh'" v-model="wh" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" @click="value = false">
            Cancel
          </v-btn>
          <v-btn :disabled="!form" type="submit" color="primary" variant="flat" @click="update_connection(connection)">
            Update
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import WebSocketOptions from '@/components/settings/connections/dialogs/WebSocketOptions.vue'
import WebHookOptions from '@/components/settings/connections/dialogs/WebHookOptions.vue'
import is_electron from '@/helpers/is_electron'
import type { Connection, ConnectionType } from '@/stores/connections'
import { useConnectionsStore } from '@/stores/connections'

const { t } = useI18n()
const props = defineProps<{ modelValue: boolean, connection: ConnectionType }>()

const emit = defineEmits(['update:modelValue'])

declare const window: any

const connectionsStore = useConnectionsStore()

const form = ref(false)
const ws = ref(<Connection>{})
const wh = ref(<Connection>{})

const value = computed({
  get() {
    return props.modelValue
  },
  set(modelValue: boolean) {
    ws.value = JSON.parse(JSON.stringify(connectionsStore.ws))
    wh.value = JSON.parse(JSON.stringify(connectionsStore.wh))
    emit('update:modelValue', modelValue)
  },
})

onMounted(() => {
  ws.value = JSON.parse(JSON.stringify(connectionsStore.ws))
  wh.value = JSON.parse(JSON.stringify(connectionsStore.wh))
})

function update_connection(connection: any) {
  switch (connection.type) {
    case 'ws':
      connectionsStore.ws = ws.value
      if (is_electron()) {
        if (connectionsStore.ws.enabled) {
          window.ipcRenderer.send('close-ws')
          window.ipcRenderer.send('start-ws', connectionsStore.ws.port)
        }
      }
      break
    case 'wh':
      connectionsStore.wh = wh.value
      connectionsStore.wh.enabled = true
      break
  }
  emit('update:modelValue', false)
}
</script>
