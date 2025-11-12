<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:ghost-fill" class="mx-auto text-7xl text-orange-600 dark:text-orange-400 animate-bounce" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.worryMonster.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.worryMonster.description") }}
        </p>

        <!-- Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-orange-200 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-orange-600 dark:text-orange-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("worryMonster.benefits.feelBetter.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("worryMonster.benefits.feelBetter.description") }}</p>
          </div>
          <div class="border-2 border-yellow-200 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-3xl text-yellow-600 dark:text-yellow-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("worryMonster.benefits.understand.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("worryMonster.benefits.understand.description") }}</p>
          </div>
          <div class="border-2 border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:smiley-fill" class="mx-auto mb-2 text-3xl text-green-600 dark:text-green-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("worryMonster.benefits.control.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("worryMonster.benefits.control.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 dark:from-orange-500 dark:to-red-500 dark:hover:from-orange-600 dark:hover:to-red-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("worryMonster.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive" class="text-center">
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t("worryMonster.session.title") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t("worryMonster.session.subtitle") }}
        </p>
      </div>

      <!-- Worry Monster Interface -->
      <div class="border-4 border-orange-300 dark:border-orange-600 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-900/30 p-8 md:p-12 rounded-2xl transition-colors duration-200 max-w-4xl mx-auto">
        
        <!-- Monster Display -->
        <div class="mb-8">
          <div class="relative inline-block">
            <!-- Monster Character -->
            <div 
              class="text-9xl transition-all duration-300"
              :class="monsterState === 'hungry' ? 'animate-bounce' : monsterState === 'eating' ? 'animate-pulse' : ''"
            >
              <Icon 
                :name="monsterState === 'happy' ? 'ph:smiley-fill' : 'ph:ghost-fill'" 
                :class="monsterState === 'happy' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'"
              />
            </div>
            
            <!-- Speech Bubble -->
            <div 
              v-if="monsterState === 'hungry'"
              class="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 border-2 border-orange-300 dark:border-orange-600 rounded-lg p-4 shadow-lg"
              style="min-width: 200px;"
            >
              <p class="text-lg font-semibold text-gray-800 dark:text-slate-100">
                {{ $t("worryMonster.monster.hungry") }}
              </p>
            </div>
            <div 
              v-else-if="monsterState === 'eating'"
              class="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 border-2 border-orange-300 dark:border-orange-600 rounded-lg p-4 shadow-lg"
              style="min-width: 200px;"
            >
              <p class="text-lg font-semibold text-gray-800 dark:text-slate-100">
                {{ $t("worryMonster.monster.eating") }}
              </p>
            </div>
            <div 
              v-else-if="monsterState === 'happy'"
              class="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 border-2 border-green-300 dark:border-green-600 rounded-lg p-4 shadow-lg"
              style="min-width: 200px;"
            >
              <p class="text-lg font-semibold text-gray-800 dark:text-slate-100">
                {{ $t("worryMonster.monster.happy") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Worry Input -->
        <div v-if="monsterState === 'hungry'" class="mb-6">
          <label class="block text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">
            {{ $t("worryMonster.input.label") }}
          </label>
          <div class="flex gap-3 max-w-2xl mx-auto">
            <input
              v-model="currentWorry"
              type="text"
              :placeholder="$t('worryMonster.input.placeholder')"
              @keyup.enter="addWorry"
              class="flex-1 px-4 py-3 border-2 border-orange-300 dark:border-orange-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              @click="addWorry"
              :disabled="!currentWorry.trim()"
              class="px-6 py-3 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ph:plus-fill" class="text-xl" />
            </button>
          </div>
        </div>

        <!-- Worries List -->
        <div v-if="worries.length > 0" class="mb-6">
          <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-4">
            {{ $t("worryMonster.worries.title") }} ({{ worries.length }})
          </h3>
          <div class="grid gap-3 max-w-2xl mx-auto">
            <div
              v-for="(worry, index) in worries"
              :key="index"
              class="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 border-2 border-orange-200 dark:border-orange-700 rounded-lg transition-all duration-200"
              :class="worry.fed ? 'opacity-50' : 'hover:border-orange-400 dark:hover:border-orange-500'"
            >
              <div class="flex-1 text-left">
                <p class="text-gray-800 dark:text-slate-100 font-medium" :class="worry.fed ? 'line-through' : ''">
                  {{ worry.text }}
                </p>
              </div>
              <button
                v-if="!worry.fed"
                @click="feedWorry(index)"
                class="px-4 py-2 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Icon name="ph:hand-waving-fill" class="text-lg" />
                <span>{{ $t("worryMonster.buttons.feed") }}</span>
              </button>
              <div v-else class="px-4 py-2 text-green-600 dark:text-green-400">
                <Icon name="ph:check-circle-fill" class="text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex gap-4 justify-center">
          <button
            v-if="worries.length === 0"
            @click="stopExercise"
            class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
          >
            <Icon name="ph:stop-fill" class="text-lg" />
            <span>{{ $t("worryMonster.buttons.stop") }}</span>
          </button>
          <button
            v-if="worries.length > 0 && allWorriesFed"
            @click="completeExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-8 py-3 font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:check-circle-fill" class="text-lg" />
            <span>{{ $t("worryMonster.buttons.finish") }}</span>
          </button>
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
          {{ $t("worryMonster.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("worryMonster.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 dark:from-orange-500 dark:to-red-500 dark:hover:from-orange-600 dark:hover:to-red-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("worryMonster.buttons.tryAgain") }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const { t } = useI18n()

const exerciseSection = ref(null)
const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const currentWorry = ref('')
const worries = ref([])
const monsterState = ref('hungry') // 'hungry', 'eating', 'happy'

const allWorriesFed = computed(() => {
  return worries.value.length > 0 && worries.value.every(w => w.fed)
})

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  currentWorry.value = ''
  worries.value = []
  monsterState.value = 'hungry'
}

const addWorry = () => {
  if (!currentWorry.value.trim()) return
  
  worries.value.push({
    text: currentWorry.value.trim(),
    fed: false
  })
  
  currentWorry.value = ''
}

const feedWorry = (index) => {
  if (worries.value[index].fed) return
  
  monsterState.value = 'eating'
  worries.value[index].fed = true
  
  setTimeout(() => {
    if (allWorriesFed.value) {
      monsterState.value = 'happy'
    } else {
      monsterState.value = 'hungry'
    }
  }, 1500)
}

const stopExercise = () => {
  exerciseActive.value = false
  exerciseCompleted.value = false
  currentWorry.value = ''
  worries.value = []
  monsterState.value = 'hungry'
}

const completeExercise = () => {
  exerciseActive.value = false
  exerciseCompleted.value = true
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => {
    startExercise()
  }, 100)
}
</script>

