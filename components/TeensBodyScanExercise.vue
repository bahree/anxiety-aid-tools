<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:person-fill" class="mx-auto text-7xl text-indigo-600 dark:text-indigo-400 animate-pulse" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.teensBodyScan.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.teensBodyScan.description") }}
        </p>

        <!-- Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-indigo-200 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-3xl text-indigo-600 dark:text-indigo-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("teensBodyScan.benefits.awareness.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("teensBodyScan.benefits.awareness.description") }}</p>
          </div>
          <div class="border-2 border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-purple-600 dark:text-purple-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("teensBodyScan.benefits.relax.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("teensBodyScan.benefits.relax.description") }}</p>
          </div>
          <div class="border-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:eye-fill" class="mx-auto mb-2 text-3xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("teensBodyScan.benefits.present.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("teensBodyScan.benefits.present.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("teensBodyScan.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive">
      <div class="mb-6 text-center">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t("teensBodyScan.session.title") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t("teensBodyScan.session.subtitle") }}
        </p>
      </div>

      <!-- Body Scan Visualization -->
      <div class="border-4 border-indigo-300 dark:border-indigo-600 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-blue-900/30 p-8 md:p-12 rounded-2xl transition-colors duration-200">
        <div class="flex flex-col items-center">
          <!-- Body Visualization -->
          <div class="mb-8 relative">
            <div class="w-64 h-96 relative">
              <!-- Body outline with highlighted area -->
              <svg viewBox="0 0 200 300" class="w-full h-full">
                <!-- Body outline -->
                <path
                  d="M 100 20 Q 100 20 120 40 L 130 80 L 130 120 L 120 160 L 100 180 L 80 160 L 70 120 L 70 80 L 80 40 Q 100 20 100 20 Z M 100 180 L 100 220 L 90 260 L 100 280 L 110 260 L 100 220 Z"
                  :fill="currentArea ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.1)'"
                  :stroke="currentArea ? '#6366f1' : '#818cf8'"
                  stroke-width="2"
                  class="transition-all duration-500"
                />
                
                <!-- Highlighted area indicator -->
                <circle
                  v-if="currentArea"
                  :cx="getAreaPosition(currentArea).x"
                  :cy="getAreaPosition(currentArea).y"
                  :r="getAreaPosition(currentArea).r"
                  :fill="'rgba(99, 102, 241, 0.4)'"
                  class="animate-pulse"
                />
              </svg>
              
              <!-- Area label -->
              <div 
                v-if="currentArea"
                class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                <p class="font-semibold text-sm">{{ $t(`teensBodyScan.areas.${currentArea}.name`) }}</p>
              </div>
            </div>
          </div>

          <!-- Current Instruction -->
          <div class="mb-6 text-center max-w-2xl">
            <div class="mb-4 p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-indigo-200 dark:border-indigo-700">
              <p class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-2">
                {{ currentInstruction }}
              </p>
              <p v-if="currentArea" class="text-base text-gray-600 dark:text-slate-300">
                {{ $t(`teensBodyScan.areas.${currentArea}.instruction`) }}
              </p>
            </div>
          </div>

          <!-- Progress -->
          <div class="mb-6 w-full max-w-md">
            <div class="flex justify-between text-sm text-gray-600 dark:text-slate-400 mb-2">
              <span>{{ $t("teensBodyScan.session.progress") }}</span>
              <span>{{ currentAreaIndex + 1 }} / {{ totalAreas }}</span>
            </div>
            <div class="h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
                :style="{ width: ((currentAreaIndex + 1) / totalAreas) * 100 + '%' }"
              ></div>
            </div>
          </div>

          <!-- Timer (if in hold phase) -->
          <div v-if="isHolding" class="mb-6">
            <div class="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {{ Math.ceil(timeRemaining / 1000) }}
            </div>
            <p class="text-sm text-gray-600 dark:text-slate-400 mt-2">
              {{ $t("teensBodyScan.session.hold") }}
            </p>
          </div>

          <!-- Controls -->
          <div class="flex gap-4">
            <button
              v-if="!isHolding"
              @click="nextArea"
              class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:arrow-right-fill" class="text-lg" />
              <span>{{ $t("teensBodyScan.buttons.next") }}</span>
            </button>
            <button
              @click="stopExercise"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>{{ $t("teensBodyScan.buttons.stop") }}</span>
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
          {{ $t("teensBodyScan.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("teensBodyScan.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("teensBodyScan.buttons.tryAgain") }}</span>
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
const currentAreaIndex = ref(0)
const isHolding = ref(false)
const timeRemaining = ref(0)

const bodyAreas = [
  'feet',
  'legs',
  'hips',
  'stomach',
  'chest',
  'hands',
  'arms',
  'shoulders',
  'neck',
  'face',
  'head'
]

const totalAreas = bodyAreas.length
const currentArea = computed(() => bodyAreas[currentAreaIndex.value] || null)

const currentInstruction = computed(() => {
  if (!currentArea.value) return ''
  if (isHolding.value) {
    return t('teensBodyScan.session.notice')
  }
  return t('teensBodyScan.session.focus', { area: t(`teensBodyScan.areas.${currentArea.value}.name`) })
})

let holdTimer = null

const getAreaPosition = (area) => {
  const positions = {
    feet: { x: 100, y: 280, r: 15 },
    legs: { x: 100, y: 240, r: 20 },
    hips: { x: 100, y: 200, r: 25 },
    stomach: { x: 100, y: 170, r: 30 },
    chest: { x: 100, y: 140, r: 35 },
    hands: { x: 100, y: 100, r: 12 },
    arms: { x: 100, y: 80, r: 18 },
    shoulders: { x: 100, y: 60, r: 25 },
    neck: { x: 100, y: 40, r: 15 },
    face: { x: 100, y: 30, r: 20 },
    head: { x: 100, y: 20, r: 15 }
  }
  return positions[area] || { x: 100, y: 150, r: 20 }
}

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  currentAreaIndex.value = 0
  isHolding.value = false
  timeRemaining.value = 0
}

const nextArea = () => {
  if (isHolding.value) return
  
  // Start hold phase
  isHolding.value = true
  timeRemaining.value = 5000 // 5 seconds
  
  if (holdTimer) clearTimeout(holdTimer)
  
  const startTime = Date.now()
  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime
    timeRemaining.value = Math.max(0, 5000 - elapsed)
    
    if (timeRemaining.value <= 0) {
      clearInterval(interval)
      isHolding.value = false
      
      // Move to next area or complete
      if (currentAreaIndex.value < totalAreas - 1) {
        currentAreaIndex.value++
      } else {
        completeExercise()
      }
    }
  }, 50)
  
  holdTimer = setTimeout(() => {
    clearInterval(interval)
    isHolding.value = false
    
    if (currentAreaIndex.value < totalAreas - 1) {
      currentAreaIndex.value++
    } else {
      completeExercise()
    }
  }, 5000)
}

const stopExercise = () => {
  if (holdTimer) clearTimeout(holdTimer)
  exerciseActive.value = false
  exerciseCompleted.value = false
  currentAreaIndex.value = 0
  isHolding.value = false
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => {
    startExercise()
  }, 100)
}

const completeExercise = () => {
  if (holdTimer) clearTimeout(holdTimer)
  exerciseActive.value = false
  exerciseCompleted.value = true
}

onUnmounted(() => {
  if (holdTimer) clearTimeout(holdTimer)
})
</script>

