<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:jar-fill" class="mx-auto text-7xl text-purple-600 dark:text-purple-400 animate-pulse" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.calmDownJar.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.calmDownJar.description") }}
        </p>

        <!-- Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:clock-fill" class="mx-auto mb-2 text-3xl text-purple-600 dark:text-purple-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("calmDownJar.benefits.patience.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("calmDownJar.benefits.patience.description") }}</p>
          </div>
          <div class="border-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:eye-fill" class="mx-auto mb-2 text-3xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("calmDownJar.benefits.focus.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("calmDownJar.benefits.focus.description") }}</p>
          </div>
          <div class="border-2 border-pink-200 dark:border-pink-600 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-pink-600 dark:text-pink-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("calmDownJar.benefits.calm.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("calmDownJar.benefits.calm.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("calmDownJar.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive" class="text-center">
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t("calmDownJar.session.title") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t("calmDownJar.session.subtitle") }}
        </p>
      </div>

      <!-- Calm Down Jar Visualization -->
      <div class="border-4 border-purple-300 dark:border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-8 md:p-12 rounded-2xl transition-colors duration-200 max-w-2xl mx-auto">
        <!-- Jar Container -->
        <div class="relative mx-auto" style="width: 200px; height: 300px;">
          <!-- Jar -->
          <div class="absolute inset-0 border-4 border-purple-400 dark:border-purple-500 rounded-b-full rounded-t-lg bg-gradient-to-b from-purple-100/50 to-purple-200/50 dark:from-purple-800/30 dark:to-purple-900/30 overflow-hidden">
            <!-- Water/Liquid -->
            <div class="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-b from-blue-200/60 to-purple-300/60 dark:from-blue-800/40 dark:to-purple-800/40 transition-all duration-1000"></div>
            
            <!-- Glitter Particles -->
            <div
              v-for="(particle, index) in particles"
              :key="index"
              class="absolute rounded-full"
              :style="{
                width: particle.size + 'px',
                height: particle.size + 'px',
                left: particle.x + '%',
                top: particle.y + '%',
                backgroundColor: particle.color,
                opacity: particle.opacity,
                transition: 'all 0.5s ease-out',
                transform: `rotate(${particle.rotation}deg)`
              }"
            ></div>
          </div>
          
          <!-- Lid -->
          <div class="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-purple-600 dark:bg-purple-500 rounded-full border-2 border-purple-700 dark:border-purple-400"></div>
        </div>

        <!-- Instructions -->
        <div class="mt-8 mb-6">
          <p class="text-2xl font-bold mb-2" :class="isSettled ? 'text-green-600 dark:text-green-400' : 'text-purple-600 dark:text-purple-400'">
            {{ isSettled ? $t("calmDownJar.session.settled") : $t("calmDownJar.session.watching") }}
          </p>
          <p class="text-lg text-gray-600 dark:text-slate-300">
            {{ $t("calmDownJar.session.instruction") }}
          </p>
        </div>

        <!-- Timer -->
        <div class="mb-6">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {{ formatTime(elapsedTime) }}
          </div>
          <div class="text-sm text-gray-500 dark:text-slate-400">
            {{ $t("calmDownJar.session.timeElapsed") }}
          </div>
        </div>

        <!-- Shake Button (if settled) -->
        <div v-if="isSettled" class="mb-6">
          <button
            @click="shakeJar"
            class="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 mx-auto"
          >
            <Icon name="ph:hand-waving-fill" class="text-xl" />
            <span>{{ $t("calmDownJar.buttons.shake") }}</span>
          </button>
        </div>

        <!-- Controls -->
        <div class="flex gap-4 justify-center">
          <button
            @click="stopExercise"
            class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
          >
            <Icon name="ph:stop-fill" class="text-lg" />
            <span>{{ $t("calmDownJar.buttons.stop") }}</span>
          </button>
          <button
            v-if="elapsedTime >= 60"
            @click="completeExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600 px-6 py-3 font-bold text-white rounded-lg shadow-lg transition-all duration-200"
          >
            <Icon name="ph:check-circle-fill" class="text-lg" />
            <span>{{ $t("calmDownJar.buttons.finish") }}</span>
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
          {{ $t("calmDownJar.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("calmDownJar.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("calmDownJar.buttons.tryAgain") }}</span>
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
const elapsedTime = ref(0)
const isSettled = ref(false)

const colors = ['#fbbf24', '#f59e0b', '#d97706', '#f97316', '#ea580c', '#dc2626', '#ef4444']
const particles = ref([])

let timeInterval = null
let settleCheckInterval = null

const createParticles = () => {
  particles.value = Array(30).fill(null).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: 0.8,
    rotation: Math.random() * 360,
    speed: Math.random() * 0.5 + 0.2
  }))
}

const shakeJar = () => {
  isSettled.value = false
  particles.value.forEach(particle => {
    particle.y = Math.random() * 30 + 10 // Top of jar
    particle.x = Math.random() * 100
    particle.opacity = 0.8
    particle.rotation = Math.random() * 360
  })
}

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  elapsedTime.value = 0
  isSettled.value = false
  createParticles()
  shakeJar()
  
  startTimeTracking()
  startSettleCheck()
}

const startTimeTracking = () => {
  if (timeInterval) clearInterval(timeInterval)
  
  timeInterval = setInterval(() => {
    elapsedTime.value += 1
  }, 1000)
}

const startSettleCheck = () => {
  if (settleCheckInterval) clearInterval(settleCheckInterval)
  
  settleCheckInterval = setInterval(() => {
    // Gradually move particles down
    particles.value.forEach(particle => {
      if (particle.y < 85) {
        particle.y += particle.speed * 0.1
        if (particle.y > 80) {
          particle.opacity = Math.max(0.3, particle.opacity - 0.01)
        }
      }
    })
    
    // Check if all particles are settled
    const allSettled = particles.value.every(p => p.y >= 80)
    if (allSettled && !isSettled.value) {
      isSettled.value = true
    }
  }, 100)
}

const stopExercise = () => {
  if (timeInterval) clearInterval(timeInterval)
  if (settleCheckInterval) clearInterval(settleCheckInterval)
  
  exerciseActive.value = false
  exerciseCompleted.value = false
  elapsedTime.value = 0
}

const completeExercise = () => {
  if (timeInterval) clearInterval(timeInterval)
  if (settleCheckInterval) clearInterval(settleCheckInterval)
  
  exerciseActive.value = false
  exerciseCompleted.value = true
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => {
    startExercise()
  }, 100)
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
  if (settleCheckInterval) clearInterval(settleCheckInterval)
})
</script>

