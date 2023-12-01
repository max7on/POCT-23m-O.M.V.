import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { MindARThree } from 'mindar-image-three';


document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "w1.mind",
			uiScanning: "yes",
			uiLoading: "yes",
			maxTrack: 2,
		      });
		const {renderer, scene, camera} = mindarThree;

		const anchor_go = mindarThree.addAnchor(0);
		const anchor_parody = mindarThree.addAnchor(1);

		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 5);
		scene.add(light);

		const loader = new GLTFLoader();

		loader.load("vintage_kettle.glb", (model1) => {
			anchor_go.group.add(model1.scene);
			model1.scene.scale.set(1, 1, 1);
			model1.scene.position.set(0, 0, 0);
		});

		loader.load("toilet_paper.glb", (model2) => {
			anchor_parody.group.add(model2.scene);
			model2.scene.scale.set(0.5, 0.5, 0.5);
		});


		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			  renderer.render(scene, camera);
		});
	}
	start();
});