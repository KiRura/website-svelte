<script lang="ts">
	import {
		button,
		collapsible,
		heading,
		separator,
	} from "styled-system/recipes";
	import { css, cx } from "styled-system/css";
	import { center, grid, hstack } from "styled-system/patterns";
	import prose from "./prose";
	import { scrollY } from "svelte/reactivity/window";
	import { afterNavigate, beforeNavigate } from "$app/navigation";
	import { Collapsible } from "@ark-ui/svelte";
	import { on } from "svelte/events";
	import { onMount } from "svelte";
	import { LucideChevronDown } from "@lucide/svelte";
	import { fly } from "svelte/transition";

	const { data } = $props();

	let flyY = $state("1rem");

	const collapsibleStyle = collapsible();
	let headingOffsets = $state<{ id: string; offsetTop: number }[] | null>(null);
	function updateOffsets() {
		headingOffsets = data.post.headings.map((heading) => {
			const element = document.getElementById(heading.id);
			return {
				id: heading.id,
				offsetTop: (element?.offsetTop || 0) - window.innerHeight / 7,
			};
		});
	}
	afterNavigate(updateOffsets);
	onMount(() => {
		const resizeEvent = on(window, "resize", updateOffsets);
		return resizeEvent;
	});

	beforeNavigate((navigating) => {
		const from = data.posts.contents.findIndex(
			(post) => post.id === navigating.from?.params?.id,
		);
		const to = data.posts.contents.findIndex(
			(post) => post.id === navigating.to?.params?.id,
		);

		if (from > to) {
			flyY = "-1rem";
		} else {
			flyY = "1rem";
		}
	});
</script>

{#key data.post.id}
	<article in:fly|global={{ y: flyY, opacity: 0, duration: 200 }}>
		<header data-has-image={Boolean(data.post.coverImage) || undefined}>
			{#if data.post.coverImage}
				<div aria-hidden="true" class="coverimage">
					<enhanced:img
						src={`${data.post.coverImage.url}?blur=192&saturation=1.5&fm=webp`}
						alt={data.post.coverImage.alt}
						fetchpriority="high"
					/>
				</div>
			{/if}
			<hgroup
				data-has-image={Boolean(data.post.coverImage) || undefined}
				class={center({
					flexDir: "column",
					alignItems: "start",
					pb: "8",
					gap: "2",
					"&[data-has-image]": {
						p: "8",
					},
				})}
			>
				<h1 class={heading({ size: ["4xl", "5xl", "6xl", "7xl"] })}>
					{data.post.title}
				</h1>
				{#if data.post.subtitle}
					<p class={css({ fontStyle: "italic" })}>
						{data.post.subtitle}
					</p>
				{/if}
			</hgroup>
		</header>
		<main>
			<aside class={css({ h: "fit", pos: "sticky", top: "navbar" })}>
				<Collapsible.Root
					class={cx(
						collapsibleStyle.root,
						css({
							maxW: "prose",
							w: "full",
							maxH: "calc({sizes.vh} - {sizes.20} - {sizes.8})",
							mx: "auto",
							borderWidth: "1px",
							rounded: "lg",
							overflowY: "auto",
						}),
					)}
					defaultOpen={false}
					onOpenChange={updateOffsets}
				>
					<Collapsible.Trigger
						class={cx(
							collapsibleStyle.trigger,
							hstack({
								color: "fg.muted",
								w: "full",
								pos: "sticky",
								top: "0",
								zIndex: "docked",
								bgColor: { base: "bg", _hover: "bg.muted" },
								py: "2",
								px: "3",
								_open: {
									borderBottomWidth: "1px",
								},
								transition: "background",
							}),
						)}
					>
						<p>目次</p>
						<span class={cx(separator(), css({ flex: 1 }))}></span>
						<Collapsible.Indicator
							aria-hidden
							class={collapsibleStyle.indicator}
						>
							<LucideChevronDown />
						</Collapsible.Indicator>
					</Collapsible.Trigger>
					<Collapsible.Content
						class={cx(
							collapsibleStyle.content,
							css({
								display: "flex",
								flexDir: "column",
								alignItems: "end",
								gap: "2",
								p: "2",
								bgColor: "bg",
								transitionProperty: "padding",
								transitionDuration: "moderate",
								_closed: {
									py: "0",
								},
							}),
						)}
					>
						<!-- 複数の見出しを一言一句同じにするとそれらのidが同じになるの本当に何？ -->
						<!-- eslint-disable-next-line svelte/require-each-key -->
						{#each data.post.headings as heading}
							{@const offsetTop = headingOffsets
								? headingOffsets.find(
										(headingOffset) => headingOffset.id === heading.id,
									)?.offsetTop || 0
								: null}
							<a
								data-h3={heading.level === "H3" || undefined}
								data-selected={(offsetTop &&
									offsetTop < (scrollY.current || 0)) ||
									undefined}
								href={`#${heading.id}`}
								class={cx(
									button({ variant: "outline" }),
									css({
										w: "full",
										bgColor: { base: "bg.panel", _hover: "bg.muted" },
										justifyContent: "start",
										"&[data-h3]": {
											w: "calc({sizes.full} - {sizes.4})",
										},
										_selected: {
											color: "orange.fg",
										},
									}),
								)}
							>
								<span
									class={css({
										overflow: "hidden",
										textOverflow: "ellipsis",
									})}>{heading.text}</span
								></a
							>
						{/each}
					</Collapsible.Content>
				</Collapsible.Root>
			</aside>
			<div class={[css(prose), "content"]}>
				<!--eslint-disable-next-line svelte/no-at-html-tags -->
				{@html data.post.content}
			</div>
		</main>
	</article>
{/key}

<style>
	article > * {
		margin-bottom: 1rem;

		&:nth-last-child(1) {
			margin-bottom: 0;
		}
	}

	header {
		position: relative;
		border-bottom-width: 1px;
		overflow: hidden;

		&[data-has-image] {
			border-width: 1px;
			border-radius: 0.4rem;
		}

		.coverimage {
			&::after {
				z-index: -1;
				content: "";
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background: rgb(from var(--colors-bg) r g b / 0.7);
			}

			enhanced\:img {
				position: absolute;
				width: 100%;
				height: 100%;
				object-fit: cover;
				z-index: -1;
			}
		}
	}

	main {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;

		@media (min-width: 720px) {
			grid-template-columns: 1fr 12rem;
		}

		@media (min-width: 1080px) {
			grid-template-columns: 1fr 20rem;
		}

		.content {
			max-width: 35rem;
			width: 100%;
			margin: 0 auto;
			line-height: 2.5rem;

			@media (min-width: 720px) {
				order: -1;
			}
		}
	}
</style>
