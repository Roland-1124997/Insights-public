<template>
	<div class="">
		<section class="relative z-20 md:pl-[4.7rem] md:pr-[3.5rem] mt-[3.5rem] md:p-3 lg:mt-12 xl:mt-[3rem]">
			<article class="relative md:p-3">
				<div v-if="editor" class="grid w-full gap-3 overflow-y-scroll md:h-[87.5vh] md:grid-cols-[1.009fr_0.45fr]">
					<div class="px-6 pt-10 bg-white md:px-24 md:pt-10">
						<TiptapEditor :editor="editor" aria-label="Artkel inhoud" />
					</div>

					<div class="sticky top-0 pl-4 pt-4 bg-white md:h-[78vh]">
						<TiptapTableList :Anchors="Anchors" />
					</div>
				</div>

				
			</article>
		</section>
	</div>
</template>

<script setup lang="ts">
	import TableOfContents from "@tiptap/extension-table-of-contents";

	useSeoMeta({
		title: "Insights - Artikel Opstellen",
		description: "Schrijf een nieuw artikel of blog post voor je website.",
		ogTitle: "Insights - Artikel Opstellen",
		ogDescription: "Schrijf een nieuw artikel of blog post voor je website.",
		ogUrl: "/artikelen/opstellen",
		ogImage: "/icons/icon_512-blue.png",
		twitterTitle: "Insights - Artikel Opstellen",
		twitterDescription: "Schrijf een nieuw artikel of blog post voor je website.",
		twitterImage: "/icons/icon_512-blue.png",
		twitterCard: "app",
	});

	useHead({
		htmlAttrs: {
			lang: "nl",
		},
		link: [
			{
				rel: "icon",
				type: "image/png",
				href: "/icons/icon_512-blue.png",
			},
		],
	});

	const slug = useRoute().params.slug as string;
	const article = useArtcles();

	const result = article.getBySlug(slug);

	const Anchors: any = ref([]);

	const populateUniqueAnchors = (uniqueAnchors: any[], seenAnchorIds: Set<string>, anchor: any) => {
		if (seenAnchorIds.has(anchor.id)) return;

		uniqueAnchors.push({
			id: anchor.id,
			level: anchor.level,
			itemIndex: anchor.itemIndex,
			textContent: anchor.textContent,
		});

		seenAnchorIds.add(anchor.id);
	};

	const populateAnchors = (anchors: any[]) => {
		const uniqueAnchors: any[] = [];
		const seenAnchorIds = new Set<string>();

		anchors.forEach((anchor) => populateUniqueAnchors(uniqueAnchors, seenAnchorIds, anchor));
		Anchors.value = uniqueAnchors;
	};

	const editor = useEditor({
		content: result.content,
		editable: false,
		extensions: [
			...articleExtensions,
			TableOfContents.configure({
				onUpdate: (anchors) => populateAnchors(anchors),
			}),
		],
	});

	onUnmounted(() => {
		if (editor.value) editor.value.destroy();
	});
</script>
