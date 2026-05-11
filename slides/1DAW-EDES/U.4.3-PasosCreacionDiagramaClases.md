---
marp: true
theme: default
paginate: true
size: 16:9
---

# Pasos para crear un diagrama de clases orientado a objetos

> Un diagrama de clases no es solo “dibujar tablas con atributos”.  
> Es decidir:
>
> - Qué objetos existen
> - Qué sabe cada objeto
> - Qué puede hacer cada objeto
> - Cómo colaboran entre ellos

---

# 1. Leer el enunciado buscando conceptos del dominio

Primero no pensamos en código.

Pensamos en:

- Qué mundo describe el problema
- Qué entidades existen
- Qué acciones ocurren
- Qué reglas aparecen

---

# Qué buscar en el enunciado

| En el enunciado aparece… | Puede convertirse en… | Ejemplo |
|---|---|---|
| Sustantivos importantes | Clases | Libro, Autor, Lector |
| Características | Atributos | nombre, fechaNacimiento |
| Acciones | Métodos | prestarLibro() |
| Verbos entre conceptos | Relaciones | Un lector tiene préstamos |
| Restricciones | Cardinalidades | Máximo 3 libros |

---

# Ejemplo

Enunciado:

> Una biblioteca tiene copias de libros.  
> Los lectores pueden tener un máximo de 3 libros en préstamo.

Conceptos candidatos:

- Biblioteca
- Copia
- Libro
- Lector
- Préstamo

---

# 2. Detectar clases candidatas

Una clase debe representar algo que tenga:

1. Identidad propia
2. Datos propios
3. Comportamiento propio
4. Relación con otros objetos

---

# Pregunta clave

> ¿Este concepto merece existir como objeto independiente?

---

# Ejemplo de análisis

| Concepto | ¿Clase? | Justificación |
|---|---|---|
| Libro | Sí | Tiene datos y comportamiento propios |
| Autor | Sí | Puede asociarse a varios libros |
| Nombre | No | Es un atributo |
| EstadoCopia | Mejor enum | Valores cerrados |
| Préstamo | Sí | Une lector y copia |

---

# 3. Separar clases, atributos y enums

No todo debe convertirse en clase.

---

# Regla práctica

| Si el concepto… | Entonces probablemente es… |
|---|---|
| Tiene datos y vida propia | Clase |
| Es una característica simple | Atributo |
| Tiene valores fijos | Enum |
| Representa una acción | Método |
| Une dos clases con información propia | Clase intermedia |

---

# Ejemplo de enum

```plantuml
enum EstadoCopia {
  EN_BIBLIOTECA
  PRESTADA
  CON_RETRASO
  EN_REPARACION
}
```

`EstadoCopia` no necesita ser una clase.

---

# 4. Definir atributos

Los atributos son los datos que necesita recordar cada objeto.

Pregunta clave:

> ¿Qué información necesita guardar este objeto para cumplir su responsabilidad?

---

# Ejemplo

```plantuml
class Libro {
  - titulo: String
  - tipo: TipoLibro
  - editorial: String
  - anio: int
}
```

---

# Error típico

Mal:

```plantuml
class Libro {
  - autor: String
}
```

---

# Mejor diseño

```plantuml
class Libro {
  - titulo: String
}

class Autor {
  - nombre: String
  - nacionalidad: String
  - fechaNacimiento: Date
}

Libro "*" --> "1" Autor
```

Porque `Autor` tiene entidad propia.

---

# 5. Determinar responsabilidades

Una responsabilidad es:

> Algo que una clase debe saber o debe hacer.

---

# Tipos de responsabilidad

| Tipo | Pregunta |
|---|---|
| Información | ¿Qué datos controla esta clase? |
| Comportamiento | ¿Qué operaciones debe realizar? |

---

# Regla fundamental

> Una clase debe encargarse de aquello que afecta directamente a sus propios datos.

---

# Ejemplo: préstamo de biblioteca

Tenemos:

- Lector
- Copia
- Préstamo
- Biblioteca

¿Quién debería realizar `prestarCopia()`?

---

# Solución razonable

```plantuml
class Biblioteca {
  + prestarCopia(lector: Lector, copia: Copia): Prestamo
}
```

Porque coordina varias reglas:

- comprobar disponibilidad
- comprobar límite de préstamos
- crear préstamo
- actualizar estado

---

# Tabla para asignar responsabilidades

| Pregunta | Acción recomendada | Ejemplo |
|---|---|---|
| ¿Modifica sus propios datos? | Método en esa clase | `Copia.marcarComoPrestada()` |
| ¿Consulta datos propios? | Método en esa clase | `Lector.puedePedirPrestamo()` |
| ¿Coordina varias clases? | Clase controladora | `Biblioteca.prestarCopia()` |
| ¿Crea relaciones? | Clase gestora | `Biblioteca.crearPrestamo()` |
| ¿Es una regla general? | Clase del contexto | `Biblioteca.aplicarMulta()` |

---

# 6. Detectar métodos

Los métodos representan acciones relevantes del sistema.

En UML de análisis normalmente interesan:

- Métodos de negocio
- No tanto getters/setters

---

# Ejemplo de métodos

```plantuml
class Lector {
  - nombre: String
  - multaHasta: Date
  + puedePedirPrestamo(): boolean
}

class Copia {
  - estado: EstadoCopia
  + estaDisponible(): boolean
  + marcarComoPrestada(): void
}

class Biblioteca {
  + prestarCopia(): Prestamo
  + devolverCopia(): void
}
```

---

# 7. Detectar relaciones

Una relación aparece cuando una clase:

- conoce a otra
- usa a otra
- depende de otra
- contiene a otra

---

# Tipos principales de relaciones

| Relación | Significado | Ejemplo |
|---|---|---|
| Asociación | Relación general | Lector tiene préstamos |
| Agregación | Todo-parte débil | Biblioteca tiene libros |
| Composición | Todo-parte fuerte | Pedido tiene líneas |
| Herencia | Especialización | Directivo es Empleado |
| Implementación | Cumple interfaz | PDFExporter implementa Exportable |
| Dependencia | Uso temporal | Biblioteca usa EmailSender |

---

# 8. Asociación

La relación más común.

```plantuml
Lector "1" --> "0..*" Prestamo
Prestamo "*" --> "1" Copia
```

Lectura:

- Un lector puede tener muchos préstamos
- Cada préstamo pertenece a un lector
- Cada préstamo corresponde a una copia

---

# 9. Cardinalidad

La cardinalidad indica cuántos objetos participan en una relación.

---

# Cardinalidades habituales

| Cardinalidad | Significado |
|---|---|
| 1 | Exactamente uno |
| 0..1 | Ninguno o uno |
| * | Muchos |
| 0..* | Cero o muchos |
| 1..* | Uno o muchos |
| 0..3 | Entre cero y tres |

---

# Ejemplo

```plantuml
Lector "1" --> "0..3" Prestamo
```

Representa:

> Un lector puede tener como máximo 3 préstamos activos.

---

# 10. Navegabilidad

La navegabilidad indica:

> Qué clase necesita conocer a otra.

---

# Ejemplo

```plantuml
Lector --> Prestamo
Prestamo --> Copia
```

Interpretación:

- Lector conoce sus préstamos
- Préstamo conoce la copia prestada

---

# Regla práctica

Pon navegabilidad cuando una clase necesite usar a otra para trabajar.

| Situación | Navegabilidad |
|---|---|
| Lector necesita consultar préstamos | `Lector --> Prestamo` |
| Préstamo necesita saber la copia | `Prestamo --> Copia` |
| Copia no necesita historial | No hace falta |

---

# 11. Agregación

Representada con rombo blanco.

```plantuml
Biblioteca o-- "*" Libro
```

Significa:

> Relación todo-parte débil.

Los libros pueden existir aunque desaparezca la biblioteca.

---

# 12. Composición

Representada con rombo negro.

```plantuml
Pedido *-- "1..*" LineaPedido
```

Significa:

> La parte depende completamente del todo.

Si se elimina el pedido, desaparecen sus líneas.

---

# 13. Herencia

Se utiliza cuando una clase:

> Es un tipo especializado de otra.

---

# Ejemplo

```plantuml
Persona <|-- Empleado
Persona <|-- Cliente
```

Interpretación:

- Empleado es una Persona
- Cliente es una Persona

---

# Regla importante

No uses herencia solo porque dos clases compartan atributos.

Úsala cuando exista claramente una relación:

> “ES UN/A”

---

# 14. Interfaces

Una interfaz define comportamientos obligatorios.

```plantuml
interface Mostrable {
  + mostrarDatos(): void
}

Empleado ..|> Mostrable
Cliente ..|> Mostrable
```

---

# 15. Dependencia

Una dependencia es una relación débil y temporal.

```plantuml
Biblioteca ..> NotificadorEmail
```

Significa:

> Biblioteca usa NotificadorEmail en algún método.

---

# Ejemplo en código

```java
public void avisarRetraso(NotificadorEmail notificador) {
    notificador.enviarAviso(...);
}
```

---

# 16. Algoritmo completo de diseño

| Paso | Qué hacer |
|---|---|
| 1 | Leer el enunciado |
| 2 | Detectar entidades |
| 3 | Filtrar clases reales |
| 4 | Detectar atributos |
| 5 | Detectar enums |
| 6 | Detectar relaciones |
| 7 | Añadir cardinalidades |
| 8 | Añadir navegabilidad |
| 9 | Elegir tipo de relación |
| 10 | Asignar responsabilidades |
| 11 | Añadir métodos |
| 12 | Revisar diseño |

---

# 17. Tipos de clases en orientación a objetos

En diseño orientado a objetos no todas las clases tienen el mismo papel.

Las más habituales son:

- Entidades
- Gestoras
- Controladoras
- Contexto

---

# Visión general

| Tipo de clase | Función principal | Ejemplo |
|---|---|---|
| Entidad | Representa una cosa del dominio | Libro |
| Gestora | Organiza entidades | Carrito |
| Controladora | Coordina procesos | SistemaCompra |
| Contexto | Define reglas globales | Biblioteca |

---

# Entidad

Representa:

> Una cosa del mundo real.

Tiene:

- identidad propia
- datos propios
- comportamiento propio

---

# Cómo reconocer una entidad

Pregunta:

> ¿Esto existe como objeto individual del dominio?

Ejemplos:

```plantuml
class Libro
class Usuario
class Producto
```

---

# Clase gestora

Una clase gestora:

> Administra o agrupa entidades.

Suele encargarse de:

- almacenar colecciones
- buscar elementos
- añadir/eliminar
- mantener relaciones

---

# Cómo reconocer una clase gestora

Pregunta:

> ¿Esta clase existe para organizar otras clases?

---

# Ejemplo de clase gestora

```plantuml
class Carrito {
  - items: List<ItemCarrito>
  + agregarProducto()
  + eliminarProducto()
  + calcularTotal()
}
```

---

# Clase controladora

Una clase controladora:

> Coordina procesos o casos de uso.

No representa tanto una entidad real.

Representa:

- lógica de aplicación
- coordinación
- flujos

---

# Cómo reconocer una controladora

Pregunta:

> ¿Esta operación requiere coordinar varias clases?

---

# Ejemplo de controladora

```plantuml
class SistemaPrestamos {
  + prestarLibro()
  + devolverLibro()
}
```

---

# Clase de contexto

La clase de contexto representa:

> El entorno global donde ocurren las reglas del sistema.

Suele contener:

- configuración
- políticas
- normas generales

---

# Cómo reconocer una clase de contexto

Pregunta:

> ¿Las reglas existen porque estamos dentro de ESTE sistema?

---

# Ejemplo de contexto

```plantuml
class Biblioteca {
  - maxPrestamos: int
  - diasPrestamo: int
}
```

---

# Diferencia entre gestora y contexto

Una misma clase puede actuar como:

- gestora
- contexto

Ejemplo:

```plantuml
class Biblioteca
```

Porque:

- organiza libros y préstamos
- define reglas globales

---

# Regla rápida

| Si la clase... | Entonces es... |
|---|---|
| Representa una cosa | Entidad |
| Organiza colecciones | Gestora |
| Coordina procesos | Controladora |
| Define reglas globales | Contexto |

---

# Relación entre tipos de clases y relaciones UML

El tipo de relación UML suele reflejar:

> El tipo de responsabilidad de la clase.

---

# Visión general

| Tipo de clase | Relaciones más habituales |
|---|---|
| Entidad | Asociación |
| Gestora | Agregación / composición |
| Controladora | Dependencia |
| Contexto | Asociación global / agregación |

---

# Entidades y asociaciones

Las entidades normalmente:

- colaboran
- se conocen
- se referencian

Por eso suelen usar asociaciones.

---

# Ejemplo

```plantuml
Cliente --> Pedido
Pedido --> Producto
```

---

# Gestoras y composición/agregación

Las clases gestoras suelen:

- contener objetos
- administrar colecciones
- controlar agrupaciones

Por eso aparecen:

- agregaciones
- composiciones

---

# Ejemplo de composición

```plantuml
Pedido *-- LineaPedido
```

El pedido controla:

- creación
- destrucción
- ciclo de vida

---

# Ejemplo de agregación

```plantuml
Biblioteca o-- Libro
```

El libro puede existir aunque desaparezca la biblioteca.

---

# Controladoras y dependencia

Las controladoras normalmente:

- usan objetos temporalmente
- coordinan procesos
- no poseen entidades

Por eso suelen aparecer dependencias.

---

# Ejemplo

```plantuml
SistemaCompra ..> Pago
SistemaCompra ..> Pedido
SistemaCompra ..> Stock
```

---

# Ejemplo en código

```java
public class SistemaCompra {

    public void comprar(Carrito carrito, Pago pago) {
        ...
    }
}
```

---

# Contexto y asociaciones globales

Las clases contexto suelen representar:

- el sistema completo
- las normas generales
- el entorno global

---

# Ejemplo

```plantuml
Biblioteca o-- Copia
Biblioteca --> Prestamo
Biblioteca --> Lector
```

---

# Relación entre responsabilidad y relación UML

| Relación | Lo que suele significar |
|---|---|
| Asociación | Conozco |
| Dependencia | Uso |
| Agregación | Contengo |
| Composición | Poseo/control de vida |
| Herencia | Soy un tipo de |

---

# Regla MUY importante

No elijas primero la relación UML.

Haz esto:

1. Decide la responsabilidad
2. Decide quién controla a quién
3. Decide quién necesita conocer a quién
4. La relación UML aparece casi sola

---

# Ejemplo final

Pregunta:

> ¿Quién crea y destruye LineaPedido?

Respuesta:

> Pedido.

Entonces:

```plantuml
Pedido *-- LineaPedido
```

Composición.

---

# Otro ejemplo

Pregunta:

> ¿Quién usa Pago temporalmente?

Respuesta:

> SistemaCompra.

Entonces:

```plantuml
SistemaCompra ..> Pago
```

Dependencia.

---

# Último ejemplo

Pregunta:

> ¿Cliente y Pedido colaboran?

Respuesta:

> Sí.

Entonces:

```plantuml
Cliente --> Pedido
```

Asociación.

---

# 17. Reglas rápidas para responsabilidades

| Regla | Explicación |
|---|---|
| Una clase controla sus datos | `Copia` cambia su estado |
| Una clase no hace trabajo ajeno | `Lector` no cambia copias |
| Varias clases implicadas | Necesita coordinación |
| Las reglas deben estar cerca de los datos | `Lector.puedePedirPrestamo()` |
| Evitar clases Dios | No centralizar toda la lógica |

---

# 18. Ejemplo completo

```plantuml
@startuml

class Biblioteca {
  + prestarCopia(): Prestamo
  + devolverCopia(): void
}

class Libro {
  - titulo: String
}

class Autor {
  - nombre: String
}

class Copia {
  - estado: EstadoCopia
}

class Lector {
  - nombre: String
}

class Prestamo {
  - fechaPrestamo: Date
}

Biblioteca o-- "*" Copia
Libro "1" <-- "*" Copia
Libro "*" --> "1..*" Autor
Lector "1" --> "0..3" Prestamo
Prestamo "*" --> "1" Copia

@enduml
```

---

# 19. Cómo comprobar si el diagrama está bien

Haz una prueba mental.

Ejemplo:

> María quiere pedir prestada una copia.

Preguntas:

- ¿Puedo representar al lector?
- ¿Puedo representar la copia?
- ¿Puedo comprobar disponibilidad?
- ¿Puedo crear el préstamo?
- ¿Puedo devolverlo?
- ¿Puedo calcular retraso?

---

# Si todas las respuestas son sí…

Entonces:

- El modelo probablemente representa bien el dominio
- Las responsabilidades están razonablemente repartidas
- Las relaciones tienen sentido

---

# 20. Resumen final

Para diseñar un diagrama de clases:

1. Detecta clases
2. Define atributos
3. Define métodos
4. Detecta relaciones
5. Añade cardinalidades
6. Añade navegabilidad
7. Asigna responsabilidades correctamente

---

# Pregunta más importante durante el diseño

> ¿Quién tiene la información necesaria para hacer esto de forma natural?

Esa suele ser la clase correcta para asumir la responsabilidad.

