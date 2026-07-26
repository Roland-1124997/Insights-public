import type { SitemapUrlInput, ImageEntry, GoogleNewsEntry } from "#sitemap/types";
import { defineSitemapEventHandler } from "#imports";

const toSlug = (title: string) => {
	return title
		.trim()
		.replace(/\s*-\s*/g, "-")
		.replace(/\s+/g, "-")
		.replace(/[^A-Za-z0-9-]/g, "")
		.replace(/-+/g, "-")
		.toLowerCase();
};

const getImageCountFromContent = (content: { content: any[] }) => {
	const { content: nodes } = content;

	return nodes
		.filter((node: any) => node.type === "image")
		.map((node) => {
			return {
				loc: `https://dashboard.roland-meijer.nl${node.attrs.src}`,
				caption: node.attrs.alt,
				title: node.attrs.title,
			} satisfies ImageEntry;
		});
};

export default defineSitemapEventHandler(async () => {
	return await $fetch("https://dashboard.roland-meijer.nl/api/articles")
		.then((response: any) => {
			return response.data.map((article: any) => {
				return {
					loc: `/${toSlug(article.title)}`,
					lastmod: article.updated_at,
					images: getImageCountFromContent(article.content),
					changefreq: "monthly",
					news: {
						title: article.title,
						publication_date: article.created_at,

						publication: {
							name: "Roland Meijer",
							language: "nl",
						},
					},
				};
			}) satisfies SitemapUrlInput[];
		})
		.catch((error) => {
			return [];
		});
});
