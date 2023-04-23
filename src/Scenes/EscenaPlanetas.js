import * as Babylon from 'babylonjs'
import * as GUI from 'babylonjs-gui';

import * as PaginaPrincipal from "./index";

/**
 * 
 * @param {Babylon.Engine} engine motor de renderizado
 * @param {HTMLCanvasElement} canvas lienzo
 * @returns {Babylon.Scene} subScene Escena del planeta Sol
**/
export function crearEscenaSol(engine, canvas) {

    if(PaginaPrincipal.getNivel(0)) {
        console.log("Ya se ha completado el nivel 0");
        return;
    }

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

        window.location.href = "/";
        
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
export function crearEscenaMercurio(engine, canvas) {

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
export function crearEscenaVenus(engine, canvas) {

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
export function crearEscenaTierra(engine, canvas) {

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
export function crearEscenaMarte(engine, canvas) {

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
export function crearEscenaJupiter(engine, canvas) {

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
export function crearEscenaSaturno(engine, canvas) {

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
export function crearEscenaUrano(engine, canvas) {

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
export function crearEscenaNeptuno(engine, canvas) {

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
