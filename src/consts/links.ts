import Icon from "@lucide/svelte/icons/link";
import Email from "@lucide/svelte/icons/mail";
import Github from "@lucide/svelte/icons/github";

export const links: { name: string; href: string; icon: typeof Icon }[] = [
	{
		name: "Email",
		href: "mailto:kirura@kirura.f5.si",
		icon: Email,
	},
	{
		name: "GitHub",
		href: "https://github.com/KiRura",
		icon: Github,
	},
];
