<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:heart-fill" class="mx-auto text-7xl text-rose-600 dark:text-rose-400 mb-6" />
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.nauseaManagement.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.nauseaManagement.description") }}
        </p>
        <button @click="startExercise" class="mx-auto flex items-center gap-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("nauseaManagement.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <div v-if="exerciseActive" class="border-4 border-rose-300 dark:border-rose-600 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-8 md:p-12 rounded-2xl">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6 text-center">{{ $t("nauseaManagement.session.title") }}</h2>
        
        <!-- Nausea Scale -->
        <div class="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-rose-200 dark:border-rose-700">
          <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3 text-center">
            {{ $t("nauseaManagement.session.nauseaLevel") }}: {{ nauseaLevel }}/10
          </label>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs text-gray-500 dark:text-slate-400">0</span>
            <input 
              type="range" 
              v-model.number="nauseaLevel" 
              min="0" 
              max="10" 
              step="1"
              class="flex-1 h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <span class="text-xs text-gray-500 dark:text-slate-400">10</span>
          </div>
          <p class="text-xs text-center text-gray-600 dark:text-slate-400">
            {{ $t("nauseaManagement.session.updateAsNeeded") }}
          </p>
        </div>

        <!-- Current Step Display -->
        <div class="mb-6 p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-rose-200 dark:border-rose-700">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3 text-center">
            {{ $t(`nauseaManagement.steps.${currentStepKey}.title`) }}
          </h3>
          <p class="text-lg text-gray-700 dark:text-slate-300 mb-4 text-center">
            {{ $t(`nauseaManagement.steps.${currentStepKey}.instruction`) }}
          </p>
          
          <!-- Breathing Visualization -->
          <div v-if="currentStepKey === 'breathing'" class="mb-4">
            <div class="text-5xl font-bold text-rose-600 dark:text-rose-400 mb-4 text-center">
              {{ breathingPhase === 'inhale' ? $t("nauseaManagement.session.breatheIn") : $t("nauseaManagement.session.breatheOut") }}
            </div>
            <div class="w-48 h-48 mx-auto rounded-full border-4 border-rose-300 dark:border-rose-600 flex items-center justify-center transition-all duration-3000" :class="breathingPhase === 'inhale' ? 'bg-rose-200 dark:bg-rose-900/30 scale-110' : 'bg-rose-100 dark:bg-rose-900/20 scale-100'">
              <Icon name="ph:wind-fill" class="text-5xl text-rose-600 dark:text-rose-400" />
            </div>
          </div>

          <!-- Body Position Guidance -->
          <div v-if="currentStepKey === 'position'" class="mb-4 text-center">
            <div class="inline-block p-4 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
              <Icon name="ph:person-simple-fill" class="text-6xl text-rose-600 dark:text-rose-400 mb-2" />
              <p class="text-sm text-gray-700 dark:text-slate-300 mt-2">
                {{ $t("nauseaManagement.steps.position.sitting") }}
              </p>
            </div>
          </div>

          <!-- Acupressure Visualization -->
          <div v-if="currentStepKey === 'acupressure'" class="mb-4 text-center">
            <div class="inline-block p-4 bg-rose-100 dark:bg-rose-900/30 rounded-lg">
              <Icon name="ph:hand-fill" class="text-6xl text-rose-600 dark:text-rose-400 mb-2" />
              <p class="text-sm text-gray-700 dark:text-slate-300 mt-2">
                {{ $t("nauseaManagement.steps.acupressure.instruction") }}
              </p>
            </div>
          </div>

          <!-- Temperature Visualization -->
          <div v-if="currentStepKey === 'cooling'" class="mb-4 text-center">
            <div class="inline-block p-4 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <Icon name="ph:snowflake-fill" class="text-6xl text-cyan-600 dark:text-cyan-400 mb-2" />
              <p class="text-sm text-gray-700 dark:text-slate-300 mt-2">
                {{ $t("nauseaManagement.steps.cooling.instruction") }}
              </p>
            </div>
          </div>

          <!-- Grounding for Nausea -->
          <div v-if="currentStepKey === 'grounding'" class="mb-4">
            <ul class="space-y-2 text-left">
              <li v-for="(item, index) in groundingItems" :key="index" class="flex items-start gap-2 text-gray-700 dark:text-slate-300">
                <Icon name="ph:check-circle-fill" class="text-rose-600 dark:text-rose-400 mt-1 flex-shrink-0" />
                <span>{{ $t(`nauseaManagement.steps.grounding.items.${index}`) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Progress Indicator -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600 dark:text-slate-400">
              {{ $t("nauseaManagement.session.progress") }}: {{ currentStep + 1 }} / {{ totalSteps }}
            </span>
          </div>
          <div class="h-2 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 rounded-full"
              :style="{ width: ((currentStep + 1) / totalSteps) * 100 + '%' }"
            ></div>
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <button @click="stopExercise" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("nauseaManagement.buttons.stop") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="exerciseCompleted" class="text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 mb-4" />
      <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{{ $t("nauseaManagement.completion.title") }}</h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">{{ $t("nauseaManagement.completion.message") }}</p>
      <button @click="restartExercise" class="bg-rose-600 hover:bg-rose-700 px-8 py-4 text-lg font-bold text-white rounded-lg transition-colors">
        {{ $t("nauseaManagement.buttons.tryAgain") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const { t } = useI18n()

const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const breathingPhase = ref('inhale')
const currentStep = ref(0)
const nauseaLevel = ref(5)
const totalSteps = 5

const stepKeys = ['breathing', 'position', 'acupressure', 'cooling', 'grounding']
const currentStepKey = computed(() => stepKeys[currentStep.value] || 'breathing')

const groundingItems = computed(() => [
  t('nauseaManagement.steps.grounding.items.0'),
  t('nauseaManagement.steps.grounding.items.1'),
  t('nauseaManagement.steps.grounding.items.2'),
  t('nauseaManagement.steps.grounding.items.3')
])

let breathingInterval = null
let stepInterval = null

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  breathingPhase.value = 'inhale'
  currentStep.value = 0
  nauseaLevel.value = 5
  
  // Start breathing cycle for breathing step
  startBreathingCycle()
  
  // Advance through steps
  stepInterval = setInterval(() => {
    if (currentStep.value < totalSteps - 1) {
      currentStep.value++
      
      // Start breathing for breathing step, stop for others
      if (currentStepKey.value === 'breathing') {
        startBreathingCycle()
      } else {
        stopBreathingCycle()
      }
    } else {
      completeExercise()
    }
  }, 20000) // 20 seconds per step
}

const startBreathingCycle = () => {
  if (breathingInterval) clearInterval(breathingInterval)
  
  breathingInterval = setInterval(() => {
    breathingPhase.value = breathingPhase.value === 'inhale' ? 'exhale' : 'inhale'
  }, 4000) // 4 seconds per phase
}

const stopBreathingCycle = () => {
  if (breathingInterval) {
    clearInterval(breathingInterval)
    breathingInterval = null
  }
}

const stopExercise = () => {
  if (breathingInterval) clearInterval(breathingInterval)
  if (stepInterval) clearInterval(stepInterval)
  exerciseActive.value = false
  exerciseCompleted.value = false
  currentStep.value = 0
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => startExercise(), 100)
}

const completeExercise = () => {
  if (breathingInterval) clearInterval(breathingInterval)
  if (stepInterval) clearInterval(stepInterval)
  exerciseActive.value = false
  exerciseCompleted.value = true
}

onUnmounted(() => {
  if (breathingInterval) clearInterval(breathingInterval)
  if (stepInterval) clearInterval(stepInterval)
})
</script>

