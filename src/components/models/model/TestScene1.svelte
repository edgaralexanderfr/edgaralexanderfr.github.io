<script lang="ts">
	import { T, Canvas } from '@threlte/core';
	import Model from '../../../models/model/TestScene1.svelte';
	import { ACESFilmicToneMapping, LoopOnce } from 'three';

	let scene = $state<Model>();

	const actions = $derived(scene?.actions);
	const walkAction = $derived($actions?.['Edgar.Armature']);
	const cameraAction = $derived($actions?.['Camera']);
	const doorAction = $derived($actions?.['Door']);

	$effect(() => {
		if (walkAction) {
			walkAction.clampWhenFinished = true;
		}

		if (cameraAction) {
			cameraAction.clampWhenFinished = true;
		}

		if (doorAction) {
			doorAction.clampWhenFinished = true;
		}

		walkAction?.setLoop(LoopOnce, 1);
		cameraAction?.setLoop(LoopOnce, 1);
		doorAction?.setLoop(LoopOnce, 1);

		walkAction?.play();
		cameraAction?.play();
		doorAction?.play();
	});
</script>

<Canvas toneMapping={ACESFilmicToneMapping} shadows={false}>
	<T.Color attach="background" args={['#4ED7F1']} />

	<Model bind:this={scene} />
</Canvas>
