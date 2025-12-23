<script lang="ts">
	let { data } = $props();
</script>

<h1>
	{data.title}
</h1>
{#if data.subtitle}
	<em>{data.subtitle}</em>
{/if}

{@html data.content}
