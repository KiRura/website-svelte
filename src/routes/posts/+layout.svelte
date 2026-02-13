<script lang="ts">
	import { resolve } from "$app/paths";

	import { css, cx } from "styled-system/css";
	import { grid, hstack, vstack } from "styled-system/patterns";
	import { container, heading, link, separator } from "styled-system/recipes";
	import RssMenu from "./RssMenu.svelte";

	const { children, data, params } = $props();
</script>

<main
	class={cx(
		container(),
		grid({
			gridTemplateColumns: {
				mdDown: "1fr",
				md: "15rem 1fr",
				lg: "20rem 1fr",
			},
			gap: "6",
		}),
		css({ maxW: "none", pb: "8" }),
	)}
>
	<aside
		class={vstack({
			alignItems: "stretch",
			h: "fit",
			pos: "sticky",
			top: "16",
			maxH: "calc({sizes.vh} - {sizes.20} - {sizes.8})",
			overflowY: "auto",
			hideBelow: "md",
		})}
	>
		<div class={hstack()}>
			<p class={heading()}>呟き</p>
			<span class={cx(separator(), css({ flex: 1 }))}></span>
			<RssMenu />
		</div>
		<div class={css({ spaceY: "5" })}>
			{#each data.contents as post (post.id)}
				<a
					data-selected={params.id === post.id || undefined}
					href={resolve("/posts/[id]", { id: post.id })}
					class={cx(
						link({ variant: "plain" }),
						css({
							color: "fg",
							w: "full",
							justifyContent: "start",
							_selected: {
								color: "orange.fg",
								textDecoration: "underline",
								textDecorationColor: "orange.fg",
							},
							transitionProperty: "color",
							transitionDuration: "slow",
						}),
					)}
				>
					<span
						class={css({
							display: "block",
							overflow: "hidden",
							textOverflow: "ellipsis",
						})}
					>
						{post.title}
					</span>
				</a>
			{/each}
		</div>
	</aside>
	{@render children()}
</main>
