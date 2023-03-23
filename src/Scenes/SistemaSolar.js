import * as Babylon from 'babylonjs'

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

export function crearPlanetas(scene) {

    var degrees_to_radians = function(degrees) {
        return degrees * (Math.PI / 180)
    }

    const sol = Babylon.MeshBuilder.CreateSphere("sol", {diameter: 1.3}, scene)
    sol.position.set(0, 1, 0)
    let solMaterial = new Babylon.StandardMaterial("solMaterial", scene)
    solMaterial.diffuseTexture = new Babylon.Texture(sol_img, scene)
    solMaterial.emissiveColor = new Babylon.Color3(1, 1, 1)
    sol.material = solMaterial
    sol.rotation.y = degrees_to_radians(90)
    sol.XRpickable = true

    const mercurio = Babylon.MeshBuilder.CreateSphere("mercurio", {diameter: 0.1}, scene)
    mercurio.position.set(1, 1, 0)
    let mercurioMaterial = new Babylon.StandardMaterial("mercurioMaterial", scene)
    mercurioMaterial.diffuseTexture = new Babylon.Texture(mercurio_img, scene)
    mercurio.material = mercurioMaterial
    mercurio.rotation.x = degrees_to_radians(0.1)
    mercurio.rotation.y = degrees_to_radians(90)
    mercurio.XRpickable = true

    const venus = Babylon.MeshBuilder.CreateSphere("venus", {diameter: 0.18}, scene)
    venus.position.set(2, 1, 0)
    let venusMaterial = new Babylon.StandardMaterial("venusMaterial", scene)
    venusMaterial.diffuseTexture = new Babylon.Texture(venus_img, scene)
    venus.material = venusMaterial
    mercurio.rotation.x = degrees_to_radians(177)
    venus.rotation.y = degrees_to_radians(90)
    venus.XRpickable = true

    const tierra = Babylon.MeshBuilder.CreateSphere("tierra", {diameter: 0.25}, scene)
    tierra.position.set(3, 1, 0)
    let tierraMaterial = new Babylon.StandardMaterial("tierraMaterial", scene)
    tierraMaterial.diffuseTexture = new Babylon.Texture(tierra_img, scene)
    tierra.material = tierraMaterial
    tierra.rotation.x = degrees_to_radians(23.5)
    tierra.rotation.y = degrees_to_radians(90)
    tierra.rotation.z = degrees_to_radians(180)
    tierra.XRpickable = true

    const luna = Babylon.MeshBuilder.CreateSphere("luna", {diameter: 0.05}, scene)
    luna.position.set(3.3, 1, 0)
    let lunaMaterial = new Babylon.StandardMaterial("lunaMaterial", scene)
    lunaMaterial.diffuseTexture = new Babylon.Texture(luna_img, scene)
    luna.material = lunaMaterial
    luna.XRpickable = true

    const marte = Babylon.MeshBuilder.CreateSphere("marte", {diameter: 0.18}, scene)
    marte.position.set(4, 1, 0)
    let marteMaterial = new Babylon.StandardMaterial("marteMaterial", scene)
    marteMaterial.diffuseTexture = new Babylon.Texture(marte_img, scene)
    marte.material = marteMaterial
    marte.rotation.x = degrees_to_radians(25)
    marte.rotation.y = degrees_to_radians(90)
    marte.XRpickable = true

    const jupiter = Babylon.MeshBuilder.CreateSphere("jupiter", {diameter: 0.7}, scene)
    jupiter.position.set(5, 1, 0)
    let jupiterMaterial = new Babylon.StandardMaterial("jupiterMaterial", scene)
    jupiterMaterial.diffuseTexture = new Babylon.Texture(jupiter_img, scene)
    jupiter.material = jupiterMaterial
    jupiter.rotation.x = degrees_to_radians(3)
    jupiter.rotation.y = degrees_to_radians(90)
    jupiter.XRpickable = true

    const saturno = Babylon.MeshBuilder.CreateSphere("saturno", {diameter: 0.5}, scene)
    saturno.position.set(6, 1, 0)
    let saturnoMaterial = new Babylon.StandardMaterial("saturnoMaterial", scene)
    saturnoMaterial.diffuseTexture = new Babylon.Texture(saturno_img, scene)
    saturno.material = saturnoMaterial
    saturno.rotation.x = degrees_to_radians(-27)
    saturno.rotation.y = degrees_to_radians(90)
    saturno.XRpickable = true

    const saturnoAnillos = Babylon.MeshBuilder.CreateTorus("saturnoAnillos", {diameter: 0.8, thickness: 0.2, tessellation: 10}, scene)
    saturnoAnillos.scaling = new Babylon.Vector3(1, 0.001, 1)
    let saturnoAnillosMaterial = new Babylon.StandardMaterial("saturnoAnillosMaterial", scene)
    saturnoAnillosMaterial.diffuseTexture = new Babylon.Texture(saturno_anillos_img, scene)
    saturnoAnillos.rotation.x = degrees_to_radians(-27)
    saturnoAnillos.material = saturnoAnillosMaterial
    saturnoAnillos.position.set(6, 1, 0)
    saturnoAnillos.XRpickable = true

    const urano = Babylon.MeshBuilder.CreateSphere("urano", {diameter: 0.5}, scene)
    urano.position.set(7, 1, 0)
    let uranoMaterial = new Babylon.StandardMaterial("uranoMaterial", scene)
    uranoMaterial.diffuseTexture = new Babylon.Texture(urano_img, scene)
    urano.material = uranoMaterial
    urano.rotation.x = degrees_to_radians(98)
    urano.rotation.y = degrees_to_radians(90)
    urano.XRpickable = true

    const neptuno = Babylon.MeshBuilder.CreateSphere("neptuno", {diameter: 0.4}, scene)
    neptuno.position.set(8, 1, 0)
    let neptunoMaterial = new Babylon.StandardMaterial("neptunoMaterial", scene)
    neptunoMaterial.diffuseTexture = new Babylon.Texture(neptuno_img, scene)
    neptuno.material = neptunoMaterial
    neptuno.rotation.x = degrees_to_radians(28)
    neptuno.rotation.y = degrees_to_radians(90)
    neptuno.XRpickable = true

    return [sol, mercurio, venus, tierra, luna, marte, jupiter, saturno, saturnoAnillos, urano, neptuno]

}

export function crearOrbitas(scene) {

    var mercurioOrbita = []
    var n = 880 // numero de puntos
    var r = 1 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        mercurioOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    mercurioOrbita.push(mercurioOrbita[0])

    var venusOrbita = []
    var n = 1270 // numero de puntos
    var r = 2 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        venusOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    venusOrbita.push(venusOrbita[0])

    var tierraOrbita = []
    var n = 1210 // numero de puntos
    var r = 3 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        tierraOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    tierraOrbita.push(tierraOrbita[0])

    var marteOrbita = []
    var n = 1710 // numero de puntos
    var r = 4 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        marteOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    marteOrbita.push(marteOrbita[0])

    var jupiterOrbita = []
    var n = 8660 // numero de puntos
    var r = 5 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        jupiterOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    jupiterOrbita.push(jupiterOrbita[0])

    var saturnoOrbita = []
    var n = 17920 // numero de puntos
    var r = 6 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        saturnoOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    saturnoOrbita.push(saturnoOrbita[0])

    var uranoOrbita = []
    var n = 43800 // numero de puntos
    var r = 7 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        uranoOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    uranoOrbita.push(uranoOrbita[0])

    var neptunoOrbita = []
    var n = 75190 // numero de puntos
    var r = 8 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        neptunoOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    neptunoOrbita.push(neptunoOrbita[0])

    return [mercurioOrbita, venusOrbita, tierraOrbita, marteOrbita, jupiterOrbita, saturnoOrbita, uranoOrbita, neptunoOrbita]

}

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

export function asociarPlanetasOrbitas(planetas, orbitas, circulos) {

    // Planetas meshes
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

    // Circulos meshes
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