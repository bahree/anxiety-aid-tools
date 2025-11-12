<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:users-fill" class="mx-auto text-7xl text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.socialAnxietyGrounding.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.socialAnxietyGrounding.description") }}
        </p>

        <!-- Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-indigo-200 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:anchor-simple-fill" class="mx-auto mb-2 text-3xl text-indigo-600 dark:text-indigo-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("socialAnxietyGrounding.benefits.present.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("socialAnxietyGrounding.benefits.present.description") }}</p>
          </div>
          <div class="border-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("socialAnxietyGrounding.benefits.calm.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("socialAnxietyGrounding.benefits.calm.description") }}</p>
          </div>
          <div class="border-2 border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:eye-fill" class="mx-auto mb-2 text-3xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("socialAnxietyGrounding.benefits.confident.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("socialAnxietyGrounding.benefits.confident.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("socialAnxietyGrounding.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive" class="text-center">
      <!-- Step Header -->
      <div class="mb-6">
        <div class="mb-4">
          <Icon :name="currentStepConfig.icon" class="mx-auto text-6xl" :class="currentStepConfig.color" />
        </div>
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t(`socialAnxietyGrounding.steps.${currentStepConfig.key}.title`) }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t(`socialAnxietyGrounding.steps.${currentStepConfig.key}.subtitle`) }}
        </p>
      </div>

      <!-- Step Content -->
      <div class="border-4 border-indigo-300 dark:border-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-8 md:p-12 rounded-2xl transition-colors duration-200 max-w-3xl mx-auto">
        
        <!-- Breathing Step -->
        <div v-if="currentStep === 1" class="space-y-6">
          <BreathingAnimation
            :is-active="exerciseActive"
            :breathing-phase="breathingPhase"
            :phase-duration="breathingPhase === 'inhale' ? 4000 : 6000"
            color="#6366f1"
          />
          <div class="text-2xl font-semibold" :class="breathingPhase === 'inhale' ? 'text-indigo-600 dark:text-indigo-400' : 'text-purple-600 dark:text-purple-400'">
            {{ breathingPhase === 'inhale' ? $t("socialAnxietyGrounding.steps.breathing.inhale") : $t("socialAnxietyGrounding.steps.breathing.exhale") }}
          </div>
          <div class="text-lg text-gray-600 dark:text-slate-300">
            {{ $t("socialAnxietyGrounding.steps.breathing.instruction") }}
          </div>
          <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {{ breathCount }}/{{ totalBreaths }} {{ $t("socialAnxietyGrounding.steps.breathing.breaths") }}
          </div>
        </div>

        <!-- Body Awareness Step -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
            {{ $t("socialAnxietyGrounding.steps.bodyAwareness.instruction") }}
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="(item, index) in bodyAwarenessItems"
              :key="index"
              @click="toggleBodyItem(index)"
              class="border-2 rounded-lg p-6 cursor-pointer transition-all duration-200"
              :class="item.checked
                ? 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/40'
                : 'border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500'"
            >
              <Icon
                :name="item.checked ? 'ph:check-circle-fill' : 'ph:circle'"
                class="text-3xl mb-3"
                :class="item.checked ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-slate-500'"
              />
              <p class="font-medium text-gray-800 dark:text-slate-100">
                {{ $t(`socialAnxietyGrounding.steps.bodyAwareness.items.${index}`) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Subtle Grounding Step -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
            {{ $t("socialAnxietyGrounding.steps.subtleGrounding.instruction") }}
          </div>
          <div class="grid gap-4">
            <div
              v-for="(item, index) in subtleGroundingItems"
              :key="index"
              @click="toggleSubtleItem(index)"
              class="border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 text-left"
              :class="item.checked
                ? 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/40'
                : 'border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500'"
            >
              <div class="flex items-start gap-4">
                <Icon
                  :name="item.checked ? 'ph:check-circle-fill' : 'ph:circle'"
                  class="text-2xl flex-shrink-0 mt-1"
                  :class="item.checked ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-slate-500'"
                />
                <div>
                  <p class="font-semibold text-gray-800 dark:text-slate-100 mb-1">
                    {{ $t(`socialAnxietyGrounding.steps.subtleGrounding.items.${index}.title`) }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-slate-300">
                    {{ $t(`socialAnxietyGrounding.steps.subtleGrounding.items.${index}.description`) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="mt-8 flex gap-4 justify-center">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
          >
            <Icon name="ph:arrow-left" class="text-lg" />
            <span>{{ $t("socialAnxietyGrounding.buttons.back") }}</span>
          </button>
          <button
            v-if="currentStep < 3 && canProceed"
            @click="nextStep"
            class="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 px-6 py-3 font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <span>{{ $t("socialAnxietyGrounding.buttons.next") }}</span>
            <Icon name="ph:arrow-right" class="text-lg" />
          </button>
          <button
            v-if="currentStep === 3"
            @click="completeExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-8 py-3 font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:check-circle-fill" class="text-lg" />
            <span>{{ $t("socialAnxietyGrounding.buttons.finish") }}</span>
          </button>
          <button
            @click="stopExercise"
            class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
          >
            <Icon name="ph:stop-fill" class="text-lg" />
            <span>{{ $t("socialAnxietyGrounding.buttons.stop") }}</span>
          </button>
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
          {{ $t("socialAnxietyGrounding.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("socialAnxietyGrounding.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("socialAnxietyGrounding.buttons.tryAgain") }}</span>
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
const currentStep = ref(1)
const breathingPhase = ref('inhale')
const breathCount = ref(0)
const totalBreaths = ref(4)

const bodyAwarenessItems = ref([
  { checked: false },
  { checked: false },
  { checked: false },
  { checked: false }
])

const subtleGroundingItems = ref([
  { checked: false },
  { checked: false },
  { checked: false }
])

const steps = [
  { key: 'breathing', icon: 'ph:wind-fill', color: 'text-indigo-600 dark:text-indigo-400' },
  { key: 'bodyAwareness', icon: 'ph:hand-fill', color: 'text-blue-600 dark:text-blue-400' },
  { key: 'subtleGrounding', icon: 'ph:eye-fill', color: 'text-purple-600 dark:text-purple-400' }
]

const currentStepConfig = computed(() => steps[currentStep.value - 1])

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return breathCount.value >= totalBreaths.value
  }
  if (currentStep.value === 2) {
    return bodyAwarenessItems.value.some(i => i.checked)
  }
  return true
})

let breathInterval = null

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  currentStep.value = 1
  breathCount.value = 0
  breathingPhase.value = 'inhale'
  bodyAwarenessItems.value.forEach(i => i.checked = false)
  subtleGroundingItems.value.forEach(i => i.checked = false)
  
  startBreathing()
}

const startBreathing = () => {
  if (breathInterval) clearInterval(breathInterval)
  
  breathInterval = setInterval(() => {
    if (breathingPhase.value === 'inhale') {
      breathingPhase.value = 'exhale'
    } else {
      breathingPhase.value = 'inhale'
      breathCount.value++
      
      if (breathCount.value >= totalBreaths.value) {
        clearInterval(breathInterval)
      }
    }
  }, breathingPhase.value === 'inhale' ? 4000 : 6000)
}

const toggleBodyItem = (index) => {
  bodyAwarenessItems.value[index].checked = !bodyAwarenessItems.value[index].checked
}

const toggleSubtleItem = (index) => {
  subtleGroundingItems.value[index].checked = !subtleGroundingItems.value[index].checked
}

const nextStep = () => {
  if (currentStep.value < 3 && canProceed.value) {
    if (currentStep.value === 1 && breathInterval) {
      clearInterval(breathInterval)
    }
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    if (currentStep.value === 1) {
      startBreathing()
    }
  }
}

const stopExercise = () => {
  if (breathInterval) clearInterval(breathInterval)
  exerciseActive.value = false
  exerciseCompleted.value = false
  currentStep.value = 1
  breathCount.value = 0
}

const completeExercise = () => {
  if (breathInterval) clearInterval(breathInterval)
  exerciseActive.value = false
  exerciseCompleted.value = true
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => {
    startExercise()
  }, 100)
}

onUnmounted(() => {
  if (breathInterval) clearInterval(breathInterval)
})
</script>

