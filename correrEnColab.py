#https://www.kaggle.com/datasets/aunanya875/suicidal-tweet-detection-dataset/

# Importamos las bibliotecas
import pandas as pd
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split

# Cargamos el archivo CSV
data = pd.read_csv("/content/drive/MyDrive/Dataseets/Cleaned_Suicide_Ideation_Dataset.csv")

# Preprocesamos los datos
tweets = data['Tweet'].values
labels = data['Suicide'].values

# Tokenizamos los tweets
tokenizer = Tokenizer(num_words=10000, oov_token='<OOV>')
tokenizer.fit_on_texts(tweets)
sequences = tokenizer.texts_to_sequences(tweets)
padded_sequences = pad_sequences(sequences, padding='post')

# Dividimos los datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(padded_sequences, labels, test_size=0.2)

# Creamos el modelo
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(10000, 16, input_length=padded_sequences.shape[1]),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(24, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# Entrenamos el modelo
model.fit(X_train, y_train, epochs=30, validation_data=(X_test, y_test))

# Evaluamos el modelo
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Accuracy: {accuracy*100:.2f}%")

# Guardamos el modelo en formato .h5
model.save("suicide_classifier_model.h5")

# Guardamos el tokenizer usando pickle
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
