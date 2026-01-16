import { definePageMetaTags } from "svelte-meta-tags";
import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = () =>
	definePageMetaTags({
		title: "時計",
		description: "しがない時計",
	});
