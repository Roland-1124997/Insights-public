
export const useProfile = defineStore("useProfile", () => {
    const url = "/api/profile";
    const Request = useApiHandler(url);

    const articles = useArtcles();

    const result = ref();
    const stats = computed(() => {
        if (!result.value) return [];

        return [
            { label: "Ervaring", value: `${result.value.ervaringen.stages.length} stages` },
            { label: "Opleidingen", value: `${result.value.ervaringen.opleidingen.length} trajecten` },
            { label: "Gerealiseerde projecten", value: `${articles.result.length} projecten` },
            { label: "Focus", value: "Frontend + Fullstack" },
        ];
    });

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

    return {
        result,
        stats,
        loading,
        error,
        init,
        refresh,
    };
});
