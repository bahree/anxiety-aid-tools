<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.uncertaintyTolerance.duration')" />
    <UncertaintyToleranceExercise />
    <RelatedTechniques current-technique-id="uncertaintyTolerance" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({ title: () => t("meta.uncertaintyTolerance.title"), description: () => t("meta.uncertaintyTolerance.description") });
</script>

