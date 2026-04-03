<template>
	<div>
		<section class="relative z-20 bg-white md:pl-20 mt-[5.7rem] border p-3 lg:mt-12 xl:mt-20">
			<article class="relative bg-white p-3 rounded-[2rem]">
				<div v-if="editor">
					<div class="grid grid-cols-1 md:grid-cols-[1fr_0.35fr] md:items-start">
						<div class="z-10 md:px-16 md:border-r">
							<div class="relative mt-1 overflow-x-hidden outline-none appearance-none md:mt-auto md:h-[83.5vh]">
								<TiptapEditor :editor="editor" aria-label="Artkel inhoud" />
							</div>
						</div>
						<div class="pl-4">
							<TiptapTableList :Anchors="Anchors" />
						</div>
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
