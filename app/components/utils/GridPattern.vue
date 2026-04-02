<script lang="ts" setup>
	import type { HTMLAttributes } from "vue";
	
	interface InteractiveGridPatternProps {
		className?: HTMLAttributes["class"];
		squaresClassName?: HTMLAttributes["class"];
		width?: number;
		height?: number;
		squares?: [number, number];
	}

	const props = withDefaults(defineProps<InteractiveGridPatternProps>(), {
		width: 80,
		height: 80,
		squares: () => [80, 80],
	});

	const horizontal = computed(() => props.squares[0]);
	const vertical = computed(() => props.squares[1]);

	const totalSquares = computed(() => horizontal.value * vertical.value);

	const hoveredSquare = ref<number | null>(null);

	const gridWidth = computed(() => props.width * horizontal.value);
	const gridHeight = computed(() => props.height * vertical.value);

	function getX(index: number) {
		return (index % horizontal.value) * props.width;
	}

	function getY(index: number) {
		return Math.floor(index / horizontal.value) * props.height;
	}

	const svgClass = computed(() => ["absolute z-0 inset-0 h-screen w-screen border border-gray-100", props.className]);

	function getRectClass(index: number) {
		return ["stroke-gray-100 transition-all z-0 duration-100 ease-in-out not-[&:hover]:duration-1000", hoveredSquare.value === index ? "fill-transparent" : "fill-transparent", props.squaresClassName];
	}

	function handleMouseEnter(index: number) {
		hoveredSquare.value = index;
	}

	function handleMouseLeave() {
		hoveredSquare.value = null;
	}
</script>

<template>
	<svg :width="gridWidth" :height="gridHeight" :class="svgClass">
		<rect v-for="(_, index) in totalSquares" :key="index" :x="getX(index)" :y="getY(index)" :width="width" :height="height" :class="getRectClass(index)" @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave" />
	</svg>
</template>
