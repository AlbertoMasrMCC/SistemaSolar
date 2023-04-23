import React from "react";
import * as Babylon from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import * as Materials from 'babylonjs-materials';

import SceneComponent from "../Components/SceneComponent";
import * as XR_Module from "../Modules/XR_Module";

import milky_way from "../Resources/2k_stars_milky_way.jpg";

import * as EscenaPlanetas from "./EscenaPlanetas";
import * as SistemaSolar from "./SistemaSolar"

// La primera posición corresponde al sol, la segunda a mercurio, la tercera a venus, la cuarta a la tierra, la quinta a marte, la sexta a jupiter, la séptima a saturno, la octava a urano y la novena a neptuno
const NIVELES_PASADOS = [false, false, false, false, false, false, false, false, false]

export function pasoNivel(indexNivel, nivelPasado){

    NIVELES_PASADOS[indexNivel] = nivelPasado

}

export function getNivel(indexNivel){

    return NIVELES_PASADOS[indexNivel]

}

const onSceneReady = (e) => {

    var sceneIndex =  -1;

    const { canvas, scene, engine } = e

    // ACTIVAMOS EL DEBUGGER
    // scene.debugLayer.show()

    // DAMOS UN COLOR OSCURO A LA ESCENA
    scene.clearColor = new Babylon.Color3(0, 0, 0)

    // CREAMOS LA CÁMARA
    const camera = new Babylon.FreeCamera("camera", new Babylon.Vector3(0, 9, -15), scene)
    camera.setTarget(Babylon.Vector3.Zero())
    camera.attachControl(canvas, true)

    // CREAMOS LA LUZ
    const light = new Babylon.PointLight("light", new Babylon.Vector3(0, -1, 0), scene)
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
    var orbitas = SistemaSolar.crearOrbitas()
    var circulos = SistemaSolar.crearCirculos(scene, orbitas)
    var [paneles, texturaPaneles] = SistemaSolar.crearPaneles(planetas)
    var botones = SistemaSolar.crearBotones(texturaPaneles, planetas) 
    SistemaSolar.asociarPlanetasOrbitas(planetas, circulos)

    // Asignamos los planetas a variables para poder acceder a ellos más fácilmente
    var [ sol, mercurio, venus, tierra, luna, marte, jupiter, saturno, saturnoAnillos, urano, neptuno ] = planetas
    var [ mercurioOrbita, venusOrbita, tierraOrbita, marteOrbita, jupiterOrbita, saturnoOrbita, uranoOrbita, neptunoOrbita ] = orbitas
    var [ mercurioCirculo, venusCirculo, tierraCirculo, marteCirculo, jupiterCirculo, saturnoCirculo, uranoCirculo, neptunoCirculo ] = circulos
    var [ solPanel, mercurioPanel, venusPanel, tierraPanel, martePanel, jupiterPanel, saturnoPanel, saturnoAnillosPanel, uranoPanel, neptunoPanel ] = paneles
    var [ solBoton, mercurioBoton, venusBoton, tierraBoton, marteBoton, jupiterBoton, saturnoBoton, uranoBoton, neptunoBoton ] = botones

    // Variable global para hacer referencia al objeto seleccionado
    var highlightLayer = new Babylon.HighlightLayer('highlightLayer', scene);
    let selectedMesh = null;

    // Agregamos el comportamiento a los planetas
    planetas.forEach(mesh => {

        mesh.actionManager = new Babylon.ActionManager(scene);
        mesh.actionManager.registerAction(

            new Babylon.ExecuteCodeAction(Babylon.ActionManager.OnPickTrigger, () => {

                selectedMesh = SistemaSolar.agregarHighLight(mesh, selectedMesh, highlightLayer);

                // Activar el panel y botones de prueba del planeta seleccionado
                SistemaSolar.activarPanel(mesh, paneles)
                SistemaSolar.activarBoton(mesh, botones)

            })
            
        );

    });

    canvas.addEventListener('click', function(event) {

        // Verificar si el clic se originó dentro del mesh seleccionado
        if (selectedMesh && selectedMesh.actionManager && selectedMesh.actionManager.hasSpecificTrigger(Babylon.ActionManager.OnPickTrigger)) {
        
            const pickResult = scene.pick(scene.pointerX, scene.pointerY);

            if (pickResult && pickResult.pickedMesh === selectedMesh) {

                return;

            }

        }
    
        // Si el clic no se originó dentro del mesh seleccionado, quitar el highlight y ocultar el panel y botones
        if (selectedMesh) {

            SistemaSolar.quitarHighLight(selectedMesh, highlightLayer);
            SistemaSolar.desactivarPanel(selectedMesh, paneles);
            SistemaSolar.desactivarBoton(selectedMesh, botones);
            selectedMesh = null;

        }
        
    });  

    // Agregamos el comportamiento a los botones de "Iniciar prueba"
    botones.forEach(boton => {

        boton.onPointerClickObservable.add(() => {
            
            // Obtenemos el index de la escena del planeta seleccionado, esto nos permitirá saber qué escena cargar
            sceneIndex = SistemaSolar.obtenerIndexEscenaPlaneta(selectedMesh.name.toUpperCase())

        });

    });
    
    /// Agregamos la escena de cada planeta
    var sceneSol = EscenaPlanetas.crearEscenaSol(engine, canvas)
    var sceneMercurio = EscenaPlanetas.crearEscenaMercurio(engine, canvas)
    var sceneVenus = EscenaPlanetas.crearEscenaVenus(engine, canvas)
    var sceneTierra = EscenaPlanetas.crearEscenaTierra(engine, canvas)
    var sceneMarte = EscenaPlanetas.crearEscenaMarte(engine, canvas)
    var sceneJupiter = EscenaPlanetas.crearEscenaJupiter(engine, canvas)
    var sceneSaturno = EscenaPlanetas.crearEscenaSaturno(engine, canvas)
    var sceneUrano = EscenaPlanetas.crearEscenaUrano(engine, canvas)
    var sceneNeptuno = EscenaPlanetas.crearEscenaNeptuno(engine, canvas)
    
    // CARGAMOS EL MÓDULO XR
    const XR = XR_Module.XR_Experience(ground, skybox, scene);
    
    // DAMOS COMPORTAMIENTO AL RENDERIZADO DE LA ESCENA
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

        switch (sceneIndex) {
        
            case 0:
                scene.dispose()
            break;

            case 1:
                scene.dispose()
                sceneSol.render()
            break;

            case 2:
                scene.dispose()
                sceneMercurio.render()
            break;

            case 3:
                scene.dispose()
                sceneVenus.render()
            break;

            case 4:
                scene.dispose()
                sceneTierra.render()
            break;

            case 5:
                scene.dispose()
                sceneMarte.render()
            break;

            case 6:
                scene.dispose()
                sceneJupiter.render()
            break;

            case 7:
                scene.dispose()
                sceneSaturno.render()
            break;

            case 8:
                scene.dispose()
                sceneUrano.render()
            break;

            case 9:
                scene.dispose()
                sceneNeptuno.render()
            break;
            
            default:
                scene.render()
            break;
        
        }

    });

}

function index() {

    return(

        <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas"/>

    )

}

export default index;
