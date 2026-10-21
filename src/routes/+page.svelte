<script lang="ts">
	const links: {
		label: string;
		href: `${string}:${string}`;
		description?: string;
		main?: boolean;
	}[] = [
		{
			label: "@kirura:matrix.org",
			href: "https://matrix.to/#/@kirura:matrix.org",
			description: "何かあれば",
			main: true,
		},
		{
			label: "kirura@kirura.f5.si",
			href: "mailto:kirura@kirura.f5.si",
			description: "何かあれば",
			main: true,
		},
		{
			label: "7kirura (Discord)",
			href: "https://discord.com/users/606093171151208448",
			description: "大体ここにいる",
			main: true,
		},
		{
			label: "KiRura (Codeberg)",
			href: "https://codeberg.org/KiRura",
			description: "GitHubからの疎開",
		},
		{
			label: "KiRura (GitHub)",
			href: "https://github.com/KiRura",
			description:
				"[kirura.]f5.siドメインのメアドは自動でフラグ付けの対象になるらしい",
		},
		{
			label: "@KiRura@misskey.blue",
			href: "https://misskey.blue/@KiRura",
			description: "大体ここにもいる",
		},
		{
			label: "@7KiRura (Twitter)",
			href: "https://twitter.com/7KiRura",
			description: "大体ここにもいる",
		},
		{
			label: "@kirura.f5.si (Bluesky)",
			href: "https://bsky.app/profile/kirura.f5.si",
			description: "ROM専",
		},
		{
			label: "@7KiRura (YouTube)",
			href: "https://www.youtube.com/@7KiRura",
			description: "動画編集者の道を歩みたかった残骸",
		},
	] as const;
</script>

<svelte:head>
	<title>KiRura</title>
</svelte:head>

<div class="container">
	<header>
		<hgroup>
			<h1>Hello!, (7)KiRura,</h1>
			<p>しがないHTML/CSS/JS文句垂れ人間</p>
		</hgroup>
		<p>
			<a href="https://技術者倫理.com"
				><img
					src="https://img.shields.io/badge/%E6%8A%80%E8%A1%93%E8%80%85%E5%80%AB%E7%90%86-%E9%81%B5%E5%AE%88%E6%B8%88%E3%81%BF-0a0a0a?style=for-the-badge&labelColor=ffffff"
					alt="技術者倫理 遵守済み"
				/></a
			>
		</p>
	</header>
	<main>
		<section>
			<h2>リンク集</h2>
			<h3>主要連絡先</h3>
			<dl>
				{@render Links(links.filter((link) => link.main))}
			</dl>
			<h3>その他</h3>
			<dl>
				{@render Links(links.filter((link) => !link.main))}
			</dl>
		</section>
		<section>
			<h2>物置</h2>
			<dl>
				<dt>
					<a
						href="https://music.youtube.com/playlist?list=PLfBfS6MX0Qv0"
						target="_blank">プレイリスト</a
					>
				</dt>
				<dd>そこはかとなく、順番に意味がある</dd>
			</dl>
		</section>
		<p>
			<a
				class="source"
				href="https://codeberg.org/KiRura/website-svelte"
				target="_blank"
			>
				ソース (新しいタブで開きます)
			</a>
		</p>
	</main>
</div>

{#snippet Links(_links: typeof links)}
	{#each _links as link (link.href)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<dt><a href={link.href} target="_blank">{link.label}</a></dt>
		{#if link.description !== undefined}
			<dd>{link.description}</dd>
		{/if}
	{/each}
{/snippet}

<style>
	h1 {
		font-family: var(--fonts-mono);
	}

	.source {
		font-size: small;
	}
</style>
