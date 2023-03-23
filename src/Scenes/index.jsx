import React from "react";
import * as Babylon from 'babylonjs';
import * as Materials from 'babylonjs-materials';
import * as GUI from 'babylonjs-gui';

import SceneComponent from "../Components/SceneComponent";
import * as GizmoInterface from "../Modules/GizmoInterface";
import * as XR_Module from "../Modules/XR_Module";

import * as SistemaSolar from "./SistemaSolar"

import milky_way from "../Resources/2k_stars_milky_way.jpg";

const onSceneReady = (e) => {

    const { canvas, scene, engine } = e

    // DAMOS UN COLOR OSCURO A LA ESCENA
    scene.clearColor = new Babylon.Color3(0, 0, 0)

    // CARGAMOS EL MÓDULO GIZMO
    GizmoInterface.GizmoInterface(scene)

    // CREAMOS LA CÁMARA
    const camera = new Babylon.FreeCamera("camera", new Babylon.Vector3(0, 9, -15), scene)
    camera.setTarget(Babylon.Vector3.Zero())
    camera.attachControl(canvas, true)

    // CREAMOS LA LUZ
    const light = new Babylon.PointLight("light", new Babylon.Vector3(0, -10, 0), scene)
    light.intensity = 5

    // CREAMOS EL SUELO
    const ground = Babylon.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene)
    const groundMaterial = new Babylon.StandardMaterial("groundMaterial", scene)
    groundMaterial.diffuseTexture = new Babylon.Texture(milky_way, scene)
    ground.material = groundMaterial

    // CREAMOS EL CIELO
    const skyBoxMaterial = new Materials.SkyMaterial("skyBoxMaterial", scene)
    skyBoxMaterial.backFaceCulling = false
    const skybox = Babylon.Mesh.CreateBox("skyBox", 100.0, scene)
    skybox.material = skyBoxMaterial

    // CREANDO EL SISTEMA SOLAR
    var planetas = SistemaSolar.crearPlanetas(scene)
    var orbitas = SistemaSolar.crearOrbitas(scene)
    var circulos = SistemaSolar.crearCirculos(scene, orbitas)
    SistemaSolar.asociarPlanetasOrbitas(planetas, orbitas, circulos)
    var [ sol, mercurio, venus, tierra, luna, marte, jupiter, saturno, saturnoAnillos, urano, neptuno ] = planetas
    var [ mercurioOrbita, venusOrbita, tierraOrbita, marteOrbita, jupiterOrbita, saturnoOrbita, uranoOrbita, neptunoOrbita ] = orbitas
    var [ mercurioCirculo, venusCirculo, tierraCirculo, marteCirculo, jupiterCirculo, saturnoCirculo, uranoCirculo, neptunoCirculo ] = circulos

    // CARGAMOS EL MÓDULO XR
    const XR = XR_Module.XR_Experience(ground, skybox, scene);
    
    // DAMOS COMPORTAMIENTO
    var mercurioMovimiento = 0
    var venusMovimiento = 0
    var tierraMovimiento = 0
    var marteMovimiento = 0
    var jupiterMovimiento = 0
    var saturnoMovimiento = 0
    var uranoMovimiento = 0
    var neptunoMovimiento = 0

    scene.onBeforeRenderObservable.add(() => {

        sol.rotation.y += 0.0037037
        mercurio.rotation.y += 0.00169492
        venus.rotation.y += 0.00041152
        tierra.rotation.y += 0.1
        marte.rotation.y += 0.09600614
        jupiter.rotation.y += 0.24038462
        saturno.rotation.y += 0.21819769
        urano.rotation.y += 0.014118311
        neptuno.rotation.y += 0.16

        mercurio.position.x = mercurioOrbita[mercurioMovimiento].x
        mercurio.position.z = mercurioOrbita[mercurioMovimiento].z

        venus.position.x = venusOrbita[venusMovimiento].x
        venus.position.z = venusOrbita[venusMovimiento].z

        tierra.position.x = tierraOrbita[tierraMovimiento].x
        tierra.position.z = tierraOrbita[tierraMovimiento].z

        luna.position.x = tierra.absolutePosition.x
        luna.position.z = tierra.absolutePosition.z

        marte.position.x = marteOrbita[marteMovimiento].x
        marte.position.z = marteOrbita[marteMovimiento].z

        jupiter.position.x = jupiterOrbita[jupiterMovimiento].x
        jupiter.position.z = jupiterOrbita[jupiterMovimiento].z

        saturno.position.x = saturnoOrbita[saturnoMovimiento].x
        saturno.position.z = saturnoOrbita[saturnoMovimiento].z

        saturnoAnillos.position.x = saturnoOrbita[saturnoMovimiento].x
        saturnoAnillos.position.z = saturnoOrbita[saturnoMovimiento].z

        urano.position.x = uranoOrbita[uranoMovimiento].x
        urano.position.z = uranoOrbita[uranoMovimiento].z

        neptuno.position.x = neptunoOrbita[neptunoMovimiento].x
        neptuno.position.z = neptunoOrbita[neptunoMovimiento].z

        mercurioMovimiento = (mercurioMovimiento + 1) % (mercurioOrbita.length - 1)
        venusMovimiento = (venusMovimiento + 1) % (venusOrbita.length - 1)
        tierraMovimiento = (tierraMovimiento + 1) % (tierraOrbita.length - 1)
        marteMovimiento = (marteMovimiento + 1) % (marteOrbita.length - 1)
        jupiterMovimiento = (jupiterMovimiento + 1) % (jupiterOrbita.length - 1)
        saturnoMovimiento = (saturnoMovimiento + 1) % (saturnoOrbita.length - 1)
        uranoMovimiento = (uranoMovimiento + 1) % (uranoOrbita.length - 1)
        neptunoMovimiento = (neptunoMovimiento + 1) % (neptunoOrbita.length - 1)

    })

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