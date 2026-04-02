<template>
	<div class="relative z-20 space-y-12 pb-16 pt-14 md:pt-16">
		<section class="relative overflow-hidden rounded-[2rem] px-6 py-8 md:px-12 md:py-14">
			<article class="relative z-10 grid items-center gap-8 md:grid-cols-[1.55fr_0.55fr]">
				<div class="space-y-6">
					<h1 class="mt-6 text-4xl font-extrabold leading-[0.9] text-blue-950 sm:text-5xl md:text-7xl">Ik bouw digitale producten die gewoon werken</h1>

					<p class="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">Ik ben Roland Meijer, software developer met focus op overzichtelijke interfaces, slimme architectuur en producten die echt waarde leveren. Deze portfolio laat zien hoe ik ideeën omzet in resultaat.</p>

					<div class="flex flex-wrap gap-3 pt-1">
						<UtilsButtonImportant :to="profile.algemeen.contact.cv" description="Bekijk mijn CV" iconName="akar-icons:cloud-download" />
						<UtilsButtonImportant :to="profile.algemeen.contact.github" description="GitHub" iconName="akar-icons:github-fill" />
						<UtilsButtonImportant :to="profile.algemeen.contact.email" description="Plan een gesprek" iconName="akar-icons:envelope" />
					</div>

					<div class="grid gap-3 pt-3 sm:grid-cols-3">
						<div v-for="metric in profileStats" :key="metric.label" class="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 ">
							
							<p class="text-xs font-semibold uppercase tracking-[0.09em] text-slate-800">{{ metric.label }}</p>
							<p class="mt-1 text-lg font-bold text-blue-900">{{ metric.value }}</p>
						</div>
					</div>
				</div>
			</article>
		</section>

		
	</div>
</template>

<script setup lang="ts">
	useSeoMeta({
		title: "Portfolio - Profiel",
		description: "Overzicht van profiel, vaardigheden, stages en opleidingen.",
		ogTitle: "Portfolio - Profiel",
		ogDescription: "Overzicht van profiel, vaardigheden, stages en opleidingen.",
		ogUrl: "/",
		ogImage: "/icons/icon_512-blue.png",
		twitterTitle: "Portfolio - Profiel",
		twitterDescription: "Overzicht van profiel, vaardigheden, stages en opleidingen.",
		twitterImage: "/icons/icon_512-blue.png",
		twitterCard: "summary_large_image",
	});

	useHead({
		htmlAttrs: {
			lang: "nl",
		},
		link: [
			{
				rel: "icon",
				type: "image/png",
				href: "/icons/icon_512-blue.png",
			},
		],
	});

	const profile = {
		algemeen: {
			contact: {
				email: "mailto:contact@roland-meijer.nl",
				github: "https://github.com/Roland-1124997",
				cv: "https://dashboard.roland-meijer.nl/attachments/CV-Roland-Meijer.pdf",
			},
		},

		ervaringen: {
			stages: [
				{
					bedrijf: "Tech Solutions",
					periode: "Juni 2023 - Augustus 2023",
					functie: "Software Development Intern",
					taken: ["Ondersteunen bij het ontwikkelen van webapplicaties", "Samenwerken met het development team", "Testen en debuggen van code"],
				},
				{
					bedrijf: "Innovatech",
					periode: "Januari 2023 - Mei 2023",
					functie: "Frontend Development Intern",
					taken: ["Bouwen van gebruikersinterfaces", "Optimaliseren van de gebruikerservaring", "Implementeren van responsive design"],
				},
				{
					bedrijf: "Data Insights",
					periode: "September 2022 - December 2022",
					functie: "Data Analysis Intern",
					taken: ["Analyseren van datasets", "Visualiseren van data", "Ondersteunen bij het maken van datagedreven beslissingen"],
				},
			],
			opleidingen: [
				{
					instelling: "Hoge School Rotterdam",
					periode: "(2025 Sep) - heden",
					graad: "AD Software Development",
					vaardigheden: ["UX/UI", "Python", "Agile Methodologieën", "Teamwork en Communicatie", "Reflettie en Zelfontwikkeling", "Databases en API's", "Projectmanagement"],
				},
				{
					instelling: "Grafisch Lyceum Rotterdam",
					periode: "(2022 Sep) - (2025 Jun)",
					graad: "MBO (4) Software Developer",
					vaardigheden: ["JavaScript", "Webontwikkeling (HTML, CSS)", "Frameworks (React, Vue)", "Versiebeheer (Git)", "Backend ontwikkeling (Node.js, Php, C#)", "MVC-architectuur", "Probleemoplossing"],
				},
				{
					instelling: "Da Vinci College Dordrecht",
					periode: "(2020 Sep) - (2022 Jun)",
					graad: "MBO (3) Allround system and devices",
					vaardigheden: ["Virtualisatie", "Netwerken", "Basis javaScript", "Algemene IT-vaardigheden", "Beheer van apparatuur", "Ondersteunen van gebruikers"],
				},
			],
		},
	};

	const profileStats = [
		{ label: "Ervaring", value: `${profile.ervaringen.stages.length} stages` },
		{ label: "Opleidingen", value: `${profile.ervaringen.opleidingen.length} trajecten` },
		{ label: "Focus", value: "Frontend + Fullstack" },
	];
</script>

<style scoped>
	
</style>
