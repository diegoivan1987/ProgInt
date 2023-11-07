**Nombre del Proyecto:**
EmotiTalk - Sistema de Clasificación para la Detección de Tendencias Suicidas
![image](https://github.com/diegoivan1987/ProgInt/assets/47061340/b63e8683-317f-4f7b-b4fc-fab3dd76c308)

**Descripción:**
EmotiTalk es una API web diseñada para analizar mensajes de texto y detectar posibles tendencias suicidas en el contenido. Utiliza técnicas de procesamiento de lenguaje natural (PLN) y un modelo de inteligencia artificial entrenado para evaluar las respuestas proporcionadas por los usuarios a través de una interfaz de chat.

**Componentes Principales:**

FastAPI: Framework utilizado para construir la API, gestionar las solicitudes y las respuestas.
TensorFlow y Keras: Bibliotecas para cargar y ejecutar el modelo de clasificación.
Tokenizer: Procesa el texto y lo convierte en una secuencia de tokens que el modelo puede entender.
CORS Middleware: Configurado para permitir solicitudes desde cualquier origen, lo que es esencial para que los clientes web interactúen con la API.
TextModel: define la estructura de los datos de entrada esperados por la API.

**Funcionalidad:**

La API recibe un mensaje de texto a través de un endpoint POST.
El texto se procesa usando un tokenizer y se prepara en una secuencia.
El modelo de clasificación evalúa la secuencia y devuelve una predicción.
Las predicciones se acumulan hasta alcanzar un total de 10, momento en el cual se calcula un promedio.
Basándose en el promedio, la API devuelve un resultado que indica la presencia o ausencia de tendencias suicidas.

**Instalación y Uso:**

Instalar las dependencias: FastAPI, Uvicorn (para el servidor), TensorFlow.
Iniciar el servidor con uvicorn main:app --reload.
Hacer solicitudes POST al endpoint /evaluate/ con un objeto JSON que contenga el texto a evaluar.

**Estructura del Código:**

El código se divide en tres partes principales:

Inicialización y configuración de la API - Configuración del CORS y carga de los componentes del modelo y tokenizer.
Endpoint de la API - Un endpoint POST que recibe el texto, realiza la evaluación y devuelve el resultado.
Frontend - Un simple HTML con JavaScript para interactuar con la API, que presenta un chatbot y gestiona las interacciones con el usuario.

**Estimación de costo**

Para estimar el costo del proyecto de software utilizando el modelo COCOMO básico, se realizó el siguiente procedimiento:

Se estimó el esfuerzo necesario aplicando la fórmula del modelo COCOMO, que considera el tamaño del software en líneas de código (LOC). Para un proyecto clasificado como orgánico, pequeño y no muy complejo, se utilizaron constantes estándar en la fórmula:

![image](https://github.com/diegoivan1987/ProgInt/assets/47061340/8b8439dc-70ba-4b12-bb82-7faed24ad6ee)

Con la inserción de los valores proporcionados en la fórmula anterior, el resultado fue aproximadamente 0.92 persona-mes de esfuerzo requerido para completar el proyecto.

Para calcular el costo total, se multiplicó el esfuerzo estimado por el costo promedio mensual de un desarrollador en México. Se asumió un salario promedio de 30,000 pesos mexicanos al mes para un desarrollador con experiencia junior a semisenior.

De esta forma, la estimación de costo fue calculada como sigue:

![image](https://github.com/diegoivan1987/ProgInt/assets/47061340/6f363ec0-dcbf-4a1c-894a-9ae0a614cbee)


