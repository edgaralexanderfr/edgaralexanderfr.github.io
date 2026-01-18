<script>
	import { T, Canvas } from '@threlte/core';
	import Model from './Model.svelte';
</script>

<Canvas>
	<T.Color attach="background" args={['#4ED7F1']} />

	<Model />
</Canvas>
