<!--

For more information about freeing and cleaning up Three.js resources,
feel free to read the following links:

- https://threejs.org/manual/?q=dispo#en/how-to-dispose-of-objects
- https://discourse.threejs.org/t/when-to-dispose-how-to-completely-clean-up-a-three-js-scene/1549

-->

<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import { onDestroy } from 'svelte';
	import type { Material } from 'three';

	const { scene, renderer } = useThrelte();

	const dispose = (object: any) => {
		if (!object) {
			return;
		}

		if (object.geometry) {
			object.geometry.dispose();
		}

		if (object.material) {
			const materials = [].concat(object.material);

			materials.forEach((material: Material) => {
				Object.values(material).forEach((value: any) => {
					if (value && typeof value.dispose === 'function') {
						value.dispose();
					}
				});

				material.dispose();
			});
		}

		if (typeof object.dispose === 'function') {
			object.dispose();
		}
	};

	onDestroy(() => {
		scene?.traverse(dispose);
		scene?.clear();
		renderer?.info?.reset();
		renderer?.dispose();
		renderer?.forceContextLoss();
	});
</script>

<slot />
