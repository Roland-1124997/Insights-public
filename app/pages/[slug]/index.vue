<template>
	<div class="">
		<section class="z-20 md:pl-[4.7rem] md:pr-[3.5rem] md:p-3">
			<article class="relative xl:-mt-5 md:p-3">
				<div ref="tiptap_container"
					class="grid w-full gap-3 overflow-y-scroll md:h-[86.6vh] md:grid-cols-[1.009fr_0.45fr]">

					<div :class="shouldAddPadding() ? 'pb-16' : 'pb-1.5'" class="px-6 pt-8 bg-white md:px-24 md:pt-10">
						<TiptapEditor v-if="editor" :editor="editor" aria-label="Artkel inhoud" />
						<span class=" tiptap" v-else v-html="prerender" aria-label="Artkel inhoud"></span>
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
	import { getHierarchicalIndexes, TableOfContents, generateTocIds } from "@tiptap/extension-table-of-contents";
	import { Editor } from "@tiptap/vue-3";

	import { renderToHTMLString } from '@tiptap/static-renderer/pm/html-string'

	const route = useRoute();
	const slug = route.params.slug as string;
	const article = useArtcles();
	const result = article.getBySlug(slug);

	const tiptapContainer = useTemplateRef("tiptap_container");

	if (!result) throw createError({ status: 404, statusText: "Page not found", });
	else onMounted(() => { umTrackView() });

	const seoTitle = `Insights - ${result?.title ?? "Artikel"}`;
	const seoDescription = result?.description.slice(0, 155) ?? "Lees dit artikel.";
	const seoImage = result?.thumbnail_url ?? "/icons/icon_512-blue.png";
	const seoUrl = `/${slug}`;

	const image = useState(`article-${slug}-image`, () => seoImage);

	if (import.meta.server) {
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

	const prerender = useState(`article-${slug}-prerender`, () => "");

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

	const Anchors = useState<any[]>(`article-${slug}-anchors`, () => []);
	Anchors.value = result.anchors

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

	const shouldAddPadding = () => result.content.content.slice(-1)[0].type === "paragraph" ? true : false;

	prerender.value = renderToHTMLString({
		content: result.content,
		extensions: [
			...articleExtensions,
		],
		options: {
			nodeMapping: {
				paragraph: ({ children }) => {
					const content = Array.isArray(children) ? children.join("") : (children ?? "");
					return `<p>${content || "<br>"}</p>`;
				},

				nodeView: ({ node }) =>
					`<div class="flex items-center gap-2 p-2 px-2 mt-2 font-mono text-gray-100 transition-colors duration-200 rounded-lg connection-view w-fit bg-neutral-900">
					<span class="connection-icon" aria-hidden="true">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="text-white">
							<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2.01-.27c.68 0 1.36.09 2.01.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
						</svg>
					</span/>
					<div class="flex items-center gap-2 connection-content">
						${node.attrs.private ? `<span class="text-xs text-gray-300 ">Niet beschikbaar</span>` : `<a href="${node.attrs.html_url || "#"}" target="_blank" rel="noopener noreferrer" class="text-xs text-gray-100 ">Bekijk op GitHub</a>`}
						${node.attrs.homepage ? `<span class="px-1 text-gray-100">|</span><a href="${node.attrs.homepage}" target="_blank" rel="noopener noreferrer" class="text-xs text-gray-100">Website</a>` : ""}
					</div>
				</div>`
			},
		}
	});

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
