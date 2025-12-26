<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        title: string;
        children: Snippet;
    };

    const { title, children }: Props = $props();
</script>

<head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>

    {@render children()}
</head>
