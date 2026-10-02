<script lang="ts">
	import { resolve } from "$app/paths";
	import { page, navigating } from "$app/state";
	import { fly } from "svelte/transition";
	import type { ResolvedPathname } from "$app/types";
	import "../app.css";

	let { children } = $props();

	let config = $state({
		maxWidth: 37,
		lineHeight: 1.8,
		paddingX: 1.2,
		bgOled: false,
		useBrowserFont: true,
		liga: false,
	});

	const pages: {
		label: string;
		href: ResolvedPathname;
	}[] = [
		{
			label: "Top",
			href: resolve("/"),
		},
		{
			label: "呟き",
			href: resolve("/posts"),
		},
		{
			label: "概要",
			href: resolve("/about"),
		},
	];
</script>

<svelte:head>
	<link rel="icon" href="/icon/rounded/favicon.ico" />

	{#if !config.useBrowserFont}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link
			rel="preconnect"
			href="https://fonts.gstatic.com"
			crossorigin="anonymous"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght,MONO@0,300..800,0..1;1,300..800,0..1&family=IBM+Plex+Sans+JP:wght@100;200;300;400;500;600;700&family=Noto+Sans+JP:wght@100..900&family=Zalando+Sans:ital,wdth,wght@0,75..125,200..900;1,75..125,200..900&display=swap"
			rel="stylesheet"
		/>
	{/if}
</svelte:head>

<!-- https://github.com/sveltejs/svelte/issues/16071 -->
<css-prop
	style:display="contents"
	style:--max-width="{config.maxWidth}rem"
	style:--line-height={config.lineHeight}
	style:--padding-x="{config.paddingX}rem"
	data-loading={navigating.type !== null || undefined}
	data-bg-oled={config.bgOled || undefined}
	data-use-font={!config.useBrowserFont || undefined}
	data-liga={config.liga || undefined}
>
	<div class="root">
		{@render Nav()}
		{#key page.route.id}
			<div class="main">
				{@render children()}
			</div>
		{/key}
		{@render Nav({ bottom: true })}
	</div>
	<dialog id="config" closedby="any">
		<form
			method="dialog"
			onsubmit={() => {
				for (const [key, value] of Object.entries(config)) {
					localStorage.setItem(key, String(value));
				}
			}}
		>
			{@render CloseButton()}
			<label>
				本文最大横幅
				<div class="unit">
					<input
						type="number"
						bind:value={config.maxWidth}
						min="0"
						step="any"
					/>
					rem
				</div>
			</label>
			<label>
				本文両端余白
				<div class="unit">
					<input type="number" bind:value={config.paddingX} step="any" />
					rem
				</div>
			</label>
			<label>
				本文行幅
				<input type="number" bind:value={config.lineHeight} step="any" />
			</label>
			<label>
				ブラックテーマ
				<input type="checkbox" bind:checked={config.bgOled} />
			</label>
			<label>
				ブラウザ指定のフォントを使う
				<input type="checkbox" bind:checked={config.useBrowserFont} />
			</label>
			<label>
				リガチャ
				<input type="checkbox" bind:checked={config.liga} />
			</label>
			{@render CloseButton()}
		</form>

		{#snippet CloseButton()}
			<menu class="control">
				<button>閉じる</button>
			</menu>
		{/snippet}
	</dialog>

	{#snippet Nav(props?: { bottom?: boolean })}
		<div
			class="navigation"
			data-is-bottom={props?.bottom}
			transition:fly={{ y: props?.bottom ? "100%" : "-100%" }}
		>
			<!-- svelte-ignore a11y_missing_attribute -->
			<img class="icon" src="/icon/kirura_bg.svg" aria-hidden="true" />
			<nav>
				<ul>
					{#each pages as _page (_page.href)}
						{let current = $derived(
							(_page.href === "/"
								? page.route.id === "/"
								: page.route.id?.startsWith(_page.href.split("#")[0])) ||
								undefined,
						)}

						<li>
							<a href={_page.href} aria-current={current}>
								{_page.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
			<menu class="control">
				<li>
					<button command="show-modal" commandfor="config">設定</button>
				</li>
			</menu>
		</div>
	{/snippet}
</css-prop>

<style>
	.root {
		min-height: 100vh;
		display: grid;
		grid-template-rows: fit-content(100%) 1fr fit-content(100%);

		/* @media (pointer: coarse) and (orientation: landscape) {
			grid-template-columns: fit-content(100%) 1fr fit-content(100%);
			grid-template-rows: none;
		} */

		.main {
			animation: 250ms fade-in;
			grid-row-start: 2;
			/* @media (pointer: coarse) and (orientation: landscape) {
				grid-row-start: revert;
				grid-column-start: 2;
			} */

			[data-loading] & {
				filter: opacity(0.5);
			}
		}
	}

	.navigation {
		--limited-padding-x: min(4vw, var(--padding-x));
		position: sticky;
		background: var(--colors-bg);
		z-index: 1;

		&:not([data-is-bottom]) {
			top: 0;
			grid-row-start: 1;
			border-bottom-width: 1px;

			@media (pointer: coarse) {
				/* @media (orientation: landscape) {
					grid-row-start: revert;
					grid-column-start: 1;
					border-bottom-width: 0;
					border-inline-end-width: 1px;
				} */

				/* @media (orientation: portrait) { */
				display: none;
				/* } */
			}
		}

		&[data-is-bottom] {
			bottom: 0;
			grid-row-start: 3;
			border-top-width: 1px;
			padding-bottom: env(safe-area-inset-bottom);

			@media (pointer: none) or (pointer: fine) {
				display: none;
			}

			/* @media (orientation: landscape) and (pointer: coarse) {
				bottom: revert;
				top: 0;
				grid-row-start: revert;
				grid-column-start: 3;
				border-top-width: 0;
				border-inline-start-width: 1px;
			} */
		}

		display: grid;
		grid-template-columns: fit-content(100%) 1fr fit-content(100%);
		/* @media (pointer: coarse) and (orientation: landscape) {
			grid-template-rows: fit-content(100%) 1fr fit-content(100%);
			grid-template-columns: none;
			height: 100dvh;
		} */
		column-rule-width: 1px;
		row-rule-width: 1px;
		align-items: center;

		.icon {
			border-radius: 100vmax;
			height: 2rem;
			margin-left: var(--limited-padding-x);
			margin-right: var(--limited-padding-x);
			animation-duration: 1s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
			animation-delay: 1s;

			[data-loading] & {
				animation-name: rotate;
			}
		}

		nav {
			overflow-x: auto;
			scrollbar-width: thin;

			ul {
				display: flex;
				align-items: center;
				gap: 2rem;
				white-space: nowrap;
				padding-inline-start: 0;
				list-style-position: inside;
				padding-left: var(--limited-padding-x);
				padding-right: var(--limited-padding-x);

				> li {
					a {
						color: var(--colors-fg-brand);
						text-decoration: none;

						&[aria-current] {
							font-weight: bold;
							text-decoration: revert;
						}
					}
				}
			}
		}

		menu {
			padding-right: var(--limited-padding-x);
			padding-left: var(--limited-padding-x);
		}
	}

	dialog > form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		> label {
			display: flex;
			justify-content: space-between;
			gap: 0.5rem;
		}

		.unit {
			display: flex;
			align-items: center;
			gap: 0.2rem;
			justify-content: end;
		}
	}

	.control {
		list-style: none;
		display: flex;
		justify-content: end;
		padding-inline-start: 0;
	}

	@keyframes rotate {
		25% {
			opacity: 0.2;
		}

		50% {
			opacity: 1;
		}

		75% {
			opacity: 0.2;
		}

		to {
			transform: rotateY(1turn);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}
</style>
