const toSlug = (title: string) => {
    return title.trim()
        .replace(/\s*-\s*/g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^A-Za-z0-9-]/g, "")
        .replace(/-+/g, "-");
};

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
        else result.value = data.data;
    };

    const init = async () => {
        loading.value = true;

        const { data, error: err } = (await useFetch(url)) as any;

        if (err.value) error.value = err.value;
        else result.value = data.value.data;

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
