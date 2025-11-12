<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:circle-dashed-fill" class="mx-auto text-7xl text-cyan-600 dark:text-cyan-400 animate-pulse" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.magicBubbleBreathing.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.magicBubbleBreathing.description") }}
        </p>

        <!-- Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-cyan-200 dark:border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:wind-fill" class="mx-auto mb-2 text-3xl text-cyan-600 dark:text-cyan-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("magicBubbleBreathing.benefits.calm.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("magicBubbleBreathing.benefits.calm.description") }}</p>
          </div>
          <div class="border-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:eye-fill" class="mx-auto mb-2 text-3xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("magicBubbleBreathing.benefits.focus.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("magicBubbleBreathing.benefits.focus.description") }}</p>
          </div>
          <div class="border-2 border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:sparkle-fill" class="mx-auto mb-2 text-3xl text-purple-600 dark:text-purple-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("magicBubbleBreathing.benefits.fun.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("magicBubbleBreathing.benefits.fun.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 dark:from-cyan-500 dark:to-blue-500 dark:hover:from-cyan-600 dark:hover:to-blue-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("magicBubbleBreathing.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive">
      <div class="mb-6 text-center">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t("magicBubbleBreathing.session.title") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t("magicBubbleBreathing.session.subtitle") }}
        </p>
        <div class="mt-4 text-2xl font-bold text-cyan-600 dark:text-cyan-400">
          {{ currentBreath }}/{{ totalBreaths }} {{ $t("magicBubbleBreathing.session.breaths") }}
        </div>
      </div>

      <!-- Magic Bubble Visualization -->
      <div class="border-4 border-cyan-300 dark:border-cyan-600 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-cyan-900/30 dark:via-blue-900/30 dark:to-purple-900/30 p-8 md:p-12 rounded-2xl transition-colors duration-200">
        <div class="flex flex-col items-center">
          <!-- Bubble Canvas Container -->
          <div class="mb-8 relative">
            <canvas
              ref="bubbleCanvas"
              class="border-2 border-cyan-200 dark:border-cyan-700 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 dark:from-slate-800 dark:to-slate-900"
              :style="{ width: '300px', height: '300px' }"
            ></canvas>
            
            <!-- Floating Sparkles -->
            <div 
              v-for="(sparkle, index) in sparkles" 
              :key="index"
              class="absolute pointer-events-none"
              :style="{
                left: sparkle.x + 'px',
                top: sparkle.y + 'px',
                transform: `scale(${sparkle.scale})`,
                opacity: sparkle.opacity
              }"
            >
              <Icon name="ph:sparkle-fill" class="text-cyan-400" :style="{ fontSize: sparkle.size + 'px' }" />
            </div>
          </div>

          <!-- Breathing Guidance -->
          <div class="mb-6 text-center">
            <div class="transition-all duration-500">
              <div class="mb-2 text-3xl md:text-4xl font-bold" 
                   :class="breathingPhase === 'inhale' 
                     ? 'text-cyan-600 dark:text-cyan-400' 
                     : 'text-blue-600 dark:text-blue-400'">
                {{
                  breathingPhase === "inhale"
                    ? $t("magicBubbleBreathing.session.breatheIn")
                    : $t("magicBubbleBreathing.session.breatheOut")
                }}
              </div>
              <div class="text-xl text-gray-600 dark:text-slate-400 font-medium">
                {{
                  breathingPhase === "inhale"
                    ? $t("magicBubbleBreathing.session.makeBigger")
                    : $t("magicBubbleBreathing.session.makeSmaller")
                }}
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mb-6 w-full max-w-xs">
            <div class="h-4 bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-100 rounded-full"
                :style="{ width: breathProgress + '%' }"
              ></div>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex gap-4">
            <button
              @click="stopExercise"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>{{ $t("magicBubbleBreathing.buttons.stop") }}</span>
            </button>
          </div>
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
          {{ $t("magicBubbleBreathing.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("magicBubbleBreathing.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 dark:from-cyan-500 dark:to-blue-500 dark:hover:from-cyan-600 dark:hover:to-blue-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("magicBubbleBreathing.buttons.tryAgain") }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const { t } = useI18n()

const exerciseSection = ref(null)
const bubbleCanvas = ref(null)
const exerciseActive = ref(false)
const exerciseCompleted = ref(false)
const breathingPhase = ref('inhale')
const currentBreath = ref(0)
const totalBreaths = ref(5)
const remainingTime = ref(3000)
const breathProgress = ref(0)
const sparkles = ref([])

let ctx = null
let breathInterval = null
let progressInterval = null
let sparkleInterval = null
let animationFrame = null
const breathDuration = 3000 // 3 seconds for kids
const bubbleSize = ref(0.4) // Start small (exhaled)
const targetBubbleSize = ref(1.0) // Target size (inhaled)

const initCanvas = () => {
  if (!bubbleCanvas.value) return
  
  bubbleCanvas.value.width = 300
  bubbleCanvas.value.height = 300
  ctx = bubbleCanvas.value.getContext('2d')
  
  drawBubble()
}

const drawBubble = () => {
  if (!ctx || !bubbleCanvas.value) return
  
  const centerX = bubbleCanvas.value.width / 2
  const centerY = bubbleCanvas.value.height / 2
  const radius = 80 * bubbleSize.value
  
  // Clear canvas
  ctx.clearRect(0, 0, bubbleCanvas.value.width, bubbleCanvas.value.height)
  
  // Draw bubble with gradient and shine
  const gradient = ctx.createRadialGradient(
    centerX - radius * 0.3,
    centerY - radius * 0.3,
    0,
    centerX,
    centerY,
    radius
  )
  
  if (breathingPhase.value === 'inhale') {
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(0.3, 'rgba(147, 197, 253, 0.6)') // blue-300
    gradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.4)') // blue-500
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.3)') // cyan-500
  } else {
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)')
    gradient.addColorStop(0.3, 'rgba(165, 243, 252, 0.5)') // cyan-200
    gradient.addColorStop(0.6, 'rgba(34, 211, 238, 0.4)') // cyan-400
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.2)') // cyan-500
  }
  
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fill()
  
  // Draw bubble highlight (shine)
  const highlightGradient = ctx.createRadialGradient(
    centerX - radius * 0.4,
    centerY - radius * 0.4,
    0,
    centerX - radius * 0.4,
    centerY - radius * 0.4,
    radius * 0.5
  )
  highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
  highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  
  ctx.fillStyle = highlightGradient
  ctx.beginPath()
  ctx.arc(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.4, 0, Math.PI * 2)
  ctx.fill()
  
  // Draw bubble outline
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.stroke()
  
  // Draw rainbow reflection on bubble
  if (breathingPhase.value === 'inhale' && bubbleSize.value > 0.7) {
    const rainbowGradient = ctx.createLinearGradient(
      centerX - radius,
      centerY - radius,
      centerX + radius,
      centerY + radius
    )
    rainbowGradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)') // pink
    rainbowGradient.addColorStop(0.3, 'rgba(139, 92, 246, 0.3)') // purple
    rainbowGradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.3)') // blue
    rainbowGradient.addColorStop(1, 'rgba(6, 182, 212, 0.3)') // cyan
    
    ctx.strokeStyle = rainbowGradient
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2)
    ctx.stroke()
  }
}

const animateBubble = () => {
  if (!exerciseActive.value) return
  
  const progress = (breathDuration - remainingTime.value) / breathDuration
  const easeProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI)
  
  if (breathingPhase.value === 'inhale') {
    bubbleSize.value = 0.4 + (1.0 - 0.4) * easeProgress
    targetBubbleSize.value = 1.0
  } else {
    bubbleSize.value = 1.0 - (1.0 - 0.4) * easeProgress
    targetBubbleSize.value = 0.4
  }
  
  drawBubble()
  
  if (exerciseActive.value) {
    animationFrame = requestAnimationFrame(animateBubble)
  }
}

const createSparkles = () => {
  if (sparkleInterval) clearInterval(sparkleInterval)
  
  sparkleInterval = setInterval(() => {
    if (!exerciseActive.value) return
    
    // Add new sparkles
    if (sparkles.value.length < 10 && Math.random() > 0.7) {
      sparkles.value.push({
        x: Math.random() * 300,
        y: Math.random() * 300,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.3 + Math.random() * 0.7,
        size: 8 + Math.random() * 12
      })
    }
    
    // Update and remove old sparkles
    sparkles.value = sparkles.value
      .map(sparkle => ({
        ...sparkle,
        opacity: sparkle.opacity * 0.95,
        scale: sparkle.scale * 1.02
      }))
      .filter(sparkle => sparkle.opacity > 0.1)
  }, 200)
}

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  currentBreath.value = 0
  breathingPhase.value = 'inhale'
  remainingTime.value = breathDuration
  breathProgress.value = 0
  bubbleSize.value = 0.4
  sparkles.value = []
  
  nextTick(() => {
    initCanvas()
    startBreathingCycle()
    createSparkles()
    animateBubble()
  })
}

const startBreathingCycle = () => {
  if (breathInterval) clearInterval(breathInterval)
  
  breathInterval = setInterval(() => {
    if (breathingPhase.value === 'inhale') {
      breathingPhase.value = 'exhale'
    } else {
      breathingPhase.value = 'inhale'
      currentBreath.value++
      
      if (currentBreath.value >= totalBreaths.value) {
        completeExercise()
        return
      }
    }
    
    remainingTime.value = breathDuration
    breathProgress.value = 0
  }, breathDuration)
  
  // Start progress tracking
  startProgressTracking()
}

const startProgressTracking = () => {
  if (progressInterval) clearInterval(progressInterval)
  
  progressInterval = setInterval(() => {
    remainingTime.value -= 50
    breathProgress.value = ((breathDuration - remainingTime.value) / breathDuration) * 100
    
    if (remainingTime.value <= 0) {
      remainingTime.value = breathDuration
      breathProgress.value = 0
    }
  }, 50)
}

const stopExercise = () => {
  if (breathInterval) clearInterval(breathInterval)
  if (progressInterval) clearInterval(progressInterval)
  if (sparkleInterval) clearInterval(sparkleInterval)
  if (animationFrame) cancelAnimationFrame(animationFrame)
  
  exerciseActive.value = false
  exerciseCompleted.value = false
  currentBreath.value = 0
  breathingPhase.value = 'inhale'
  sparkles.value = []
}

const restartExercise = () => {
  stopExercise()
  setTimeout(() => {
    startExercise()
  }, 100)
}

const completeExercise = () => {
  if (breathInterval) clearInterval(breathInterval)
  if (progressInterval) clearInterval(progressInterval)
  if (sparkleInterval) clearInterval(sparkleInterval)
  if (animationFrame) cancelAnimationFrame(animationFrame)
  
  exerciseActive.value = false
  exerciseCompleted.value = true
  sparkles.value = []
}

onMounted(() => {
  nextTick(() => {
    initCanvas()
  })
})

onUnmounted(() => {
  if (breathInterval) clearInterval(breathInterval)
  if (progressInterval) clearInterval(progressInterval)
  if (sparkleInterval) clearInterval(sparkleInterval)
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

