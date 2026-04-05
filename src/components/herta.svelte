<script lang="ts">
	import { button } from "styled-system/recipes";
	import herta from "$lib/assets/herta.webp";
	import kurukuru from "$lib/assets/kurukuru.webp";
	import kuru1 from "$lib/assets/kuru1.opus";
	import kuru2 from "$lib/assets/kuru2.opus";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { cubicIn } from "svelte/easing";

	let isKurukuru = $state(false);
	let kurukuruTimeout = $state<NodeJS.Timeout | null>(null);

	let sounds = $state<HTMLAudioElement[]>([]);

	onMount(() => {
		sounds = [new Audio(kuru1), new Audio(kuru2)];

		return () => {
			for (const sound of sounds) {
				sound.remove();
			}
		};
	});
</script>

<div class="root">
	<button
		class={button({ variant: "plain" })}
		onclick={() => {
			if (kurukuruTimeout) clearTimeout(kurukuruTimeout);
			window.scrollTo({ top: 0, behavior: "smooth" });
			isKurukuru = true;
			kurukuruTimeout = setTimeout(() => {
				isKurukuru = false;
			}, 1000);

			const sound = sounds[Math.trunc(Math.random())];
			sound.volume = 0.3;
			sound.play();
		}}
	>
		{#if isKurukuru}
			<img
				src={kurukuru}
				alt="kurukuru~"
				class="kurukuru"
				out:fly={{ y: "100%", opacity: 1, easing: cubicIn }}
			/>
		{:else}
			<img
				src={herta}
				alt="herta"
				loading="lazy"
				class="herta"
				in:fly={{ y: "100%", opacity: 1 }}
			/>
		{/if}
	</button>
</div>

<style>
	.root {
		width: fit-content;
		margin-left: auto;
		margin-right: auto;
	}

	button {
		--height: 6rem;
		height: var(--height);
		overflow: hidden;
	}

	.kurukuru {
		height: var(--height);
		object-fit: cover;
		position: fixed;
		bottom: 0;
		z-index: var(--z-index-docked);
	}

	.herta {
		height: 100%;
		object-fit: cover;
	}
</style>
