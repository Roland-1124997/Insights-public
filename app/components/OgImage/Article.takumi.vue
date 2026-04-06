<template>
	<div class="relative w-screen h-screen p-12 overflow-hidden bg-blue-900">
		
		<div class="relative z-10 h-full overflow-hidden bg-blue-800 ">
			

			<article class="relative z-10 h-full p-12 pl-28">
				<div class="flex flex-col justify-between h-full text-left">
					<div class="flex flex-col gap-7">
						<div class="flex items-center gap-4">
							<span class="text-xl font-semibold uppercase tracking-[0.26em] text-blue-100/90">Project</span>
							<span class="flex-1 h-px bg-blue-100/20"></span>
						</div>

						<h1 class="max-w-[90%] text-[5.6rem] font-black leading-[0.98] tracking-[-0.02em] text-blue-50 text-balance mt-4">
							{{ title }}
						</h1>

						<div class="flex flex-wrap mt-6 gap-16 text-2xl font-semibold uppercase tracking-[0.08em] text-blue-100/95">
							<div v-for="(cat, index) in category" :key="index" class="flex items-center gap-8">
								<span class="size-2 bg-blue-100/80"></span>
								<span>{{ cat }}</span>
							</div>
						</div>
					</div>

					<div class="flex flex-col gap-2 text-blue-100/90">
						<p class="text-3xl font-bold text-blue-50">
							{{ author }}
						</p>
						<p class="text-lg font-semibold uppercase tracking-[0.2em]">{{ publishedTime }}</p>
					</div>
				</div>
			</article>
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
</script>
