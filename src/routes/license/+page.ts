import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ data }) => ({
	...data,
	...definePageMetaTags({
		title: "ライセンス",
		description: "本当に、有難う",
	}),
});
