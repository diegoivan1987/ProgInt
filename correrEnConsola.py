import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Cargar el modelo previamente entrenado
model = tf.keras.models.load_model("suicide_classifier_model.h5")

# Cargar el tokenizer previamente guardado
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def evaluate_text(text):
    # Procesamos el texto de entrada
    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=240, padding='post')  # Asegúrate de usar el mismo maxlen que en el entrenamiento si es necesario

    # Evaluamos el texto con el modelo
    prediction = model.predict(padded_sequence)

    # Devolvemos el resultado
    if prediction[0][0] > 0.5:
        return "Si"
    else:
        return "No"

if __name__ == "__main__":
    user_input = input("Por favor, ingrese un texto de prueba: ")
    result = evaluate_text(user_input)
    print(result)
