<template>
	<div class="relative w-screen h-screen overflow-hidden bg-white">
		<div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#dbeafe_20%,_#eff6ff_40%,_#dbeafe_100%)]"></div>

		<div class="absolute inset-0 grid w-screen h-screen grid-cols-12 -z-0 opacity-80">
			<div v-for="index in 72" :key="index" class="flex items-center justify-center border border-blue-100/70 aspect-square"></div>
		</div>

		<div class="relative z-10 flex flex-col w-full h-screen px-32 py-20 pt-28">
			<h1 class="w-[90%] max-w-5xl text-[6.2rem] font-black leading-[0.98] tracking-[-0.02em] text-slate-900 text-balance">
				{{ title }}
			</h1>

			<div class="flex flex-wrap gap-3 text-[2rem] font-semibold text-blue-700 mt-14">
				<span v-for="(cat, index) in category" :key="index" class="px-4 py-2 border border-blue-200 rounded-md bg-blue-50/90">
					{{ cat }}
				</span>
			</div>

			<div class="absolute flex flex-col gap-1.5 text-base bottom-12 left-32 text-slate-600">
				<p class="text-2xl font-bold text-slate-900">
					{{ author }}
				</p>

				<p class="font-semibold tracking-[0.08em] uppercase text-blue-600">{{ publishedTime }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps({
		title: String,
		category: Array as () => string[],
		author: String,
		publishedTime: String as () => string,
	});

	// const numbers = [21, 33, 35];

	// const getBackgroundColor = (index: number) => {
	// 	if (numbers.includes(index)) {
	// 		return `bg-blue-600`;
	// 	}

	// 	return "";
	// };
</script>
