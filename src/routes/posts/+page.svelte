<script lang="ts">
	import { resolve } from "$app/paths";
	import { formatDistanceToNow, formatISO9075 } from "date-fns";
	import { ja } from "date-fns/locale/ja";
	import { TYPES } from "./feed.[type]/types";

	let { data } = $props();

	const types = new Map<TYPES, string>([
		[TYPES.Atom, "Atom 1.0"],
		[TYPES.Xml, "RSS 2.0"],
		[TYPES.Json, "JSON Feed 1.0"],
	]);
</script>

<main class="container">
	<aside>
		<h2>RSS</h2>
		<ul>
			{#each types as feedType (feedType)}
				<li>
					<a
						href={resolve("/posts/feed.[type]", { type: feedType[0] })}
						target="_blank"
					>
						{feedType[1]}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
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
					loading="lazy"
				/>
			{/if}
		</article>
	{/each}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		row-rule-width: 1px;
		row-rule-style: dashed;
		gap: 2rem;
	}

	article {
		display: flex;
		align-items: start;

		time {
			font-size: small;
			color: var(--colors-fg-sub);
		}

		> div {
			flex: 1;
		}

		> img {
			width: min(8rem, 25%);
			height: auto;
			aspect-ratio: 1 / 1;
			object-fit: cover;
		}
	}
</style>
