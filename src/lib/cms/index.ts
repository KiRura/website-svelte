import {
	createClient,
	type MicroCMSContentId,
	type MicroCMSDate,
	type MicroCMSQueries,
} from "microcms-js-sdk";
import type { Post, PostWithContent } from "../../interface/cms";
import { MICROCMS_API_KEY } from "$env/static/private";

const cmsClient = createClient({
	serviceDomain: "kirura",
	apiKey: MICROCMS_API_KEY,
});

export async function getPosts(queries?: MicroCMSQueries) {
	return await cmsClient.getList<Post>({
		endpoint: "blog",
		queries: {
			orders: "-publishedAt",
			...queries,
		},
	});
}

export async function getPost(id: string) {
	let post: PostWithContent & MicroCMSContentId & MicroCMSDate;

	try {
		post = await cmsClient.getListDetail<PostWithContent>({
			endpoint: "blog",
			contentId: id,
		});
	} catch (error) {
		return { error: String(error) };
	}

	return post;
}
