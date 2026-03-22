import type { LayoutServerLoad } from "./$types";
import { logger } from "$lib";
import { getPosts } from "$lib/cms";

export const load: LayoutServerLoad = async ({ setHeaders }) => {
	setHeaders({
		"cache-control": "max-age=120, stale-while-revalidate=3600, public",
	});

	logger.info("fetching...", "all");
	return { posts: await getPosts() };
};
