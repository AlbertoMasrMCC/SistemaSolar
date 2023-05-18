import * as Babylon from 'babylonjs'
import * as GUI from 'babylonjs-gui';
import ammo from "ammo.js";

import fondo_planetas from '../Resources/escena_planetas/index.js';

import * as PaginaPrincipal from "./index";
import { formulariosUI, mensajeEmergente } from "../Modules/FormularioUI";
import preguntas_respuestas from '../Resources/preguntas_respuestas.json'

import video_mercurio from '../Resources/mercurio.mp4'

import * as XR_Module from "../Modules/XR_Module";
import * as AV_Module from "../Modules/AV_Module";

/**
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Sol
**/
export async function crearEscena(engine, canvas, idTest) {

    var preguntas_respuestas_escena = preguntas_respuestas[idTest]

    var subScene = new Babylon.Scene(engine);
    var camera = new Babylon.ArcRotateCamera("camera"+ idTest, 0, 0, -3, Babylon.Vector3.Zero(), subScene);
    camera.setPosition(new Babylon.Vector3(0, 0, -3));
    camera.attachControl(canvas, false);

    subScene.enablePhysics(new Babylon.Vector3(0, 0, 0), new Babylon.AmmoJSPlugin(true, await ammo()));
  
    subScene.collitionsEnabled = true;
    camera.checkCollisions = true;

    if(idTest === 0) {

        var videoPlayer = AV_Module.VideoTexture(video_mercurio, subScene)

        var ventanas = null

        function mostrarOcultarInformacion(mostrar) {

            videoPlayer.ANote0Video.isVisible = mostrar
            videoPlayer.ANote0VideoVidTex.isVisible = mostrar
            videoPlayer.button_controls.isVisible = mostrar
            videoPlayer.button_omited.isVisible = mostrar
            videoPlayer.advancedTexture.isVisible = mostrar

        }

        videoPlayer.button_omited.onPointerClickObservable.add(function () {

            debugger

            ventanas = formulariosUI(preguntas_respuestas_escena, subScene);

            videoPlayer.ANote0VideoVidTex.muted = true;
            videoPlayer.ANote0VideoVidTex.video.pause();
            
            mostrarOcultarInformacion(false)
    
        })

    }

    // var ventanas = formulariosUI(preguntas_respuestas_escena, subScene);

    // function mostrarOcultarVentana(ventana, mostrar) {
    //     ventana.barMesh.isVisible = mostrar;
    //     ventana.bar_rectangle.isVisible = mostrar;
    //     ventana.windowMesh.isVisible = mostrar;
    //     ventana.window_rectangle.isVisible = mostrar;
    // }

    // function validarPasoPrueba() {

    //     var contado_pruebas_pasadas = 0

    //     for(var i = 0; i < ventanas.length; i++) {

    //         if(ventanas[i].windowMesh.metadata.pasonivel) {

    //             contado_pruebas_pasadas++;

    //         }

    //     }

    //     if(contado_pruebas_pasadas < 3)
    //         return false;
    //     else
    //         return true;

    // }

    // function redireccionar() {

    //     var niveles = PaginaPrincipal.getNiveles();

    //     window.location.href = `/?sol=${niveles[0]}&mercurio=${niveles[1]}&venus=${niveles[2]}&tierra=${niveles[3]}&marte=${niveles[4]}&jupiter=${niveles[5]}&saturno=${niveles[6]}&urano=${niveles[7]}&neptuno=${niveles[8]}`;

    // }
    
    // for (var i = 0; i < ventanas.length; i++) {
    
    //     if (i === 0) {
    //         mostrarOcultarVentana(ventanas[i], true);
    //     }
    
    //     ventanas[i].btn_next.onPointerClickObservable.add(function () {

    //         for (var j = 0; j < ventanas.length; j++) {
    
    //             if (ventanas[j].barMesh.isVisible) {
    //                 var ventana_actual = ventanas[j];
    //                 var ventana_siguiente = ventanas[j + 1];
    //                 break;
    //             }
    
    //         }

    //         mostrarOcultarVentana(ventana_actual, false);

    //         mostrarOcultarVentana(ventana_siguiente, true);

    //     });

    //     ventanas[i].btn_end.onPointerClickObservable.add(function () {

    //         mostrarOcultarVentana(ventanas[ventanas.length - 1], false);

    //         var ventanaPasoPrueba = null

    //         if(validarPasoPrueba()) {
    //             ventanaPasoPrueba = mensajeEmergente(true, subScene)
    //             PaginaPrincipal.pasoNivel(idTest, true);
    //         } else {
    //             ventanaPasoPrueba = mensajeEmergente(false, subScene)
    //             PaginaPrincipal.pasoNivel(idTest, false);
    //         }

    //         mostrarOcultarVentana(ventanaPasoPrueba, true);

    //         ventanaPasoPrueba.boton.onPointerClickObservable.add(function () {

    //             mostrarOcultarVentana(ventanaPasoPrueba, false);

    //             redireccionar();

    //         });

    //     });

    // }

    var skybox = Babylon.Mesh.CreateBox("skyBox", 200, subScene);
    var skyboxMaterial = new Babylon.StandardMaterial("skyBox", subScene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new Babylon.HDRCubeTexture(fondo_planetas[idTest], subScene, 512);
    skyboxMaterial.reflectionTexture.coordinatesMode = Babylon.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Babylon.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Babylon.Color3(0, 0, 0);
    skyboxMaterial.colisionMask = 0;
    
    skybox.collisionsEnabled = true;
    skybox.checkCollisions = true;
    skybox.material = skyboxMaterial;

    // // Crear textura avanzada
    // var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // // Agregar botón para regresar a escena anterior en parte superior izquierda
    // var button = GUI.Button.CreateSimpleButton("button"+ idTest, "Regresar");
    // button.width = "150px"
    // button.height = "40px"
    // button.color = "white"
    // button.background = "green"
    // button.top = "10px"
    // button.left = "10px"
    // button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    // button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    // button.onPointerUpObservable.add(function () {

    //     redireccionar();
        
    // });

    // advancedTexture.addControl(button);

    return subScene;

}
