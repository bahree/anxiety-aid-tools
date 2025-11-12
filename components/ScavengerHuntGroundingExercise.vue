<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseStarted && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:magnifying-glass-fill" class="mx-auto text-7xl text-green-600 dark:text-green-400 animate-pulse" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.scavengerHuntGrounding.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.scavengerHuntGrounding.description") }}
        </p>

        <!-- Game Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:eye-fill" class="mx-auto mb-2 text-3xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("scavengerHunt.benefits.focus.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("scavengerHunt.benefits.focus.description") }}</p>
          </div>
          <div class="border-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:smiley-fill" class="mx-auto mb-2 text-3xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("scavengerHunt.benefits.fun.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("scavengerHunt.benefits.fun.description") }}</p>
          </div>
          <div class="border-2 border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-purple-600 dark:text-purple-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("scavengerHunt.benefits.calm.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("scavengerHunt.benefits.calm.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("scavengerHunt.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseStarted && !exerciseCompleted">
      <!-- Game Header -->
      <div class="mb-6 text-center">
        <div class="mb-4">
          <Icon :name="currentStepConfig.icon" class="mx-auto text-6xl" :class="currentStepConfig.color" />
        </div>
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t(`scavengerHunt.steps.${currentStepConfig.key}.title`) }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300 mb-4">
          {{ $t(`scavengerHunt.steps.${currentStepConfig.key}.instruction`) }}
        </p>
        <div class="flex items-center justify-center gap-4 text-xl">
          <span class="font-bold text-green-600 dark:text-green-400">{{ totalFound }}/{{ totalItems }}</span>
          <span class="text-gray-600 dark:text-slate-400">{{ $t("scavengerHunt.itemsFound") }}</span>
        </div>
      </div>

      <!-- Scavenger Hunt Items -->
      <div class="border-4 border-green-300 dark:border-green-600 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-8 rounded-2xl transition-colors duration-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div
            v-for="(item, index) in currentStepItems"
            :key="index"
            @click="toggleItem(index)"
            class="cursor-pointer touch-manipulation transform transition-all duration-200 hover:scale-105"
          >
            <div
              class="border-4 rounded-xl p-6 transition-all duration-200"
              :class="item.found
                ? 'border-green-500 bg-green-100 dark:border-green-400 dark:bg-green-900/40 shadow-lg'
                : 'border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800 hover:border-green-300 dark:hover:border-green-500'"
            >
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0">
                  <Icon
                    :name="item.found ? 'ph:check-circle-fill' : 'ph:circle'"
                    class="text-4xl"
                    :class="item.found ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-slate-500'"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-800 dark:text-slate-100 mb-1">
                    {{ $t(`scavengerHunt.steps.${currentStepConfig.key}.items.${index}.name`) }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-slate-300">
                    {{ $t(`scavengerHunt.steps.${currentStepConfig.key}.items.${index}.hint`) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress and Navigation -->
        <div class="mt-8 flex flex-col items-center gap-4">
          <div class="w-full max-w-md">
            <div class="h-4 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 rounded-full"
                :style="{ width: (totalFound / totalItems) * 100 + '%' }"
              ></div>
            </div>
          </div>
          
          <div class="flex gap-4">
            <button
              v-if="currentStep > 1"
              @click="previousStep"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:arrow-left" class="text-lg" />
              <span>{{ $t("scavengerHunt.buttons.back") }}</span>
            </button>
            <button
              v-if="totalFound >= currentStepItems.length && currentStep < 5"
              @click="nextStep"
              class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-6 py-3 font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <span>{{ $t("scavengerHunt.buttons.next") }}</span>
              <Icon name="ph:arrow-right" class="text-lg" />
            </button>
            <button
              v-if="currentStep === 5 && totalFound >= totalItems"
              @click="completeExercise"
              class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-8 py-3 font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <Icon name="ph:trophy-fill" class="text-xl" />
              <span>{{ $t("scavengerHunt.buttons.finish") }}</span>
            </button>
            <button
              @click="stopExercise"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>{{ $t("scavengerHunt.buttons.stop") }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Completion State -->
    <div v-if="exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:trophy-fill" class="mx-auto text-7xl text-yellow-500 dark:text-yellow-400 animate-bounce" />
        </div>
        <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">
          {{ $t("scavengerHunt.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("scavengerHunt.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("scavengerHunt.buttons.playAgain") }}</span>
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
const exerciseStarted = ref(false)
const exerciseCompleted = ref(false)
const currentStep = ref(1)
const totalFound = ref(0)
const totalItems = ref(25) // 5 items per sense × 5 senses

const steps = [
  { key: 'see', icon: 'ph:eye-fill', color: 'text-blue-600 dark:text-blue-400' },
  { key: 'touch', icon: 'ph:hand-fill', color: 'text-green-600 dark:text-green-400' },
  { key: 'hear', icon: 'ph:ear-fill', color: 'text-purple-600 dark:text-purple-400' },
  { key: 'smell', icon: 'ph:nose-fill', color: 'text-orange-600 dark:text-orange-400' },
  { key: 'taste', icon: 'ph:tongue-fill', color: 'text-red-600 dark:text-red-400' }
]

const items = {
  see: Array(5).fill(null).map((_, i) => ({ found: false, index: i })),
  touch: Array(5).fill(null).map((_, i) => ({ found: false, index: i })),
  hear: Array(5).fill(null).map((_, i) => ({ found: false, index: i })),
  smell: Array(5).fill(null).map((_, i) => ({ found: false, index: i })),
  taste: Array(5).fill(null).map((_, i) => ({ found: false, index: i }))
}

const currentStepConfig = computed(() => steps[currentStep.value - 1])
const currentStepItems = computed(() => items[currentStepConfig.value.key])

const toggleItem = (index) => {
  const item = currentStepItems.value[index]
  if (!item.found) {
    item.found = true
    totalFound.value++
  }
}

const nextStep = () => {
  if (currentStep.value < 5) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const startExercise = () => {
  exerciseStarted.value = true
  exerciseCompleted.value = false
  currentStep.value = 1
  totalFound.value = 0
  
  // Reset all items
  Object.keys(items).forEach(key => {
    items[key].forEach(item => item.found = false)
  })
}

const stopExercise = () => {
  exerciseStarted.value = false
  exerciseCompleted.value = false
  currentStep.value = 1
  totalFound.value = 0
}

const completeExercise = () => {
  exerciseStarted.value = false
  exerciseCompleted.value = true
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => {
    startExercise()
  }, 100)
}
</script>

