<script lang="ts" setup>
	
	const { squares, width, height, squaresClassName, className } = defineProps({
		className: {
			type: String,
			default: "",
		},
		squaresClassName: {
			type: String,
			default: "",
		},
		width: {
			type: Number,
			default: 80,
		},
		height: {
			type: Number,
			default: 80,
		},
		squares: {
			type: Array as unknown as () => [number, number],
			default: () => [80, 80],
		},
	});

	// const props = withDefaults(defineProps<InteractiveGridPatternProps>(), {
	// 	width: 80,
	// 	height: 80,
	// 	squares: () => [80, 80],
	// });

	const horizontal = computed(() => squares[0]);
	const vertical = computed(() => squares[1]);

	const totalSquares = computed(() => horizontal.value * vertical.value);

	const hoveredSquare = ref<number | null>(null);

	const gridWidth = computed(() => width * horizontal.value);
	const gridHeight = computed(() => height * vertical.value);

	function getX(index: number) {
		return (index % horizontal.value) * width;
	}

	function getY(index: number) {
		return Math.floor(index / horizontal.value) * height;
	}

	const svgClass = computed(() => ["absolute z-0 inset-0 h-screen w-screen border border-gray-100", className]);

	function getRectClass(index: number) {
		return ["stroke-gray-100 transition-all z-0 duration-100 ease-in-out not-[&:hover]:duration-1000", hoveredSquare.value === index ? "fill-transparent" : "fill-transparent", squaresClassName];
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
