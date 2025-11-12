<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:apple-logo-fill" class="mx-auto text-7xl text-green-600 dark:text-green-400 mb-6" />
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.safeFoodsVisualization.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.safeFoodsVisualization.description") }}
        </p>
        <button @click="startExercise" class="mx-auto flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("safeFoodsVisualization.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <div v-if="exerciseActive" class="border-4 border-green-300 dark:border-green-600 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-8 md:p-12 rounded-2xl">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6 text-center">{{ $t("safeFoodsVisualization.session.title") }}</h2>
        
        <div class="mb-8 p-8 bg-white dark:bg-slate-800 rounded-lg border-2 border-green-200 dark:border-green-700">
          <p class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-4">{{ currentGuidance }}</p>
          <p class="text-lg text-gray-600 dark:text-slate-300">{{ currentDescription }}</p>
        </div>

        <div class="mb-6">
          <p class="text-center text-gray-600 dark:text-slate-400 mb-2">{{ $t("safeFoodsVisualization.session.progress") }}: {{ currentStep + 1 }} / {{ steps.length }}</p>
          <div class="h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
            <div class="h-full bg-green-600 dark:bg-green-400 transition-all duration-300 rounded-full" :style="{ width: ((currentStep + 1) / steps.length) * 100 + '%' }"></div>
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <button v-if="currentStep > 0" @click="previousStep" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("safeFoodsVisualization.buttons.previous") }}
          </button>
          <button @click="nextStep" class="bg-green-600 hover:bg-green-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ currentStep < steps.length - 1 ? $t("safeFoodsVisualization.buttons.next") : $t("safeFoodsVisualization.buttons.finish") }}
          </button>
          <button @click="stopExercise" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("safeFoodsVisualization.buttons.stop") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="exerciseCompleted" class="text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 mb-4" />
      <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{{ $t("safeFoodsVisualization.completion.title") }}</h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">{{ $t("safeFoodsVisualization.completion.message") }}</p>
      <button @click="restartExercise" class="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg font-bold text-white rounded-lg transition-colors">
        {{ $t("safeFoodsVisualization.buttons.tryAgain") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const { t } = useI18n()

const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const currentStep = ref(0)

const steps = computed(() => [
  { guidance: t('safeFoodsVisualization.steps.prepare.guidance'), description: t('safeFoodsVisualization.steps.prepare.description') },
  { guidance: t('safeFoodsVisualization.steps.visualize.guidance'), description: t('safeFoodsVisualization.steps.visualize.description') },
  { guidance: t('safeFoodsVisualization.steps.confidence.guidance'), description: t('safeFoodsVisualization.steps.confidence.description') }
])

const currentGuidance = computed(() => steps.value[currentStep.value]?.guidance || '')
const currentDescription = computed(() => steps.value[currentStep.value]?.description || '')

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  currentStep.value = 0
}

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  } else {
    completeExercise()
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
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

const completeExercise = () => {
  exerciseActive.value = false
  exerciseCompleted.value = true
}
</script>

