// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/image", "@pinia/nuxt", "nuxt-umami", "@nuxt/fonts", "nuxt-og-image"],

	umami: {
		id: process.env.UMAMI_ID,
		host: process.env.UMAMI_HOST,
		useDirective: true,
		autoTrack: false,
		enabled: true,
		proxy: "cloak",
		ignoreLocalhost: true,
		urlOptions: {
			trailingSlash: "never",
			excludeSearch: true,
			excludeHash: true,
		},
	},

	runtimeConfig: {
		logging: {
			limit: 10,
			include: ["/api/**", "/**"],
			exclude: ["/api/status", "/_", "/.well-known"],
		},
	},

	fonts: {
		defaults: {
			weights: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
		},
	},

	site: {
		url: "https://roland-meijer.nl/",
		name: "Insights",
	},

	app: {
		pageTransition: { name: "fade", mode: "out-in" },
		head: {
			link: [
				{ rel: "icon", href: "https://dashboard.roland-meijer.nl/favicon.ico", sizes: "48x48" },
				{ rel: "icon", href: "https://dashboard.roland-meijer.nl/icons/icon_192-blue.png", sizes: "192x192" },
			],
		},
	},
});
