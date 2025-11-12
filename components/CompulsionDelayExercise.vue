<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:timer-fill" class="mx-auto text-7xl text-violet-600 dark:text-violet-400 mb-6" />
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.compulsionDelay.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.compulsionDelay.description") }}
        </p>
        <button @click="startExercise" class="mx-auto flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("compulsionDelay.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <div v-if="exerciseActive" class="border-4 border-violet-300 dark:border-violet-600 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 p-8 md:p-12 rounded-2xl">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-4">{{ $t("compulsionDelay.session.title") }}</h2>
        <div class="mb-8">
          <div class="text-7xl font-bold text-violet-600 dark:text-violet-400 mb-4">{{ formatTime(timeRemaining) }}</div>
          <p class="text-xl text-gray-600 dark:text-slate-300">{{ $t("compulsionDelay.session.instruction") }}</p>
        </div>
        <div class="mb-6">
          <p class="text-lg text-gray-700 dark:text-slate-300 mb-2">{{ $t("compulsionDelay.session.delayCount") }}: {{ delayCount }}</p>
          <p class="text-sm text-gray-600 dark:text-slate-400">{{ $t("compulsionDelay.session.nextDelay") }}: {{ formatTime(nextDelayTime) }}</p>
        </div>
        <div class="flex gap-4 justify-center">
          <button v-if="!timerRunning" @click="startTimer" class="bg-violet-600 hover:bg-violet-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("compulsionDelay.buttons.start") }}
          </button>
          <button v-if="timerRunning" @click="pauseTimer" class="bg-orange-600 hover:bg-orange-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("compulsionDelay.buttons.pause") }}
          </button>
          <button @click="completeDelay" class="bg-green-600 hover:bg-green-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("compulsionDelay.buttons.completed") }}
          </button>
          <button @click="stopExercise" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("compulsionDelay.buttons.stop") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="exerciseCompleted" class="text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 mb-4" />
      <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{{ $t("compulsionDelay.completion.title") }}</h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">{{ $t("compulsionDelay.completion.message") }}</p>
      <button @click="restartExercise" class="bg-violet-600 hover:bg-violet-700 px-8 py-4 text-lg font-bold text-white rounded-lg transition-colors">
        {{ $t("compulsionDelay.buttons.tryAgain") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const { t } = useI18n()

const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const timerRunning = ref(false)
const timeRemaining = ref(60000) // Start with 1 minute
const delayCount = ref(0)
const nextDelayTime = ref(60000)

let timerInterval = null
let startTime = null

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  timerRunning.value = false
  timeRemaining.value = 60000
  delayCount.value = 0
  nextDelayTime.value = 60000
}

const startTimer = () => {
  timerRunning.value = true
  startTime = Date.now()
  
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime
    timeRemaining.value = Math.max(0, nextDelayTime.value - elapsed)
    
    if (timeRemaining.value <= 0) {
      pauseTimer()
    }
  }, 100)
}

const pauseTimer = () => {
  timerRunning.value = false
  if (timerInterval) clearInterval(timerInterval)
}

const completeDelay = () => {
  delayCount.value++
  // Increase delay time gradually (1 min, 2 min, 5 min, 10 min, etc.)
  const delays = [60000, 120000, 300000, 600000, 900000]
  nextDelayTime.value = delays[Math.min(delayCount.value, delays.length - 1)]
  timeRemaining.value = nextDelayTime.value
  pauseTimer()
}

const stopExercise = () => {
  pauseTimer()
  exerciseActive.value = false
  exerciseCompleted.value = false
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => startExercise(), 100)
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

