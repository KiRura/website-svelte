<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/kirura/rounded/favicon.ico";
	import type { LayoutProps } from "./$types";
	import { SvelteTheme } from "svelte-themes";
	import { page as appPage } from "$app/state";
	import { deepMerge, MetaTags } from "svelte-meta-tags";
	import Header from "../component/navigation/header.svelte";

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
	<Header />
	{@render children()}
</SvelteTheme>
