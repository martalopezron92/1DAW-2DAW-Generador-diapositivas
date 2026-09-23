---
marp: true
theme: course-theme
paginate: true
---

<!-- _class: cover -->

# UD02. Modelo Entidad/Relación

Diseño conceptual de bases de datos

0484 · Bases de Datos · 1º DAW

---

# ¿Por qué diseño conceptual?

Antes de crear tablas en un SGBD concreto, hay que entender:

- **qué información** hay que almacenar;
- **cómo se relaciona** esa información entre sí.

<div class="definition">

El **diseño conceptual** representa la realidad de forma abstracta,
**sin depender de ningún SGBD** (Oracle, MySQL, PostgreSQL...).

</div>

Herramienta de referencia: el **modelo Entidad/Relación (E/R)**,
propuesto por **Peter Chen** (1976).

---

# Las tres fases del diseño de una BD

| Fase | Objetivo | Independencia del SGBD |
|---|---|---|
| **Conceptual** | Entidades, atributos, interrelaciones | Total |
| **Lógico** | Tablas, campos, claves | Del modelo de datos, no del SGBD |
| **Físico** | Almacenamiento y acceso | Del SGBD concreto |

```text
Universo del discurso
        │
        ▼
Diseño conceptual (Modelo E/R)      ← UD02
        │
        ▼
Diseño lógico (Modelo relacional)   ← UD03
        │
        ▼
Diseño físico (Implementación SGBD)
```

---

# El modelo Entidad/Relación

<div class="definition">

Modelo **semántico**: representa el *significado* de los datos,
no su implementación.

</div>

Características:

- No está ligado a ningún sistema físico ni exclusivamente informático.
- No existe un único modelo E/R "oficial" (Chen, Bachman, Martin, Rumbaugh...).
- En esta unidad se sigue la **notación clásica de Chen**
  (rectángulos, rombos, óvalos).

<div class="tag">Con el tiempo se amplió al modelo E/R Extendido (EER)</div>

---

# Entidades: concepto

<div class="definition">

**Entidad**: objeto real o abstracto, con existencia propia y
características diferenciadoras, del que se desea almacenar información.

</div>

Ejemplos: EMPLEADO, PROYECTO, ALUMNO, una reserva de hotel...

- **Conjunto de entidades**: todos los objetos que comparten atributos.
- **Ocurrencia (instancia)**: cada elemento individual del conjunto.

> Analogía POO: entidad ≈ clase · ocurrencia ≈ instancia de objeto.

**Representación**: rectángulo, nombre en mayúsculas y singular.

```text
┌───────────┐
│ EMPLEADO  │
└───────────┘
```

---

# Condiciones para ser una entidad

<div class="steps">

<div class="step">
<div class="step-number">1</div>
<div class="step-content">

Tiene **existencia propia**.

</div>
</div>

<div class="step">
<div class="step-number">2</div>
<div class="step-content">

Cada ocurrencia puede **diferenciarse** del resto.

</div>
</div>

<div class="step">
<div class="step-number">3</div>
<div class="step-content">

Todas las ocurrencias comparten las **mismas propiedades**.

</div>
</div>

</div>

---

# Entidades fuertes y débiles

<div class="two-cols">

<div>

## Entidad fuerte

- Existencia propia.
- No depende de otra entidad.
- Ejemplo: PROYECTO, DOCTOR.

```text
┌───────────┐
│  DOCTOR   │
└───────────┘
```

</div>

<div>

## Entidad débil

- Depende de una entidad fuerte.
- Sus atributos no bastan para
  identificarla unívocamente.
- Ejemplo: FAMILIAR (de EMPLEADO).

```text
╔═══════════╗
║ FAMILIAR  ║
╚═══════════╝
```

</div>

</div>

---

# Dependencia de una entidad débil

<div class="definition">

**Dependencia en existencia**: si desaparece la entidad fuerte,
desaparecen sus entidades débiles asociadas.

</div>

<div class="definition">

**Dependencia en identificación**: además, la entidad débil necesita
la **clave de la entidad fuerte** para identificarse unívocamente.

</div>

> Toda dependencia en identificación implica dependencia en existencia,
> **pero no al revés**.

En el diagrama, la interrelación se etiqueta con **"E"** o **"ID"**.

**Ejemplo**: un EJEMPLAR de un LIBRO necesita el código del LIBRO
para quedar identificado (dependencia en identificación).

---

# Atributos: concepto

<div class="definition">

**Atributo**: propiedad o característica de una entidad o interrelación.
Toma valores de un **dominio**.

</div>

**Representación**: óvalo unido mediante línea a la entidad,
nombre en minúsculas.

```text
                ┌── (dni)
┌───────────┐   │
│ EMPLEADO  │───┼── (nombre)
└───────────┘   │
                └── (fecha_nacimiento)
```

Cada atributo debe tener **nombre único** dentro de su entidad.

---

# Clasificación de los atributos

| Criterio | Tipos | Definición |
|---|---|---|
| Obligatoriedad | Obligatorio / Opcional | Debe o no tener siempre valor |
| Divisibilidad | Simple / Compuesto | Se puede o no descomponer en partes con significado |
| Multiplicidad | Monovaluado / Multivaluado | Uno o varios valores por ocurrencia |
| Origen | Almacenado / Derivado | Se calcula o no a partir de otros atributos |

<div class="muted">

Estos criterios **no son excluyentes**: un atributo puede ser, por
ejemplo, opcional, simple, monovaluado y almacenado a la vez.

</div>

---

# Atributos compuestos y multivaluados

**Compuesto**: `direccion` se descompone en `calle`, `numero`, `codigo_postal`.

```text
                    ┌── (calle)
PERSONA ── (direccion) ── (numero)
                    └── (codigo_postal)
```

**Multivaluado**: un mismo CLIENTE puede tener varios `telefono`.
Se representa con óvalo de **doble borde**.

```text
PERSONA ══ (telefono) [multivaluado]
```

---

# Atributos de una interrelación

No solo las entidades tienen atributos: **las interrelaciones también**.

**Ejemplo**: en CURSA (entre ALUMNO y ASIGNATURA), el atributo `nota`
no pertenece al alumno ni a la asignatura, sino al **hecho de cursar**.

```text
[ALUMNO] ───── { CURSA } ───── [ASIGNATURA]
                    │
                  (nota)
```

<div class="muted">

Otro caso típico: hechos históricos (fecha de una factura,
fecha de una reserva...).

</div>

---

# Claves: identificar cada ocurrencia

| Concepto | Definición |
|---|---|
| **Superclave** | Conjunto de atributos que identifica de forma única (puede tener atributos de más) |
| **Clave candidata** | Superclave mínima: no se puede quitar ningún atributo |
| **Clave primaria (PK)** | Clave candidata elegida por el diseñador; no admite `NULL` |
| **Clave alternativa** | Resto de claves candidatas no elegidas |

---

# Ejemplo de claves

Entidad TRABAJADOR: `nombre`, `apellido_1`, `apellido_2`, `dni`,
`numero_afiliacion_ss`, `fecha_nacimiento`, `codigo_empresa`.

- `dni` → **clave candidata** ✓
- `numero_afiliacion_ss` → **clave candidata** ✓
- `{nombre, apellido_1, apellido_2}` → **no válida** ✗
  (puede haber homónimos)

Si se elige `dni` como **clave primaria**,
`numero_afiliacion_ss` pasa a ser **clave alternativa**.

**Representación**: atributo clave **subrayado** (o círculo relleno = AIP).

```text
EMPLEADO ── (dni) [subrayado]
```

---

# Claves compuestas

Una clave puede estar formada por **más de un atributo** cuando ninguno,
por separado, identifica unívocamente cada ocurrencia.

<div class="warning">

Caso típico: una entidad débil con **dependencia en identificación**.
Su clave = atributos propios + clave de la entidad fuerte de la que depende.

</div>

**Ejemplo**: PISO (entidad débil de BLOQUE_PISOS) se identifica con
`clave(BLOQUE_PISOS) + escalera + planta + puerta`.

---

# Interrelaciones: concepto

<div class="definition">

**Interrelación**: asociación entre ocurrencias de una o más entidades.

</div>

**Representación**: rombo con un verbo en singular
(*pertenece*, *imparte*, *tiene*), conectado a las entidades.

```text
[EMPLEADO] ───── { PERTENECE } ───── [DEPARTAMENTO]
```

Para describirla completamente hace falta determinar:

1. su **grado**;
2. su **cardinalidad** (tipo de correspondencia);
3. la **cardinalidad de participación** de cada entidad.

---

# Grado de una interrelación

<div class="definition">

**Grado**: número de entidades que participan en la interrelación.

</div>

| Grado | Nombre | Ejemplo |
|---|---|---|
| 1 | Unaria (reflexiva) | EMPLEADO *es jefe de* EMPLEADO |
| 2 | Binaria | EMPLEADO *pertenece a* DEPARTAMENTO |
| 3 | Ternaria | PROFESOR *evalúa a* ALUMNO *en* EXAMEN |
| n | n-aria | Poco habitual; valorar descomponer |

En interrelaciones **reflexivas**, cada arco se etiqueta con el **rol**
(*jefe* / *subordinado*).

---

# Cardinalidad de la interrelación

<div class="definition">

**Cardinalidad (tipo de correspondencia)**: número máximo de ocurrencias
de cada entidad que participan en una ocurrencia de la interrelación.

</div>

| Cardinalidad | Lectura | Ejemplo |
|---|---|---|
| **1:1** | Una con una | ALUMNO ↔ EXPEDIENTE |
| **1:N** | Una con varias | DOCENTE imparte varias ASIGNATURAS |
| **N:1** | Varias con una | JUGADORES pertenecen a un EQUIPO |
| **M:N** | Varias con varias | ALUMNOS ↔ ASIGNATURAS (matrícula) |

---

# Cardinalidad de participación (mín, máx)

<div class="definition">

Indica el número **mínimo y máximo** de veces que cada ocurrencia de una
entidad participa en la interrelación. Se anota **junto a la entidad
contraria**.

</div>

- **Mínima**: `0` (opcional) o `1` (obligatoria).
- **Máxima**: `1`, un valor concreto, o `n`.

**Ejemplo** — PERTENECE entre EMPLEADO y DEPARTAMENTO:

```text
[EMPLEADO] ── (1,1) ── { PERTENECE } ── (0,n) ── [DEPARTAMENTO]
```

`(1,1)` junto a DEPARTAMENTO (departamentos por empleado) ·
`(0,n)` junto a EMPLEADO (empleados por departamento).

---

# Comprueba tu comprensión

> Un USUARIO puede crear varias PARTIDAS o ninguna.
> Cada PARTIDA está creada por un único USUARIO.
>
> ¿Qué cardinalidades corresponden en la interrelación CREA?

<div class="card-grid">

<div class="card">

### USUARIO

`(1,1)` — se coloca junto a PARTIDA

</div>

<div class="card">

### PARTIDA

`(0,n)` — se coloca junto a USUARIO

</div>

</div>

---

# Interrelaciones ternarias

Conectividad con tres símbolos: **1** = "uno", **M, N, P** = "muchos".
Posibles: `1:1:1`, `N:1:1`, `M:N:1`, `M:N:P`.

<div class="steps">

<div class="step">
<div class="step-number">1</div>
<div class="step-content">Fijar una ocurrencia de las **otras dos** entidades.</div>
</div>

<div class="step">
<div class="step-number">2</div>
<div class="step-content">¿Se asocia una **única** ocurrencia de la primera, o **varias**?</div>
</div>

<div class="step">
<div class="step-number">3</div>
<div class="step-content">Anotar "uno" o "muchos" según la respuesta.</div>
</div>

<div class="step">
<div class="step-number">4</div>
<div class="step-content">Repetir para cada una de las tres entidades.</div>
</div>

</div>

---

# Ejemplo: interrelación ternaria CLASE

ASIGNATURA, AULA, HORA-SEMANAL (atributo `duracion`).

- Fijadas AULA y HORA-SEMANAL → **una única** ASIGNATURA → "uno".
- Fijadas ASIGNATURA y AULA → **varias** HORA-SEMANAL → "muchos".
- Fijadas ASIGNATURA y HORA-SEMANAL → **una única** AULA → "uno".

**Resultado: conectividad N:1:1**

```text
        [ASIGNATURA]
             │
[HORA-SEMANAL]──{ CLASE }──[AULA]
             │
         (duracion)
```

<div class="muted">

Algunas ternarias se pueden descomponer en binarias; otras **no**
sin perder significado. Hay que estudiarlo caso a caso.

</div>

---

# Restricciones de integridad en el modelo E/R

| Restricción | Dónde se expresa | Ejemplo |
|---|---|---|
| **Dominio** | Valores permitidos del atributo | `edad` ≥ 0 |
| **Unicidad** | Clave primaria | No hay dos `dni` iguales |
| **Obligatoriedad** | Atributo obligatorio/opcional | VIVIENDA exige `direccion` |
| **Participación mínima** | Cardinalidad mínima | EMPLEADO en ≥1 DEPARTAMENTO |
| **Participación máxima** | Cardinalidad máxima | EMPLEADO en ≤1 DEPARTAMENTO |
| **Dependencia en existencia** | Interrelación "E" | FAMILIAR desaparece con EMPLEADO |
| **Dependencia en identificación** | Interrelación "ID" | EJEMPLAR necesita clave de LIBRO |

---

# Restricciones representables y no representables

<div class="two-cols">

<div>

## Representables

Se expresan directamente con la
simbología del diagrama E/R:
dominios, claves, cardinalidades,
dependencias E/ID.

</div>

<div>

## No representables

Reglas de negocio sin traducción
gráfica directa. Se documentan
aparte (texto).

**Ejemplo**: "la suma de horas
semanales de un docente no puede
superar 25".

</div>

</div>

---

<!-- _class: section-slide -->

# Modelo Entidad/Relación Extendido (EER)

Generalización · Restricciones entre relaciones · Agregación

---

# Simbología básica: resumen

| Elemento | Símbolo |
|---|---|
| Entidad fuerte | Rectángulo |
| Entidad débil | Rectángulo de doble borde |
| Interrelación | Rombo |
| Atributo | Óvalo |
| Atributo clave (AIP) | Óvalo subrayado / círculo relleno |
| Atributo multivaluado | Óvalo de doble borde |
| Atributo compuesto | Óvalo con componentes colgando |
| Cardinalidad de entidad | Etiqueta (mín, máx) |
| Jerarquía (ES_UN) | Triángulo invertido |

---

# Generalización / especialización

<div class="definition">

**Superclase**: entidad de nivel superior con las características comunes.
**Subclase**: cada categoría con atributos propios.
**Herencia**: subclases heredan atributos e interrelaciones del supertipo.

</div>

La relación se llama **ES_UN** (*IS A*):

```text
        [VEHICULO]
             │
           ▽ ES_UN
      ┌──────┴──────┐
 [TURISMO]      [CAMION]
```

---

# Restricciones semánticas de una jerarquía

| Eje | Valores | Significado |
|---|---|---|
| Cobertura | **Total** | Todo ejemplar del supertipo está en alguna subclase |
| | **Parcial** | Puede haber ejemplares en ninguna subclase |
| Solapamiento | **Exclusiva** | Como máximo una subclase por ejemplar |
| | **Con solapamiento** | Puede pertenecer a varias subclases |

**Ejemplos**:

- Total + disjunta: EMPLEADO es DOCENTE o NO_DOCENTE, nunca ambas.
- Parcial + solapamiento: EMPLEADO puede ser DOCENTE y/o INVESTIGADOR,
  o ninguno de los dos.

---

# Ejemplo de jerarquía: VEHICULO

TURISMO (`num_bastidor`, `fecha_fab`, `precio`, `num_puertas`) y
CAMIÓN (`num_bastidor`, `fecha_fab`, `precio`, `num_ejes`, `tonelaje`)
comparten tres atributos.

```text
                [VEHICULO]
        (num_bastidor, fecha_fab, precio)
                    │
                  ▽ ES_UN (parcial, con solapamiento)
        ┌───────────┴───────────┐
   [TURISMO]                [CAMION]
  (num_puertas)         (num_ejes, tonelaje)
```

Se crea la superclase **VEHICULO** con los atributos comunes;
cada subtipo conserva sus atributos específicos.

---

# Restricciones entre relaciones (EER)

| Restricción | Significado |
|---|---|
| **Exclusividad** | Solo puede participar en **una** de varias interrelaciones a la vez |
| **Exclusión** | Solo una de las dos, en un momento dado (puede alternar) |
| **Inclusividad** | Para participar en una, antes debe haber participado en otra |
| **Inclusión** | La misma ocurrencia debe estar asociada en ambas interrelaciones |

**Ejemplos**:

- *Exclusividad*: un MÚSICO **dirige** o **toca**, nunca ambas a la vez.
- *Inclusión*: para **divorciarse**, antes hay que haberse **casado**
  (con la misma persona).

---

# Agregación

El modelo E/R básico no permite relaciones **entre relaciones**.
La **agregación** trata una interrelación (con sus entidades) como
una **entidad de nivel superior**.

```text
┌─── Agregado: ENTREVISTA ───┐
│ [ASPIRANTE]──{ENTREVISTA}──[EMPRESA] │
└──────────────┬──────────────┘
               │
         { DERIVA_EN }
               │
           [OFERTA]
```

<div class="tag">La entidad agregada tiene siempre cardinalidad (1,1) respecto a la interrelación que engloba</div>

---

# Dos variantes de agregación

| Tipo | Definición | Ejemplo |
|---|---|---|
| **Compuesto/componente** | Partes de **distinto tipo**, con rol diferente | PEDIDO agrega LÍNEA_PEDIDO (con PRODUCTO) |
| **Miembro/colección** | Partes del **mismo tipo**, mismo rol | ALUMNOS de una misma CLASE |

---

<!-- _class: section-slide -->

# Elaboración de diagramas E/R

Procedimiento sistemático

---

# Procedimiento para construir el diagrama

<div class="steps">

<div class="step">
<div class="step-number">1</div>
<div class="step-content">Identificar **entidades**: sustantivos con existencia propia.</div>
</div>

<div class="step">
<div class="step-number">2</div>
<div class="step-content">Identificar **interrelaciones**: verbos que conectan entidades.</div>
</div>

<div class="step">
<div class="step-number">3</div>
<div class="step-content">Determinar **grado y cardinalidad** de cada interrelación.</div>
</div>

<div class="step">
<div class="step-number">4</div>
<div class="step-content">Identificar **atributos** de entidades e interrelaciones.</div>
</div>

<div class="step">
<div class="step-number">5</div>
<div class="step-content">Identificar **claves** candidatas y elegir la primaria.</div>
</div>

<div class="step">
<div class="step-number">6</div>
<div class="step-content">Determinar **jerarquías** (generalización/especialización).</div>
</div>

<div class="step">
<div class="step-number">7</div>
<div class="step-content">**Representar** el esquema completo y revisar la redundancia.</div>
</div>

</div>

---

# Regla lingüística de apoyo

<div class="warning">

No es determinista: requiere sentido común del diseñador.

</div>

| Elemento lingüístico | Probable elemento E/R |
|---|---|
| Sustantivo común (sujeto / CD) | Entidad |
| Nombre propio | Ocurrencia de entidad |
| Verbo | Interrelación |
| Preposición entre dos nombres | Interrelación **o** atributo, según el contexto |

**Ejemplo**: "el departamento *del* empleado" → interrelación.
"la dirección *del* empleado" → atributo.

---

# Redundancia en el diagrama

<div class="definition">

**Redundancia**: almacenar la misma información en varios lugares
del esquema.

</div>

Provoca:

- mayor carga de trabajo al actualizar;
- mayor gasto de almacenamiento;
- **inconsistencia** (datos duplicados no sincronizados).

Fuentes habituales:

- **Atributos derivados** calculados a partir de otros ya almacenados.
- **Ciclos** en el diagrama (no siempre implican redundancia:
  hay que estudiar cardinalidades y semántica con detenimiento).

---

# Metodologías para construir el esquema

| Metodología | Estrategia |
|---|---|
| **Descendente (Top-Down)** | De lo general a lo particular |
| **Ascendente (Bottom-Up)** | De atributos → entidades → interrelaciones |
| **Dentro-fuera (Inside-Out)** | Se empieza por una parte y se amplía |
| **Mixta** | Descendente para dividir + ascendente dentro de cada parte |

<div class="muted">

No existe una metodología universalmente superior: depende del
problema y de la experiencia del diseñador.

</div>

---

<!-- _class: section-slide -->

# Caso práctico: catastro municipal

Aplicación integral del procedimiento

---

# Enunciado del problema

> Se desea gestionar el catastro de viviendas de un municipio.
> El municipio se divide en **zonas urbanas**, con **calles** y
> **viviendas**. Las viviendas pueden ser **unifamiliares** o
> **bloques de pisos** (con varios **pisos**, cada uno habitado por
> una familia). De cada vivienda interesan metros cuadrados, calle,
> número, código postal (y en pisos: escalera, planta, puerta).
> De cada vivienda se conoce su **propietario**. De las **personas**
> se conoce su residencia y quién es el cabeza de familia.

---

# Entidades y jerarquía identificadas

- **MUNICIPIO**, **ZONA_URBANA**, **CALLE**, **VIVIENDA**, **PERSONA**.
- VIVIENDA se especializa en **VIVIENDA_UNIFAMILIAR** y
  **BLOQUE_PISOS** (jerarquía **total y disjunta**).
- **PISO**: entidad débil dependiente de BLOQUE_PISOS
  (dependencia en identificación).

```text
              [VIVIENDA]
                  │
                ▽ ES_UN (total, disjunta)
        ┌─────────┴─────────┐
[VIVIENDA_UNIFAMILIAR]  [BLOQUE_PISOS]
                              │
                        ╔═══════════╗
                        ║   PISO    ║
                        ╚═══════════╝
```

---

# Interrelaciones y cardinalidades

| Interrelación | Entidades | Cardinalidades |
|---|---|---|
| **HABITA** | PERSONA–VIVIENDA | (1,1) en PERSONA · (0,n) en VIVIENDA |
| **ES_PROPIETARIO_DE** | PERSONA–VIVIENDA | (0,n) en PERSONA · (1,1) en VIVIENDA |
| **PERTENECE_A** | VIVIENDA–ZONA_URBANA | (1,1) en VIVIENDA · (0,n) en ZONA_URBANA |

```text
[PERSONA]──(1,1)──{HABITA}──(0,n)──[VIVIENDA]──(1,1)──{PERTENECE_A}──(0,n)──[ZONA_URBANA]
[PERSONA]──(0,n)──{ES_PROPIETARIO_DE}──(1,1)──[VIVIENDA]
```

---

# Claves del modelo

| Entidad | Clave |
|---|---|
| PERSONA | `dni` |
| VIVIENDA | `codigo_postal + calle + numero` |
| ZONA_URBANA | `nombre` (único en el municipio) |
| PISO | clave(BLOQUE_PISOS) + `escalera + planta + puerta` |

<div class="success">

Este ejemplo integra: entidades fuertes y débiles, jerarquía de
generalización, interrelaciones con distintas cardinalidades y
claves simples y compuestas.

</div>

---

# Síntesis de la unidad

<div class="card-grid">

<div class="card">

### Elementos básicos

Entidades (fuertes/débiles),
atributos (simple/compuesto,
mono/multivaluado, almacenado/
derivado) e interrelaciones.

</div>

<div class="card">

### Claves

Superclave → clave candidata →
clave primaria / alternativa.
Pueden ser compuestas.

</div>

<div class="card">

### Cardinalidades

Grado, tipo de correspondencia
(1:1, 1:N, N:1, M:N) y
cardinalidad de participación
(mín, máx).

</div>

<div class="card">

### Restricciones

De dominio, unicidad,
obligatoriedad, participación,
dependencia en existencia/
identificación.

</div>

<div class="card">

### Modelo EER

Generalización/especialización,
restricciones entre relaciones,
agregación.

</div>

<div class="card">

### Procedimiento

Identificar entidades →
interrelaciones → atributos →
claves → jerarquías →
representar → revisar redundancia.

</div>

</div>

---

<!-- _class: cover -->

# ¿Qué viene después?

El diagrama E/R construido en esta unidad es la base para obtener,
en **UD03**, el **diseño lógico** (modelo relacional): tablas,
campos y claves foráneas, mediante reglas de transformación.
