<script lang="ts">
	import { css, cx } from "styled-system/css";
	import {
		button,
		card,
		container,
		heading,
		icon,
		list,
		separator,
		timeline,
	} from "styled-system/recipes";
	import ZZZ from "../components/ZZZ.svelte";
	import { center, flex, grid, hstack } from "styled-system/patterns";
	import { dev } from "$app/environment";
	import Herta from "../components/herta.svelte";
	import type { PageProps } from "./$types";
	import { format } from "date-fns";
	import { TZDate } from "@date-fns/tz";
	import { resolve } from "$app/paths";
	import { LucideChevronRight, LucidePin } from "@lucide/svelte";
	import { links } from "../consts/links";

	const { data }: PageProps = $props();

	const timelineStyles = timeline();
	const cardStyles = card({ variant: "bgelevated", hover: true });
	const listStyles = list();
</script>

<header
	class={center({ h: { "2xlDown": "vh", "2xl": "50rem" }, maxH: "90vh" })}
>
	<div class="zzz">
		<ZZZ />
	</div>
	<div class={cx(container(), css({ w: "initial" }))}>
		<h1
			class={css({
				fontSize: ["5xl", "6xl", "7xl"],
				fontWeight: "bold",
				fontFamily: `"Google Sans Code", "Noto Sans JP", sans-serif`,
				filter: "drop-shadow(0px 4px 8px {colors.bg/80})",
			})}
		>
			Hello!,
			<br />
			<span class={css({ color: { base: "orange.500", _dark: "orange.300" } })}>
				きるら
			</span>,
			<br />
			<span class={css({ color: { base: "orange.500", _dark: "orange.300" } })}>
				(7)KiRura
			</span>,
		</h1>
	</div>
</header>
<main class={container()}>
	<section
		class={grid({
			gridTemplateColumns: { lgDown: "1fr", lg: "1fr 20rem" },
			gap: "10",
		})}
	>
		<section class={css({ spaceY: "4" })}>
			<div class={hstack()}>
				<h2 class={heading({ size: "4xl" })}>Recent Tweets</h2>
				<span class={cx(separator(), css({ flex: 1 }))}></span>
				<a class={button()} href={resolve("/posts")}>
					全ての呟き<LucideChevronRight class={icon()} />
				</a>
			</div>
			<div class={timelineStyles.root}>
				{#each data.recentPosts.contents as post (`posts-${post.id}`)}
					<div class={timelineStyles.item}>
						<div class={timelineStyles.connector}>
							<div class={timelineStyles.separator}></div>
							<div class={timelineStyles.indicator}></div>
						</div>
						<article
							class={cx(
								timelineStyles.content,
								grid({
									gridTemplateColumns: {
										mdDown: "1fr",
										md: "fit-content(100%) 1fr",
									},
									gap: { md: "4.5" },
								}),
							)}
						>
							{#if post.publishedAt}
								<time
									class={cx(
										timelineStyles.description,
										css({
											fontFamily: "mono",
											fontSize: "1rem",
											lineHeight: 1.4,
											h: "fit",
											w: "fit",
										}),
									)}
									datetime={post.publishedAt}
									title={new TZDate(
										post.publishedAt,
										"Asia/Tokyo",
									).toISOString()}
								>
									{format(
										new TZDate(post.publishedAt, "Asia/Tokyo"),
										"yyyy/MM/dd",
									)}
								</time>
							{/if}
							<a
								class={cardStyles.root}
								data-hasimage={Boolean(post.coverImage) || undefined}
								href={resolve(`/posts/[id]`, { id: post.id })}
							>
								<div class={flex()}>
									<div
										class={cx(
											cardStyles.body,
											css({
												flexDir: "row",
												justifyContent: "space-between",
											}),
										)}
									>
										<hgroup>
											<h1 class={cardStyles.title}>{post.title}</h1>
											{#if post.subtitle}
												<p class={cardStyles.description}>{post.subtitle}</p>
											{/if}
										</hgroup>
										{#if post.coverImage}
											<enhanced:img
												src={`${post.coverImage.url}?w=900&fm=webp`}
												alt={post.coverImage.alt}
												fetchpriority="high"
												loading="lazy"
												class={css({
													w: "40",
													h: "12",
													objectFit: "cover",
													rounded: "sm",
												})}
											/>
										{/if}
									</div>
									<div
										class={flex({
											p: "var(--card-padding) var(--card-padding) var(--card-padding) 0",
										})}
									>
										<LucideChevronRight
											class={cx(icon(), css({ color: "fg.muted" }))}
										/>
									</div>
								</div>
							</a>
						</article>
					</div>
				{/each}
			</div>
		</section>
		<section class={css({ spaceY: "4", lgDown: { order: -1 } })}>
			<h2 class={heading({ size: "4xl" })}>
				<LucidePin class={icon()} />
				Pinned
			</h2>
			<div>
				{#each data.pinnedPosts.posts as post (`pinned-${post.id}`)}
					<a href={resolve("/posts/[id]", { id: post.id })}>
						<article class={cx(cardStyles.root, css({ overflow: "hidden" }))}>
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
							{/if}
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
			</div>
		</section>
	</section>
	<section>
		{#each links as link (`link-${link.name}-${link.href}`)}
			<ul class={listStyles.root}>
				<li class={listStyles.item}>
					<h3><a href={link.href} target="_blank">{link.name}</a></h3>
				</li>
			</ul>
		{/each}
	</section>
</main>
<footer class={container()}>
	<img
		src={`https://count.getloli.com/@KiRura-website-svelte${dev ? "-dev" : ""}?darkmode=auto`}
		alt="moe counter"
		width="315px"
		height="100px"
		class={css({ mx: "auto" })}
	/>
	<Herta />
</footer>

<style>
	.zzz {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		clip-path: inset(0);
		user-select: none;
		z-index: var(--z-index-hide);

		display: flex;
		align-items: center;
		justify-content: center;

		@media (min-width: 720px) {
			height: 60rem;
		}
	}

	.zzz::after {
		position: absolute;
		top: 0;
		left: 0;
		content: "";
		width: 100%;
		height: 100vh;
		background: linear-gradient(transparent, var(--colors-bg));

		@media (min-width: 720px) {
			height: 60rem;
		}
	}
</style>
