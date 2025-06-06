<template>
  <v-card :title="t('settings.connections.title')" color="transparent" flat>
    <template #subtitle>
      <i18n-t keypath="settings.connections.description" tag="label" scope="global">
        <template #icon>
          <v-icon color="success">
            mdi-broadcast
          </v-icon>
        </template>
      </i18n-t>
    </template>
    <ConnectionDialog v-model="dialog" :connection="connection_type" />
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col :cols="12">
          <v-card flat>
            <v-card class="py-2" flat>
              <v-list-item :title="t('settings.connections.ws.name')" subtitle="websocket">
                <template #prepend>
                  <v-icon
                    icon="mdi-transit-connection-horizontal"
                    size="30"
                    color="secondary"
                    class="mr-4"
                  />
                </template>
                <v-spacer />
                <template #append>
                  <v-btn
                    class="mr-4"
                    icon variant="text"
                    @click.stop="open_dialog({ title: 'Websocket', icon: 'mdi-transit-connection-horizontal', type: 'ws' })"
                  >
                    <v-icon>mdi-cog</v-icon>
                  </v-btn>
                  <v-switch v-model="connectionsStore.ws.enabled" color="primary" inset hide-details />
                </template>
              </v-list-item>
            </v-card>
          </v-card>
        </v-col>
        <v-col :cols="12">
          <v-card flat>
            <v-card class="py-2" flat>
              <v-list-item title="Webhook">
                <template #prepend>
                  <v-icon
                    :icon="connectionsStore.wh.icon"
                    size="30"
                    color="secondary"
                    class="mr-4"
                  />
                </template>
                <v-spacer />
                <template #append>
                  <v-btn
                    v-if="connectionsStore.wh.enabled"
                    class="mr-4"
                    icon
                    variant="text"
                    @click.stop="open_dialog({ title: 'Webhook', icon: 'mdi-webhook', type: 'wh' })"
                  >
                    <v-icon>mdi-cog</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="!connectionsStore.wh.enabled"
                    icon
                    color="success"
                    variant="text"
                    @click.stop="open_dialog({ title: 'Webhook', icon: 'mdi-webhook', type: 'wh' })"
                  >
                    <v-icon>mdi-plus-circle</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="connectionsStore.wh.enabled"
                    icon
                    color="error"
                    variant="text"
                    @click.stop="clear_wh()"
                  >
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import ConnectionDialog from '@/components/settings/connections/dialogs/ConnectionDialog.vue'
import is_electron from '@/helpers/is_electron'
import type { ConnectionType } from '@/stores/connections'
import { useConnectionsStore } from '@/stores/connections'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
declare const window: any

const connectionsStore = useConnectionsStore()

const dialog = ref(false)
const connection_type = ref(<ConnectionType>{})

// const connection_options = ref<ConnectionType[]>([
//   {
//     title: 'Webhook',
//     type: 'wh',
//     icon: 'mdi-webhook',
//   },
// ])
// const snackbar = ref(false)
// const snackbar_text = ref('')
// const reset_dialog = ref(false)
// const appearance = ref(true)
// const settings = ref(true)
// const word_replace = ref(true)
// const speech = ref(true)

const { ws } = storeToRefs(connectionsStore)
watch(
  () => ws.value.enabled,
  (new_val: boolean) => {
    ws_toggled(new_val)
  },
  { deep: true },
)

onUnmounted(() => {
  if (is_electron())
    window.ipcRenderer.removeListener('websocket-error')
})

onMounted(() => {
  if (is_electron()) {
    // window.ipcRenderer.on('websocket-started', (event: any, data: any) => {
    //     // console.log("MEOW")
    // })
    window.ipcRenderer.on('websocket-error', () => {
      connectionsStore.ws.enabled = false
      console.log('error')
    })
  }
})

function open_dialog(connection: ConnectionType) {
  connection_type.value = connection
  dialog.value = true
}

function ws_toggled(value: boolean) {
  if (is_electron()) {
    if (value)
      window.ipcRenderer.send('start-ws', connectionsStore.ws.port)
    else
      window.ipcRenderer.send('close-ws')
  }

  // value = !value
}

function clear_wh() {
  connectionsStore.wh.enabled = false
  connectionsStore.wh.url = ''
}
</script>
