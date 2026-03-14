<script lang="ts">
	import { resolve } from "$app/paths";
	import { css, cx } from "styled-system/css";
	import { card, separator } from "styled-system/recipes";
	import { center, grid } from "styled-system/patterns";
	import KiRuraSVG from "$lib/assets/kirura/kirura.svg";

	const { data } = $props();

	const cardStyles = card({ size: "sm", variant: "bgelevated", hover: true });
</script>

<section
	class={grid({
		columns: [1, 1, 1, 2, 3, 3],
		animationName: "fade-in",
		animationDuration: "slow",
		mdDown: {
			mt: "4",
		},
		maxW: "6xl",
		mx: "auto",
	})}
>
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
</section>
