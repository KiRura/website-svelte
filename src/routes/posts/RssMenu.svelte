<script lang="ts">
	import { resolve } from "$app/paths";
	import { Popover, Portal } from "@ark-ui/svelte";
	import LucideChevronDown from "@lucide/svelte/icons/chevron-down";
	import LucideExternalLink from "@lucide/svelte/icons/external-link";
	import LucideRss from "@lucide/svelte/icons/rss";
	import { css, cx } from "styled-system/css";
	import { vstack } from "styled-system/patterns";
	import {
		button,
		heading,
		icon,
		link,
		popover,
		separator,
	} from "styled-system/recipes";

	const popoverStyles = popover();

	const types = [
		{
			label: "Atom 1.0",
			type: "atom",
			href: resolve("/posts/feed.[type]", { type: "atom.xml" }),
		},
		{
			label: "RSS 2.0",
			type: "xml",
			href: resolve("/posts/feed.[type]", { type: "xml" }),
		},
		{
			label: "JSON Feed 1.0",
			type: "json",
			href: resolve("/posts/feed.[type]", { type: "json" }),
		},
	];
</script>

<Popover.Root lazyMount unmountOnExit>
	<Popover.Trigger
		aria-label="RSS"
		class={cx(popoverStyles.trigger, button({ size: "sm" }))}
	>
		<LucideRss aria-hidden />
		<LucideChevronDown class={popoverStyles.indicator} />
	</Popover.Trigger>
	<Portal>
		<Popover.Positioner class={popoverStyles.positioner}>
			<Popover.Content class={popoverStyles.content}>
				<section class={popoverStyles.body}>
					<h2 class={heading()}>RSS</h2>
					<p>
						RSSとかいうのを購読すると新しく呟きが出てきた時に通知を受け取る事ができます。
					</p>
					<p>直近100件のみを配信しています。</p>
				</section>
				<span class={separator()}></span>
				<section class={popoverStyles.body}>
					<h2 class={heading()}>RSSの種類</h2>
					<p class={css({ mb: "4" })}>Atom 1.0 / RSS 2.0が一般的です。</p>
					<div class={vstack({ alignItems: "start" })}>
						{#each types as type (`rss-type-${type.type}`)}
							<a
								href={type.href}
								target="_blank"
								class={cx(link(), css({ justifyContent: "space-between" }))}
							>
								{type.label}
								<LucideExternalLink
									aria-hidden
									class={cx(icon({ size: "sm" }), css({ color: "fg.muted" }))}
								/>
							</a>
						{/each}
					</div>
				</section>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover.Root>
