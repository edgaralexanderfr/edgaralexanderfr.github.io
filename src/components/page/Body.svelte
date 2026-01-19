<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<body style="height: 100%; margin: 0; width: 100%;">
	{@render children()}
</body>
