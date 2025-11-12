<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:leaf-fill" class="mx-auto text-7xl text-emerald-600 dark:text-emerald-400 mb-6" />
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.ocdMindfulness.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.ocdMindfulness.description") }}
        </p>
        <button @click="startExercise" class="mx-auto flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("ocdMindfulness.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <div v-if="exerciseActive" class="border-4 border-emerald-300 dark:border-emerald-600 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-8 md:p-12 rounded-2xl">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6">{{ $t("ocdMindfulness.session.title") }}</h2>
        
        <div class="mb-8 p-8 bg-white dark:bg-slate-800 rounded-lg border-2 border-emerald-200 dark:border-emerald-700">
          <p class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-4">{{ currentGuidance }}</p>
          <p class="text-lg text-gray-600 dark:text-slate-300">{{ currentDescription }}</p>
        </div>

        <div class="mb-6">
          <p class="text-gray-600 dark:text-slate-400 mb-2">{{ $t("ocdMindfulness.session.timeElapsed") }}: {{ formatTime(elapsedTime) }}</p>
          <div class="h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 rounded-full" :style="{ width: Math.min((elapsedTime / targetTime) * 100, 100) + '%' }"></div>
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="stopExercise" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("ocdMindfulness.buttons.stop") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="exerciseCompleted" class="text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 mb-4" />
      <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{{ $t("ocdMindfulness.completion.title") }}</h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">{{ $t("ocdMindfulness.completion.message") }}</p>
      <button @click="restartExercise" class="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-lg font-bold text-white rounded-lg transition-colors">
        {{ $t("ocdMindfulness.buttons.tryAgain") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const { t } = useI18n()

const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const elapsedTime = ref(0)
const currentStep = ref(0)
const targetTime = 300000 // 5 minutes

let timerInterval = null

const guidanceSteps = computed(() => [
  { text: t('ocdMindfulness.steps.observe'), desc: t('ocdMindfulness.steps.observeDesc') },
  { text: t('ocdMindfulness.steps.accept'), desc: t('ocdMindfulness.steps.acceptDesc') },
  { text: t('ocdMindfulness.steps.letGo'), desc: t('ocdMindfulness.steps.letGoDesc') }
])

const currentGuidance = computed(() => guidanceSteps.value[currentStep % guidanceSteps.value.length].text)
const currentDescription = computed(() => guidanceSteps.value[currentStep % guidanceSteps.value.length].desc)

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  elapsedTime.value = 0
  currentStep.value = 0
  
  timerInterval = setInterval(() => {
    elapsedTime.value += 1000
    if (elapsedTime.value % 30000 === 0) { // Change step every 30 seconds
      currentStep.value++
    }
    if (elapsedTime.value >= targetTime) {
      completeExercise()
    }
  }, 1000)
}

const stopExercise = () => {
  if (timerInterval) clearInterval(timerInterval)
  exerciseActive.value = false
  exerciseCompleted.value = false
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => startExercise(), 100)
}

const completeExercise = () => {
  if (timerInterval) clearInterval(timerInterval)
  exerciseActive.value = false
  exerciseCompleted.value = true
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

