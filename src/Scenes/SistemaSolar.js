import * as Babylon from 'babylonjs'
import * as GUI from 'babylonjs-gui';

import * as PaginaPrincipal from "./index";

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

export function obtenerIndexEscenaPlaneta(planeta) {

    let escenaPlaneta = null

    switch (planeta) {

        case "SOL":
            escenaPlaneta = 1
            break;

        case "MERCURIO":
            escenaPlaneta = 2
            break;

        case "VENUS":
            escenaPlaneta = 3
            break;

        case "TIERRA":
            escenaPlaneta = 4
            break;

        case "LUNA":
            //
            break;

        case "MARTE":
            escenaPlaneta = 5
            break;

        case "JUPITER":
            escenaPlaneta = 6
            break;

        case "SATURNO":
            escenaPlaneta = 7
            break;

        case "SATURNOANILLOS":
            // 
            break;

        case "URANO":
            escenaPlaneta = 8
            break;

        case "NEPTUNO":
            escenaPlaneta = 9
            break;

    }

    return escenaPlaneta

}

/**
 * Función para crear los planetas del sistema solar
 * @param {Babylon.Scene} scene la escena de Babylon
 * @returns {Babylon.Mesh} Array con los planetas del sistema solar
**/
export function crearPlanetas(scene) {

    const sol = Babylon.MeshBuilder.CreateSphere("sol", {diameter: 1.3}, scene)
    sol.position.set(0, 1, 0)
    let solMaterial = new Babylon.StandardMaterial("solMaterial", scene)
    solMaterial.diffuseTexture = new Babylon.Texture(sol_img, scene)
    solMaterial.emissiveColor = new Babylon.Color3(1, 1, 1)
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

        let panel = new GUI.Rectangle("panel" + i);
        panel.width = "300px";
        panel.height = "150px";
        panel.cornerRadius = 20;
        panel.color = "white";
        panel.thickness = 4;
        panel.background = "black";
        panel.alpha = 0.8;
        panel.isVisible = false;
        advancedTexture.addControl(panel);
        panel.linkWithMesh(planetas[i]);
        panel.linkOffsetY = -120;

        let texto = new GUI.TextBlock();

        var textoPanel = ""

        switch (planetas[i].name.toUpperCase()) {

            case "SOL":
                textoPanel = "El Sol es una bola gigante de gas incandescente compuesto principalmente de hidrógeno y helio. En el centro del Sol, la presión y la temperatura son tan altas que los átomos de hidrógeno se fusionan para formar helio, liberando energía en el proceso. Esta reacción nuclear es lo que mantiene al Sol caliente y brillante, y es responsable de la mayor parte de la energía que recibimos en la Tierra."
                break;

            case "MERCURIO":
                textoPanel = "Es el planeta más cercano al Sol y el más pequeño del sistema solar. Tiene una superficie muy arrugada debido a la contracción térmica y no tiene atmósfera."
                break;

            case "VENUS":
                textoPanel = "Es el segundo planeta del sistema solar y es conocido como el planeta gemelo de la Tierra, ya que tiene un tamaño y una masa similar. Sin embargo, su superficie es extremadamente caliente debido al efecto invernadero y su atmósfera es muy densa, principalmente compuesta de dióxido de carbono."
                break;

            case "TIERRA":
                textoPanel = "Es el tercer planeta del sistema solar y el único conocido que tiene vida. Tiene una atmósfera rica en oxígeno y una temperatura y presión ideales para la vida. Además, es el único planeta del sistema solar que tiene agua líquida en su superficie."
                break;

            case "LUNA":
                textoPanel = "La luna es el único satélite natural de la Tierra y es el quinto satélite más grande del sistema solar."
                break;

            case "MARTE":
                textoPanel = "Es el cuarto planeta del sistema solar y es conocido como el planeta rojo debido a su superficie rocosa. Tiene una atmósfera delgada y fría y su superficie está llena de cráteres y volcanes. Es posible que en el pasado haya tenido agua líquida en su superficie."
                break;

            case "JUPITER":
                textoPanel = "Es el planeta más grande del sistema solar y tiene una atmósfera muy colorida y turbulenta, principalmente compuesta de hidrógeno y helio. Tiene muchas lunas, siendo las más conocidas Io, Europa, Ganímedes y Calisto."
                break;

            case "SATURNO":
                textoPanel = "Es el segundo planeta más grande del sistema solar y es conocido por sus espectaculares anillos. Tiene una atmósfera similar a la de Júpiter y también tiene muchas lunas."
                break;

            case "SATURNOANILLOS":
                textoPanel = "Los anillos de Saturno son un fenómeno fascinante del sistema solar. A pesar de que están compuestos principalmente de pequeñas partículas de hielo y roca, los anillos tienen una enorme masa que se estima en más de 3 x 10^19 kilogramos."
                break;

            case "URANO":
                textoPanel = "Es el séptimo planeta del sistema solar y tiene una atmósfera similar a la de Júpiter y Saturno, principalmente compuesta de hidrógeno y helio. Tiene un sistema de anillos y muchas lunas."
                break;

            case "NEPTUNO":
                textoPanel = "Es el octavo y último planeta del sistema solar y tiene una atmósfera similar a la de Urano. También tiene un sistema de anillos y muchas lunas, siendo la más conocida Tritón."
                break;

        }

        texto.text = textoPanel;
        texto.color = "white";
        texto.fontSize = 12;
        texto.textWrapping = true;
        panel.addControl(texto);

        paneles.push(panel)

    }

    return [paneles, advancedTexture]

}

/**
 * Función que crea los botones para iniciar las pruebas de los planetas
 * @param {Babylon.GUI.AdvancedDynamicTexture} advancedTexture Textura avanzada de Babylon
 * @param {Array Babylon.Mesh} planetas Array con los planetas
 * @returns {Array Babylon.GUI.Button} Array con los botones para iniciar las pruebas de los planetas
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
            boton.width = "250px";
            boton.height = "80px";
            boton.textBlock.text = "Iniciar prueba de " + planetas[i].name.toUpperCase()
            boton.cornerRadius = 20;
            boton.color = "white";
            boton.thickness = 4;
            boton.background = "black";
            boton.alpha = 0.8;
            boton.paddingTop = "10px";
            boton.paddingBottom = "10px";
            boton.paddingLeft = "10px";
            boton.paddingRight = "10px";
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

export function validarNivelPasadoBoton(selectedMesh, botones) {

    for (let i = 0; i < botones.length; i++) {

        if (botones[i].linkedMesh === selectedMesh) {

            var nivelpasado = PaginaPrincipal.getNiveles()

            if (nivelpasado[i]) {

                botones[i].isEnabled = false
                botones[i].color = "green"
                botones[i].background = "green"
                botones[i].textBlock.color = "white"
                botones[i].textBlock.text = "¡Nivel pasado!"

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

            botones[i].onPointerClickObservable.clear();

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
