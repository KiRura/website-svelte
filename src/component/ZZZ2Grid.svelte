<script lang="ts">
	export let columns: number = 3;
	export let optimize: boolean = false;
	export let highlight: boolean = false;
</script>

<div style:--columns={columns}>
	{#each { length: columns * 20 }, i}
		<p
			data-optimize={optimize && columns * 2 <= i}
			data-reverse={i % (columns * 2) >= columns}
			data-highlight={highlight && columns * 10 <= i}
		>
			<slot />
		</p>
	{/each}
</div>

<style>
	@keyframes slide-to-left-full {
		from {
			translate: 0 0;
		}
		to {
			translate: -100% 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		div p {
			animation: none;
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		p {
			animation: slide-to-left-full 10s linear infinite;
			& [data-reverse="true"] {
				animation-direction: reverse;
			}
		}
	}
	p {
		font-size: 16rem;
		font-weight: bold;
		font-stretch: ultra-condensed;
		padding-left: 3;
		margin: -2px;
		line-height: 0.9;
	}
	@media screen and (max-width: 29.9975rem) {
		p [data-optimize="true"] {
			display: none;
		}
	}

	p [data-highlight="true"] {
		color: white alpha(8%);
		background-color: #fb923c;
	}

	div {
		rotate: -90deg -45deg;
		grid-template-columns: repeat(var(--columns), fit-content(100%));
		gap: 0;
	}
</style>
