<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:mask-fill" class="mx-auto text-7xl text-red-600 dark:text-red-400 animate-pulse" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.superheroBreathing.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.superheroBreathing.description") }}
        </p>

        <!-- Superhero Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-red-200 dark:border-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:shield-check-fill" class="mx-auto mb-2 text-3xl text-red-600 dark:text-red-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("superheroBreathing.benefits.strong.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("superheroBreathing.benefits.strong.description") }}</p>
          </div>
          <div class="border-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("superheroBreathing.benefits.calm.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("superheroBreathing.benefits.calm.description") }}</p>
          </div>
          <div class="border-2 border-yellow-200 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:star-fill" class="mx-auto mb-2 text-3xl text-yellow-600 dark:text-yellow-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("superheroBreathing.benefits.brave.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("superheroBreathing.benefits.brave.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 dark:from-red-500 dark:to-orange-500 dark:hover:from-red-600 dark:hover:to-orange-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
          :aria-label="$t('superheroBreathing.buttons.beginAriaLabel')"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("superheroBreathing.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive">
      <!-- Superhero Header -->
      <div class="mb-6 text-center">
        <div class="mb-4">
          <Icon name="ph:mask-fill" class="mx-auto text-6xl text-red-600 dark:text-red-400 animate-bounce" />
        </div>
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t("superheroBreathing.session.title") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t("superheroBreathing.session.subtitle") }}
        </p>
        <div class="mt-4 text-2xl font-bold text-red-600 dark:text-red-400">
          {{ currentBreath }}/{{ totalBreaths }} {{ $t("superheroBreathing.session.breaths") }}
        </div>
      </div>

      <!-- Superhero Breathing Visualization -->
      <div class="border-4 border-red-300 dark:border-red-600 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 p-8 md:p-12 rounded-2xl transition-colors duration-200">
        <div class="flex flex-col items-center">
          <!-- Superhero Breathing Animation -->
          <div class="mb-8">
            <div 
              class="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ease-in-out"
              :class="breathingPhase === 'inhale' 
                ? 'bg-gradient-to-br from-red-500 to-orange-500 scale-125 shadow-2xl' 
                : 'bg-gradient-to-br from-blue-400 to-cyan-400 scale-100 shadow-lg'"
            >
              <Icon 
                :name="breathingPhase === 'inhale' ? 'ph:wind-fill' : 'ph:wind-duotone'" 
                class="text-6xl md:text-8xl text-white"
              />
            </div>
          </div>

          <!-- Superhero Breathing Guidance -->
          <div class="mb-6 text-center">
            <div class="transition-all duration-500">
              <div class="mb-2 text-3xl md:text-4xl font-bold" 
                   :class="breathingPhase === 'inhale' 
                     ? 'text-red-600 dark:text-red-400' 
                     : 'text-blue-600 dark:text-blue-400'">
                {{
                  breathingPhase === "inhale"
                    ? $t("superheroBreathing.session.breatheIn")
                    : $t("superheroBreathing.session.breatheOut")
                }}
              </div>
              <div class="text-xl text-gray-600 dark:text-slate-400 font-medium">
                {{
                  breathingPhase === "inhale"
                    ? $t("superheroBreathing.session.threeSeconds")
                    : $t("superheroBreathing.session.threeSeconds")
                }}
              </div>
            </div>
          </div>

          <!-- Simple Progress -->
          <div class="mb-6 w-full max-w-xs">
            <div class="h-4 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-100 rounded-full"
                :style="{ width: breathProgress + '%' }"
              ></div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex gap-4">
            <button
              @click="stopExercise"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>{{ $t("superheroBreathing.buttons.stop") }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:star-fill" class="mx-auto text-7xl text-yellow-500 dark:text-yellow-400 animate-pulse" />
        </div>
        <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">
          {{ $t("superheroBreathing.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("superheroBreathing.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 dark:from-red-500 dark:to-orange-500 dark:hover:from-red-600 dark:hover:to-orange-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("superheroBreathing.buttons.tryAgain") }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()

const exerciseSection = ref(null)
const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const breathingPhase = ref('inhale') // 'inhale' or 'exhale'
const currentBreath = ref(0)
const totalBreaths = ref(6) // Shorter for kids
const elapsedTime = ref(0)
const remainingTime = ref(3000) // 3 seconds
const breathProgress = ref(0)

let breathInterval = null
let progressInterval = null
let timeInterval = null
const breathDuration = 3000 // 3 seconds for kids

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  currentBreath.value = 0
  elapsedTime.value = 0
  breathingPhase.value = 'inhale'
  remainingTime.value = breathDuration
  breathProgress.value = 0
  
  startBreathingCycle()
  startTimeTracking()
}

const startBreathingCycle = () => {
  if (breathInterval) clearInterval(breathInterval)
  
  breathInterval = setInterval(() => {
    if (breathingPhase.value === 'inhale') {
      breathingPhase.value = 'exhale'
    } else {
      breathingPhase.value = 'inhale'
      currentBreath.value++
      
      if (currentBreath.value >= totalBreaths.value) {
        completeExercise()
        return
      }
    }
    
    remainingTime.value = breathDuration
    breathProgress.value = 0
  }, breathDuration)
  
  // Start progress tracking
  startProgressTracking()
}

const startProgressTracking = () => {
  if (progressInterval) clearInterval(progressInterval)
  
  progressInterval = setInterval(() => {
    remainingTime.value -= 50
    breathProgress.value = ((breathDuration - remainingTime.value) / breathDuration) * 100
    
    if (remainingTime.value <= 0) {
      remainingTime.value = breathDuration
      breathProgress.value = 0
    }
  }, 50)
}

const startTimeTracking = () => {
  if (timeInterval) clearInterval(timeInterval)
  
  timeInterval = setInterval(() => {
    elapsedTime.value += 1
  }, 1000)
}

const stopExercise = () => {
  if (breathInterval) clearInterval(breathInterval)
  if (progressInterval) clearInterval(progressInterval)
  if (timeInterval) clearInterval(timeInterval)
  
  exerciseActive.value = false
  exerciseCompleted.value = false
  currentBreath.value = 0
  breathingPhase.value = 'inhale'
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => {
    startExercise()
  }, 100)
}

const completeExercise = () => {
  if (breathInterval) clearInterval(breathInterval)
  if (progressInterval) clearInterval(progressInterval)
  if (timeInterval) clearInterval(timeInterval)
  
  exerciseActive.value = false
  exerciseCompleted.value = true
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (breathInterval) clearInterval(breathInterval)
  if (progressInterval) clearInterval(progressInterval)
  if (timeInterval) clearInterval(timeInterval)
})
</script>

