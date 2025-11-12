<template>
  <div class="mb-8 flex flex-wrap gap-3 justify-center">
    <button
      v-for="category in filterCategories"
      :key="category"
      @click="$emit('filter-change', category)"
      :class="[
        'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2',
        activeFilter === category
          ? 'bg-blue-600 text-white shadow-md dark:bg-blue-500'
          : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-2 border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500'
      ]"
      :aria-pressed="activeFilter === category"
    >
      <Icon 
        v-if="category !== 'all'"
        :name="getCategoryIcon(category)" 
        class="inline-block mr-1.5"
      />
      {{ getCategoryLabel(category) }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  activeFilter: {
    type: String,
    default: 'all'
  },
  filterCategories: {
    type: Array,
    required: true
  }
})

defineEmits(['filter-change'])

const { t } = useI18n()

const getCategoryIcon = (category) => {
  const icons = {
    'kids': 'ph:smiley-fill',
    'teens': 'ph:student-fill',
    'ocd': 'ph:brain-fill',
    'emetophobia': 'ph:heart-fill',
    'all': 'ph:grid-four-fill'
  }
  return icons[category] || 'ph:grid-four-fill'
}

const getCategoryLabel = (category) => {
  const labels = {
    'all': t('filters.all'),
    'kids': t('filters.kids'),
    'teens': t('filters.teens'),
    'ocd': t('filters.ocd'),
    'emetophobia': t('filters.emetophobia')
  }
  return labels[category] || category
}
</script>

