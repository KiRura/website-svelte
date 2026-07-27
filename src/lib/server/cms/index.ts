import { MICROCMS_API_KEY } from "$env/static/private";
import {
	createClient,
	type MicroCMSImage,
	type MicroCMSQueries,
} from "microcms-js-sdk";

interface Post {
	title: string;
	subtitle?: string;
	coverImage?: MicroCMSImage;
}

interface PostWithContent extends Post {
	content: string;
}

enum ENDPOINTS {
	Blog = "blog",
	Pinned = "pinned",
}

const client = createClient({
	serviceDomain: "kirura",
	apiKey: MICROCMS_API_KEY,
});

function getPosts<T = Post>(queries?: MicroCMSQueries) {
	return client.getList<T>({
		endpoint: ENDPOINTS.Blog,
		queries: {
			fields: [
				"id",
				"publishedAt",
				"updatedAt",
				"title",
				"subtitle",
				"coverImage",
			],
			...queries,
		},
	});
}

function getPost<T = PostWithContent>(id: string, queries?: MicroCMSQueries) {
	return client.getListDetail<T>({
		contentId: id,
		endpoint: ENDPOINTS.Blog,
		queries: {
			...queries,
		},
	});
}

export type { Post, PostWithContent };

export { getPost, getPosts };
