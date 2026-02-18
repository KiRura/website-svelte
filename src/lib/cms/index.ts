import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { Post, PostWithContent } from "../../interfaces/cms";
import { MICROCMS_API_KEY } from "$env/static/private";
import { error } from "@sveltejs/kit";

const cmsClient = createClient({
	serviceDomain: "kirura",
	apiKey: MICROCMS_API_KEY,
});

export async function getPosts<T = Post>(queries?: MicroCMSQueries) {
	return await cmsClient.getList<T>({
		endpoint: "blog",
		queries: {
			orders: "-publishedAt",
			...queries,
		},
	});
}

export async function getPost(id: string) {
	// status codeぐらい取得させてくれないか？
	try {
		return await cmsClient.getListDetail<PostWithContent>({
			endpoint: "blog",
			contentId: id,
		});
	} catch (e) {
		console.error(e);
		error(404, {
			message:
				"多分404\nhttps://github.com/microcmsio/microcms-js-sdk/issues/47",
		});
	}
}
