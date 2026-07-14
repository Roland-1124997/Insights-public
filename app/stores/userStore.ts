export const useUser = defineStore("useUser", () => {
	const url = "/api/user";
	const Request = useApiHandler(url);

	const success = ref(false);
	const loading = ref(true);
	const error = ref();

	const refresh = async () => {
		loading.value = true;
		new Promise((resolve) => setTimeout(resolve, 1000));

		const { data, error: Error } = (await Request.Get()) as any;

		if (Error) success.value = false;
		success.value = data.data;
	};

	const init = async () => {
		loading.value = true;

		const { data, error: err } = (await useFetch(url)) as any;

		if (err.value) success.value = false;
		else {
			success.value = data.value.data;
			window.localStorage.setItem("umami.disabled", "1");
		}

	};

	return {
		success,
		loading,
		error,
		init,
		refresh,
	};
});
