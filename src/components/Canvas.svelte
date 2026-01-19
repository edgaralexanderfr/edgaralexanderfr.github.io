<script lang="ts">
	import { T, Canvas } from '@threlte/core';
	import Model from './Model.svelte';
	import { ACESFilmicToneMapping, LoopOnce } from 'three';

	let scene = $state<Model>();
	const actions = $derived(scene?.actions);
	const action = $derived($actions?.['Edgar.Armature.001']);
	const cameraAction = $derived($actions?.['Camera.001']);
	const doorAction = $derived($actions?.['Door.001']);
	const lidAction = $derived($actions?.['Lid.001']);

	$effect(() => {
		if (action) {
			action.clampWhenFinished = true;
		}

		if (cameraAction) {
			cameraAction.clampWhenFinished = true;
		}

		if (doorAction) {
			doorAction.clampWhenFinished = true;
		}

		if (lidAction) {
			lidAction.clampWhenFinished = true;
		}

		action?.setLoop(LoopOnce, 1);
		cameraAction?.setLoop(LoopOnce, 1);
		doorAction?.setLoop(LoopOnce, 1);
		lidAction?.setLoop(LoopOnce, 1);

		action?.play();
		cameraAction?.play();
		doorAction?.play();
		lidAction?.play();
	});
</script>

<Canvas toneMapping={ACESFilmicToneMapping} shadows={false}>
	<T.Color attach="background" args={['#4ED7F1']} />

	<Model bind:this={scene} />
</Canvas>
