<script lang="ts">
	import { navigating } from "$app/state";
	import { Github } from "@lucide/svelte";
	import { css, cx } from "styled-system/css";
	import { hstack } from "styled-system/patterns";
	import { button, container, link } from "styled-system/recipes";
	import ColorModeButton from "../ColorModeButton.svelte";
	import { resolve } from "$app/paths";
	import kiruraIcon from "$lib/assets/kirura/512p.png";
	import { page as appPage } from "$app/state";
	import { pages } from "./pages";

	const headerCSS = css({
		bg: "bg",
		borderWidth: "1px",
		rounded: "md",
		shadow: "sm",
		p: "2",
		pointerEvents: "all",
		touchAction: "auto",
	});
</script>

<header
	class={css({
		top: "0",
		pos: "sticky",
		zIndex: "docked",
		py: "2",
		pointerEvents: "none",
		touchAction: "none",
	})}
>
	<div
		class={cx(
			container({ centerContent: true }),
			css({
				flexDir: "row",
				justifyContent: "space-between",
				maxW: "vw",
				gap: "2",
			}),
		)}
	>
		<nav
			class={cx(hstack({ gap: "4", px: "3", overflow: "hidden" }), headerCSS)}
		>
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
				<span class={css({ hideBelow: "md" })}>KiRura</span>
			</a>
			<div class={hstack({ gap: "6", overflow: "auto" })}>
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
						data-selected={appPage.route.id?.startsWith(page.href) || undefined}
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
