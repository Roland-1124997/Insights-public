export default defineNuxtPlugin({
	hooks: {
		'app:beforeMount': async function () {
			const query = useRoute().query;
			if ('itsme' in query) {
				const { itsme, ...otherParams } = query;
				navigateTo({ query: otherParams });
				window.localStorage.setItem('umami.disabled', '1');
			}
		},
	},
});