<template>
	<button @click="track(eventName)" v-if="isButton" :disabled="loading" :class="padding" class="flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 border border-blue-500 rounded-lg outline-none select-none disabled:cursor-not-allowed disabled:opacity-60 w-fit hover:bg-blue-700 hover:text-white focus:text-white focus:border-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" :aria-label="description">
		<icon v-if="iconName" :name="iconName" :class="loading ? ' animate-spin' : ''" class="w-5 h-5" aria-hidden="true" />
		<span :class="hidden ? 'sr-only' : ''"> {{ description }} </span>
	</button>

	<NuxtLink @click="track(eventName)" role="button" v-else :to :class="padding" class="flex items-center justify-center gap-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 border border-blue-500 rounded-lg outline-none select-none w-fit hover:bg-blue-700 hover:text-white focus:text-white focus:border-blue-600 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" :aria-label="description">
		<icon v-if="iconName" :name="iconName" class="w-5 h-5" aria-hidden="true" />
		<span :class="hidden ? 'sr-only' : ''"> {{ description }} </span>
	</NuxtLink>
</template>

<script setup lang="ts">
	defineProps({
		to: { type: String, required: false },
		iconName: { type: String, default: null },
		description: { type: String, default: "" },
		isButton: { type: Boolean, default: false },
		isSmall: { type: Boolean, default: false },
		loading: { type: Boolean, default: false },
		hidden: { type: Boolean, default: false },
		eventName: { type: String, default: null },
	});


	const track = (eventName: string) => umTrackEvent(eventName);

	const padding = "p-[0.50rem] px-3";
</script>
