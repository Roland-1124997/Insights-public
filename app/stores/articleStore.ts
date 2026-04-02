export const useArtcles = defineStore("useArtcles", () => {
    const url = "/api/articles";
    const Request = useApiHandler(url);

    const articles = ref<any[]>([]);
    const loading = ref(true);
    const error = ref();

    const refresh = async () => {
        loading.value = true;
        new Promise((resolve) => setTimeout(resolve, 1000));

        const { data, error: Error } = (await Request.Get()) as any;

        if (Error) error.value = Error;
        else articles.value = data.data;
    };

    const init = async () => {
        loading.value = true;

        const { data, error: err } = (await useFetch(url)) as any;

        if (err.value) error.value = err.value;
        else articles.value = data.value.data;

    };

    return {
        articles,
        loading,
        error,
        init,
        refresh,
    };
});
