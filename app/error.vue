<template>
    <div class="relative w-full">
        <UtilsNavigation />

        <ClientOnly>
            <div class="fixed w-full h-screen -mt-5 overflow-hidden -z-10">
                <UtilsGridPattern class="pointer-events-none" />
            </div>
        </ClientOnly>

        <main class="relative z-10">
            <div class="max-w-6xl px-6 mx-auto">
                <div class="mt-12 md:mt-24 flex items-center justify-center min-h-[70vh]">
                    <section
                        class="relative w-full px-8 py-16 overflow-hidden border border-blue-100 md:ml-4 md:mt-2 rounded-2xl bg-gradient-to-br from-blue-50 to-white md:px-12 md:py-20">
                        <article class="relative z-10 space-y-6 text-center">
                            <div class="space-y-4">
                                <div class="text-6xl font-black md:text-7xl text-blue-950">
                                    {{ statusCode }}
                                </div>
                                <h1 class="text-3xl font-extrabold leading-tight md:text-5xl text-blue-950">
                                    Oops! {{ statusText }}
                                </h1>
                            </div>

                            <p class="max-w-2xl mx-auto text-base leading-relaxed md:text-lg text-slate-600">
                                {{ statusSuggestion }}
                            </p>

                            <div class="flex items-center justify-center gap-4 pt-4">
                                <UtilsButtonImportant event-name="button-click-from-error" icon-name="akar-icons:home-alt1" description="Terug naar home"
                                    @click="handleError" />
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
    const error = useError();

    const statusCode = error.value?.status ?? 500;
    const statusText = statusCode === 404 ? "Pagina niet gevonden" : "Er is iets misgegaan";

    const statusSuggestion = statusCode === 404 ?
        "De pagina die je zoekt bestaat niet of is verplaatst. Geen zorgen, je kunt teruggaan naar de homepagina."
        : "Er is iets misgegaan bij het laden van de pagina. Probeer het later opnieuw of ga terug naar de homepagina.";

    const handleError = () => {
        return clearError({ redirect: "/" });
    };
</script>