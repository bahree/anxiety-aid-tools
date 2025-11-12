<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.sensationLabeling.duration')" />
    <SensationLabelingExercise />
    <RelatedTechniques current-technique-id="sensationLabeling" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({ title: () => t("meta.sensationLabeling.title"), description: () => t("meta.sensationLabeling.description") });
</script>

