import { getPost } from "$lib/cms";
import type { PageServerLoad } from "./$types";
import { logger } from "$lib";

export const load: PageServerLoad = async ({ params }) => {
	logger.info("fetching...", params.id);
	return await getPost(params.id);
};
