<template>
  <div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 py-8 transition-colors duration-300">
    <main id="main-content" tabindex="-1">
    <Breadcrumb :duration="$t('techniques.superheroBreathing.duration')" />

    <!-- Exercise Component -->
    <SuperheroBreathingExercise />

    <!-- Educational Content for Kids -->
    <section>
      <div class="border-2 border-red-200 dark:border-red-600 bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg transition-colors duration-200">
        <SectionHeader icon="ph:lightbulb" color="red">
          {{ $t("superheroBreathing.education.howItWorks.title") }}
        </SectionHeader>
        <div class="px-1">
          <p class="mb-3 text-base leading-relaxed text-gray-700 dark:text-slate-300">
            {{ $t("superheroBreathing.education.howItWorks.description") }}
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
            {{ $t("superheroBreathing.education.tips.title") }}
          </h2>
        </div>
        <ul class="space-y-3 text-base text-gray-700 dark:text-slate-300">
          <li class="flex items-start">
            <Icon name="ph:check-circle-fill" class="mr-3 mt-0.5 flex-shrink-0 text-green-500 text-xl" />
            <span>{{ $t("superheroBreathing.education.tips.items.0") }}</span>
          </li>
          <li class="flex items-start">
            <Icon name="ph:check-circle-fill" class="mr-3 mt-0.5 flex-shrink-0 text-green-500 text-xl" />
            <span>{{ $t("superheroBreathing.education.tips.items.1") }}</span>
          </li>
          <li class="flex items-start">
            <Icon name="ph:check-circle-fill" class="mr-3 mt-0.5 flex-shrink-0 text-green-500 text-xl" />
            <span>{{ $t("superheroBreathing.education.tips.items.2") }}</span>
          </li>
          <li class="flex items-start">
            <Icon name="ph:check-circle-fill" class="mr-3 mt-0.5 flex-shrink-0 text-green-500 text-xl" />
            <span>{{ $t("superheroBreathing.education.tips.items.3") }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Related Techniques -->
    <RelatedTechniques current-technique-id="superheroBreathing" />
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
  title: () => t("meta.superheroBreathing.title"),
  description: () => t("meta.superheroBreathing.description"),
  ogTitle: () => t("meta.superheroBreathing.title"),
  ogDescription: () => t("meta.superheroBreathing.description"),
  ogType: "website",
  ogSiteName: "Anxiety Aid Tools",
  twitterCard: "summary_large_image",
});
</script>

