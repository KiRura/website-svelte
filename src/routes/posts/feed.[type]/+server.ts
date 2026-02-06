import z from "zod";
import type { RequestHandler } from "./$types";
import { StatusCodes } from "http-status-codes";
import { Feed } from "feed";
import { getPosts } from "$lib/cms";

import type { PostWithContent } from "../../../interface/cms";

export const GET: RequestHandler = async ({ url, params }) => {
	const type = z.literal(["xml", "json", "atom.xml"]).safeParse(params.type);
	if (type.error)
		return new Response(
			`Invalid type.\nShould be: feed.{xml, json, atom.xml}`,
			{
				status: StatusCodes.BAD_REQUEST,
			},
		);

	const posts = await getPosts<PostWithContent>({
		limit: 100,
		fields: [
			"id",
			"title",
			"subtitle",
			"createdAt",
			"publishedAt",
			"updatedAt",
			"coverImage",
			"content",
		],
	});

	let lastUpdateDate = new Date(0);

	for (const post of posts.contents) {
		const updatedAt = new Date(post.updatedAt);
		if (lastUpdateDate.getTime() < updatedAt.getTime())
			lastUpdateDate = updatedAt;
	}

	const baseUrl = `${url.protocol}//${url.host}`;

	const feed = new Feed({
		title: "きるら",
		description: "しがないSvelteサイト",
		link: baseUrl,
		id: baseUrl,
		language: "ja",
		updated: lastUpdateDate,
		author: {
			name: "きるら",
			email: "kirura@kirura.f5.si",
			link: "https://www.kirura.f5.si",
		},
	});

	for (const post of posts.contents) {
		feed.addItem({
			title: post.title,
			link: `${baseUrl}/posts/${post.id}`,
			date: new Date(post.updatedAt),
			id: post.id,
			description: post.subtitle,
			content: post.content,
			published: post.publishedAt ? new Date(post.publishedAt) : undefined,
			image: post.coverImage ? post.coverImage.url : undefined,
		});
	}

	if (type.data === "json")
		return new Response(feed.json1(), {
			headers: { "content-type": "application/json" },
		});
	if (type.data === "atom.xml")
		return new Response(feed.atom1(), {
			headers: { "content-type": "application/xml" },
		});
	return new Response(feed.rss2(), {
		headers: { "content-type": "application/xml" },
	});
};
