export default defineEventHandler(async (event) => {
    
    const cache = useStorage("cache");

    cache.removeItem(`nitro:handlers:_:articles.json`);
    
    return { success: true };

});
