import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ data }) => ({
	...data,
	...definePageMetaTags({
		title: data.title,
		description: data.subtitle || "",
		...(data.coverImage && {
			openGraph: {
				images: [data.coverImage],
			},
			twitter: {
				cardType: "summary_large_image",
			},
		}),
	}),
});
