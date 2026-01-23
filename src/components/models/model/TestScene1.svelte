<script lang="ts">
	import { ACESFilmicToneMapping, LoopOnce } from 'three';
	import { T, Canvas } from '@threlte/core';
	import SceneCleaner from '../../SceneCleaner.svelte';
	import Model from '../../../models/model/TestScene1.svelte';

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

<div>
	<Canvas toneMapping={ACESFilmicToneMapping} shadows={false}>
		<SceneCleaner>
			<T.Color attach="background" args={['#4ED7F1']} />

			<Model bind:this={scene} />
		</SceneCleaner>
	</Canvas>
</div>

<style>
	div {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: -1;
	}
</style>
