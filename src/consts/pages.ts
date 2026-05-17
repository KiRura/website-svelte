import { resolve } from "$app/paths";
import type { ResolvedPathname } from "$app/types";
import {
	LucideHouse,
	LucideLink2,
	LucidePenTool,
	LucideScale,
} from "@lucide/svelte";

export const pages: {
	label: string;
	href: ResolvedPathname;
	icon: typeof LucidePenTool;
}[] = [
	{
		label: "TOP",
		href: resolve("/#top"),
		icon: LucideHouse,
	},
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
