import { resolve } from "$app/paths";
import type { ResolvedPathname } from "$app/types";
import { LucideLink2, LucidePenTool, LucideScale } from "@lucide/svelte";

export const pages: {
	label: string;
	href: ResolvedPathname;
	icon: typeof LucidePenTool;
}[] = [
	{
		label: "呟き",
		href: resolve("/#posts"),
		icon: LucidePenTool,
	},
	{
		label: "リンク集",
		href: resolve("/#links"),
		icon: LucideLink2,
	},
	{
		label: "ライセンス",
		href: resolve("/license"),
		icon: LucideScale,
	},
];
