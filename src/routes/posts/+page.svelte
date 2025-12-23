<script lang="ts">
	let { data } = $props();
</script>

<div>
	{#each data.contents as post}
		<a href={`/posts/${post.id}`}>
			<article>
				<h2>{post.title}</h2>
				{#if post.subtitle}
					<h3>{post.subtitle}</h3>
				{/if}
			</article>
		</a>
	{/each}
</div>
