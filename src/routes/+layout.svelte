<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/kirura/rounded/favicon.ico";
	import type { LayoutProps } from "./$types";
	import { SvelteTheme } from "svelte-themes";
	import { page as appPage } from "$app/state";
	import { deepMerge, MetaTags } from "svelte-meta-tags";
	import Header from "../components/navigation/header.svelte";
	import { dev } from "$app/environment";
	import { RenderScan } from "svelte-render-scan";

	const { data, children }: LayoutProps = $props();

	const metaTags = $derived(
		deepMerge(data.baseMetaTags, appPage.data.pageMetaTags),
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=M+PLUS+1+Code:wght@100..700&family=Noto+Sans+JP:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<MetaTags {...metaTags} />

<SvelteTheme attribute="data-color-mode">
	<div class="body">
		{#if dev}
			<RenderScan />
		{/if}
		<Header />
		<div class="main">
			{@render children()}
		</div>
	</div>
</SvelteTheme>

<style>
	:global {
		@layer reset {
			:root {
				--nav-width: 4rem;
				interpolate-size: allow-keywords;
			}

			* {
				scrollbar-color: var(--colors-border-emphasized) var(--colors-bg);
				scroll-margin-top: 2rem;
			}

			body {
				min-height: 100vh;
			}

			svg {
				flex-shrink: 0;
			}
		}

		@layer base {
			* {
				font-feature-settings: "palt";
			}
		}

		@media (prefers-reduced-motion: reduce) {
			* {
				animation: none !important;
				transition: none !important;
				will-change: auto !important;
				scroll-behavior: auto !important;
			}
		}
	}

	.body {
		display: grid;
		grid-template-columns: fit-content(100%) 1fr;

		.main {
			position: relative;
			border-left-width: 1px;
		}
	}
</style>
