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
