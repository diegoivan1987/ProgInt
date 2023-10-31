from fastapi import FastAPI, HTTPException
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = FastAPI()

# Cargar el modelo previamente entrenado
model = tf.keras.models.load_model("suicide_classifier_model.h5")

# Cargar el tokenizer previamente guardado
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

@app.post("/evaluate/")
async def evaluate_text(text: str):
    # Procesamos el texto de entrada
    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=240, padding='post')  # Asumiendo que 240 es la longitud que usaste al entrenar

    # Evaluamos el texto con el modelo
    prediction = model.predict(padded_sequence)

    # Devolvemos el resultado
    if prediction[0][0] > 0.5:
        return {"result": "El texto ingresado tiene una connotación relacionada con el suicidio."}
    else:
        return {"result": "El texto ingresado no tiene una connotación relacionada con el suicidio."}
