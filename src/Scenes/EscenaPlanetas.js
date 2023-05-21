import * as Babylon from 'babylonjs'
import * as GUI from 'babylonjs-gui';

import fondo_planetas from '../Resources/escena_planetas/index.js';
import video_planetas from '../Resources/video_planetas/index.js';

import * as PaginaPrincipal from "./index";
import { formulariosUI, mensajeEmergente } from "../Modules/FormularioUI";
import preguntas_respuestas from '../Resources/preguntas_respuestas.json'

import * as XR_Module from "../Modules/XR_Module";
import * as AV_Module from "../Modules/AV_Module";

/**
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo de renderizado
 * @param {int} idTest id de las preguntas y respuestas
 * @returns {Babylon.Scene} escena del planeta
**/
export function crearEscena(engine, canvas, idTest) {

    var preguntas_respuestas_escena = preguntas_respuestas[idTest]

    var subScene = new Babylon.Scene(engine);
    var camera = new Babylon.ArcRotateCamera("camera"+ idTest, 0, 0, -3, Babylon.Vector3.Zero(), subScene);
    camera.setPosition(new Babylon.Vector3(0, 0, -3));
    camera.attachControl(canvas, false);

    var videoPlayer = AV_Module.VideoTexture(video_planetas[idTest], subScene)

    videoPlayer.button_omited.onPointerClickObservable.add(function () {

        var ventanas = formulariosUI(preguntas_respuestas_escena, subScene);

        // Detenemos el video y lo ocultamos
        videoPlayer.ANote0VideoVidTex.muted = true;
        videoPlayer.ANote0VideoVidTex.video.pause();
        mostrarOcultarVideo(videoPlayer, false)

        cargarFormulario(ventanas, idTest, subScene)

    })

    var skybox = Babylon.Mesh.CreateBox("skyBox", 200, subScene);
    var skyboxMaterial = new Babylon.StandardMaterial("skyBox", subScene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new Babylon.HDRCubeTexture(fondo_planetas[idTest], subScene, 512);
    skyboxMaterial.reflectionTexture.coordinatesMode = Babylon.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Babylon.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Babylon.Color3(0, 0, 0);
    skyboxMaterial.colisionMask = 0;
    skybox.material = skyboxMaterial;

    var ground = Babylon.Mesh.CreateGround("ground"+ idTest, 1000, 1000, 1, subScene);
    ground.isVisible = false;

    var xr_module = XR_Module.XR_Experience(ground, skybox, subScene);

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var button = GUI.Button.CreateSimpleButton("button"+ idTest, "Regresar");
    button.width = "150px"
    button.height = "40px"
    button.color = "white"
    button.background = "green"
    button.top = "10px"
    button.left = "10px"
    button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    button.onPointerUpObservable.add(function () {

        redireccionar();
        
    });

    advancedTexture.addControl(button);

    return subScene;

}

function mostrarOcultarVideo(videoPlayer, mostrar) {

    videoPlayer.ANote0Video.isVisible = mostrar
    videoPlayer.ANote0VideoVidTex.isVisible = mostrar
    videoPlayer.button_controls.isVisible = mostrar
    videoPlayer.button_omited.isVisible = mostrar
    videoPlayer.advancedTexture.isVisible = mostrar

}

function mostrarOcultarVentanaFormulario(ventana, mostrar) {
    ventana.barMesh.isVisible = mostrar;
    ventana.bar_rectangle.isVisible = mostrar;
    ventana.windowMesh.isVisible = mostrar;
    ventana.window_rectangle.isVisible = mostrar;
}

function validarPasoPrueba(ventanas) {

    var contado_pruebas_pasadas = 0

    for(var i = 0; i < ventanas.length; i++) {

        if(ventanas[i].windowMesh.metadata.pasonivel) {

            contado_pruebas_pasadas++;

        }

    }

    if(contado_pruebas_pasadas < 3)
        return false;
    else
        return true;

}

function cargarFormulario(ventanas, idTest, subScene) {
    
    for (var i = 0; i < ventanas.length; i++) {
    
        if (i === 0) {
            mostrarOcultarVentanaFormulario(ventanas[i], true);
        }
    
        ventanas[i].btn_next.onPointerClickObservable.add(function () {

            // Obtenemos la ventana que sigue de mostrarse
            for (var j = 0; j < ventanas.length; j++) {
    
                if (ventanas[j].barMesh.isVisible) {
                    var ventana_actual = ventanas[j];
                    var ventana_siguiente = ventanas[j + 1];
                    break;
                }
    
            }

            // ocultamos la ventana actual y mostramos la siguiente
            mostrarOcultarVentanaFormulario(ventana_actual, false);
            mostrarOcultarVentanaFormulario(ventana_siguiente, true);

        });

        ventanas[i].btn_end.onPointerClickObservable.add(function () {

            // Ocultamos la ventana actual
            mostrarOcultarVentanaFormulario(ventanas[ventanas.length - 1], false);

            var ventanaPasoPrueba = null

            if(validarPasoPrueba(ventanas)) {
                ventanaPasoPrueba = mensajeEmergente(true, subScene)
                PaginaPrincipal.pasoNivel(idTest, true);
            } else {
                ventanaPasoPrueba = mensajeEmergente(false, subScene)
                PaginaPrincipal.pasoNivel(idTest, false);
            }

            // Mostramos la ventana de paso de prueba
            mostrarOcultarVentanaFormulario(ventanaPasoPrueba, true);

            // Esperamos le de click al boton de continuar
            ventanaPasoPrueba.boton.onPointerClickObservable.add(function () {

                mostrarOcultarVentanaFormulario(ventanaPasoPrueba, false);
                redireccionar();

            });

        });

    }

}

function redireccionar() {

    var niveles = PaginaPrincipal.getNiveles();

    window.location.href = `/?sol=${niveles[0]}&mercurio=${niveles[1]}&venus=${niveles[2]}&tierra=${niveles[3]}&marte=${niveles[4]}&jupiter=${niveles[5]}&saturno=${niveles[6]}&urano=${niveles[7]}&neptuno=${niveles[8]}`;

}
