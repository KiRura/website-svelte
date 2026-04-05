<script lang="ts">
	import { page } from "$app/state";
	import { cx } from "styled-system/css";
	import { container, emptyState } from "styled-system/recipes";
	import ZZZ from "../components/ZZZ.svelte";
	import { LucideCircleX } from "@lucide/svelte";
</script>

<!-- metaを実装したいけど気持ち悪い事になるので妥協 -->

<div class="zzz">
	<ZZZ disableHighlight>
		{page.status}
	</ZZZ>
</div>
<main class={cx(container(), emptyState().root)}>
	<div class={emptyState().content}>
		<div class={emptyState().indicator}>
			<LucideCircleX />
		</div>
		<h1>
			{page.status}
		</h1>
		<p class={emptyState().description}>
			{page.error?.message}
		</p>
	</div>
</main>

<style>
	.zzz {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		clip-path: inset(0);
		user-select: none;
		z-index: var(--z-index-hide);

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.zzz::after {
		position: absolute;
		top: 0;
		left: 0;
		content: "";
		width: 100%;
		height: 100vh;
		background: linear-gradient(transparent, var(--colors-bg));
	}

	h1 {
		font-family: var(--fonts-mono);
		font-weight: 700;
		font-size: 6rem;
		color: var(--colors-fg-muted);
	}
</style>
