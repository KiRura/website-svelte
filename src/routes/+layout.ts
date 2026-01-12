import { defineBaseMetaTags } from "svelte-meta-tags";
import type { LayoutLoad } from "./$types";
import kiruraIcon from "$lib/assets/kirura/512p.png";

export const load: LayoutLoad = ({ url }) => {
	const baseTags = defineBaseMetaTags({
		title: "きるら",
		titleTemplate: "%s | きるら",
		description: "しがないSvelteサイト",
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: "website",
			url: new URL(url.pathname, url.origin).href,
			locale: "ja_JP",
			siteName: "きるら",
			images: [
				{
					url: kiruraIcon,
				},
			],
		},
		twitter: {
			cardType: "summary",
		},
		additionalMetaTags: [
			{
				name: "theme-color",
				content: "#FFBF7F",
			},
		],
	});

	return { ...baseTags };
};
