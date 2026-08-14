<script lang="ts">
	import { resolve } from "$app/paths";
	import { page, navigating } from "$app/state";
	import { fly } from "svelte/transition";
	import type { ResolvedPathname } from "$app/types";
	import { afterNavigate } from "$app/navigation";

	let { children } = $props();

	let config = $state({
		maxWidth: 37,
		lineHeight: 1.8,
		topNav: true,
		bottomNav: true,
		paddingX: 1.2,
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
			label: "FAQ",
			href: resolve("/faq"),
		},
	];

	let isNavigating = $state(false);
	afterNavigate(() => {
		isNavigating = true;
	});
</script>

<svelte:head>
	<link rel="icon" href="/icon/rounded/favicon.ico" />
</svelte:head>

<!-- https://github.com/sveltejs/svelte/issues/16071 -->
<css-prop
	style:display="contents"
	style:--max-width="{config.maxWidth}rem"
	style:--line-height={config.lineHeight}
	style:--padding-x="{config.paddingX}rem"
	data-navigating={isNavigating || undefined}
	data-loading={navigating.type !== null || undefined}
>
	<div class="root">
		<div class="wrap">
			{@render Nav()}
			{#key page.route.id}
				{let fromRouteLength =
					navigating.from?.route.id?.split("/").length || 0}
				{let toRouteLength = navigating.to?.route.id?.split("/").length || 0}
				<div
					class="main"
					in:fly={{
						...(fromRouteLength === toRouteLength
							? {
									y: "3rem",
								}
							: fromRouteLength > toRouteLength
								? {
										x: "-3rem",
									}
								: fromRouteLength < toRouteLength
									? {
											x: "3rem",
										}
									: {}),
						duration: 250,
					}}
					onintroend={() => (isNavigating = false)}
				>
					{@render children()}
				</div>
			{/key}
			{@render Nav({ bottom: true })}
		</div>
		<dialog id="config">
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
					上側ナビゲーション
					<input type="checkbox" bind:checked={config.topNav} />
				</label>
				<label>
					下側ナビゲーション
					<input type="checkbox" bind:checked={config.bottomNav} />
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
			{#if (props?.bottom && config.bottomNav) || (!props?.bottom && config.topNav)}
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
			{/if}
		{/snippet}
	</div>
</css-prop>

<style>
	:global {
		:root {
			color-scheme: light dark;
		}

		body {
			margin: 0;
		}

		* {
			box-sizing: border-box;
		}

		img {
			max-inline-size: 100%;
			height: auto;
			object-fit: cover;
		}

		.container {
			max-width: calc(var(--max-width) + var(--padding-x) * 2);
			margin-left: auto;
			margin-right: auto;
			padding-left: var(--padding-x);
			padding-right: var(--padding-x);

			line-height: var(--line-height);
			text-autospace: normal;

			p {
				text-align: justify;
			}
		}

		pre {
			max-inline-size: 100%;
			overflow-x: auto;
		}
	}

	.root {
		[data-navigating] & {
			width: 100%;
			overflow-x: clip;
		}

		.wrap {
			min-height: 100vh;
			display: grid;
			grid-template-rows: fit-content(100%) 1fr fit-content(100%);

			.main {
				grid-row-start: 2;
				overflow-x: auto;

				[data-loading] & {
					filter: opacity(0.5);
				}
			}
		}
	}

	.navigation {
		--limited-padding-x: min(4vw, var(--padding-x));
		position: sticky;
		background: Background;
		z-index: 1;

		&:not([data-is-bottom]) {
			top: 0;
			grid-row-start: 1;
			border-bottom: solid;
		}

		&[data-is-bottom] {
			bottom: 0;
			grid-row-start: 3;
			border-top: solid;
		}

		display: grid;
		grid-template-columns: fit-content(100%) 1fr fit-content(100%);
		column-rule: thin solid;
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
						color: LinkText;
						&:active {
							color: ActiveText;
						}

						&[aria-current] {
							color: VisitedText;
							font-weight: bold;
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
</style>
