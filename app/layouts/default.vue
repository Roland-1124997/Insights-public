<template>
	<div class="relative isolate w-full overflow-x-hidden">
		<UtilsNavigation />

		<div class="h-screen -z-10 -mt-5 fixed w-full overflow-hidden">
			<UtilsGridPattern class="pointer-events-none" />
		</div>

		<main class="relative flex-1 z-30 p-4 overflow-x-hidden overflow-y-auto">
			<div class="mx-auto z-30 px-2 md:px-8">
				<slot></slot>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	const articles = useArtcles();
	const user = useUser();

	await user.init();
	await articles.init();
	
</script>
