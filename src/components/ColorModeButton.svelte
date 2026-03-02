<script lang="ts">
	import { useTheme } from "svelte-themes";
	import LucideSun from "@lucide/svelte/icons/sun";
	import LucideMoon from "@lucide/svelte/icons/moon";
	import LucideSunMoon from "@lucide/svelte/icons/sun-moon";
	import LucideChevronDown from "@lucide/svelte/icons/chevron-down";
	import LucideCheck from "@lucide/svelte/icons/check";
	import { button, icon, select } from "styled-system/recipes";
	import z from "zod";
	import { cx } from "styled-system/css";
	import {
		ClientOnly,
		createListCollection,
		Portal,
		Select,
	} from "@ark-ui/svelte";

	const theme = useTheme();
	let derivedTheme = $derived([theme.theme]);
	const schema = z.literal(["light", "dark", "system"]);
	const resolvedTheme = $derived(schema.parse(theme.theme ?? "light"));

	const themes = createListCollection({
		items: [
			{
				label: "ライト",
				value: "light",
				icon: LucideSun,
			},
			{
				label: "ダーク",
				value: "dark",
				icon: LucideMoon,
			},
			{
				label: "システム",
				value: "system",
				icon: LucideSunMoon,
			},
		],
	} as const);

	const selectStyles = select();
</script>

<Select.Root
	collection={themes}
	bind:value={derivedTheme}
	onValueChange={(e) => {
		theme.theme = e.value[0];
	}}
	lazyMount
	unmountOnExit
	positioning={{ sameWidth: true }}
	class={selectStyles.root}
>
	<Select.Control class={selectStyles.control}>
		<Select.Trigger
			class={cx(selectStyles.trigger, button({ variant: "bgoutline" }))}
		>
			{@const ThemeIcon = themes.find(resolvedTheme)?.icon}
			<ClientOnly>
				{#snippet fallback()}
					<LucideMoon class={icon()} />
				{/snippet}
				<ThemeIcon class={icon()} />
			</ClientOnly>
			<Select.Indicator class={selectStyles.indicator}>
				<LucideChevronDown class={icon()} />
			</Select.Indicator>
		</Select.Trigger>
	</Select.Control>
	<Portal>
		<Select.Positioner class={selectStyles.positioner}>
			<Select.Content class={selectStyles.content}>
				{#each themes as option (option.value)}
					<Select.Item
						item={option}
						class={selectStyles.item}
						aria-label={option.label}
					>
						<option.icon aria-hidden class={icon()} />
						<Select.ItemIndicator class={selectStyles.itemIndicator}>
							<LucideCheck class={icon()} />
						</Select.ItemIndicator>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Positioner>
	</Portal>
	<Select.HiddenSelect />
</Select.Root>
