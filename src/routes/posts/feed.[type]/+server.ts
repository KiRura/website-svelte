import * as z from "@zod/zod";
import type { RequestHandler } from "./$types";
import { StatusCodes } from "http-status-codes";
import { Feed } from "feed";
import { getPosts, type PostWithContent } from "$lib/server/cms";
import { TYPES } from "./types";

export const GET: RequestHandler = async ({ url, params }) => {
	const type = z.literal(Object.values(TYPES)).safeParse(params.type);
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
		title: "KiRura",
		description: "しがないサイト",
		link: baseUrl,
		id: baseUrl,
		language: "ja",
		updated: lastUpdateDate,
		author: {
			name: "KiRura",
			email: "kirura@kirura.f5.si",
			link: "https://www.kirura.f5.si",
		},
	});

	for (const post of posts.contents) {
		feed.addItem({
			title: post.title,
			link: `${baseUrl}/posts/${post.id}`,
			date: new Date(post.updatedAt),
			id: `${baseUrl}/posts/${post.id}`, // https://github.com/jpmonette/feed/issues/254
			description: post.subtitle,
			content: post.content,
			published: post.publishedAt ? new Date(post.publishedAt) : undefined,
			image: post.coverImage
				? {
						url: `${post.coverImage.url}?fm=webp`,
						type: "image/webp", // https://github.com/jpmonette/feed/issues/224
					}
				: undefined,
		});
	}

	switch (type.data) {
		case TYPES.Json:
			return new Response(feed.json1(), {
				headers: { "content-type": "application/json" },
			});
		case TYPES.Atom:
			return new Response(feed.atom1(), {
				headers: { "content-type": "application/xml" },
			});
		case TYPES.Xml:
			return new Response(feed.rss2(), {
				headers: { "content-type": "application/xml" },
			});
	}
};
