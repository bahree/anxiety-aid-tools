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
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6">{{ $t("nauseaManagement.session.title") }}</h2>
        
        <div class="mb-8">
          <div class="text-5xl font-bold text-rose-600 dark:text-rose-400 mb-4">{{ breathingPhase === 'inhale' ? $t("nauseaManagement.session.breatheIn") : $t("nauseaManagement.session.breatheOut") }}</div>
          <p class="text-lg text-gray-600 dark:text-slate-300 mb-4">{{ currentInstruction }}</p>
          <div class="w-64 h-64 mx-auto rounded-full border-4 border-rose-300 dark:border-rose-600 flex items-center justify-center transition-all duration-3000" :class="breathingPhase === 'inhale' ? 'bg-rose-200 dark:bg-rose-900/30 scale-110' : 'bg-rose-100 dark:bg-rose-900/20 scale-100'">
            <Icon name="ph:wind-fill" class="text-6xl text-rose-600 dark:text-rose-400" />
          </div>
        </div>

        <div class="mb-6">
          <p class="text-gray-600 dark:text-slate-400">{{ $t("nauseaManagement.session.grounding") }}</p>
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

let breathingInterval = null

const instructions = computed(() => [
  t('nauseaManagement.instructions.breathe'),
  t('nauseaManagement.instructions.ground'),
  t('nauseaManagement.instructions.distinguish')
])

const currentInstruction = computed(() => instructions.value[currentStep % instructions.value.length])

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  breathingPhase.value = 'inhale'
  currentStep.value = 0
  
  breathingInterval = setInterval(() => {
    breathingPhase.value = breathingPhase.value === 'inhale' ? 'exhale' : 'inhale'
    if (breathingPhase.value === 'inhale') {
      currentStep.value++
      if (currentStep.value >= instructions.value.length * 3) {
        completeExercise()
      }
    }
  }, 4000) // 4 seconds per phase
}

const stopExercise = () => {
  if (breathingInterval) clearInterval(breathingInterval)
  exerciseActive.value = false
  exerciseCompleted.value = false
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => startExercise(), 100)
}

const completeExercise = () => {
  if (breathingInterval) clearInterval(breathingInterval)
  exerciseActive.value = false
  exerciseCompleted.value = true
}

onUnmounted(() => {
  if (breathingInterval) clearInterval(breathingInterval)
})
</script>

