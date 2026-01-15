import type { Pathname } from "$app/types";
import { LucidePenTool, LucideScale, type Icon } from "@lucide/svelte";

export const pages: { label: string; href: Pathname; icon: typeof Icon }[] = [
	{
		label: "呟き",
		href: "/posts",
		icon: LucidePenTool,
	},
	{
		label: "License",
		href: "/license",
		icon: LucideScale,
	},
];
