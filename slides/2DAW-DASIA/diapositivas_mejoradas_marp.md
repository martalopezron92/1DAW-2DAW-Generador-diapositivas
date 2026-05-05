---
marp: true
theme: default
paginate: true
---

# Python para IA + NumPy
## Fundamentos y computación científica

---

## Objetivos


- Comprender el papel de Python en IA
- Configurar entorno de trabajo
- Dominar sintaxis básica
- Introducción a NumPy y arrays


---

## ¿Por qué Python para IA?


- 85% profesionales ML lo usan
- Ecosistema de librerías (NumPy, Pandas, etc.)
- Prototipado rápido
- Comunidad enorme


---

## Configuración del entorno


- Python 3.11+
- Entornos virtuales (`venv`)
- Instalación librerías: `pip install numpy pandas matplotlib`
- VS Code o Jupyter


---

## Sintaxis básica


- Sin `;` ni `{ }`
- Bloques por indentación
- Tipado dinámico


---

## Tipos de datos


- int, float, complex
- str
- bool
- None


---

## Estructuras de control


```python
if edad >= 18:
    print("Mayor")

for i in range(5):
    print(i)
```


---

## Estructuras de datos


- Listas
- Diccionarios
- Tuplas
- Sets


---

## Funciones


```python
def sumar(a, b=10):
    return a + b
```


---

## Programación funcional


- map()
- filter()
- reduce()


---

## Introducción a NumPy


- Arrays multidimensionales
- Operaciones vectorizadas
- Mucho más rápido que Python puro


---

## Creación de arrays


```python
import numpy as np
arr = np.array([1,2,3])
zeros = np.zeros((2,2))
```


---

## Propiedades de arrays


- shape
- ndim
- size
- dtype


---

## Indexación y slicing


```python
arr[0]
arr[1:3]
arr[::-1]
```


---

## Operaciones con arrays


```python
arr1 + arr2
arr * 2
np.sqrt(arr)
```


---

## Broadcasting


Permite operar arrays de distinta forma automáticamente.


---

## Reshape


```python
arr.reshape(3,4)
arr.flatten()
```


---

## Agregaciones


```python
np.mean(arr)
np.sum(arr)
np.max(arr)
```


---

## Álgebra lineal


```python
np.dot(A, B)
np.linalg.inv(A)
```

