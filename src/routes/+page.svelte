<script lang="ts">
	import { css, cx } from "styled-system/css";
	import { button, container } from "styled-system/recipes";
	import ZZZ from "../component/ZZZ.svelte";
	import { center } from "styled-system/patterns";
	import { dev } from "$app/environment";
	import herta from "$lib/assets/herta.webp";
	import kurukuru from "$lib/assets/kurukuru.webp";
	import { Presence } from "@ark-ui/svelte";

	let isKurukuru = $state(false);
	let kurukuruTimeout = $state<NodeJS.Timeout | null>(null);
</script>

<ZZZ
	class={css.raw({
		pos: "absolute",
		top: "0",
		left: "0",
		w: "full",
		h: { "2xlDown": "vh", "2xl": "60rem" },
		maxH: "full",
		overflow: "hidden",
		clipPath: "inset(0)",
		userSelect: "none",
		_after: {
			pos: "absolute",
			top: "0",
			left: "0",
			content: `""`,
			w: "full",
			h: { "2xlDown": "vh", "2xl": "60rem" },
			maxH: "full",
			bgGradient: "to-b",
			gradientFrom: "transparent",
			gradientTo: "bg",
		},
	})}
/>
<main>
	<div class={container()}>
		<section
			class={center({ h: { "2xlDown": "vh", "2xl": "50rem" }, maxH: "90vh" })}
		>
			<h1
				class={css({
					fontSize: ["5xl", "6xl", "7xl"],
					fontWeight: "bold",
					fontFamily: `"Google Sans Code", "Noto Sans JP", sans-serif`,
					filter: "drop-shadow(0px 4px 8px {colors.bg/80})",
					// dropShadow: "0px 4px 8px {colors.bg/80}",
					// hey chakra, wtf is this???????????????????????
					// --drop-shadow: var(--empty, ) !important;
				})}
			>
				Hello!,
				<br />
				<span
					class={css({ color: { base: "orange.500", _dark: "orange.300" } })}
				>
					きるら
				</span>,
				<br />
				<span
					class={css({ color: { base: "orange.500", _dark: "orange.300" } })}
				>
					(7)KiRura
				</span>,
			</h1>
		</section>
	</div>
	<div class={cx(container(), css({ py: "16" }))}>
		<img
			src={`https://count.getloli.com/@KiRura-website-svelte${dev ? "-dev" : ""}?darkmode=auto`}
			alt="moe counter"
			width="315px"
			height="100px"
			class={css({ mx: "auto" })}
		/>
	</div>
	<div
		class={css({
			w: "fit",
			mx: "auto",
			filter: "drop-shadow(0 0 16px {colors.bg/80})",
		})}
	>
		<button
			class={cx(button({ variant: "plain" }), css({ h: "24" }))}
			onclick={() => {
				if (kurukuruTimeout) clearTimeout(kurukuruTimeout);
				window.scrollTo({ top: 0, behavior: "smooth" });
				isKurukuru = true;
				kurukuruTimeout = setTimeout(() => {
					isKurukuru = false;
				}, 1000);
			}}
		>
			<!-- data-state="open"の時だけwidthの計算に異常が発生する -->
			<!-- position: fixedが機能しない -->
			<!-- ChromeよりFirefoxの方が若干widthが細い差異が見られるためブラウザのバグと判断 -->
			<Presence
				present={isKurukuru}
				class={css({
					h: "24",
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
</main>
