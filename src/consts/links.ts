import { LucideMail } from "@lucide/svelte";
import {
	siBluesky,
	siGithub,
	siSimpleicons,
	siX,
	siYoutube,
} from "simple-icons";

export const links: {
	name: string;
	href: `https://${string}` | `mailto:${string}`;
	icon: typeof LucideMail | typeof siSimpleicons;
}[] = [
	{
		name: "Email",
		href: "mailto:kirura@kirura.f5.si",
		icon: LucideMail,
	},
	{
		name: "GitHub",
		href: "https://github.com/KiRura",
		icon: siGithub,
	},
	{
		name: "YouTube",
		href: "https://www.youtube.com/@7KiRura",
		icon: siYoutube,
	},
	{
		name: "Twitter",
		href: "https://twitter.com/7KiRura",
		icon: siX,
	},
	{
		name: "Bluesky",
		href: "https://bsky.app/profile/7kirura.bsky.social",
		icon: siBluesky,
	},
];
