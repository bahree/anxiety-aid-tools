<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:clock-fill" class="mx-auto text-7xl text-amber-600 dark:text-amber-400 animate-pulse" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.futureWorryTime.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.futureWorryTime.description") }}
        </p>

        <!-- Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-amber-200 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-3xl text-amber-600 dark:text-amber-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("futureWorryTime.benefits.control.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("futureWorryTime.benefits.control.description") }}</p>
          </div>
          <div class="border-2 border-orange-200 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:clock-clockwise-fill" class="mx-auto mb-2 text-3xl text-orange-600 dark:text-orange-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("futureWorryTime.benefits.schedule.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("futureWorryTime.benefits.schedule.description") }}</p>
          </div>
          <div class="border-2 border-yellow-200 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-yellow-600 dark:text-yellow-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("futureWorryTime.benefits.peace.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("futureWorryTime.benefits.peace.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("futureWorryTime.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive">
      <div class="mb-6 text-center">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t("futureWorryTime.session.title") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t("futureWorryTime.session.subtitle") }}
        </p>
      </div>

      <!-- Worry Time Interface -->
      <div class="border-4 border-amber-300 dark:border-amber-600 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-yellow-900/30 p-8 md:p-12 rounded-2xl transition-colors duration-200">
        <div class="flex flex-col items-center max-w-3xl mx-auto">
          
          <!-- Timer Display -->
          <div class="mb-8 text-center">
            <div class="text-6xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {{ formatTime(timeRemaining) }}
            </div>
            <p class="text-lg text-gray-600 dark:text-slate-400">
              {{ $t("futureWorryTime.session.timeRemaining") }}
            </p>
          </div>

          <!-- Current Phase -->
          <div class="mb-6 w-full">
            <div class="p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-amber-200 dark:border-amber-700">
              <div class="text-center">
                <p class="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-2">
                  {{ currentPhaseText }}
                </p>
                <p class="text-base text-gray-600 dark:text-slate-300">
                  {{ currentPhaseDescription }}
                </p>
              </div>
            </div>
          </div>

          <!-- Worries List -->
          <div v-if="worries.length > 0" class="mb-6 w-full">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
              {{ $t("futureWorryTime.session.yourWorries") }} ({{ worries.length }})
            </h3>
            <div class="space-y-3 max-h-64 overflow-y-auto">
              <div
                v-for="(worry, index) in worries"
                :key="index"
                class="p-4 bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-700 rounded-lg"
              >
                <p class="text-gray-800 dark:text-slate-100 font-medium">
                  {{ worry.text }}
                </p>
                <p v-if="worry.action" class="mt-2 text-sm text-amber-600 dark:text-amber-400">
                  <Icon name="ph:lightbulb-fill" class="inline mr-1" />
                  {{ worry.action }}
                </p>
              </div>
            </div>
          </div>

          <!-- Worry Input (during worry phase) -->
          <div v-if="currentPhase === 'worry'" class="mb-6 w-full">
            <label class="block text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">
              {{ $t("futureWorryTime.session.addWorry") }}
            </label>
            <div class="flex gap-3">
              <input
                v-model="currentWorry"
                type="text"
                :placeholder="$t('futureWorryTime.session.worryPlaceholder')"
                @keyup.enter="addWorry"
                class="flex-1 px-4 py-3 border-2 border-amber-300 dark:border-amber-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                @click="addWorry"
                :disabled="!currentWorry.trim()"
                class="px-6 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-bold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="ph:plus-fill" class="text-xl" />
              </button>
            </div>
          </div>

          <!-- Action Planning (during action phase) -->
          <div v-if="currentPhase === 'action' && worries.length > 0" class="mb-6 w-full">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
              {{ $t("futureWorryTime.session.planActions") }}
            </h3>
            <div class="space-y-3">
              <div
                v-for="(worry, index) in worries"
                :key="index"
                class="p-4 bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-amber-700 rounded-lg"
              >
                <p class="text-gray-800 dark:text-slate-100 font-medium mb-2">
                  {{ worry.text }}
                </p>
                <input
                  v-model="worry.action"
                  type="text"
                  :placeholder="$t('futureWorryTime.session.actionPlaceholder')"
                  class="w-full px-3 py-2 border border-amber-300 dark:border-amber-600 rounded bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100 text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex gap-4">
            <button
              v-if="currentPhase === 'worry' && !timerRunning"
              @click="startTimer"
              class="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:play-fill" class="text-lg" />
              <span>{{ $t("futureWorryTime.buttons.start") }}</span>
            </button>
            <button
              v-if="timerRunning"
              @click="pauseTimer"
              class="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:pause-fill" class="text-lg" />
              <span>{{ $t("futureWorryTime.buttons.pause") }}</span>
            </button>
            <button
              @click="stopExercise"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>{{ $t("futureWorryTime.buttons.stop") }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 animate-pulse" />
        </div>
        <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">
          {{ $t("futureWorryTime.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("futureWorryTime.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 dark:from-amber-500 dark:to-orange-500 dark:hover:from-amber-600 dark:hover:to-orange-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("futureWorryTime.buttons.tryAgain") }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const { t } = useI18n()

const exerciseSection = ref(null)
const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const currentPhase = ref('worry') // 'worry', 'action', 'closure'
const timeRemaining = ref(600000) // 10 minutes in milliseconds
const timerRunning = ref(false)
const currentWorry = ref('')
const worries = ref([])

const totalTime = 600000 // 10 minutes
const worryTime = 300000 // 5 minutes
const actionTime = 240000 // 4 minutes
const closureTime = 60000 // 1 minute

let timerInterval = null
let startTime = null
let pausedTime = 0

const currentPhaseText = computed(() => {
  if (currentPhase.value === 'worry') return t('futureWorryTime.session.phaseWorry')
  if (currentPhase.value === 'action') return t('futureWorryTime.session.phaseAction')
  return t('futureWorryTime.session.phaseClosure')
})

const currentPhaseDescription = computed(() => {
  if (currentPhase.value === 'worry') return t('futureWorryTime.session.phaseWorryDesc')
  if (currentPhase.value === 'action') return t('futureWorryTime.session.phaseActionDesc')
  return t('futureWorryTime.session.phaseClosureDesc')
})

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  currentPhase.value = 'worry'
  timeRemaining.value = worryTime
  timerRunning.value = false
  currentWorry.value = ''
  worries.value = []
  pausedTime = 0
}

const startTimer = () => {
  timerRunning.value = true
  startTime = Date.now() - pausedTime
  
  timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime
    const phaseTime = currentPhase.value === 'worry' ? worryTime : 
                     currentPhase.value === 'action' ? actionTime : closureTime
    const phaseStart = currentPhase.value === 'worry' ? 0 :
                      currentPhase.value === 'action' ? worryTime :
                      worryTime + actionTime
    
    timeRemaining.value = Math.max(0, phaseTime - (elapsed - phaseStart))
    
    if (timeRemaining.value <= 0) {
      nextPhase()
    }
  }, 100)
}

const pauseTimer = () => {
  timerRunning.value = false
  pausedTime = Date.now() - startTime
  if (timerInterval) clearInterval(timerInterval)
}

const nextPhase = () => {
  if (currentPhase.value === 'worry') {
    currentPhase.value = 'action'
    timeRemaining.value = actionTime
    startTime = Date.now()
  } else if (currentPhase.value === 'action') {
    currentPhase.value = 'closure'
    timeRemaining.value = closureTime
    startTime = Date.now()
  } else {
    completeExercise()
  }
}

const addWorry = () => {
  if (!currentWorry.value.trim()) return
  
  worries.value.push({
    text: currentWorry.value.trim(),
    action: ''
  })
  
  currentWorry.value = ''
}

const stopExercise = () => {
  if (timerInterval) clearInterval(timerInterval)
  exerciseActive.value = false
  exerciseCompleted.value = false
  timerRunning.value = false
  currentWorry.value = ''
  worries.value = []
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => {
    startExercise()
  }, 100)
}

const completeExercise = () => {
  if (timerInterval) clearInterval(timerInterval)
  exerciseActive.value = false
  exerciseCompleted.value = true
  timerRunning.value = false
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

