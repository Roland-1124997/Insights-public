<template>
	<div class="mt-6 md:mt-16">
		<section class="relative overflow-hidden rounded-[2rem] px-8 py-8 xl:px-24 mb-5">
			<article class="relative z-10 grid items-center md:grid-cols-[1.8fr_0.55fr]">
				<div class="space-y-5">
					<h1 class="mt-6 text-4xl font-extrabold leading-[0.9] text-blue-950 sm:text-5xl md:text-7xl">
						{{ profile.result.algemeen.title }}
						<span v-if="user.success">
							<NuxtLink target="_blank" to="https://dashboard.roland-meijer.nl/portfolio">
								<Icon name="akar-icons:edit"
									class="w-6 h-6 -ml-1 text-blue-900 cursor-pointer xl:-ml-3" />
							</NuxtLink>
						</span>
					</h1>

					<div class="flex items-center gap-2 font-semibold text-blue-900 md:text-lg">
						<icon name="akar-icons:location" class="w-4 h-4 text-blue-700" aria-hidden="true" />
						<span>{{ profile.result.algemeen.locatie }}</span>
					</div>

					<p class="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">{{
						profile.result.algemeen.subtitle }}</p>

					<div class="flex flex-wrap gap-3 pt-2">
						<span v-for="value in profile.result.algemeen.contact" :key="value.label">
							<UtilsButtonImportant v-if="!value.hidden" :eventName="value.eventName" target="_blank"
								:to="value.url" :description="value.label" :iconName="value.iconName" />
						</span>
					</div>
				</div>

				<div class="hidden md:block">
					<Transition name="move-up">
						<div v-if="animate"
							class="relative flex flex-col items-center justify-center w-full p-8 transition-all md:-skew-x-3 md:-mt-[3.9rem]">
							<UtilsMockup src="/mock.png" class="max-w-sm size-full" />
						</div>
					</Transition>
				</div>
			</article>

			<article class="grid gap-3 pt-3 mt-5 sm:grid-cols-4">
				<div v-for="metric in profile.stats" :key="metric.label"
					class="relative px-4 py-3 overflow-hidden border border-gray-200 rounded-2xl bg-gray-50">
					<p class="text-xs font-semibold uppercase tracking-[0.09em] text-slate-800">{{ metric.label }}</p>
					<p class="mt-1 text-lg font-bold text-blue-900">{{ metric.value }}</p>
				</div>
			</article>
		</section>


		<section v-for="(item, index) in article.result" :key="item.title"
			class="relative py-6 pl-6 pr-4 overflow-hidden sm:pr-6 sm:pl-14 xl:px-24"
			:class="index % 2 === 0 ? 'bg-blue-800' : 'bg-blue-700'">
			<div class="absolute inset-y-0 z-20 items-center hidden pt-10 pointer-events-none left-3 md:flex">
				<div class="flex h-[92%] flex-col items-center justify-between pl-2">
					<span
						class="text-base font-semibold uppercase tracking-[0.2em] text-blue-100/75 [writing-mode:vertical-rl] rotate-180">
						<NuxtTime :datetime="item.updated_at" year="numeric" month="2-digit" day="2-digit"
							hour="numeric" minute="numeric"
							class="font-semibold uppercase tracking-[0.2em] text-blue-100/75 [writing-mode:vertical-rl] rotate-180" />
					</span>
				</div>
			</div>

			<article class="relative z-10 p-2 sm:p-4 md:p-6">
				<div class="grid items-center gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
					<div class="relative flex flex-col gap-5 text-left"
						:class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'">
						<div class="flex items-center gap-3">
							<span
								class="text-xs font-semibold uppercase tracking-[0.26em] text-blue-100/90">Project</span>
							<span class="flex-1 hidden h-px bg-blue-100/20 sm:block"></span>
						</div>

						<h2 class="text-3xl font-black text-blue-50 sm:text-4xl">
							<span>{{ item.title }}</span>
						</h2>

						<div
							class="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.08em] text-blue-100/95 md:text-sm">
							<div v-for="value in item.topics" :key="value" class="flex items-center gap-2">
								<span class="size-1.5 bg-blue-100/80"></span>
								<span>{{ value }}</span>
							</div>
						</div>

						<p
							class="max-w-2xl text-base leading-7 line-clamp-3 md:line-clamp-5 text-blue-50/85 sm:text-lg">
							{{ item.description }}
						</p>

						<div class="flex items-center gap-2 pt-1">
							<UtilsButtonImportant :to="`/blog-${article.toSlug(item.title)}`" :reverse="true"
								description="Meer informatie" iconName="akar-icons:eye"
								eventName="button_click_to_artikel" />
							<UtilsButtonImportant v-if="user.success"
								:to="`https://dashboard.roland-meijer.nl/artikelen/opstellen?edit=${item.id}`"
								:reverse="true" target="_blank" :hidden="true" iconName="akar-icons:edit"
								event-name="button_click_to_edit_page" />
						</div>
					</div>

					<div class="justify-center hidden md:flex" :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'">
						<div class="w-full max-w-xl overflow-hidden border-4 rounded-lg border-blue-200/20">
							<UtilsDesktopMockup :src="item.thumbnail_url" :alt="item.title"
								class="w-full h-full min-h-[220px] object-cover" loading="lazy" />
						</div>
					</div>
				</div>
			</article>
		</section>

	</div>
</template>

<script setup lang="ts">
	useSeoMeta({
		title: "Insights - Roland Meijer",
		description: "Overzicht van profiel, vaardigheden, stages en opleidingen.",
		ogTitle: "Insights - Roland Meijer",
		ogDescription: "Overzicht van profiel, vaardigheden, stages en opleidingen.",
		ogUrl: "/",
		ogImage: "https://dashboard.roland-meijer.nl/icons/icon_512-blue.png",
		twitterTitle: "Insights - Roland Meijer",
		twitterDescription: "Overzicht van profiel, vaardigheden, stages en opleidingen.",
		twitterImage: "https://dashboard.roland-meijer.nl/icons/icon_512-blue.png",
		twitterCard: "app",
	});

	useHead({
		htmlAttrs: {
			lang: "nl",
		},
		link: [
			{
				rel: "icon",
				type: "image/png",
				href: "https://dashboard.roland-meijer.nl/icons/icon_512-blue.png",
			},
		],
	});

	const article = useArtcles();
	const profile = useProfile();
	const user = useUser();
	const animate = ref(false);

	const isDesktopViewport = () => window.matchMedia("(min-width: 768px)").matches;
	const updateAnimate = () => (animate.value = isDesktopViewport());

	onMounted(() => {
		umTrackView()
		updateAnimate();
		window.addEventListener("resize", updateAnimate);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("resize", updateAnimate);
	});
</script>

<style>
	.move-up-enter-active {
		transition: all 0.5s ease-out;
	}

	.move-up-leave-active {
		transition: all 0.5s ease-out;
	}

	.move-up-enter-from,
	.move-up-leave-to {
		transform: translateY(20px) skewX(-4deg);
		opacity: 0;
	}

	.move-up-enter-to,
	.move-up-leave-from {
		transform: translateY(0) skewX(0deg);
		opacity: 1;
	}

	@media (min-width: 768px) {

		.move-up-enter-from,
		.move-up-leave-to {
			transform: translateY(40px) skewX(-8deg);
			opacity: 0;
		}

		.move-up-enter-to,
		.move-up-leave-from {
			transform: translateY(0) skewX(-3deg);
			opacity: 1;
		}
	}
</style>
