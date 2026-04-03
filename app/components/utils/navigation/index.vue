<template>
	<header class="fixed top-0 z-40 flex items-center justify-between w-full h-16 px-4 bg-white border-b lg:px-6">
		<div class="flex items-center w-full gap-4">
			<div class="flex items-center justify-center w-8 h-8 overflow-hidden bg-blue-600 rounded-lg">
				<img src="https://dashboard.roland-meijer.nl/svgs/icon_512-blue.svg" alt="Insights Logo" draggable="false" class="rounded-lg w-7 h-7" />
			</div>

			<h1 class="font-bold text-gray-950">
				<NuxtLink to="/">roland-meijer.nl</NuxtLink>
			</h1>
		</div>

		<div class="flex items-center gap-2">
			<span v-for="value in profile.result.algemeen.contact" :key="value.label">
				<UtilsButtonImportant v-if="value.hidden" target="_blank" :eventName="value.eventName" :hidden="true" :to="value.url" :description="value.label" :iconName="value.iconName" />
			</span>

			<UtilsButtonImportant to="https://dashboard.roland-meijer.nl" :eventName="'dashboard_access_click'" :description="user.success ? 'Dashboard' : 'Inloggen'" />
			
		</div>
	</header>
</template>

<script setup lang="ts">
	const user = useUser();
	const profile = useProfile();
</script>

<
