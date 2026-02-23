<script lang="ts">
	import { navigating } from "$app/state";

	import { css, cx } from "styled-system/css";
	import { flex, hstack } from "styled-system/patterns";
	import { button, container, link } from "styled-system/recipes";
	import ColorModeButton from "../ColorModeButton.svelte";
	import { resolve } from "$app/paths";
	import kiruraIcon from "$lib/assets/kirura/512p.png";
	import { page as appPage } from "$app/state";
	import { pages } from "../../consts/pages";

	const headerCSS = css.raw({
		pointerEvents: "all",
		touchAction: "auto",
	});
</script>

<nav
	class={cx(
		container({ centerContent: true }),
		css({
			top: "0",
			pos: "sticky",
			zIndex: "docked",
			py: "2",
			pointerEvents: "none",
			touchAction: "none",
			flexDir: "row",
			justifyContent: "space-between",
			maxW: "vw",
			gap: "2",
			filter: "drop-shadow(0 0 0.2rem {colors.blackAlpha.500})",
			h: "navbar",
		}),
	)}
>
	<div
		class={hstack({
			...headerCSS,
			overflow: "hidden ",
		})}
	>
		<a
			href={resolve("/")}
			class={cx(
				link({ variant: "plain" }),
				css({ color: "fg", fontWeight: "bold", fontSize: "xl" }),
			)}
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
		<div
			class={flex({
				overflowX: "auto",
			})}
		>
			{#each pages as page (`page-${page.label}-${page.href}`)}
				<a
					class={cx(
						button({ variant: "bgoutline" }),
						css({
							color: "fg.muted",
							rounded: "0",
							borderLeftWidth: "0",
							_selected: {
								color: "orange.fg",
								borderBottomColor: "orange.border",
							},
							_hover: { color: "fg" },
							_loading: {
								color: "fg",
								animationName: "pulse",
								animationDuration: "1s",
								animationIterationCount: "infinite",
							},
							transitionProperty: "color, border, background",
							_first: {
								roundedLeft: "sm",
								borderLeftWidth: "1px",
							},
							_last: {
								roundedRight: "sm",
							},
						}),
					)}
					href={resolve(page.href)}
					data-selected={appPage.route.id?.startsWith(page.href) || undefined}
					data-loading={navigating.to?.route.id?.startsWith(page.href) ||
						undefined}
				>
					<page.icon aria-hidden />
					{page.label}
				</a>
			{/each}
		</div>
	</div>
	<div class={css(headerCSS)}>
		<ColorModeButton />
	</div>
</nav>
