import { getPosts } from "#lib/server/cms/index.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const posts = await getPosts({ limit: 100 });

	return { posts };
};
