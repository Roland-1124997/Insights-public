export default defineEventHandler(async (event) =>
    await $fetch("https://dashboard.roland-meijer.nl/api/profile", {
        headers: new Headers(getRequestHeaders(event) as HeadersInit),
    })

    .then((data) => data)
    .catch((error) => error)
)
