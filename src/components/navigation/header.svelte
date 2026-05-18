<script lang="ts">
	import { navigating } from "$app/state";
	import { link, separator, spinner } from "styled-system/recipes";
	import { resolve } from "$app/paths";
	import kiruraIcon from "$lib/assets/kirura/512p.png?enhanced";
	import { page as appPage } from "$app/state";
	import { pages } from "../../consts/pages";
	import { fade } from "svelte/transition";
	import { afterNavigate, replaceState } from "$app/navigation";
	import { topId } from "$lib";

	let io = $state<IntersectionObserver | null>(null);
	let navElement = $state<HTMLElement | null>(null);

	function getHash(href: string): string | undefined {
		return href.split("#")[1];
	}

	afterNavigate(() => {
		if (io) io.disconnect();
		io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.intersectionRatio > 0) {
						const _clickedHash = navElement?.getAttribute("data-clicked-hash");

						if (!_clickedHash && _clickedHash === entry.target.id) {
							navElement?.removeAttribute("data-clicked-hash");
							continue;
						}
						if (`#${entry.target.id}` === appPage.url.hash) continue;

						if (entry.target.id === topId) {
							replaceState(resolve("/#"), {});
						} else {
							replaceState(resolve(`/#${entry.target.id}`), {});
						}
					}
				}
			},
			{
				threshold: 0.55,
			},
		);

		for (const page of pages) {
			const hash = getHash(page.href);
			if (!hash) continue;
			const element = document.getElementById(hash);
			if (!element) continue;
			io.observe(element);
		}

		const top = document.getElementById(topId);
		if (top) {
			io.observe(top);
		}
	});
</script>

<nav bind:this={navElement}>
	<div class="group pages">
		<a
			href={resolve("/")}
			class={[link({ variant: "plain" }), "home"]}
			aria-label="ホーム"
		>
			<enhanced:img
				aria-hidden="true"
				src={kiruraIcon}
				alt="きるらのアイコン Kの文字"
			/>
			<span class="hover">KiRura</span>
		</a>
		<span class={separator()}></span>
		<div class="pages_scroll">
			{#each pages as page (`page-${page.label}-${page.href}`)}
				{@const hash = getHash(page.href)}
				<a
					class={link({ variant: "plain" })}
					// eslint-disable-next-line svelte/no-navigation-without-resolve
					href={page.href}
					data-selected={appPage.route.id?.startsWith(page.href) ||
						(hash && appPage.url.hash === hash) ||
						undefined}
					onclick={(e) => {
						if (!hash || appPage.route.id !== "/") return;

						e.preventDefault();
						navElement?.setAttribute("data-clicked-hash", hash);
						replaceState(resolve(hash === topId ? "/" : `/#${hash}`), {});
						document
							.getElementById(hash)
							?.scrollIntoView({ behavior: "smooth", block: "start" });
					}}
				>
					<page.icon size="1.6rem" />
					<span class="hover">
						{page.label}
					</span>
				</a>
			{/each}
		</div>
	</div>
	<span class={separator()}></span>
	<!-- <div class="group theme_switcher">
		<ColorModeButton />
	</div> -->
	<div class="group">
		<div class="loading">
			{#if navigating.to}
				<div class={spinner()} in:fade={{ duration: 200, delay: 300 }}></div>
			{/if}
		</div>
	</div>
</nav>

<style>
	nav {
		display: flex;
		@media (max-width: 719px) {
			display: none;
		}
		position: sticky;
		top: 0;
		flex-direction: column;
		gap: 1rem;
		height: 100vh;
		padding: 1rem 0;
		width: 4rem;
		transition: width 300ms;

		.hover {
			animation: out 300ms forwards;
			white-space: nowrap;
			text-overflow: ellipsis;
			line-height: 1;
		}
		&:hover {
			width: fit-content;
			.hover {
				animation: in 300ms;
			}
		}
	}

	.pages {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 1;
	}

	.home {
		color: var(--colors-fg);
		font-weight: 700;
		font-size: 1.2rem;
		margin-left: auto;
		margin-right: auto;
		margin: 0 1rem;
		enhanced\:img {
			border-radius: 100vmax;
			max-width: 2rem;
			flex-shrink: 0;
		}
		span {
			white-space: nowrap;
			@media (max-width: 719px) {
				display: none;
			}
		}
	}

	.pages_scroll {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		overflow-x: hidden;

		a {
			color: var(--colors-fg);
			transition-property: color text-decoration;
			transition-duration: 300ms;
			padding: 1rem;

			&:first-child {
				margin-top: 0.2rem;
			}

			&[data-selected] {
				color: var(--colors-orange-fg);
				text-decoration: underline;
				background-color: var(--colors-bg-muted);
			}

			:global(svg) {
				padding: 0.1rem;
			}
		}
	}

	.theme_switcher {
		flex-shrink: 0;
	}

	@keyframes in {
		0% {
			transform: translateX(-1rem);
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.loading {
		height: 1rem;
		width: fit-content;
		margin: 0 auto;
	}

	@keyframes out {
		100% {
			display: none;
			opacity: 0;
			transform: translateX(-1rem);
		}
	}
</style>
