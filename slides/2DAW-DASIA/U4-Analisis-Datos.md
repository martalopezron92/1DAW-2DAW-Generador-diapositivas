---
marp: true
theme: default
paginate: true
# header: '**Unidad 4 · Análisis de Datos con Python**'
# footer: '© DAW · 2024-2025'
style: |
  section {
    font-family: 'Segoe UI', sans-serif;
    font-size: 1.1rem;
    background: #ffffff;
    color: #1e293b;
    padding: 2rem 3rem;
  }
  section.portada {
    background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  section.portada h1 {
    font-size: 2.4rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: white;
  }
  section.portada p {
    font-size: 1.2rem;
    color: #bfdbfe;
  }
  section.tema {
    background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  section.tema h1 {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    border-bottom: 3px solid #60a5fa;
    padding-bottom: 0.5rem;
  }
  section.tema p {
    color: #bfdbfe;
    font-size: 1.1rem;
  }
  h1 { color: #1e3a5f; font-size: 1.8rem; font-weight: 700; }
  h2 { color: #2563eb; font-size: 1.3rem; font-weight: 600; margin-top: 0.8rem; }
  h3 { color: #475569; font-size: 1.1rem; font-weight: 600; }
  code { background: #f1f5f9; color: #be185d; padding: 2px 6px; border-radius: 4px; font-size: 0.9rem; }
  pre { background: #f8fafc; color: #1e293b; padding: 1rem 1.2rem; border-radius: 8px; font-size: 0.85rem; border-left: 4px solid #2563eb; border: 1px solid #e2e8f0; }
  pre code { background: transparent; color: #1e293b; padding: 0; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th { background: #1e3a5f; color: white; padding: 8px 12px; text-align: left; }
  td { padding: 7px 12px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) { background: #f8fafc; }
  blockquote { border-left: 4px solid #2563eb; background: #eff6ff; padding: 0.6rem 1rem; border-radius: 0 6px 6px 0; color: #1e3a5f; font-style: normal; margin: 0.8rem 0; }
  ul { margin: 0.4rem 0; }
  li { margin: 0.3rem 0; }
  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  strong { color: #1e3a5f; }
---

<!-- _class: tema -->

# Unidad 4
## Análisis de Datos con Python

**Pandas · Visualización · Ciclo del Dato**


---

<!-- _class: tema -->

# 📌 Temario de la sesión

1. 🔍 ¿Qué es el análisis de datos?
2. 🔄 Ciclo de vida del dato & limpieza
3. 🐼 Pandas: fundamentos
4. 🔧 Operaciones con datos
5. 📊 Visualización con Matplotlib y Seaborn

---

# 🔍 ¿Qué es analizar datos?

> Es como ser detective: buscas **patrones en números y textos** para responder preguntas y tomar decisiones.

**Ejemplo: tus notas de programación**

```
7, 8, 4, 9, 7, 8, 10, 6, 8, 7
```

| Sin analizar | Analizando |
|---|---|
| Solo ves números | Media = **7.4** |
| No sabes nada | Nota más baja = **4** |
| No puedes actuar | Tendencia = **mejorando** 📈 |

**Conclusión**: Vas bien, pero debes evitar más suspensos.

---

# 📐 Los 4 tipos de análisis

| Tipo | Pregunta | Ejemplo |
|------|----------|---------|
| **Descriptivo** | ¿Qué pasó? | "Vendimos 500 productos este mes" |
| **Diagnóstico** | ¿Por qué? | "Bajaron ventas porque subimos precios 15%" |
| **Predictivo** | ¿Qué pasará? | "En diciembre venderemos ~2000 unidades" |
| **Prescriptivo** | ¿Qué hacer? | "Envía emails los martes a las 18h" |

> 💡 En este curso trabajamos principalmente **descriptivo y diagnóstico**

---

# 🔄 Ciclo de vida del dato

```
  OBTENCIÓN → ALMACENAMIENTO → LIMPIEZA → ANÁLISIS → VISUALIZACIÓN → DECISIONES
```

**Analogía de cocina** 🍳

| Fase del dato | En la cocina |
|---|---|
| Obtención | Compras ingredientes |
| Almacenamiento | Los guardas en la nevera |
| Limpieza | Los lavas y pelas |
| Análisis | Los cocinas |
| Visualización | Los emplateas bonito |
| Decisiones | Decides si repetir la receta |

---

# 🧹 Limpieza de datos — Los 4 problemas

---

## 1️⃣ Valores nulos

```csv
nombre,  edad,    ciudad
Ana,     25,      Madrid
Pedro,   ,        Barcelona    ← edad vacía
Luis,    30,                   ← ciudad vacía
```

**Opciones**: eliminar la fila · rellenar con media/moda · dejarlo si es irrelevante

---

## 2️⃣ Duplicados

```csv
id,  nombre,  edad
1,   Ana,     25
2,   Pedro,   30
1,   Ana,     25   ← duplicado exacto
```

**Solución**: eliminar con `df.drop_duplicates()`

---

## 3️⃣ Errores de formato

```csv
fecha
15/03/1998       ← DD/MM/YYYY
1998-03-15       ← ISO (correcto)
15-marzo-1998    ← mezcla texto
03/15/1998       ← formato americano
```

**Solución**: estandarizar todo a `YYYY-MM-DD`

---

## 4️⃣ Valores atípicos (Outliers)

```csv
edad
25, 30, 28, 22, 150, 27
                ↑ imposible → error
```

**¿Qué hacer?**
- Investigar si es error o dato real
- `edad = 150` → eliminar o corregir
- `ventas altas en Black Friday` → mantener

---

# ✅ Checklist antes de analizar

- [ ] ¿Hay **valores nulos**? ¿En qué columnas?
- [ ] ¿Hay **duplicados** exactos o parciales?
- [ ] ¿Los **formatos** son consistentes? (fechas, mayúsculas, números como texto)
- [ ] ¿Hay **outliers** sospechosos?
- [ ] ¿Los rangos son **lógicos**? (edad 0-120, precio > 0…)

---

<!-- _class: tema -->

# 🐼 Pandas: Fundamentos

*La librería estrella para analizar datos en Python*

---

# ¿Qué es Pandas?

> Como Excel, pero automatizado con código y con superpoderes.

**Instalación e importación**:

```python
pip install pandas
```

```python
import pandas as pd
```

**¿Para qué sirve?**
- Cargar datos (CSV, Excel, JSON, bases de datos…)
- Limpiar y transformar
- Filtrar, ordenar, agrupar
- Calcular estadísticas
- Preparar datos para visualizar

---

# 📊 El DataFrame

La estructura principal de Pandas: **tabla con filas y columnas**.

```python
import pandas as pd

datos = {
    'nombre': ['Ana', 'Pedro', 'María', 'Luis'],
    'edad':   [25, 30, 22, 28],
    'ciudad': ['Madrid', 'Barcelona', 'Valencia', 'Sevilla']
}

df = pd.DataFrame(datos)
print(df)
```

```
   nombre  edad     ciudad
0     Ana    25     Madrid
1   Pedro    30  Barcelona
2   María    22   Valencia
3    Luis    28    Sevilla
```

---

# 📁 Cargar datos

```python
# Desde CSV (lo más común)
df = pd.read_csv('ventas.csv')

# CSV con separador punto y coma
df = pd.read_csv('ventas.csv', sep=';', encoding='utf-8')

# Desde Excel
df = pd.read_excel('datos.xlsx', sheet_name='Ventas')

# Desde URL
df = pd.read_csv('https://ejemplo.com/datos.csv')
```

---

# 👀 Explorar el DataFrame

```python
df.head()        # Primeras 5 filas
df.tail(3)       # Últimas 3 filas
df.info()        # Tipos, nulos, memoria
df.describe()    # Estadísticas descriptivas
df.shape         # (100, 3) → filas, columnas
df.columns       # Nombres de columnas
df.dtypes        # Tipo de cada columna
```

**Salida de `df.describe()`**:
```
        edad
count  98.0   ← valores (sin nulos)
mean   28.5   ← media
std     4.1   ← desviación estándar
min    18.0
max    45.0
```

---

# 🔍 Seleccionar datos

```python
# Una columna → Series
df['edad']

# Varias columnas → DataFrame
df[['nombre', 'ciudad']]

# Por posición (como listas)
df.iloc[0]       # primera fila
df.iloc[0:3]     # filas 0, 1, 2
df.iloc[-1]      # última fila

# Por condición
df[df['edad'] > 25]
df[df['ciudad'] == 'Madrid']
df[(df['edad'] >= 20) & (df['edad'] <= 30)]
df[df['ciudad'].isin(['Madrid', 'Barcelona'])]
```

---

<!-- _class: tema -->

# 🔧 Operaciones con Datos

*Filtrar · Ordenar · Calcular · Agrupar*

---

# 🔍 Filtros avanzados

```python
# AND → usa &
madrid_mayores = df[(df['ciudad'] == 'Madrid') & (df['edad'] > 25)]

# OR → usa |
madrid_bcn = df[(df['ciudad'] == 'Madrid') | (df['ciudad'] == 'Barcelona')]

# Lista de valores → isin()
ciudades = ['Madrid', 'Barcelona', 'Valencia']
df[df['ciudad'].isin(ciudades)]

# Texto que contiene → str.contains()
df[df['email'].str.contains('gmail')]

# Nulos y no nulos
df[df['edad'].isnull()]    # Solo filas con edad nula
df[df['edad'].notnull()]   # Solo filas con edad
```

> ⚠️ **Nunca** uses `and` / `or`. Usa `&` / `|`

---

# 📊 Ordenar y calcular

```python
# Ordenar
df.sort_values('edad')                               # ascendente
df.sort_values('edad', ascending=False)              # descendente
df.sort_values(['ciudad', 'edad'], ascending=[True, False])

# Cálculos sobre columnas
df['precio'].sum()      # Suma total
df['precio'].mean()     # Media
df['precio'].median()   # Mediana
df['precio'].min()      # Mínimo
df['precio'].max()      # Máximo
df['ciudad'].nunique()  # Nº de valores únicos
df['ciudad'].value_counts()  # Frecuencia de cada valor
```

---

# ➕ Crear y modificar columnas

```python
# Nueva columna calculada
df['total'] = df['precio'] * df['cantidad']

# Con IVA
df['precio_iva'] = df['precio'] * 1.21

# Columna condicional con apply + lambda
df['categoria'] = df['edad'].apply(
    lambda x: 'Joven' if x < 30 else 'Adulto'
)

# Convertir texto a mayúsculas
df['ciudad'] = df['ciudad'].str.upper()

# Renombrar columnas
df = df.rename(columns={'precio': 'price', 'ciudad': 'city'})
```

---

# 👥 Agrupaciones — groupby()

La operación más potente de Pandas para **resumir por categorías**.

```python
# Ventas totales por ciudad
df.groupby('ciudad')['precio'].sum()

# Varias estadísticas a la vez
df.groupby('ciudad')['precio'].agg(['sum', 'mean', 'count'])

# Con nombres personalizados ✨
resumen = df.groupby('ciudad').agg(
    ventas_totales = ('precio', 'sum'),
    ticket_medio   = ('precio', 'mean'),
    num_ventas     = ('precio', 'count')
)
```

```
           ventas_totales  ticket_medio  num_ventas
ciudad
Barcelona          15620        234.94          66
Madrid             25430        189.48         134
```

---

# 🗑️ Eliminar datos

```python
# Eliminar columna(s)
df = df.drop('columna_innecesaria', axis=1)
df = df.drop(['col1', 'col2'], axis=1)

# Eliminar fila por índice
df = df.drop(0)

# Eliminar filas con valores nulos
df = df.dropna()

# Eliminar duplicados
df = df.drop_duplicates()
```

---

# 🔗 Combinar DataFrames

```python
# Concatenar (añadir filas)
df_total = pd.concat([df1, df2], ignore_index=True)

# Merge (unir por columna común, como JOIN en SQL)
df_completo = pd.merge(usuarios, compras, on='user_id')
```

**Resultado del merge**:
```
   user_id nombre producto  precio
0        1    Ana   Laptop     899
1        1    Ana    Mouse      25
2        2  Pedro  Teclado      45
```

---

# 🧪 Ejemplo práctico: Análisis de ventas

```python
import pandas as pd

df = pd.read_csv('ventas_ecommerce.csv')

# Resumen básico
print(f"Total de ventas: {len(df)}")
print(f"Total facturado: {df['precio'].sum():.2f}€")

# Top 5 productos más vendidos
print(df['producto'].value_counts().head(5))

# Ventas por ciudad con estadísticas
resumen = df.groupby('ciudad').agg(
    total     = ('precio', 'sum'),
    media     = ('precio', 'mean'),
    cantidad  = ('precio', 'count')
)
print(resumen.sort_values('total', ascending=False))

# Guardar resultado
df.to_csv('ventas_procesadas.csv', index=False)
```

---

<!-- _class: tema -->

# 📊 Representación Gráfica

*Matplotlib · Seaborn · El gráfico correcto*

---

# ¿Por qué visualizar?

> 💡 "Una imagen vale más que mil palabras"

**Tabla** vs **Gráfico**:

| Mes | Ventas |
|-----|--------|
| Ene | 5.000 |
| Feb | 5.200 |
| Mar | 4.800 |
| Abr | 6.000 |
| May | 7.500 |

Con la tabla tardas en ver la tendencia. Con un gráfico de líneas la ves **al instante** 📈

---

# 📦 Librerías y configuración

```python
pip install matplotlib seaborn
```

```python
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

# Estilo global
sns.set_style('whitegrid')
plt.rcParams['figure.figsize'] = (10, 6)
```

---

# 📊 ¿Qué gráfico usar?

| Objetivo | Tipo de Gráfico | Cuándo |
|----------|-----------------|--------|
| Comparar categorías | **Barras** | Ventas por ciudad |
| Evolución temporal | **Líneas** | Ventas mensuales |
| Proporciones | **Tarta** | % ventas por categoría |
| Distribución de valores | **Histograma** | Distribución de edades |
| Relación entre 2 variables | **Dispersión** | Precio vs ventas |
| Comparar distribuciones | **Boxplot** | Precios por categoría |

---

# 📊 Gráfico de Barras — Comparar categorías

```python
ventas = pd.DataFrame({
    'ciudad':  ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
    'ventas':  [25000, 18000, 12000, 8000]
})

plt.figure(figsize=(10, 6))
plt.bar(ventas['ciudad'], ventas['ventas'], color='skyblue')

plt.title('Ventas por Ciudad', fontsize=16, fontweight='bold')
plt.xlabel('Ciudad')
plt.ylabel('Ventas (€)')
plt.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.show()
```

---

# 📈 Gráfico de Líneas — Evolución temporal

```python
meses        = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
ventas_2023  = [5000, 5200, 4800, 6000, 7500, 8200]
ventas_2024  = [5500, 5800, 5200, 6500, 8000, 9000]

plt.figure(figsize=(10, 6))
plt.plot(meses, ventas_2023, marker='o', linewidth=2, label='2023', color='blue')
plt.plot(meses, ventas_2024, marker='s', linewidth=2, label='2024', color='green')

plt.title('Evolución de Ventas Mensuales', fontsize=16, fontweight='bold')
plt.xlabel('Mes')
plt.ylabel('Ventas (€)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

---

# 🥧 Gráfico de Tarta — Proporciones

```python
categorias = ['Electrónica', 'Ropa', 'Comida', 'Hogar']
ventas     = [35, 25, 20, 20]

plt.figure(figsize=(8, 8))
plt.pie(ventas, labels=categorias, autopct='%1.1f%%',
        startangle=90,
        colors=['#ff9999','#66b3ff','#99ff99','#ffcc99'])

plt.title('Distribución de Ventas por Categoría', fontsize=16)
plt.axis('equal')
plt.show()
```

> ⚠️ Úsalo solo con **pocas categorías** (máximo 5-6)

---

# 📊 Histograma — Distribución de valores

```python
import numpy as np

edades = np.random.normal(30, 10, 200)  # datos de ejemplo

plt.figure(figsize=(10, 6))
plt.hist(edades, bins=20, color='lightgreen',
         edgecolor='black', alpha=0.7)

plt.title('Distribución de Edades', fontsize=16, fontweight='bold')
plt.xlabel('Edad')
plt.ylabel('Frecuencia')
plt.grid(axis='y', alpha=0.3)
plt.show()
```

---

# 🔵 Dispersión (Scatter) — Relación entre variables

```python
precios = [10, 20, 30, 40, 50, 60, 70, 80]
ventas  = [100, 90, 80, 70, 60, 55, 45, 40]

plt.figure(figsize=(10, 6))
plt.scatter(precios, ventas, s=100, c='purple',
            alpha=0.6, edgecolors='black')

plt.title('Relación Precio vs Cantidad Vendida', fontsize=16)
plt.xlabel('Precio (€)')
plt.ylabel('Cantidad Vendida')
plt.grid(True, alpha=0.3)
plt.show()
```

---

# 🎨 Seaborn — Más bonito, menos código

```python
import seaborn as sns

# Barras mejoradas
sns.barplot(data=df, x='ciudad', y='ventas', palette='viridis')

# Boxplot: distribución por categoría
sns.boxplot(data=df, x='categoria', y='precio', palette='Set2')

# Heatmap: correlaciones entre variables
correlaciones = df[['edad', 'precio', 'cantidad']].corr()
sns.heatmap(correlaciones, annot=True, cmap='coolwarm', center=0)
plt.title('Correlaciones entre Variables')
plt.show()
```

---

# 🖼️ Dashboard: múltiples gráficos

```python
fig, axes = plt.subplots(2, 2, figsize=(15, 10))
fig.suptitle('Dashboard de Ventas 2024', fontsize=20, fontweight='bold')

# 1. Barras — Ventas por ciudad
ventas_ciudad = df.groupby('ciudad')['total'].sum().sort_values(ascending=False)
axes[0, 0].bar(ventas_ciudad.index, ventas_ciudad.values, color='skyblue')
axes[0, 0].set_title('Ventas por Ciudad')

# 2. Líneas — Evolución mensual
ventas_mes = df.groupby('mes')['total'].sum()
axes[0, 1].plot(ventas_mes.index, ventas_mes.values, marker='o', color='green')
axes[0, 1].set_title('Evolución Mensual')

plt.tight_layout()
plt.savefig('dashboard.png', dpi=300, bbox_inches='tight')
plt.show()
```

---

# 💡 Consejos para buenos gráficos

- ✅ **Título descriptivo** → siempre, que explique qué muestra
- ✅ **Etiquetas en los ejes** → sin ellas nadie entiende qué es cada cosa
- ✅ **Leyenda** → cuando comparas varias series
- ✅ **Colores moderados** → no más de 5-6 colores distintos
- ✅ **`tight_layout()`** → para que no se solapen elementos
- ✅ **Guardar en alta resolución** → `plt.savefig('g.png', dpi=300)`

---

# 🗺️ Resumen de la unidad

```
DATOS BRUTOS
     ↓
Ciclo del dato: Obtención → Almacenamiento → Limpieza
     ↓
Pandas: DataFrame, read_csv(), head(), info(), describe()
     ↓
Operaciones: filtrar, ordenar, calcular, groupby()
     ↓
Visualización: barras, líneas, tarta, histograma, scatter
     ↓
CONCLUSIONES Y DECISIONES
```

---

# 📋 Cheatsheet — Funciones clave

| Acción | Código |
|--------|--------|
| Cargar CSV | `pd.read_csv('datos.csv')` |
| Ver primeras filas | `df.head(10)` |
| Info general | `df.info()` |
| Estadísticas | `df.describe()` |
| Filtrar | `df[df['col'] > valor]` |
| Ordenar | `df.sort_values('col')` |
| Agrupar | `df.groupby('col')['num'].sum()` |
| Eliminar nulos | `df.dropna()` |
| Gráfico barras | `plt.bar(x, y)` |
| Gráfico líneas | `plt.plot(x, y, marker='o')` |

---

<!-- _class: tema -->

# ¡Ahora a practicar! 