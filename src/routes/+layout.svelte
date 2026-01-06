<script lang="ts">
	// @ts-expect-error
	// fuck
	import kiruraIcon from "$lib/assets/kirura/512p.png?w=128";

	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import {
		button,
		emptyState,
		progress,
		progressCircle,
		spinner,
		container,
		link,
		select,
	} from "styled-system/recipes";
	import type { LayoutProps } from "./$types";
	import { SvelteTheme, useTheme } from "svelte-themes";
	import { css, cx } from "styled-system/css";
	import { Icon, PenTool, Scale } from "@lucide/svelte";
	import { navigating } from "$app/state";
	import { hstack } from "styled-system/patterns";
	import { page as appPage } from "$app/state";
	import ColorModeButton from "../component/ColorModeButton.svelte";

	const { children }: LayoutProps = $props();

	const pages: { label: string; href: string; icon: typeof Icon }[] = [
		{
			label: "呟き",
			href: "/posts",
			icon: PenTool,
		},
		{
			label: "License",
			href: "/license",
			icon: Scale,
		},
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=M+PLUS+1+Code:wght@100..700&family=Noto+Sans+JP:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<SvelteTheme attribute="data-color-mode">
	<header
		class={css({
			borderBottomWidth: "1px",
			top: "0",
			pos: "sticky",
			zIndex: "docked",
			bgColor: "bg",
		})}
	>
		<div
			class={cx(
				container({ centerContent: true }),
				css({
					flexDir: "row",
					justifyContent: "space-between",
				}),
			)}
		>
			<nav class={hstack({ py: "2", gap: "8" })}>
				<a
					href="/"
					class={cx(link(), css({ fontWeight: "bold", fontSize: "xl" }))}
					aria-label="ホーム"
				>
					<!-- svelte-ignore a11y_missing_attribute -->
					<enhanced:img
						src={kiruraIcon}
						class={css({ boxSize: "8", maxW: "8", rounded: "full" })}
					/>
					<span class={css({ hideBelow: "sm" })}> KiRura </span>
				</a>
				<div class={hstack({ gap: "6" })}>
					{#each pages as page}
						<a
							class={cx(
								button({ variant: "plain" }),
								css({
									px: "0",
									color: "fg.muted",
									rounded: "none",
									borderWidth: "0",
									_selected: {
										color: "orange.fg",
										borderBottomColor: "orange.border",
										borderYWidth: "2px",
									},
									_hover: { color: "fg" },
									_loading: {
										color: "fg",
										animationName: "pulse",
										animationDuration: "1s",
										animationIterationCount: "infinite",
									},
									transitionProperty: "color, border",
								}),
							)}
							href={page.href}
							data-selected={appPage.route.id?.startsWith(page.href) ||
								undefined}
							data-loading={navigating.to?.route.id?.startsWith(page.href) ||
								undefined}
						>
							<page.icon />{page.label}
						</a>
					{/each}
				</div>
			</nav>
			<div class={hstack()}>
				<ColorModeButton />
			</div>
		</div>
	</header>
	{#if navigating.type !== null}
		<main class={cx(container(), emptyState().root)}>
			<div class={emptyState().content}>
				<div class={emptyState().indicator}>
					<span class={spinner()}></span>
				</div>
				<h2 class={cx(emptyState().description, css({ fontFamily: "mono" }))}>
					Loading...
				</h2>
			</div>
		</main>
	{:else}
		{@render children()}
	{/if}
</SvelteTheme>
