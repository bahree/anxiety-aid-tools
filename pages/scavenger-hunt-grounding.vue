<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.scavengerHuntGrounding.duration')" />

    <!-- Exercise Component -->
    <ScavengerHuntGroundingExercise />

    <!-- Educational Content for Kids -->
    <section>
      <div class="border-2 border-green-200 dark:border-green-600 bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg transition-colors duration-200">
        <SectionHeader icon="ph:lightbulb" color="green">
          {{ $t("scavengerHunt.education.howItWorks.title") }}
        </SectionHeader>
        <div class="px-1">
          <p class="mb-3 text-base leading-relaxed text-gray-700 dark:text-slate-300">
            {{ $t("scavengerHunt.education.howItWorks.description") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Tips for Kids -->
    <section>
      <div class="border-2 border-yellow-200 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg transition-colors duration-200">
        <div class="mb-4 text-center">
          <Icon name="ph:star-fill" class="mx-auto mb-2 text-3xl text-yellow-600 dark:text-yellow-400" />
          <h2 class="text-2xl font-bold text-gray-800 dark:text-slate-100">
            {{ $t("scavengerHunt.education.tips.title") }}
          </h2>
        </div>
        <ul class="space-y-3 text-base text-gray-700 dark:text-slate-300">
          <li class="flex items-start" v-for="(tip, index) in $tm('scavengerHunt.education.tips.items')" :key="index">
            <Icon name="ph:check-circle-fill" class="mr-3 mt-0.5 flex-shrink-0 text-green-500 text-xl" />
            <span>{{ $rt(tip) }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="scavengerHuntGrounding" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.scavengerHuntGrounding.title"),
  description: () => t("meta.scavengerHuntGrounding.description"),
  ogTitle: () => t("meta.scavengerHuntGrounding.title"),
  ogDescription: () => t("meta.scavengerHuntGrounding.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>

