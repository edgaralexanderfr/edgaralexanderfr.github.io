<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<html lang="en" style="height: 100%; margin: 0; width: 100%;">
	{@render children()}
</html>
