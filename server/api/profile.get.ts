export default defineCachedEventHandler(
	async (event) => {
		return await $fetch("https://dashboard.roland-meijer.nl/api/profile", {
			headers: new Headers(getRequestHeaders(event) as HeadersInit),
		})
		.then((data) => data)
		.catch((error) => error);
	},
	{
		maxAge: 60 * 60,
		getKey: () => {
			return `profile`;
		},
	},
);
