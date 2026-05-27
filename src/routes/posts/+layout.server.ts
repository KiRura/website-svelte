import type { LayoutServerLoad } from "./$types";
import { getPosts } from "$lib/cms";

export const load: LayoutServerLoad = async ({ setHeaders }) => {
	setHeaders({
		"cache-control": "max-age=120, stale-while-revalidate=3600, public",
	});

	return { posts: await getPosts() };
};
