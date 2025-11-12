<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:notebook-fill" class="mx-auto text-7xl text-blue-600 dark:text-blue-400" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.testAnxietyReset.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.testAnxietyReset.description") }}
        </p>

        <!-- Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-3xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("testAnxietyReset.benefits.focus.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("testAnxietyReset.benefits.focus.description") }}</p>
          </div>
          <div class="border-2 border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("testAnxietyReset.benefits.calm.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("testAnxietyReset.benefits.calm.description") }}</p>
          </div>
          <div class="border-2 border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:check-circle-fill" class="mx-auto mb-2 text-3xl text-purple-600 dark:text-purple-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("testAnxietyReset.benefits.confidence.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("testAnxietyReset.benefits.confidence.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("testAnxietyReset.buttons.begin") }}</span>
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
          {{ $t(`testAnxietyReset.steps.${currentStepConfig.key}.title`) }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t(`testAnxietyReset.steps.${currentStepConfig.key}.subtitle`) }}
        </p>
      </div>

      <!-- Step Content -->
      <div class="border-4 border-blue-300 dark:border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 md:p-12 rounded-2xl transition-colors duration-200 max-w-3xl mx-auto">
        
        <!-- Breathing Step -->
        <div v-if="currentStep === 1" class="space-y-6">
          <BreathingAnimation
            :is-active="exerciseActive"
            :breathing-phase="breathingPhase"
            :phase-duration="breathingPhase === 'inhale' ? 4000 : 6000"
            color="#2563eb"
          />
          <div class="text-2xl font-semibold" :class="breathingPhase === 'inhale' ? 'text-blue-600 dark:text-blue-400' : 'text-indigo-600 dark:text-indigo-400'">
            {{ breathingPhase === 'inhale' ? $t("testAnxietyReset.steps.breathing.inhale") : $t("testAnxietyReset.steps.breathing.exhale") }}
          </div>
          <div class="text-lg text-gray-600 dark:text-slate-300">
            {{ $t("testAnxietyReset.steps.breathing.instruction") }}
          </div>
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ breathCount }}/{{ totalBreaths }} {{ $t("testAnxietyReset.steps.breathing.breaths") }}
          </div>
        </div>

        <!-- Reframing Step -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div class="grid gap-4 md:grid-cols-2">
            <div
              v-for="(thought, index) in reframingThoughts"
              :key="index"
              class="border-2 rounded-lg p-6 transition-all duration-200"
              :class="thought.selected
                ? 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/40'
                : 'border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer'"
              @click="selectThought(index)"
            >
              <div class="flex items-start gap-3">
                <Icon
                  :name="thought.selected ? 'ph:check-circle-fill' : 'ph:circle'"
                  class="text-2xl flex-shrink-0 mt-1"
                  :class="thought.selected ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-slate-500'"
                />
                <div class="text-left">
                  <p class="font-semibold text-gray-800 dark:text-slate-100 mb-1">
                    {{ $t(`testAnxietyReset.steps.reframing.thoughts.${index}.anxious`) }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-slate-300">
                    {{ $t(`testAnxietyReset.steps.reframing.thoughts.${index}.helpful`) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p class="text-base text-gray-600 dark:text-slate-300 italic">
            {{ $t("testAnxietyReset.steps.reframing.instruction") }}
          </p>
        </div>

        <!-- Grounding Step -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
            {{ $t("testAnxietyReset.steps.grounding.instruction") }}
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <div
              v-for="(item, index) in groundingItems"
              :key="index"
              @click="toggleGroundingItem(index)"
              class="border-2 rounded-lg p-4 cursor-pointer transition-all duration-200"
              :class="item.checked
                ? 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/40'
                : 'border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-500'"
            >
              <Icon
                :name="item.checked ? 'ph:check-circle-fill' : 'ph:circle'"
                class="text-3xl mb-2"
                :class="item.checked ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-slate-500'"
              />
              <p class="font-medium text-gray-800 dark:text-slate-100">
                {{ $t(`testAnxietyReset.steps.grounding.items.${index}`) }}
              </p>
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
            <span>{{ $t("testAnxietyReset.buttons.back") }}</span>
          </button>
          <button
            v-if="currentStep < 3 && canProceed"
            @click="nextStep"
            class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 px-6 py-3 font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <span>{{ $t("testAnxietyReset.buttons.next") }}</span>
            <Icon name="ph:arrow-right" class="text-lg" />
          </button>
          <button
            v-if="currentStep === 3"
            @click="completeExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-8 py-3 font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:check-circle-fill" class="text-lg" />
            <span>{{ $t("testAnxietyReset.buttons.finish") }}</span>
          </button>
          <button
            @click="stopExercise"
            class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
          >
            <Icon name="ph:stop-fill" class="text-lg" />
            <span>{{ $t("testAnxietyReset.buttons.stop") }}</span>
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
          {{ $t("testAnxietyReset.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("testAnxietyReset.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("testAnxietyReset.buttons.tryAgain") }}</span>
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
const totalBreaths = ref(3)

const reframingThoughts = ref([
  { selected: false },
  { selected: false },
  { selected: false },
  { selected: false }
])

const groundingItems = ref([
  { checked: false },
  { checked: false },
  { checked: false }
])

const steps = [
  { key: 'breathing', icon: 'ph:wind-fill', color: 'text-blue-600 dark:text-blue-400' },
  { key: 'reframing', icon: 'ph:brain-fill', color: 'text-purple-600 dark:text-purple-400' },
  { key: 'grounding', icon: 'ph:anchor-simple-fill', color: 'text-green-600 dark:text-green-400' }
]

const currentStepConfig = computed(() => steps[currentStep.value - 1])

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return breathCount.value >= totalBreaths.value
  }
  if (currentStep.value === 2) {
    return reframingThoughts.value.some(t => t.selected)
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
  reframingThoughts.value.forEach(t => t.selected = false)
  groundingItems.value.forEach(i => i.checked = false)
  
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

const selectThought = (index) => {
  reframingThoughts.value[index].selected = !reframingThoughts.value[index].selected
}

const toggleGroundingItem = (index) => {
  groundingItems.value[index].checked = !groundingItems.value[index].checked
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

