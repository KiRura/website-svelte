<script lang="ts">
	import { resolve } from "$app/paths";
	import { css, cx } from "styled-system/css";
	import { card, separator } from "styled-system/recipes";
	import { center } from "styled-system/patterns";
	import KiRuraSVG from "$lib/assets/kirura/kirura.svg";

	const { data } = $props();

	const cardStyles = card({ size: "sm", variant: "bgelevated", hover: true });
</script>

<main class="fadein">
	{#each data.posts.contents as post (post)}
		<a href={resolve("/posts/[id]", { id: post.id })}>
			<article
				class={cx(cardStyles.root, css({ overflow: "hidden", h: "full" }))}
			>
				{#if post.coverImage}
					<enhanced:img
						src={`${post.coverImage.url}?w=600&fm=webp`}
						alt={post.coverImage.alt}
						fetchpriority="high"
						loading="lazy"
						class={css({
							w: "full",
							h: "40",
							objectFit: "cover",
						})}
					/>
				{:else}
					<div
						aria-hidden="true"
						class={center({ h: "40", filter: "saturate(0%)" })}
					>
						<!-- svelte-ignore a11y_missing_attribute -->
						<img src={KiRuraSVG} />
					</div>
				{/if}
				<span class={separator()}></span>
				<div class={cardStyles.body}>
					<hgroup>
						<h2 class={cardStyles.title}>{post.title}</h2>
						{#if post.subtitle}
							<p class={cardStyles.description}>{post.subtitle}</p>
						{/if}
					</hgroup>
				</div>
			</article>
		</a>
	{/each}
</main>

<style>
	main {
		display: grid;
		gap: 0.4rem;
		grid-template-columns: repeat(1, 1fr);
		max-width: 60rem;
		margin: 0 auto;

		@media (max-width: 719px) {
			margin-top: 1rem;
		}
		@media (min-width: 480px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (min-width: 720px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
