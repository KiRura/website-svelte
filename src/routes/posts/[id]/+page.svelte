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
	import { afterNavigate } from "$app/navigation";
	import { Collapsible } from "@ark-ui/svelte";
	import { on } from "svelte/events";
	import { onMount } from "svelte";
	import LucideChevronDown from "@lucide/svelte/icons/chevron-down";

	const { data } = $props();

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
		on(window, "resize", updateOffsets);
	});
</script>

<article
	class={css({
		animationName: "slide-from-top, fade-in",
		animationDuration: "slow",
		spaceY: "8px",
	})}
>
	<div
		data-has-image={Boolean(data.post.coverImage) || undefined}
		class={css({
			pos: "relative",
			borderYWidth: "1px",
			overflow: "hidden",
			"&[data-has-image]": { borderWidth: "1px", rounded: "lg" },
		})}
	>
		{#if data.post.coverImage}
			<div
				aria-hidden="true"
				class={css({
					_after: {
						zIndex: -1,
						content: `""`,
						pos: "absolute",
						w: "full",
						h: "full",
						top: "0",
						left: "0",
						bg: "bg/70",
					},
				})}
			>
				<enhanced:img
					src={`${data.post.coverImage.url}?blur=192&saturation=1.5&fm=webp`}
					alt={data.post.coverImage.alt}
					fetchpriority="high"
					class={css({
						pos: "absolute",
						w: "full",
						h: "full",
						objectFit: "cover",
						zIndex: -1,
					})}
				/>
			</div>
		{/if}
		<hgroup
			data-has-image={Boolean(data.post.coverImage) || undefined}
			class={center({
				flexDir: "column",
				alignItems: "start",
				py: "8",
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
	</div>
	<div
		class={grid({
			gridTemplateColumns: {
				lgDown: "1fr",
				lg: "1fr 12rem",
				xl: "1fr 20rem",
			},
			gap: "6",
		})}
	>
		<aside class={css({ h: "fit", pos: "sticky", top: "16" })}>
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
						}),
					)}
				>
					<p>目次</p>
					<span class={cx(separator(), css({ flex: 1 }))}></span>
					<Collapsible.Indicator aria-hidden class={collapsibleStyle.indicator}>
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
							p: { base: "2", _closed: "0" },
							bgColor: "bg",
							transitionProperty: "padding",
							transitionDuration: "moderate",
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
		<div
			class={css({
				...prose,
				maxW: "prose",
				w: "full",
				mx: "auto",
				lg: { order: "-1" },
				lineHeight: "2.5em",
			})}
		>
			<!--eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.post.content}
		</div>
	</div>
</article>
