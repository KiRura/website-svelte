<script lang="ts">
	import { resolve } from "$app/paths";
	import { page, navigating } from "$app/state";
	import { fly } from "svelte/transition";
	import type { ResolvedPathname } from "$app/types";
	import "../app.css";
	import * as z from "@zod/zod/mini";
	import { onMount } from "svelte";

	let { children } = $props();

	const LOCALSTORAGE_KEYS = {
		Config: "config",
	} as const; // enum使えないらしい
	const ConfigSchema = z.object({
		maxWidth: z._default(z.number().check(z.nonnegative()), 37),
		lineHeight: z._default(z.number(), 1.8),
		paddingX: z._default(z.number(), 1.2),
		bgOled: z._default(z.boolean(), false),
		useBrowserFont: z._default(z.boolean(), true),
		liga: z._default(z.boolean(), false),
	});
	let config = $state(ConfigSchema.parse({}));

	function loadConfig() {
		const storageConfig = localStorage.getItem(LOCALSTORAGE_KEYS.Config);
		if (!storageConfig) return;

		const loadedConfig = ConfigSchema.parse(JSON.parse(storageConfig));
		config = loadedConfig;
	}
	function saveConfig() {
		localStorage.setItem("config", JSON.stringify(config));
	}

	onMount(loadConfig);

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
		<form method="dialog">
			<div class="config">
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
			</div>
			<menu class="control">
				<button onclick={() => (config = ConfigSchema.parse({}))} type="button"
					>初期化</button
				>
				<button onclick={loadConfig} type="button">取消</button>
				<button onclick={saveConfig} class="save">保存</button>
			</menu>
		</form>
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
							<a class="button" href={_page.href} aria-current={current}>
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
			height: 100%;
			display: flex;

			ul {
				list-style: none;
				display: flex;
				width: fit-content;
				white-space: nowrap;
				padding-inline-start: 0;
				margin-block: 0;

				> li {
					flex: 1;
					display: flex;
					a.button {
						color: var(--colors-fg-brand);
						text-decoration: none;
						border-width: 0;
						border-radius: 0;
						padding-inline: 1rem;

						&:not([aria-current]) {
							background-color: transparent;
						}

						&[aria-current] {
							font-weight: bold;
							text-decoration: revert;
							color: var(--colors-fg);
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

	dialog {
		&,
		&::backdrop {
			animation: fade-in 0.25s;
		}

		&::backdrop {
			backdrop-filter: var(--blur);
		}

		border-radius: 8px;
	}

	dialog > form {
		.config {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			row-rule-width: 1px;

			> label {
				display: flex;
				justify-content: space-between;
				input {
					margin-inline-start: auto;
				}
				&:not(:has(input[type="checkbox"])) {
					flex-wrap: wrap;
				}
				column-gap: 2rem;
				row-gap: 0.5rem;
			}

			.unit {
				display: flex;
				flex-wrap: wrap;
				align-items: end;
				justify-content: end;
				margin-left: auto;
				column-gap: 0.25rem;
			}
		}

		.control {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			margin-block-end: 0;

			.save {
				flex: 1;
				min-width: 33%;
				color-scheme: dark;
				@media (prefers-color-scheme: dark) {
					color-scheme: light;
				}
			}
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
