<script lang="ts">
	const links: {
		label: string;
		href: string;
		description?: string;
		main?: boolean;
	}[] = [
		{
			label: "@kirura:matrix.mq1.dev",
			href: "https://matrix.to/#/@kirura:matrix.mq1.dev",
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
			description: "[kirura.]f5.siドメインのメアドは自動でフラグ付けの対象になるらしい",
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
	</header>
	<main>
		<section>
			<hgroup>
				<h2>リンク集</h2>
				<p>新しいタブで開きます</p>
			</hgroup>
			<h3>主要連絡先</h3>
			<ul>
				{@render Links(links.filter((link) => link.main))}
			</ul>
			<h3>その他</h3>
			<ul>
				{@render Links(links.filter((link) => !link.main))}
			</ul>
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
		<li><a href={link.href} target="_blank">{link.label}</a></li>
		{#if link.description !== undefined}
			<ul>
				<li>{link.description}</li>
			</ul>
		{/if}
	{/each}
{/snippet}

<style>
	h1 {
		font-family: monospace;
	}

	.source {
		font-size: small;
	}
</style>
