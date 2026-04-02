const catcher = async <T>(promise: Promise<T>) => {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (error: any) {
		return {
			data: null,
			error: (error.data.error || error.data || error) as any,
		};
	}
};


export const useApiHandler = <G>(url: string) => {
	const Send = async <T = G>(options?: any): Promise<{ data: T | null; error: any | null }> => {
		
		const extendedUrl = options?.extends ? `${url as string}${options.extends as string}` : url;

		// @ts-ignore - extendedUrl is a union type (string | Request) from the ternary conditional.
		// When passed to $fetch, TypeScript attempts to match it against all Nuxt routes,
		// creating circular type checking that causes "Excessive stack depth" errors.
		const fetch = $fetch(extendedUrl, {
			...options,
		}) as Promise<T>;

		return catcher<T>(fetch);
	};

	const Get = <T = G>(options?: any) =>
		Send<T>({
			...options,
			method: "GET",
		});

	const Post = async <T = G>(options?: any) =>
		Send<T>({
			...options,
			method: "POST",
		});

	const Delete = async <T = G>(options?: any) =>
		Send<T>({
			...options,
			method: "DELETE",
		});

	const Patch = async <T = G>(options?: any) =>
		Send<T>({
			...options,
			method: "PATCH",
		});

	return {
		Send,
		Get,
		Post,
		Delete,
		Patch,
	};
};
