import { getPost } from "$lib/cms";
import type { PageServerLoad } from "./$types";
import { logger } from "$lib";
import { parse } from "node-html-parser";

export const load: PageServerLoad = async ({ params }) => {
	logger.info("fetching...", params.id);
	const res = await getPost(params.id);
	const parsed = parse(res.content);
	const headings = [...parsed.querySelectorAll("h2,h3")].map((element) => ({
		id: element.id,
		text: element.textContent,
		level: element.tagName,
	}));
	return { post: { ...res, headings } };
};
