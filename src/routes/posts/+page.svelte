<script lang="ts">
	import { resolve } from "$app/paths";
	import { formatDistanceToNow, formatISO9075 } from "date-fns";
	import { ja } from "date-fns/locale/ja";

	let { data } = $props();
</script>

<main class="container">
	{#each data.posts.contents as post (post.id)}
		<article>
			<div>
				{#if post.publishedAt}
					<p>
						<time
							datetime={post.publishedAt}
							title={formatISO9075(post.publishedAt)}
						>
							{formatDistanceToNow(post.publishedAt, {
								locale: ja,
								addSuffix: true,
							})}
						</time>
					</p>
				{/if}
				{#if post.subtitle !== undefined}
					<hgroup>
						{@render TitleLink()}
						<p>{post.subtitle}</p>
					</hgroup>
				{:else}
					{@render TitleLink()}
				{/if}

				{#snippet TitleLink()}
					<h2>
						<a href={resolve("/posts/[id]", { id: post.id })}>{post.title}</a>
					</h2>
				{/snippet}
			</div>
			{#if post.coverImage}
				{const img = post.coverImage}
				<img
					src="{img.url}?w=384&fm=webp"
					alt={img.alt}
					width={img.width}
					height={img.height}
				/>
			{/if}
		</article>
	{/each}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		row-rule: dotted;
		gap: 2rem;
	}

	article {
		display: flex;
		align-items: start;

		time {
			font-size: small;
			color: GrayText;
		}

		> div {
			flex: 1;
		}

		> img {
			width: 8rem;
			height: auto;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}
</style>
