import * as Babylon from 'babylonjs'
import * as GUI from 'babylonjs-gui';

import fondo_planetas from '../Resources/escena_planetas/index.js';
import video_planetas from '../Resources/video_planetas/index.js';

import * as PaginaPrincipal from "./index";
import { formulariosUI, mensajeEmergente } from "../Modules/FormularioUI";
import preguntas_respuestas from '../Resources/preguntas_respuestas.json'

import * as AV_Module from "../Modules/AV_Module";

import * as SistemaSolar from "./SistemaSolar"

/**
 * @param {Babylon.Camera} camera - Camara de la escena
 * @param {Babylon.Scene} scene - Escena actual
 * @param {int} idTest id de las preguntas y respuestas del planeta
**/
export function crearEscena(camera, scene, idTest) {

    var preguntas_respuestas_escena = preguntas_respuestas[idTest]

    // Posicionamos la cámara en el centro de la escena
    camera.position = new Babylon.Vector3(0, 10, -5);

    var videoPlayer = AV_Module.VideoTexture(video_planetas[idTest], scene)

    var formularios = null

    videoPlayer.button_omited.onPointerClickObservable.add(function () {

        formularios = formulariosUI(preguntas_respuestas_escena, scene);

        detenerVideo(videoPlayer)
        mostrarOcultarVideo(videoPlayer, false)

        // Más abajo se crean los contenedores y el advancedTexture
        cargarFormulario(formularios, idTest, scene, cieloContenedor, sueloContenedor, advancedTexture, videoPlayer, camera)

    })

    var skybox = Babylon.Mesh.CreateBox("skyBox", 200, scene);
    var skyboxMaterial = new Babylon.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new Babylon.HDRCubeTexture(fondo_planetas[idTest], scene, 512);
    skyboxMaterial.reflectionTexture.coordinatesMode = Babylon.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Babylon.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Babylon.Color3(0, 0, 0);
    skyboxMaterial.colisionMask = 0;
    skybox.material = skyboxMaterial;

    var ground = Babylon.Mesh.CreateGround("ground"+ idTest, 1000, 1000, 1, scene);
    ground.isVisible = false;

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var btnMenuPrincipal = GUI.Button.CreateSimpleButton("btnMenuPrincipal"+ idTest, "Regresar");
    btnMenuPrincipal.width = "14%"
    btnMenuPrincipal.height = "7%"
    btnMenuPrincipal.cornerRadius = 20;
    btnMenuPrincipal.color = "white";
    btnMenuPrincipal.thickness = 4;
    btnMenuPrincipal.background = "black";
    btnMenuPrincipal.alpha = 0.5;
    btnMenuPrincipal.onPointerEnterObservable.add(function () {
        btnMenuPrincipal.background = "white";
        btnMenuPrincipal.color = "black";
    });
    btnMenuPrincipal.onPointerOutObservable.add(function () {
        btnMenuPrincipal.background = "black";
        btnMenuPrincipal.color = "white";
    });
    btnMenuPrincipal.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    btnMenuPrincipal.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    btnMenuPrincipal.onPointerUpObservable.add(function () {

        advancedTexture.dispose();
        redireccionar(camera, cieloContenedor, sueloContenedor, advancedTexture, videoPlayer, formularios);
        
    });

    advancedTexture.addControl(btnMenuPrincipal);

    var cieloContenedor = new Babylon.AssetContainer(scene);
    cieloContenedor.meshes.push(skybox);

    var sueloContenedor = new Babylon.AssetContainer(scene);
    sueloContenedor.meshes.push(ground);

}

function detenerVideo(videoPlayer) {

    videoPlayer.ANote0VideoVidTex.muted = true;
    videoPlayer.ANote0VideoVidTex.video.pause();

}

function mostrarOcultarVideo(videoPlayer, mostrar) {

    videoPlayer.ANote0Video.isVisible = mostrar
    videoPlayer.ANote0VideoVidTex.isVisible = mostrar
    videoPlayer.button_controls.isVisible = mostrar
    videoPlayer.button_omited.isVisible = mostrar
    videoPlayer.advancedTexture.isVisible = mostrar
    videoPlayer.botons_mesh.isVisible = mostrar

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

function cargarFormulario(ventanas, idTest, subScene, cieloContenedor, sueloContenedor, advancedTexture, videoPlayer, camera) {
    
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
                SistemaSolar.setPasoNivelImagen(idTest);

            } else {

                ventanaPasoPrueba = mensajeEmergente(false, subScene)
                PaginaPrincipal.pasoNivel(idTest, false);

            }

            // Mostramos la ventana de paso de prueba
            mostrarOcultarVentanaFormulario(ventanaPasoPrueba, true);

            // Esperamos le de click al boton de continuar
            ventanaPasoPrueba.boton.onPointerClickObservable.add(function () {

                mostrarOcultarVentanaFormulario(ventanaPasoPrueba, false);
                redireccionar(camera, cieloContenedor, sueloContenedor, advancedTexture, videoPlayer, ventanas);

            });

        });

    }

}

function redireccionar(camera, cieloContenedor, sueloContenedor, advancedTexture, videoPlayer, ventanas) {

    // Eliminamos los elementos de la escena, para que no se rendericen, y no consuman recursos
    cieloContenedor.dispose();
    sueloContenedor.dispose();
    advancedTexture.dispose();
    detenerVideo(videoPlayer)
    mostrarOcultarVideo(videoPlayer, false)

    // En caso de que no se haya llegado al formulario
    if(ventanas != null) {

        for(var i = 0; i < ventanas.length; i++) {
            ventanas[i].barMesh.dispose();
            ventanas[i].bar_rectangle.dispose();
            ventanas[i].windowMesh.dispose();
            ventanas[i].window_rectangle.dispose();
        }

    }

    // Acomodamos la cámara en la posición inicial
    camera.position = new Babylon.Vector3(0, 9, -15)

    // Asignamos null para que se renderice la escena del menu principal
    PaginaPrincipal.setEscenaPlaneta(-1)

}
