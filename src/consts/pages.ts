import type { Pathname } from "$app/types";
import { LucidePenTool, LucideScale } from "@lucide/svelte";

export const pages: {
	label: string;
	href: Pathname;
	icon: typeof LucidePenTool;
}[] = [
	{
		label: "呟き",
		href: "/posts",
		icon: LucidePenTool,
	},
	{
		label: "ライセンス",
		href: "/license",
		icon: LucideScale,
	},
];
