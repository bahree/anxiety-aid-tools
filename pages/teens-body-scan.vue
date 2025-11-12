<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.teensBodyScan.duration')" />

    <!-- Exercise Component -->
    <TeensBodyScanExercise />

    <!-- Educational Content for Teens -->
    <section>
      <div class="border-2 border-indigo-200 dark:border-indigo-600 bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg transition-colors duration-200">
        <SectionHeader icon="ph:lightbulb" color="indigo">
          {{ $t("teensBodyScan.education.howItWorks.title") }}
        </SectionHeader>
        <div class="px-1">
          <p class="mb-3 text-base leading-relaxed text-gray-700 dark:text-slate-300">
            {{ $t("teensBodyScan.education.howItWorks.description") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Tips for Teens -->
    <section>
      <div class="border-2 border-purple-200 dark:border-purple-600 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg transition-colors duration-200">
        <div class="mb-4 text-center">
          <Icon name="ph:star-fill" class="mx-auto mb-2 text-3xl text-purple-600 dark:text-purple-400" />
          <h2 class="text-2xl font-bold text-gray-800 dark:text-slate-100">
            {{ $t("teensBodyScan.education.tips.title") }}
          </h2>
        </div>
        <ul class="space-y-3 text-base text-gray-700 dark:text-slate-300">
          <li class="flex items-start" v-for="(tip, index) in $tm('teensBodyScan.education.tips.items')" :key="index">
            <Icon name="ph:check-circle-fill" class="mr-3 mt-0.5 flex-shrink-0 text-green-500 text-xl" />
            <span>{{ $rt(tip) }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="teensBodyScan" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.teensBodyScan.title"),
  description: () => t("meta.teensBodyScan.description"),
  ogTitle: () => t("meta.teensBodyScan.title"),
  ogDescription: () => t("meta.teensBodyScan.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>

