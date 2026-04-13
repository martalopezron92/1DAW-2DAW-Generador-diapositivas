---
marp: true
theme: default
paginate: true
backgroundColor: #fff
style: |
  section {
    font-family: 'Segoe UI', 'Roboto', sans-serif;
  }
  h1 {
    color: #1a5276;
    font-size: 2.2em;
    margin-bottom: 0.5em;
  }
  h2 {
    color: #2874a6;
    font-size: 1.8em;
    margin-top: 0.3em;
  }
  h3 {
    color: #3498db;
    font-size: 1.4em;
  }
  .ejercicio {
    background: #fef9e7;
    border-left: 5px solid #f39c12;
    padding: 15px;
    margin: 15px 0;
  }
  .solucion {
    background: #eafaf1;
    border-left: 5px solid #27ae60;
    padding: 15px;
    margin: 15px 0;
  }
  .pista {
    background: #ebf5fb;
    border-left: 5px solid #3498db;
    padding: 15px;
    margin: 15px 0;
  }
  .error {
    background: #fdedec;
    border-left: 5px solid #e74c3c;
    padding: 15px;
    margin: 15px 0;
  }
  .uml-box {
    background: #fff;
    border: 2px solid #2c3e50;
    padding: 10px;
    margin: 10px 0;
    font-family: 'Courier New', monospace;
    text-align: center;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  table {
    font-size: 0.85em;
  }
  code {
    background: #f4f4f4;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Consolas', monospace;
  }
  pre {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 15px;
    border-radius: 5px;
    font-size: 0.75em;
    overflow-x: auto;
  }
  .badge {
    display: inline-block;
    font-size: 0.75em;
    padding: 2px 10px;
    border-radius: 12px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  .badge-clase { background: #d6eaf8; color: #1a5276; }
  .badge-interfaz { background: #d5f5e3; color: #1e8449; }
  .badge-mixto { background: #fdebd0; color: #784212; }
---

<!-- _class: lead -->

# Ejercicios: Clases e Interfaces en UML

## UD 4.2 — Diagramas de Clase

**1º DAW – Entornos de Desarrollo**

---

## Índice de ejercicios

| Bloque | Contenido | Nivel |
|--------|-----------|-------|
| **A** | Identificar clases en un enunciado | ⭐ |
| **B** | Nomenclatura y zonas de una clase | ⭐ |
| **C** | Visibilidad de atributos y métodos | ⭐⭐ |
| **D** | Miembros estáticos | ⭐⭐ |
| **E** | De Java a UML | ⭐⭐ |
| **F** | De UML a Java | ⭐⭐ |
| **G** | Identificar y diseñar interfaces | ⭐⭐ |
| **H** | Detectar errores en diagramas | ⭐⭐⭐ |
| **I** | Casos completos | ⭐⭐⭐ |

---

<!-- _class: lead -->

# Bloque A

## Identificar Clases en un Enunciado

---

## A1 — Sistema de una Biblioteca

<div class="ejercicio">

**Enunciado:**
Lee el siguiente texto y escribe en tu cuaderno **todas las clases** que identificas.

> Una biblioteca gestiona sus fondos de libros y revistas. Cada socio puede hacer préstamos de uno o varios ejemplares. Los préstamos tienen una fecha de inicio y una fecha límite de devolución. Una multa se genera automáticamente si el socio no devuelve el ejemplar a tiempo. La biblioteca tiene varios empleados que gestionan las altas de socios y el catálogo.

</div>

<div class="pista">

**Pista:** Busca los sustantivos que representan conceptos del sistema (cosas, roles, eventos, organizaciones). Los verbos suelen ser métodos, no clases.

</div>

---

## A1 — Solución

<div class="solucion">

**Clases identificadas:**

| Clase | Tipo de concepto |
|-------|-----------------|
| `Libro` | Tangible |
| `Revista` | Tangible |
| `Socio` | Rol |
| `Prestamo` | Interacción / Evento |
| `Multa` | Interacción / Evento |
| `Empleado` | Rol |

> Los **fondos** y el **catálogo** son conceptos más difusos; podrían convertirse en colecciones dentro de otra clase o en clases propias según el detalle del diseño.

</div>

---

## A2 — Sistema de una Tienda Online

<div class="ejercicio">

**Enunciado:**
Identifica las clases del siguiente enunciado. Después, para cada clase que encuentres, escribe al menos **dos atributos** que tendría.

> Una tienda en línea vende productos de distintas categorías. Los clientes registrados añaden productos a su carrito y generan pedidos. Cada pedido contiene varias líneas de pedido con el producto, la cantidad y el precio unitario. Los pedidos pasan por distintos estados: pendiente, pagado, enviado y entregado.

</div>

---

## A2 — Solución

<div class="solucion">

| Clase | Atributos sugeridos |
|-------|---------------------|
| `Producto` | `nombre`, `precio`, `stock` |
| `Categoria` | `nombre`, `descripcion` |
| `Cliente` | `nombre`, `email`, `direccion` |
| `Carrito` | `fechaCreacion`, `total` |
| `Pedido` | `fechaPedido`, `estado`, `total` |
| `LineaPedido` | `cantidad`, `precioUnitario` |

</div>

---

## A3 — ¿Clase o no clase?

<div class="ejercicio">

**Enunciado:**
Para cada término subrayado, decide si debe ser **clase**, **atributo de otra clase** o **método de otra clase**. Justifica tu respuesta.

1. En un sistema bancario: la _**dirección postal**_ de un cliente.
2. En una app de vuelos: un _**vuelo**_.
3. En un sistema de notas: _**calcular la media**_ de un alumno.
4. En una red social: la _**fecha de registro**_ de un usuario.
5. En un hospital: un _**paciente**_.
6. En un videojuego: _**subir de nivel**_ del personaje.

</div>

---

## A3 — Solución

<div class="solucion">

| Término | Decisión | Motivo |
|---------|----------|--------|
| Dirección postal | **Atributo** de `Cliente` | No tiene comportamiento propio relevante |
| Vuelo | **Clase** | Tiene atributos propios (origen, destino, hora) y comportamiento |
| Calcular la media | **Método** de `Alumno` | Es una acción, no un objeto |
| Fecha de registro | **Atributo** de `Usuario` | Dato simple de un objeto |
| Paciente | **Clase** | Rol con atributos y comportamiento propios |
| Subir de nivel | **Método** de `Personaje` | Es una acción que realiza el objeto |

</div>

---

<!-- _class: lead -->

# Bloque B

## Nomenclatura y Estructura de una Clase

---

## B1 — Corrección de nombres

<div class="ejercicio">

**Enunciado:**
Las siguientes clases tienen nombres mal escritos o que no siguen las convenciones UML. Escribe el nombre correcto para cada una.

| Nombre incorrecto | Problema |
|-------------------|----------|
| `cliente` | |
| `FACTURA` | |
| `crear_pedido` | |
| `Productos` | |
| `userAccount` | |
| `GestionarEnvio` | |

</div>

---

## B1 — Solución

<div class="solucion">

| Nombre incorrecto | Nombre correcto | Problema |
|-------------------|-----------------|----------|
| `cliente` | `Cliente` | Minúscula inicial (PascalCase obligatorio) |
| `FACTURA` | `Factura` | Todo en mayúsculas no es PascalCase |
| `crear_pedido` | `Pedido` | Verbo → debe ser un sustantivo |
| `Productos` | `Producto` | Plural; las clases van en singular |
| `userAccount` | `CuentaUsuario` | camelCase y mezcla de idiomas |
| `GestionarEnvio` | `Envio` | Verbo como nombre de clase |

</div>

---

## B2 — Completar el diagrama de una clase

<div class="ejercicio">

**Enunciado:**
Dibuja en tu cuaderno el diagrama UML de la clase `Pelicula` con los siguientes datos:

- Atributos privados: `titulo` (String), `duracion` (int), `genero` (String), `puntuacion` (double)
- Atributo privado estático: `totalPeliculas` (int)
- Métodos públicos: getters y setters de todos los atributos de instancia
- Método público estático: `getTotalPeliculas()` que devuelve int
- Constructor público: recibe `titulo`, `duracion` y `genero`

</div>

<div class="pista">

**Recuerda:** Los miembros estáticos se **subrayan** en el diagrama UML.

</div>

---

## B2 — Solución

<div class="uml-box">

┌──────────────────────────────────────────┐
│                 Pelicula                 │
├──────────────────────────────────────────┤
│ - titulo : String                        │
│ - duracion : int                         │
│ - genero : String                        │
│ - puntuacion : double                    │
│ <u>- totalPeliculas : int</u>            │
├──────────────────────────────────────────┤
│ + Pelicula(titulo, duracion, genero)     │
│ + getTitulo() : String                   │
│ + setTitulo(titulo : String) : void      │
│ + getDuracion() : int                    │
│ + setDuracion(duracion : int) : void     │
│ + getGenero() : String                   │
│ + setGenero(genero : String) : void      │
│ + getPuntuacion() : double               │
│ + setPuntuacion(p : double) : void       │
│ <u>+ getTotalPeliculas() : int</u>       │
└──────────────────────────────────────────┘

</div>

---

## B3 — Identificar las tres zonas

<div class="ejercicio">

**Enunciado:**
Observa el siguiente diagrama y responde las preguntas.

<div class="uml-box">

┌──────────────────────────────┐
│         CuentaBancaria       │
├──────────────────────────────┤
│ - titular : String           │
│ - saldo : double             │
│ - iban : String              │
│ <u>- tasaInteres : double</u>│
├──────────────────────────────┤
│ + ingresar(importe) : void   │
│ + retirar(importe) : Boolean │
│ + getSaldo() : double        │
│ <u>+ getTasa() : double</u>  │
└──────────────────────────────┘

</div>

1. ¿Cuántos atributos de instancia hay? ¿Y estáticos?
2. ¿Qué visibilidad tienen los atributos? ¿Y los métodos?
3. ¿Qué indica el subrayado en `tasaInteres` y `getTasa()`?

</div>

---

## B3 — Solución

<div class="solucion">

1. **Atributos de instancia:** 3 (`titular`, `saldo`, `iban`). **Estáticos:** 1 (`tasaInteres`).

2. **Atributos:** todos privados (`-`). **Métodos:** todos públicos (`+`).

3. El **subrayado** indica que son **miembros estáticos**: pertenecen a la clase, no a cada objeto. `tasaInteres` es compartida por todas las cuentas; `getTasa()` se puede llamar sin instanciar la clase.

</div>

---

<!-- _class: lead -->

# Bloque C

## Visibilidad de Atributos y Métodos

---

## C1 — Asignar visibilidad correcta

<div class="ejercicio">

**Enunciado:**
Para cada atributo o método de la clase `Alumno`, decide qué visibilidad (`+`, `-`, `#`) es la más adecuada y por qué.

| Elemento | Visibilidad | Razonamiento |
|----------|-------------|--------------|
| `nombre : String` | ? | |
| `contrasena : String` | ? | |
| `obtenerNombre()` | ? | |
| `validarContrasena(pass)` | ? | |
| `calcularMedia()` | ? | |
| `nota : double` | ? | |

</div>

---

## C1 — Solución

<div class="solucion">

| Elemento | Visibilidad | Razonamiento |
|----------|-------------|--------------|
| `nombre : String` | `-` | Encapsulación: se accede mediante getter |
| `contrasena : String` | `-` | Dato sensible, nunca público |
| `obtenerNombre()` | `+` | El resto del sistema debe poder leerlo |
| `validarContrasena(pass)` | `-` o `#` | Lógica interna o heredable |
| `calcularMedia()` | `+` | Funcionalidad de uso general |
| `nota : double` | `-` | Interno, acceso controlado por setter/getter |

</div>

---

## C2 — Notación de atributos UML

<div class="ejercicio">

**Enunciado:**
Escribe en notación UML completa cada uno de estos atributos:

1. Privado, se llama `email`, tipo `String`.
2. Público, se llama `ID`, tipo `int`, debe ser único.
3. Privado, se llama `edad`, tipo `int`, valor inicial `18`.
4. Protegido, se llama `coordenadas`, tipo lista de `Double`.
5. Derivado, se llama `nombre completo` (se calcula de `nombre` + `apellidos`).

</div>

---

## C2 — Solución

<div class="solucion">

| Notación UML |
|------|
| `- email : String` |
| `+ ID : int {unique}` |
| `- edad : int = 18` |
| `# coordenadas : List<Double>` |
| `/ nombreCompleto : String` |

</div>

---

## C3 — Notación de métodos UML

<div class="ejercicio">

**Enunciado:**
Escribe en notación UML completa cada uno de estos métodos:

1. Público, `getNombre()`, devuelve `String`.
2. Público, `setEdad()`, recibe `edad` de tipo `int`, no devuelve nada.
3. Protegido, `validarEmail()`, recibe `email` de tipo `String`, devuelve `Boolean`.
4. Público, `calcularDescuento()`, recibe `precio` (`Double`) y `porcentaje` (`Double`), devuelve `Double`.
5. Privado, `generarCodigo()`, no recibe nada, devuelve `String`.

</div>

---

## C3 — Solución

<div class="solucion">

| Notación UML |
|------|
| `+ getNombre() : String` |
| `+ setEdad(edad : int) : void` |
| `# validarEmail(email : String) : Boolean` |
| `+ calcularDescuento(precio : Double, porcentaje : Double) : Double` |
| `- generarCodigo() : String` |

</div>

---

<!-- _class: lead -->

# Bloque D

## Miembros Estáticos

---

## D1 — ¿Estático o de instancia?

<div class="ejercicio">

**Enunciado:**
Para cada atributo o método, decide si debe ser **estático** (pertenece a la clase) o **de instancia** (pertenece a cada objeto). Justifica la respuesta.

| Clase | Elemento | ¿Estático? |
|-------|----------|---|
| `Empleado` | `nombre : String` | ? |
| `Empleado` | `totalEmpleados : int` | ? |
| `Producto` | `precio : double` | ? |
| `Producto` | `IVA : double = 0.21` | ? |
| `Vehiculo` | `matricula : String` | ? |
| `Vehiculo` | `velocidadMaxima : int = 120` | ? |

</div>

---

## D1 — Solución

<div class="solucion">

| Elemento | ¿Estático? | Razón |
|----------|------------|-------|
| `nombre : String` | No | Cada empleado tiene su propio nombre |
| `totalEmpleados : int` | **Sí** | Contador compartido por todos los objetos |
| `precio : double` | No | Cada producto tiene su propio precio |
| `IVA : double = 0.21` | **Sí** | Se aplica igual a todos los productos |
| `matricula : String` | No | Única por vehículo |
| `velocidadMaxima : int = 120` | **Sí** | Límite compartido por todos los vehículos |

</div>

---

## D2 — De código Java a UML con estáticos

<div class="ejercicio">

**Enunciado:**
Dibuja el diagrama UML de la siguiente clase, indicando correctamente los miembros estáticos con subrayado.

```java
public class Estudiante {
    private String nombre;
    private double mediaNotas;
    private static int totalEstudiantes = 0;
    private static String centro = "IES Ejemplo";

    public Estudiante(String nombre) { ... }
    public String getNombre() { return nombre; }
    public double getMediaNotas() { return mediaNotas; }
    public static int getTotalEstudiantes() { return totalEstudiantes; }
    public static String getCentro() { return centro; }
}
```

</div>

---

## D2 — Solución

<div class="uml-box">

┌──────────────────────────────────────────┐
│               Estudiante                 │
├──────────────────────────────────────────┤
│ - nombre : String                        │
│ - mediaNotas : double                    │
│ <u>- totalEstudiantes : int = 0</u>      │
│ <u>- centro : String = "IES Ejemplo"</u> │
├──────────────────────────────────────────┤
│ + Estudiante(nombre : String)            │
│ + getNombre() : String                   │
│ + getMediaNotas() : double               │
│ <u>+ getTotalEstudiantes() : int</u>     │
│ <u>+ getCentro() : String</u>            │
└──────────────────────────────────────────┘

</div>

---

<!-- _class: lead -->

# Bloque E

## De Java a UML

---

## E1 — Clase Vehiculo

<div class="ejercicio">

**Enunciado:**
Dibuja el diagrama UML completo de la siguiente clase Java.

```java
public class Vehiculo {
    private String marca;
    private String modelo;
    private int anio;
    private double precio;
    private static int totalVehiculos = 0;

    public Vehiculo(String marca, String modelo, int anio, double precio) { ... }
    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }
    public String getModelo() { return modelo; }
    public int getAnio() { return anio; }
    public double getPrecio() { return precio; }
    public static int getTotalVehiculos() { return totalVehiculos; }

    @Override
    public String toString() { return marca + " " + modelo + " (" + anio + ")"; }
}
```

</div>

---

## E1 — Solución

<div class="uml-box">

┌─────────────────────────────────────────────────────────┐
│                        Vehiculo                         │
├─────────────────────────────────────────────────────────┤
│ - marca : String                                        │
│ - modelo : String                                       │
│ - anio : int                                            │
│ - precio : double                                       │
│ <u>- totalVehiculos : int = 0</u>                       │
├─────────────────────────────────────────────────────────┤
│ + Vehiculo(marca:String, modelo:String, anio:int, precio:double) │
│ + getMarca() : String                                   │
│ + setMarca(marca : String) : void                       │
│ + getModelo() : String                                  │
│ + getAnio() : int                                       │
│ + getPrecio() : double                                  │
│ <u>+ getTotalVehiculos() : int</u>                      │
│ + toString() : String                                   │
└─────────────────────────────────────────────────────────┘

</div>

---

## E2 — Clase Producto

<div class="ejercicio">

**Enunciado:**
Convierte esta clase Java a su diagrama UML.

```java
public class Producto {
    private int id;
    private String nombre;
    private double precio;
    private int stock;
    private static double iva = 0.21;

    public Producto(int id, String nombre, double precio) { ... }

    public double calcularPrecioConIva() {
        return precio * (1 + iva);
    }

    private boolean tieneStock() {
        return stock > 0;
    }

    public void reducirStock(int cantidad) { ... }
    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public double getPrecio() { return precio; }
    public int getStock() { return stock; }
}
```

</div>

---

## E2 — Solución

<div class="uml-box">

┌─────────────────────────────────────────────────────┐
│                       Producto                      │
├─────────────────────────────────────────────────────┤
│ - id : int                                          │
│ - nombre : String                                   │
│ - precio : double                                   │
│ - stock : int                                       │
│ <u>- iva : double = 0.21</u>                        │
├─────────────────────────────────────────────────────┤
│ + Producto(id : int, nombre : String, precio : double) │
│ + calcularPrecioConIva() : double                   │
│ - tieneStock() : Boolean                            │
│ + reducirStock(cantidad : int) : void               │
│ + getId() : int                                     │
│ + getNombre() : String                              │
│ + getPrecio() : double                              │
│ + getStock() : int                                  │
└─────────────────────────────────────────────────────┘

</div>

---

<!-- _class: lead -->

# Bloque F

## De UML a Java

---

## F1 — Clase Reserva

<div class="ejercicio">

**Enunciado:**
A partir del siguiente diagrama UML, escribe la clase Java completa (atributos, constructor y métodos indicados).

<div class="uml-box">

┌──────────────────────────────────────────┐
│                  Reserva                 │
├──────────────────────────────────────────┤
│ - codigo : String                        │
│ - fechaEntrada : String                  │
│ - fechaSalida : String                   │
│ - numPersonas : int                      │
│ <u>- totalReservas : int = 0</u>         │
├──────────────────────────────────────────┤
│ + Reserva(codigo, fechaEntrada, fechaSalida, numPersonas) │
│ + getCodigo() : String                   │
│ + getFechaEntrada() : String             │
│ + getFechaSalida() : String              │
│ + getNumPersonas() : int                 │
│ <u>+ getTotalReservas() : int</u>        │
│ + toString() : String                    │
└──────────────────────────────────────────┘

</div>

</div>

---

## F1 — Solución

```java
public class Reserva {
    private String codigo;
    private String fechaEntrada;
    private String fechaSalida;
    private int numPersonas;
    private static int totalReservas = 0;

    public Reserva(String codigo, String fechaEntrada,
                   String fechaSalida, int numPersonas) {
        this.codigo = codigo;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.numPersonas = numPersonas;
        totalReservas++;
    }

    public String getCodigo() { return codigo; }
    public String getFechaEntrada() { return fechaEntrada; }
    public String getFechaSalida() { return fechaSalida; }
    public int getNumPersonas() { return numPersonas; }
    public static int getTotalReservas() { return totalReservas; }

    @Override
    public String toString() {
        return "Reserva " + codigo + " [" + fechaEntrada + " - " + fechaSalida + "]";
    }
}
```

---

<!-- _class: lead -->

# Bloque G

## Identificar y Diseñar Interfaces

---

## G1 — ¿Interfaz o clase?

<div class="ejercicio">

**Enunciado:**
Para cada elemento, decide si debe modelarse como **interfaz** o como **clase**. Justifica la respuesta.

| Elemento | Interfaz / Clase | Razón |
|----------|-----------------|-------|
| `Pajaro` | ? | |
| `Volador` (volar, aterrizar) | ? | |
| `FormaDePago` (pagar, verificar) | ? | |
| `TarjetaCredito` | ? | |
| `Serializable` | ? | |
| `Empleado` | ? | |

</div>

---

## G1 — Solución

<div class="solucion">

| Elemento | Decisión | Razón |
|----------|----------|-------|
| `Pajaro` | **Clase** | Tiene estado y comportamiento concreto |
| `Volador` | **Interfaz** | Define una capacidad que distintos seres pueden implementar |
| `FormaDePago` | **Interfaz** | Es un contrato; diferentes medios de pago lo cumplen |
| `TarjetaCredito` | **Clase** | Implementa `FormaDePago` con datos y lógica propios |
| `Serializable` | **Interfaz** | Define la capacidad de serializarse, sin implementación |
| `Empleado` | **Clase** | Tiene atributos concretos y comportamiento |

</div>

---

## G2 — Completar una interfaz en UML

<div class="ejercicio">

**Enunciado:**
Diseña en notación UML la interfaz `IDescargable`, que deben implementar todos aquellos elementos del sistema capaces de descargarse. Debe incluir:

- `descargar(destino : String) : Boolean`
- `cancelarDescarga() : void`
- `getProgreso() : int`
- `isPausada() : Boolean`

</div>

---

## G2 — Solución

<div class="uml-box">

┌──────────────────────────────────────┐
│           <<interface>>              │
│           IDescargable               │
├──────────────────────────────────────┤
│ + descargar(destino : String) : Boolean │
│ + cancelarDescarga() : void          │
│ + getProgreso() : int                │
│ + isPausada() : Boolean              │
└──────────────────────────────────────┘

</div>

<div class="pista">

**Recuerda:** Las interfaces solo tienen métodos (sin implementar) y no tienen atributos. El estereotipo `<<interface>>` va sobre el nombre.

</div>

---

## G3 — Diferencia entre interfaz y clase abstracta

<div class="ejercicio">

**Enunciado:**
Completa la tabla con las diferencias entre interfaz y clase abstracta.

| Característica | Interfaz | Clase Abstracta |
|----------------|----------|-----------------|
| ¿Puede tener atributos? | | |
| ¿Puede tener métodos implementados? | | |
| ¿Herencia múltiple? | | |
| ¿Se instancia directamente? | | |
| ¿Cuándo la usaría? | | |

</div>

---

## G3 — Solución

<div class="solucion">

| Característica | Interfaz | Clase Abstracta |
|----------------|----------|-----------------|
| ¿Puede tener atributos? | ❌ No | ✅ Sí |
| ¿Puede tener métodos implementados? | ❌ Solo firma | ✅ Puede tener ambos |
| ¿Herencia múltiple? | ✅ Sí (varias a la vez) | ❌ Solo una |
| ¿Se instancia directamente? | ❌ No | ❌ No |
| ¿Cuándo la usaría? | Para definir una **capacidad** o **contrato** | Para proporcionar una **base común parcial** |

</div>

---

## G4 — Diseñar interfaz e implementación

<div class="ejercicio">

**Enunciado:**
Diseña el diagrama UML (solo las cajas, sin flechas todavía) para el siguiente escenario:

> Un sistema de notificaciones puede enviar mensajes por tres canales distintos: **email**, **SMS** y **notificación push**. Todos deben poder `enviarMensaje(texto : String) : Boolean` y `verificarConexion() : Boolean`.

1. Define la interfaz común.
2. Define las tres clases que la implementan, con al menos un atributo propio cada una.

</div>

---

## G4 — Solución

<div class="uml-box">

┌──────────────────────────────┐
│        <<interface>>         │
│        INotificador          │
├──────────────────────────────┤
│ + enviarMensaje(texto:String) : Boolean │
│ + verificarConexion() : Boolean │
└──────────────────────────────┘

</div>

<div class="columns">

<div class="uml-box">

┌──────────────────────┐
│   NotificadorEmail   │
├──────────────────────┤
│ - servidor : String  │
│ - puerto : int       │
├──────────────────────┤
│ + enviarMensaje(...) │
│ + verificarConexion()│
└──────────────────────┘

</div>

<div class="uml-box">

┌────────────────────┐
│  NotificadorSMS    │
├────────────────────┤
│ - telefono : String│
├────────────────────┤
│ + enviarMensaje(...)│
│ + verificarConexion()│
└────────────────────┘

</div>

</div>

---

<!-- _class: lead -->

# Bloque H

## Detectar Errores en Diagramas

---

## H1 — Caza de errores (1)

<div class="ejercicio">

**Enunciado:**
El siguiente diagrama tiene **5 errores**. Encuéntralos todos y escribe la corrección.

<div class="uml-box">

┌────────────────────────────────┐
│          pedido                │
├────────────────────────────────┤
│ + id_pedido : integer          │
│ + fechaPedido : Date           │
│ total : double                 │
│ - estado : String = pendiente  │
├────────────────────────────────┤
│ - getTotalConIva()             │
│ + cancelarPedido() : void      │
└────────────────────────────────┘

</div>

</div>

---

## H1 — Solución

<div class="solucion">

| Error encontrado | Corrección |
|-----------------|------------|
| `pedido` en minúscula | → `Pedido` (PascalCase) |
| `id_pedido` con guion bajo | → `idPedido` (camelCase en atributos) |
| `integer` en minúscula | → `int` o `Integer` (convención) |
| `total` sin símbolo de visibilidad | → `- total : double` |
| `- getTotalConIva()` es privado | → debería ser `+` para ser usable desde fuera |

</div>

---

## H2 — Caza de errores (2)

<div class="ejercicio">

**Enunciado:**
Encuentra los errores en este diagrama de interfaz.

<div class="uml-box">

┌──────────────────────────────────┐
│              IConectable         │
├──────────────────────────────────┤
│ - ip : String                    │
│ - puerto : int = 8080            │
├──────────────────────────────────┤
│ + conectar(ip:String) : void     │
│ + desconectar() : void           │
│ # validarIP(ip:String) : Boolean │
└──────────────────────────────────┘

</div>

</div>

---

## H2 — Solución

<div class="solucion">

| Error encontrado | Corrección |
|-----------------|------------|
| Falta el estereotipo `<<interface>>` sobre el nombre | Añadir `<<interface>>` |
| Las interfaces **no tienen atributos** | Eliminar `ip` y `puerto` |
| Un método protegido (`#`) en una interfaz no tiene sentido | Los métodos de una interfaz son `+` (públicos) |

**Versión corregida:**

<div class="uml-box">

┌──────────────────────────────────┐
│          <<interface>>           │
│           IConectable            │
├──────────────────────────────────┤
│ + conectar(ip : String) : void   │
│ + desconectar() : void           │
│ + validarIP(ip : String) : Boolean │
└──────────────────────────────────┘

</div>

</div>

---

<!-- _class: lead -->

# Bloque I

## Casos Completos

---

## I1 — Sistema de una App de Música

<div class="ejercicio">

**Enunciado:**
Lee el siguiente enunciado y realiza todas las tareas pedidas.

> Una app de música permite a los **usuarios** escuchar **canciones** agrupadas en **álbumes**. Los usuarios pueden crear **listas de reproducción** propias. La app tiene distintos tipos de **suscripción** (gratuita, premium). Todos los elementos que se pueden reproducir (canciones, podcasts) deben tener métodos `reproducir()`, `pausar()` y `getDuracion()`.

1. Identifica todas las clases.
2. Define la interfaz para los elementos reproducibles.
3. Dibuja el UML de la clase `Cancion` (con atributos razonables).
4. Señala qué clase implementaría la interfaz.

</div>

---

## I1 — Solución (1/2)

<div class="solucion">

**1. Clases identificadas:**
`Usuario`, `Cancion`, `Album`, `ListaReproduccion`, `Suscripcion`, `Podcast`

**2. Interfaz `IReproducible`:**

<div class="uml-box">

┌──────────────────────────────┐
│        <<interface>>         │
│        IReproducible         │
├──────────────────────────────┤
│ + reproducir() : void        │
│ + pausar() : void            │
│ + getDuracion() : int        │
└──────────────────────────────┘

</div>

</div>

---

## I1 — Solución (2/2)

<div class="solucion">

**3. Clase `Cancion`:**

<div class="uml-box">

┌──────────────────────────────────────┐
│                Cancion               │
├──────────────────────────────────────┤
│ - titulo : String                    │
│ - artista : String                   │
│ - duracion : int                     │
│ - genero : String                    │
│ <u>- totalCanciones : int</u>        │
├──────────────────────────────────────┤
│ + Cancion(titulo, artista, duracion) │
│ + reproducir() : void                │
│ + pausar() : void                    │
│ + getDuracion() : int                │
│ + getTitulo() : String               │
│ <u>+ getTotalCanciones() : int</u>   │
└──────────────────────────────────────┘

</div>

**4.** Tanto `Cancion` como `Podcast` implementan `IReproducible`.

</div>

---

## I2 — Diseña desde cero

<div class="ejercicio">

**Enunciado:**
Diseña el diagrama UML de las siguientes clases para un sistema de gestión de un parking. No hay respuesta única — lo importante es que sea coherente.

- Clase `Vehiculo`: matrícula, marca, tipo (`coche` / `moto` / `furgoneta`).
- Clase `Plaza`: número de plaza, ocupada (`Boolean`), tipo.
- Clase `Ticket`: código, hora entrada, hora salida, importe.
- Interfaz `ICalculable`: método `calcularImporte(horas : int) : double`.

**Requisitos:**
- Aplica visibilidades correctas.
- Añade al menos un miembro estático donde tenga sentido.
- `Ticket` implementa `ICalculable`.

</div>

---

## I2 — Solución orientativa

<div class="columns">

<div class="uml-box">

┌─────────────────────────────┐
│          Vehiculo           │
├─────────────────────────────┤
│ - matricula : String        │
│ - marca : String            │
│ - tipo : String             │
├─────────────────────────────┤
│ + getMatricula() : String   │
│ + getMarca() : String       │
│ + getTipo() : String        │
└─────────────────────────────┘

</div>

<div class="uml-box">

┌────────────────────────────┐
│           Plaza            │
├────────────────────────────┤
│ - numero : int             │
│ - ocupada : Boolean        │
│ - tipo : String            │
│ <u>- totalPlazas : int</u> │
├────────────────────────────┤
│ + isOcupada() : Boolean    │
│ + ocupar() : void          │
│ + liberar() : void         │
└────────────────────────────┘

</div>

</div>

---

## I2 — Solución orientativa (2/2)

<div class="columns">

<div class="uml-box">

┌──────────────────────────────┐
│          <<interface>>       │
│          ICalculable         │
├──────────────────────────────┤
│ + calcularImporte(horas:int) : double │
└──────────────────────────────┘

</div>

<div class="uml-box">

┌────────────────────────────────┐
│             Ticket             │
├────────────────────────────────┤
│ - codigo : String              │
│ - horaEntrada : String         │
│ - horaSalida : String          │
│ - importe : double             │
│ <u>- tarifaHora : double</u>   │
├────────────────────────────────┤
│ + calcularImporte(h:int):double│
│ + getCodigo() : String         │
│ + getImporte() : double        │
└────────────────────────────────┘

</div>

</div>

---

## Resumen de lo practicado

| Bloque | Competencia |
|--------|-------------|
| A | Identificar clases, atributos y métodos en un enunciado |
| B | Nombrar clases correctamente y dibujar las tres zonas |
| C | Aplicar visibilidad `+`, `-`, `#` con criterio |
| D | Distinguir miembros de instancia y miembros estáticos |
| E | Traducir código Java a diagrama UML |
| F | Traducir diagrama UML a código Java |
| G | Diseñar interfaces y distinguirlas de clases abstractas |
| H | Detectar errores de notación en diagramas |
| I | Diseñar sistemas completos con clases e interfaces |
