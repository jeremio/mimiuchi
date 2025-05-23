<template>
  <v-card :title="t('settings.word_replace.title')" :subtitle="t('settings.word_replace.description')" color="transparent" flat>
    <v-divider />
    <v-card-text>
      <v-card flat>
        <v-list-item :title="t('settings.word_replace.enabled')">
          <template #append>
            <v-switch
              v-model="wordReplaceStore.enabled"
              color="primary"
              hide-details
              inset
            />
          </template>
        </v-list-item>
      </v-card>
      <v-row class="mt-6">
        <v-col :cols="12" :sm="6">
          <v-card flat>
            <v-list-item :title="t('settings.word_replace.match_whole_word')">
              <template #append>
                <v-switch
                  v-model="wordReplaceStore.match_whole_word"
                  color="primary"
                  hide-details
                  inset
                />
              </template>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col :cols="12" :sm="6">
          <v-card flat>
            <v-list-item :title="t('settings.word_replace.match_case')">
              <template #append>
                <v-switch
                  v-model="wordReplaceStore.match_case"
                  color="primary"
                  hide-details
                  inset
                />
              </template>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <div v-if="replacements.length" class="mt-6">
        <v-row v-for="(replacement, i) in replacements">
          <v-col :cols="12" :sm="6" class="pt-1 pb-0">
            <v-text-field
              v-model="replacement.replacing"
              :label="t('settings.word_replace.replacing')"
              :rules="[exists]"
              append-icon="mdi-arrow-right-bold"
            />
          </v-col>
          <v-col :cols="10" :sm="6" class="pt-1 pb-0">
            <v-text-field
              v-model="replacement.replacement"
              :label="t('settings.word_replace.replacement')"
              hide-details
            >
              <template #append>
                <v-btn size="x-small" color="red" icon="mdi-minus" @click="remove_entry(i)" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </div>
      <p v-else class="mt-6">
        <i18n-t keypath="settings.word_replace.info" tag="label" scope="global">
          <template #icon>
            <v-icon
              color="primary"
              size="small"
            >
              mdi-plus-circle-outline
            </v-icon>
          </template>
        </i18n-t>
      </p>
      <v-card class="mt-4" color="transparent" flat>
        <v-card-actions>
          <v-btn color="primary" variant="outlined" size="small" icon="mdi-plus" @click="add_entry()" />
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWordReplaceStore } from '@/stores/word_replace'

const { t } = useI18n()
const wordReplaceStore = useWordReplaceStore()

const replacements = ref<{ replacing: string, replacement: string }[]>([])

function add_entry() {
  // this.wordReplaceStore.word_replacements[""] = ""
  replacements.value.push({
    replacing: '',
    replacement: '',
  })
}

function remove_entry(i: number) {
  replacements.value.splice(i, 1)
  // delete this.wordReplaceStore.word_replacements[this.replacement_list[i].replacing]
}

function exists(value: string) {
  return !value || replacements.value.filter((e: any) => value === e.replacing).length < 2 || `${value} already exists`
}

onMounted(() => {
  replacements.value = Object.entries(wordReplaceStore.word_replacements).map(([replacing, replacement]) => ({
    replacing,
    replacement,
  }))
  // console.log(this.replacements)
})

onUnmounted(() => {
  wordReplaceStore.word_replacements = {}

  replacements
    .value
    .sort((a, b) => a.replacing.localeCompare(b.replacing)) // Sort keys by locale (e.g., alphabetical sort)
    .sort((a, b) => b.replacing.length - a.replacing.length) // Sort keys by string length: longer strings to shorter strings
    .forEach((entry) => {
      wordReplaceStore.word_replacements[entry.replacing] = entry.replacement
    })

  wordReplaceStore.word_replacements_lowercase = {}

  Object.keys(wordReplaceStore.word_replacements).forEach((key) => {
    const keyLowerCase = key.toLowerCase()

    // First-come, first-serve.
    // For example, the replacement keys "Hello" and "hello" are both transformed to lowercase as "hello".
    // When ordered by locale, their order is ["hello", "Hello"]. The replacement entry for "hello" will be used in case-insensitive replacements.
    if (!wordReplaceStore.word_replacements_lowercase[keyLowerCase])
      wordReplaceStore.word_replacements_lowercase[keyLowerCase] = wordReplaceStore.word_replacements[key]
  })
})
</script>
