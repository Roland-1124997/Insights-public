<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">

	
	onMounted(() => {

		history.scrollRestoration = "manual";

	});
</script>
