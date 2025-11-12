<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:target-fill" class="mx-auto text-7xl text-pink-600 dark:text-pink-400 mb-6" />
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.sensationLabeling.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.sensationLabeling.description") }}
        </p>
        <button @click="startExercise" class="mx-auto flex items-center gap-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("sensationLabeling.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <div v-if="exerciseActive" class="border-4 border-pink-300 dark:border-pink-600 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 p-8 md:p-12 rounded-2xl">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6 text-center">{{ $t("sensationLabeling.session.title") }}</h2>
        
        <div class="mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-pink-200 dark:border-pink-700">
          <label class="block text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">{{ $t("sensationLabeling.session.whatDoYouFeel") }}</label>
          <textarea
            v-model="sensationText"
            :placeholder="$t('sensationLabeling.session.sensationPlaceholder')"
            class="w-full border-2 border-pink-300 dark:border-pink-600 rounded-lg p-4 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100"
            rows="4"
          ></textarea>
        </div>

        <div class="mb-8">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">{{ $t("sensationLabeling.session.labelIt") }}</h3>
          <div class="grid gap-3 md:grid-cols-2">
            <button
              v-for="label in labels"
              :key="label.id"
              @click="selectLabel(label.id)"
              class="p-4 border-2 rounded-lg text-left transition-all"
              :class="selectedLabel === label.id
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-pink-300'"
            >
              <p class="font-semibold text-gray-800 dark:text-slate-100">{{ label.name }}</p>
              <p class="text-sm text-gray-600 dark:text-slate-400">{{ label.description }}</p>
            </button>
          </div>
        </div>

        <div v-if="selectedLabel" class="mb-6 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border-2 border-pink-200 dark:border-pink-700">
          <p class="text-gray-800 dark:text-slate-100">{{ getLabelById(selectedLabel).insight }}</p>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="saveSensation" :disabled="!sensationText.trim() || !selectedLabel" class="bg-pink-600 hover:bg-pink-700 px-6 py-3 font-medium text-white rounded-lg transition-colors disabled:opacity-50">
            {{ $t("sensationLabeling.buttons.save") }}
          </button>
          <button @click="stopExercise" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("sensationLabeling.buttons.stop") }}
          </button>
        </div>

        <div v-if="labeledSensations.length > 0" class="mt-8">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">{{ $t("sensationLabeling.session.labeledSensations") }}</h3>
          <div class="space-y-3">
            <div v-for="(sensation, index) in labeledSensations" :key="index" class="p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-pink-200 dark:border-pink-700">
              <p class="text-gray-800 dark:text-slate-100 mb-2">{{ sensation.text }}</p>
              <span class="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium">
                {{ getLabelById(sensation.label).name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="exerciseCompleted" class="text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 mb-4" />
      <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{{ $t("sensationLabeling.completion.title") }}</h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">{{ $t("sensationLabeling.completion.message") }}</p>
      <button @click="restartExercise" class="bg-pink-600 hover:bg-pink-700 px-8 py-4 text-lg font-bold text-white rounded-lg transition-colors">
        {{ $t("sensationLabeling.buttons.tryAgain") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const { t } = useI18n()

const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const sensationText = ref('')
const selectedLabel = ref(null)
const labeledSensations = ref([])

const labels = computed(() => [
  {
    id: 'anxiety',
    name: t('sensationLabeling.labels.anxiety.name'),
    description: t('sensationLabeling.labels.anxiety.description'),
    insight: t('sensationLabeling.labels.anxiety.insight')
  },
  {
    id: 'actual',
    name: t('sensationLabeling.labels.actual.name'),
    description: t('sensationLabeling.labels.actual.description'),
    insight: t('sensationLabeling.labels.actual.insight')
  },
  {
    id: 'uncertain',
    name: t('sensationLabeling.labels.uncertain.name'),
    description: t('sensationLabeling.labels.uncertain.description'),
    insight: t('sensationLabeling.labels.uncertain.insight')
  }
])

const getLabelById = (id) => labels.value.find(l => l.id === id) || { name: id, insight: '' }

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  sensationText.value = ''
  selectedLabel.value = null
  labeledSensations.value = []
}

const selectLabel = (labelId) => {
  selectedLabel.value = labelId
}

const saveSensation = () => {
  if (sensationText.value.trim() && selectedLabel.value) {
    labeledSensations.value.push({
      text: sensationText.value.trim(),
      label: selectedLabel.value
    })
    sensationText.value = ''
    selectedLabel.value = null
  }
}

const stopExercise = () => {
  exerciseActive.value = false
  exerciseCompleted.value = false
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => startExercise(), 100)
}
</script>

