<script lang="ts">
	import { page } from "$app/state";
	import { CircleX } from "@lucide/svelte";
	import { css, cx } from "styled-system/css";
	import { container, emptyState } from "styled-system/recipes";
	import ZZZ from "../component/ZZZ.svelte";
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
	disableHighlight
	text="Error"
/>
<main class={cx(container(), emptyState().root)}>
	<div class={emptyState().content}>
		<div class={emptyState().indicator}>
			<CircleX />
		</div>
		<h1
			class={cx(
				css({
					fontFamily: "mono",
					fontWeight: "bold",
					color: "fg.muted",
					fontSize: "7xl",
				}),
			)}
		>
			{page.status}
		</h1>
		<p class={emptyState().description}>
			{page.error?.message}
		</p>
	</div>
</main>
