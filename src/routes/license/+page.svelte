<script lang="ts">
	import { container, heading, icon, link, table } from "styled-system/recipes";
	import type { PageProps } from "./$types";
	import { css, cx } from "styled-system/css";
	import { grid, hstack, linkOverlay } from "styled-system/patterns";
	import { SquareArrowOutUpRight } from "@lucide/svelte";

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>ライセンス</title>
	<meta name="description" content="本当に、有り難う" />
</svelte:head>

<main
	class={cx(
		grid({ columns: { mdDown: 1, md: 2 }, gap: "4" }),
		container(),
		css({ maxW: "4xl", py: "4" }),
	)}
>
	{#each data.categories as category (`deps-category-${category.label}`)}
		<section class={css({ spaceY: "2" })}>
			<h2 class={heading()}>
				{category.label}
			</h2>
			<!-- striped機能してなくね？ -->
			<table
				class={cx(
					table({ variant: "outline", striped: true }).root,
					css({ rounded: "md" }),
				)}
			>
				<tbody class={table().body}>
					{#each category.deps as dep (`dep-${dep.name}`)}
						<tr class={cx(table().row, css({ _odd: { bgColor: "bg.panel" } }))}>
							<td
								class={cx(
									table().cell,
									css({
										pos: "relative",
										_hover: { bgColor: "bg.muted" },
										transition: "background",
									}),
								)}
							>
								<a
									class={cx(
										link(),
										hstack({ color: "orange.fg", justify: "space-between" }),
										linkOverlay(),
									)}
									href={`https://${dep.link.host}${dep.link.pathname}`}
									target="_blank"
									referrerpolicy="no-referrer"
								>
									{dep.name}
									<span
										class={cx(
											icon({ size: "sm" }),
											css({ color: "fg.subtle" }),
										)}
									>
										<SquareArrowOutUpRight size="current" />
									</span>
								</a>
							</td>
							<td class={table().cell}>{dep.licenseType}</td>
							<td
								class={cx(
									table().cell,
									css({
										textAlign: "end",
										fontFamily: "mono",
										whiteSpace: "nowrap",
									}),
								)}
								>{dep.installedVersion}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</section>
	{/each}
</main>
