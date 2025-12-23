import { getPost } from "$lib/cms";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { logger } from "$lib";

export const load: PageServerLoad = async ({ params }) => {
	logger.info("fetching...", params.id);
	const post = await getPost(params.id);
	if ("error" in post) {
		error(404, { message: post.error });
	}

	return post;
};
