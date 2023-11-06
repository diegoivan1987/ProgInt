// Definir las imágenes que se utilizarán
const images = ["images/Bot1.png", "images/Bot2.png",
    "images/Bot3.png", "images/Bot2.png"];
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

console.log(questions); // El array se ha reorganizado aleatoriamente


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
    currentQuestionIndex = (currentQuestionIndex + 1) % questionsNumber;
    showCurrentQuestion();
}

// Mostrar la primera pregunta al inicio

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
            body: JSON.stringify({ text: msg }), // Asegúrate de que el servidor espera un objeto con una propiedad 'text'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Aquí puedes decidir qué hacer con la respuesta del servidor
        console.log(data.result);

    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
    }

    // Mostrar la siguiente pregunta
    nextQuestion();
}

