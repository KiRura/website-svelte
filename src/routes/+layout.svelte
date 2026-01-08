<script lang="ts">
	// import kiruraIcon from "$lib/assets/kirura/512p.png?w=128";
	import kiruraIcon from "$lib/assets/kirura/512p.png";

	import "../app.css";
	import favicon from "$lib/assets/kirura/rounded/favicon.ico";
	import icon from "$lib/assets/kirura/512p.png";
	import { button, container, link } from "styled-system/recipes";
	import type { LayoutProps } from "./$types";
	import { SvelteTheme } from "svelte-themes";
	import { css, cx } from "styled-system/css";
	import { Github, Icon, PenTool, Scale } from "@lucide/svelte";
	import { navigating } from "$app/state";
	import { hstack } from "styled-system/patterns";
	import { page as appPage } from "$app/state";
	import ColorModeButton from "../component/ColorModeButton.svelte";
	import { resolve } from "$app/paths";
	import type { Pathname } from "$app/types";

	const { children }: LayoutProps = $props();

	const pages: { label: string; href: Pathname; icon: typeof Icon }[] = [
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

	const headerCSS = css({
		bg: "bg",
		borderWidth: "1px",
		rounded: "md",
		shadow: "sm",
		p: "2",
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="shortcut icon" href={icon} />
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
	<title>きるら</title>
	<meta name="description" content="しがないSvelteサイト" />
	<meta name="og:type" content="website" />
	<meta name="og:image" content={icon} />
	<meta name="og:locale" content="ja_JP" />
	<meta name="theme-color" content="#FFBF7F" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<SvelteTheme attribute="data-color-mode">
	<header
		class={css({
			top: "0",
			pos: "sticky",
			zIndex: "docked",
			py: "2",
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
			<nav class={cx(hstack({ gap: "8", px: "3" }), headerCSS)}>
				<a
					href={resolve("/")}
					class={cx(link(), css({ fontWeight: "bold", fontSize: "xl" }))}
					aria-label="ホーム"
				>
					<enhanced:img
						aria-hidden="true"
						src={kiruraIcon}
						alt="きるらのアイコン Kの文字"
						class={css({ boxSize: "8", maxW: "8", rounded: "full" })}
					/>
					<span class={css({ hideBelow: "sm" })}> KiRura </span>
				</a>
				<div class={hstack({ gap: "6" })}>
					{#each pages as page (`page-${page.label}-${page.href}`)}
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
							href={resolve(page.href)}
							data-selected={appPage.route.id?.startsWith(page.href) ||
								undefined}
							data-loading={navigating.to?.route.id?.startsWith(page.href) ||
								undefined}
						>
							<page.icon aria-hidden />{page.label}
						</a>
					{/each}
				</div>
			</nav>
			<div class={cx(hstack(), headerCSS)}>
				<a
					class={cx(button({ variant: "ghost" }), css({ p: "0" }))}
					href="https://github.com/KiRura/website-svelte"
					target="_blank"
					referrerpolicy="no-referrer"
					aria-label="ソースコード"
				>
					<Github aria-hidden />
				</a>
				<ColorModeButton />
			</div>
		</div>
	</header>
	<!-- {#if navigating.type !== null}
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
	{:else} -->
	{@render children()}
	<!-- {/if} -->
</SvelteTheme>
