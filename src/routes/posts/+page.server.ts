import { logger } from "$lib";
import { getPosts } from "$lib/cms";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	logger.info("fetching...", "all");
	return await getPosts();
};
