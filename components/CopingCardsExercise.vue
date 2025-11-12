<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <Icon name="ph:cards-fill" class="mx-auto text-7xl text-indigo-600 dark:text-indigo-400 mb-6" />
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.copingCards.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.copingCards.description") }}
        </p>
        <button @click="startExercise" class="mx-auto flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("copingCards.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <div v-if="exerciseActive" class="border-4 border-indigo-300 dark:border-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-8 md:p-12 rounded-2xl">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-6 text-center">{{ $t("copingCards.session.title") }}</h2>
        
        <div v-if="mode === 'create'" class="mb-8">
          <div class="p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-indigo-200 dark:border-indigo-700 mb-6">
            <label class="block text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">{{ $t("copingCards.session.cardTitle") }}</label>
            <input
              v-model="newCard.title"
              type="text"
              :placeholder="$t('copingCards.session.titlePlaceholder')"
              class="w-full border-2 border-indigo-300 dark:border-indigo-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100 mb-4"
            />
            <label class="block text-lg font-semibold text-gray-800 dark:text-slate-100 mb-3">{{ $t("copingCards.session.cardContent") }}</label>
            <textarea
              v-model="newCard.content"
              :placeholder="$t('copingCards.session.contentPlaceholder')"
              class="w-full border-2 border-indigo-300 dark:border-indigo-600 rounded-lg p-3 bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-100"
              rows="6"
            ></textarea>
          </div>
          <div class="flex gap-4 justify-center">
            <button @click="saveCard" :disabled="!newCard.title.trim() || !newCard.content.trim()" class="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 font-medium text-white rounded-lg transition-colors disabled:opacity-50">
              {{ $t("copingCards.buttons.save") }}
            </button>
            <button @click="cancelCreate" class="bg-gray-600 hover:bg-gray-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
              {{ $t("copingCards.buttons.cancel") }}
            </button>
          </div>
        </div>

        <div v-if="mode === 'view'" class="mb-8">
          <div class="flex gap-4 justify-center mb-6">
            <button @click="mode = 'create'" class="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 font-medium text-white rounded-lg transition-colors">
              {{ $t("copingCards.buttons.createNew") }}
            </button>
          </div>
          <div v-if="cards.length === 0" class="text-center py-12">
            <p class="text-gray-600 dark:text-slate-400 text-lg">{{ $t("copingCards.session.noCards") }}</p>
          </div>
          <div v-else class="grid gap-4 md:grid-cols-2">
            <div
              v-for="(card, index) in cards"
              :key="index"
              class="p-6 bg-white dark:bg-slate-800 rounded-lg border-2 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 transition-colors"
            >
              <h3 class="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-3">{{ card.title }}</h3>
              <p class="text-gray-700 dark:text-slate-300 whitespace-pre-line">{{ card.content }}</p>
              <button @click="deleteCard(index)" class="mt-4 text-red-600 hover:text-red-700 text-sm font-medium">
                {{ $t("copingCards.buttons.delete") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="exerciseCompleted" class="text-center">
      <Icon name="ph:check-circle-fill" class="mx-auto text-7xl text-green-500 dark:text-green-400 mb-4" />
      <h2 class="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{{ $t("copingCards.completion.title") }}</h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">{{ $t("copingCards.completion.message") }}</p>
      <button @click="restartExercise" class="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-lg font-bold text-white rounded-lg transition-colors">
        {{ $t("copingCards.buttons.tryAgain") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const { t } = useI18n()

const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const mode = ref('view') // 'view' or 'create'
const cards = ref([])
const newCard = ref({ title: '', content: '' })

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  mode.value = 'view'
  // Load cards from localStorage if available
  const saved = localStorage.getItem('copingCards')
  if (saved) {
    cards.value = JSON.parse(saved)
  }
}

const saveCard = () => {
  if (newCard.value.title.trim() && newCard.value.content.trim()) {
    cards.value.push({ ...newCard.value })
    localStorage.setItem('copingCards', JSON.stringify(cards.value))
    newCard.value = { title: '', content: '' }
    mode.value = 'view'
  }
}

const cancelCreate = () => {
  newCard.value = { title: '', content: '' }
  mode.value = 'view'
}

const deleteCard = (index) => {
  cards.value.splice(index, 1)
  localStorage.setItem('copingCards', JSON.stringify(cards.value))
}

const stopExercise = () => {
  exerciseActive.value = false
  exerciseCompleted.value = false
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => startExercise(), 100)
}
</script>

