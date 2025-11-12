<template>
  <div class="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.ocdThoughtLabeling.duration')" />
    <OCDThoughtLabelingExercise />
    <RelatedTechniques current-technique-id="ocdThoughtLabeling" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({
  title: () => t("meta.ocdThoughtLabeling.title"),
  description: () => t("meta.ocdThoughtLabeling.description"),
});
</script>

