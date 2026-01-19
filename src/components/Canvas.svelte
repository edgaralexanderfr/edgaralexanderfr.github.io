<script lang="ts">
	import { T, Canvas } from '@threlte/core';
	import Model from './Model.svelte';
	import { ACESFilmicToneMapping, LoopOnce } from 'three';

	let scene = $state<Model>();
	const actions = $derived(scene?.actions);
	const action = $derived($actions?.['Edgar.Armature.001']);

	$effect(() => {
		if (action) {
			action.clampWhenFinished = true;
		}

		action?.setLoop(LoopOnce, 1);
		action?.play();
	});
</script>

<Canvas toneMapping={ACESFilmicToneMapping} shadows={false}>
	<T.Color attach="background" args={['#4ED7F1']} />

	<Model bind:this={scene} />
</Canvas>
