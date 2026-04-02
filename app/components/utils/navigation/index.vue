<template>
	<header class="z-40 fixed w-full top-0 flex items-center justify-between h-16 px-4 bg-white border-b lg:px-6">
		<div class="flex w-full items-center gap-4">
			<div class="flex items-center justify-center w-8 h-8 overflow-hidden bg-blue-600 rounded-lg">
				<img src="https://dashboard.roland-meijer.nl/svgs/icon_512-blue.svg" alt="Insights Logo" draggable="false" class="rounded-lg w-7 h-7" />
			</div>

			<h1 class="font-bold text-gray-950">roland-meijer.nl</h1>
		</div>

		<div class="flex items-center gap-2">
			<UtilsButtonImportant to="http://localhost:3000" :description="user.success ? 'Dashboard' : 'Inloggen'" />
		</div>
	</header>
</template>

<script setup lang="ts">
	const user = useUser();
</script>

<
