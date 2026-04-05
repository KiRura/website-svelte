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
	import { flex, hstack } from "styled-system/patterns";
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

<header>
	<div class="zzz">
		<ZZZ />
	</div>
	<div class={container()} style:width="initial">
		<h1>
			Hello!,
			<br />
			<span>きるら</span>,
			<br />
			<span>(7)KiRura</span>,
		</h1>
	</div>
</header>
<main class={container()} style:margin-bottom="1rem">
	<section class="posts_grid">
		<section>
			<div class={hstack()} style:margin-bottom="1rem">
				<h2 class={heading({ size: "4xl" })}>Recent Tweets</h2>
				<span class={separator()} style:flex="1"></span>
				<a class={button()} href={resolve("/posts")}>
					全ての呟き<LucideChevronRight class={icon()} />
				</a>
			</div>
			<div class={[timelineStyles.root, "all_posts"]}>
				{#each data.recentPosts.contents as post (`posts-${post.id}`)}
					<div class={timelineStyles.item}>
						<div class={timelineStyles.connector}>
							<div class={timelineStyles.separator}></div>
							<div class={timelineStyles.indicator}></div>
						</div>
						<article class={timelineStyles.content}>
							{#if post.publishedAt}
								<time
									class={timelineStyles.description}
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
								<div style:display="flex">
									<div
										class={cardStyles.body}
										style:flex-direction="row"
										style:justify-content="space-between"
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
		<section class="pinned">
			<h2 class={heading({ size: "4xl" })} style:margin-bottom="1rem">
				<LucidePin class={icon()} />
				Pinned
			</h2>
			<div>
				{#each data.pinnedPosts.posts as post (`pinned-${post.id}`)}
					<a href={resolve("/posts/[id]", { id: post.id })}>
						<article class={cardStyles.root} style:overflow="hidden">
							{#if post.coverImage}
								<enhanced:img
									src={`${post.coverImage.url}?w=600&fm=webp`}
									alt={post.coverImage.alt}
									fetchpriority="high"
									loading="lazy"
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
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
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
	/>
	<Herta />
</footer>

<style>
	header {
		--header-height: 55rem;

		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(100vh - var(--sizes-navbar) - 4rem);

		@media (min-width: 720px) {
			height: calc(var(--header-height) - var(--sizes-navbar));
		}

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
				height: var(--header-height);
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
				height: var(--header-height);
			}
		}

		h1 {
			font-size: 2rem;
			font-weight: 700;
			font-family: "Google Sans Code", "Noto Sans JP", sans-serif;
			filter: drop-shadow(0px 4px 8px rgb(from var(--colors-bg) r g b / 0.8));

			@media (min-width: 360px) {
				font-size: 3rem;
			}

			@media (min-width: 480px) {
				font-size: 4rem;
			}

			@media (min-width: 720px) {
				font-size: 5rem;
			}

			span {
				color: var(--colors-orange-500);

				:global([data-color-mode="dark"] &) {
					color: var(--colors-orange-300);
				}
			}
		}
	}

	.posts_grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;

		@media (min-width: 900px) {
			grid-template-columns: 1fr 20rem;
		}

		.all_posts article {
			display: grid;
			grid-template-columns: 1fr;
			padding-bottom: 0.8rem;

			@media (min-width: 1080px) {
				grid-template-columns: fit-content(100%) 1fr;
				gap: 1rem;
			}

			time {
				font-family: var(--fonts-mono);
				font-size: 1rem;
				line-height: 1.4;
				height: fit-content;
				width: fit-content;
			}

			enhanced\:img {
				width: 10rem;
				max-width: 25%;
				height: 3rem;
				object-fit: cover;
				border-radius: 0.2rem;
				margin-left: 1rem;
			}
		}

		.pinned {
			@media (max-width: 899px) {
				order: -1;
			}

			article {
				enhanced\:img {
					width: 100%;
					height: 10rem;
					object-fit: cover;
				}
			}
		}
	}

	footer {
		img {
			margin: 0 auto 1rem auto;
		}
	}
</style>
