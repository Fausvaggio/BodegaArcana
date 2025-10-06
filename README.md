# 🍷 BodegaArcana – Proyecto de Ciencia de Datos con Dataset *Wine Quality*

### 📊 Descripción general
**BodegaArcana** es un proyecto de análisis exploratorio y modelado predictivo basado en el conjunto de datos **Wine Quality** del repositorio **UCI Machine Learning Repository**.  
El objetivo del proyecto es identificar qué propiedades fisicoquímicas influyen más en la calidad del vino y construir un modelo que pueda predecir su calificación sensorial.  

Además del análisis, desarrollamos un **dashboard interactivo** para visualizar resultados y realizar predicciones en tiempo real.

---

### 🧠 Objetivos del proyecto
- Analizar los factores químicos que determinan la calidad de un vino.  
- Construir modelos de machine learning para clasificar vinos como *baja*, *media* o *alta* calidad.  
- Desarrollar un dashboard interactivo con predicciones y visualizaciones dinámicas.  
- Integrar un **frontend moderno (Angular)** con un **backend en Python/Flask** que gestione los modelos entrenados.

---

### 🔬 Conjunto de datos
- **Fuente:** [UCI Machine Learning Repository – Wine Quality](https://archive.ics.uci.edu/dataset/186/wine+quality)
- **Registros:** 6,497 muestras (1,599 vinos tintos y 4,898 blancos)
- **Atributos:** 11 variables fisicoquímicas + 1 variable objetivo (`quality`)
- **Referencia:** Cortez et al., *Modeling wine preferences by data mining from physicochemical properties*, *Decision Support Systems*, 2009.

---
### 📈 Modelos entrenados
Se entrenaron tres modelos principales para la clasificación de la variable `quality_category`:

| Modelo | Precisión (accuracy) | Observaciones |
|--------|----------------------|----------------|
| Random Forest | **82.31%** | Mejor desempeño general |
| Gradient Boosting | 76.31% | Moderada, sensible a desbalance |
| Red Neuronal (MLPClassifier) | 75.46% | Requiere tuning adicional |

---

### 💡 Dashboard interactivo
El dashboard permite:
- Visualizar **distribuciones**, **mapas de calor**, **correlaciones** y **curvas por calidad**.  
- Comparar vinos blancos y tintos.  
- Probar el **módulo de predicción**, ingresando valores como alcohol, pH o acidez volátil.  
- Ver explicaciones locales (SHAP) sobre por qué un vino fue clasificado como *medio* o *alto*.

---

### 👩‍💻 Equipo de desarrollo

BodegaArcana Team
Karla Patricia Aliaga Colque
Fausto Danilo Esthela Espinoza
Carlos Alonso Alcocer Pari
