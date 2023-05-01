import * as Babylon from 'babylonjs'
import * as GUI from 'babylonjs-gui';

import hdr from '../Resources/room.hdr'

import * as PaginaPrincipal from "./index";
import { WindowsUI } from "../Modules/WindowUI";
import preguntas_respuestas from '../Resources/preguntas_respuestas.json'

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Sol
**/
export function crearEscenaSol(engine, canvas, idTest) {

    var preguntas_respuestas_sol = preguntas_respuestas[idTest]

    var subScene = new Babylon.Scene(engine);
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, -3, Babylon.Vector3.Zero(), subScene);
    camera.setPosition(new Babylon.Vector3(0, 0, -3));
    camera.attachControl(canvas, false);

    var ventanas = WindowsUI(preguntas_respuestas_sol, subScene);

    function mostrarOcultarVentana(ventana, mostrar) {
        ventana.barMesh.isVisible = mostrar;
        ventana.bar_rectangle.isVisible = mostrar;
        ventana.windowMesh.isVisible = mostrar;
        ventana.window_rectangle.isVisible = mostrar;
    }

    function validarPasoPrueba() {

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

    function redireccionar() {

        var niveles = PaginaPrincipal.getNiveles();

        window.location.href = `/?sol=${niveles[0]}&mercurio=${niveles[1]}&venus=${niveles[2]}&tierra=${niveles[3]}&marte=${niveles[4]}&jupiter=${niveles[5]}&saturno=${niveles[6]}&urano=${niveles[7]}&neptuno=${niveles[8]}`;

    }
    
    for (var i = 0; i < ventanas.length; i++) {
    
        if (i === 0) {
            mostrarOcultarVentana(ventanas[i], true);
        }
    
        ventanas[i].btn_next.onPointerClickObservable.add(function () {

            for (var j = 0; j < ventanas.length; j++) {
    
                if (ventanas[j].barMesh.isVisible) {
                    var ventana_actual = ventanas[j];
                    var ventana_siguiente = ventanas[j + 1];
                    break;
                }
    
            }

            mostrarOcultarVentana(ventana_actual, false);

            mostrarOcultarVentana(ventana_siguiente, true);

        });

        ventanas[i].btn_end.onPointerClickObservable.add(function () {

            mostrarOcultarVentana(ventanas[ventanas.length - 1], false);

            if(validarPasoPrueba()) {
                alert("¡Felicidades! Has pasado la prueba");
                PaginaPrincipal.pasoNivel(idTest, true);
            } else {
                alert("¡Lo sentimos! No has pasado la prueba");
                PaginaPrincipal.pasoNivel(idTest, false);
            }

            redireccionar();

        });

    }
    

    var skybox3 = Babylon.Mesh.CreateBox("skyBox3", 200, subScene);
    var skyboxMaterial3 = new Babylon.StandardMaterial("skyBox3", subScene);
    skyboxMaterial3.backFaceCulling = false;
    skyboxMaterial3.reflectionTexture = new Babylon.HDRCubeTexture(hdr, subScene, 512);
    skyboxMaterial3.reflectionTexture.coordinatesMode = Babylon.Texture.SKYBOX_MODE;
    skyboxMaterial3.diffuseColor = new Babylon.Color3(0, 0, 0);
    skyboxMaterial3.specularColor = new Babylon.Color3(0, 0, 0);
    skyboxMaterial3.colisionMask = 0;
    skybox3.material = skyboxMaterial3;

    // Crear textura avanzada
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Agregar botón para regresar a escena anterior en parte superior izquierda
    var button = GUI.Button.CreateSimpleButton("but", "Regresar");
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

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Mercurio
**/
export function crearEscenaMercurio(engine, canvas, idTest) {

    var canvas = canvas
    //instance of a scene
    var subScene = new Babylon.Scene(engine);

    //first we create a camera
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, 10, Babylon.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new Babylon.HemisphericLight("light1", new Babylon.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = Babylon.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = Babylon.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new Babylon.StandardMaterial("material1", subScene);
    material.diffuseColor = new Babylon.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    return subScene;

}

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Venus
**/
export function crearEscenaVenus(engine, canvas, idTest) {

    var canvas = canvas
    //instance of a scene
    var subScene = new Babylon.Scene(engine);

    //first we create a camera
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, 10, Babylon.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new Babylon.HemisphericLight("light1", new Babylon.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = Babylon.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = Babylon.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new Babylon.StandardMaterial("material1", subScene);
    material.diffuseColor = new Babylon.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    return subScene;

}

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Tierra
**/
export function crearEscenaTierra(engine, canvas, idTest) {

    var canvas = canvas
    //instance of a scene
    var subScene = new Babylon.Scene(engine);

    //first we create a camera
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, 10, Babylon.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new Babylon.HemisphericLight("light1", new Babylon.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = Babylon.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = Babylon.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new Babylon.StandardMaterial("material1", subScene);
    material.diffuseColor = new Babylon.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    return subScene;

}

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Marte
**/
export function crearEscenaMarte(engine, canvas, idTest) {

    var canvas = canvas
    //instance of a scene
    var subScene = new Babylon.Scene(engine);

    //first we create a camera
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, 10, Babylon.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new Babylon.HemisphericLight("light1", new Babylon.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = Babylon.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = Babylon.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new Babylon.StandardMaterial("material1", subScene);
    material.diffuseColor = new Babylon.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    return subScene;

}

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Jupiter
**/
export function crearEscenaJupiter(engine, canvas, idTest) {

    var canvas = canvas
    //instance of a scene
    var subScene = new Babylon.Scene(engine);

    //first we create a camera
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, 10, Babylon.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new Babylon.HemisphericLight("light1", new Babylon.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = Babylon.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = Babylon.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new Babylon.StandardMaterial("material1", subScene);
    material.diffuseColor = new Babylon.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    return subScene;

}

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Saturno
**/
export function crearEscenaSaturno(engine, canvas, idTest) {

    var canvas = canvas
    //instance of a scene
    var subScene = new Babylon.Scene(engine);

    //first we create a camera
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, 10, Babylon.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new Babylon.HemisphericLight("light1", new Babylon.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = Babylon.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = Babylon.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new Babylon.StandardMaterial("material1", subScene);
    material.diffuseColor = new Babylon.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    return subScene;

}

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Urano
**/
export function crearEscenaUrano(engine, canvas, idTest) {

    var canvas = canvas
    //instance of a scene
    var subScene = new Babylon.Scene(engine);

    //first we create a camera
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, 10, Babylon.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new Babylon.HemisphericLight("light1", new Babylon.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = Babylon.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = Babylon.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new Babylon.StandardMaterial("material1", subScene);
    material.diffuseColor = new Babylon.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    return subScene;

}

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Neptuno
**/
export function crearEscenaNeptuno(engine, canvas, idTest) {

    var canvas = canvas
    //instance of a scene
    var subScene = new Babylon.Scene(engine);

    //first we create a camera
    var camera = new Babylon.ArcRotateCamera("camera1", 0, 0, 10, Babylon.Vector3.Zero(), subScene);

    camera.attachControl(canvas, true);

    //then we create a light
    var light = new Babylon.HemisphericLight("light1", new Babylon.Vector3(0, 1, 0), subScene);
    //then we create a box
    var box = Babylon.MeshBuilder.CreateBox("box1", { size: 2 }, subScene);
    //then we create a ground
    var ground = Babylon.MeshBuilder.CreateGround("ground1", { width: 6, height: 6 }, subScene);

    //then we create a material
    var material = new Babylon.StandardMaterial("material1", subScene);
    material.diffuseColor = new Babylon.Color3(1, 0, 0);    
    //then we apply the material to the box
    box.material = material;

    return subScene;

}
