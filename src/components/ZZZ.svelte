<script lang="ts">
	import { onMount, type Snippet } from "svelte";

	const {
		disableHighlight,
		disableHighlightAnimation,
		disableAnimation,
		children,
	}: {
		disableHighlight?: boolean;
		disableHighlightAnimation?: boolean;
		disableAnimation?: boolean;
		children?: Snippet;
	} = $props();

	const columns = 10;
	const rows = 10;
	const num = columns * rows;

	let animatingDisableHighlight = $state(false);
	onMount(() => {
		if (!disableHighlight || !disableHighlightAnimation) {
			const interval = setInterval(async () => {
				animatingDisableHighlight = true;
				await new Promise((r) =>
					setTimeout(() => r(true), (num / 2) * 8 * 1.5),
				);
				animatingDisableHighlight = false;
			}, 37 * 1000);

			return () => clearInterval(interval);
		}
	});
</script>

<div class="rotate" style="--columns: {columns}">
	{#each { length: num }, i}
		<p
			data-highlight={(!disableHighlight &&
				!animatingDisableHighlight &&
				num / 2 <= i) ||
				undefined}
			data-right={i % (columns * 2) >= columns || undefined}
			data-animate={!disableAnimation || undefined}
			style:transition-delay={`${(i - num / 2) * 8}ms`}
		>
			{#if children}
				{@render children()}
			{:else}
				KiRura
			{/if}
		</p>
	{/each}
</div>

<style>
	.rotate {
		rotate: -90deg;
		@media (min-width: 480px) {
			rotate: -45deg;
		}
		display: grid;
		grid-template-columns: repeat(10, fit-content(100%));

		p {
			font-size: 16rem;
			font-weight: 900;
			color: rgb(from var(--colors-fg-muted) r g b / 0.08);
			line-height: 0.9;
			margin: -2px;
			padding: 8px;

			&[data-animate="true"] {
				animation-name: "slide-to-left-full";
				animation-duration: 37s;
				animation-iteration-count: infinite;
				animation-timing-function: linear;

				&[data-right="true"] {
					animation-name: "slide-to-right-full";
				}
			}

			&[data-highlight="true"] {
				background-color: var(--colors-orange-400);
				color: rgb(from var(--colors-white) r g b / 0.08);
			}

			transition:
				color 300ms,
				background 300ms;
		}
	}
</style>
