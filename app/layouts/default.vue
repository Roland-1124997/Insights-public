<template>
	<div class="relative w-full overflow-x-hidden isolate">
		<UtilsNavigation />

		<ClientOnly>
			<div class="fixed w-full h-screen -mt-5 overflow-hidden -z-10">
				<UtilsGridPattern class="pointer-events-none" />
			</div>
		</ClientOnly>

		<main class="relative z-30 flex-1 overflow-x-hidden overflow-y-auto">
			<div class="z-30 mx-auto">
				<slot></slot>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	const articles = useArtcles();
	const profile = useProfile();
	const user = useUser();

	await articles.init();
	await profile.init();
	await user.init();
	
</script>
