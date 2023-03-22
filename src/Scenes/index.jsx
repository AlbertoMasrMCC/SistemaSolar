import React from "react";
import * as Babylon from 'babylonjs';
import * as Materials from 'babylonjs-materials';
import * as GUI from 'babylonjs-gui';

import SceneComponent from "../Components/SceneComponent";
import * as GizmoInterface from "../Modules/GizmoInterface";

import * as Planetas from "./SistemaSolar"

import milky_way from "../Resources/2k_stars_milky_way.jpg";

const onSceneReady = (e) => {

    const { canvas, scene, engine } = e

    /***** CONFIGURAMOS LA ESCENA ******/

    scene.clearColor = new Babylon.Color3(0, 0, 0)

    GizmoInterface.GizmoInterface(scene)

    /***********************************/

    // CREAMOS LA CÁMARA
    const camera = new Babylon.FreeCamera("camera", new Babylon.Vector3(0, 90, -150), scene)

    camera.setTarget(Babylon.Vector3.Zero())

    camera.attachControl(canvas, true)

    // CREAMOS LA LUZ
    const light = new Babylon.PointLight("light", new Babylon.Vector3(0, -10, 0), scene)
    light.intensity = 5

    // CREAMOS EL SUELO
    const ground = Babylon.MeshBuilder.CreateGround("ground", { width: 200, height: 200 }, scene)
    const groundMaterial = new Babylon.StandardMaterial("groundMaterial", scene)
    groundMaterial.diffuseTexture = new Babylon.Texture(milky_way, scene)
    ground.material = groundMaterial

    // CREAMOS EL CIELO
    const skyBoxMaterial = new Materials.SkyMaterial("skyBoxMaterial", scene)
    skyBoxMaterial.backFaceCulling = false
    const skybox = Babylon.Mesh.CreateBox("skyBox", 1000.0, scene)
    skybox.material = skyBoxMaterial

    // CREAMOS LOS PLANETAS
    var planetas = new Planetas(scene)

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