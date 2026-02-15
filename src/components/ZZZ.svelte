<script lang="ts">
	import { css, cx } from "styled-system/css";
	import { center, grid } from "styled-system/patterns";

	const {
		class: wrapperClass,
		disableHighlight,
		disableHighlightAnimation,
		disableOptimize,
		disableAnimation,
		text,
	}: {
		class?: string;
		disableHighlight?: boolean;
		disableHighlightAnimation?: boolean;
		disableOptimize?: boolean;
		disableAnimation?: boolean;
		text?: string | number;
	} = $props();

	const columns = 10;
	const rows = 10;
	const num = columns * rows;

	let animatingDisableHighlight = $state(false);
	if (!(() => disableHighlightAnimation)()) {
		$effect(() => {
			const interval = setInterval(async () => {
				animatingDisableHighlight = true;
				await new Promise((r) =>
					setTimeout(() => r(true), (num / 2) * 8 * 1.5),
				);
				animatingDisableHighlight = false;
			}, 37 * 1000);

			return () => clearInterval(interval);
		});
	}
</script>

<div
	class={cx(
		center({
			animationName: "fade-in",
			animationDuration: "slow",
		}),
		wrapperClass,
	)}
	aria-hidden="true"
>
	<div
		class={grid({
			rotate: ["-90deg", "-45deg"],
			gridTemplateColumns: "repeat(var(--columns), fit-content(100%))",
			gap: "0",
		})}
		style="--columns: {columns}"
	>
		{#each { length: num }, i}
			<p
				data-highlight={(!disableHighlight &&
					!animatingDisableHighlight &&
					num / 2 <= i) ||
					undefined}
				data-right={i % (columns * 2) >= columns || undefined}
				data-optimize={(!disableOptimize && columns * 2 <= i) || undefined}
				data-animate={!disableAnimation || undefined}
				class={css({
					fontSize: "16rem",
					fontWeight: "black",
					fontStretch: "ultra-condensed",
					px: "3",
					color: "fg.subtle/8",
					m: "-2px",
					lineHeight: 0.9,
					whiteSpace: "nowrap",
					"&[data-animate]": {
						animationName: "slide-to-left-full",
						animationDuration: "37s",
						animationIterationCount: "infinite",
						animationTimingFunction: "linear",
						"&[data-right]": {
							animationName: "slide-to-right-full",
						},
					},
					"&[data-highlight]": {
						bg: "orange.400",
						color: "white/8",
					},
					"&[data-optimize]": {
						smDown: {
							display: "none",
						},
					},
					transitionProperty: "background, color",
					transitionDuration: "moderate",
				})}
				style:transition-delay={`${(i - num / 2) * 8}ms`}
			>
				{text ?? "KiRura"}
			</p>
		{/each}
	</div>
</div>
