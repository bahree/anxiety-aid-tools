<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.performanceAnxietyPrep.duration')" />

    <!-- Exercise Component -->
    <PerformanceAnxietyPrepExercise />

    <!-- Educational Content -->
    <section>
      <div class="border-2 border-pink-200 dark:border-pink-600 bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg transition-colors duration-200">
        <SectionHeader icon="ph:lightbulb" color="pink">
          {{ $t("performanceAnxietyPrep.education.howItWorks.title") }}
        </SectionHeader>
        <div class="px-1">
          <p class="mb-3 text-base leading-relaxed text-gray-700 dark:text-slate-300">
            {{ $t("performanceAnxietyPrep.education.howItWorks.description") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Tips -->
    <section>
      <div class="border-2 border-yellow-200 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg transition-colors duration-200">
        <div class="mb-4 text-center">
          <Icon name="ph:star-fill" class="mx-auto mb-2 text-3xl text-yellow-600 dark:text-yellow-400" />
          <h2 class="text-2xl font-bold text-gray-800 dark:text-slate-100">
            {{ $t("performanceAnxietyPrep.education.tips.title") }}
          </h2>
        </div>
        <ul class="space-y-3 text-base text-gray-700 dark:text-slate-300">
          <li class="flex items-start" v-for="(tip, index) in $tm('performanceAnxietyPrep.education.tips.items')" :key="index">
            <Icon name="ph:check-circle-fill" class="mr-3 mt-0.5 flex-shrink-0 text-green-500 text-xl" />
            <span>{{ $rt(tip) }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="performanceAnxietyPrep" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.performanceAnxietyPrep.title"),
  description: () => t("meta.performanceAnxietyPrep.description"),
  ogTitle: () => t("meta.performanceAnxietyPrep.title"),
  ogDescription: () => t("meta.performanceAnxietyPrep.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>

