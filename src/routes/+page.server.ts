import { getPinned, getPosts } from "$lib/cms";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		"cache-control": "max-age=120, stale-while-revalidate=3600, public",
	});

	const [recentPosts, pinnedPosts] = await Promise.all([
		getPosts({ limit: 4 }),
		getPinned(),
	]);

	return {
		recentPosts,
		pinnedPosts,
	};
};
