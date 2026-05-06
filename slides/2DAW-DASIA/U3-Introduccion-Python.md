---
marp: true
theme: default
paginate: true
---

# U3 - Fundamentos de Python para IA

### Objetivos de aprendizaje

- **Comprender** por qué Python es el lenguaje dominante en IA y ciencia de datos
- **Configurar** entornos de desarrollo Python con herramientas profesionales
- **Dominar** la sintaxis básica de Python viniendo desde otros lenguajes
<!-- - **Manipular** estructuras de datos eficientemente con NumPy
- **Aplicar** operaciones vectorizadas para procesamiento de datos
- **Trabajar** con arrays multidimensionales para representar datos del mundo áreal -->


### Tabla de contenidos 
1. [¿Por qué Python para IA?](#1-por-qué-python-para-ia-15-minutos)
2. [Configuración del entorno](#2-configuración-del-entorno-20-minutos)
3. [Python para programadores](#3-python-para-programadores-30-minutos)

---

## 1. ¿Por qué Python para IA?

### La pregunta del millón

Si ya sabéis programar en JavaScript, Java o C#, ¿por qué aprender Python específicamente para IA?

### Python en números

- **85%** de los profesionales de Machine Learning usan Python como lenguaje principal
- **Top 3** lenguajes más demandados para IA según GitHub (2024-2025)
- **+11 millones** de desarrolladores Python en el mundo
- **Salario promedio** en España: 35-50K€ junior, 50-70K€ senior con IA

---

### Razones técnicas

#### 1. **Ecosistema de librerías sin competencia**

```
área                  | Librería principal      | Alternativa en otro lenguaje
---------------------|------------------------|-----------------------------
Cálculo numérico     | NumPy                  | No existe equivalente directo
Manipulación datos   | Pandas                 | dplyr (R) - menos potente
Machine Learning     | scikit-learn           | Weka (Java) - menos usado
Deep Learning        | TensorFlow, PyTorch    | Existen bindings, pero Python es nativo
Visualización        | Matplotlib, Seaborn    | D3.js (JS) - diferente propósito
```

#### 2. **Sintaxis diseada para ciencia**

```python
# Calcular la media de una lista
datos = [23, 45, 67, 89, 12, 34]
media = sum(datos) / len(datos)
# Con NumPy (lo veremos hoy)
import numpy as np
media = np.mean(datos)
```

---

#### 3. **Tipado dinámico = Prototipado rápido**

```python
# Python - Experimentar rápido
modelo = crear_modelo()
resultado = modelo.entrenar(datos)
if resultado.precision > 0.85:
    modelo.guardar()
```

En desarrollo de IA necesitas **iterar rápido**, probar hipótesis, experimentar. Python permite esto sin la verbosidad de lenguajes compilados.

#### 4. **Comunidad y recursos**

- **Kaggle**: 90% de las competiciones se resuelven en Python
- **Papers de investigación**: La mayora incluye código Python
- **Stack Overflow**: +2 millones de preguntas etiquetadas con Python
- **Jupyter Notebooks**: Estándar de facto para compartir análisis

---

### Python en el desarrollo web con IA

En vuestro contexto como desarrolladores web, Python os permite:

```
Frontend (react/Vue)  API REST  Backend Python (Flask/FastAPI)
                                              
  Visualizacin                          - Modelo de ML
  de resultados                          - Procesamiento de datos
                                         - Predicciones en tiempo real
```

**Ejemplo real**: Sistema de recomendaciones
- **Backend Python**: Procesa datos de usuarios, entrena modelo, genera recomendaciones
- **API REST**: Expone endpoint `/api/recomendaciones`
- **Frontend**: Muestra productos recomendados

--- 

## 2. Configuración del entorno

### Herramientas que vamos a usar

```

  VS Code (Editor)                       
     extensión                          
  Python Extension                       
     usa                                
  Python 3.11+ (Intérprete)              
     gestiona                           
  pip (Gestor de paquetes)               
     instala                            
  NumPy, Pandas, etc. (librerías)        

```

---

### Paso 1: Verificar Python

**Windows (PowerShell):**
```powershell
# Verificar si Python está instalado
python --version

# Debera mostrar: Python 3.11.x o superior
# Si no está instalado, descargar de: https://www.python.org/downloads/
```

**Linux/Mac:**
```bash
python3 --version
```

> **IMPORTANTE**: Si en Windows aparece la Microsoft Store, significa que Python no está en el PATH. Reinstalar marcando "Add to PATH".

---

### Paso 2: Entornos virtuales (FUNDAMENTAL!)

#### Qué es un entorno virtual?

Imagina que cada proyecto Python es una "carpeta mágica" con sus propias librerías:

```
Proyecto_A/
 venv/               Entorno virtual (Python + librerías aisladas)
    numpy 1.24
    pandas 2.0
 mi_codigo.py

Proyecto_B/
 venv/               OTRO entorno virtual diferente
    numpy 1.26
    tensorflow 2.15
 otro_codigo.py
```

**Por qué?** Evitar conflictos entre versiones de librerías.

---

#### Crear entorno virtual

**Windows:**
```powershell
# Navegar a tu carpeta de proyecto
cd C:\Users\TuUsuario\Desktop\proyecto_python_ia

# Cárear entorno virtual llamado "venv"
python -m venv venv

# Activar entorno virtual
.\venv\Scripts\Activate.ps1

# Si da error de permisos, ejecutar primero:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Cuando está activado, ver (venv) al inicio de la línea:
(venv) PS C:\Users\...>
```
<!-- 
**Linux/Mac:**
```bash
# Crear entorno
python3 -m venv venv

# Activar
source venv/bin/activate

# Ver: (venv) usuario@pc:~$
``` -->

---

#### Verificar activación

```powershell
# Preguntar dónde está Python
(venv) PS> Get-Command python

# Debe mostrar la ruta DENTRO de tu carpeta venv:
# C:\Users\...\proyecto_python_ia\venv\Scripts\python.exe
```

### Paso 3: Instalar librerías

```powershell
# Con el entorno activado (debe aparecer "(venv)")
pip install numpy pandas matplotlib jupyter

# Verificar instalación
pip list
# Deberas ver:
# numpy         1.26.x
# pandas        2.1.x
# matplotlib    3.8.x
# jupyter       1.0.x
```

---

### Paso 4: Configurar VS Code

1. **Instalar extensión de Python**
   - Abrir VS Code
   - Ir a Extensions (Ctrl+Shift+X)
   - Buscar "Python" (de Microsoft)
   - Instalar

2. **Seleccionar intérprete del entorno virtual**
   - Abrir carpeta del proyecto en VS Code
   - Presionar `Ctrl+Shift+P`
   - Escribir "Python: Select Interpreter"
   - Elegir el que esté en `./venv/Scripts/python.exe`

---

3. **Crear archivo de prueba**
   ```python
   # test_entorno.py
   import numpy as np
   
   print("NumPy instalado correctamente!")
   print(f"versión: {np.__version__}")
   
   # Cárear un array simple
   arr = np.array([1, 2, 3, 4, 5])
   print(f"Array cáreado: {arr}")
   print(f"Media: {np.mean(arr)}")
   ```

4. **Ejecutar**
   - Click derecho en el archivo  "Run Python File in Terminal"
   - Debe mostrar la salida sin errores

---

### Paso 5: Elegir tu editor/entorno

Tienes **3 opciones principales** para escribir y ejecutar código Python:

#### Opción 1: VS Code con archivos `.py` (RECOMENDADO)

**Por que usar VS Code?**
- Editor profesional usado en la industria
- Ejecución lnea por lnea con Shift+Enter
- Depurador integrado
- Control de versiones (Git)
- Autocompletado inteligente
- Genera código organizado y modular

**Configuración:**
1. Ya tienes VS Code instalado
2. Ya tienes la extensión Python
3. **Crear archivo**: `apuntes_sesion1.py`
4. **Ejecutar**:
   - Todo el archivo: Click derecho  "Run Python File in Terminal"
   - Línea por línea: Seleccionar código  Shift+Enter (ejecuta en terminal interactivo)

---

**Modo interactivo en VS Code:**
```python
# Escribe tu código normalmente
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr)

# Selecciona estas líneas y presiona Shift+Enter
# Se ejecutarán en una terminal Python interactiva
```
---

#### Opción 2: Google Colab (ONLINE, no requiere instalación)

**Cuándo usar Colab?**
- No puedes/quieres instalar Python localmente
- Necesitas GPUs gratuitas para modelos pesados
- Quieres compartir notebooks con compañeros

**Uso:**
1. Ir a: https://colab.research.google.com
2. "Nuevo cuaderno" / "New Notebook"
3. Escribir código en celdas
4. Ejecutar con Shift+Enter

**IMPORTANTE:** Los archivos están en Google Drive, no en tu PC.

---

#### Opción 3: Jupyter Notebook (OPCIONAL)

**Cuándo usar Jupyter?**
- Exploración de datos y visualización
- Combinar código con documentación (Markdown)
- Seguir tutoriales que usan notebooks

**Instalación y uso:**
```powershell
# Ya lo instalamos antes
pip install jupyter

# Lanzar Jupyter
jupyter notebook

# Se abrirá en el navegador. Crear "New"  Python 3
```

<div class = two-cols>

<div>

**Ventajas:**
- Ejecutar código en celdas independientes
- Ver gráficos inline
- Exportar a PDF/HTML

</div>
<div>

**Desventajas:**
- No es ideal para aplicaciones completas
- Dificulta el control de versiones
- Puede generar código desorganizado

</div>
</div>

---
<!-- 
### ¿Cuál elegir para este curso?

**Para las clases: VS Code con archivos `.py`**
- Más profesional
- Mejor para aprender buenas prácticas
- Facilita el trabajo en proyectos

**Opcional en casa: Google Colab**
- Si no puedes instalar Python
- Para experimentar rápido

**Jupyter: Solo si lo prefieres**
- Útil para visualización exploratoria
- No obligatorio

--- -->

### Ejemplo práctico en VS Code

**Archivo: `test_numpy.py`**
```python
# Puedes ejecutar este archivo completo o línea por línea

import numpy as np

# Crear array
print("=== Creando array ===")
arr = np.array([1, 2, 3, 4, 5])
print(f"Array: {arr}")

# Operaciones
print("\n=== Operaciones ===")
print(f"Cuadrados: {arr ** 2}")
print(f"Media: {np.mean(arr)}")

# Filtrado
print("\n=== Filtrado ===")
mayores_3 = arr[arr > 3]
print(f"Mayores que 3: {mayores_3}")

# Para ejecutar:
# 1. Todo el archivo: F5 o "Run Python File"
# 2. Lneas especficas: Seleccionar + Shift+Enter
```
---

**Salida esperada:**
```
=== Cáreando array ===
Array: [1 2 3 4 5]

=== Operaciones ===
Cuadrados: [ 1  4  9 16 25]
Media: 3.0

=== Filtrado ===
Mayores que 3: [4 5]
```

---

## 3. Python para programadores 

### Sintaxis básica: Lo esencial

Si vienes de Java, JavaScript o C#, estos son los **cambios clave**:

| Aspecto | Java/C# | JavaScript | Python |
|---------|---------|------------|--------|
| **Punto y coma** | Obligatorio `;` | Opcional `;` | No se usa |
| **Llaves** | `{ }` | `{ }` | Indentación (4 espacios) |
| **Declaración de variables** | `int x = 5;` | `let x = 5;` | `x = 5` |
| **Tipos** | Estático | Dinámico débil | Dinámico fuerte |
| **Comentarios** | `// /* */` | `// /* */` | `# """ """` |

---

### Tipos de datos básicos

```python
# números
entero = 42
decimal = 3.14
complejo = 2 + 3j  # Sí, Python tiene números complejos nativos

# Strings
texto = "Hola mundo"
multilinea = """
Este es un texto
de varias lneas
"""

# Booleanos (Ojo! Con mayscula)
verdadero = True
falso = False

# None (equivalente a null)
vacio = None

# Verificar tipo
print(type(entero))  # <class 'int'>
print(type(texto))   # <class 'str'>
```
---

### Estructuras de control

```python
# IF - SIN PARÉNTESIS, SIN LLAVES
edad = 20
if edad >= 18:
    print("Eres mayor de edad")
    print("Puedes votar")  # La indentación define el bloque
elif edad >= 13:
    print("Eres adolescente")
else:
    print("Eres menor")

# FOR - más simple que en otros lenguajes
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

numeros = [10, 20, 30, 40]
for num in numeros:  # Itera directamente sobre elementos
    print(num)

# WHILE
contador = 0
while contador < 5:
    print(contador)
    contador += 1  # No existe contador++
```

---

### EJERCICIOS: Estructuras de control

**Ejercicio 1: Clasificador de notas**
```python
# Crea un programa que reciba una nota (0-10) y muestre:
# - "Suspenso" si es menor que 5
# - "Aprobado" si está entre 5 y 6.9
# - "Notable" si está entre 7 y 8.9
# - "Sobresaliente" si es 9 o más
nota = 7.5
# Tu código aquí
```
---
<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 1:**
```python
nota = 7.5

if nota < 5:
    print("Suspenso")
elif nota < 7:
    print("Aprobado")
elif nota < 9:
    print("Notable")
else:
    print("Sobresaliente")
# Notable
```

</details>

---

**Ejercicio 2: Suma de pares**
```python
# Usa un bucle for para sumar solo los números pares del 1 al 20
# Imprime el resultado final
```

---

<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 2:**
```python
suma = 0
for i in range(1, 21):
    if i % 2 == 0:
        suma += i
print(f"Suma de pares: {suma}")  # 110

# Alternativa con comprehension:
suma = sum([i for i in range(1, 21) if i % 2 == 0])
print(suma)  # 110
```
</details>

---

**Ejercicio 3: FizzBuzz simplificado**
```python
# Recorre los números del 1 al 15
# Si el número es divisible por 3, imprime "Fizz"
# Si es divisible por 5, imprime "Buzz"
# Si es divisible por ambos, imprime "FizzBuzz"
# Si no, imprime el número
```
---

<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 3:**
```python
for i in range(1, 16):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```
</details>

---

### Estructuras de datos nativas

**1. Listas (como Arrays de JavaScript)**
```python
# Crear lista
frutas = ["manzana", "banana", "cereza"]
numeros = [1, 2, 3, 4, 5]
mixto = [1, "texto", True, 3.14]  # Pueden ser de tipos mezclados

# Acceder por índice (como siempre)
print(frutas[0])  # "manzana"
print(frutas[-1])  # "cereza" (índice negativo = desde el final)

# Slicing (sub-listas)
print(numeros[1:3])  # [2, 3] (desde índice 1 hasta 3, sin incluir 3)
print(numeros[:3])   # [1, 2, 3] (desde el inicio hasta 3)
print(numeros[2:])   # [3, 4, 5] (desde 2 hasta el final)
print(numeros[::2])  # [1, 3, 5] (cada 2 elementos comenzando por el 0)

# Métodos tiles
frutas.append("naranja")  # Aadir al final
frutas.insert(1, "pera")  # Insertar en posicin
frutas.remove("banana")   # Eliminar por valor
ultimo = frutas.pop()     # Eliminar y devolver último
```

---

**2. Diccionarios (como Objects de JavaScript)**
```python
# Cárear diccionario
persona = {
    "nombre": "Ana",
    "edad": 25,
    "ciudad": "Madrid"
}

# Acceder a valores
print(persona["nombre"])  # "Ana"
print(persona.get("edad"))  # 25 (forma segura)

# Modificar
persona["edad"] = 26
persona["email"] = "ana@example.com"  # Aadir nueva clave

# Iterar
for clave, valor in persona.items():
    print(f"{clave}: {valor}")

# Verificar existencia
if "email" in persona:
    print("Tiene email")
```
---

**3. Tuplas (listas inmutables)**
```python
# No se pueden modificar después de crearlas
coordenadas = (10, 20)
rgb = (255, 128, 0)

# Útiles para devolver múltiples valores
def obtener_dimensiones():
    return (1920, 1080)  # Ancho, alto

ancho, alto = obtener_dimensiones()  # Desempaquetado
print(ancho)  # 1920
```
---

**4. Sets (conjuntos)**
```python
# Elementos únicos, sin orden
numeros = {1, 2, 3, 3, 3, 4}  # automáticamente elimina duplicados
print(numeros)  # {1, 2, 3, 4}

# Operaciones de conjuntos
a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)  # Unión: {1, 2, 3, 4, 5}
print(a & b)  # Intersección: {3}
print(a - b)  # Diferencia: {1, 2}
```

---

### EJERCICIOS: Estructuras de datos 

**Ejercicio 1: Lista de tareas**
```python
# Crea una lista con 5 tareas pendientes
# Añade una tárea más
# Elimina la primera tarea
# Muestra la lista resultante
```
---

<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 1:**
```python
tareas = ["Estudiar Python", "Hacer ejercicio", "Leer libro", "Comprar comida", "Llamar a Juan"]
tareas.append("Revisar emails")
tareas.pop(0)  # o tareas.remove("Estudiar Python")
print(tareas)
# ['Hacer ejercicio', 'Leer libro', 'Comprar comida', 'Llamar a Juan', 'Revisar emails']
```
</details>

---

**Ejercicio 2: Información de estudiante**
```python
# Crea un diccionario con: nombre, edad, nota_media, asignaturas (lista)
# Añade una nueva asignatura
# Incrementa la nota_media en 0.5
# Imprime solo el nombre y la nota_media
```
---

<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 2:**
```python
estudiante = {
    "nombre": "Laura",
    "edad": 20,
    "nota_media": 7.5,
    "asignaturas": ["Matemáticas", "Física", "Programación"]
}
estudiante["asignaturas"].append("IA")
estudiante["nota_media"] += 0.5
print(f"Nombre: {estudiante['nombre']}, Nota media: {estudiante['nota_media']}")
# Nombre: Laura, Nota media: 8.0
```
</details>

---

**Ejercicio 3: Filtrado de datos**
```python
# Dada esta lista de temperaturas:
temperaturas = [18, 22, 19, 25, 30, 17, 28, 24]

# 1. Obtén solo las temperaturas mayores a 20
# 2. Crea un diccionario donde la clave sea el índice y el valor la temperatura
# 3. Usa slicing para obtener las 3 primeras temperaturas
```

---

<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 3:**
```python
temperaturas = [18, 22, 19, 25, 30, 17, 28, 24]

# 1. Filtrado
temps_altas = [t for t in temperaturas if t > 20]
print(temps_altas)  # [22, 25, 30, 28, 24]

# 2. Diccionario
temp_dict = {i: temp for i, temp in enumerate(temperaturas)}
print(temp_dict)  # {0: 18, 1: 22, 2: 19, ...}

# 3. Slicing
print(temperaturas[:3])  # [18, 22, 19]
```
</details>

---

**Ejercicio 4: Coordenadas con tuplas**
```python
# Crea una tupla con las coordenadas (latitud, longitud) de tu ciudad
# Intenta modificar uno de los valores (observa el error)
# Crea una función que reciba una tupla de coordenadas y devuelva
# dos tuplas separadas: (latitud,) y (longitud,)
```

---

<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 4:**
```python
ciudad = (40.4168, -3.7038)  # Madrid

# Intentar modificar (esto dará error):
# ciudad[0] = 41.0  # TypeError: 'tuple' object does not support item assignment

def separar_coordenadas(coords):
    return (coords[0],), (coords[1],)

lat, lon = separar_coordenadas(ciudad)
print(f"Latitud: {lat}, Longitud: {lon}")
# Latitud: (40.4168,), Longitud: (-3.7038,)
```

</details>

---

**Ejercicio 5: Operaciones con conjuntos**
```python
# Dados estos conjuntos de estudiantes:
grupo_a = {"Ana", "Carlos", "Elena", "David", "Beatriz"}
grupo_b = {"Carlos", "Elena", "Fernando", "Gloria"}

# 1. ¿Qué estudiantes están en ambos grupos?
# 2. ¿Qué estudiantes están solo en el grupo A?
# 3. ¿Cuántos estudiantes hay en total (sin repetir)?
# 4. Elimina duplicados de esta lista: [1, 2, 2, 3, 4, 4, 4, 5]
```

---

<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 5:**
```python
grupo_a = {"Ana", "Carlos", "Elena", "David", "Beatriz"}
grupo_b = {"Carlos", "Elena", "Fernando", "Gloria"}

# 1. Intersección
ambos_grupos = grupo_a & grupo_b
print(f"En ambos: {ambos_grupos}")  # {'Carlos', 'Elena'}

# 2. Solo en A
solo_a = grupo_a - grupo_b
print(f"Solo en A: {solo_a}")  # {'Ana', 'David', 'Beatriz'}

# 3. Total sin repetir
total = grupo_a | grupo_b
print(f"Total: {len(total)} estudiantes")  # 7 estudiantes

# 4. Eliminar duplicados
lista_con_duplicados = [1, 2, 2, 3, 4, 4, 4, 5]
sin_duplicados = list(set(lista_con_duplicados))
print(sin_duplicados)  # [1, 2, 3, 4, 5]
```
</details>

---

### Funciones

```python
# Definición básica
def saludar(nombre):
    return f"Hola, {nombre}!"  # f-string para interpolar

print(saludar("Carlos"))  # "Hola, Carlos!"

# Parámetros por defecto
def sumar(a, b=10):
    return a + b

print(sumar(5))     # 15 (usa b=10 por defecto)
print(sumar(5, 3))  # 8

# Múltiples retornos
def operaciones(a, b):
    return a + b, a - b, a * b

suma, resta, mult = operaciones(10, 5)
print(suma)  # 15

# Funciones lambda (anónimas)
doble = lambda x: x * 2
print(doble(5))  # 10

# Útiles en operaciones funcionales
numeros = [1, 2, 3, 4, 5]
cuadrados = list(map(lambda x: x**2, numeros))
print(cuadrados)  # [1, 4, 9, 16, 25]
```

---

### EJERCICIOS: Funciones

**Ejercicio 1: Calculadora de área**
```python
# Crea una función que calcule el área de un rectángulo
# Parámetros: ancho y alto (alto debe tener valor por defecto 1)
# Devuelve el área
# Prueba con: area_rectangulo(5, 3) y area_rectangulo(5)
```
---

<details>
<summary>💡 Ver solución</summary>

**Solucin Ejercicio 1:**
```python
def aárea_rectangulo(ancho, alto=1):
    return ancho * alto

print(aárea_rectangulo(5, 3))  # 15
print(aárea_rectangulo(5))     # 5
```
</details>

---

**Ejercicio 2: Estadísticas básicas**
```python
# Crea una función que reciba una lista de números
# Devuelva tres valores: mínimo, máximo y promedio
# Usa: numeros = [12, 45, 23, 67, 34, 89, 15]
```

---

<details>
<summary>💡 Ver solución</summary>

**Solucin Ejercicio 2:**
```python
def estadisticas(numeros):
    minimo = min(numeros)
    maximo = max(numeros)
    promedio = sum(numeros) / len(numeros)
    return minimo, maximo, promedio

numeros = [12, 45, 23, 67, 34, 89, 15]
min_val, max_val, prom = estadisticas(numeros)
print(f"Mn: {min_val}, Mx: {max_val}, Promedio: {prom:.2f}")
# Mn: 12, Mx: 89, Promedio: 40.71
```
</details>

---

**Ejercicio 3: Validador de contraseña**
```python
# Crea una función que valide una contraseña:
# - Mínimo 8 caracteres
# - Contiene al menos un número
# - Contiene al menos una mayúscula
# Devuelve True/False
# Pista: usa len(), any(), isupper(), isdigit()
```
---

<details>
<summary>💡 Ver solución</summary>

**Solucin Ejercicio 3:**
```python
def validar_password(password):
    if len(password) < 8:
        return False
    if not any(c.isdigit() for c in password):
        return False
    if not any(c.isupper() for c in password):
        return False
    return True

print(validar_password("Abc12345"))  # True
print(validar_password("abc123"))    # False (corta, sin mayscula)
print(validar_password("Abcdefgh"))  # False (sin nmero)
```
</details>

---

### Programación funcional: map, filter y reduce

Python soporta **programación funcional**, un paradigma donde las funciones son ciudadanos de primera clase y se pueden pasar como argumentos.

**¿Por qué es importante?** En ciencia de datos y ML, transformarás datos constantemente. Estas funciones te permiten hacerlo de forma elegante.

---

#### 1. map() - Transformar cada elemento

**Sintaxis:** `map(función, iterable)`

Aplica una función a **cada elemento** de una lista/iterable.

```python
# Problema: convertir temperaturas de Celsius a Fahrenheit
celsius = [0, 10, 20, 30, 40]

# Forma tradicional (bucle)
fahrenheit = []
for temp in celsius:
    fahrenheit.append(temp * 9/5 + 32)
print(fahrenheit)  # [32.0, 50.0, 68.0, 86.0, 104.0]
```

---

 ```python
# Con map() y función definida
def celsius_a_fahrenheit(c):
    return c * 9/5 + 32

fahrenheit = list(map(celsius_a_fahrenheit, celsius))
print(fahrenheit)  # [32.0, 50.0, 68.0, 86.0, 104.0]

# Con map() y lambda (más conciso)
fahrenheit = list(map(lambda c: c * 9/5 + 32, celsius))
print(fahrenheit)  # [32.0, 50.0, 68.0, 86.0, 104.0]
```

---

**Casos de uso:**
```python
# Convertir strings a enteros
strings = ["1", "2", "3", "4", "5"]
numeros = list(map(int, strings))
print(numeros)  # [1, 2, 3, 4, 5]

# Calcular longitud de palabras
palabras = ["Python", "es", "genial"]
longitudes = list(map(len, palabras))
print(longitudes)  # [6, 2, 6]

# Aplicar operación a múltiples listas
nums1 = [1, 2, 3]
nums2 = [10, 20, 30]
sumas = list(map(lambda x, y: x + y, nums1, nums2))
print(sumas)  # [11, 22, 33]
```
---

#### 2. filter() - Filtrar elementos

**Sintaxis:** `filter(función_booleana, iterable)`

Devuelve solo los elementos donde la función retorna `True`.

```python
# Problema: filtrar números pares
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Forma tradicional
pares = []
for num in numeros:
    if num % 2 == 0:
        pares.append(num)
print(pares)  # [2, 4, 6, 8, 10]
```
---

```python
# Con filter() y función
def es_par(n):
    return n % 2 == 0

pares = list(filter(es_par, numeros))
print(pares)  # [2, 4, 6, 8, 10]

# Con filter() y lambda
pares = list(filter(lambda n: n % 2 == 0, numeros))
print(pares)  # [2, 4, 6, 8, 10]
```

---

**Casos de uso:**
```python
# Filtrar strings no vacíos
textos = ["", "Hola", "", "Mundo", "Python", ""]
no_vacios = list(filter(lambda s: len(s) > 0, textos))
print(no_vacios)  # ['Hola', 'Mundo', 'Python']

# Filtrar usuarios activos
usuarios = [
    {"nombre": "Ana", "activo": True},
    {"nombre": "Carlos", "activo": False},
    {"nombre": "Elena", "activo": True}
]
activos = list(filter(lambda u: u["activo"], usuarios))
print([u["nombre"] for u in activos])  # ['Ana', 'Elena']
```

---

#### 3. reduce() - Reducir a un solo valor

**Sintaxis:** `reduce(función, iterable, valor_inicial)`

Aplica una función **acumulativa** para reducir el iterable a un único valor.

**Importante:** `reduce()` está en el módulo `functools`, hay que importarla.

```python
from functools import reduce

# Problema: sumar todos los números
numeros = [1, 2, 3, 4, 5]

# Forma tradicional
total = 0
for num in numeros:
    total += num
print(total)  # 15
```
---

```python
# Con reduce() y función
def sumar(acumulador, valor):
    return acumulador + valor

total = reduce(sumar, numeros, 0)
print(total)  # 15

# Con reduce() y lambda
total = reduce(lambda acc, val: acc + val, numeros, 0)
print(total)  # 15
```

---

**Casos de uso:**
```python
from functools import reduce

# Multiplicar todos los números
numeros = [2, 3, 4, 5]
producto = reduce(lambda acc, val: acc * val, numeros, 1)
print(producto)  # 120 (2*3*4*5)

# Encontrar el máximo
numeros = [45, 23, 67, 12, 89, 34]
maximo = reduce(lambda acc, val: acc if acc > val else val, numeros)
print(maximo)  # 89

# Concatenar strings
palabras = ["Python", "es", "genial"]
frase = reduce(lambda acc, val: acc + " " + val, palabras)
print(frase)  # "Python es genial"
```

---

##### Comparación: map vs filter vs reduce

```python
numeros = [1, 2, 3, 4, 5]

# map() - Transforma cada elemento (misma cantidad de salida)
cuadrados = list(map(lambda x: x**2, numeros))
print(cuadrados)  # [1, 4, 9, 16, 25] - 5 elementos

# filter() - Filtra elementos (menos o igual cantidad de salida)
pares = list(filter(lambda x: x % 2 == 0, numeros))
print(pares)  # [2, 4] - 2 elementos

# reduce() - Reduce a un solo valor (1 elemento de salida)
from functools import reduce
suma = reduce(lambda acc, val: acc + val, numeros, 0)
print(suma)  # 15 - 1 valor
```
---

##### Encadenamiento (chaining)

Puedes combinar estas funciones para operaciones complejas:

```python
from functools import reduce

# Problema: Sumar el cuadrado de los números pares
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Paso a paso:
pares = filter(lambda x: x % 2 == 0, numeros)          # [2, 4, 6, 8, 10]
cuadrados = map(lambda x: x**2, pares)                 # [4, 16, 36, 64, 100]
suma = reduce(lambda acc, val: acc + val, cuadrados, 0) # 220

print(suma)  # 220

# En una línea:
resultado = reduce(
    lambda acc, val: acc + val,
    map(lambda x: x**2, filter(lambda x: x % 2 == 0, numeros)),
    0
)
print(resultado)  # 220
```

---

### EJERCICIOS: Programación funcional 

**Ejercicio 1: Conversión de precios**
```python
# Dada esta lista de precios en euros:
precios_euros = [19.99, 49.99, 12.50, 99.99, 5.00]

# Usa map() para:
# 1. Convertir a dólares (multiplica por 1.1)
# 2. Redondear a 2 decimales con round()
# Imprime la lista resultante
```
---
<details>
<summary>💡 Ver solución</summary>


**Solución Ejercicio 1:**
```python
precios_euros = [19.99, 49.99, 12.50, 99.99, 5.00]

# Conversión a dólares y redondeo
precios_dolares = list(map(lambda p: round(p * 1.1, 2), precios_euros))
print(precios_dolares)
# [21.99, 54.99, 13.75, 109.99, 5.5]

# Alternativa con dos maps:
precios_dolares = list(map(
    lambda p: round(p, 2),
    map(lambda p: p * 1.1, precios_euros)
))
print(precios_dolares)
```
</details>

---

**Ejercicio 2: Filtrado de aprobados**
```python
# Dada esta lista de calificaciones:
notas = [4.5, 7.0, 3.2, 8.5, 5.5, 9.0, 4.0, 6.5]

# Usa filter() para obtener solo las notas >= 5.0
# Luego usa map() para convertirlas a strings con formato "Nota: X.X"
```

---

<details>
<summary>💡 Ver solución</summary>

**Solución Ejercicio 2:**
```python
notas = [4.5, 7.0, 3.2, 8.5, 5.5, 9.0, 4.0, 6.5]

# Filtrar aprobados y formatear
aprobados = list(filter(lambda n: n >= 5.0, notas))
aprobados_formateados = list(map(lambda n: f"Nota: {n}", aprobados))
print(aprobados_formateados)
# ['Nota: 7.0', 'Nota: 8.5', 'Nota: 5.5', 'Nota: 9.0', 'Nota: 6.5']

# En una línea:
resultado = list(map(
    lambda n: f"Nota: {n}",
    filter(lambda n: n >= 5.0, notas)
))
print(resultado)
```
---

**Ejercicio 3: Estadísticas con reduce**
```python
# Dada esta lista de ventas diarias:
ventas = [150, 200, 175, 300, 250, 180, 220]

# Usa reduce() para:
# 1. Calcular el total de ventas
# 2. Encontrar la venta máxima (sin usar max())
# 3. Calcular el promedio (combina reduce con len())
```
---

<details>
<summary>💡 Ver solucion</summary>

**Solución Ejercicio 3:**
```python
from functools import reduce

ventas = [150, 200, 175, 300, 250, 180, 220]

# 1. Total
total = reduce(lambda acc, val: acc + val, ventas, 0)
print(f"Total: {total}")  # 1475

# 2. Máximo
maximo = reduce(lambda acc, val: acc if acc > val else val, ventas)
print(f"Máximo: {maximo}")  # 300

# 3. Promedio
promedio = reduce(lambda acc, val: acc + val, ventas, 0) / len(ventas)
print(f"Promedio: {promedio:.2f}")  # 210.71
```
</details>

---

### List/Dict Comprehensions (MUY PYTHON!)

```python
# Forma tradicional (con bucle)
cuadrados = []
for i in range(10):
    cuadrados.append(i ** 2)

# List Comprehension (en una línea)
cuadrados = [i**2 for i in range(10)]
print(cuadrados)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Con condición
pares = [x for x in range(20) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Dict Comprehension
cuadrados_dict = {x: x**2 for x in range(5)}
print(cuadrados_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Ejemplo práctico: convertir strings a maysculas
nombres = ["ana", "carlos", "elena"]
nombres_upper = [nombre.upper() for nombre in nombres]
print(nombres_upper)  # ['ANA', 'CARLOS', 'ELENA']
```

---

### EJERCICIOS: Comprehensions

**Ejercicio 1: Transformación de datos**
```python
# Dada esta lista de precios en euros:
precios_euros = [10.50, 25.00, 15.75, 8.99, 42.30]

# Usa list comprehension para:
# 1. Convertir a dólares (multiplicar por 1.1)
# 2. Redondear a 2 decimales
# 3. Filtrar solo precios mayores a 20 euros
```
---


<details>
<summary>💡 Ver solución</summary>

**Solucin Ejercicio 1:**
```python
precios_euros = [10.50, 25.00, 15.75, 8.99, 42.30]

# 1. Conversión a dlares
precios_dolares = [round(p * 1.1, 2) for p in precios_euros]
print(precios_dolares)
# [11.55, 27.5, 17.32, 9.89, 46.53]

# 2. Ya redondeados con round()

# 3. Filtrar mayores a 20
caros = [p for p in precios_euros if p > 20]
print(caros)
# [25.0, 42.3]
```
</details>

---

**Ejercicio 2: Procesamiento de texto**
```python
# Dada esta lista de palabras:
palabras = ["Python", "JavaScript", "IA", "Desarrollo", "Web", "Backend"]

# Usa comprehensions para:
# 1. Crear lista con la longitud de cada palabra
# 2. Filtrar solo palabras con más de 5 caracteres
# 3. Crear diccionario {palabra: longitud} solo para palabras largas (>6 chars)
```

---

<details>
<summary>💡 Ver solución</summary>

**Solucin Ejercicio 2:**
```python
palabras = ["Python", "JavaScript", "IA", "Desarrollo", "Web", "Backend"]

# 1. Longitudes
longitudes = [len(p) for p in palabras]
print(longitudes)  # [6, 10, 2, 11, 3, 7]

# 2. Filtrar largas (>5)
palabras_largas = [p for p in palabras if len(p) > 5]
print(palabras_largas)  # ['Python', 'JavaScript', 'Desarrollo', 'Backend']

# 3. Diccionario (>6)
dict_largas = {p: len(p) for p in palabras if len(p) > 6}
print(dict_largas)  # {'JavaScript': 10, 'Desarrollo': 11, 'Backend': 7}
```
</details>

---

**Ejercicio 3: Matriz de multiplicación**
```python
# Usa nested list comprehension para crear la tabla del 1 al 5:
# [[1, 2, 3, 4, 5],
#  [2, 4, 6, 8, 10],
#  [3, 6, 9, 12, 15],
#  [4, 8, 12, 16, 20],
#  [5, 10, 15, 20, 25]]
```
---

<details>
<summary>💡 Ver solución</summary>

**Solucin Ejercicio 3:**
```python
# Tabla de multiplicacin 5x5
tabla = [[i * j for j in range(1, 6)] for i in range(1, 6)]
for fila in tabla:
    print(fila)
# [1, 2, 3, 4, 5]
# [2, 4, 6, 8, 10]
# [3, 6, 9, 12, 15]
# [4, 8, 12, 16, 20]
# [5, 10, 15, 20, 25]
```
</details>

---

# ¿Preguntas?
