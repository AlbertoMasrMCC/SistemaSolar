import React from "react";
import * as Babylon from 'babylonjs';
import * as Materials from 'babylonjs-materials';
import SceneComponent from "../babylon_components/SceneComponent";

const onSceneReady = (e) => {

    // Crear un escenario sencillo en Babylon
    const { canvas, scene, engine } = e;

    // Crear una cámara
    const camera = new Babylon.ArcRotateCamera("Camera", 0, 0, 0, new Babylon.Vector3(0, 0, 0), scene);

    // Crear una luz
    const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(0, 1, 0), scene);

    // Crear un cubo
    const box = Babylon.MeshBuilder.CreateBox("box", { size: 2 }, scene);

    // Crear un material
    const material = new Materials.SimpleMaterial("material", scene);

    // Crear una textura
    const texture = new Babylon.Texture("https://i.imgur.com/4Q7YQ2g.jpg", scene);

    // Asignar la textura al material
    material.diffuseTexture = texture;

    // Asignar el material al cubo
    box.material = material;

    // Posicionar la cámara
    camera.setPosition(new Babylon.Vector3(-5, 5, -5));

    // Apuntar la cámara al cubo
    camera.setTarget(Babylon.Vector3.Zero());

    // Activar la cámara
    camera.attachControl(canvas, true);

    // Activar la luz
    light.intensity = 0.7;

    // Activar el cubo
    box.position.y = 1;

    // Activar el motor
    engine.runRenderLoop(() => {
            
        if (scene) {

            scene.render();

        }

    });

}

function index() {

    return(

        <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas"/>

    )

}

export default index;