import type { Pathname } from "$app/types";
import LucideClock from "@lucide/svelte/icons/clock";
import LucidePenTool from "@lucide/svelte/icons/pen-tool";
import LucideScale from "@lucide/svelte/icons/scale";
import type Icon from "@lucide/svelte/icons/type"; // type取ってくる用 間違えてるとかじゃない 本当 信じて

export const pages: { label: string; href: Pathname; icon: typeof Icon }[] = [
	{
		label: "呟き",
		href: "/posts",
		icon: LucidePenTool,
	},
	{
		label: "時計",
		href: "/clock",
		icon: LucideClock,
	},
	{
		label: "License",
		href: "/license",
		icon: LucideScale,
	},
];
