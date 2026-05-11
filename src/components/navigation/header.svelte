<script lang="ts">
	import { navigating } from "$app/state";

	import { css } from "styled-system/css";
	import { icon, link, separator } from "styled-system/recipes";
	import ColorModeButton from "../ColorModeButton.svelte";
	import { resolve } from "$app/paths";
	import kiruraIcon from "$lib/assets/kirura/512p.png?enhanced";
	import { page as appPage } from "$app/state";
	import { pages } from "../../consts/pages";
</script>

<nav>
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
		<span class={separator()}></span>
		<div class="pages_scroll">
			{#each pages as page (`page-${page.label}-${page.href}`)}
				<a
					class={link({ variant: "plain" })}
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
	<span class={separator()}></span>
	<div class="group theme_switcher">
		<ColorModeButton />
	</div>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
		padding: 1rem;
		background-color: var(--colors-bg);
	}

	.pages {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 1;
	}

	.home {
		color: var(--colors-fg);
		font-weight: 700;
		font-size: 1.6rem;
		margin-left: auto;
		margin-right: auto;
		span {
			white-space: nowrap;
			@media (max-width: 719px) {
				display: none;
			}
		}
	}

	.pages_scroll {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		overflow-y: auto;

		a {
			color: var(--colors-fg);
			transition-property: color text-decoration;
			transition-duration: 300ms;

			&:first-child {
				margin-top: 0.2rem;
			}

			&[data-selected] {
				color: var(--colors-orange-fg);
				text-decoration: underline;
			}

			&[data-loading] {
				animation-name: pulse;
				animation-duration: 1s;
				animation-iteration-count: infinite;
			}
		}
	}

	.theme_switcher {
		flex-shrink: 0;
	}
</style>
