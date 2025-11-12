<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.nauseaManagement.duration')" />
    <NauseaManagementExercise />
    <RelatedTechniques current-technique-id="nauseaManagement" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();
useSeoMeta({ title: () => t("meta.nauseaManagement.title"), description: () => t("meta.nauseaManagement.description") });
</script>

