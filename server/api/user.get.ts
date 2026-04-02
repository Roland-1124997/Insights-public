export default defineEventHandler(async (event) =>
    await $fetch("http://localhost:3000/api/user", {
        headers: new Headers(getRequestHeaders(event) as HeadersInit),
    })

    .then((data) => data)
    .catch((error) => error)
);
