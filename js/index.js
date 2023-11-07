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
    "How are you feeling emotionally at this moment?",
    "How has your day been so far?",
    "Do you have any worries or stress that is affecting you?",
    "How do you sleep at night? Have you had any sleep problems?",
    "How do you feel about your work or studies?",
    "Have you had any major changes in your life recently?",
    "What activities or hobbies make you feel better when you are overwhelmed?",
    "How is your overall physical health?",
    "Do you have a support network or someone to talk to when you feel down?",
    "Is there anything in particular that you would like to share or discuss about how you are feeling right now?"
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
        const response = await fetch('https://proyecto-cau7zjsfwq-uc.a.run.app/evaluate/', {
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
                botMsg("Based on your responses, it seems that you are not currently showing any suicidal tendencies. However, if at any point you feel that your mood changes or circumstances become overwhelming, remember that it is completely valid and beneficial to seek support. Maintaining an open dialogue with friends, family, or mental health professionals can be of great help. Life can have its ups and downs, and taking care of your emotional well-being is just as important as taking care of your physical health.");
            }
            else{
                botMsg(`Your responses suggest that you might be experiencing suicidal thoughts or tendencies. It is crucial that you know you are not alone and that help is available. We urge you to immediately contact a mental health professional or call an emergency hotline to talk with someone who can provide support and guidance during this difficult time.

                Here are some resources you can use:
                - In Mexico, the phone number for the National Network of Emotional Support and Suicide Prevention is 800 822 3737.
                - Internationally, the Befrienders Worldwide helpline (www.befrienders.org) can guide you to support in your country.

                Please consider reaching out to these services or visiting the nearest health center. It is also important that you share how you're feeling with someone you trust, whether it's a friend or a family member. You don't have to go through this alone, and there are people who want and can help you through this moment.`);
            }
        } else {
            // Mostrar la siguiente pregunta
            nextQuestion();
        }

    } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
        botMsg("There was an error processing your message. Please try again.");
    }
}

