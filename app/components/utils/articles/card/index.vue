<template>
	<div v-for="article in articles" :key="article.id" class="minimal-card relative isolate z-10 flex h-full flex-col overflow-hidden rounded-2xl border border-blue-200 bg-blue-50 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
		<div class="minimal-card-lines" aria-hidden="true"></div>

		<div class="relative flex flex-1 flex-col gap-3 p-5 pt-3">
			<div class="flex items-start justify-between gap-2 mt-3">
				<h2 class="text-xl font-bold leading-6 capitalize text-blue-950 line-clamp-2 min-h-12">
					{{ article.title }}
				</h2>

				<div v-if="user.success" class="flex items-center justify-between gap-2 select-none">
					<NuxtLink :to="`http://localhost:3000/artikelen/opstellen?edit=${article.id}`" class="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-300 bg-white text-blue-800 transition-colors hover:border-blue-700 hover:bg-blue-700 hover:text-white focus:bg-transparent focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" title="Bewerken">
						<icon name="akar-icons:edit" class="w-4 h-4" aria-hidden="true" />
					</NuxtLink>
				</div>
			</div>

			<p class="mb-2 min-h-10 text-sm leading-6 text-blue-950/85 line-clamp-2 md:min-h-[3.75rem] md:line-clamp-3">
				{{ article.description || "Geen beschrijving beschikbaar" }}
			</p>

			<img v-if="article.thumbnail_url" :src="`http://localhost:3000${article.thumbnail_url}`" :alt="`Thumbnail voor ${article.title}`" class="object-cover object-top w-full h-48 mb-2 bg-white border rounded-lg select-none" />

			<div class="flex flex-wrap items-center gap-2 mb-2 select-none">
				<span v-for="topic in article.topics" :key="topic" class="flex items-center gap-1 rounded-md border border-blue-200 bg-white px-2 py-1 text-xs font-semibold text-blue-900">
					<icon name="akar-icons:hashtag" class="w-3 h-3" />
					{{ topic }}
				</span>
			</div>

			<div class="flex flex-wrap items-center gap-2 mt-auto text-xs select-none">
				<span v-if="article.words" aria-label="hoeveelheid woorden" class="flex items-center gap-1 rounded-full border border-blue-200 bg-white px-2 py-1 font-medium text-blue-950">
					<icon name="akar-icons:file" class="w-4 h-4" aria-hidden="true" />
					{{ article.words }} woorden
				</span>
				<span v-if="article.read_time" aria-label="gemiddelde leestijd" class="flex items-center gap-1 rounded-full border border-blue-200 bg-white px-2 py-1 font-medium text-blue-950">
					<icon name="akar-icons:clock" class="w-4 h-4" aria-hidden="true" />
					{{ article.read_time }} min
				</span>
				<span v-if="article.updated_at" aria-label="laatst aangepast op" class="flex items-center gap-1 rounded-full border border-blue-200 bg-white px-2 py-1 font-medium text-blue-950">
					<icon name="akar-icons:history" class="w-4 h-4" aria-hidden="true" />
					<NuxtTime :datetime="article.updated_at" year="2-digit" month="2-digit" day="2-digit" hour="2-digit" minute="2-digit" />
				</span>
			</div>

			<UtilsButtonImportant :to="`/artikelen/${article.id}`" description="Bekijk artikel" iconName="mdi:eye-outline" class="mt-2" />
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		articles: Array<{
			id: string;
			title: string;
			description?: string;
			thumbnail_url?: string;
			topics: string[];
			words?: number;
			read_time?: string;
			updated_at?: string;
			published: boolean;
		}>;
	}>();

	const user = useUser();
</script>

<style scoped>
	.minimal-card-lines {
		pointer-events: none;
		position: absolute;
		inset: 0;
		background-image: linear-gradient(to right, rgba(37, 99, 235, 0.16), rgba(37, 99, 235, 0.16)), linear-gradient(to bottom, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.1));
		background-size:
			calc(100% - 2rem) 1px,
			1px calc(100% - 2rem);
		background-position:
			1rem 1rem,
			1rem 1rem;
		background-repeat: no-repeat;
		opacity: 0.75;
	}
</style>
