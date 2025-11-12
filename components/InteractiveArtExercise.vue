<template>
  <section class="scroll-offset" ref="exerciseSection" v-auto-animate>
    <!-- Pre-Exercise State -->
    <div v-if="!exerciseActive && !exerciseCompleted" class="text-center">
      <div class="mb-8">
        <div class="mb-6">
          <Icon name="ph:palette-fill" class="mx-auto text-7xl text-purple-600 dark:text-purple-400" />
        </div>
        <h1 class="ptitle text-4xl md:text-5xl">{{ $t("techniques.interactiveArt.name") }}</h1>
        <p class="mx-auto mb-6 max-w-2xl leading-relaxed text-gray-600 dark:text-slate-300 text-lg">
          {{ $t("techniques.interactiveArt.description") }}
        </p>

        <!-- Benefits -->
        <div class="mx-auto mb-8 grid max-w-3xl gap-4 md:grid-cols-3">
          <div class="border-2 border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:brain-fill" class="mx-auto mb-2 text-3xl text-purple-600 dark:text-purple-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("interactiveArt.benefits.focus.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("interactiveArt.benefits.focus.description") }}</p>
          </div>
          <div class="border-2 border-pink-200 dark:border-pink-600 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:heart-fill" class="mx-auto mb-2 text-3xl text-pink-600 dark:text-pink-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("interactiveArt.benefits.calm.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("interactiveArt.benefits.calm.description") }}</p>
          </div>
          <div class="border-2 border-blue-200 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-200">
            <Icon name="ph:sparkle-fill" class="mx-auto mb-2 text-3xl text-blue-600 dark:text-blue-400" />
            <p class="mb-1 font-bold text-gray-800 dark:text-slate-100 text-lg">
              {{ $t("interactiveArt.benefits.creative.title") }}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300">{{ $t("interactiveArt.benefits.creative.description") }}</p>
          </div>
        </div>

        <button
          @click="startExercise"
          class="mx-auto flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 px-10 py-5 text-xl font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2"
        >
          <Icon name="ph:play-fill" class="text-2xl" />
          <span>{{ $t("interactiveArt.buttons.begin") }}</span>
        </button>
      </div>
    </div>

    <!-- Exercise Interface -->
    <div v-if="exerciseActive" class="text-center">
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
          {{ $t("interactiveArt.session.title") }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-slate-300">
          {{ $t("interactiveArt.session.subtitle") }}
        </p>
      </div>

      <!-- Canvas Container -->
      <div class="border-4 border-purple-300 dark:border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-4 md:p-8 rounded-2xl transition-colors duration-200">
        <!-- Canvas -->
        <div class="relative mx-auto mb-6" style="max-width: 800px;">
          <canvas
            ref="artCanvas"
            class="w-full h-auto border-2 border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 cursor-crosshair touch-none"
            :style="{ maxHeight: '70vh', minHeight: '400px' }"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="stopDrawing"
            @mouseleave="stopDrawing"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="stopDrawing"
          ></canvas>
        </div>

        <!-- Controls -->
        <div class="space-y-4">
          <!-- Color Palette -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
              {{ $t("interactiveArt.controls.colors") }}
            </label>
            <div class="flex flex-wrap justify-center gap-2">
              <button
                v-for="(color, index) in colorPalette"
                :key="index"
                @click="selectedColor = color"
                class="w-10 h-10 rounded-full border-2 transition-all duration-200 transform hover:scale-110"
                :class="selectedColor === color ? 'border-gray-800 dark:border-white scale-110' : 'border-gray-300 dark:border-slate-600'"
                :style="{ backgroundColor: color }"
                :aria-label="`Select ${color} color`"
              ></button>
            </div>
          </div>

          <!-- Symmetry Mode -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
              {{ $t("interactiveArt.controls.symmetry") }}
            </label>
            <div class="flex flex-wrap justify-center gap-2">
              <button
                v-for="mode in symmetryModes"
                :key="mode.value"
                @click="symmetryMode = mode.value"
                class="px-4 py-2 rounded-lg border-2 transition-all duration-200 text-sm font-medium"
                :class="symmetryMode === mode.value
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-gray-300 dark:border-slate-600 hover:border-purple-400'"
              >
                <Icon :name="mode.icon" class="inline-block mr-1" />
                {{ $t(`interactiveArt.symmetry.${mode.value}`) }}
              </button>
            </div>
          </div>

          <!-- Brush Size -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
              {{ $t("interactiveArt.controls.brushSize") }}: {{ brushSize }}px
            </label>
            <input
              v-model.number="brushSize"
              type="range"
              min="2"
              max="30"
              class="w-full max-w-md mx-auto"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap justify-center gap-4">
            <button
              @click="clearCanvas"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:trash-fill" class="text-lg" />
              <span>{{ $t("interactiveArt.buttons.clear") }}</span>
            </button>
            <button
              @click="stopExercise"
              class="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-6 py-3 font-medium text-white rounded-lg transition-colors duration-200"
            >
              <Icon name="ph:stop-fill" class="text-lg" />
              <span>{{ $t("interactiveArt.buttons.stop") }}</span>
            </button>
          </div>
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
          {{ $t("interactiveArt.completion.title") }}
        </h2>
        <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-slate-300">
          {{ $t("interactiveArt.completion.message") }}
        </p>
        <div class="flex gap-4 justify-center">
          <button
            @click="restartExercise"
            class="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <Icon name="ph:arrow-clockwise" class="text-xl" />
            <span>{{ $t("interactiveArt.buttons.createAgain") }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const { t } = useI18n()

const exerciseSection = ref(null)
const artCanvas = ref(null)
const exerciseActive = ref(false)
const exerciseCompleted = ref(false)

const isDrawing = ref(false)
const selectedColor = ref('#8b5cf6') // purple-500
const brushSize = ref(8)
const symmetryMode = ref('mirror') // 'none', 'mirror', 'radial4', 'radial8'

const colorPalette = [
  '#8b5cf6', // purple-500
  '#ec4899', // pink-500
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#6366f1', // indigo-500
  '#14b8a6', // teal-500
]

const symmetryModes = [
  { value: 'none', icon: 'ph:circle' },
  { value: 'mirror', icon: 'ph:arrows-left-right' },
  { value: 'radial4', icon: 'ph:arrows-clockwise' },
  { value: 'radial8', icon: 'ph:star-fill' },
]

let ctx = null
let lastX = 0
let lastY = 0
let animationFrame = null
let particles = []
let isAnimating = false

// WeaveSilk-style particle system
class Particle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.life = 1.0
    this.decay = 0.02 + Math.random() * 0.02
    this.color = color
    this.size = 2 + Math.random() * 3
  }
  
  update() {
    this.x += this.vx
    this.y += this.vy
    this.vx *= 0.98
    this.vy *= 0.98
    this.life -= this.decay
  }
  
  draw(ctx) {
    if (this.life <= 0) return
    
    const alpha = this.life
    ctx.globalAlpha = alpha * 0.6
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1.0
  }
  
  isDead() {
    return this.life <= 0
  }
}

const initCanvas = () => {
  if (!artCanvas.value) return
  
  ctx = artCanvas.value.getContext('2d')
  resizeCanvas()
  
  // Set initial canvas style - dark background like WeaveSilk
  const bgColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0f172a' : '#ffffff'
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, artCanvas.value.width, artCanvas.value.height)
  
  // Start particle animation loop
  if (!isAnimating) {
    animateParticles()
  }
}

const animateParticles = () => {
  if (!isAnimating || !ctx || !artCanvas.value) return
  
  // Fade out old particles slightly
  const bgColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0f172a' : '#ffffff'
  ctx.fillStyle = bgColor
  ctx.globalAlpha = 0.1
  ctx.fillRect(0, 0, artCanvas.value.width, artCanvas.value.height)
  ctx.globalAlpha = 1.0
  
  // Update and draw particles
  particles = particles.filter(p => {
    p.update()
    p.draw(ctx)
    return !p.isDead()
  })
  
  animationFrame = requestAnimationFrame(animateParticles)
}

const resizeCanvas = () => {
  if (!artCanvas.value) return
  
  const container = artCanvas.value.parentElement
  const maxWidth = 800
  const maxHeight = window.innerHeight * 0.7
  
  const width = Math.min(container.clientWidth - 32, maxWidth)
  const height = Math.max(400, Math.min(maxHeight, width * 0.75))
  
  artCanvas.value.width = width
  artCanvas.value.height = height
  
  // Redraw background if canvas was resized
  if (ctx) {
    const bgColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0f172a' : '#ffffff'
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, artCanvas.value.width, artCanvas.value.height)
  }
}

const getEventPos = (e) => {
  const rect = artCanvas.value.getBoundingClientRect()
  const scaleX = artCanvas.value.width / rect.width
  const scaleY = artCanvas.value.height / rect.height
  
  if (e.touches) {
    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY
    }
  }
  
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  }
}

const startDrawing = (e) => {
  e.preventDefault()
  isDrawing.value = true
  const pos = getEventPos(e)
  lastX = pos.x
  lastY = pos.y
  // Create initial particles
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(
      pos.x + (Math.random() - 0.5) * 5,
      pos.y + (Math.random() - 0.5) * 5,
      selectedColor.value
    ))
  }
}

const draw = (e) => {
  if (!isDrawing.value) return
  e.preventDefault()
  
  const pos = getEventPos(e)
  const centerX = artCanvas.value.width / 2
  const centerY = artCanvas.value.height / 2
  
  // Create flowing particles (WeaveSilk style)
  const distance = Math.sqrt((pos.x - lastX) ** 2 + (pos.y - lastY) ** 2)
  const numParticles = Math.max(1, Math.floor(distance / 3))
  
  for (let i = 0; i < numParticles; i++) {
    const t = i / numParticles
    const px = lastX + (pos.x - lastX) * t
    const py = lastY + (pos.y - lastY) * t
    
    // Add particles with slight variation
    for (let j = 0; j < 2; j++) {
      particles.push(new Particle(
        px + (Math.random() - 0.5) * 5,
        py + (Math.random() - 0.5) * 5,
        selectedColor.value
      ))
    }
  }
  
  // Draw smooth flowing line with gradient
  const gradient = ctx.createLinearGradient(lastX, lastY, pos.x, pos.y)
  gradient.addColorStop(0, selectedColor.value + '80')
  gradient.addColorStop(1, selectedColor.value + '40')
  
  ctx.strokeStyle = gradient
  ctx.lineWidth = brushSize.value * 1.5
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.shadowBlur = 10
  ctx.shadowColor = selectedColor.value
  
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()
  
  ctx.shadowBlur = 0
  
  // Apply symmetry for the line
  if (symmetryMode.value === 'mirror') {
    const mirroredX1 = artCanvas.value.width - lastX
    const mirroredX2 = artCanvas.value.width - pos.x
    const gradient2 = ctx.createLinearGradient(mirroredX1, lastY, mirroredX2, pos.y)
    gradient2.addColorStop(0, selectedColor.value + '80')
    gradient2.addColorStop(1, selectedColor.value + '40')
    
    ctx.strokeStyle = gradient2
    ctx.shadowBlur = 10
    ctx.shadowColor = selectedColor.value
    ctx.beginPath()
    ctx.moveTo(mirroredX1, lastY)
    ctx.lineTo(mirroredX2, pos.y)
    ctx.stroke()
    ctx.shadowBlur = 0
    
    // Add mirrored particles
    for (let i = 0; i < numParticles; i++) {
      const t = i / numParticles
      const px = artCanvas.value.width - (lastX + (pos.x - lastX) * t)
      const py = lastY + (pos.y - lastY) * t
      for (let j = 0; j < 2; j++) {
        particles.push(new Particle(
          px + (Math.random() - 0.5) * 5,
          py + (Math.random() - 0.5) * 5,
          selectedColor.value
        ))
      }
    }
  } else if (symmetryMode.value === 'radial4') {
    const points = [
      { x1: lastX, y1: lastY, x2: pos.x, y2: pos.y },
      { x1: artCanvas.value.width - lastX, y1: lastY, x2: artCanvas.value.width - pos.x, y2: pos.y },
      { x1: lastX, y1: artCanvas.value.height - lastY, x2: pos.x, y2: artCanvas.value.height - pos.y },
      { x1: artCanvas.value.width - lastX, y1: artCanvas.value.height - lastY, x2: artCanvas.value.width - pos.x, y2: artCanvas.value.height - pos.y }
    ]
    points.forEach((point, idx) => {
      const gradient = ctx.createLinearGradient(point.x1, point.y1, point.x2, point.y2)
      gradient.addColorStop(0, selectedColor.value + '80')
      gradient.addColorStop(1, selectedColor.value + '40')
      ctx.strokeStyle = gradient
      ctx.shadowBlur = 10
      ctx.shadowColor = selectedColor.value
      ctx.beginPath()
      ctx.moveTo(point.x1, point.y1)
      ctx.lineTo(point.x2, point.y2)
      ctx.stroke()
      ctx.shadowBlur = 0
    })
  } else if (symmetryMode.value === 'radial8') {
    const dx1 = lastX - centerX
    const dy1 = lastY - centerY
    const dx2 = pos.x - centerX
    const dy2 = pos.y - centerY
    
    const lines = [
      { x1: centerX + dx1, y1: centerY + dy1, x2: centerX + dx2, y2: centerY + dy2 },
      { x1: centerX - dx1, y1: centerY + dy1, x2: centerX - dx2, y2: centerY + dy2 },
      { x1: centerX + dx1, y1: centerY - dy1, x2: centerX + dx2, y2: centerY - dy2 },
      { x1: centerX - dx1, y1: centerY - dy1, x2: centerX - dx2, y2: centerY - dy2 },
      { x1: centerX + dy1, y1: centerY + dx1, x2: centerX + dy2, y2: centerY + dx2 },
      { x1: centerX - dy1, y1: centerY + dx1, x2: centerX - dy2, y2: centerY + dx2 },
      { x1: centerX + dy1, y1: centerY - dx1, x2: centerX + dy2, y2: centerY - dx2 },
      { x1: centerX - dy1, y1: centerY - dx1, x2: centerX - dy2, y2: centerY - dx2 }
    ]
    lines.forEach(line => {
      const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2)
      gradient.addColorStop(0, selectedColor.value + '80')
      gradient.addColorStop(1, selectedColor.value + '40')
      ctx.strokeStyle = gradient
      ctx.shadowBlur = 10
      ctx.shadowColor = selectedColor.value
      ctx.beginPath()
      ctx.moveTo(line.x1, line.y1)
      ctx.lineTo(line.x2, line.y2)
      ctx.stroke()
      ctx.shadowBlur = 0
    })
  }
  
  lastX = pos.x
  lastY = pos.y
}

const stopDrawing = () => {
  isDrawing.value = false
}

const handleTouchStart = (e) => {
  e.preventDefault()
  startDrawing(e)
}

const handleTouchMove = (e) => {
  e.preventDefault()
  draw(e)
}

const clearCanvas = () => {
  if (!ctx || !artCanvas.value) return
  const bgColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#0f172a' : '#ffffff'
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, artCanvas.value.width, artCanvas.value.height)
  particles = []
}

const startExercise = () => {
  exerciseActive.value = true
  exerciseCompleted.value = false
  isAnimating = true
  particles = []
  nextTick(() => {
    initCanvas()
    window.addEventListener('resize', resizeCanvas)
  })
}

const stopExercise = () => {
  exerciseActive.value = false
  exerciseCompleted.value = false
  isAnimating = false
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  window.removeEventListener('resize', resizeCanvas)
}

const completeExercise = () => {
  exerciseActive.value = false
  exerciseCompleted.value = true
  isAnimating = false
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  window.removeEventListener('resize', resizeCanvas)
}

const restartExercise = () => {
  stopExercise()
  clearCanvas()
  setTimeout(() => {
    startExercise()
  }, 100)
}

onMounted(() => {
  // Canvas will be initialized when exercise starts
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  isAnimating = false
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
})
</script>

