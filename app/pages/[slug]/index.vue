<template>
	<div class="">
		<section class="z-20 md:pl-[4.7rem] md:pr-[3.5rem] md:p-3">
			<article class="relative xl:-mt-5 md:p-3">
				<div ref="tiptap_container" v-if="editor" class="grid w-full gap-3 overflow-y-scroll md:h-[86.6vh] md:grid-cols-[1.009fr_0.45fr]">

					<div class="px-6 pt-8 bg-white md:px-24 md:pt-10">
						<TiptapEditor :editor="editor" aria-label="Artkel inhoud" />
					</div>

					<div class="sticky hidden md:inline-flex top-0 overflow-scroll pl-4 pt-4 bg-white md:h-[77vh]">
						<TiptapTableList :Anchors="Anchors" v-model="activeId" />
					</div>
				</div>
			</article>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { getHierarchicalIndexes, TableOfContents } from "@tiptap/extension-table-of-contents";
	import { Editor } from "@tiptap/vue-3";

	const route = useRoute();
	const slug = route.params.slug as string;
	const article = useArtcles();
	const result = article.getBySlug(slug);

	const tiptapContainer = useTemplateRef("tiptap_container");
	
	const seoTitle = `Insights - ${result?.title ?? "Artikel"}`;
	const seoDescription = result?.description.slice(0, 155) ?? "Lees dit artikel.";
	const seoImage = result?.thumbnail_url ?? "/icons/icon_512-blue.png";
	const seoUrl = `/${slug}`;

	const image = useState(`article-${slug}-image`, () => seoImage);

	if(import.meta.server) {
		image.value = defineOgImage("Article.takumi", {
			title: result?.title ?? "Artikel",
			category: result?.topics.slice(-4) ?? ["Algemeen"],
			author: "Roland Meijer",
			publishedTime: result?.created_at ? new Date(result.created_at).toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" }) : "",
		});
	}

	useSeoMeta({
		title: seoTitle,
		description: seoDescription,
		ogTitle: seoTitle,
		ogDescription: seoDescription,
		ogUrl: seoUrl,
		ogImage: image.value[0],
		articleTag: result?.topics ?? [],
		articlePublishedTime: result?.created_at ? new Date(result.created_at).toISOString() : undefined,
		articleModifiedTime: result?.updated_at ? new Date(result.updated_at).toISOString() : undefined,
		author: "Roland Meijer",
		themeColor: "#1e40af",
		twitterTitle: seoTitle,
		twitterImage: image.value[0],
		twitterDescription: seoDescription,
		twitterCard: "summary_large_image",
	});

	useHead({
		htmlAttrs: {
			lang: "nl",
		},
		link: [
			{
				rel: "canonical",
				href: seoUrl,
			},
			{
				rel: "icon",
				type: "image/png",
				href: seoImage,
			},
		],
	});

	const activeId = ref<string | null>(null);
	const isActiveAnchor = ref();

	watch(isActiveAnchor, (newValue) => {
		if (newValue) activeId.value = newValue.id;
	});

	watch(activeId, (newValue) => {
		if (newValue) history.replaceState(history.state, "", `#${newValue}`);
	});

	const isMobileViewport = ref(false);

	let viewportMediaQuery: MediaQueryList | null = null;

	const getScrollParent = () => {

		if (isMobileViewport.value) return window;

		const container = tiptapContainer.value
		return container ?? window;
	};

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

		isActiveAnchor.value = anchors.filter((anchor) => anchor.isActive)[0];

		anchors.forEach((anchor) => populateUniqueAnchors(uniqueAnchors, seenAnchorIds, anchor));
		Anchors.value = uniqueAnchors;
	};

	const editor = shallowRef<Editor | null>(null);

	const createEditor = () => {
		const previousEditor = editor.value;

		editor.value = new Editor({
			content: result.content,
			editable: false,
			extensions: [
				...articleExtensions,
				TableOfContents.configure({
					getIndex: getHierarchicalIndexes,
					onUpdate: (anchors) => {
						populateAnchors(anchors);
					},
					scrollParent: getScrollParent,
				}),
			],
		});

		if (previousEditor) previousEditor.destroy();

		const hash = useRoute().hash;

		if (hash) {
			const id = hash.substring(1);
			activeId.value = id;
			setTimeout(() => {
				const element = document.getElementById(id);
				if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
			}, 500);
		}
	};

	onMounted(() => {
		viewportMediaQuery = window.matchMedia("(max-width: 767px)");
		isMobileViewport.value = viewportMediaQuery.matches;

		createEditor();

		const handleViewportChange = (event: MediaQueryListEvent) => {
			if (isMobileViewport.value === event.matches) return;
			isMobileViewport.value = event.matches;
			createEditor();
		};

		viewportMediaQuery.addEventListener("change", handleViewportChange);

		onBeforeUnmount(() => {
			viewportMediaQuery?.removeEventListener("change", handleViewportChange);
		});
	});

	onUnmounted(() => {
		if (editor.value) editor.value.destroy();
	});
</script>
