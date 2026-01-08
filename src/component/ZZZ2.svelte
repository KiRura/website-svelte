<script lang="ts">
	import ZZZ2Grid from "./ZZZ2Grid.svelte";
	export let text: string = "KiRura";
	export let columns: number;
	export let optimize: boolean = false;
	export let highlight: boolean = false;
</script>

<div aria-hidden={true}>
	<ZZZ2Grid {columns} {optimize} {highlight}>{text}</ZZZ2Grid>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	div {
		animation: fade-in 300ms;
		display: flex;
		top: 0;
		left: 0;
		width: 100%;
		max-height: 100%;
		overflow: hidden;
		clip-path: inset(0);
		user-select: none;
		&::after {
			position: absolute;
			top: 0;
			left: 0;
			content: "";
			width: 100%;
			max-width: 100%;
			background-image: linear-gradient(to bottom, transparent, var(--bg));
		}
	}
	@media screen and (max-width: 95.9975rem) {
		div {
			height: 100vh;
		}
		div::after {
			height: 100vh;
		}
	}
	@media screen and (min-width: 96rem) {
		div {
			height: 60rem;
		}
		div::after {
			height: 60rem;
		}
	}
</style>
