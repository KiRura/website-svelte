<script lang="ts">
	import { css, cx } from "styled-system/css";
	import { container } from "styled-system/recipes";
	import ZZZ from "../components/ZZZ.svelte";
	import { center } from "styled-system/patterns";
	import { dev } from "$app/environment";
	import Herta from "../components/herta.svelte";
</script>

<ZZZ
	class={css({
		pos: "absolute",
		top: "0",
		left: "0",
		w: "full",
		h: { "2xlDown": "vh", "2xl": "60rem" },
		overflow: "hidden",
		userSelect: "none",
		zIndex: "hide",
		_after: {
			pos: "absolute",
			top: "0",
			left: "0",
			content: `""`,
			w: "full",
			h: { "2xlDown": "vh", "2xl": "60rem" },
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
	<Herta />
</main>
