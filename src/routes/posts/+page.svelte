<script lang="ts">
	import { resolve } from "$app/paths";
	import { TZDate } from "@date-fns/tz";
	import { format } from "date-fns";
	import { css, cx } from "styled-system/css";
	import {
		card as _card,
		container,
		separator,
		timeline as _timeline,
	} from "styled-system/recipes";

	const { data } = $props();

	const timeline = _timeline();
	const card = _card({ size: "sm", variant: "elevated" });
</script>

<div class={cx(timeline.root, container(), css({ maxW: "3xl", py: "8" }))}>
	{#each data.contents as post (`posts-${post.id}`)}
		<div class={timeline.item}>
			<div class={timeline.connector}>
				<div class={timeline.separator}></div>
				<div class={timeline.indicator}></div>
			</div>
			<article class={timeline.content}>
				{#if post.publishedAt}
					<time class={timeline.description} datetime={post.publishedAt}>
						{format(
							new TZDate(post.publishedAt, "Asia/Tokyo"),
							"yyyy年M月d日 h時m分",
						)}
					</time>
				{/if}
				<a
					class={cx(
						card.root,
						css({
							_hover: { bgColor: "bg.muted" },
							transition: "background",
							"&[data-hasimage]": { roundedTop: "none" },
						}),
					)}
					data-hasimage={Boolean(post.coverImage) || undefined}
					href={resolve(`/posts/[id]`, { id: post.id })}
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
					<div class={card.body}>
						<hgroup>
							<h1 class={card.title}>{post.title}</h1>
							{#if post.subtitle}
								<p class={card.description}>{post.subtitle}</p>
							{/if}
						</hgroup>
					</div>
				</a>
			</article>
		</div>
	{/each}
</div>
