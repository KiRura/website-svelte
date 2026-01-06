<script lang="ts">
	import { Moon, Sun, type Icon } from "@lucide/svelte";
	import { css, cx } from "styled-system/css";
	import { button, icon } from "styled-system/recipes";
	import { useTheme } from "svelte-themes";

	const theme = useTheme();
</script>

<button
	class={cx(button({ variant: "outline" }), css({ p: "0" }))}
	onclick={() => (theme.theme = theme.theme === "light" ? "dark" : "light")}
	aria-label={`${theme.resolvedTheme === "light" ? "ダーク" : "ライト"}モードに切り替える`}
>
	{#if theme.resolvedTheme === "light"}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>
