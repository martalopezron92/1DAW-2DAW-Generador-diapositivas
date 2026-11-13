---
marp: true
theme: default
paginate: true
lang: es
footer: 'Tema 2 · Bases de Datos Relacionales · Parte I: Modelo E/R'
style: |
  section {
    font-size: 24px;
    padding: 50px 60px;
  }
  h1, h2 { color: #1e5631; }
  h2 { border-bottom: 3px solid #c9a227; padding-bottom: 6px; }
  strong { color: #1e5631; }
  table { font-size: 20px; margin: 0 auto; }
  blockquote {
    border-left: 6px solid #c9a227;
    background: #fbf6e6;
    padding: 10px 18px;
    font-style: normal;
    color: #333;
  }
  pre.mermaid {
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    margin: 10px 0;
    padding: 0;
  }
  pre.mermaid svg { max-height: 360px; max-width: 100%; }
  .cols pre.mermaid svg { max-height: 300px; }
  section.grados pre.mermaid svg { max-height: 105px; }
  section.grados pre.mermaid { margin: 2px 0; }
  section.grados p { margin: 4px 0; }
  section.wide pre.mermaid svg { max-height: 300px; }
  section.big pre.mermaid svg { max-height: 470px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start; }
  .small { font-size: 19px; }
  .center { text-align: center; }
  section.portada {
    background: linear-gradient(135deg, #1e5631 0%, #2e7d4f 100%);
    color: #fff;
    justify-content: center;
  }
  section.portada h1 { color: #fff; font-size: 58px; border: none; }
  section.portada h2 { color: #f3e3a4; border: none; }
  section.portada footer, section.transicion footer { color: #d9f2e0; }
  section.transicion {
    background: linear-gradient(135deg, #1e5631 0%, #2e7d4f 100%);
    color: #fff;
    justify-content: center;
    text-align: center;
  }
  section.transicion h1 { color: #fff; font-size: 54px; }
  section.transicion p, section.transicion li { color: #e6f4ea; font-size: 26px; }
  section.transicion strong { color: #f3e3a4; }
  section.transicion::after { color: #d9f2e0; }
  table{
    margin: 20px auto;
  }
---

<!--
  Presentación en formato Marp con diagramas Mermaid.
  Para que los diagramas se vean es necesario permitir HTML:
   - Marp CLI:  marp --html UD2_Modelo_ER_Parte_I.md
   - VS Code:   activar "Markdown › Marp: Enable HTML" en los ajustes.
  Las cajas marcadas con 💡 son aclaraciones añadidas para facilitar la comprensión.
-->

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'neutral', themeVariables: { fontSize: '18px' }, flowchart: { htmlLabels: true, curve: 'linear' } });
</script>

<!-- _class: portada -->
<!-- _paginate: false -->

# Tema 2.- Bases de Datos Relacionales

## PARTE I: EL MODELO ENTIDAD/RELACIÓN

---

## Índice

1. **Introducción**
2. **Elementos del Modelo de Entidad / Relación**
   - 2.1. Elementos básicos del modelo
   - 2.2. Relaciones Reflexivas
   - 2.3. Entidades fuertes y débiles. Relación de dependencia
   - 2.4. Relaciones n-arias
   - 2.5. Control de redundancia
   - 2.6. Modelo E/R Extendido

> 💡 **Cómo usar esta presentación:** cada apartado empieza con una diapositiva verde de transición. Al final de cada bloque hay un pequeño resumen con lo más importante.

---

<!-- _class: transicion -->

# 1. Introducción

¿Qué es el modelo Entidad/Relación y para qué sirve?

---

## 1. Introducción

- En el **Esquema Conceptual (Lógico)** se definen todos los datos que intervienen en el problema y sus relaciones. El modelo más conocido es el llamado de **Entidad / Relación (E/R)**, que fue propuesto por **Peter Chen en 1976**.

- Dicho esquema usa una serie de **Símbolos y Reglas** para representar los datos y las relaciones entre ellos.

- Una vez obtenido el modelo E/R, se podrá pasar a los diferentes **Modelos de BD**: Jerárquico, en Red, Relacional; de una forma sencilla.

---

## 1. Introducción · ¿Dónde encaja el modelo E/R?

<pre class="mermaid">
flowchart LR
    A["🌍 Problema del<br/>mundo real"] --> B["📐 Esquema conceptual<br/><b>Modelo E/R</b>"]
    B --> C["Modelo Jerárquico"]
    B --> D["Modelo en Red"]
    B --> E["<b>Modelo Relacional</b>"]
</pre>

> 💡 **Para entenderlo mejor:** el modelo E/R es como el **plano de una casa**. Antes de construir (crear las tablas en un SGBD), el arquitecto dibuja un plano independiente de los materiales que se usarán. Ese plano después se puede "construir" con distintos modelos de BD.

---

<!-- _class: transicion -->

# 2. Elementos del Modelo Entidad/Relación

Las "piezas" con las que se construye cualquier diagrama E/R

---

## 2. Elementos del Modelo Entidad/Relación

**2.1. Elementos básicos del modelo**
<div class="cols small">
<div>

- Entidades
- Relaciones
- Atributos
- Grado de una relación
- Cardinalidad de una relación

</div>
<div>

- Atributos Propios
- Claves
- Ocurrencias de una relación
- Participación de la entidad en la relación

</div>
</div>

**2.2.** Relaciones Reflexivas
**2.3.** Entidades fuertes y débiles. Relación de dependencia.
**2.4.** Relaciones n-arias.
**2.5.** Control de redundancia.
**2.6.** Modelo E/R Extendido

---

<!-- _class: transicion -->

# 2.1. Elementos básicos del modelo E/R

**Entidades** · Atributos · Relaciones · Grado · Cardinalidad · Atributos propios · Claves · Participación

---

## 2.1. Entidad · Definición

**Una entidad es un objeto real o abstracto sobre el que se recoge una cierta información para la BD.**

Las entidades pueden ser **no solo las cosas tangibles** (Facturas, Albaranes, Productos de un supermercado, Libros, etc), sino también:

- **Las organizaciones**, como los departamentos o proyectos.
- **Las profesiones de las personas**, como empleado o médico.
- **Los incidentes**, es decir, aquello que ocurre en un momento determinado, como un vuelo o un accidente…
- **Las acciones** que ocurren periódicamente, como la emisión de nóminas, etc.

---

## 2.1. Entidad · Ocurrencias

A los elementos del mundo real que la entidad representa se les llama **ocurrencias** de la entidad. Todos estos elementos tienen las mismas propiedades y están sujetos a las mismas normas.

**Ejemplo:**

| Entidad | Ocurrencia |
|---|---|
| **PEDIDO** | Pedido 115, fecha 15/01/2013 |

> 💡 **Para entenderlo mejor:** la entidad es el **molde** y las ocurrencias son las **galletas** que salen de él. "ALUMNO" es la entidad; "Lucía García, 1º DAW" es una ocurrencia concreta.

---

## 2.1. Entidad · Representación

Las entidades se representan con un **rectángulo** y en cuyo interior aparece el nombre de la entidad. Dicho nombre suele ser un **sustantivo**.

<pre class="mermaid">
flowchart LR
    A["ALUMNO"] ~~~ B["EMPLEADO"] ~~~ C["HIJO DE EMPLEADO"] ~~~ D["DEPARTAMENTO"]
</pre>

> 💡 **Truco:** cuando leas un enunciado, subraya los **sustantivos**: son los candidatos a entidades.

---

<!-- _class: transicion -->

# 2.1. Elementos básicos del modelo E/R

Entidades · **Atributos** · Relaciones · Grado · Cardinalidad · Atributos propios · Claves · Participación

---

## 2.1. Atributos · Definición y tipos

Cada entidad tiene asociados unos atributos que son **las características o propiedades de aquello que representa la entidad**.

**Dando valores** a estos atributos se obtienen las **ocurrencias** de la entidad.

Existen dos tipos de atributos:
- **Identificadores de entidad:** Son atributos que identifican de manera unívoca cada ocurrencia de la entidad.
- **Descriptores de entidad:** Son atributos que muestran una característica de la entidad.

Siempre debe existir **al menos un atributo identificador**. A los atributos identificadores se les añade el carácter **#**.

> 💡 **Unívoca** = que no se puede repetir: no hay dos ocurrencias con el mismo valor del identificador (como el DNI de una persona).

---

## 2.1. Atributos · Otra clasificación según su estructura

> 💡 **Contenido añadido.** Además de identificadores y descriptores, los atributos se clasifican según **cómo son sus valores**:

| Tipo | Qué significa | Ejemplo |
|---|---|---|
| **Simple (atómico)** | No se puede dividir en partes con significado propio | *Edad*, *DNI* |
| **Compuesto** | Está formado por otros atributos más simples | *Dirección* = calle + número + CP |
| **Monovaluado** | Toma **un solo** valor para cada ocurrencia | *Fecha de nacimiento* |
| **Multivaluado** | Puede tomar **varios** valores para una misma ocurrencia | *Teléfono* (una persona puede tener varios) |
| **Derivado** | Su valor se **calcula** a partir de otros atributos | *Edad* (a partir de la fecha de nacimiento) |

<p class="small">Las clasificaciones se combinan: <i>Teléfono</i> puede ser a la vez <b>simple</b> y <b>multivaluado</b>; <i>Dirección</i>, <b>compuesto</b> y <b>monovaluado</b>.</p>

---

## 2.1. Atributos · Representación de cada tipo

<pre class="mermaid">
flowchart TB
    EM["EMPLEADO"] --- ID(["DNI #"])
    EM --- SI(["Nombre"])
    EM --- DI(["Dirección"])
    DI --- D1(["Calle"])
    DI --- D2(["Número"])
    DI --- D3(["CP"])
    EM --- TE((("Teléfono")))
    EM --- FN(["Fecha_nac"])
    EM --- ED(["Edad"]):::derivado
    classDef derivado stroke:#333,stroke-width:1.5px,stroke-dasharray:6 4
</pre>

<p class="small center"><b>Simple:</b> elipse normal · <b>Compuesto:</b> elipse de la que cuelgan sus componentes · <b>Multivaluado:</b> doble línea · <b>Derivado:</b> línea discontinua</p>

> 💡 Volveremos a ver los **compuestos** con la clave de FECHA (día, mes, año) y los **multivaluados** en las entidades débiles (apartado 2.3).

---

## 2.1. Atributos · Formas de representarlos

Existen distintas formas de representar los atributos:

<pre class="mermaid">
flowchart TB
    subgraph F1 ["Forma 1: dentro de la entidad"]
        P1["<b>PEDIDO</b><hr/>id_pedido #<br/>fecha<br/>importe"]
    end
    subgraph F2 ["Forma 2: elipses"]
        P2["PEDIDO"] --- A1(["id_pedido #"])
        P2 --- A2(["fecha"])
        P2 --- A3(["importe"])
    end
    subgraph F3 ["Forma 3: círculos"]
        P3["PEDIDO"] --o B1["● id_pedido #"]
        P3 --o B2["○ fecha"]
        P3 --o B3["○ importe"]
    end
</pre>

<p class="small center">En la forma 3, el identificador se marca con un círculo <b>relleno</b> (●) y los descriptores con un círculo vacío (○).</p>

---

## 2.1. Atributos · Ocurrencias de PEDIDO

Algunas ocurrencias de **Pedido** podrían ser:

| Id_pedido | Fecha | Importe | |
|:---:|:---:|:---:|---|
| 111 | 18/01/2013 | 45 | |
| **112** | **18/01/2013** | **50** | ⬅ **Una ocurrencia** |
| 113 | 19/01/2013 | 39 | |
| 114 | 01/02/2013 | 51 | |
| ….. | ….. | …… | |

> 💡 **Fíjate:** cada **fila** es una ocurrencia y cada **columna** es un atributo. *Id_pedido* es el identificador: ningún pedido repite su valor. En cambio *Fecha* sí se repite (111 y 112), por eso es un **descriptor**.

---

<!-- _class: transicion -->

# 2.1. Elementos básicos del modelo E/R

Entidades · Atributos · **Relaciones** · **Grado** · Cardinalidad · Atributos propios · Claves · Participación

---

## 2.1. Relaciones

Las relaciones representan **las asociaciones que se establecen entre las entidades** en el mundo real.

Se representan mediante un **rombo** en cuyo interior aparece el nombre de la relación. Este nombre suele ser un **verbo**.

**Ejemplo:**

<pre class="mermaid">
flowchart LR
    C["CLIENTE"] --- R{"REALIZA"} --- P["PEDIDO"]
</pre>

> 💡 **Truco:** igual que los sustantivos suelen ser entidades, los **verbos** del enunciado suelen ser relaciones: "un cliente **realiza** pedidos".

---

## 2.1. Grado de una relación

Es el **número de entidades que participan en la relación**:

- **Relaciones binarias:** Cuando participan 2 (grado 2).
- **Relaciones ternarias:** Cuando participan 3 (grado 3).
- **Relaciones cuaternarias:** Cuando participan 4 (grado 4).
- ⋮
- **Relaciones n-arias:** Cuando participan n (grado n).

> 💡 Existe además el caso de **grado 1**: una entidad que se relaciona consigo misma (relación **unaria o reflexiva**). La estudiaremos en el apartado 2.2.

---

<!-- _class: grados -->

## 2.1. Grado de una relación · Ejemplos de grados

**Relación unaria o reflexiva**
<pre class="mermaid">
flowchart LR
    PE["PERSONA"] --- H{"Es hijo de"}
    H --- PE
</pre>

**Relación binaria**
<pre class="mermaid">
flowchart LR
    AL["ALUMNO"] --- ES{"Estudia"} --- AS["ASIGNATURA"]
</pre>

**Relación ternaria**
<pre class="mermaid">
flowchart LR
    EM["EMPLEADO"] --- RE{"Realiza"} --- PR["PROYECTO"]
    RE --- DE["DEPARTAMENTO"]
</pre>

---

<!-- _class: transicion -->

# 2.1. Elementos básicos del modelo E/R

Entidades · Atributos · Relaciones · Grado · **Cardinalidad** · Atributos propios · Claves · Participación

---

## 2.1. Cardinalidad de una relación

La cardinalidad de una relación binaria es **el número de ocurrencias de una entidad asociadas a una ocurrencia de la otra entidad**.

Existen básicamente tres tipos de cardinalidad:

| Tipo | Notación |
|---|:---:|
| Uno a uno | **1:1** |
| Uno a muchos | **1:N** |
| Muchos a muchos | **N:M** |

> 💡 **Pregunta clave para pensar la cardinalidad:** *"Si cojo UN elemento de esta entidad, ¿con cuántos de la otra se puede relacionar como máximo?"* Y después la misma pregunta en sentido contrario.

---

## 2.1. Cardinalidad · 1:1, uno a uno

**A cada elemento de la primera entidad le corresponde sólo uno de la segunda entidad, y a la inversa.**

Por ejemplo, un cliente de un hotel ocupa una habitación (un día en concreto), o un curso de alumnos pertenece a un aula, y a esa aula sólo asiste ese grupo de alumnos (a una hora en concreto).

<div class="cols">
<div>
<pre class="mermaid">
flowchart LR
    subgraph CG ["Conjunto de entidades GRUPOS"]
        G1["G1"]
        G2["G2"]
        G3["G3"]
        G4["G4"]
    end
    subgraph CA ["Conjunto de entidades AULAS"]
        A1["A1"]
        A2["A2"]
        A3["A3"]
        A4["A4"]
    end
    G1 --- A1
    G2 --- A2
    G3 --- A3
    G4 --- A4
</pre>
</div>
<div>
<pre class="mermaid">
flowchart LR
    GR["GRUPO"] -- "1" --- PT{"PERTENECE"} -- "1" --- AU["AULA"]
</pre>
</div>
</div>

---

## 2.1. Cardinalidad · 1:N, uno a muchos

**A cada elemento de la primera entidad le corresponde uno o más elementos de la segunda entidad, y a cada elemento de la segunda entidad le corresponde uno sólo de la primera entidad.**

Por ejemplo, un proveedor suministra muchos artículos.

<div class="cols">
<div>
<pre class="mermaid">
flowchart LR
    subgraph CP ["Conjunto de entidades PROVEEDORES"]
        P1["P1"]
        P2["P2"]
        P3["P3"]
    end
    subgraph CR ["Conjunto de entidades ARTÍCULOS"]
        AR1["AR1"]
        AR2["AR2"]
        AR3["AR3"]
        AR4["AR4"]
        AR5["AR5"]
    end
    P1 --- AR1
    P1 --- AR2
    P2 --- AR3
    P3 --- AR4
    P3 --- AR5
</pre>
</div>
<div>
<pre class="mermaid">
flowchart LR
    PV["PROVEEDOR"] -- "1" --- SU{"SUMINISTRA"} -- "N" --- AT["ARTÍCULO"]
</pre>
</div>
</div>

---

## 2.1. Cardinalidad · N:1, muchos a uno

**Es el mismo caso que el anterior pero al revés;** a cada elemento de la primera entidad le corresponde un elemento de la segunda, y a cada elemento de la segunda entidad, le corresponden varios de la primera.

> 💡 **Ejemplo:** si leemos la relación anterior empezando por ARTÍCULO, *muchos artículos son suministrados por un proveedor*: ARTÍCULO — N:1 — PROVEEDOR. Es la misma relación; solo cambia el orden en que nombramos las entidades.

<pre class="mermaid">
flowchart LR
    AT["ARTÍCULO"] -- "N" --- SU{"ES SUMINISTRADO POR"} -- "1" --- PV["PROVEEDOR"]
</pre>

---

## 2.1. Cardinalidad · M:N, muchos a muchos

**A cada elemento de la primera entidad le corresponde uno o más elementos de la segunda entidad, y a cada elemento de la segunda entidad le corresponde uno o más elementos de la primera entidad.**

Por ejemplo, un vendedor vende muchos artículos, y un artículo es vendido por muchos vendedores.

<div class="cols">
<div>
<pre class="mermaid">
flowchart LR
    subgraph CV ["Conjunto de entidades VENDEDORES"]
        V1["V1"]
        V2["V2"]
        V3["V3"]
    end
    subgraph CR ["Conjunto de entidades ARTÍCULOS"]
        AR1["AR1"]
        AR2["AR2"]
        AR3["AR3"]
        AR4["AR4"]
    end
    V1 --- AR1
    V1 --- AR3
    V2 --- AR1
    V2 --- AR2
    V2 --- AR4
    V3 --- AR2
    V3 --- AR3
</pre>
</div>
<div>
<pre class="mermaid">
flowchart LR
    VE["VENDEDORES"] -- "M" --- VD{"VENDEN"} -- "N" --- AT["ARTÍCULO"]
</pre>
</div>
</div>

---

## 2.1. Proceso para obtener la cardinalidad de una relación

Para obtener la cardinalidad se debe **fijar una ocurrencia en concreto de una entidad** y averiguar **cuántas ocurrencias de la otra entidad le corresponden**. Después realizar lo mismo para el otro sentido.

**Ejemplo 1:**
- Dado un cliente en concreto este puede realizar varios pedidos **(N)**.
- Dado un pedido en concreto este ha sido realizado por un solo cliente **(1)**.

<pre class="mermaid">
flowchart LR
    C["CLIENTE"] --- R{"REALIZA<br/><b>1:N</b>"} --- P["PEDIDO"]
</pre>

---

## 2.1. Proceso para obtener la cardinalidad · Ejemplo 2

- Dado un alumno en concreto, este puede estar matriculado en varias asignaturas **(N)**.
- Dada una asignatura en concreto, en esta pueden estar matriculados varios alumnos **(N)**.

<pre class="mermaid">
flowchart LR
    A["ALUMNO"] --- E{"Estudia<br/><b>N:N</b>"} --- S["ASIGNATURA"]
</pre>

> 💡 **Resumen del método:** ① Fijo UNO de la entidad A → ¿cuántos de B? ② Fijo UNO de la entidad B → ¿cuántos de A? ③ Junto los dos máximos: 1:1, 1:N o N:M.

---

<!-- _class: transicion -->

# 2.1. Elementos básicos del modelo E/R

Entidades · Atributos · Relaciones · Grado · Cardinalidad · **Atributos propios** · Claves · Participación

---

## 2.1. Atributos propios de una relación

Las relaciones también pueden tener atributos, se les denomina **atributos propios**. Son aquellos atributos **cuyo valor sólo se puede obtener en la relación**, puesto que dependen de las entidades que participan en la relación.

**Ejemplo:**
En un comercio, un cliente compra varios productos y un producto puede ser comprado por varios clientes. Al cliente se le asigna un código para identificarle, también interesa conocer su nombre, dirección, edad y teléfono. El producto también tiene un código para identificarle. Se quiere guardar el nombre o descripción del producto y el precio por unidad. También se quiere guardar la cantidad de producto que compra cada cliente.

**Realizar el esquema E/R**

---

## 2.1. Atributos propios · Solución

<pre class="mermaid">
flowchart LR
    CL["<b>CLIENTE</b><hr/>Cod_cliente #<br/>Nombre<br/>Dirección<br/>Edad<br/>Teléfono"] --- CO{"COMPRA<br/><b>N:M</b>"} --- PR["<b>PRODUCTO</b><hr/>Cod_Producto #<br/>Descripción<br/>Precio/Unidad"]
    CO --- CA(["Cantidad"])
</pre>

---

## 2.1. Atributos propios · Explicación

- Los atributos Cod_Cliente, Nombre, Dirección, Edad y teléfono son propios de la entidad **CLIENTE**.
- Los atributos Cod_Producto, Descripción y Precio/Unidad son propios de la entidad **PRODUCTO**.
- Pero el atributo **cantidad debe ir en la relación COMPRA** pues depende del producto y del cliente la cantidad que se compre.
- Sólo cuando se sepa de qué cliente se trata y de qué producto se podrá determinar la cantidad.
- Por ello, este atributo no puede ir en CLIENTE, *¿a qué producto se refiere?*, ni en PRODUCTO, *¿a qué cliente se refiere?*

> 💡 **Regla práctica:** si para conocer el valor de un atributo necesitas saber **a la vez** qué ocurrencia de cada entidad interviene, ese atributo pertenece a la **relación**.

---

<!-- _class: transicion -->

# 2.1. Elementos básicos del modelo E/R

Entidades · Atributos · Relaciones · Grado · Cardinalidad · Atributos propios · **Claves** · Participación

---

## 2.1. Claves

La clave es **un atributo o conjunto de atributos que identifican de manera unívoca una ocurrencia de una entidad o una relación**.

- **En las entidades**, la clave está formada por los atributos identificadores, que pueden ser uno o varios.
- **En las relaciones**, la clave se forma uniendo las claves de las entidades que participan en la relación.

> 💡 Cuando la clave está formada por **varios** atributos se dice que es una **clave compuesta**.

---

## 2.1. Claves · Ejemplo 1

- La clave de **CLIENTE** es *Cod_cliente*.
- La clave de **PRODUCTO** es *Cod_Producto*.
- La clave de **COMPRA** es *Cod_cliente* y *Cod_Producto*.

<pre class="mermaid">
flowchart LR
    CL["<b>CLIENTE</b><hr/>Cod_cliente #<br/>Nombre<br/>Dirección<br/>Edad<br/>Teléfono"] --- CO{"COMPRA<br/><b>N:M</b>"} --- PR["<b>PRODUCTO</b><hr/>Cod_Producto #<br/>Descripción<br/>Precio/Unidad"]
    CO --- CA(["Cantidad"])
</pre>

---

## 2.1. Claves · Ejemplo 2

La fecha necesita de los tres atributos para identificar de manera unívoca una ocurrencia. Por tanto la clave está formada por los atributos **día, mes y año**.

<pre class="mermaid">
flowchart LR
    F["<b>FECHA</b><hr/>Día #<br/>Mes #<br/>Año #"]
</pre>

> 💡 **¿Por qué los tres?** El día "15" se repite en todos los meses; el mes "enero" se repite en todos los años. Solo la **combinación** día + mes + año es única: es una clave compuesta.
>
> Además, FECHA es un ejemplo de **atributo compuesto**: se descompone en día, mes y año.

---

## 2.1. Claves · Ejemplo de clave de una relación ampliada

<pre class="mermaid">
flowchart LR
    CL["<b>CLIENTE</b><hr/># id_cli<br/>nombre"] --- CO{"COMPRA<br/><b>N:M</b>"} --- PR["<b>PRODUCTO</b><hr/># cod_prod<br/>nombre<br/>precio"]
    CO --o FE["● fecha"]
    CO --o CA["○ cantidad"]
</pre>

<p class="small center">La relación COMPRA tiene dos atributos propios: <b>fecha</b> (● forma parte de la clave) y <b>cantidad</b> (○ no forma parte de la clave).</p>

---

## 2.1. Claves · Ejemplo de clave de una relación ampliada (ocurrencias)

<div class="cols small">
<div>

**Ocurrencias de CLIENTE**

| # id_cli | nombre |
|:-:|:-:|
| 1 | Juan |
| 2 | Ana |
| … | … |

**Ocurrencias de PRODUCTO**

| # cod_prod | nombre | precio |
|:-:|:-:|:-:|
| 001 | Mesa | 40 |
| 002 | Silla | 20 |
| 003 | Sofá | 200 |
| … | … | … |

</div>
<div>

**Ocurrencias de COMPRA**

| # id_cli | # cod_prod | # fecha | cantidad |
|:-:|:-:|:-:|:-:|
| 1 | 001 | 12/05/2009 | 7 |
| 1 | 003 | 12/05/2009 | 3 |
| 1 | 001 | 16/06/2009 | 10 |
| 2 | 003 | 12/05/2009 | 2 |
| … | … | … | … |

</div>
</div>

---

## 2.1. Claves · ¿Por qué "ampliada"?

> 💡 **Para entenderlo mejor:** fíjate en las filas 1 y 3 de COMPRA: el cliente **1** compró el producto **001** dos veces (el 12/05/2009 y el 16/06/2009).
>
> Si la clave de COMPRA fuese solo *id_cli + cod_prod*, esas dos filas tendrían la **misma clave** (1, 001) y no podríamos distinguirlas.
>
> Por eso la clave de la relación se **amplía** con el atributo propio **fecha** (círculo relleno ●): *id_cli + cod_prod + fecha*. En cambio, **cantidad** no forma parte de la clave (círculo vacío ○).

| # id_cli | # cod_prod | # fecha | cantidad |
|:-:|:-:|:-:|:-:|
| **1** | **001** | 12/05/2009 | 7 |
| **1** | **001** | 16/06/2009 | 10 |

---

<!-- _class: transicion -->

# 2.1. Elementos básicos del modelo E/R

Entidades · Atributos · Relaciones · Grado · Cardinalidad · Atributos propios · Claves · **Participación**

---

## 2.1. Participación de la entidad en la relación

Consiste en indicar exactamente **cuál es la participación de una entidad en la relación**. Para ello se define el número **mínimo y máximo** de ocurrencias de una entidad que le pueden corresponder a una ocurrencia de otra entidad.

Las participaciones pueden ser **(0,1), (1,1), (0,n), (1,n), (2,n), (n,2)**, etc.

Se colocan **sobre la línea, lo más cerca posible de la entidad a la que se refieren**. La forma de calcularla es igual que la cardinalidad. Se fija una ocurrencia en concreto de una entidad y se averigua la participación (mínima y máxima) de la otra entidad en la relación.

> 💡 **Cómo se lee (mín, máx):** el **mínimo** suele ser 0 (opcional: puede no haber ninguno) o 1 (obligatorio: al menos uno). El **máximo** suele ser 1 o n (varios).

---

## 2.1. Participación · Ejemplo 1

<pre class="mermaid">
flowchart LR
    PF["PROFESOR"] -- "(1,1) (B)" --- EN{"ENSEÑA"} -- "(A) (1,n)" --- AL["ALUMNO"]
</pre>

<p class="small center">(1,1) = participación de la entidad PROFESOR en la relación · (1,n) = participación de la entidad ALUMNO en la relación</p>

**(A)** Se fija una ocurrencia en concreto (es decir, en una clase). Un profesor da clase como mínimo a un alumno y como máximo a n (varios). La entidad **ALUMNO participa con cardinalidad (1,n)**.

**(B)** A un alumno le da clase como mínimo un profesor y como máximo 1. Luego la entidad **PROFESOR participa con cardinalidad (1,1)**.

---

## 2.1. Participación · Ejemplo 2

<pre class="mermaid">
flowchart LR
    PF["PROFESOR"] -- "(1,1) (B)" --- TU{"ES TUTOR DE"} -- "(A) (0,n)" --- AL["ALUMNO"]
</pre>

**(A)** Un **profesor** puede que no sea tutor de ningún alumno (participación mínima 0) ó puede que sea tutor de varios alumnos (participación máxima n). Por tanto tendrá participación **(0,n)**.

**(B)** Un **alumno** siempre va a tener un tutor, y como máximo tendrá un solo tutor. Por tanto tendrá participación **(1,1)**.

> 💡 **Relación entre participación y cardinalidad:** la cardinalidad se obtiene tomando los **máximos** de las participaciones. Aquí: (1,**1**) y (0,**n**) → cardinalidad **1:N**.

---

<!-- _class: transicion -->

# 2.1. Caso práctico

Aplicamos todo lo anterior paso a paso

---

## Caso práctico · Enunciado

**Vamos a realizar el diagrama de estructuras de datos en el modelo E-R. Supongamos que en un centro escolar se imparten muchos cursos. Cada curso está formado por un grupo de alumnos, de los cuales uno de ellos es el delegado del grupo. Los alumnos cursan asignaturas, y una asignatura puede o no ser cursada por los alumnos.**

Para su resolución, primero identificaremos las entidades, luego las relaciones y las cardinalidades y, por último, los atributos de las entidades y de las interrelaciones, si las hubiera.

<pre class="mermaid">
flowchart LR
    P1["① Entidades"] --> P2["② Relaciones y<br/>cardinalidades"] --> P3["③ Atributos"]
</pre>

---

## Caso práctico · Paso 1: Identificación de entidades

**Identificación de entidades:** una entidad es un objeto del mundo real, algo que tiene interés para la empresa. Se hace un análisis del enunciado, de donde sacaremos los candidatos a entidades: CENTROS, CURSOS, ALUMNOS, ASIGNATURAS, DELEGADOS.

- Si analizamos esta última veremos que **los delegados son alumnos**, por lo tanto, los tenemos recogidos en ALUMNOS. Esta posible entidad la eliminaremos.
- También eliminaremos la posible entidad **CENTROS** pues se trata de un único centro, si se tratara de una gestión de centros tendría más sentido incluirla.

<pre class="mermaid">
flowchart LR
    CE["CENTROS ❌"] ~~~ CU["CURSOS ✅"] ~~~ AL["ALUMNOS ✅"] ~~~ AS["ASIGNATURAS ✅"] ~~~ DE["DELEGADOS ❌"]
</pre>

---

## Caso práctico · Paso 2: Identificar las relaciones (I)

**Identificar las relaciones:** construimos una matriz de entidades en la que las filas y las columnas son los nombres de entidades y cada celda puede contener o no la relación, las relaciones aparecen explícitamente en el enunciado. En este ejemplo, las relaciones no tienen atributos. Del enunciado sacamos lo siguiente:

- Un curso está formado por muchos alumnos. La relación entre estas dos entidades la llamamos **PERTENECE**, pues a un curso pertenecen muchos alumnos, relación **1:M**. Consideramos que es obligatorio que existan alumnos en un curso. Para calcular los máximos y mínimos hacemos la pregunta: a un CURSO, ¿cuántos ALUMNOS pertenecen, como mínimo y como máximo? Y se ponen los valores en la entidad ALUMNOS, en este caso **(1,M)**. Para el sentido contrario, hacemos lo mismo: un ALUMNO, ¿a cuántos CURSOS va a pertenecer? Como mínimo a 1, y como máximo a 1, en este caso pondremos **(1,1)** en la entidad CURSOS.

---

## Caso práctico · Paso 2: Identificar las relaciones (II)

- De los alumnos que pertenecen a un grupo, uno de ellos es DELEGADO. Hay una relación de grado 1 entre la entidad ALUMNO que la podemos llamar **ES DELEGADO**. La relación es **1:M**, un alumno es delegado de muchos alumnos. Para calcular los valores máximos y mínimos preguntamos: ¿un ALUMNO de cuántos alumnos ES DELEGADO? Como mínimo es 0, pues puede que no sea delegado, y como máximo es M, pues si es delegado lo será de muchos; pondremos en el extremo **(0,M)**. Y en el otro extremo pondremos **(1,1)**, pues obligatoriamente el delegado es un alumno.

- Entre ALUMNOS y ASIGNATURAS surge una relación **N:M**, pues un alumno cursa muchas asignaturas y una asignatura es cursada por muchos alumnos. La relación se llamará **CURSA**. Consideramos que puede haber asignaturas sin alumnos. Las cardinalidades serán **(1:M)** entre ALUMNO-ASIGNATURA, pues un alumno, como mínimo, cursa una asignatura, y, como máximo, muchas. La cardinalidad entre ASIGNATURA-ALUMNO será **(0,N)**, pues una ASIGNATURA puede ser cursada por 0 alumnos o por muchos.

---

## Caso práctico · Paso 2: Matriz de entidades y relaciones

En la Tabla 1.2 se muestra la matriz de entidades y relaciones entre ellas:

| | **CURSOS** | **ALUMNOS** | **ASIGNATURAS** |
|---|:---:|:---:|:---:|
| **CURSOS** | -------------- | PERTENECE (1:M) | -------------- |
| **ALUMNOS** | x | ES DELEGADO (1:M) | CURSA (N:M) |
| **ASIGNATURAS** | -------------- | x | -------------- |

<p class="small center"><i>Tabla 1.2. Matriz de entidades y relaciones entre ellas.</i></p>

Las celdas que aparecen con una **x** indican que las relaciones están ya identificadas. Las que aparecen con **guiones** indican que no existe relación.

> 💡 La matriz es simétrica: basta con rellenar la mitad superior. La **x** significa "esta relación ya la he anotado en la otra mitad".

---

## Caso práctico · Paso 3: Identificar los atributos

Como el enunciado no explicita ningún tipo de característica de las entidades nos imaginamos los atributos, que pueden ser los siguientes:

| Entidad | Atributos |
|---|---|
| **CURSOS** | COD_CURSO (clave primaria), DESCRIPCIÓN, NIVEL, TURNO y ETAPA |
| **ALUMNOS** | NUM-MATRÍCULA (clave primaria), NOMBRE, DIRECCIÓN, POBLACIÓN, TLF y NUM_HERMANOS |
| **ASIGNATURAS** | COD-ASIGNATURA (clave primaria), DENOMINACIÓN y TIPO |

En la Figura 1.11 se representa el diagrama de estructuras del ejercicio.

---

## Caso práctico · Figura 1.11. Diagrama de estructuras en el modelo E-R

<p class="small">Los atributos se muestran dentro de cada entidad (forma 1) para que el diagrama sea más legible.</p>

<pre class="mermaid">
flowchart LR
    CU["<b>CURSOS</b><hr/>COD_CURSO #<br/>DESCRIPCIÓN<br/>NIVEL<br/>TURNO<br/>ETAPA"] -- "(1,1)" --- PE{"PERTENECE<br/><b>1:M</b>"} -- "(1,M)" --- AL["<b>ALUMNOS</b><hr/>NUM_MATRÍCULA #<br/>NOMBRE<br/>DIRECCIÓN<br/>POBLACIÓN<br/>TLF<br/>NUM_HERMANOS"]
    AL -- "(1,1)" --- ED{"ES DELEGADO<br/><b>1:M</b>"}
    ED -- "(0,M)" --- AL
    AL -- "(0,N)" --- CR{"CURSA<br/><b>N:M</b>"} -- "(1,M)" --- AS["<b>ASIGNATURAS</b><hr/>COD_ASIGNATURA #<br/>DENOMINACIÓN<br/>TIPO"]
</pre>

---

<!-- _class: transicion -->

# 📘 Ejercicio resuelto · 2.1

Biblioteca: entidades, relación, tipos de atributos, atributos propios y clave

---

## Ejercicio resuelto 2.1 · Enunciado

Una biblioteca quiere guardar información de sus **socios**: número de socio, nombre, dirección (calle, número y código postal), uno o varios teléfonos y la fecha de nacimiento (también le interesa conocer la edad del socio).

De cada **libro** se guarda el ISBN, el título y el autor.

Un socio puede tomar **prestados** varios libros y un libro puede prestarse a varios socios a lo largo del tiempo. De cada préstamo se quiere guardar la **fecha de préstamo** y la **fecha de devolución**. Un socio puede no haber pedido nunca un libro y un libro puede no haberse prestado nunca.

**Se pide:** realizar el esquema E/R indicando el tipo de cada atributo, las participaciones, la cardinalidad y la clave de la relación.

---

## Ejercicio resuelto 2.1 · Solución (pasos 1 y 2)

**Paso 1 · Entidades** (sustantivos con información propia): **SOCIO** y **LIBRO**.
*Préstamo* no es una entidad: es lo que **relaciona** a un socio con un libro.

**Paso 2 · Relación y cardinalidad:** SOCIO — **PRESTA** — LIBRO
- Fijo **un socio**: ¿cuántos libros puede tener prestados? Mínimo 0 (nunca ha pedido), máximo n → LIBRO participa con **(0,n)**.
- Fijo **un libro**: ¿a cuántos socios se ha prestado? Mínimo 0 (nunca prestado), máximo n → SOCIO participa con **(0,n)**.
- Máximos n y n → cardinalidad **N:M**.

---

## Ejercicio resuelto 2.1 · Solución (pasos 3 y 4)

**Paso 3 · Atributos de las entidades**

| Atributo | Entidad | Tipo |
|---|---|---|
| Nº_socio | SOCIO | Simple · **identificador (#)** |
| Nombre | SOCIO | Simple |
| Dirección (calle, número, CP) | SOCIO | **Compuesto** |
| Teléfono | SOCIO | **Multivaluado** |
| Fecha_nac | SOCIO | Simple |
| Edad | SOCIO | **Derivado** (de Fecha_nac) |
| ISBN / Título / Autor | LIBRO | ISBN **identificador (#)**; resto simples |

**Paso 4 · Atributos propios:** *Fecha_préstamo* y *Fecha_devolución* dependen **a la vez** del socio y del libro → van en **PRESTA**.

**Clave de PRESTA:** Nº_socio + ISBN + **Fecha_préstamo** (clave **ampliada**: un mismo socio puede pedir el mismo libro en días distintos).

---

<!-- _class: big -->

## Ejercicio resuelto 2.1 · Esquema E/R

<pre class="mermaid">
flowchart LR
    s31(["Calle"]) --- s3
    s32(["Número"]) --- s3
    s33(["CP"]) --- s3
    s1(["Nº_socio #"]) --- SO
    s2(["Nombre"]) --- SO
    s3(["Dirección"]) --- SO
    s4((("Teléfono"))) --- SO
    s5(["Fecha_nac"]) --- SO
    s6(["Edad"]):::derivado --- SO
    SO["SOCIO"] -- "(0,n)" --- PR{"PRESTA<br/><b>N:M</b>"} -- "(0,n)" --- LI["<b>LIBRO</b><hr/>ISBN #<br/>Título<br/>Autor"]
    PR --- p1(["Fecha_préstamo #"])
    PR --- p2(["Fecha_devolución"])
    classDef derivado stroke:#333,stroke-width:1.5px,stroke-dasharray:6 4
</pre>

---

## ✅ Resumen del apartado 2.1

| Elemento | Qué es | Símbolo |
|---|---|---|
| **Entidad** | Objeto real o abstracto del que se guarda información | Rectángulo (sustantivo) |
| **Ocurrencia** | Cada elemento concreto de una entidad | Fila de la tabla |
| **Atributo** | Característica de una entidad | Elipse / círculo; # si es identificador |
| **Tipos de atributo** | Simple, compuesto, multivaluado, derivado | Elipse / con hijos / doble / discontinua |
| **Relación** | Asociación entre entidades | Rombo (verbo) |
| **Grado** | Nº de entidades que participan | 1, 2, 3… n |
| **Cardinalidad** | Máximos: 1:1, 1:N, N:M | Junto al rombo |
| **Atributo propio** | Atributo que depende de la relación | Elipse unida al rombo |
| **Clave** | Atributo(s) que identifican de forma unívoca | # |
| **Participación** | (mínimo, máximo) de cada entidad | Junto a la entidad |

---

## 📝 Ejercicios

Realizar los **ejercicios 1 y 2** de la relación de ejercicios de entidad relación (1).

---

<!-- _class: transicion -->

# 2.2. Relaciones reflexivas

Cuando una entidad se relaciona **consigo misma**

---

## 2.2. Relaciones reflexivas · Definición

Son aquellas en las que participa **una sola entidad**, es decir, son de **grado 1**. Se trata de entidades que se relacionan consigo mismas.

En estos casos **la participación de la entidad en la relación es diferente si se lee en un sentido ó en otro**.

> 💡 **Para entenderlo mejor:** aunque solo haya una entidad, en la relación cada ocurrencia juega un **papel (rol)** distinto. En "PERSONA es padre de PERSONA", una persona hace de *padre* y la otra de *hijo*. Por eso hay que leer la relación en los dos sentidos, uno por cada rol.

---

## 2.2. Relaciones reflexivas · Ejemplo 1

<div class="cols">
<div>
<pre class="mermaid">
flowchart LR
    PE["<b>PERSONA</b><hr/>DNI #<br/>Nombre<br/>…."] -- "(B) (1,1)" --- R{"Es_padre_de<br/><b>1:N</b>"}
    R -- "(A) (0,N)" --- PE
</pre>
</div>
<div>

**(A)** Una persona puede no ser padre de ninguna o de varias. Participación **(0,n)**

**(B)** Una persona tiene un padre y solamente uno. Participación **(1,1)**

Por tanto la cardinalidad de la relación es el número máximo de participaciones, que es **1:N**

</div>
</div>

---

## 2.2. Relaciones reflexivas · Ejemplo 2

<div class="cols">
<div>
<pre class="mermaid">
flowchart LR
    AT["<b>ATLETA</b><hr/>Nº Dorsal #<br/>Nombre<br/>…."] -- "(B) (0,1)" --- R{"Da_relevo_a<br/><b>1:1</b>"}
    R -- "(A) (0,1)" --- AT
</pre>
</div>
<div>

**(A)** Un atleta da relevo como mínimo a nadie (si es el último), como máximo a 1 (si no es el último). Participación **(0,1)**

**(B)** Un atleta es relevado como mínimo por nadie (si es el primero), como máximo a 1 (si no es el primero). Participación **(0,1)**

</div>
</div>

> 💡 Piensa en una carrera de relevos 4×100: 🏃‍♂️ A → 🏃‍♀️ B → 🏃 C → 🏃‍♀️ D. El primero no es relevado por nadie y el último no da relevo a nadie; por eso los mínimos son 0.

---

## 2.2. Relaciones reflexivas · Ejemplo 3

<div class="cols">
<div>
<pre class="mermaid">
flowchart LR
    PE["<b>PERSONA</b><hr/>DNI #<br/>Nombre<br/>…."] -- "(B) (1,n)" --- R{"Cuida_de<br/><b>N:N</b>"}
    R -- "(A) (0,N)" --- PE
</pre>
</div>
<div>

**(A)** Una persona cuida como mínimo a ninguno (si es paciente) como máximo a varios (si es cuidador). Participación **(0,n)**

**(B)** Una persona puede no ser cuidada por nadie (si es personal sanitario) o puede ser cuidada por varios **(0,n)**

</div>
</div>

---

<!-- _class: transicion -->

# 📘 Ejercicio resuelto · 2.2

Relación reflexiva: jefes y empleados

---

## Ejercicio resuelto 2.2 · Enunciado

En una empresa, cada empleado tiene un **jefe directo**, que también es un empleado, **excepto el director general**, que no tiene jefe. Un jefe puede dirigir a **varios** empleados y hay empleados que **no dirigen a nadie**.

De cada empleado se guarda su código, nombre y puesto.

**Se pide:** representar la relación, calcular las participaciones y la cardinalidad.

---

## Ejercicio resuelto 2.2 · Solución

Solo hay **una entidad** (EMPLEADO) que se relaciona consigo misma → relación **reflexiva**. La llamamos **DIRIGE_A**. Cada ocurrencia juega un rol: *jefe* o *subordinado*.

<div class="cols">
<div>
<pre class="mermaid">
flowchart LR
    EM["<b>EMPLEADO</b><hr/>Cod_emp #<br/>Nombre<br/>Puesto"] -- "(B) (0,1)" --- R{"DIRIGE_A<br/><b>1:N</b>"}
    R -- "(A) (0,n)" --- EM
</pre>
</div>
<div class="small">

**(A)** Fijo un empleado como **jefe**: ¿a cuántos dirige? Mínimo 0 (no dirige a nadie), máximo n → **(0,n)**

**(B)** Fijo un empleado como **subordinado**: ¿cuántos jefes tiene? Mínimo 0 (el director general), máximo 1 → **(0,1)**

Máximos 1 y n → cardinalidad **1:N**

</div>
</div>

> 💡 Fíjate en el mínimo **0** de (B): sin la excepción del director general sería (1,1). Lee siempre con atención los casos especiales del enunciado.

---

## ✅ Resumen del apartado 2.2

- Una **relación reflexiva** tiene **grado 1**: una entidad se relaciona consigo misma.
- Hay que **leerla en los dos sentidos** (un sentido por cada rol).
- La **cardinalidad** se obtiene con los **máximos** de las dos participaciones.

| Ejemplo | Participaciones | Cardinalidad |
|---|:---:|:---:|
| PERSONA *Es_padre_de* | (1,1) y (0,n) | 1:N |
| ATLETA *Da_relevo_a* | (0,1) y (0,1) | 1:1 |
| PERSONA *Cuida_de* | (1,n) y (0,n) | N:N |

---

<!-- _class: transicion -->

# 2.3. Entidades fuertes y débiles. Relación de dependencia

Entidades que **no pueden existir** o **no pueden identificarse** por sí solas

---

## 2.3. Entidades fuertes y débiles

Hay dos tipos de entidades:

- **Entidades fuertes:** Son aquellas que **no dependen de ninguna otra**.
- **Entidades débiles:** Son aquellas que **dependen de otra entidad**. Estas entidades se representan con un **doble cuadrado**.

<pre class="mermaid">
flowchart LR
    F["Entidad Regular,<br/>Fuerte o ID"] ~~~ D[["Entidad<br/>Débil"]]
</pre>

La **entidad débil está unida a la entidad fuerte** mediante una **relación de dependencia**. Hay dos tipos de relaciones de dependencia:
- **Dependencia en existencia**
- **Dependencia en identificación**

---

## 2.3. Dependencia en existencia

Se produce cuando **la entidad débil necesita de la presencia de la entidad fuerte para existir**. Si desaparece la ocurrencia de la entidad fuerte, la de la débil carece de sentido.

La relación de dependencia en existencia se representa con **una barra atravesando el rombo y la letra E** en su interior.

**Ejemplo 1:**

<pre class="mermaid">
flowchart LR
    EM["EMPLEADO"] -- "(1,1)" --- T{"E | TIENE<br/><b>1:N</b>"} -- "(0,N)" --- HI[["HIJO"]]
</pre>

Los datos de los hijos de los empleados le interesan a la empresa mientras ese trabajador esté con ellos. Si el empleado cambia de trabajo, a la empresa no le interesarán los datos de los hijos. Por tanto se borrarán los datos del empleado y los de sus hijos.

---

## 2.3. Dependencia en existencia · Observación

> **Observación:** En realidad la relación de dependencia recoge aquellos casos en que debería tratarse de **un atributo más de la entidad** pero que por las características del atributo (puede que haya o que no, puede que haya uno o varios, etc.) se debe sacar en una entidad aparte.

> 💡 **Relación con los tipos de atributos:** esos "atributos que puede que haya o no, uno o varios" son los **atributos multivaluados** que vimos en 2.1. *Teléfono* o *Hijo* son multivaluados en EMPLEADO; por eso se sacan a una **entidad débil** unida por una relación de dependencia.

> 💡 **Para entenderlo mejor:** "hijos" podría ser un atributo de EMPLEADO, pero un empleado puede tener 0, 1, 2, 3… hijos y de cada uno queremos guardar varios datos (nombre, fecha de nacimiento…). Como no cabe en un único valor, lo sacamos a una entidad débil.

---

## 2.3. Dependencia en existencia · Ejemplo 2

<pre class="mermaid">
flowchart LR
    EM["EMPLEADO"] -- "(1,1)" --- T{"E | TIENE<br/><b>1:N</b>"} -- "(0,N)" --- TE[["TELÉFONO"]]
</pre>

Una persona puede tener teléfono o no. Como cabe la posibilidad de que lo tenga o no, se pone aparte.

---

## 2.3. Dependencia en identificación

Se produce cuando **la entidad débil necesita de la fuerte para identificarse**. Por sí sola, la débil no es capaz de identificar de manera unívoca sus ocurrencias. La clave de la entidad débil se forma al unir la clave de la entidad débil con los atributos identificadores de la entidad fuerte.

La relación de dependencia en identificación se representa con **una barra atravesando el rombo y la letra I** en su interior.

<pre class="mermaid">
flowchart LR
    PR["PROVINCIA"] -- "(1,1)" --- T{"I | TIENE<br/><b>1:N</b>"} -- "(0,N)" --- MU[["MUNICIPIO"]]
</pre>

---

## 2.3. Dependencia en identificación · Aclaración

> 💡 **Ejemplo para entenderlo mejor:** supongamos que cada provincia numera sus municipios empezando por 001.

| Cod_provincia | Cod_municipio | Nombre municipio |
|:-:|:-:|---|
| 28 (Madrid) | **001** | Acebeda (La) |
| 41 (Sevilla) | **001** | Aguadulce |
| 46 (Valencia) | **001** | Ademuz |

> El código **001** se repite, así que *Cod_municipio* **no basta** para identificar un municipio. Necesitamos la clave de la entidad fuerte: **Cod_provincia + Cod_municipio**. Por eso MUNICIPIO depende de PROVINCIA **en identificación**.

---

<!-- _class: transicion -->

# 📘 Ejercicio resuelto · 2.3

Entidad débil: hoteles y habitaciones

---

## Ejercicio resuelto 2.3 · Enunciado

Una cadena hotelera guarda sus **hoteles** (código de hotel, nombre y ciudad). Cada hotel tiene varias **habitaciones** numeradas 101, 102, 201…; **los números se repiten** en todos los hoteles de la cadena. De cada habitación se guarda su número y su tipo (individual, doble, suite).

Si un hotel se da de baja en la cadena, sus habitaciones dejan de tener interés.

**Se pide:**
1. ¿Hay alguna entidad débil? ¿De qué tipo es la dependencia?
2. ¿Cuál es la clave de cada entidad?
3. Dibuja el esquema con participaciones y cardinalidad.

---

## Ejercicio resuelto 2.3 · Solución

**1.** HABITACIÓN es una **entidad débil**:
- Por sí sola **no se identifica**: la habitación "101" existe en todos los hoteles → dependencia **en identificación (I)**.
- Además, si el hotel desaparece sus habitaciones también → hay dependencia en existencia, que siempre va incluida en la de identificación.

**2.** Clave de HOTEL: *Cod_hotel*. Clave de HABITACIÓN: **Cod_hotel + Nº_habitación**.

**3.** Un hotel tiene como mínimo 1 y como máximo n habitaciones → **(1,n)**; una habitación pertenece a uno y solo un hotel → **(1,1)**.

<pre class="mermaid">
flowchart LR
    HO["<b>HOTEL</b><hr/>Cod_hotel #<br/>Nombre<br/>Ciudad"] -- "(1,1)" --- T{"I | TIENE<br/><b>1:N</b>"} -- "(1,n)" --- HA[["<b>HABITACIÓN</b><hr/>Nº_habitación #<br/>Tipo"]]
</pre>

---

## ✅ Resumen del apartado 2.3

| | Dependencia en **existencia** (E) | Dependencia en **identificación** (I) |
|---|---|---|
| **¿Qué necesita la débil?** | Que exista la fuerte | La clave de la fuerte para identificarse |
| **Si se borra la fuerte…** | Se borran las débiles | Se borran las débiles |
| **Clave de la débil** | Tiene clave propia | Clave propia + clave de la fuerte |
| **Ejemplo** | EMPLEADO – HIJO / TELÉFONO | PROVINCIA – MUNICIPIO |
| **Símbolo** | Rombo con barra y **E** | Rombo con barra y **I** |

<p class="small">💡 Toda dependencia en identificación implica también dependencia en existencia, pero no al revés.</p>

---

<!-- _class: transicion -->

# 2.4. Relaciones n-arias

Cuando en una relación intervienen **más de dos** entidades

---

## 2.4. Relaciones n-arias

Son aquellas en las que intervienen **N entidades** en la relación.

**Ejemplo:** Se quieren guardar las diferentes tareas que realiza un trabajador en cada departamento.

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    DE["DEPARTAMENTO"] -- "(3) (1,1)" --- RE{"REALIZA<br/><b>1:N:N</b>"}
    RE -- "(2) (1,N)" --- TR["TRABAJADOR"]
    RE -- "(1) (1,N)" --- TA["TAREA"]
</pre>
</div>
<div class="small">

Para obtener la **cardinalidad** de una relación n-aria se cogen las **participaciones máximas** de cada entidad.

Para obtener **la participación de una entidad** se fija una ocurrencia del resto de las entidades y se observa cuántas ocurrencias de la entidad en cuestión le corresponden.

</div>
</div>

---

## 2.4. Relaciones n-arias · Cálculo de participaciones

**(1) TAREA:** Dado 1 departamento y 1 trabajador, ¿cuántas tareas le corresponden? **(1,n)**

**(2) TRABAJADOR:** Dado 1 departamento y 1 tarea, ¿cuántos trabajadores la realizan? **(1,n)**

**(3) DEPARTAMENTO:** Dado 1 trabajador y 1 tarea, ¿en cuántos departamentos la realiza? **(1,1)**

Máximos → DEPARTAMENTO **1**, TRABAJADOR **N**, TAREA **N** → cardinalidad **1:N:N**

> 💡 **Diferencia con las binarias:** en una binaria fijas **una** ocurrencia de la otra entidad. En una n-aria fijas **una ocurrencia de cada una de las demás** entidades (aquí, dos a la vez) y preguntas por la que queda.

---

<!-- _class: transicion -->

# 📘 Ejercicio resuelto · 2.4

Relación ternaria: profesores, asignaturas y grupos

---

## Ejercicio resuelto 2.4 · Enunciado

En un instituto se quiere saber **qué profesor imparte cada asignatura en cada grupo**. Se sabe que:

- Una asignatura, en un grupo concreto, la imparte **un único profesor**.
- Un profesor puede impartir la misma asignatura en **varios grupos**.
- Un profesor puede impartir **varias asignaturas** en un mismo grupo.

**Se pide:** calcular la participación de cada entidad y la cardinalidad de la relación.

---

## Ejercicio resuelto 2.4 · Solución

Se fija una ocurrencia de **las otras dos** entidades y se pregunta por la tercera:

| Entidad | Pregunta | Participación |
|---|---|:---:|
| **PROFESOR** | Dada 1 asignatura y 1 grupo, ¿cuántos profesores la imparten? | **(1,1)** |
| **ASIGNATURA** | Dado 1 profesor y 1 grupo, ¿cuántas asignaturas imparte? | **(1,n)** |
| **GRUPO** | Dado 1 profesor y 1 asignatura, ¿en cuántos grupos la imparte? | **(1,n)** |

<pre class="mermaid">
flowchart LR
    PR["PROFESOR"] -- "(1,1)" --- IM{"IMPARTE<br/><b>1:N:N</b>"}
    IM -- "(1,n)" --- AS["ASIGNATURA"]
    IM -- "(1,n)" --- GR["GRUPO"]
</pre>

Máximos 1, n, n → cardinalidad **1:N:N**

---

<!-- _class: transicion -->

# 2.5. Control de redundancia

¿Sobra alguna relación en mi esquema?

---

## 2.5. Control de redundancia · Definición

Un esquema es **redundante** cuando al eliminar un elemento del mismo **no se pierde información**. Se pueden deducir los datos de dicho elemento a partir de los demás.

**Condiciones para que haya redundancia:**

1. **Debe haber un ciclo en el esquema.** Un ciclo se produce cuando al unir las entidades mediante relaciones queda un espacio cerrado en su interior.
2. **Las relaciones implicadas en el ciclo deben ser semánticamente equivalentes** (es decir, deben tener significados parecidos).
3. **Las cardinalidades deben ser tales que se pueda eliminar una de las relaciones sin perder información.**

Si se cumplen las tres condiciones, se tiene un **ciclo redundante**. Dicho ciclo se debe deshacer. Para ello se **elimina una de las relaciones** que ha generado el ciclo.

---

<!-- _class: wide -->

## 2.5. Control de redundancia · Ejemplo redundante


<pre class="mermaid">
flowchart LR
    MU["MUNICIPIO"] -- "(1,1)" --- RS{"RESIDE"}
    RS -- "(0,n)" --- PE["PERSONA"]
    MU -- "(1,1)" --- PA{"PERTENECE_A"}
    PA -- "(1,n)" --- VI["VIVIENDA"]
    VI -- "(1,1)" --- HA{"HABITA"}
    HA -- "(0,n)" --- PE
</pre>
<div class="small">

Se puede eliminar **RESIDE** sin que pierda información ya que:

1. Es un ciclo.
2. Las relaciones habita y reside son semánticamente equivalentes.
3. Una persona habita una única vivienda y esa vivienda se encuentra en un único municipio. Luego se puede saber el municipio en el que reside una persona a través de la vivienda.

</div>

---

<!-- _class: wide -->

## 2.5. Control de redundancia · Esquema resultante


<pre class="mermaid">
flowchart LR
    MU["MUNICIPIO"] -- "(1,1)" --- PA{"PERTENECE_A"}
    PA -- "(1,n)" --- VI["VIVIENDA"]
    VI -- "(1,1)" --- HA{"HABITA"}
    HA -- "(0,n)" --- PE["PERSONA"]
</pre>
<div class="small">

El esquema entidad/relación quedaría así.

> 💡 **Camino para deducir el municipio de una persona:**
> PERSONA → *habita* → VIVIENDA → *pertenece_a* → MUNICIPIO.
> Como en cada paso solo hay **una** posibilidad (máximo 1), el resultado es único.

</div>

---

<!-- _class: wide -->

## 2.5. Control de redundancia · Ejemplo de esquema NO REDUNDANTE


<pre class="mermaid">
flowchart LR
    PS["PAÍS"] -- "(1,1)" --- HB{"Habita<br/><b>1:N</b>"}
    HB -- "(1,n)" --- AN["ANIMAL"]
    PS -- "(1,1)" --- SE{"Se_encuentra_en<br/><b>1:N</b>"}
    SE -- "(1,n)" --- PN["PARQUE NACIONAL"]
    AN -- "(1,n)" --- VE{"Vive_en<br/><b>1:N</b>"}
    VE -- "(0,1)" --- PN
</pre>
<div class="small">

Un animal habita en un único país, pero puede que no viva en ningún parque nacional, por lo que a través del parque no se puede saber en qué país se encuentra.

> 💡 Hay ciclo, pero **falla la condición 3**: el mínimo **0** de *Vive_en* hace que, para algunos animales, el camino por PARQUE NACIONAL no exista. Si quitásemos *Habita* perderíamos información.

</div>

---

<!-- _class: transicion -->

# 📘 Ejercicio resuelto · 2.5

¿Es redundante este esquema?

---

<!-- _class: wide -->

## Ejercicio resuelto 2.5 · Enunciado

En un instituto, cada alumno **pertenece a un único grupo**, cada grupo tiene **un único tutor** (un profesor) y además se ha modelado directamente que cada alumno **tiene como tutor** a un profesor.

<pre class="mermaid">
flowchart LR
    AL["ALUMNO"] -- "(1,1)" --- PE{"PERTENECE<br/>_A"}
    PE -- "(1,n)" --- GR["GRUPO"]
    GR -- "(0,1)" --- TU{"ES_TUTOR<br/>_DE"}
    TU -- "(1,1)" --- PR["PROFESOR"]
    AL -- "(0,n)" --- TC{"TIENE_COMO<br/>_TUTOR"}
    TC -- "(1,1)" --- PR
</pre>

**Se pide:** comprobar si hay un ciclo redundante y, si lo hay, eliminarlo.

---

## Ejercicio resuelto 2.5 · Solución

Comprobamos las **tres condiciones**:

1. **¿Hay ciclo?** Sí: ALUMNO – GRUPO – PROFESOR – ALUMNO forman un espacio cerrado. ✅
2. **¿Semánticamente equivalentes?** Sí: *tiene_como_tutor* y el camino *pertenece_a + es_tutor_de* expresan lo mismo: "quién es el tutor del alumno". ✅
3. **¿Se puede eliminar sin perder información?** Un alumno pertenece a **un único** grupo (1,1) y ese grupo tiene **un único** tutor (1,1) → el tutor de un alumno se deduce a través del grupo. ✅

**Ciclo redundante** → eliminamos **TIENE_COMO_TUTOR**.

---

## Ejercicio resuelto 2.5 · Esquema resultante

<pre class="mermaid">
flowchart LR
    AL["ALUMNO"] -- "(1,1)" --- PE{"PERTENECE_A"} -- "(1,n)" --- GR["GRUPO"] -- "(0,1)" --- TU{"ES_TUTOR_DE"} -- "(1,1)" --- PR["PROFESOR"]
</pre>

> 💡 **¿Y si un alumno pudiera estar en varios grupos (n)?** Entonces no sabríamos a través de qué grupo buscar su tutor: falla la condición 3 y el esquema **no** sería redundante.

---

## ✅ Resumen del apartado 2.5

<pre class="mermaid">
flowchart LR
    Q1{"¿Hay un ciclo?"} -- "Sí" --> Q2{"¿Relaciones<br/>semánticamente<br/>equivalentes?"}
    Q1 -- "No" --> NR["No redundante"]
    Q2 -- "Sí" --> Q3{"¿Se puede eliminar una<br/>sin perder información?<br/>(cardinalidades)"}
    Q2 -- "No" --> NR
    Q3 -- "Sí" --> R["<b>Ciclo redundante</b><br/>➜ eliminar una relación"]
    Q3 -- "No" --> NR
</pre>

---

## 📝 Ejercicios

Realizar los **ejercicios 3, 4 y 5** de la relación (1).

---

<!-- _class: transicion -->

# 2.6. Modelo Entidad/Relación Extendido

Relaciones **jerárquicas**: supertipos y subtipos

---

## 2.6. Modelo E/R Extendido · Relaciones jerárquicas

El modelo Entidad/Relación extendido contiene todo lo visto en el modelo Entidad/Relación, pero además incluye las **relaciones jerárquicas**.

Una relación jerárquica se produce cuando una relación se puede subdividir en otras, las cuales mantienen una relación **es_un** con la anterior. En este caso la entidad que se divide se dice que es un **supertipo o superconjunto** y en las que se dividen se dice que son **subtipos o subconjuntos**.

Para que esto sea posible, tiene que darse que **toda ocurrencia de la entidad subtipo o subconjunto tiene que ser una ocurrencia de la entidad supertipo o superconjunto, pero al revés no se cumple**.

> 💡 **Para entenderlo mejor:** es la idea de **generalización / especialización**. Los subtipos comparten todo lo del supertipo y además añaden lo suyo propio.

---

## 2.6. Modelo E/R Extendido · Representación

<pre class="mermaid">
flowchart TB
    SE["SUPER-ENTIDAD"] --- T1[\"tipo"/]
    T1 --- S1["SUB-ENTIDAD"]
    T1 --- S2["SUB-ENTIDAD"]
    T1 --- S3["SUB-ENTIDAD"]
    EM["EMPLEADO"] --- T2[\"cargo"/]
    T2 --- G["GERENTE"]
    T2 --- C["COMERCIAL"]
    T2 --- A["ADMINISTRATIVO"]
</pre>

- La entidad **EMPLEADO** es supertipo y se subdivide en **GERENTE, COMERCIAL Y ADMINISTRATIVO**.
- Un gerente es un empleado, pero no todo empleado es gerente.
- La relación **es_un se lee de abajo a arriba**.

<p class="small">💡 El triángulo invertido representa la relación <i>es_un</i>; la etiqueta (tipo, cargo…) es el atributo que indica a qué subtipo pertenece cada ocurrencia.</p>

---

## 2.6. Modelo E/R Extendido · Ejemplo 2

<pre class="mermaid">
flowchart TB
    AN["ANIMAL<br/><i>Entidad supertipo o superconjunto</i>"] --- T[\"tipo"/]
    T --- GA["GATO"]
    T --- AG["ÁGUILA"]
    T --- DE["DELFÍN"]
    N["Entidades subtipo o subconjunto"]:::nota
    classDef nota fill:none,stroke:none,font-style:italic
</pre>

<p class="center">⬆ <b>Relación ES_UN</b> (se lee de abajo a arriba)</p>

Un gato es un animal, pero no todo animal es un gato. La entidad animal es supertipo, y se divide en gato, águila y delfín, que son las entidades subtipo.

---

## 2.6. Modelo E/R Extendido · Herencia y tipos de jerarquía

**Las sub-entidades heredan las claves y los atributos de la super-entidad.**

Hay **4 tipos de relaciones**, que se clasifican según dos parámetros.

| Parámetro 1 | Parámetro 2 |
|:---:|:---:|
| **Exclusiva** | **Total** |
| **Inclusiva** | **Parcial** |

Así una relación puede ser **Exclusiva Total, Exclusiva Parcial, Inclusiva Total o Inclusiva Parcial**.

> 💡 **Las dos preguntas que hay que hacerse:**
> **Parámetro 1** → ¿Una ocurrencia puede estar en **varios** subtipos a la vez? (No = exclusiva · Sí = inclusiva)
> **Parámetro 2** → ¿Toda ocurrencia **tiene que** estar en algún subtipo? (Sí = total · No = parcial)

---

## 2.6. Parámetro 1 · Jerarquía exclusiva

Si una ocurrencia de la super-entidad es una ocurrencia **de una y solo una** entidad subtipo. Se representa gráficamente con **un arco que une las líneas que salen de la relación es_un**.

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    NU["NÚMEROS"] --- T[\"es_un ⌒<br/>(arco)"/]
    T --- P["POSITIVO"]
    T --- C["CERO"]
    T --- N["NEGATIVO"]
</pre>
</div>
<div class="small">

**Una ocurrencia arriba** ⬇ **Sólo una abajo como mucho**

○ **Jerarquía exclusiva.** Se representa con un arco bajo el triángulo.

</div>
</div>

Un número es positivo, negativo o cero, no puede darse 2 cosas a la vez. La entidad supertipo es número. Para cada ocurrencia de número, es una ocurrencia de una y solo una ocurrencia de los subtipos.

---

## 2.6. Parámetro 1 · Jerarquía inclusiva o con solapamiento

Si una ocurrencia de la super-entidad **puede ser una ocurrencia de varias de las sub-entidades**. Se representa gráficamente **sin poner el arco**.

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    PE["PERSONA"] --- T[\"ocupación"/]
    T --- ES["ESTUDIANTE"]
    T --- TR["TRABAJADOR"]
</pre>
</div>
<div class="small">

**Una ocurrencia arriba** ⬇ **Puede haber varias abajo**

○ **Jerarquía inclusiva.** Se representa sin arco.

</div>
</div>

Una persona puede estar trabajando y estudiando a la vez.

---

## 2.6. Parámetro 2 · Total (Obligatoriedad)

Una ocurrencia de la superentidad **debe ser obligatoriamente** una ocurrencia de alguna subentidad.

Se representa con **un círculo sobre el triángulo**.

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    NU["NÚMEROS"] --o T[\"es_un<br/>(○ círculo)"/]
    T --- P["POSITIVO"]
    T --- C["CERO"]
    T --- N["NEGATIVO"]
</pre>
</div>
<div>

**Una ocurrencia arriba** ⬇ **Obligatoria al menos una abajo**

Un elemento es, obligatoriamente, positivo, negativo o cero.

</div>
</div>

---

## 2.6. Parámetro 2 · Parcial (Opcional)

Una ocurrencia de la superentidad **puede no ser una ocurrencia de ninguna subentidad**.

Se representa **sin círculo** sobre el triángulo.

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    EN["ENFERMEDAD"] --- T[\"es_un"/]
    T --- VI["VÍRICA"]
    T --- BA["BACTERIANA"]
</pre>
</div>
<div>

**Una ocurrencia arriba** ⬇ **Puede no tener ninguna abajo**

Una enfermedad puede que no sea vírica ni bacteriana (Por ejemplo, una rotura de hueso, disfunción de algún órgano, etc.)

</div>
</div>

---

## 2.6. Cuadro resumen de los 4 tipos

Por tanto una relación jerárquica puede ser: **Exclusiva Total, Exclusiva Parcial, Inclusiva Total, Inclusiva Parcial**.

En el siguiente cuadro se recogen todos los casos con sus correspondientes representaciones.

| | **Total** | **Parcial** |
|---|:---:|:---:|
| **Exclusiva** | **(1,1)**<br/>círculo **○** + arco **⌒** | **(0,1)**<br/>solo arco **⌒** |
| **Inclusiva** | **(1,n)**<br/>solo círculo **○** | **(0,n)**<br/>ni círculo ni arco |

> 💡 **Para recordarlo:** el **arco** dice "solo uno" (máximo 1 → exclusiva). El **círculo** dice "al menos uno" (mínimo 1 → total). Por eso la participación (mín, máx) de cada caso sale directamente de los símbolos.

---

## 2.6. Ejemplos · Jerarquía exclusiva total

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    EL["ELEMENTO"] --o T[\"estado<br/>○ + ⌒"/]
    T --- L["LÍQUIDO"]
    T --- S["SÓLIDO"]
    T --- G["GASEOSO"]
</pre>
</div>
<div>

**Una ocurrencia arriba** ⬇ **Obligatoria una y sólo una abajo (1,1)**

</div>
</div>

**Exclusiva:** cada elemento, es líquido, sólido o gaseoso, no puede darse dos cosas a la vez.
**Total:** Abarca todos los casos posibles.

---

## 2.6. Ejemplos · Jerarquía exclusiva parcial

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    EN["ENFERMEDAD"] --- T[\"es_un<br/>⌒"/]
    T --- VI["VÍRICA"]
    T --- BA["BACTERIANA"]
</pre>
</div>
<div>

**Una ocurrencia arriba** ⬇ **Una o ninguna abajo (0,1)**

</div>
</div>

**Exclusiva:** Si una enfermedad es vírica no puede ser bacteriana y si es bacteriana no puede ser vírica.
**Parcial:** No recoge todos los casos de las enfermedades.

---

## 2.6. Ejemplos · Jerarquía inclusiva total

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    MA["MAMÍFERO"] --o T[\"tipo<br/>○"/]
    T --- AC["ACUÁTICO"]
    T --- TE["TERRESTRE"]
    T --- VO["VOLADOR"]
</pre>
</div>
<div>

**Una ocurrencia arriba** ⬇ **Obligatoria una o más abajo (1,n)**

</div>
</div>

**Inclusiva:** Hay mamíferos que se ubican en varias entidades a la vez, por ejemplo, los castores, que viven en el agua y en la tierra.
**Total:** No hay mamíferos que no sean acuáticos, voladores o terrestres.

---

## 2.6. Ejemplos · Jerarquía inclusiva parcial

<div class="cols">
<div>
<pre class="mermaid">
flowchart TB
    PE["PERSONA"] --- T[\"ocupación"/]
    T --- ES["ESTUDIANTE"]
    T --- TR["TRABAJADOR"]
</pre>
</div>
<div>

**Una ocurrencia arriba** ⬇ **Ninguna o varias abajo (0,n)**

</div>
</div>

**Inclusiva:** Hay personas que se ubican en las dos entidades.
**Parcial:** Hay personas que ni estudian ni trabajan.

---

<!-- _class: transicion -->

# 📘 Ejercicio resuelto · 2.6

Clasificar jerarquías

---

## Ejercicio resuelto 2.6 · Enunciado

Clasifica cada jerarquía (exclusiva/inclusiva y total/parcial) y dibújala:

**Caso A.** En una universidad se registran **personas** (DNI, nombre). Toda persona registrada es **alumno**, **profesor** o ambas cosas (hay doctorandos que estudian y dan clase).

**Caso B.** Un taller registra **vehículos** (matrícula, marca). Algunos son **turismos** (nº de puertas) y otros **motos** (cilindrada), pero también repara camiones y furgonetas, de los que no guarda datos específicos. Un vehículo no puede ser turismo y moto a la vez.

> 💡 Recuerda las dos preguntas: ¿puede estar en **varios** subtipos? · ¿**tiene que** estar en alguno?

---

## Ejercicio resuelto 2.6 · Solución

<div class="cols">
<div>

**Caso A · PERSONA**
- ¿Varios subtipos? **Sí** (doctorandos) → **inclusiva** (sin arco)
- ¿Obligatorio alguno? **Sí** → **total** (círculo)
- → **Inclusiva total (1,n)**

<pre class="mermaid">
flowchart TB
    PE["<b>PERSONA</b><hr/>DNI #<br/>Nombre"] --o T[\"rol<br/>○"/]
    T --- AL["ALUMNO"]
    T --- PR["PROFESOR"]
</pre>

</div>
<div>

**Caso B · VEHÍCULO**
- ¿Varios subtipos? **No** → **exclusiva** (arco)
- ¿Obligatorio alguno? **No** (camiones, furgonetas) → **parcial** (sin círculo)
- → **Exclusiva parcial (0,1)**

<pre class="mermaid">
flowchart TB
    VE["<b>VEHÍCULO</b><hr/>Matrícula #<br/>Marca"] --- T[\"tipo<br/>⌒"/]
    T --- TU["<b>TURISMO</b><hr/>Nº_puertas"]
    T --- MO["<b>MOTO</b><hr/>Cilindrada"]
</pre>

</div>
</div>

<p class="small">💡 Los subtipos <b>heredan</b> la clave y los atributos del supertipo: un TURISMO tiene Matrícula, Marca y además Nº_puertas.</p>

---

## ✅ Resumen del apartado 2.6

<pre class="mermaid">
flowchart LR
    Q1{"¿Puede estar en<br/>varios subtipos a la vez?"}
    Q1 -- "No" --> EX["EXCLUSIVA (arco ⌒)"]
    Q1 -- "Sí" --> IN["INCLUSIVA (sin arco)"]
    EX --> Q2{"¿Tiene que estar en<br/>algún subtipo?"}
    IN --> Q3{"¿Tiene que estar en<br/>algún subtipo?"}
    Q2 -- "Sí" --> ET["Exclusiva total (1,1)<br/>Ej.: ELEMENTO"]
    Q2 -- "No" --> EP["Exclusiva parcial (0,1)<br/>Ej.: ENFERMEDAD"]
    Q3 -- "Sí" --> IT["Inclusiva total (1,n)<br/>Ej.: MAMÍFERO"]
    Q3 -- "No" --> IP["Inclusiva parcial (0,n)<br/>Ej.: PERSONA"]
</pre>

---

<!-- _class: transicion -->
<!-- _paginate: false -->

# Fin de la Parte I

**El Modelo Entidad/Relación**

Entidades · Atributos · Relaciones · Cardinalidad · Participación · Claves
Reflexivas · Débiles · N-arias · Redundancia · E/R Extendido
