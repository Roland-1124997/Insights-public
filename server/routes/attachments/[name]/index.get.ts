export default defineCachedEventHandler(async (event) => {
	const { name } = getRouterParams(event);

	return await $fetch(`https://dashboard.roland-meijer.nl/attachments/${name}`)
		.then((data) => data)
		.catch((error) => error);

}, { 
	maxAge: 60 * 60,
	getKey: (event) => {
		const { name } = getRouterParams(event);
		return `attachment-${name}`;
	}
});








