<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.ocdMindfulness.duration')" />
    <OCDMindfulnessExercise />
    <RelatedTechniques current-technique-id="ocdMindfulness" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({ title: () => t("meta.ocdMindfulness.title"), description: () => t("meta.ocdMindfulness.description") });
</script>

