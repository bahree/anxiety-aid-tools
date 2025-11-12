<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:tag-fill" class="mx-auto text-7xl text-teal-600 dark:text-teal-400 animate-pulse" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.ocdThoughtLabeling.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.ocdThoughtLabeling.description") }}
        </p>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 dark:from-teal-500 dark:to-cyan-500 dark:hover:from-teal-600 dark:hover:to-cyan-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("ocdThoughtLabeling.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseStarted && !exerciseCompleted" class="border-4 border-teal-300 dark:border-teal-600 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-900/30 dark:via-cyan-900/30 dark:to-blue-900/30 p-8 md:p-12 rounded-2xl">
      <div class="max-w-4xl mx-auto">
        <!-- Current Thought Input -->
        <div v-if="!currentThought" class="mb-8">
          <label class="block text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3">
            {{ $t("ocdThoughtLabeling.session.enterThought") }}
          </label>
          <textarea
            v-model="thoughtInput"
            :placeholder="$t('ocdThoughtLabeling.session.thoughtPlaceholder')"
            class="w-full border-2 border-teal-300 dark:border-teal-600 rounded-lg p-4 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100"
            rows="4"
          ></textarea>
          <button
            @click="setCurrentThought"
            :disabled="!thoughtInput.trim()"
            class="mt-4 w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 px-6 py-3 font-medium text-white rounded-lg transition-colors disabled:opacity-50"
          >
            {{ $t("ocdThoughtLabeling.buttons.labelThought") }}
          </button>
        </div>

        <!-- Label Selection -->
        <div v-if="currentThought" class="mb-8">
          <h3 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
            {{ $t("ocdThoughtLabeling.session.selectLabels") }}
          </h3>
          <div class="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-teal-200 dark:border-teal-700">
            <p class="text-gray-800 dark:text-slate-100">{{ currentThought }}</p>
          </div>
          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <button
              v-for="label in ocdLabels"
              :key="label.id"
              @click="toggleLabel(label.id)"
              class="p-4 border-2 rounded-lg text-left transition-all"
              :class="selectedLabels.includes(label.id)
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-teal-300'"
            >
              <div class="flex items-center gap-3">
                <Icon :name="label.icon" class="text-2xl" :class="selectedLabels.includes(label.id) ? 'text-teal-600' : 'text-gray-400'" />
                <div>
                  <p class="font-semibold text-gray-800 dark:text-slate-100">{{ label.name }}</p>
                  <p class="text-sm text-gray-600 dark:text-slate-400">{{ label.description }}</p>
                </div>
              </div>
            </button>
          </div>
          <div class="flex gap-4 mt-6">
            <button
              @click="saveThought"
              :disabled="selectedLabels.length === 0"
              class="flex-1 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 px-6 py-3 font-medium text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {{ $t("ocdThoughtLabeling.buttons.save") }}
            </button>
            <button
              @click="clearCurrentThought"
              class="px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              {{ $t("ocdThoughtLabeling.buttons.cancel") }}
            </button>
          </div>
        </div>

        <!-- Labeled Thoughts List -->
        <div v-if="labeledThoughts.length > 0" class="mb-8">
          <h3 class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
            {{ $t("ocdThoughtLabeling.session.labeledThoughts") }} ({{ labeledThoughts.length }})
          </h3>
          <div class="space-y-4">
            <div
              v-for="(thought, index) in labeledThoughts"
              :key="index"
              class="p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-teal-200 dark:border-teal-700"
            >
              <p class="mb-3 text-gray-800 dark:text-slate-100">{{ thought.text }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="labelId in thought.labels"
                  :key="labelId"
                  class="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 rounded-full text-sm font-medium"
                >
                  {{ getLabelById(labelId).name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex gap-4">
          <button
            @click="completeExercise"
            class="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 px-6 py-3 font-medium text-white rounded-lg transition-colors"
          >
            {{ $t("ocdThoughtLabeling.buttons.finish") }}
          </button>
          <button
            @click="resetExercise"
            class="px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {{ $t("ocdThoughtLabeling.buttons.reset") }}
          </button>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 mb-4" />
        <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">
          {{ $t("ocdThoughtLabeling.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("ocdThoughtLabeling.completion.message") }}
        </p>
        <button
          @click="resetExercise"
          class="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 px-8 py-4 text-lg font-bold text-white rounded-lg transition-colors"
        >
          {{ $t("ocdThoughtLabeling.buttons.tryAgain") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const { t } = useI18n()

const exerciseSection = ref(null)
const exerciseStarted = ref(false)
const exerciseCompleted = ref(false)
const thoughtInput = ref('')
const currentThought = ref('')
const selectedLabels = ref([])
const labeledThoughts = ref([])

const ocdLabels = computed(() => [
  {
    id: 'obsession',
    name: t('ocdThoughtLabeling.labels.obsession.name'),
    description: t('ocdThoughtLabeling.labels.obsession.description'),
    icon: 'ph:brain-fill'
  },
  {
    id: 'intrusive',
    name: t('ocdThoughtLabeling.labels.intrusive.name'),
    description: t('ocdThoughtLabeling.labels.intrusive.description'),
    icon: 'ph:lightning-fill'
  },
  {
    id: 'thoughtActionFusion',
    name: t('ocdThoughtLabeling.labels.thoughtActionFusion.name'),
    description: t('ocdThoughtLabeling.labels.thoughtActionFusion.description'),
    icon: 'ph:link-fill'
  },
  {
    id: 'compulsionUrge',
    name: t('ocdThoughtLabeling.labels.compulsionUrge.name'),
    description: t('ocdThoughtLabeling.labels.compulsionUrge.description'),
    icon: 'ph:hand-fill'
  },
  {
    id: 'uncertainty',
    name: t('ocdThoughtLabeling.labels.uncertainty.name'),
    description: t('ocdThoughtLabeling.labels.uncertainty.description'),
    icon: 'ph:question-fill'
  },
  {
    id: 'perfectionism',
    name: t('ocdThoughtLabeling.labels.perfectionism.name'),
    description: t('ocdThoughtLabeling.labels.perfectionism.description'),
    icon: 'ph:star-fill'
  },
  {
    id: 'contamination',
    name: t('ocdThoughtLabeling.labels.contamination.name'),
    description: t('ocdThoughtLabeling.labels.contamination.description'),
    icon: 'ph:bug-fill'
  },
  {
    id: 'harm',
    name: t('ocdThoughtLabeling.labels.harm.name'),
    description: t('ocdThoughtLabeling.labels.harm.description'),
    icon: 'ph:warning-fill'
  },
  {
    id: 'symmetry',
    name: t('ocdThoughtLabeling.labels.symmetry.name'),
    description: t('ocdThoughtLabeling.labels.symmetry.description'),
    icon: 'ph:arrows-left-right-fill'
  }
])

const getLabelById = (id) => {
  return ocdLabels.value.find(l => l.id === id) || { name: id }
}

const startExercise = () => {
  exerciseStarted.value = true
  exerciseCompleted.value = false
}

const setCurrentThought = () => {
  if (thoughtInput.value.trim()) {
    currentThought.value = thoughtInput.value.trim()
    thoughtInput.value = ''
    selectedLabels.value = []
  }
}

const clearCurrentThought = () => {
  currentThought.value = ''
  selectedLabels.value = []
}

const toggleLabel = (labelId) => {
  const index = selectedLabels.value.indexOf(labelId)
  if (index > -1) {
    selectedLabels.value.splice(index, 1)
  } else {
    selectedLabels.value.push(labelId)
  }
}

const saveThought = () => {
  if (currentThought.value && selectedLabels.value.length > 0) {
    labeledThoughts.value.push({
      text: currentThought.value,
      labels: [...selectedLabels.value]
    })
    clearCurrentThought()
  }
}

const resetExercise = () => {
  exerciseStarted.value = false
  exerciseCompleted.value = false
  thoughtInput.value = ''
  currentThought.value = ''
  selectedLabels.value = []
  labeledThoughts.value = []
}

const completeExercise = () => {
  exerciseStarted.value = false
  exerciseCompleted.value = true
}
</script>

