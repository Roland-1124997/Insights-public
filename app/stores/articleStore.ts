const toSlug = (title: string) => {
    return title.trim()
        .replace(/\s*-\s*/g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^A-Za-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .toLowerCase();
};

const toAbsoluteAttachmentUrl = (value?: string) => {
    if (!value) return value;
    if (/^https?:\/\//i.test(value)) return value;
    if (value.startsWith("/attachments/")) return `https://dashboard.roland-meijer.nl${value}`;
    return value;
};

const normalizeNodeImages = (node: any): any => {
    if (!node || typeof node !== "object") return node;

    const nextNode = { ...node };

    if (nextNode.type === "image" && nextNode.attrs?.src) {
        nextNode.attrs = {
            ...nextNode.attrs,
            src: toAbsoluteAttachmentUrl(nextNode.attrs.src),
        };
    }

    if (Array.isArray(nextNode.content)) {
        nextNode.content = nextNode.content.map((child: any) => normalizeNodeImages(child));
    }

    return nextNode;
};

const normalizeArticle = (article: any) => {
    const nextArticle = { ...article };

    nextArticle.thumbnail_url = toAbsoluteAttachmentUrl(nextArticle.thumbnail_url);

    if (nextArticle.content) {
        nextArticle.content = normalizeNodeImages(nextArticle.content);
    }

    return nextArticle;
};

const normalizeArticles = (articles: any[] = []) => articles.map((item) => normalizeArticle(item));

export const useArtcles = defineStore("useArtcles", () => {
    const url = "/api/articles";
    const Request = useApiHandler(url);

    const result = ref<any[]>([]);
    const loading = ref(true);
    const error = ref();

    const refresh = async () => {
        loading.value = true;
        new Promise((resolve) => setTimeout(resolve, 1000));

        const { data, error: Error } = (await Request.Get()) as any;

        if (Error) error.value = Error;
        else result.value = normalizeArticles(data.data);
    };

    const init = async () => {
        loading.value = true;

        const { data, error: err } = (await useFetch(url)) as any;

        if (err.value) error.value = err.value;
        else result.value = normalizeArticles(data.value.data);

    };


    const getBySlug = (slug: string) => result.value.find((item) => toSlug(item.title) === slug);

    return {
        result,
        loading,
        error,
        init,
        refresh,
        toSlug,
        getBySlug,
    };
});
