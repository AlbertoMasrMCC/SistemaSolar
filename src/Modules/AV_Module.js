import * as BABYLON from "babylonjs";
import * as GUI from 'babylonjs-gui';
import "babylonjs-loaders"

export function VideoTexture(videoURL, scene) {

    // VIDEO
    var planeOpts = {
        height: 1080 * 0.001, 
        width: 1920 * 0.001, 
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    };

    let videoTextureSettings = {
        loop: false,
        autoPlay: false,
        autoUpdateTexture: true
    };
    
    var ANote0Video = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
    var vidPos = (new BABYLON.Vector3(0,0,0.1))
    ANote0Video.position = vidPos;
    var ANote0VideoMat = new BABYLON.StandardMaterial("m", scene);
    ANote0VideoMat.diffuseColor = new BABYLON.Color3.White();
    var ANote0VideoVidTex = new BABYLON.VideoTexture("videoTexture", videoURL,
    scene, true, false,
    BABYLON.VideoTexture.TRILINEAR_SAMPLINGMODE, videoTextureSettings);
    ANote0VideoMat.diffuseTexture = ANote0VideoVidTex;
    ANote0VideoMat.roughness = 1;
    ANote0VideoMat.emissiveColor = new BABYLON.Color3.White();
    ANote0Video.material = ANote0VideoMat;
    ANote0Video.xrPickable = true;

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var grid = new GUI.Grid();
    grid.addColumnDefinition(0.5);
    grid.addColumnDefinition(0.5);

    // BOTONES
    let button_controls = GUI.Button.CreateSimpleButton("button_controls", "Reproducir");
    button_controls.color = "white";
    button_controls.background = "green";
    button_controls.width = "150px";
    button_controls.height = "40px";
    button_controls.top = "-40px";
    button_controls.left = "40px";
    grid.addControl(button_controls, 0, 0);

    button_controls.onPointerClickObservable.add(function () {

        debugger

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
    button_omited.width = "150px";
    button_omited.height = "40px";
    button_omited.top = "-40px";
    button_omited.left = "-40px";
    grid.addControl(button_omited, 0, 1);

    advancedTexture.addControl(grid);

    return {ANote0Video, ANote0VideoVidTex, button_controls, button_omited, advancedTexture};

}