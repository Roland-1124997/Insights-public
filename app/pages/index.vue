<template>
	<div class="relative z-20 mt-[5.7rem] lg:mt-16 xl:mt-28">
		<section class="relative overflow-hidden rounded-[2rem] px-6 py-8 xl:px-12">
			<article class="relative z-10 grid items-center md:grid-cols-[1.8fr_0.55fr]">
				<div class="space-y-5">
					<h1 class="mt-6 text-4xl font-extrabold leading-[0.9] text-blue-950 sm:text-5xl md:text-7xl">
						{{ profile.result.algemeen.tile }}
					</h1>

					<div class="flex items-center gap-2 font-semibold text-blue-900 md:text-lg">
						<icon name="akar-icons:location" class="w-4 h-4 text-blue-700" aria-hidden="true" />
						<span>{{ profile.result.algemeen.locatie }}</span>
					</div>

					<p class="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">{{ profile.result.algemeen.subtitle }}</p>

					<div class="flex flex-wrap gap-3 pt-2">
						<span v-for="value in profile.result.algemeen.contact" :key="value.label">
							<UtilsButtonImportant v-if="!value.hidden" :eventName="value.eventName" target="_blank" :to="value.url" :description="value.label" :iconName="value.iconName" />
						</span>
					</div>
				</div>

				<div class="">
					<Transition name="move-up">
						<div v-if="animate" class="relative flex flex-col items-center justify-center w-full p-8 transition-all md:-skew-x-3 md:-mt-[3.9rem] ">
							<UtilsMockup src="/mock.png" class="max-w-sm size-full" />
						</div>
					</Transition>
				</div>
			</article>
			
			<article class="grid gap-3 pt-3 mt-5 sm:grid-cols-4">
				<div v-for="metric in profile.stats" :key="metric.label" class="relative px-4 py-3 overflow-hidden border border-gray-200 rounded-2xl bg-gray-50">
					<p class="text-xs font-semibold uppercase tracking-[0.09em] text-slate-800">{{ metric.label }}</p>
					<p class="mt-1 text-lg font-bold text-blue-900">{{ metric.value }}</p>
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
		twitterCard: "summary_large_image",
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
	const animate = ref(false);

	const isDesktopViewport = () => window.matchMedia("(min-width: 768px)").matches;

	const updateAnimate = () => {
		animate.value = isDesktopViewport();
	};

	onMounted(() => {
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
