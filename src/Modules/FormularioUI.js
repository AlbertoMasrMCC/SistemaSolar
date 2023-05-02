import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

/**
 * 
 * @param {String} name Nombre de la ventana
 * @param {String} question Pregunta a mostrar
 * @param {Array} answers Respuestas a mostrar
 * @param {Integer} correct_answer Indice de la respuesta correcta
 * @param {Babylon.Scene} scene Escena de Babylon
 * @param {Boolean} ultima_pregunta Indica si es la última pregunta
 * @returns {Babylon.Mesh} Ventana con la pregunta y respuestas
**/
function FormularioUI(name, question, answers, correct_answer, scene, ultima_pregunta) {

    var width = 1920
    var height = 1080

    // status bar
    var barMesh = BABYLON.MeshBuilder.CreatePlane("windown_plane"+ name, {
        width: width*0.001  ,
        height: 150*0.001,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    // Inicializamos el metadata
    barMesh.metadata = {
        customData: {
        }
      };

    var bar_texture = GUI.AdvancedDynamicTexture.CreateForMesh(barMesh);
    bar_texture.scaleTo(width, 150);

    var bar_rectangle = new GUI.Rectangle("container"+ name);

    bar_rectangle.cornerRadius = 20;
    bar_rectangle.color = "#2acaea";
    bar_rectangle.thickness = 7;
    bar_rectangle.background = '#00000066';

    var bar_grid = new GUI.Grid("bar_grid"+ name)
    bar_grid.addRowDefinition(1);
    bar_grid.addColumnDefinition(.77,false);

    const win_text_name = new GUI.TextBlock("bar_text_name"+ name);
    win_text_name.fontFamily = "Helvetica";
    win_text_name.text = name;
    win_text_name.color = "white";
    win_text_name.fontSize = 50;
    win_text_name.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    win_text_name.paddingLeftInPixels = 15;

    bar_grid.addControl(win_text_name, 0, 0);

    bar_rectangle.addControl(bar_grid);
    bar_texture.addControl(bar_rectangle);

    // contenido
    var windowMesh = BABYLON.MeshBuilder.CreatePlane("FormularioUI"+ name, {
        width: width * (0.001),
        height: height * (0.001),
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    // Inicializamos el metadata
    windowMesh.metadata = {
        customData: {
        }
      };

    var ajust_pos = windowMesh.getBoundingInfo().boundingBox.maximum.y + barMesh.getBoundingInfo().boundingBox.maximum.y
    var change_axis = new BABYLON.Vector3(0, -ajust_pos, .02);

    var local_pos = new BABYLON.Vector3(0, 0.5, 0);
    barMesh.position = local_pos;

    windowMesh.parent = barMesh;
    windowMesh.position = change_axis;

    var window_texture =  GUI.AdvancedDynamicTexture.CreateForMesh(windowMesh);
    window_texture.scaleTo(width, height);

    var window_rectangle = new GUI.Rectangle("Rectangle"+ name);
    window_rectangle.background = "#ffffffd9";
    window_rectangle.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    window_rectangle.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var windows_grid = new GUI.Grid("win_grid")
    windows_grid.addRowDefinition(1, false);
    windows_grid.addRowDefinition(0.8, false);
    windows_grid.addRowDefinition(0.3, false);

    // Sección de preguntas
    var windows_question_grid = new GUI.Grid("win_quest_grid"+ name)
    windows_question_grid.addRowDefinition(1, false);

    var texto_pregunta = new GUI.TextBlock("win_quest_text"+ name);
    texto_pregunta.fontFamily = "Helvetica";
    texto_pregunta.text = question;
    texto_pregunta.color = "black";
    texto_pregunta.fontSize = 70;
    texto_pregunta.paddingLeftInPixels = 15;
    texto_pregunta.paddingRightInPixels = 15;
    texto_pregunta.paddingTopInPixels = 15;
    texto_pregunta.paddingBottomInPixels = 15;
    texto_pregunta.textWrapping = true;

    windows_question_grid.addControl(texto_pregunta, 0, 0);

    // Sección de respuestas
    var windows_answer_grid = new GUI.Grid("win_answ_grid"+ name)
    windows_answer_grid.addRowDefinition(0.2, false);
    windows_answer_grid.addRowDefinition(0.8, false);
    windows_answer_grid.addColumnDefinition(1, false);
    windows_answer_grid.addColumnDefinition(1, false);
    windows_answer_grid.addColumnDefinition(1, false);
    windows_answer_grid.addColumnDefinition(1, false);

    // almacenamos la respuesta correcta
    var selected_answer;

    // Crear un radio button para cada respuesta
    var raddio_button_1 = new GUI.RadioButton("radio_button_1"+ name);
    raddio_button_1.width = "80px";
    raddio_button_1.height = "80px";
    raddio_button_1.color = "white";
    raddio_button_1.isChecked = false;
    raddio_button_1.text = answers[0];
    raddio_button_1.value = 0
    raddio_button_1.group = "answers";
    raddio_button_1.onIsCheckedChangedObservable.add(function (state) {
        if (state) {
            console.log("Se seleccióno la respuesta "+ answers[0]);
            selected_answer = 0;
            habilitarBoton();
        }
    });

    var text_radio_button_1 = new GUI.TextBlock("text_radio_button_1"+ name);
    text_radio_button_1.text = answers[0];
    text_radio_button_1.color = "black";
    text_radio_button_1.fontSize = 50;
    text_radio_button_1.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    text_radio_button_1.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    text_radio_button_1.paddingLeftInPixels = 15;
    text_radio_button_1.paddingRightInPixels = 15;
    text_radio_button_1.paddingTopInPixels = 15;
    text_radio_button_1.paddingBottomInPixels = 15;
    text_radio_button_1.textWrapping = true;

    windows_answer_grid.addControl(raddio_button_1, 0, 0);
    windows_answer_grid.addControl(text_radio_button_1, 1, 0);

    var raddio_button_2 = new GUI.RadioButton("radio_button_2"+ name);
    raddio_button_2.width = "80px";
    raddio_button_2.height = "80px";
    raddio_button_2.color = "white";
    raddio_button_2.isChecked = false;
    raddio_button_2.text = answers[1];
    raddio_button_2.value = 1
    raddio_button_2.group = "answers";
    raddio_button_2.onIsCheckedChangedObservable.add(function (state) {
        if (state) {
            console.log("Se seleccióno la respuesta "+ answers[1]);
            selected_answer = 1;
            habilitarBoton();
        }
    });

    var text_radio_button_2 = new GUI.TextBlock("text_radio_button_2"+ name);
    text_radio_button_2.text = answers[1];
    text_radio_button_2.color = "black";
    text_radio_button_2.fontSize = 50;
    text_radio_button_2.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    text_radio_button_2.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    text_radio_button_2.paddingLeftInPixels = 15;
    text_radio_button_2.paddingRightInPixels = 15;
    text_radio_button_2.paddingTopInPixels = 15;
    text_radio_button_2.paddingBottomInPixels = 15;
    text_radio_button_2.textWrapping = true;

    windows_answer_grid.addControl(raddio_button_2, 0, 1);
    windows_answer_grid.addControl(text_radio_button_2, 1, 1);

    var raddio_button_3 = new GUI.RadioButton("radio_button_3"+ name);
    raddio_button_3.width = "80px";
    raddio_button_3.height = "80px";
    raddio_button_3.color = "white";
    raddio_button_3.isChecked = false;
    raddio_button_3.text = answers[2];
    raddio_button_3.value = 2
    raddio_button_3.group = "answers";
    raddio_button_3.onIsCheckedChangedObservable.add(function (state) {
        if (state) {
            console.log("Se seleccióno la respuesta "+ answers[2]);
            selected_answer = 2;
            habilitarBoton();
        }
    });

    var text_radio_button_3 = new GUI.TextBlock("text_radio_button_3"+ name);
    text_radio_button_3.text = answers[2];
    text_radio_button_3.color = "black";
    text_radio_button_3.fontSize = 50;
    text_radio_button_3.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    text_radio_button_3.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    text_radio_button_3.paddingLeftInPixels = 15;
    text_radio_button_3.paddingRightInPixels = 15;
    text_radio_button_3.paddingTopInPixels = 15;
    text_radio_button_3.paddingBottomInPixels = 15;
    text_radio_button_3.textWrapping = true;

    windows_answer_grid.addControl(raddio_button_3, 0, 2);
    windows_answer_grid.addControl(text_radio_button_3, 1, 2);

    var raddio_button_4 = new GUI.RadioButton("radio_button_4"+ name);
    raddio_button_4.width = "80px";
    raddio_button_4.height = "80px";
    raddio_button_4.color = "white";
    raddio_button_4.isChecked = false;
    raddio_button_4.text = answers[3];
    raddio_button_4.value = 3
    raddio_button_4.group = "answers";
    raddio_button_4.onIsCheckedChangedObservable.add(function (state) {
        if (state) {
            console.log("Se seleccióno la respuesta "+ answers[3]);
            selected_answer = 3;
            habilitarBoton();
        }
    });

    var text_radio_button_4 = new GUI.TextBlock("text_radio_button_4"+ name);
    text_radio_button_4.text = answers[3];
    text_radio_button_4.color = "black";
    text_radio_button_4.fontSize = 50;
    text_radio_button_4.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    text_radio_button_4.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    text_radio_button_4.paddingLeftInPixels = 15;
    text_radio_button_4.paddingRightInPixels = 15;
    text_radio_button_4.paddingTopInPixels = 15;
    text_radio_button_4.paddingBottomInPixels = 15;
    text_radio_button_4.textWrapping = true;

    windows_answer_grid.addControl(raddio_button_4, 0, 3);
    windows_answer_grid.addControl(text_radio_button_4, 1, 3);

    var windows_control_grid = new GUI.Grid("win_contr_grid"+ name);
    windows_control_grid.addRowDefinition(1, false);
    windows_control_grid.addColumnDefinition(1, false);
    windows_control_grid.addColumnDefinition(1, false);
    windows_control_grid.addColumnDefinition(1, false);
    windows_control_grid.addColumnDefinition(1, false);
    windows_control_grid.addColumnDefinition(1, false);

    // Botón para ultima pregunta
    var btn_end = GUI.Button.CreateSimpleButton("but_end"+ name, "Finalizar");
    btn_end.color = "white";
    btn_end.background = "green";
    btn_end.fontSize = 60;
    btn_end.isVisible = false;
    btn_end.onPointerUpObservable.add(function() {
        validarRespuesta();
    });
    windows_control_grid.addControl(btn_end, 0, 2);
    
    // Botón para siguiente pregunta
    var btn_next = GUI.Button.CreateSimpleButton("but_next"+ name, "Siguiente");
    btn_next.color = "white";
    btn_next.background = "green";
    btn_next.fontSize = 60;
    btn_next.isVisible = false;
    btn_next.onPointerUpObservable.add(function() {
        validarRespuesta();
    });
    windows_control_grid.addControl(btn_next, 0, 4);

    windows_grid.addControl(windows_question_grid, 0, 0);
    windows_grid.addControl(windows_answer_grid, 1, 0);
    windows_grid.addControl(windows_control_grid, 2, 0);

    window_rectangle.addControl(windows_grid);
    window_texture.addControl(window_rectangle);

    function habilitarBoton() {

        if(ultima_pregunta)
            btn_end.isVisible = true;
        else
            btn_next.isVisible = true;

    }

    function validarRespuesta() {

        // Acceder a la metadata existente
        var metadata = windowMesh.metadata;

        if(selected_answer === correct_answer) {

            // Modificar algún valor en la metadata
            metadata.pasonivel = true;

        }
        else {

            // Modificar algún valor en la metadata
            metadata.pasonivel = false;

        }

        // Actualizar la metadata del objeto MeshBuilder
        windowMesh.metadata = metadata;

    }

    barMesh.isVisible = false;
    windowMesh.isVisible = false;
    bar_rectangle.isVisible = false;
    window_rectangle.isVisible = false;

    return {barMesh, bar_rectangle, windowMesh, window_rectangle, btn_next, btn_end}

}

/**
 * 
 * @param {*} preguntas_respuestas_escena Preguntas y respuestas de la escena actual
 * @param {*} scene Escena actual
 * @returns {Array Babylon} Arreglo con las ventanas de preguntas y respuestas
**/
export function FormulariosUI(preguntas_respuestas_escena, scene) {

    var ventanas = [];

    for(var i = 0; i <= preguntas_respuestas_escena["test"].length - 1 ; i++) {

        var ultima_pregunta = i === preguntas_respuestas_escena["test"].length - 1 ? true : false;

        var ventana = FormularioUI("Pregunta "+ (i + 1), preguntas_respuestas_escena["test"][i]["question"], preguntas_respuestas_escena["test"][i]["answers"], preguntas_respuestas_escena["test"][i]["correctAnswer"], scene, ultima_pregunta);

        ventanas.push(ventana);

    }

    return ventanas;

}
