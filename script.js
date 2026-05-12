// =======================================
// 🤖 RECONOCIMIENTO DE COMPONENTES CON IA
// =======================================

// URL DEL MODELO
const URL_MODELO =
"https://teachablemachine.withgoogle.com/models/65JkNhE9N/";

let model, webcam, labelContainer, maxPredictions;

let codigoActual = "";

// =======================================
// INICIAR IA
// =======================================

async function init() {

    try {

        const modelURL =
            URL_MODELO + "model.json";

        const metadataURL =
            URL_MODELO + "metadata.json";

        // CARGAR MODELO
        model = await tmImage.load(
            modelURL,
            metadataURL
        );

        maxPredictions =
            model.getTotalClasses();

        document.getElementById(
            "modo-aviso"
        ).innerHTML =
            "✅ IA activada correctamente";

        // =========================
        // CÁMARA
        // =========================

        const flip = true;

        webcam =
            new tmImage.Webcam(
                300,
                300,
                flip
            );

        await webcam.setup();

        await webcam.play();

        window.requestAnimationFrame(loop);

        // MOSTRAR CÁMARA
        const webcamContainer =
            document.getElementById(
                "webcam-container"
            );

        webcamContainer.innerHTML = "";

        webcamContainer.appendChild(
            webcam.canvas
        );

        // LABELS
        labelContainer =
            document.getElementById(
                "label-container"
            );

    }

    catch (error) {

        console.error(error);

        document.getElementById(
            "modo-aviso"
        ).innerHTML =
            "❌ Error al iniciar IA";
    }
}

// =======================================
// LOOP
// =======================================

async function loop() {

    webcam.update();

    await predict();

    window.requestAnimationFrame(loop);
}

// =======================================
// PREDICCIÓN
// =======================================

async function predict() {

    const prediction =
        await model.predict(
            webcam.canvas
        );

    prediction.sort(
        (a, b) =>
            b.probability -
            a.probability
    );

    const mejor =
        prediction[0];

    const porcentaje =
        (
            mejor.probability * 100
        ).toFixed(1);

    labelContainer.innerHTML = `

        <div class="resultado-ia">

            🔍 Detectado:
            <b>${mejor.className}</b>

            <br>

            Precisión:
            ${porcentaje}%

        </div>
    `;

    // SI LA IA ESTÁ SEGURA
    if (mejor.probability > 0.70) {

        mostrarFicha(
            mejor.className
        );
    }
}

// =======================================
// MOSTRAR FICHA TÉCNICA
// =======================================

function mostrarFicha(componente) {

    // convertir a minúsculas
    componente =
        componente.toLowerCase();

    const fichas = {

        // ===================================
        // LED
        // ===================================

        "led": {

            nombre:
                "LED",

            origen:
                "1962",

            curiosidad:
                "Consume muy poca energía",

            polaridad:
                "Pata larga positiva",

            voltaje:
                "2V aproximados",

            usos:
                "Luces e indicadores",

            imagen:
                "imagenes/led.png"
        },

        // ===================================
        // RESISTENCIA
        // ===================================

        "resistencia": {

            nombre:
                "Resistencia",

            origen:
                "Ley de Ohm",

            curiosidad:
                "Tiene bandas de colores",

            polaridad:
                "No tiene",

            voltaje:
                "Depende del circuito",

            usos:
                "Limitar corriente",

            imagen:
                "imagenes/resistencia.png"
        },

        // ===================================
        // ESP32
        // ===================================

        "esp32": {

            nombre:
                "ESP32",

            origen:
                "Espressif Systems",

            curiosidad:
                "Tiene WiFi y Bluetooth",

            polaridad:
                "Usa 3.3V",

            voltaje:
                "3.3V",

            usos:
                "IoT y robótica",

            imagen:
                "imagenes/esp32.png"
        },

        // ===================================
        // TRANSISTOR
        // ===================================

        "transistor": {

            nombre:
                "Transistor",

            origen:
                "1947",

            curiosidad:
                "Puede amplificar señales",

            polaridad:
                "Tiene Base, Colector y Emisor",

            voltaje:
                "Variable",

            usos:
                "Interruptores electrónicos",

            imagen:
                "imagenes/transistor.png"
        },

        // ===================================
        // CONDENSADOR
        // ===================================

        "condensador": {

            nombre:
                "Condensador",

            origen:
                "1745",

            curiosidad:
                "Almacena energía eléctrica",

            polaridad:
                "Algunos sí tienen polaridad",

            voltaje:
                "Variable",

            usos:
                "Filtrar energía",

            imagen:
                "imagenes/condensador.png"
        },

        // ===================================
        // POTENCIÓMETRO
        // ===================================

        "potenciometro": {

            nombre:
                "Potenciómetro",

            origen:
                "Electrónica analógica",

            curiosidad:
                "Funciona girando una perilla",

            polaridad:
                "3 terminales",

            voltaje:
                "Variable",

            usos:
                "Controlar volumen o velocidad",

            imagen:
                "imagenes/potenciometro.png"
        },

        // ===================================
        // SENSOR HC-SR04
        // ===================================

        "sensor hc-sr04": {

            nombre:
                "Sensor Ultrasónico",

            origen:
                "Sensores ultrasónicos",

            curiosidad:
                "Usa sonido para medir distancia",

            polaridad:
                "Pines VCC y GND",

            voltaje:
                "5V",

            usos:
                "Medir distancia",

            imagen:
                "imagenes/hcsr04.png"
        },

        // ===================================
        // DISPLAY LCD
        // ===================================

        "display lcd 16x2": {

            nombre:
                "LCD 16x2",

            origen:
                "Pantallas LCD",

            curiosidad:
                "Puede mostrar texto",

            polaridad:
                "Tiene VCC y GND",

            voltaje:
                "5V",

            usos:
                "Mostrar información",

            imagen:
                "imagenes/lcd.png"
        },

        // ===================================
        // RELEVADOR
        // ===================================

        "relevador": {

            nombre:
                "Relay 5V",

            origen:
                "Automatización",

            curiosidad:
                "Controla dispositivos grandes",

            polaridad:
                "Tiene NO, NC y COM",

            voltaje:
                "5V",

            usos:
                "Controlar motores o lámparas",

            imagen:
                "imagenes/rele.png"
        },

        // ===================================
        // PROTOBOARD
        // ===================================

        "protoboard": {

            nombre:
                "Protoboard",

            origen:
                "Prototipado electrónico",

            curiosidad:
                "No necesita soldadura",

            polaridad:
                "No tiene",

            voltaje:
                "Depende del circuito",

            usos:
                "Conectar componentes",

            imagen:
                "imagenes/protoboard.png"
        }
    };

    const infoDiv =
        document.getElementById(
            "info-componente"
        );

    // SI EXISTE
    if (fichas[componente]) {

        const ficha =
            fichas[componente];

        infoDiv.innerHTML = `

            <div class="ficha-activa">

                <h3>
                    🔧 ${ficha.nombre}
                </h3>

                <img
                    src="${ficha.imagen}"

                    style="
                        width:180px;
                        margin:10px 0;
                        border-radius:10px;
                    "
                >

                <p>
                    <b>📛 Nombre:</b>
                    ${ficha.nombre}
                </p>

                <p>
                    <b>🌍 Origen:</b>
                    ${ficha.origen}
                </p>

                <p>
                    <b>💡 Curiosidad:</b>
                    ${ficha.curiosidad}
                </p>

                <p>
                    <b>⚡ Polaridad:</b>
                    ${ficha.polaridad}
                </p>

                <p>
                    <b>🔋 Voltaje:</b>
                    ${ficha.voltaje}
                </p>

                <p>
                    <b>🛠️ Usos:</b>
                    ${ficha.usos}
                </p>

            </div>
        `;
    }

    else {

        infoDiv.innerHTML = `

            <div class="ficha-activa">

                <h3>
                    ⚠️ No reconocido
                </h3>

                <p>
                    El componente detectado
                    no existe en la base
                    de datos.
                </p>

            </div>
        `;
    }
}

// =======================================
// MODAL
// =======================================

function abrirModal(componente) {

    const modal =
        document.getElementById(
            "modal"
        );

    const titulo =
        document.getElementById(
            "modal-titulo"
        );

    const codigoElemento =
        document.getElementById(
            "modal-codigo"
        );

    let codigo = "";

    switch(componente) {

        case "LED":

            titulo.innerHTML =
                "💡 Código LED";

            codigo =
`int led = 13;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {

  digitalWrite(led, HIGH);
  delay(1000);

  digitalWrite(led, LOW);
  delay(1000);
}`;
        break;

        case "Resistencia":

            titulo.innerHTML =
                "🔌 Código LDR";

            codigo =
`int ldr = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {

  int valor =
    analogRead(ldr);

  Serial.println(valor);

  delay(500);
}`;
        break;

        case "ESP32":

            titulo.innerHTML =
                "📡 Código ESP32";

            codigo =
`#include <WiFi.h>

const char* ssid =
"TU_WIFI";

const char* password =
"TU_PASSWORD";

void setup() {

  Serial.begin(115200);

  WiFi.begin(
    ssid,
    password
  );
}`;
        break;
    }

    codigoActual = codigo;

    codigoElemento.textContent =
        codigo;

    modal.style.display =
        "flex";
}

// =======================================
// CERRAR MODAL
// =======================================

function cerrarModal() {

    document.getElementById(
        "modal"
    ).style.display =
        "none";
}

// =======================================
// COPIAR
// =======================================

function copiarCodigo() {

    navigator.clipboard.writeText(
        codigoActual
    );

    alert(
        "✅ Código copiado"
    );
}

// =======================================
// CERRAR MODAL FUERA
// =======================================

window.onclick = function(event) {

    const modal =
        document.getElementById(
            "modal"
        );

    if (event.target === modal) {

        modal.style.display =
            "none";
    }
}
