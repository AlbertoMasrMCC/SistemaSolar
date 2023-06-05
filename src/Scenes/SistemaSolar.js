import * as Babylon from 'babylonjs'
import * as GUI from 'babylonjs-gui';

import * as PaginaPrincipal from "./index";

import * as EscenaPlanetas from "./EscenaPlanetas";

import sol_img from "../Resources/2k_sun.jpg"
import mercurio_img from "../Resources/2k_mercury.jpg"
import venus_img from "../Resources/2k_venus_surface.jpg"
import tierra_img from "../Resources/2k_earth_daymap.jpg"
import luna_img from "../Resources/2k_moon.jpg"
import marte_img from "../Resources/2k_mars.jpg"
import jupiter_img from "../Resources/2k_jupiter.jpg"
import saturno_anillos_img from "../Resources/2k_saturn2.jpg"
import saturno_img from "../Resources/2k_saturn.jpg"
import urano_img from "../Resources/2k_uranus.jpg"
import neptuno_img from "../Resources/2k_neptune.jpg"

import niveles_planetas from '../Resources/niveles_planetas/index.js';

var img_niveles_planetas = [9]

function degrees_to_radians(degrees) {

    return degrees * (Math.PI / 180)

}

function orbit_planet(points, ratio) {

    var orbit = []

    for (var i = 0; i < points; i++) {

        var theta = 2 * Math.PI * i / points
        var x = ratio * Math.cos(theta)
        var z = ratio * Math.sin(theta)

        orbit.push(new Babylon.Vector3(x, 0, z))

    }

    orbit.push(orbit[0])

    return orbit
}

function setPasoNivelBoton(boton) {

    boton.isEnabled = false
    boton.color = "green"
    boton.background = "green"
    boton.textBlock.color = "white"
    boton.textBlock.text = "¡Nivel pasado!"

}

/**
 * Asignamos la imagen del nivel pasado al planeta correspondiente
 * @param {Integer} id_nivel_planeta - ID del planeta al que se le asignará la imagen
 */
export function setPasoNivelImagen(id_nivel_planeta) {

    img_niveles_planetas[id_nivel_planeta].source = niveles_planetas[9]

}

/**
 * Creamos una ventana de los planetas con sus respectivas imagenes en la parte superior izquierda de la GUI de la escena principal
**/
export function crearImagenesPlanetas() {

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var rectangle_planetas = new GUI.Rectangle();
    rectangle_planetas.width = "40%";
    rectangle_planetas.height = "10%";
    rectangle_planetas.cornerRadius = 20;
    rectangle_planetas.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rectangle_planetas.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var grid = new GUI.Grid();

    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.1);

    var nivel_sol = new GUI.Image("sol", niveles_planetas[0]);
    nivel_sol.width = "25px";
    nivel_sol.height = "25px";
    img_niveles_planetas[0] = nivel_sol

    var nivel_mercurio = new GUI.Image("mercurio", niveles_planetas[1]);
    nivel_mercurio.width = "25px";
    nivel_mercurio.height = "25px";
    img_niveles_planetas[1] = nivel_mercurio

    var nivel_venus = new GUI.Image("venus", niveles_planetas[2]);
    nivel_venus.width = "25px";
    nivel_venus.height = "25px";
    img_niveles_planetas[2] = nivel_venus

    var nivel_tierra = new GUI.Image("tierra", niveles_planetas[3]);
    nivel_tierra.width = "25px";
    nivel_tierra.height = "25px";
    img_niveles_planetas[3] = nivel_tierra

    var nivel_marte = new GUI.Image("marte", niveles_planetas[4]);
    nivel_marte.width = "25px";
    nivel_marte.height = "25px";
    img_niveles_planetas[4] = nivel_marte

    var nivel_jupiter = new GUI.Image("jupiter", niveles_planetas[5]);
    nivel_jupiter.width = "25px";
    nivel_jupiter.height = "25px";
    img_niveles_planetas[5] = nivel_jupiter

    var nivel_saturno = new GUI.Image("saturno", niveles_planetas[6]);
    nivel_saturno.width = "25px";
    nivel_saturno.height = "25px";
    img_niveles_planetas[6] = nivel_saturno

    var nivel_urano = new GUI.Image("urano", niveles_planetas[7]);
    nivel_urano.width = "25px";
    nivel_urano.height = "25px";
    img_niveles_planetas[7] = nivel_urano

    var nivel_neptuno = new GUI.Image("neptuno", niveles_planetas[8]);
    nivel_neptuno.width = "25px";
    nivel_neptuno.height = "25px";
    img_niveles_planetas[8] = nivel_neptuno

    grid.addControl(nivel_sol, 0, 0);
    grid.addControl(nivel_mercurio, 0, 1);
    grid.addControl(nivel_venus, 0, 2);
    grid.addControl(nivel_tierra, 0, 3);
    grid.addControl(nivel_marte, 0, 4);
    grid.addControl(nivel_jupiter, 0, 5);
    grid.addControl(nivel_saturno, 0, 6);
    grid.addControl(nivel_urano, 0, 7);
    grid.addControl(nivel_neptuno, 0, 8);

    rectangle_planetas.addControl(grid);

    advancedTexture.addControl(rectangle_planetas);

    return [advancedTexture, rectangle_planetas, img_niveles_planetas]

}

/**
 * 
 * @returns {GUI.Button, GUI.AdvancedDynamicTexture} - Botón de ayuda y la GUI con el mensaje de ayuda
 */
export function crearBotonMensajeAyuda() {

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var boton_ayuda = GUI.Button.CreateSimpleButton("boton_ayuda", "?");
    boton_ayuda.width = "5%";
    boton_ayuda.height = "5%";
    boton_ayuda.cornerRadius = 50;
    boton_ayuda.color = "white";
    boton_ayuda.thickness = 4;
    boton_ayuda.background = "black";
    boton_ayuda.alpha = 0.8;
    boton_ayuda.textBlock.fontSize = 30;
    boton_ayuda.onPointerEnterObservable.add(function () {
        boton_ayuda.background = "white";
        boton_ayuda.color = "black";
    });
    boton_ayuda.onPointerOutObservable.add(function () {
        boton_ayuda.background = "black";
        boton_ayuda.color = "white";
    });
    boton_ayuda.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    boton_ayuda.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    boton_ayuda.onPointerUpObservable.add(function () {

        var mensaje = "\n\n ¡Sección de ayuda! \n\n\n\n En la parte superior izquierda se encuentran los planetas. Si están marcados con una palomita, significa que ya los has aprobado y completado con éxito. \n\n Si seleccionas un planeta, podrás ver si has superado su nivel o si aún necesitas completarlo. Esto te ayudará a tener claridad sobre tu progreso y te permitirá centrarte en los siguientes niveles por explorar. \n\n Recuerda que para avanzar en el juego, es importante conocer y comprender los planetas en el sistema solar, así como comprender su funcionamiento individual. Puedes lograrlo ingresando en cada uno de ellos y explorando su información detallada antes de poner a prueba tus conocimientos en el cuestionario. \n\n\n\n ¡Mucha suerte y diviértete explorando el Sistema Solar en XR! \n\n"
        crearMensaje(mensaje);

    });


    advancedTexture.addControl(boton_ayuda);

    return [boton_ayuda, advancedTexture]

}

/**
 * @param {string} mensaje - Mensaje que se quiere mostrar en la ventana emergente
 * Crea un mensaje emergente con el texto que se le pase por parámetro, también un botón para cerrar la ventana
 **/
export function crearMensaje(mensaje) {

    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var ventana_inicial = new GUI.Rectangle();
    ventana_inicial.width = 0.8;
    ventana_inicial.height = 0.8;
    ventana_inicial.cornerRadius = 20;
    ventana_inicial.color = "white";
    ventana_inicial.thickness = 4;
    ventana_inicial.background = "black";
    ventana_inicial.alpha = 0.8;
    ventana_inicial.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    ventana_inicial.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    var grid = new GUI.Grid();

    grid.addRowDefinition(0.8);
    grid.addRowDefinition(0.2);

    let scrollViewer = new GUI.ScrollViewer();
    scrollViewer.width = "100%";
    scrollViewer.height = "100%";
    scrollViewer.color = "white";
    scrollViewer.background = "black";
    scrollViewer.alpha = 0.8;

    let stackPanel = new GUI.StackPanel();
    stackPanel.width = "100%";

    scrollViewer.addControl(stackPanel);

    let mensaje_bienvenida = new GUI.TextBlock();
    mensaje_bienvenida.text = mensaje;
    mensaje_bienvenida.color = "white";
    mensaje_bienvenida.fontSize = 24;
    mensaje_bienvenida.resizeToFit = true;
    mensaje_bienvenida.textWrapping = GUI.TextWrapping.WordWrap;
    mensaje_bienvenida.paddingTop = "5%";
    mensaje_bienvenida.paddingLeft = "5%";
    mensaje_bienvenida.paddingRight = "5%";
    mensaje_bienvenida.paddingBottom = "5%";
    mensaje_bienvenida.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    mensaje_bienvenida.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    stackPanel.addControl(mensaje_bienvenida);

    grid.addControl(scrollViewer, 0, 0);

    let boton_continuar = GUI.Button.CreateSimpleButton("boton_continuar", "Continuar");
    boton_continuar.width = "20%";
    boton_continuar.height = "50%";
    boton_continuar.cornerRadius = 20;
    boton_continuar.color = "white";
    boton_continuar.thickness = 4;
    boton_continuar.background = "black";
    boton_continuar.alpha = 0.8;
    boton_continuar.onPointerEnterObservable.add(function () {
        boton_continuar.background = "white";
        boton_continuar.color = "black";
    });
    boton_continuar.onPointerOutObservable.add(function () {
        boton_continuar.background = "black";
        boton_continuar.color = "white";
    });

    boton_continuar.onPointerUpObservable.add(function () {

        advancedTexture.dispose();

    });

    grid.addControl(boton_continuar, 1, 0);

    ventana_inicial.addControl(grid);

    advancedTexture.addControl(ventana_inicial);

}

/** 
 * Función que crea los elementos del planeta seleccionado, los elementos de la escena principal se ocultan y muestran los nuevos (No se crea una nueva escena, sino que hace la ilusión de que se cambia de escena)
 * @param {String} planeta - Nombre del planeta que se quiere crear la escena
 * @param {BABYLON.camera} camera - Cárama de babylon
 * @param {BABYLON.Scene} scene - Escena de babylon
 * @returns {Integer} - Retorna el indice de la escena a la que se ha cambiado
**/
export function obtenerEscenaPlaneta(planeta, camera, scene) {

    var escenaPlaneta = -1

    switch (planeta) {

        case "SOL":
            escenaPlaneta = 0
            break;

        case "MERCURIO":
            escenaPlaneta = 1
            break;

        case "VENUS":
            escenaPlaneta = 2
            break;

        case "TIERRA":
            escenaPlaneta = 3
            break;

        case "LUNA":
            //
            break;

        case "MARTE":
            escenaPlaneta = 4
            break;

        case "JUPITER":
            escenaPlaneta = 5
            break;

        case "SATURNO":
            escenaPlaneta = 6
            break;

        case "SATURNOANILLOS":
            // 
            break;

        case "URANO":
            escenaPlaneta = 7
            break;

        case "NEPTUNO":
            escenaPlaneta = 8
            break;

        default:
            break;

    }

    if(escenaPlaneta !== -1) {

        EscenaPlanetas.crearEscena(camera, scene, escenaPlaneta)

    }

    return escenaPlaneta

}

/**
 * Función para crear los planetas del sistema solar
 * @param {Babylon.Scene} scene la escena de Babylon
 * @returns {Array Babylon.Mesh} Array con los planetas del sistema solar
**/
export function crearPlanetas(scene) {

    const sol = Babylon.MeshBuilder.CreateSphere("sol", {diameter: 1.3}, scene)
    sol.position.set(0, 1, 0)
    let solMaterial = new Babylon.StandardMaterial("solMaterial", scene)
    solMaterial.diffuseTexture = new Babylon.Texture(sol_img, scene)
    solMaterial.emissiveColor = new Babylon.Color3(1, 1, 1)
    solMaterial.specularColor = new Babylon.Color3(0, 0, 0)
    sol.material = solMaterial
    sol.isPickable = true
    sol.rotation.y = degrees_to_radians(90)

    const mercurio = Babylon.MeshBuilder.CreateSphere("mercurio", {diameter: 0.1}, scene)
    mercurio.position.set(1, 1, 0)
    let mercurioMaterial = new Babylon.StandardMaterial("mercurioMaterial", scene)
    mercurioMaterial.diffuseTexture = new Babylon.Texture(mercurio_img, scene)
    mercurio.material = mercurioMaterial
    mercurio.rotation.x = degrees_to_radians(0.1)
    mercurio.rotation.y = degrees_to_radians(90)

    const venus = Babylon.MeshBuilder.CreateSphere("venus", {diameter: 0.18}, scene)
    venus.position.set(2, 1, 0)
    let venusMaterial = new Babylon.StandardMaterial("venusMaterial", scene)
    venusMaterial.diffuseTexture = new Babylon.Texture(venus_img, scene)
    venus.material = venusMaterial
    mercurio.rotation.x = degrees_to_radians(177)
    venus.rotation.y = degrees_to_radians(90)

    const tierra = Babylon.MeshBuilder.CreateSphere("tierra", {diameter: 0.25}, scene)
    tierra.position.set(3, 1, 0)
    let tierraMaterial = new Babylon.StandardMaterial("tierraMaterial", scene)
    tierraMaterial.diffuseTexture = new Babylon.Texture(tierra_img, scene)
    tierra.material = tierraMaterial
    tierra.rotation.x = degrees_to_radians(23.5)
    tierra.rotation.y = degrees_to_radians(90)
    tierra.rotation.z = degrees_to_radians(180)

    const luna = Babylon.MeshBuilder.CreateSphere("luna", {diameter: 0.05}, scene)
    luna.position.set(3.3, 1, 0)
    let lunaMaterial = new Babylon.StandardMaterial("lunaMaterial", scene)
    lunaMaterial.diffuseTexture = new Babylon.Texture(luna_img, scene)
    luna.material = lunaMaterial

    const marte = Babylon.MeshBuilder.CreateSphere("marte", {diameter: 0.18}, scene)
    marte.position.set(4, 1, 0)
    let marteMaterial = new Babylon.StandardMaterial("marteMaterial", scene)
    marteMaterial.diffuseTexture = new Babylon.Texture(marte_img, scene)
    marte.material = marteMaterial
    marte.rotation.x = degrees_to_radians(25)
    marte.rotation.y = degrees_to_radians(90)

    const jupiter = Babylon.MeshBuilder.CreateSphere("jupiter", {diameter: 0.7}, scene)
    jupiter.position.set(5, 1, 0)
    let jupiterMaterial = new Babylon.StandardMaterial("jupiterMaterial", scene)
    jupiterMaterial.diffuseTexture = new Babylon.Texture(jupiter_img, scene)
    jupiter.material = jupiterMaterial
    jupiter.rotation.x = degrees_to_radians(3)
    jupiter.rotation.y = degrees_to_radians(90)

    const saturno = Babylon.MeshBuilder.CreateSphere("saturno", {diameter: 0.5}, scene)
    saturno.position.set(6, 1, 0)
    let saturnoMaterial = new Babylon.StandardMaterial("saturnoMaterial", scene)
    saturnoMaterial.diffuseTexture = new Babylon.Texture(saturno_img, scene)
    saturno.material = saturnoMaterial
    saturno.rotation.x = degrees_to_radians(-27)
    saturno.rotation.y = degrees_to_radians(90)

    const saturnoAnillos = Babylon.MeshBuilder.CreateTorus("saturnoAnillos", {diameter: 0.8, thickness: 0.2, tessellation: 100}, scene)
    saturnoAnillos.scaling = new Babylon.Vector3(1, 0.001, 1)
    let saturnoAnillosMaterial = new Babylon.StandardMaterial("saturnoAnillosMaterial", scene)
    saturnoAnillosMaterial.diffuseTexture = new Babylon.Texture(saturno_anillos_img, scene)
    saturnoAnillos.rotation.x = degrees_to_radians(-27)
    saturnoAnillos.material = saturnoAnillosMaterial
    saturnoAnillos.position.set(6, 1, 0)

    const urano = Babylon.MeshBuilder.CreateSphere("urano", {diameter: 0.5}, scene)
    urano.position.set(7, 1, 0)
    let uranoMaterial = new Babylon.StandardMaterial("uranoMaterial", scene)
    uranoMaterial.diffuseTexture = new Babylon.Texture(urano_img, scene)
    urano.material = uranoMaterial
    urano.rotation.x = degrees_to_radians(98)
    urano.rotation.y = degrees_to_radians(90)

    const neptuno = Babylon.MeshBuilder.CreateSphere("neptuno", {diameter: 0.4}, scene)
    neptuno.position.set(8, 1, 0)
    let neptunoMaterial = new Babylon.StandardMaterial("neptunoMaterial", scene)
    neptunoMaterial.diffuseTexture = new Babylon.Texture(neptuno_img, scene)
    neptuno.material = neptunoMaterial
    neptuno.rotation.x = degrees_to_radians(28)
    neptuno.rotation.y = degrees_to_radians(90)

    return [sol, mercurio, venus, tierra, luna, marte, jupiter, saturno, saturnoAnillos, urano, neptuno]

}

/** 
 * Función que crea las órbitas de los planetas
 * @returns {Array Babylon.Mesh} Array con las órbitas de los planetas
**/
export function crearOrbitas() {

    var mercurioOrbita = orbit_planet(880, 1)
    var venusOrbita = orbit_planet(1270, 2)
    var tierraOrbita = orbit_planet(1210, 3)
    var marteOrbita = orbit_planet(1710, 4)
    var jupiterOrbita = orbit_planet(8660, 5)
    var saturnoOrbita = orbit_planet(17920, 6)
    var uranoOrbita = orbit_planet(43800, 7)
    var neptunoOrbita = orbit_planet(75190, 8)

    return [mercurioOrbita, venusOrbita, tierraOrbita, marteOrbita, jupiterOrbita, saturnoOrbita, uranoOrbita, neptunoOrbita]

}

/**
 * Función que crea los círculos que representan las órbitas de los planetas
 * @param {Babylon.Scene} scene Escena de Babylon
 * @param {Array Babylon.Mesh} orbitas Array con las órbitas de los planetas
 * @returns {Array Babylon.Mesh} Array con los círculos que representan las órbitas de los planetas
**/
export function crearCirculos(scene, orbitas) {

    let MERCURIO = 0
    let VENUS = 1
    let TIERRA = 2
    let MARTE = 3
    let JUPITER = 4
    let SATURNO = 5
    let URANO = 6
    let NEPTUNO = 7

    var mercurioCirculo = Babylon.MeshBuilder.CreateLines("mercurioCirculo", {points: orbitas[MERCURIO]}, scene)
    var venusCirculo = Babylon.MeshBuilder.CreateLines("venusCirculo", {points: orbitas[VENUS]}, scene)
    var tierraCirculo = Babylon.MeshBuilder.CreateLines("tierraCirculo", {points: orbitas[TIERRA]}, scene)
    var marteCirculo = Babylon.MeshBuilder.CreateLines("marteCirculo", {points: orbitas[MARTE]}, scene)
    var jupiterCirculo = Babylon.MeshBuilder.CreateLines("jupiterCirculo", {points: orbitas[JUPITER]}, scene)
    var saturnoCirculo = Babylon.MeshBuilder.CreateLines("saturnoCirculo", {points: orbitas[SATURNO]}, scene)
    var uranoCirculo = Babylon.MeshBuilder.CreateLines("uranoCirculo", {points: orbitas[URANO]}, scene)
    var neptunoCirculo = Babylon.MeshBuilder.CreateLines("neptunoCirculo", {points: orbitas[NEPTUNO]}, scene)

    return [mercurioCirculo, venusCirculo, tierraCirculo, marteCirculo, jupiterCirculo, saturnoCirculo, uranoCirculo, neptunoCirculo]

}

/** 
 * Función que crea los paneles de información de los planetas
 * @param {Array Babylon.Mesh} planetas Array con los planetas
 * @returns {Array Babylon.GUI.Rectangle} Array con los paneles de información de los planetas
**/
export function crearPaneles(planetas) {

    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    let paneles = []

    // Crear un panel con texto para cada planeta
    for (let i = 0; i < planetas.length; i++) {

        let scrollViewer = new GUI.ScrollViewer();
        scrollViewer.width = "40%";
        scrollViewer.height = "20%";
        scrollViewer.cornerRadius = 20;
        scrollViewer.color = "white";
        scrollViewer.thickness = 4;
        scrollViewer.background = "black";
        scrollViewer.alpha = 0.8;
        scrollViewer.isVisible = false;
        advancedTexture.addControl(scrollViewer);
        scrollViewer.linkWithMesh(planetas[i]);
        scrollViewer.linkOffsetY = -130;

        // Crear un StackPanel
        let stackPanel = new GUI.StackPanel();
        stackPanel.width = "100%";
        scrollViewer.addControl(stackPanel);

        let texto = new GUI.TextBlock();

        var textoPanel = ""

        switch (planetas[i].name.toUpperCase()) {

            case "SOL":
                textoPanel = "\u2022 La gravedad del sol mantiene a todos los planetas en sus órbitas alrededor de él \n\n\u2022 El Sol también emite radiación, incluyendo luz visible, rayos X y rayos ultravioleta, que afecta a los planetas \n\n\u2022 La temperatura en su superficie es alrededor de 5,500 grados Celsius \n\n\u2022 Es el responsable de la mayor parte de la energía que recibimos en la tierra \n\n\u2022 Tiene un diametro de 1.39 millones de kilometros"
                break;

            case "MERCURIO":
                textoPanel = "\u2022 Tiene un diámetro de 4.880 kilómetros \n\n\u2022 Tarda aproximadamente 58.6 días terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 87.97 días terrestres en dar una vuelta alrededor del sol \n\n\u2022 Tiene una atmósfera muy delgada compuesta principalmente de sodio"
                break;

            case "VENUS":
                textoPanel = "\u2022 Tiene un diámetro de 2,104 kilómetros \n\n\u2022 Tarda aproximadamente 243 días terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 224.7 días terrestres en dar una vuelta alrededor del sol \n\n\u2022 Tiene una atmósfera muy densa compuesta principalmente de dióxido de carbono"
                break;

            case "TIERRA":
                textoPanel = "\u2022 Tiene un diámetro de 12,756 kilómetros \n\n\u2022 Tarda aproximadamente 23.9 horas terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 365.26 días terrestres en dar una vuelta alrededor del sol \n\n\u2022 Tiene una atmósfera compuesta principalmente de nitrógeno y oxígeno \n\n\u2022 Es el único planeta del sistema solar que tiene agua líquida en su superficie \n\n\u2022 Tiene un satélite natural llamado Luna \n\n\u2022 Es el único planeta en el sistema solar que tiene vida"
                break;

            case "LUNA":
                textoPanel = "\u2022 Tiene un diámetro de 3,474 kilómetros \n\n\u2022 Tarda aproximadamente 27.3 días terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 27.3 días terrestres en dar una vuelta alrededor de la tierra \n\n\u2022 No tiene atmósfera \n\n\u2022 Es el único satélite natural de la tierra"
                break;

            case "MARTE":
                textoPanel = "\u2022 Tiene un diámetro de 6,787 kilómetros \n\n\u2022 Tarda aproximadamente 24.6 horas terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 686.98 días terrestres en dar una vuelta alrededor del sol \n\n\u2022 Tiene una atmósfera muy delgada compuesta principalmente de dióxido de carbono \n\n\u2022 Tiene dos satélites naturales llamados Fobos y Deimos \n\n\u2022 Se le conoce como el planeta rojo debido a su superficie rica en óxido de hierro"
                break;

            case "JUPITER":
                textoPanel = "\u2022 Tiene un diámetro de 142,984 kilómetros \n\n\u2022 Tarda aproximadamente 9.9 horas terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 11.86 años terrestres en dar una vuelta alrededor del sol \n\n\u2022 Tiene una atmósfera compuesta principalmente de hidrógeno y helio \n\n\u2022 Tiene muchos satelites naturales"
                break;

            case "SATURNO":
                textoPanel = "\u2022 Tiene un diámetro de 120,536 kilómetros \n\n\u2022 Tarda aproximadamente 10.7 horas terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 29.46 años terrestres en dar una vuelta alrededor del sol \n\n\u2022 Tiene una atmósfera compuesta principalmente de hidrógeno y helio \n\n\u2022 Tiene un sistema de anillos y muchos satelites naturales"
                break;

            case "SATURNOANILLOS":
                textoPanel = "\u2022 Los anillos de Saturno están compuestos principalmente de hielo y roca \n\n\u2022 Los anillos están compuestos de miles de anillos más pequeños \n\n\u2022 Los anillos tienen un diámetro de 270,000 kilómetros \n\n\u2022 Los anillos tienen un grosor de 20 metros"
                break;

            case "URANO":
                textoPanel = "\u2022 Tiene un diámetro de 51,118 kilómetros \n\n\u2022 Tarda aproximadamente 17.2 horas terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 84.01 años terrestres en dar una vuelta alrededor del sol \n\n\u2022 Tiene una atmósfera compuesta principalmente de hidrógeno, helio y metano \n\n\u2022 Tiene 20 satelites naturales conocidos"
                break;

            case "NEPTUNO":
                textoPanel = "\u2022 Tiene un diámetro de 49,528 kilómetros \n\n\u2022 Tarda aproximadamente 16.1 horas terrestres en completar una rotación sobre su propio eje \n\n\u2022 Tarda 164.79 años terrestres en dar una vuelta alrededor del sol \n\n\u2022 Tiene una atmósfera compuesta principalmente de hidrógeno, helio y metano \n\n\u2022 Tiene 30 satelites naturales conocidos"
                break;

        }

        texto.text = textoPanel;
        texto.color = "white";
        texto.resizeToFit = true;
        texto.textWrapping = GUI.TextWrapping.WordWrap;
        texto.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        texto.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        texto.paddingTop = "5%";
        texto.paddingLeft = "5%";
        texto.paddingRight = "5%";
        texto.paddingBottom = "5%";
        stackPanel.addControl(texto);

        paneles.push(scrollViewer)

    }

    return [paneles, advancedTexture]

}

/**
 * Función que crea los botones para visitar los planetas
 * @param {Babylon.GUI.AdvancedDynamicTexture} advancedTexture Textura avanzada de Babylon
 * @param {Array Babylon.Mesh} planetas Array con los planetas
 * @returns {Array Babylon.GUI.Button} Array con los botones para visitar los planetas
**/
export function crearBotones(advancedTexture, planetas) {

        let SATURNO_ANILLOS = 8
        let LUNA = 4
    
        let controladores = []
    
        // Crear un botón para cada planeta
        for (let i = 0; i < planetas.length; i++) {

            if (i === SATURNO_ANILLOS || i === LUNA) {
                continue
            }
    
            let boton = GUI.Button.CreateSimpleButton("boton" + i);
            boton.width = "20%";
            boton.height = "7%";
            boton.textBlock.text = "Visitar " + planetas[i].name.toUpperCase()
            boton.cornerRadius = 20;
            boton.color = "white";
            boton.thickness = 4;
            boton.background = "black";
            boton.alpha = 0.8;
            boton.onPointerEnterObservable.add(function () {
                boton.background = "white";
                boton.color = "black";
            });
            boton.onPointerOutObservable.add(function () {
                boton.background = "black";
                boton.color = "white";
            });
            boton.isVisible = false;
            advancedTexture.addControl(boton);
            boton.linkWithMesh(planetas[i]);
            boton.linkOffsetY = 80;

            controladores.push(boton)
    
        }
    
        return controladores
    
}

/**
 * Función que valida si el nivel ya fue pasado y mostrar el botón de paso de nivel
 * @param {Babylon.Mesh} selectedMesh Mesh seleccionado
 * @param {Array Babylon.GUI.Button} botones Array con los botones para iniciar las pruebas de los planetas
**/
export function validarNivelPasado(selectedMesh, botones) {

    for (let i = 0; i < botones.length; i++) {

        if (botones[i].linkedMesh === selectedMesh) {

            var nivelpasado = PaginaPrincipal.getNiveles()

            if (nivelpasado[i]) {

                setPasoNivelBoton(botones[i])

            }

        }

    }

}

/**
 * Función que asocia los planetas con sus órbitas
 * @param {Array Babylon.Mesh} planetas Array con los planetas
 * @param {Array Babylon.Mesh} circulos Array con los círculos que representan las órbitas
**/
export function asociarPlanetasOrbitas(planetas, circulos) {

    let SOL = 0
    let MERCURIO = 1
    let VENUS = 2
    let TIERRA = 3
    let LUNA = 4
    let MARTE = 5
    let JUPITER = 6
    let SATURNO = 7
    let SATURNO_ANILLOS = 8
    let URANO = 9
    let NEPTUNO = 10

    let MERCURIO_CIRCULO = 0
    let VENUS_CIRCULO = 1
    let TIERRA_CIRCULO = 2
    let MARTE_CIRCULO = 3
    let JUPITER_CIRCULO = 4
    let SATURNO_CIRCULO = 5
    let URANO_CIRCULO = 6
    let NEPTUNO_CIRCULO = 7

    planetas[MERCURIO].parent = circulos[MERCURIO_CIRCULO]
    planetas[VENUS].parent = circulos[VENUS_CIRCULO]
    planetas[TIERRA].parent = circulos[TIERRA_CIRCULO]
    planetas[MARTE].parent = circulos[MARTE_CIRCULO]
    planetas[JUPITER].parent = circulos[JUPITER_CIRCULO]
    planetas[SATURNO].parent = circulos[SATURNO_CIRCULO]
    planetas[SATURNO_ANILLOS].parent = circulos[SATURNO_CIRCULO]
    planetas[URANO].parent = circulos[URANO_CIRCULO]
    planetas[NEPTUNO].parent = circulos[NEPTUNO_CIRCULO]

}

/**
 * Función que agrega un efecto de resaltado a un Mesh
 * @param {Babylon.Mesh} mesh Mesh al que se le agregará el efecto de resaltado
 * @param {Babylon.Mesh} selectedMesh Mesh que se encuentra seleccionado
 * @param {Babylon.HighlightLayer} highlightLayer Capa de resaltado de Babylon
 * @returns {Babylon.Mesh} Mesh que se encuentra seleccionado
**/
export function agregarHighLight(mesh, selectedMesh, highlightLayer) {

    if (selectedMesh) {

        selectedMesh.isSelected = false;
        highlightLayer.removeMesh(selectedMesh);

    }

    mesh.isSelected = true;
    highlightLayer.addMesh(mesh, new Babylon.Color3(255, 255, 255));
    selectedMesh = mesh;
    return selectedMesh;

}

/**
 * Función que quita un efecto de resaltado a un Mesh
 * @param {Babylon.Mesh} selectedMesh Mesh que se encuentra seleccionado
 * @param {Babylon.HighlightLayer} highlightLayer Capa de resaltado de Babylon
**/
export function quitarHighLight(selectedMesh, highlightLayer) {

    if (selectedMesh) {

        selectedMesh.isSelected = false;
        highlightLayer.removeMesh(selectedMesh);

    }

}

/**
 * Función que activa el panel de información de un Mesh
 * @param {Babylon.Mesh} selectedMesh Mesh que se encuentra seleccionado
 * @param {Array Babylon.GUI.Rectangle} paneles Array con los paneles de información
**/
export function activarPanel(selectedMesh, paneles) {

    for (let i = 0; i < paneles.length; i++) {

        if (paneles[i].linkedMesh === selectedMesh) {

            paneles[i].isVisible = true;

        } else {

            paneles[i].isVisible = false;

        }

    }

}

/**
 * Función que desactiva el panel de información de un Mesh
 * @param {Babylon.Mesh} selectedMesh Mesh que se encuentra seleccionado
 * @param {Array Babylon.GUI.Rectangle} paneles Array con los paneles de información
**/
export function desactivarPanel(selectedMesh, paneles) {

    for (let i = 0; i < paneles.length; i++) {

        if (paneles[i].linkedMesh === selectedMesh) {

            paneles[i].isVisible = false;

        }

    }

}

/**
 * Función que activa el botón para iniciar las pruebas de un Mesh
 * @param {Babylon.Mesh} selectedMesh Mesh que se encuentra seleccionado
 * @param {Array Babylon.GUI.Button} botones Array con los botones para iniciar las pruebas de los planetas
**/
export function activarBoton(selectedMesh, botones) {

    for (let i = 0; i < botones.length; i++) {

        if (botones[i].linkedMesh === selectedMesh) {

            botones[i].isVisible = true;

        } else {

            botones[i].isVisible = false;

        }

    }

}

/**
 * Función que desactiva el botón para iniciar las pruebas de un Mesh
 * @param {Babylon.Mesh} selectedMesh Mesh que se encuentra seleccionado
 * @param {Array Babylon.GUI.Button} botones Array con los botones para iniciar las pruebas de los planetas
**/
export function desactivarBoton(selectedMesh, botones) {

    for (let i = 0; i < botones.length; i++) {

        if (botones[i].linkedMesh === selectedMesh) {

            botones[i].isVisible = false;

        }

    }

}
