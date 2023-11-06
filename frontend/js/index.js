// Definir las imágenes que se utilizarán
const images = ["images/Bot1.png", "images/Bot2.png",
    "images/Bot3.png"];
let currentIndex = 0;

// Función para cambiar la imagen
function changeImage() {
    const botImage = document.getElementById("botImage");
    botImage.src = images[currentIndex];

    // Incrementar el índice o reiniciarlo si llega al final del arreglo
    currentIndex = (currentIndex + 1) % images.length;
}

// Cambiar la imagen cada segundo
setInterval(changeImage, 1000); // 1000 milisegundos (1 segundo)


//Preguntas de iniciación de chat
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambiar elementos
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Array de preguntas
const questions = [
    "¿Cómo te encuentras emocionalmente en este momento?",
    "¿Cómo ha sido tu día hasta ahora?",
    "¿Tienes alguna preocupación o estrés que te esté afectando?",
    "¿Cómo duermes por las noches? ¿Has tenido problemas de sueño?",
    "¿Cómo te sientes en relación con tu trabajo o estudios?",
    "¿Has tenido algún cambio importante en tu vida recientemente?",
    "¿Qué actividades o pasatiempos te hacen sentir mejor cuando estás abrumado/a?",
    "¿Cómo está tu salud física en general?",
    "¿Tienes una red de apoyo o alguien con quien puedas hablar cuando te sientes mal?",
    "¿Hay algo en particular que te gustaría compartir o discutir sobre cómo te sientes en este momento?"
];

// Reorganizar aleatoriamente las preguntas
shuffleArray(questions);


const questionsNumber = questions.length;
let currentQuestionIndex = 0; 

function setText(text) {
    document.getElementById("status").innerText = text;
}

function botMsg(msg) {
    document.getElementById("chat").innerHTML += "<br>";
    document.getElementById("chat").innerHTML +=
        '<div class="flex"><div class="w-0 flex flex-1 items-center"><span class="flex p-2 rounded-lg bg-custom-blue text-black">' +
        msg +
        "</span></div></div>";
}

// Función para mostrar la pregunta actual del bot
function showCurrentQuestion() {
    botMsg(questions[currentQuestionIndex]);
}

// Función para avanzar a la siguiente pregunta
function nextQuestion() {
    if (currentQuestionIndex < questionsNumber - 1) {
        // Aún hay preguntas por mostrar
        currentQuestionIndex++;
        showCurrentQuestion();
    }
}

// Mostrar la primera pregunta al inicio
showCurrentQuestion();


// Mostrar mensaje de Usuario y enviar al servidor
async function userMsg(event) {
    event.preventDefault();
    let msgInput = document.getElementById("message");
    let msg = msgInput.value;
    if (msg === "") return;
    msgInput.value = "";

    // Agregar el mensaje del usuario al chat
    document.getElementById("chat").innerHTML += "<br>";
    document.getElementById("chat").innerHTML +=
        '<div class="flex"><div class="w-0 flex flex-1 items-center justify-end"><span class="flex p-2 rounded-lg bg-chat text-black">' +
        msg +
        "</span></div></div>";

    // Enviar el mensaje del usuario al servidor
    try {
        const response = await fetch('http://localhost:8000/evaluate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: msg }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Si es la última pregunta, mostrar el resultado del servidor
        if (currentQuestionIndex === questionsNumber - 1) {
            msgInput.disabled = true; 
            sendbtn.disabled = true;
            if(data.result == "0"){
                botMsg("Según tus respuestas, parece que actualmente no presentas tendencias suicidas. No obstante, si en algún momento sientes que tu estado de ánimo cambia o las circunstancias se vuelven abrumadoras, recuerda que es completamente válido y beneficioso buscar apoyo. Mantener un diálogo abierto con amigos, familiares o profesionales de la salud mental puede ser de gran ayuda. La vida puede tener altibajos, y cuidar de tu bienestar emocional es tan importante como cuidar de tu salud física.");}
            else{
                botMsg(`Tus respuestas sugieren que podrías estar experimentando pensamientos o tendencias suicidas. Es crucial que sepas que no estás solo/a y que hay ayuda disponible. Te instamos a que te pongas en contacto inmediatamente con un profesional de salud mental o llames a una línea de emergencia para hablar con alguien que puede brindarte apoyo y guía en este momento difícil.

                Aquí hay algunos recursos que puedes utilizar:
                - -En México, el teléfono de la Red Nacional de Apoyo Emocional y Prevención del Suicidio es el 800 822 3737.
                - A nivel internacional, la línea de ayuda de Befrienders Worldwide (www.befrienders.org) puede guiarte hacia apoyo en tu país.

                Por favor, considera contactar a estos servicios o visitar el centro de salud más cercano. También es importante que compartas cómo te sientes con alguien de confianza, ya sea un amigo o un familiar. No tienes que pasar por esto solo/a, y hay personas que quieren y pueden ayudarte a superar este momento.`);
            }
        } else {
            // Mostrar la siguiente pregunta
            nextQuestion();
        }

    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
        botMsg("Hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.");
    }
}

