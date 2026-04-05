<script lang="ts">
	import { navigating } from "$app/state";

	import { css, cx } from "styled-system/css";
	import { button, container, icon, link } from "styled-system/recipes";
	import ColorModeButton from "../ColorModeButton.svelte";
	import { resolve } from "$app/paths";
	import kiruraIcon from "$lib/assets/kirura/512p.png";
	import { page as appPage } from "$app/state";
	import { pages } from "../../consts/pages";
</script>

<nav class={container({ centerContent: true })}>
	<div class="group pages">
		<a
			href={resolve("/")}
			class={[link({ variant: "plain" }), "home"]}
			aria-label="ホーム"
		>
			<enhanced:img
				aria-hidden="true"
				src={kiruraIcon}
				alt="きるらのアイコン Kの文字"
				class={css({ boxSize: "8", maxW: "8", rounded: "full" })}
			/>
			<span>KiRura</span>
		</a>
		<div class="pages_scroll">
			{#each pages as page (`page-${page.label}-${page.href}`)}
				<a
					class={cx(
						button({ variant: "bgoutline" }),
						css({
							color: "fg.muted",
							rounded: "0",
							borderLeftWidth: "0",
							_selected: {
								color: "orange.fg",
								borderBottomColor: "orange.border",
							},
							_hover: { color: "fg" },
							_loading: {
								color: "fg",
								animationName: "pulse",
								animationDuration: "1s",
								animationIterationCount: "infinite",
							},
							transitionProperty: "color, border, background",
							_first: {
								roundedLeft: "sm",
								borderLeftWidth: "1px",
							},
							_last: {
								roundedRight: "sm",
							},
						}),
					)}
					href={resolve(page.href)}
					data-selected={appPage.route.id?.startsWith(page.href) || undefined}
					data-loading={navigating.to?.route.id?.startsWith(page.href) ||
						undefined}
				>
					<page.icon class={icon()} />
					{page.label}
				</a>
			{/each}
		</div>
	</div>
	<div class="group theme_switcher">
		<ColorModeButton />
	</div>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		max-width: 100%;
		height: var(--sizes-navbar);
		z-index: var(--z-index-docked);
		padding-top: 0.4rem;
		padding-bottom: 0.4rem;
		pointer-events: none;
		touch-action: none;
		flex-direction: row;
		justify-content: space-between;
		gap: 1rem;
		filter: drop-shadow(0 0 0.2rem var(--colors-black-alpha-500));
	}

	.group {
		pointer-events: all;
		touch-action: auto;
		display: flex;
		gap: 1rem;
	}

	.home {
		color: var(--colors-fg);
		font-weight: 700;
		font-size: 1.6rem;
		span {
			white-space: nowrap;
			@media (max-width: 719px) {
				display: none;
			}
		}
	}

	.pages,
	.pages_scroll {
		flex-shrink: 114514;
	}

	.pages_scroll {
		display: flex;
		overflow-x: auto;
	}

	.theme_switcher {
		flex-shrink: 0;
	}
</style>
