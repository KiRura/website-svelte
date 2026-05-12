<script lang="ts">
	import { resolve } from "$app/paths";
	import { css, cx } from "styled-system/css";
	import { container, grid, hstack, vstack } from "styled-system/patterns";
	import { heading, link, separator } from "styled-system/recipes";
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
		css({ maxW: "none", py: "4" }),
	)}
>
	<aside
		class={vstack({
			alignItems: "stretch",
			h: "full",
			maxH: "vh",
			pos: "sticky",
			gap: "0",
			top: "0",
			overflowY: "hidden",
			hideBelow: "md",
		})}
	>
		<div
			class={hstack({
				bgColor: "bg",
				borderBottomWidth: "1px",
				pb: "2",
			})}
		>
			<p class={heading()}>呟き</p>
			<span class={cx(separator(), css({ flex: 1 }))}></span>
			<RssMenu />
		</div>
		<div class={css({ overflowY: "auto" })}>
			{#each data.posts.contents as post (post.id)}
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
								textUnderlineOffset: "3px",
								textDecorationColor: "orange.fg",
								borderLeftWidth: "1px",
								borderColor: "orange.fg",
								pl: "3",
							},
							transitionProperty: "color border padding",
							transitionDuration: "slow",
							py: "2",
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
	<div>
		<div class={hstack({ hideFrom: "md", mb: "2" })}>
			<span class={cx(separator(), css({ flex: 1 }))}></span>
			<RssMenu />
		</div>
		{@render children()}
	</div>
</main>
