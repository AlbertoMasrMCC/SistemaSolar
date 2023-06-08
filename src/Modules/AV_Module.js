import * as BABYLON from "babylonjs";
import * as GUI from 'babylonjs-gui';
import "babylonjs-loaders"

/** 
 * @param {String} videoURL - URL del video a reproducir
 * @param {BABYLON.Scene} scene - Escena de babylon
 * @returns {Babylon.MeshBuilder, Babylon.VideoTexture, GUI.Button, GUI.Button, GUI.AdvancedDynamicTexture} - Retorna un objeto con la malla del video, la textura del video, los botones de control y la interfaz de usuario
**/
export function VideoTexture(videoURL, scene) {

    var planeOpts = {
        height: 1080 * 0.01, 
        width: 1920 * 0.01, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    };

    let videoTextureSettings = {
        loop: false,
        autoPlay: false,
        autoUpdateTexture: true
    };
    
    var ANote0Video = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
    ANote0Video.position = new BABYLON.Vector3(0, 0, 15);
    var ANote0VideoMat = new BABYLON.StandardMaterial("m", scene);
    ANote0VideoMat.diffuseColor = new BABYLON.Color3.White();
    var ANote0VideoVidTex = new BABYLON.VideoTexture("videoTexture", videoURL, scene, true, false, BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, videoTextureSettings);
    ANote0VideoMat.diffuseTexture = ANote0VideoVidTex;
    ANote0VideoMat.roughness = 1;
    ANote0VideoMat.emissiveColor = new BABYLON.Color3.White();
    ANote0Video.material = ANote0VideoMat;
    ANote0Video.xrPickable = true;

    var botons_mesh = BABYLON.MeshBuilder.CreatePlane("plane", {
        height: 30,
        width: 1920 * 0.01,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    botons_mesh.parent = ANote0Video

    // obtener el borde minimo del video con respecto a y
    let min_y = ANote0Video.getBoundingInfo().boundingBox.minimumWorld.y;
    botons_mesh.position = new BABYLON.Vector3(0, min_y - 1.5, 0);

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(botons_mesh);

    var grid = new GUI.Grid();
    grid.addColumnDefinition(0.5);
    grid.addColumnDefinition(0.5);

    let button_controls = GUI.Button.CreateSimpleButton("button_controls", "Reproducir");
    button_controls.color = "white";
    button_controls.background = "green";
    button_controls.width = "80%";
    button_controls.height = "7%";
    button_controls.cornerRadius = 20;
    grid.addControl(button_controls, 0, 0);

    button_controls.onPointerClickObservable.add(function () {

        if (ANote0VideoVidTex.video.paused) {

            ANote0VideoVidTex.video.play();
            button_controls.textBlock.text = "Pausar";
            button_controls.background = "yellow";
            button_controls.color = "black";

        } else {

            ANote0VideoVidTex.video.pause();
            button_controls.textBlock.text = "Reproducir";
            button_controls.background = "green";
            button_controls.color = "white";

        }

    });

    let button_omited = GUI.Button.CreateSimpleButton("button_omited", "Omitir");
    button_omited.color = "white";
    button_omited.background = "red";
    button_omited.width = "80%";
    button_omited.height = "7%";
    button_omited.cornerRadius = 20;
    grid.addControl(button_omited, 0, 1);

    advancedTexture.addControl(grid);

    return {ANote0Video, ANote0VideoVidTex, button_controls, button_omited, advancedTexture, botons_mesh};

}
