Resumen:
Este proyecto utiliza técnicas de procesamiento de lenguaje natural y aprendizaje profundo para identificar tendencias suicidas en textos. El modelo se entrena con un conjunto de datos de tweets, y luego se puede utilizar para evaluar textos arbitrarios y determinar si tienen connotaciones relacionadas con el suicidio.

![image](https://github.com/diegoivan1987/ProgInt/assets/47061340/41babd89-4924-458e-b8a5-42935177ebc7)


Detalles:
Preparación de Datos:

Se utiliza un conjunto de datos de Kaggle que contiene tweets etiquetados según si tienen o no tendencias suicidas.
Los datos se cargan desde un archivo CSV y se procesan utilizando la biblioteca pandas.

Procesamiento de Texto:

Se tokenizan los tweets para convertir el texto en secuencias numéricas utilizando Tokenizer de TensorFlow.

Modelo:

El modelo se compila con una función de pérdida de entropía cruzada binaria y se optimiza utilizando el optimizador Adam.
Se entrena el modelo utilizando un conjunto de entrenamiento y se valida con un conjunto de prueba.
La relacipon de los datos de entrenamiento y de prueba es 80-20.

API:

Se crea una API utilizando FastAPI que permite a los usuarios enviar textos para evaluación.
La API carga el modelo y el tokenizer previamente entrenados y los utiliza para evaluar los textos enviados.
