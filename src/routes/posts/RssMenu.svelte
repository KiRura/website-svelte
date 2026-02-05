<script lang="ts">
	import { resolve } from "$app/paths";
	import { Menu } from "@ark-ui/svelte";
	import LucideChevronDown from "@lucide/svelte/icons/chevron-down";
	import LucideExternalLink from "@lucide/svelte/icons/external-link";
	import LucideRss from "@lucide/svelte/icons/rss";
	import { css, cx } from "styled-system/css";

	import { button, icon, menu } from "styled-system/recipes";

	const styles = menu();

	const types = [
		{
			label: "RSS 2.0",
			type: "xml",
			href: resolve("/posts/feed.[type]", { type: "xml" }),
		},
		{
			label: "JSON Feed 1.0",
			type: "json",
			href: resolve("/posts/feed.[type]", { type: "json" }),
		},
	];
</script>

<Menu.Root>
	<Menu.Trigger
		aria-label="RSS"
		class={cx(styles.trigger, button({ size: "sm" }))}
	>
		<LucideRss aria-hidden />
		<Menu.Indicator class={styles.indicator}>
			<LucideChevronDown />
		</Menu.Indicator>
	</Menu.Trigger>
	<Menu.Positioner class={styles.positioner}>
		<Menu.Content class={styles.content}>
			<Menu.Arrow class={styles.arrow}>
				<Menu.ArrowTip class={styles.arrowTip} />
			</Menu.Arrow>
			{#each types as type (`rss-type-${type.type}`)}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={type.href} target="_blank"
					><Menu.Item
						class={cx(styles.item, css({ justifyContent: "space-between" }))}
						value={type.type}
					>
						{type.label}<LucideExternalLink
							aria-hidden
							class={cx(icon({ size: "sm" }), css({ color: "fg.muted" }))}
						/>
					</Menu.Item></a
				>
			{/each}
		</Menu.Content>
	</Menu.Positioner>
</Menu.Root>
