<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import type { ResolvedPathname } from "$app/types";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();

	let config = $state({
		maxWidth: 37,
		lineHeight: 1.6,
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
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- https://github.com/sveltejs/svelte/issues/16071 -->
<css-prop
	style:display="contents"
	style:--max-width={`${config.maxWidth}rem`}
	style:--line-height={config.lineHeight}
>
	<div class="root">
		<div class="fuckinwrap">
			{@render Nav()}
			{@render children()}
		</div>
		{@render Nav({ bottom: true })}
		<dialog id="config">
			<form method="dialog">
				{@render CloseButton()}
				<label>
					本文最大横幅
					<div>
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
					本文行幅
					<input type="number" bind:value={config.lineHeight} step="any" />
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
			<div class="navigation" data-is-bottom={props?.bottom}>
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
	</div>
</css-prop>

<style>
	:global {
		:root {
			color-scheme: light dark;
		}

		body {
			margin-top: 0;
			margin-bottom: 0;
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
			max-width: var(--max-width);
			margin-left: auto;
			margin-right: auto;

			* {
				line-height: var(--line-height);
			}
		}
	}

	.root {
		.fuckinwrap {
			min-height: 100vh;
		}
	}

	.navigation {
		position: sticky;
		background: Background;

		&:not([data-is-bottom]) {
			top: 0;
			border-bottom: solid;
		}

		&[data-is-bottom] {
			bottom: 0;
			border-top: solid;
		}

		display: grid;
		grid-template-columns: 1fr fit-content(100%);
		align-items: center;

		nav {
			overflow-x: auto;
			scrollbar-width: thin;

			ul {
				display: flex;
				align-items: center;
				gap: 2rem;
				white-space: nowrap;
				margin-top: 0;
				margin-bottom: 0;

				> li {
					&::marker {
						content: "・";
					}

					a {
						color: LinkText;
						&:active {
							color: ActiveText;
						}

						&[aria-current] {
							color: VisitedText;
						}
					}
				}
			}
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
	}

	.control {
		list-style: none;
		display: flex;
		justify-content: end;
	}
</style>
