from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from TextModel import TextModel


app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las origenes
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los headers
)

# Cargar el modelo previamente entrenado
model = tf.keras.models.load_model("suicide_classifier_model.h5")

# Cargar el tokenizer previamente guardado
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Lista para mantener las predicciones
predictions = []

@app.post("/evaluate/")
async def evaluate_text(text_model: TextModel):
    global predictions
    text = text_model.text
    # Procesamos el texto de entrada
    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=240, padding='post')

    # Evaluamos el texto con el modelo
    prediction = model.predict(padded_sequence)

    # Agregamos la predicción a la lista
    predictions.append(prediction[0][0])

    # Verificamos si hemos recibido 10 consultas
    if len(predictions) == 10:
        # Calculamos el promedio de las predicciones
        average_prediction = sum(predictions) / len(predictions)
        # Reseteamos la lista de predicciones para futuras consultas
        predictions = []
        # Devolvemos el resultado basado en el promedio
        if average_prediction > 0.5:
            return {"result": "1"}
        else:
            return {"result": "0"}
