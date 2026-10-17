<script lang="ts">
	import { formatDistanceToNow, formatISO9075 } from "date-fns";
	import { ja } from "date-fns/locale/ja";

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title}</title>
</svelte:head>

<article class="container">
	<p>
		{#if data.post.publishedAt}
			{@render time(data.post.publishedAt, "公開")}
		{/if}
		{#if data.post.publishedAt !== data.post.updatedAt}
			, {@render time(data.post.updatedAt, "更新")}
		{/if}
	</p>

	{#snippet time(date: string, prefix: string)}
		{prefix}:
		<time datetime={date} title={formatISO9075(date)}>
			{formatDistanceToNow(date, {
				locale: ja,
				addSuffix: true,
			})}
		</time>
	{/snippet}

	<div class="heading">
		{#if data.post.subtitle !== undefined}
			<hgroup>
				<h1>{data.post.title}</h1>
				<p>{data.post.subtitle}</p>
			</hgroup>
		{:else}
			<h1>{data.post.title}</h1>
		{/if}

		{#if data.post.coverImage}
			{const img = data.post.coverImage}
			<img
				src="{img.url}?fm=webp"
				alt={img.alt}
				width={img.width}
				height={img.height}
				fetchpriority="high"
			/>
		{/if}
	</div>

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.post.content}
</article>

<style>
	hgroup {
		h1 + p {
			font-style: italic;
			color: var(--colors-fg-sub);
		}
	}

	.heading {
		border-block-end-width: 1px;
		border-style: dashed;

		img {
			margin-block-end: 1rem;
		}
	}
</style>
