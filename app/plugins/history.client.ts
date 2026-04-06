export default defineNuxtPlugin(() => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
    }

    window.addEventListener('pagehide', () => {
        sessionStorage.setItem('scrollY', window.scrollY.toString())
    })

    window.addEventListener('pageshow', () => {
        const scrollY = sessionStorage.getItem('scrollY')

        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY))
        }
    })
})