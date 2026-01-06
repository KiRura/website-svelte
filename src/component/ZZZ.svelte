<script lang="ts">
	import { css, cx } from "styled-system/css";
	import { center, grid } from "styled-system/patterns";
	import type { SystemStyleObject } from "styled-system/types";

	const {
		class: wrapperClass,
		disableHighlight,
		disableOptimize,
		text,
	}: {
		class?: SystemStyleObject;
		disableHighlight?: boolean;
		disableOptimize?: boolean;
		text?: string;
	} = $props();

	const columns = 5;
	const num = columns * 20;
</script>

<div
	class={cx(
		center({
			animationName: "fade-in",
			animationDuration: "slow",
			_motionReduce: { animation: "none" },
			...wrapperClass,
		}),
	)}
	aria-hidden="true"
>
	<div
		class={grid({
			"--columns": columns,
			rotate: ["-90deg", "-45deg"],
			gridTemplateColumns: "repeat(var(--columns), fit-content(100%))",
			gap: "0",
		})}
	>
		{#each { length: num }, i}
			<p
				data-highlight={(!disableHighlight && num / 2 <= i) || undefined}
				data-right={i % (columns * 2) >= columns || undefined}
				data-optimize={(!disableOptimize && columns * 2 <= i) || undefined}
				class={css({
					fontSize: "16rem",
					fontWeight: "black",
					fontStretch: "ultra-condensed",
					px: "3",
					color: "fg.subtle/8",
					m: "-2px",
					lineHeight: 0.9,
					whiteSpace: "nowrap",
					animationName: "slide-to-left-full",
					animationDuration: "37s",
					animationIterationCount: "infinite",
					animationTimingFunction: "linear",
					"&[data-highlight]": {
						bg: "orange.400",
						color: "white/8",
					},
					"&[data-optimize]": {
						smDown: {
							display: "none",
						},
					},
					"&[data-right]": {
						animationName: "slide-to-right-full",
					},
					_motionReduce: {
						animation: "none",
					},
				})}
			>
				{text ?? "KiRura"}
			</p>
		{/each}
	</div>
</div>
