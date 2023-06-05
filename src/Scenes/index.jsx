import React from "react";
import * as Babylon from 'babylonjs';
import * as Materials from 'babylonjs-materials';

import SceneComponent from "../Components/SceneComponent";
import * as XR_Module from "../Modules/XR_Module";

import milky_way from "../Resources/2k_stars_milky_way.jpg";

import * as SistemaSolar from "./SistemaSolar"

var escenaPlaneta = -1

// La primera posición corresponde al sol, la segunda a mercurio, la tercera a venus, la cuarta a la tierra, la quinta a marte, la sexta a jupiter, la séptima a saturno, la octava a urano y la novena a neptuno
var NIVELES_PASADOS = [false, false, false, false, false, false, false, false, false]

/** 
 * @params {int} indexNivel - Indice del nivel que se quiere pasar
 * @params {boolean} nivelPasado - Indica si el nivel ha sido pasado o no
**/
export function pasoNivel(indexNivel, nivelPasado){

    NIVELES_PASADOS[indexNivel] = nivelPasado

}

/**
 * @params {int} indexNivel - Indice del nivel que se quiere obtener
 * @returns {boolean} - Devuelve true si el nivel ha sido pasado y false en caso contrario
**/
export function getNivel(indexNivel){

    return NIVELES_PASADOS[indexNivel]

}

/**
 * @returns {Array boolean} - Devuelve un array con los niveles pasados
**/
export function getNiveles(){

    return NIVELES_PASADOS

}

/**
 * Asigna el indice de la escena que se quiere cargar a la variable global
 * @params {Babylon.Scene} escena - Escena que se quiere asignar a la variable global
**/ 
export function setEscenaPlaneta(escena){

    escenaPlaneta = escena

}

/**
 * @returns {Babylon.Scene} - Devuelve el indice que se ha asignado a la variable global
**/
export function getEscenaPlaneta(){

    return escenaPlaneta

}

const onSceneReady = async (e) => {

    const { canvas, scene, engine } = e

    // Se dará comportamiento a los planetas en el render loop
    var mercurioMovimiento = 0
    var venusMovimiento = 0
    var tierraMovimiento = 0
    var marteMovimiento = 0
    var jupiterMovimiento = 0
    var saturnoMovimiento = 0
    var uranoMovimiento = 0
    var neptunoMovimiento = 0

    // Cuando volvemos de la subescena de los planetas, se debe de volver a cargar los contenedores
    var contenedoresCargados = true

    // Variable global para hacer referencia al objeto seleccionado
    var highlightLayer = new Babylon.HighlightLayer('highlightLayer', scene);
    let selectedMesh = null;

    // Damos color oscurso a la escena
    scene.clearColor = new Babylon.Color3(0, 0, 0)

    // Cámara que se asociará a todas las escenas
    const camera = new Babylon.FreeCamera("camera", new Babylon.Vector3(0, 9, -15), scene)
    camera.setTarget(Babylon.Vector3.Zero())
    camera.attachControl(canvas, true)

    // Luz que puede ser manipulada en cualquier escena
    const light = new Babylon.PointLight("light", new Babylon.Vector3(0, -1, 0), scene)
    light.intensity = 5

    // Suelo de la escena principal (sistema solar)
    const ground = Babylon.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene)
    const groundMaterial = new Babylon.StandardMaterial("groundMaterial", scene)
    groundMaterial.diffuseTexture = new Babylon.Texture(milky_way, scene)
    ground.material = groundMaterial

    // Cielo de la escena principal (sistema solar)
    const skyBoxMaterial = new Materials.SkyMaterial("skyBoxMaterial", scene)
    const skybox = Babylon.Mesh.CreateBox("skyBox", 100.0, scene)
    skybox.material = skyBoxMaterial

    // Mensaje de bienvenida al sistema solar
    var mensajeBienvenida = "\n\n ¡Bienvenido al Sistema Solar en XR! \n\n\n\n Tu misión aquí es visitar cada planeta y aprender sobre ellos. Cada planeta es una misión, por lo que deberás pasar la prueba de todos para ganar. \n\n Para conocer cómo funciona cada planeta en el sistema solar, simplemente selecciónalo. Si deseas aprender más acerca de un planeta en particular, presiona el botón 'Visitar...' y sumérgete en su interior. \n\n Una vez que sientas que has adquirido suficiente conocimiento sobre el planeta y crees comprender cómo funciona tanto individualmente como en el contexto del sistema solar, pon a prueba tus habilidades completando un cuestionario. \n\n Si en algún momento de tu viaje te sientes perdido, no dudes en utilizar el botón de ayuda ubicado en la parte superior derecha de la pantalla. \n\n Además, para una experiencia aún más inmersiva, aprovecha los recursos de realidad aumentada de tu dispositivo. En la esquina inferior derecha, encontrarás un botón para cambiar entre el modo de realidad virtual y realidad aumentada. \n\n\n\n ¡Disfruta tu viaje! \n\n"
    SistemaSolar.crearMensaje(mensajeBienvenida, scene)

    // Imagenes de los planetas que se mostrarán en la parte superior izquierda de la pantalla en la escena principal
    var [textura_planetas, rectangle_planetas, img_niveles_planetas] = SistemaSolar.crearImagenesPlanetas()

    // Botón de ayuda que se mostrará en la parte superior derecha de la pantalla en la escena principal
    var [boton_ayuda, mensaje_ayuda] = SistemaSolar.crearBotonMensajeAyuda()

    // Se crean todos los componentes del sistema solar
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
    var [ nivel_sol, nivel_mercurio, nivel_venus, nivel_tierra, nivel_marte, nivel_jupiter, nivel_saturno, nivel_urano, nivel_neptuno ] = img_niveles_planetas

    // Módulo XR que se asociará a todas las escenas
    var [xr_module, btnModoXR] = await XR_Module.XR_Experience(ground, skybox, scene);

    /***** Agregamos los elementos a contenedor para poder manipularlos más fácilmente *****/

    var planetasContenedor = new Babylon.AssetContainer(scene)
    planetasContenedor.meshes.push(sol, mercurio, venus, tierra, luna, marte, jupiter, saturno, saturnoAnillos, urano, neptuno)

    var circulosContenedor = new Babylon.AssetContainer(scene)
    circulosContenedor.meshes.push(mercurioCirculo, venusCirculo, tierraCirculo, marteCirculo, jupiterCirculo, saturnoCirculo, uranoCirculo, neptunoCirculo)

    var cieloContenedor = new Babylon.AssetContainer(scene)
    cieloContenedor.meshes.push(skybox)

    var sueloContenedor = new Babylon.AssetContainer(scene)
    sueloContenedor.meshes.push(ground)

    var luzContenedor = new Babylon.AssetContainer(scene)
    luzContenedor.lights.push(light)

    /****************************************************************************************/

    agregarComportamientoPlanetas()

    verificarElementoSeleccionado()

    agregarComportamientoBotones()

    function agregarComportamientoPlanetas() {

        planetas.forEach(mesh => {

            mesh.actionManager = new Babylon.ActionManager(scene);
            mesh.actionManager.registerAction(
    
                new Babylon.ExecuteCodeAction(Babylon.ActionManager.OnPickTrigger, () => {
    
                    selectedMesh = SistemaSolar.agregarHighLight(mesh, selectedMesh, highlightLayer);
    
                    SistemaSolar.activarPanel(mesh, paneles)
                    SistemaSolar.activarBoton(mesh, botones)
                    SistemaSolar.validarNivelPasado(mesh, botones)
    
                })
                
            );
    
        });

    }

    function agregarComportamientoBotones() {

        botones.forEach(boton => {

            boton.onPointerClickObservable.add(() => {

                planetasContenedor.removeAllFromScene()
                circulosContenedor.removeAllFromScene()
                cieloContenedor.removeAllFromScene()
                sueloContenedor.removeAllFromScene()
                luzContenedor.removeAllFromScene()
                ocultarPaneles()
                ocultarBotones()
                rectangle_planetas.isVisible = false
                boton_ayuda.isVisible = false
                mensaje_ayuda.isVisible = false

                contenedoresCargados = false
    
                escenaPlaneta = SistemaSolar.obtenerEscenaPlaneta(selectedMesh.name.toUpperCase(), camera, scene)

            });
    
        });

    }

    function ocultarPaneles() {
            
            paneles.forEach(panel => {
    
                panel.isVisible = false
    
            });
    
    }

    function ocultarBotones() {

        botones.forEach(boton => {

            boton.isVisible = false

        });

    }

    // Quita el highlight, oculta el panel y botones del mesh seleccionado
    function verificarElementoSeleccionado() {
    
        canvas.addEventListener('click', function(event) {

            // Verificar si el clic se originó dentro del mesh seleccionado
            if (selectedMesh && selectedMesh.actionManager && selectedMesh.actionManager.hasSpecificTrigger(Babylon.ActionManager.OnPickTrigger)) {
            
                const pickResult = scene.pick(scene.pointerX, scene.pointerY);
    
                if (pickResult && pickResult.pickedMesh === selectedMesh) {
    
                    return;
    
                }
    
            }
        
            // Si el clic no se originó dentro del mesh seleccionado, quitar el highlight, ocultar el panel y botones
            if (selectedMesh) {
    
                SistemaSolar.quitarHighLight(selectedMesh, highlightLayer);
                SistemaSolar.desactivarPanel(selectedMesh, paneles);
                SistemaSolar.desactivarBoton(selectedMesh, botones);
                selectedMesh = null;
    
            }
            
        });  
    
    }

    scene.onBeforeRenderObservable.add(() => {

        if(escenaPlaneta === -1) {

            if(!contenedoresCargados) {

                planetasContenedor.addAllToScene()
                circulosContenedor.addAllToScene()
                cieloContenedor.addAllToScene()
                sueloContenedor.addAllToScene()
                luzContenedor.addAllToScene()
                rectangle_planetas.isVisible = true
                boton_ayuda.isVisible = true

                contenedoresCargados = true

            }

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

        }

    })

    engine.runRenderLoop(() => {
    
        scene.render()
    
    })

}

function index() {

    return(

        <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas"/>

    )

}

export default index;
