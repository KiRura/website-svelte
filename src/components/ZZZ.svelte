<script lang="ts">
	import { type Snippet } from "svelte";

	const {
		disableHighlight,
		disableAnimation,
		children,
	}: {
		disableHighlight?: boolean;
		disableAnimation?: boolean;
		children?: Snippet;
	} = $props();

	const columns = 10;
	const rows = 10;
</script>

<div
	class="rotate"
	data-animate={!disableAnimation || undefined}
	data-highlight={!disableHighlight || undefined}
	style="
	   --columns: {columns};
		--rows: {rows};
	"
>
	<div class="odd">
		{@render row(rows / 2)}
	</div>
	<div class="even">
		{@render row(rows / 2)}
	</div>
</div>

{#snippet row(rows: number)}
	{#each { length: rows }}
		<div>
			{@render text(columns)}
		</div>
	{/each}
{/snippet}

{#snippet text(num: number)}
	{#each { length: num }}
		<p class="text">
			{#if children}
				{@render children()}
			{:else}
				KiRura
			{/if}
		</p>
	{/each}
{/snippet}

<style>
	.rotate {
		--p-font-size: 16rem;
		--p-line-height: 0.9;
		--p-margin: -2px;
		--p-padding: 8px;
		--p-height: calc(
			var(--p-font-size) * var(--p-line-height) + var(--p-margin) * 2 +
				var(--p-padding) * 2
		);
		rotate: -90deg;
		position: relative;
		@media (min-width: 480px) {
			rotate: -45deg;
		}
		padding-bottom: var(--p-height);

		&[data-highlight="true"] {
			background: linear-gradient(
				to bottom,
				transparent,
				transparent 50%,
				var(--colors-orange-400) 50%
			);
		}

		.odd,
		.even {
			display: flex;
			flex-direction: column;
			gap: var(--p-height);

			div {
				display: flex;
				gap: 2rem;
			}

			[data-animate="true"] & {
				animation-name: zzz-animation;
				animation-duration: 37s;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
				will-change: transform;
			}
		}

		.even {
			position: absolute;
			top: 0;
			margin-top: var(--p-height);
			animation-direction: reverse;
		}

		p {
			font-size: var(--p-font-size);
			font-weight: 900;
			color: rgb(from var(--colors-fg-muted) r g b / 0.08);
			line-height: var(--p-line-height);
			margin: var(--p-margin);
			padding: var(--p-padding);
		}
	}

	@keyframes zzz-animation {
		to {
			/* ネストできないため横10個を前提に決め打ち */
			/* https://github.com/w3c/csswg-drafts/issues/6809 */
			transform: translateX(10%);
		}
	}
</style>
