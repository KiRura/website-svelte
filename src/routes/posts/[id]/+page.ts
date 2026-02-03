import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ data }) => ({
	...data,
	...definePageMetaTags({
		title: data.post.title,
		description: data.post.subtitle || "",
		...(data.post.coverImage && {
			openGraph: {
				images: [data.post.coverImage],
			},
			twitter: {
				cardType: "summary_large_image",
			},
		}),
	}),
});
