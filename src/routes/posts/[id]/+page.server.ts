import { getPost } from "$lib/server/cms";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const post = await getPost(params.id);

	return {
		post,
	};
};
