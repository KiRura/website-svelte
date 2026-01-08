<script>
	import { css, cx } from "styled-system/css";
	import { heading, container, separator } from "styled-system/recipes";
	// import ZZZ from "../component/ZZZ.svelte";
	import ZZZ2 from "../component/ZZZ2.svelte";
	import { center } from "styled-system/patterns";
	import { dev } from "$app/environment";
</script>

<!-- <ZZZ
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
/> -->
<ZZZ2 columns={5} />
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
	<span class={separator()}></span>
	<div class={cx(container(), css({ py: "16" }))}>
		<img
			src={`https://count.getloli.com/@KiRura-website-svelte${dev ? "-dev" : ""}?darkmode=auto`}
			alt="moe counter"
			width="315px"
			height="100px"
			class={css({ mx: "auto" })}
		/>
	</div>
</main>
