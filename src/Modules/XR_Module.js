import * as BABYLON from "babylonjs"
import * as GUI from "babylonjs-gui"

/**
   * Module to start XR functionalities (with auto XR mode detection).
   * @param {BABYLON.Mesh} ground the instanced babylon js ground.
   * @param {BABYLON.Mesh} skybox the instanced babylon js skybox.
   * @param {BABYLON.Scene} scene the instanced babylon js scene.
   * @returns the promised XR default experience instance.
**/
export async function XR_Experience(ground, skybox, scene) {

    let inmersive_state = "inline"
    let reference_floor = "local-floor"

    let avaliableVR = await BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-vr")
    let avaliableAR = await BABYLON.WebXRSessionManager.IsSessionSupportedAsync("immersive-ar")

    console.log("AR mode avaliable: " + avaliableAR)
    console.log("VR mode avaliable: " + avaliableVR)

    if (avaliableVR) {

        inmersive_state = "immersive-vr"

        if (avaliableAR) {

            inmersive_state = "immersive-ar"

        }

    }

    const xr = scene.createDefaultXRExperienceAsync({

        disableDefaultUI: true,
        disableNearInteraction: true,
        disablePointerSelection: false,
        disableTeleportation: true,
        optionalFeatures: true,

        floorMeshes: [ground],

        uiOptions: {

            sessionMode: inmersive_state,
            referenceSpaceType: reference_floor

        },

        inputOptions: {
        
            doNotLoadControllerMeshes: false,
        
        }

    })

    return xr.then((xrExperience) => {

        xrExperience.baseExperience.onStateChangedObservable.add((XRstate) => {

            if (avaliableVR) {

                switch (XRstate) {

                    case BABYLON.WebXRState.IN_XR:
                        // XR is initialized and already submitted one frame
                    break
                    case BABYLON.WebXRState.ENTERING_XR:
                        // xr is being initialized, enter XR request was made
                    break
                    case BABYLON.WebXRState.EXITING_XR:
                        // xr exit request was made. not yet done.
                    break
                    case BABYLON.WebXRState.NOT_IN_XR:
                        // self explanatory - either out or not yet in XR
                    break

                }

            }

            if (avaliableAR) {

                switch (XRstate) {

                    case BABYLON.WebXRState.IN_XR:
                        // XR is initialized and already submitted one frame
                    break
                    case BABYLON.WebXRState.ENTERING_XR:
                        // xr is being initialized, enter XR request was made
                        if (ground) {

                            ground.visibility = 0

                        }

                        if (skybox) {

                            skybox.isVisible = false

                        }

                    break
                    case BABYLON.WebXRState.EXITING_XR:
                        // xr exit request was made. not yet done.
                    break
                    case BABYLON.WebXRState.NOT_IN_XR:
                        // self explanatory - either out or not yet in XR
                        if (ground) {

                            ground.visibility = 1

                        }

                        if (skybox) {

                            skybox.isVisible = true

                        }
                        
                    break

                }

            }

        })

        var advancedTextureFullScreen = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene)

        var btnModoXR = GUI.Button.CreateSimpleButton("btnModoXR", "Entrar a modo AR")
        btnModoXR.width = "200px"
        btnModoXR.height = "40px"
        btnModoXR.color = "white"
        btnModoXR.cornerRadius = 20
        btnModoXR.background = "blue"
        btnModoXR.fontSize = "20px"
        btnModoXR.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT
        btnModoXR.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
        btnModoXR.topInPixels = -5
        btnModoXR.leftInPixels =-5

        btnModoXR.onPointerUpObservable.add(function () {

            if (xrExperience.baseExperience.state === BABYLON.WebXRState.NOT_IN_XR) {

                xrExperience.baseExperience.enterXRAsync(inmersive_state, reference_floor)
                btnModoXR.textBlock.text = "Entrar a modo VR"

            } else if (xrExperience.baseExperience.state === BABYLON.WebXRState.IN_XR) {

                xrExperience.baseExperience.exitXRAsync()
                btnModoXR.textBlock.text = "Entrar a modo AR"

            }

        })

        advancedTextureFullScreen.addControl(btnModoXR)

        return [xrExperience, btnModoXR]

    })

}
