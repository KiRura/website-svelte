<script lang="ts">
	import {
		ClientOnly,
		createListCollection,
		Portal,
		Select,
	} from "@ark-ui/svelte";
	import {
		Check,
		ChevronDown,
		Moon,
		Sun,
		SunMoon,
		type Icon,
	} from "@lucide/svelte";
	import { css, cx } from "styled-system/css";
	import { bleed, flex, hstack } from "styled-system/patterns";
	import {
		button,
		icon,
		select as selectRecipe,
		skeleton,
		spinner,
	} from "styled-system/recipes";
	import { useTheme } from "svelte-themes";

	const select = selectRecipe();

	const theme = useTheme();
	let selectedTheme = $derived([theme.theme]);
	const themes = createListCollection({
		items: [
			{ label: { icon: Sun, name: "明" }, value: "light" },
			{ label: { icon: Moon, name: "暗" }, value: "dark" },
			{ label: { icon: SunMoon, name: "システム" }, value: "system" },
		],
	});
</script>

<ClientOnly>
	{#snippet fallback()}
		<div class={skeleton()}>
			<Select.Root
				collection={themes}
				defaultValue={["Sun"]}
				class={select.root}
			>
				<Select.Trigger class={select.trigger}>
					<Sun />
					<Select.Indicator class={select.indicator}>
						<ChevronDown />
					</Select.Indicator>
				</Select.Trigger>
			</Select.Root>
		</div>
	{/snippet}
	<Select.Root
		collection={themes}
		bind:value={selectedTheme}
		onValueChange={(e) => {
			theme.theme = e.value[0];
		}}
		class={select.root}
		positioning={{ placement: "bottom-end" }}
	>
		<Select.Control class={select.control}>
			<Select.Trigger class={select.trigger}>
				<Select.Context>
					{#snippet render(selected)}
						<Select.ValueText placeholder="Loading..." class={select.valueText}>
							{@const Icon = themes.items.find(
								(theme) => theme.value === selected().value[0],
							)?.label.icon}

							<ClientOnly>
								{#snippet fallback()}
									<Sun />
								{/snippet}
								<Icon />
							</ClientOnly>
						</Select.ValueText>
					{/snippet}
				</Select.Context>
				<Select.Indicator class={select.indicator}>
					<ChevronDown />
				</Select.Indicator>
			</Select.Trigger>
		</Select.Control>
		<Portal>
			<Select.Positioner class={select.positioner}>
				<Select.Content class={select.content}>
					{#each themes.items as item (item.value)}
						<Select.Item class={select.item} {item}>
							{#if item.value !== theme.theme}
								<div class={bleed({ w: "4" })}></div>
							{/if}
							<Select.ItemIndicator class={select.itemIndicator}>
								<Check />
							</Select.ItemIndicator>
							<item.label.icon class={icon({ size: "md" })} />
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Positioner>
		</Portal>
		<Select.HiddenSelect />
	</Select.Root>
</ClientOnly>
