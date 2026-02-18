<script lang="ts">
	import { css, cx } from "styled-system/css";
	import { button } from "styled-system/recipes";
	import herta from "$lib/assets/herta.webp";
	import kurukuru from "$lib/assets/kurukuru.webp";
	import { Presence } from "@ark-ui/svelte";
	import kuru1 from "$lib/assets/kuru1.opus";
	import kuru2 from "$lib/assets/kuru2.opus";
	import { onMount } from "svelte";

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

<!-- data-state="open"の時だけwidthの計算に異常が発生する -->
<!-- position: fixedが機能しない -->
<!-- ChromeよりFirefoxの方が若干widthが細い差異が見られるためブラウザのバグと判断 -->
<!-- 2025-1-16: drop-shadowのせいだと分かった -->

<div
	class={css({
		w: "fit",
		mx: "auto",
		// filter: "drop-shadow(0 0 16px {colors.bg/80})",
	})}
>
	<button
		class={cx(
			button({ variant: "plain" }),
			css({ "--height": "{sizes.24}", h: "var(--height)", overflow: "hidden" }),
		)}
		onclick={() => {
			if (kurukuruTimeout) clearTimeout(kurukuruTimeout);
			window.scrollTo({ top: 0, behavior: "smooth" });
			isKurukuru = true;
			kurukuruTimeout = setTimeout(() => {
				isKurukuru = false;
			}, 1000);

			const sound = sounds[Math.round(Math.random())];
			sound.volume = 0.3;
			sound.play();
		}}
	>
		<Presence
			present={isKurukuru}
			class={css({
				h: "var(--height)",
				pos: "fixed",
				bottom: "0",
				zIndex: "docked",
				_closed: {
					animationName: "slide-to-bottom-full",
					animationDuration: "slowest",
					animationTimingFunction: "ease-in",
				},
			})}
		>
			<img
				src={kurukuru}
				alt="kurukuru~"
				class={css({ h: "full", objectFit: "cover" })}
			/>
		</Presence>
		<Presence
			present={!isKurukuru}
			class={css({
				h: "full",
				_open: {
					animationName: "slide-from-bottom-full",
					animationDuration: "slowest",
					animationTimingFunction: "ease-in-smooth",
				},
			})}
		>
			<img
				src={herta}
				alt="herta"
				loading="lazy"
				class={css({ h: "full", objectFit: "cover" })}
			/>
		</Presence>
	</button>
</div>
