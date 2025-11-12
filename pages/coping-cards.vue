<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.copingCards.duration')" />
    <CopingCardsExercise />
    <RelatedTechniques current-technique-id="copingCards" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({ title: () => t("meta.copingCards.title"), description: () => t("meta.copingCards.description") });
</script>

