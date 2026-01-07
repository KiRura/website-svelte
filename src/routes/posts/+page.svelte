<script lang="ts">
	import { css, cx } from "styled-system/css";
	import { card, container, separator, timeline } from "styled-system/recipes";

	const { data } = $props();
</script>

<svelte:head>
	<title>呟き</title>
</svelte:head>

<main class={cx(timeline().root, container(), css({ maxW: "2xl", py: "8" }))}>
	{#each data.contents as post}
		<div class={timeline().item}>
			<div class={timeline().connector}>
				<div class={timeline().separator}></div>
				<div class={timeline().indicator}></div>
			</div>
			<article class={timeline().content}>
				<time class={timeline().description} datetime={post.publishedAt}
					>{post.publishedAt}</time
				>
				<a
					class={cx(
						card({ size: "sm", variant: "elevated" }).root,
						css({
							_hover: { bgColor: "bg.muted" },
							transition: "background",
							"&[data-hasimage]": { roundedTop: "none" },
						}),
					)}
					data-hasimage={post.coverImage || undefined}
					href={`/posts/${post.id}`}
				>
					{#if post.coverImage}
						<enhanced:img
							src={`${post.coverImage.url}?w=900&fm=webp`}
							alt={post.coverImage.alt}
							fetchpriority="high"
							loading="lazy"
							class={css({
								w: "full",
								maxH: "40",
								h: `${post.coverImage.height}px`,
								objectFit: "cover",
							})}
						/>
						<span class={separator()}></span>
					{/if}
					<div class={card().body}>
						<hgroup>
							<h1 class={card().title}>{post.title}</h1>
							{#if post.subtitle}
								<p class={card().description}>{post.subtitle}</p>
							{/if}
						</hgroup>
					</div>
				</a>
			</article>
		</div>
	{/each}
</main>
