<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.safeFoodsVisualization.duration')" />
    <SafeFoodsVisualizationExercise />
    <RelatedTechniques current-technique-id="safeFoodsVisualization" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({ title: () => t("meta.safeFoodsVisualization.title"), description: () => t("meta.safeFoodsVisualization.description") });
</script>

