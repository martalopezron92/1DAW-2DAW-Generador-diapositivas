---
marp: true
theme: custom
paginate: true
size: 16:9
title: Modelos supervisados: clasificación y regresión
description: Introducción didáctica para alumnado de DAW
---

<!-- _class: lead -->
# Modelos supervisados: clasificación y regresión
### Introducción 
- Qué aprende un modelo y cómo lo usa después.
- Diferencia clave: **predecir categorías** vs **predecir números**.
- Con ejemplos de web real: spam, fraude, tráfico y demanda.

<div class="footer-note">Unidad de introducción a Machine Learning supervisado</div>

---

# ¿Qué es un modelo supervisado?

- Un modelo supervisado aprende con **datos etiquetados**.
- Cada ejemplo trae:
  - **X (features)**: información de entrada.
  - **y (objetivo)**: respuesta correcta esperada.
- El objetivo: aprender una regla para **predecir y en datos nuevos**.

<svg width="940" height="280" viewBox="0 0 940 280" xmlns="http://www.w3.org/2000/svg">

  <rect x="20" y="40" width="250" height="180" rx="14" fill="#eff6ff" stroke="#93c5fd"/>
  <text x="45" y="80" font-size="24" fill="#1e3a8a">Datos etiquetados</text>
  <text x="45" y="118" font-size="19" fill="#334155">X: features</text>
  <text x="45" y="146" font-size="19" fill="#334155">y: respuesta correcta</text>

  <rect x="345" y="30" width="250" height="200" rx="14" fill="#ede9fe" stroke="#c4b5fd"/>
  <text x="400" y="110" font-size="28" fill="#5b21b6">Modelo</text>
  <text x="397" y="145" font-size="18" fill="#6d28d9">entrena y ajusta</text>

  <rect x="670" y="40" width="250" height="180" rx="14" fill="#dcfce7" stroke="#86efac"/>
  <text x="710" y="80" font-size="24" fill="#065f46">Predicción</text>
  <text x="695" y="118" font-size="19" fill="#334155">y estimada en</text>
  <text x="700" y="146" font-size="19" fill="#334155">datos no vistos</text>

  <line x1="270" y1="130" x2="345" y2="130" stroke="#0f172a" stroke-width="3" marker-end="url(#arrow)"/>
  <line x1="595" y1="130" x2="670" y2="130" stroke="#0f172a" stroke-width="3" marker-end="url(#arrow)"/>

  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#0f172a" />
    </marker>
  </defs>
</svg>

---

# Features (X) y variable objetivo (y)

<div class="card-grid">
  <div class="card">
    <span class="tag key">Definición</span>
    <ul class="tight">
      <li><strong>X</strong>: variables observables que describen un caso.</li>
      <li><strong>y</strong>: lo que queremos predecir.</li>
      <li>Un registro = una fila con X y su y.</li>
    </ul>
  </div>
  <div class="card">
    <span class="tag class">Clasificación</span>
    <p>y es una <strong>categoría</strong>: spam / no spam.</p>
    <span class="tag reg">Regresión</span>
    <p>y es un <strong>valor numérico</strong>: precio, visitas, tiempo.</p>
  </div>
</div>

| Caso | X (features) | y (objetivo) | Tipo |
|---|---|---|---|
| Email | nº enlaces, nº mayúsculas, contiene “gratis” | spam / no spam | Clasificación |
| Vivienda | m², habitaciones, barrio | precio (€) | Regresión |

---

# Clasificación vs regresión

| Aspecto | Clasificación | Regresión |
|---|---|---|
| Tipo de salida | Categoría discreta | Número continuo |
| Pregunta típica | “¿A qué clase pertenece?” | “¿Cuánto vale?” |
| Métricas frecuentes | Accuracy, precision, recall, F1 | MAE, MSE, RMSE, R² |
| Ejemplo cotidiano | Mensaje spam/no spam | Temperatura mañana (°C) |
| Ejemplo DAW | Comentario tóxico/no tóxico | Visitas esperadas por hora |

<div class="kpi">
Diferencia fundamental: <strong>categorías</strong> (clasificación) vs <strong>valores numéricos</strong> (regresión).
</div>

---

# Ejemplo visual de clasificación (spam / no spam)


**Interpretación**: el modelo aprende una frontera que separa las dos clases. 


<div class="two-cols">
  <div>
  <svg width="560" height="320" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg">

  <rect x="45" y="25" width="470" height="250" fill="#ffffff" stroke="#cbd5e1"/>
  <line x1="70" y1="250" x2="490" y2="250" stroke="#334155" stroke-width="2"/>
  <line x1="70" y1="250" x2="70" y2="45" stroke="#334155" stroke-width="2"/>
  <text x="395" y="286" font-size="16" fill="#334155">nº enlaces</text>
  <text x="10" y="60" font-size="16" fill="#334155" transform="rotate(-90 20,60)">nº mayúsculas</text>

  <circle cx="120" cy="210" r="7" fill="#2563eb"/>
  <circle cx="155" cy="195" r="7" fill="#2563eb"/>
  <circle cx="185" cy="215" r="7" fill="#2563eb"/>
  <circle cx="220" cy="190" r="7" fill="#2563eb"/>
  <circle cx="340" cy="120" r="7" fill="#dc2626"/>
  <circle cx="390" cy="100" r="7" fill="#dc2626"/>
  <circle cx="425" cy="130" r="7" fill="#dc2626"/>
  <circle cx="455" cy="90" r="7" fill="#dc2626"/>

  <line x1="280" y1="245" x2="300" y2="50" stroke="#7c3aed" stroke-width="4"/>
  <text x="305" y="88" font-size="15" fill="#6d28d9">frontera de decisión</text>
  <rect x="90" y="18" width="14" height="14" fill="#2563eb"/>
  <text x="110" y="30" font-size="15" fill="#334155">No spam</text>
  <rect x="185" y="18" width="14" height="14" fill="#dc2626"/>
  <text x="205" y="30" font-size="15" fill="#334155">Spam</text>

  </svg>

  </div>
  <div>

  | Enlaces | Mayúsculas | y |
  |---:|---:|---|
  | 1 | 4 | no spam |
  | 2 | 6 | no spam |
  | 7 | 18 | spam |
  | 9 | 22 | spam |
  | 3 | 5 | no spam |
  | 8 | 20 | spam |

  - Dato nuevo: (6 enlaces, 17 mayúsculas)
  - Predicción probable: **spam**

  </div>
</div>


---

# Ejemplo visual de regresión (visitas web)

<div class="two-cols">
  <div>

  <svg width="560" height="320" viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg">

  <rect x="45" y="25" width="470" height="250" fill="#ffffff" stroke="#cbd5e1"/>
  <line x1="70" y1="250" x2="490" y2="250" stroke="#334155" stroke-width="2"/>
  <line x1="70" y1="250" x2="70" y2="45" stroke="#334155" stroke-width="2"/>
  <text x="362" y="286" font-size="16" fill="#334155">inversión ads (€)</text>
  <text x="8" y="58" font-size="16" fill="#334155" transform="rotate(-90 18,58)">visitas/hora</text>

  <circle cx="120" cy="220" r="6" fill="#059669"/>
  <circle cx="160" cy="205" r="6" fill="#059669"/>
  <circle cx="200" cy="190" r="6" fill="#059669"/>
  <circle cx="250" cy="172" r="6" fill="#059669"/>
  <circle cx="310" cy="150" r="6" fill="#059669"/>
  <circle cx="360" cy="133" r="6" fill="#059669"/>
  <circle cx="420" cy="112" r="6" fill="#059669"/>

  <line x1="100" y1="230" x2="445" y2="105" stroke="#10b981" stroke-width="4"/>
  <text x="286" y="126" font-size="15" fill="#047857">línea de tendencia</text>
  </svg>

  <p class="caption">Interpretación: al aumentar la inversión, el modelo estima más visitas.</p>

</div>

<div>

| Inversión ads (€) | Visitas/hora |
|---:|---:|
| 50 | 120 |
| 70 | 140 |
| 100 | 165 |
| 130 | 190 |
| 170 | 225 |

- Dato nuevo: inversión = **120 €**
- Predicción aproximada: **180 visitas/hora**

</div>

</div>

---

# Entrenamiento vs predicción

<div class="card-grid">
  <div class="card">
    <span class="tag key">Fase 1: Entrenamiento</span>
    <ul class="tight">
      <li>El modelo ve pares <strong>(X, y)</strong>.</li>
      <li>Ajusta sus parámetros para reducir error.</li>
      <li>Necesita ejemplos representativos.</li>
    </ul>
  </div>
  <div class="card">
    <span class="tag key">Fase 2: Predicción</span>
    <ul class="tight">
      <li>Recibe solo <strong>X nuevo</strong>.</li>
      <li>Devuelve y estimada.</li>
      <li>No memoriza fila por fila: aplica patrón aprendido.</li>
    </ul>
  </div>
</div>

| Tipo de dato | X | y disponible | Uso |
|---|---|---|---|
| Entrenamiento | sí | sí | aprender |
| Nuevo dato | sí | no | predecir |

---

# Generalización: el objetivo real

<div class=two-cols>

<div>

- **Generalizar** = rendir bien en datos no vistos.
- Un buen modelo capta patrones, no detalles irrelevantes.
- El clasificador A generaliza mejor.
- El clasificador B parece “perfecto” en train, pero falla fuera.

</div>

<div>

| Métrica | Entrenamiento | Test |
|---|---:|---:|
| Accuracy clasificador A | 96% | 94% |
| Accuracy clasificador B | 100% | 71% |

</div>
</div>

<div class="kpi">
Objetivo en ML supervisado: minimizar error en producción, no solo en entrenamiento.
</div>

---

# Overfitting (sobreajuste)

<div class="two-cols">
<div>

- Definición: el modelo aprende **ruido** y casos particulares.
- Síntomas típicos:
  - Error muy bajo en train.
  - Error alto en test.
  - Curva de decisión excesivamente compleja.

<br>

| Conjunto | Error |
|---|---:|
| Train | 2% |
| Test | 23% |

</div>
<div>

<svg width="520" height="300" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">

<rect x="40" y="25" width="430" height="220" fill="#fff" stroke="#cbd5e1"/>
<line x1="65" y1="220" x2="445" y2="220" stroke="#334155" stroke-width="2"/>
<line x1="65" y1="220" x2="65" y2="45" stroke="#334155" stroke-width="2"/>
<path d="M70,190 C120,60 150,220 200,90 C240,20 290,250 330,100 C360,40 410,200 440,90" fill="none" stroke="#dc2626" stroke-width="4"/>
<circle cx="95" cy="180" r="5" fill="#2563eb"/>
<circle cx="130" cy="150" r="5" fill="#2563eb"/>
<circle cx="170" cy="170" r="5" fill="#2563eb"/>
<circle cx="220" cy="130" r="5" fill="#2563eb"/>
<circle cx="270" cy="140" r="5" fill="#2563eb"/>
<circle cx="320" cy="120" r="5" fill="#2563eb"/>
<circle cx="380" cy="130" r="5" fill="#2563eb"/>
<text x="85" y="262" font-size="15" fill="#334155">Curva demasiado compleja</text>

</svg>

<p class="caption">Analogía útil: memorizar respuestas de examen sin entender el tema.</p>

</div>
</div>

---

# Underfitting (infraajuste)

<div class="two-cols">
<div>

- Definición: el modelo es demasiado simple para el patrón real.
- Síntomas típicos:
  - Error alto en train.
  - Error también alto en test.
  - No captura relaciones importantes.

<br>

| Conjunto | Error |
|---|---:|
| Train | 19% |
| Test | 22% |

</div>
<div>

<svg width="520" height="300" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">

  <rect x="40" y="25" width="430" height="220" fill="#fff" stroke="#cbd5e1"/>
  <line x1="65" y1="220" x2="445" y2="220" stroke="#334155" stroke-width="2"/>
  <line x1="65" y1="220" x2="65" y2="45" stroke="#334155" stroke-width="2"/>

  <circle cx="90" cy="185" r="5" fill="#2563eb"/>
  <circle cx="130" cy="160" r="5" fill="#2563eb"/>
  <circle cx="170" cy="175" r="5" fill="#2563eb"/>
  <circle cx="210" cy="130" r="5" fill="#2563eb"/>
  <circle cx="250" cy="145" r="5" fill="#2563eb"/>
  <circle cx="290" cy="100" r="5" fill="#2563eb"/>
  <circle cx="330" cy="120" r="5" fill="#2563eb"/>
  <circle cx="370" cy="92" r="5" fill="#2563eb"/>

  <line x1="80" y1="160" x2="430" y2="160" stroke="#059669" stroke-width="4"/>
  <text x="120" y="262" font-size="15" fill="#334155">Modelo demasiado simple</text>
</svg>

<p class="caption">No memoriza, pero tampoco aprende bien el patrón.</p>

</div>
</div>

---

# Errores en clasificación: FP y FN

- **Falso positivo (FP)**: el modelo dice “sí” cuando era “no”.
- **Falso negativo (FN)**: el modelo dice “no” cuando era “sí”.

<br>

<div class="two-cols">

<div>

| Real \ Predicho | Positivo | Negativo |
|---|---:|---:|
| Positivo | Verdadero positivo (VP) | **Falso negativo (FN)** |
| Negativo | **Falso positivo (FP)** | Verdadero negativo (VN) |

</div>

<div>

| Contexto seguridad web: “login fraudulento” | Impacto |
|---|---|
| FP (bloquear usuario legítimo) | mala experiencia y soporte extra |
| FN (dejar pasar fraude real) | riesgo económico y reputacional |

</div>

</div>

<div class="kpi">Diseñar modelos implica decidir qué error duele más en tu caso de negocio.</div>

---

# Métricas en clasificación: qué mide cada una

<span class="tag class">Clasificación</span>

<div class = "two-cols">

<div>

- **Accuracy**: proporción de aciertos totales.
  - Fórmula: (VP + VN) / Total
- **Precision**: de los positivos predichos, cuántos eran correctos.
  - Fórmula: VP / (VP + FP)
- **Recall** (sensibilidad): de los positivos reales, cuántos detecta.
  - Fórmula: VP / (VP + FN)
- **F1-score**: equilibrio entre precision y recall.
  - Fórmula: 2 · (Precision · Recall) / (Precision + Recall)

</div>
<div>

| Métrica | Útil cuando... | Riesgo si la ignoras |
|---|---|---|
| Accuracy | clases equilibradas | puede ocultar errores en clase minoritaria |
| Precision | FP son costosos | bloquear usuarios válidos |
| Recall | FN son críticos | dejar pasar casos peligrosos |
| F1 | quieres equilibrio | optimizar solo una parte del problema |

</div>

</div>

---

# Ejemplo numérico de clasificación (paso a paso)

Supón 100 intentos de login y este resultado:

| Real \ Predicho | Fraude | No fraude |
|---|---:|---:|
| Fraude | VP = 18 | FN = 6 |
| No fraude | FP = 8 | VN = 68 |

<div class="card-grid">
  <div class="card">
    <strong>Accuracy</strong><br>
    (18 + 68) / 100 = <strong>0,86</strong> → 86%
  </div>
  <div class="card">
    <strong>Precision</strong><br>
    18 / (18 + 8) = <strong>0,69</strong>
  </div>
  <div class="card">
    <strong>Recall</strong><br>
    18 / (18 + 6) = <strong>0,75</strong>
  </div>
  <div class="card">
    <strong>F1</strong><br>
    2·(0,69·0,75)/(0,69+0,75)= <strong>0,72</strong>
  </div>
</div>

<p class="caption">Lectura: acierta bastante en global (86%), pero todavía pierde 1 de cada 4 fraudes reales (recall 0,75).</p>

---

# Métricas en regresión: medir cuánto te desvías

<span class="tag reg">Regresión</span>

<div class = "two-cols">

<div>

- **Error residual** = valor real − valor predicho.
- **MAE** (error absoluto medio): media de |error|.
- **MSE** (error cuadrático medio): media de error².
- **RMSE**: raíz de MSE, vuelve a la unidad original.
- **R²**: porcentaje de variabilidad explicado por el modelo.

</div>

<div>

| Métrica | Cómo se interpreta | Sensibilidad a outliers |
|---|---|---|
| MAE | error medio "en unidades reales" | media |
| MSE | penaliza mucho errores grandes | alta |
| RMSE | similar a MAE, pero castiga más grandes | alta |
| R² | 1 = perfecto, 0 ≈ predecir media | depende del contexto |

</div>

</div>

---

# Ejemplo numérico de regresión (visitas web)

<div class = "two-cols">

<div>

| Hora | Real (y) | Predicción (ŷ) | Error (y-ŷ) | Valor absoluto del Error | Error² |
|---:|---:|---:|---:|---:|---:|
| 10:00 | 120 | 110 | 10 | 10 | 100 |
| 11:00 | 150 | 160 | -10 | 10 | 100 |
| 12:00 | 170 | 180 | -10 | 10 | 100 |
| 13:00 | 200 | 190 | 10 | 10 | 100 |
| 14:00 | 210 | 205 | 5 | 5 | 25 |

</div>

<div>

- MAE = (10+10+10+10+5)/5 = **9 visitas**
- MSE = (100+100+100+100+25)/5 = **85**
- RMSE = √85 ≈ **9,22 visitas**
- R² (aprox) = **0,91**

</div>

<div class="kpi">Interpretación práctica: el modelo se equivoca, de media, en unas 9 visitas por hora.</div>

---

# ¿Cómo se calcula e interpreta R²?

<span class="tag reg">R² en regresión</span>

<div class="two-cols">

<div>

- Paso 1: calcula la media real: $\bar{y}$.
- Paso 2: calcula:
  - $SS_{tot}=\sum (y_i-\bar{y})^2$ (variación total)
  - $SS_{res}=\sum (y_i-\hat{y}_i)^2$ (error del modelo)
- Paso 3: aplica la fórmula: $R^2 = 1 - \frac{SS_{res}}{SS_{tot}}$

</div>

<div>

| i | y real | ŷ pred | (y-ŷ)² | (y-ȳ)² |
|---|---:|---:|---:|---:|
| 1 | 10 | 12 | 4 | 16 |
| 2 | 12 | 13 | 1 | 4 |
| 3 | 14 | 14 | 0 | 0 |
| 4 | 16 | 15 | 1 | 4 |
| 5 | 18 | 17 | 1 | 16 |

- $\bar{y}=14$, $SS_{res}=4+1+0+1+1=7$, $SS_{tot}=16+4+0+4+16=40$
- $R^2 = 1 - 7/40 = 0,825$

</div>

</div>

<div class="kpi">Interpretación: el modelo explica el 82,5% de la variación de y. Cuanto más cerca de 1, mejor ajuste.</div>

---

# Aplicaciones reales en DAW

| Caso real | Tipo | X (features) | y |
|---|---|---|---|
| Moderación de comentarios | Clasificación | palabras ofensivas, longitud, historial | tóxico / no tóxico |
| Detección de fraude en pagos | Clasificación | importe, país, hora, dispositivo | fraude / no fraude |
| Personalización de contenido | Clasificación | clics previos, tiempo de sesión | categoría de interés |
| Predicción de tráfico web | Regresión | día, hora, campaña activa | visitas esperadas |
| Predicción de demanda | Regresión | ventas históricas, estacionalidad | unidades esperadas |
| Recomendación de precio dinámico | Regresión | stock, competencia, demanda | precio sugerido |

- En DAW, estos modelos suelen vivir detrás de APIs o servicios backend.

---

# Mapa conceptual final

<svg width="980" height="430" viewBox="0 0 980 430" xmlns="http://www.w3.org/2000/svg">

  <rect x="365" y="170" width="250" height="90" rx="14" fill="#ede9fe" stroke="#c4b5fd"/>
  <text x="390" y="205" font-size="24" fill="#5b21b6">Aprendizaje</text>
  <text x="402" y="236" font-size="24" fill="#5b21b6">supervisado</text>

  <rect x="70" y="60" width="220" height="80" rx="12" fill="#e0f2fe" stroke="#93c5fd"/>
  <text x="95" y="108" font-size="21" fill="#0c4a6e">Datos etiquetados</text>

  <rect x="680" y="60" width="220" height="80" rx="12" fill="#dcfce7" stroke="#86efac"/>
  <text x="730" y="108" font-size="21" fill="#065f46">Predicción</text>

  <rect x="70" y="300" width="220" height="90" rx="12" fill="#dbeafe" stroke="#93c5fd"/>
  <text x="108" y="338" font-size="22" fill="#1d4ed8">Clasificación</text>
  <text x="102" y="365" font-size="17" fill="#334155">categorías</text>

  <rect x="680" y="300" width="220" height="90" rx="12" fill="#d1fae5" stroke="#6ee7b7"/>
  <text x="738" y="338" font-size="22" fill="#047857">Regresión</text>
  <text x="717" y="365" font-size="17" fill="#334155">valores numéricos</text>

  <rect x="360" y="320" width="260" height="70" rx="12" fill="#fee2e2" stroke="#fca5a5"/>
  <text x="401" y="350" font-size="20" fill="#b91c1c">Generalizar bien</text>
  <text x="386" y="372" font-size="15" fill="#7f1d1d">evitar overfitting/underfitting</text>

  <line x1="290" y1="100" x2="365" y2="185" stroke="#0f172a" stroke-width="3" marker-end="url(#a1)"/>
  <line x1="615" y1="185" x2="680" y2="100" stroke="#0f172a" stroke-width="3" marker-end="url(#a1)"/>
  <line x1="365" y1="240" x2="290" y2="330" stroke="#0f172a" stroke-width="3" marker-end="url(#a1)"/>
  <line x1="615" y1="240" x2="680" y2="330" stroke="#0f172a" stroke-width="3" marker-end="url(#a1)"/>
  <line x1="490" y1="260" x2="490" y2="320" stroke="#0f172a" stroke-width="3" marker-end="url(#a1)"/>

  <defs>
    <marker id="a1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#0f172a" />
    </marker>
  </defs>
</svg>

- Idea clave 1: aprendemos con datos etiquetados.
- Idea clave 2: clasificación ≠ regresión.
- Idea clave 3: lo importante es generalizar en datos nuevos.

---

# Conclusión breve

- Un modelo supervisado transforma ejemplos etiquetados en una función predictiva.
- Si el problema pide **clase**, usamos clasificación; si pide **valor**, regresión.
- En proyectos DAW, medir errores y generalización es tan importante como programar el modelo.

