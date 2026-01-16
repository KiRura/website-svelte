import type { Pathname } from "$app/types";
import {
	LucideClock,
	LucidePenTool,
	LucideScale,
	type Icon,
} from "@lucide/svelte";

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
