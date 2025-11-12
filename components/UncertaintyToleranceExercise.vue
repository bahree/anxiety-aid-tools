<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:question-mark-fill" class="mx-auto text-7xl text-slate-600 dark:text-slate-400 mb-6" />
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.uncertaintyTolerance.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.uncertaintyTolerance.description") }}
        </p>
        <button @click="startExercise" class="mx-auto flex items-center gap-3 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("uncertaintyTolerance.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <div v-if="exerciseActive" class="border-4 border-slate-300 dark:border-slate-600 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 p-8 md:p-12 rounded-2xl">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6 text-center">{{ $t("uncertaintyTolerance.session.title") }}</h2>
        
        <div class="mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-slate-200 dark:border-slate-700">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">{{ currentExercise.title }}</h3>
          <p class="text-lg text-gray-700 dark:text-slate-300 mb-6">{{ currentExercise.description }}</p>
          
          <div v-if="currentExercise.type === 'breathing'" class="text-center">
            <div class="text-6xl font-bold text-slate-600 dark:text-slate-400 mb-4">{{ breathingCount }}</div>
            <p class="text-gray-600 dark:text-slate-400">{{ $t("uncertaintyTolerance.session.breatheWithUncertainty") }}</p>
          </div>
          
          <div v-if="currentExercise.type === 'reflection'" class="space-y-4">
            <textarea
              v-model="reflectionText"
              :placeholder="$t('uncertaintyTolerance.session.reflectionPlaceholder')"
              class="w-full border-2 border-slate-300 dark:border-slate-600 rounded-lg p-4 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100"
              rows="5"
            ></textarea>
          </div>
        </div>

        <div class="mb-6">
          <p class="text-center text-gray-600 dark:text-slate-400 mb-2">
            {{ $t("uncertaintyTolerance.session.progress") }}: {{ currentExerciseIndex + 1 }} / {{ exercises.length }}
          </p>
          <div class="h-3 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
            <div class="h-full bg-slate-600 dark:bg-slate-400 transition-all duration-300 rounded-full" :style="{ width: ((currentExerciseIndex + 1) / exercises.length) * 100 + '%' }"></div>
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <button v-if="currentExerciseIndex > 0" @click="previousExercise" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("uncertaintyTolerance.buttons.previous") }}
          </button>
          <button @click="nextExercise" class="bg-slate-600 hover:bg-slate-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ currentExerciseIndex < exercises.length - 1 ? $t("uncertaintyTolerance.buttons.next") : $t("uncertaintyTolerance.buttons.finish") }}
          </button>
          <button @click="stopExercise" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
            {{ $t("uncertaintyTolerance.buttons.stop") }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="exerciseCompleted" class="text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 mb-4" />
      <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{{ $t("uncertaintyTolerance.completion.title") }}</h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">{{ $t("uncertaintyTolerance.completion.message") }}</p>
      <button @click="restartExercise" class="bg-slate-600 hover:bg-slate-700 px-8 py-4 text-lg font-bold text-white rounded-lg transition-colors">
        {{ $t("uncertaintyTolerance.buttons.tryAgain") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const { t } = useI18n()

const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const currentExerciseIndex = ref(0)
const reflectionText = ref('')
const breathingCount = ref(0)

let breathingInterval = null

const exercises = computed(() => [
  {
    type: 'breathing',
    title: t('uncertaintyTolerance.exercises.breathing.title'),
    description: t('uncertaintyTolerance.exercises.breathing.description')
  },
  {
    type: 'reflection',
    title: t('uncertaintyTolerance.exercises.reflection.title'),
    description: t('uncertaintyTolerance.exercises.reflection.description')
  },
  {
    type: 'acceptance',
    title: t('uncertaintyTolerance.exercises.acceptance.title'),
    description: t('uncertaintyTolerance.exercises.acceptance.description')
  }
])

const currentExercise = computed(() => exercises.value[currentExerciseIndex.value] || exercises.value[0])

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  currentExerciseIndex.value = 0
  reflectionText.value = ''
  breathingCount.value = 0
  startBreathing()
}

const startBreathing = () => {
  if (breathingInterval) clearInterval(breathingInterval)
  breathingCount.value = 0
  breathingInterval = setInterval(() => {
    breathingCount.value++
  }, 2000)
}

const nextExercise = () => {
  if (currentExerciseIndex.value < exercises.value.length - 1) {
    currentExerciseIndex.value++
    if (currentExercise.value.type === 'breathing') {
      startBreathing()
    } else {
      if (breathingInterval) clearInterval(breathingInterval)
    }
  } else {
    completeExercise()
  }
}

const previousExercise = () => {
  if (currentExerciseIndex.value > 0) {
    currentExerciseIndex.value--
    if (currentExercise.value.type === 'breathing') {
      startBreathing()
    } else {
      if (breathingInterval) clearInterval(breathingInterval)
    }
  }
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

