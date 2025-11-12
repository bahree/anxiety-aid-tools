<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.futureWorryTime.duration')" />

    <!-- Exercise Component -->
    <FutureWorryTimeExercise />

    <!-- Educational Content for Teens -->
    <section>
      <div class="border-2 border-amber-200 dark:border-amber-600 bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg transition-colors duration-200">
        <SectionHeader icon="ph:lightbulb" color="amber">
          {{ $t("futureWorryTime.education.howItWorks.title") }}
        </SectionHeader>
        <div class="px-1">
          <p class="mb-3 text-base leading-relaxed text-gray-700 dark:text-slate-300">
            {{ $t("futureWorryTime.education.howItWorks.description") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Tips for Teens -->
    <section>
      <div class="border-2 border-orange-200 dark:border-orange-600 bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg transition-colors duration-200">
        <div class="mb-4 text-center">
          <Icon name="ph:star-fill" class="mx-auto mb-2 text-3xl text-orange-600 dark:text-orange-400" />
          <h2 class="text-2xl font-bold text-gray-800 dark:text-slate-100">
            {{ $t("futureWorryTime.education.tips.title") }}
          </h2>
        </div>
        <ul class="space-y-3 text-base text-gray-700 dark:text-slate-300">
          <li class="flex items-start" v-for="(tip, index) in $tm('futureWorryTime.education.tips.items')" :key="index">
            <Icon name="ph:check-circle-fill" class="mr-3 mt-0.5 flex-shrink-0 text-green-500 text-xl" />
            <span>{{ $rt(tip) }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="futureWorryTime" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.futureWorryTime.title"),
  description: () => t("meta.futureWorryTime.description"),
  ogTitle: () => t("meta.futureWorryTime.title"),
  ogDescription: () => t("meta.futureWorryTime.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>

