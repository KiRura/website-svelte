<script lang="ts">
	import { useTheme } from "svelte-themes";
	import LucideSun from "@lucide/svelte/icons/sun";
	import LucideMoon from "@lucide/svelte/icons/moon";
	import LucideSunMoon from "@lucide/svelte/icons/sun-moon";
	import LucideChevronDown from "@lucide/svelte/icons/chevron-down";
	import LucideCheck from "@lucide/svelte/icons/check";
	import { button, icon, select } from "styled-system/recipes";
	import { Select } from "melt/components";
	import z from "zod";
	import { css, cx } from "styled-system/css";
	import { ClientOnly } from "@ark-ui/svelte";

	const theme = useTheme();
	const schema = z.literal(["light", "dark", "system"]);
	const resolvedTheme = $derived(schema.parse(theme.theme ?? "light"));

	const options: Record<
		z.infer<typeof schema>,
		{ readonly label: string; readonly icon: typeof LucideSun }
	> = {
		light: {
			label: "ライト",
			icon: LucideSun,
		},
		dark: {
			label: "ダーク",
			icon: LucideMoon,
		},
		system: {
			label: "システム",
			icon: LucideSunMoon,
		},
	} as const;

	const selectStyles = select();
	const iconStyle = cx(icon({ size: "md" }), css({ minW: "5" }));
</script>

<Select bind:value={theme.theme}>
	{#snippet children(select)}
		{@const Icon = options[resolvedTheme].icon}
		<button
			{...select.trigger}
			class={cx(selectStyles.trigger, button({ variant: "bgoutline" }))}
		>
			<ClientOnly>
				{#snippet fallback()}
					<LucideMoon class={iconStyle} />
				{/snippet}
				<Icon class={iconStyle} />
			</ClientOnly>
			<LucideChevronDown class={iconStyle} />
		</button>
		<div class={selectStyles.positioner}>
			<div {...select.content} class={selectStyles.content}>
				{#each Object.entries(options) as [value, option] (value)}
					<div
						{...select.getOption(value)}
						class={selectStyles.item}
						aria-label={option.label}
					>
						<option.icon aria-hidden />
						{#if select.isSelected(value)}
							<LucideCheck />
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/snippet}
</Select>
