<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();

	const pages: { label: string; href: string }[] = [
		{
			label: "KiRura",
			href: "/",
		},
		{
			label: "呟き",
			href: "/posts",
		},
		{
			label: "License",
			href: "/license",
		},
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	{#each pages as page}
		<a href={page.href}>{page.label}</a>
	{/each}
</nav>
{@render children()}
