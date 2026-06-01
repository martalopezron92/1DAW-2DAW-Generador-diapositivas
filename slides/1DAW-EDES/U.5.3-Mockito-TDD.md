---
marp: true
theme: default
paginate: true
backgroundColor: '#0f1117'
color: '#e8e6df'
style: |
  section {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    padding: 48px 64px;
    background-color: #0f1117;
    color: #e8e6df;
  }
  h1 { color: #f97583; font-size: 2em; border-bottom: 2px solid #f97583; padding-bottom: 12px; margin-bottom: 24px; }
  h2 { color: #f97583; font-size: 1.4em; margin-bottom: 16px; }
  h3 { color: #ffb3ba; font-size: 1.1em; margin-bottom: 10px; }
  code { background: #1e2330; color: #f0c040; padding: 2px 8px; border-radius: 4px; font-size: 0.9em; }
  pre { background: #1e2330; border-left: 4px solid #f97583; padding: 20px; border-radius: 4px; font-size: 0.79em; overflow: auto; }
  pre code { background: transparent; padding: 0; color: #e8e6df; }
  ul { margin-left: 1.2em; }
  li { margin-bottom: 10px; line-height: 1.6; }
  .tag { background: #f97583; color: #0f1117; padding: 4px 14px; border-radius: 20px; font-size: 0.75em; font-weight: bold; display: inline-block; margin-bottom: 18px; }
  .highlight { background: #1e2330; border-left: 4px solid #f0c040; padding: 14px 20px; border-radius: 0 6px 6px 0; margin: 16px 0; font-size: 0.9em; }
  .muted { color: #888; font-size: 0.85em; }
  section.portada { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
  section.portada h1 { font-size: 2.6em; border: none; margin-bottom: 8px; }
  section.portada p { color: #888; font-size: 0.9em; margin: 4px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 0.82em; }
  th { background: #1e2330; color: #f97583; padding: 10px 14px; text-align: left; border: 1px solid #2a2f40; }
  td { padding: 10px 14px; border: 1px solid #2a2f40; }
  tr:nth-child(even) { background: #161a24; }
---

<!--
NOTA GENERAL — SESIÓN 3
========================
Esta sesión tiene dos partes:
1. Teoría de mocks (primeros 20 min): qué son y cómo se usan con Mockito.
2. Práctica TDD con el ejercicio de la ferretería (últimos 25 min).

El concepto de mock es el más difícil del tema. La clave está en la
motivación: antes de mostrar la solución, asegúrate de que entienden
el PROBLEMA (dependencias externas que hacen los tests lentos, impredecibles
o con efectos secundarios reales).

Concepto previo que puede ser nuevo: INYECCIÓN DE DEPENDENCIAS.
Si una clase necesita otra clase para funcionar (EmailSender, BancoDB...),
en lugar de crearla dentro con "new", la recibe desde fuera (por el constructor).
Esto permite que en los tests le pasemos un mock en lugar del objeto real.
Sin inyección de dependencias, no se pueden hacer mocks.

Tiempos orientativos:
- El problema de las dependencias: 5 min
- La solución: qué es un mock: 5 min
- Añadir Mockito: 5 min
- Uso básico de Mockito: 5 min
- when().thenReturn(): 5 min
- Anotaciones @Mock/@InjectMocks: 5 min
- TDD paso 1 RED: 5 min
- TDD paso 2 GREEN: 5 min
- TDD paso 3 REFACTOR: 3 min
- Dominio del ejercicio + tabla: 5 min
- verify(): 3 min
- Práctica: 25 min
TOTAL: ~71 min — si el tiempo aprieta, reduce la explicación de verify()
-->

<!-- _class: portada -->

# Mockito y TDD

<div class="tag">SESIÓN 3 DE 4</div>

**EDES · 1ºDAW**
Mocks · Dependencias · Desarrollo guiado por pruebas
*~55 minutos*

---

<!--
NOTA DE PRESENTADOR
-------------------
Esta diapositiva plantea el PROBLEMA que los mocks resuelven.
Es importante dedicarle tiempo para que los alumnos entiendan
por qué hacemos algo tan aparentemente complicado.

Analogía que funciona bien:
"Imagina que quieres testear que una receta de cocina es correcta.
Para comprobarlo, ¿tienes que ir al supermercado a comprar los ingredientes,
cocinarlos de verdad y comerlos? Eso sería como testear con dependencias reales.
Con un mock, sustituyes los ingredientes reales por representaciones ('esta caja
vacía representa la harina') y compruebas solo que la receta dice los pasos
correctos, sin cocinar nada de verdad."

En el código:
- La clase ServicioNotificaciones NECESITA un EmailSender para funcionar.
- Pero si en los tests usamos el EmailSender real, enviaríamos emails de verdad
  cada vez que ejecutamos los tests. Y si no hay internet, los tests fallan
  aunque el código sea correcto.
- La solución: dar a ServicioNotificaciones un EmailSender FALSO (mock)
  que simula el comportamiento sin hacer nada real.

Concepto de inyección de dependencias (CLAVE para los mocks):
Fíjate que el constructor recibe emailSender como parámetro:
new ServicioNotificaciones(emailSender)
Esto se llama "inyección por constructor". Permite pasar el mock en los tests
y el objeto real en producción. Sin este patrón, no podríamos hacer mocks.
-->

# El problema: dependencias externas

Cuando una clase necesita una base de datos, una API o un servicio externo... ¿cómo la testeamos sin conectarnos de verdad?

```java
public class ServicioNotificaciones {

    private EmailSender emailSender; // ← dependencia externa

    // Recibe el emailSender desde fuera (inyección por constructor)
    public ServicioNotificaciones(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void notificarUsuario(String email, String msg) {
        emailSender.enviar(email, msg); // ← ¿cómo testeamos esto?
    }
}
```

**Problema:** tests lentos, dependientes de internet, con efectos secundarios reales.

---

<!--
NOTA DE PRESENTADOR
-------------------
Esta diapositiva explica la solución: el mock.

Un mock es un objeto que:
1. Implementa la misma interfaz que el objeto real (tiene los mismos métodos).
2. No hace nada real cuando se le llama (por defecto devuelve valores vacíos/nulos).
3. Registra todas las llamadas que recibe, para que podamos verificarlas después.

El diagrama muestra que el mock sustituye al EmailSender real.
ServicioNotificaciones no sabe si está hablando con el real o con el mock:
solo sabe que tiene un objeto con un método enviar().

Preguntas frecuentes:
"¿EmailSender tiene que ser una interfaz?"
Técnicamente Mockito puede mockear clases normales también, pero
es buena práctica usar interfaces para las dependencias. Por ahora,
los alumnos pueden tratarlo como si fuera una interfaz.

"¿Cómo sabe Mockito qué métodos tiene EmailSender?"
Mockito usa reflexión de Java para inspeccionar la clase/interfaz
en tiempo de ejecución y crear un objeto que tenga los mismos métodos.
Es magia de Java internamente; no hace falta entenderlo para usarlo.
-->

# La solución: Mocks

Un **mock** es un objeto falso que sustituye a una dependencia real durante el test.

```
Test          ServicioNotificaciones    EmailSender (REAL)
  │                    │                      │
  │  crea mock         │                      │
  │  (EmailSenderFalso)│                      │
  │                    │──── enviar() ──▶ MOCK │  ← NO llama al real
  │                    │◀── "ok" ─────────────│
  │  verifica          │                      │
  │  que se llamó ────▶│                      │
```

Con un mock podemos:
- Controlar qué devuelve la dependencia
- Verificar que se llamó correctamente
- Ejecutar el test sin internet, BD ni servicios externos

---

<!--
NOTA DE PRESENTADOR
-------------------
Si los alumnos añadieron Mockito al final de la sesión 2, esta
diapositiva es solo una confirmación. Si no lo hicieron, deja
5 minutos para que lo añadan ahora.

Por qué "mockito-junit-jupiter" y no solo "mockito-core":
- mockito-core: la librería base de Mockito.
- mockito-junit-jupiter: incluye mockito-core PLUS una extensión
  que integra Mockito con JUnit 5, necesaria para que las anotaciones
  @Mock e @InjectMocks funcionen automáticamente.
  Si solo añaden mockito-core, las anotaciones no funcionan y hay que
  crear los mocks manualmente con mock() en cada test.

El scope "test" (en Maven) o "testImplementation" (en Gradle) significa
que esta librería solo existe en los tests, no en el programa final.
-->

# Añadir Mockito al proyecto

**Maven (`pom.xml`)** — dentro de `<dependencies>`:

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.11.0</version>
    <scope>test</scope>
</dependency>
```

**Gradle (`build.gradle`)** — dentro de `dependencies`:

```groovy
testImplementation 'org.mockito:mockito-junit-jupiter:5.11.0'
```

<div class="highlight">
💡 Después de añadirlo, haz clic en el icono de recargar 🔄 de IntelliJ.
</div>

---

<!--
NOTA DE PRESENTADOR
-------------------
Este es el patrón básico de Mockito sin anotaciones.
Vale la pena escribirlo en vivo.

Explicación línea a línea:
1. mock(EmailSender.class) → Mockito crea un objeto falso que tiene
   todos los métodos de EmailSender pero no hace nada con ellos.

2. new ServicioNotificaciones(mockSender) → le pasamos el mock al constructor.
   ServicioNotificaciones no sabe que es un mock; solo ve un EmailSender.

3. servicio.notificarUsuario(...) → ejecuta el código real de la clase,
   que internamente llama a mockSender.enviar(...).

4. verify(mockSender).enviar("ana@mail.com", "Hola Ana") → pregunta al mock:
   "¿Te llamaron con exactamente estos argumentos?". Si sí, el test pasa.
   Si no (por ejemplo, si el email tenía un error tipográfico), el test falla.

La diferencia con assertEquals: assertEquals comprueba un valor devuelto;
verify comprueba que se produjo una llamada a un método.
-->

# Mockito — uso básico

```java
import static org.mockito.Mockito.*;

@Test
void notificar_llamaAlEnviadorConLosDatosCorrectos() {
    // Arrange — creamos el mock manualmente
    EmailSender mockSender = mock(EmailSender.class);
    ServicioNotificaciones servicio =
        new ServicioNotificaciones(mockSender);

    // Act
    servicio.notificarUsuario("ana@mail.com", "Hola Ana");

    // Assert — verificamos que el mock recibió la llamada esperada
    verify(mockSender).enviar("ana@mail.com", "Hola Ana");
}
```

---

<!--
NOTA DE PRESENTADOR
-------------------
when().thenReturn() sirve para programar el comportamiento del mock:
"cuando alguien llame a este método con estos argumentos, devuelve esto".

Por defecto, un mock de Mockito devuelve:
- 0 para números
- false para booleanos
- null para objetos
- listas vacías para colecciones

Si el código bajo prueba toma decisiones basadas en lo que devuelve
la dependencia (como en este ejemplo: consultar el saldo y hacer algo
con él), necesitamos programar el mock para que devuelva un valor concreto.

En el ejemplo:
- when(mockBanco.getSaldo("ES001")).thenReturn(1500.0) significa:
  "cuando alguien llame a mockBanco.getSaldo con el argumento 'ES001',
  devuelve 1500.0".
- Si se llama con otro argumento (p.ej. "ES002"), devuelve 0.0 por defecto.

La línea de verify al final comprueba que el código sí consultó el banco,
no que devolvió el valor de memoria o de otro sitio.
-->

# `when().thenReturn()` — programar el comportamiento

```java
@Test
void obtenerSaldo_devuelveElValorDelBanco() {
    // Arrange
    BancoService mockBanco = mock(BancoService.class);

    // Programamos: "cuando llamen a getSaldo("ES001"), devuelve 1500.0"
    when(mockBanco.getSaldo("ES001")).thenReturn(1500.0);

    CuentaUsuario cuenta = new CuentaUsuario(mockBanco);

    // Act
    double saldo = cuenta.consultarSaldo("ES001");

    // Assert
    assertEquals(1500.0, saldo);
    verify(mockBanco).getSaldo("ES001"); // también se llamó al banco
}
```

---

<!--
NOTA DE PRESENTADOR
-------------------
Las anotaciones @Mock e @InjectMocks son un atajo para no tener que
escribir mock() y new ClaseConDependencias(mockX) en cada test.

@ExtendWith(MockitoExtension.class) es OBLIGATORIO para que las anotaciones
funcionen. Sin esta línea, los campos con @Mock y @InjectMocks se quedan
a null y el test falla con NullPointerException.

@Mock: Mockito crea el mock automáticamente antes de cada test.
Es equivalente a escribir: EmailSender emailSender = mock(EmailSender.class);
en el @BeforeEach.

@InjectMocks: Mockito crea la clase indicada E inyecta automáticamente
los mocks que encuentra en los campos @Mock. En este ejemplo, Mockito crea
new ServicioNotificaciones(emailSender) automáticamente.
Para que esto funcione, la clase debe tener un constructor que acepte
el EmailSender, o un campo emailSender con setter.

Recomendación para clase: primero usa el estilo manual (mock() explícito),
y cuando funcione bien, muestra las anotaciones como forma más limpia.
-->

# Anotaciones de Mockito con JUnit 5

```java
@ExtendWith(MockitoExtension.class)   // ← OBLIGATORIO para las anotaciones
class ServicioNotificacionesTest {

    @Mock
    EmailSender emailSender;           // ← Mockito crea el mock solo

    @InjectMocks
    ServicioNotificaciones servicio;   // ← Mockito inyecta emailSender aquí

    @Test
    void notificar_invocaElEnviador() {
        // Ya no hace falta Arrange para crear los objetos
        servicio.notificarUsuario("b@b.com", "Test");
        verify(emailSender).enviar("b@b.com", "Test");
    }
}
```

---

<!--
NOTA DE PRESENTADOR
-------------------
Aquí empieza la demostración de TDD en 3 pasos.
Este paso (RED) es el más difícil de aceptar para los alumnos.

Puntos importantes:
1. La clase ClienteParticular NO existe todavía cuando escribimos el test.
   IntelliJ lo marcará con rojo (error de compilación). Eso es CORRECTO.
2. Podemos hacer que IntelliJ cree la clase automáticamente:
   Alt+Enter sobre ClienteParticular → "Create class".
   Pero el método puedePedirFiado() tampoco existirá todavía.
3. Una vez que exista la clase (vacía, sin el método), el test compila
   pero falla al ejecutar porque el método no existe.
4. Eso es exactamente lo que queremos: un test que falla porque
   la funcionalidad no está implementada.

Si algún alumno dice "esto es perder el tiempo, ¿por qué no escribo
directamente el código?": la respuesta es que al escribir el test primero,
estás definiendo exactamente qué tiene que hacer el método (qué recibe,
qué devuelve, cómo se llama). Eso evita escribir código que nadie necesita.
-->

# TDD en acción — Paso 1: RED 🔴

Escribimos el test **antes** de que exista `ClienteParticular`:

```java
@Test
void puedePedirFiado_clienteParticular_sinDeuda_devuelveTrue() {
    // Arrange — la clase aún no existe, IntelliJ lo marca en rojo
    ClienteParticular cliente = new ClienteParticular(0.0);

    // Act
    boolean resultado = cliente.puedePedirFiado();

    // Assert
    assertTrue(resultado);
}
```

El test **no compila** porque `ClienteParticular` no existe. ✅ Eso es correcto.
Ahora creamos la clase con lo mínimo para que compile y ejecutamos: **FALLA** en rojo.

---

<!--
NOTA DE PRESENTADOR
-------------------
Este es el paso GREEN: escribir el código mínimo para que el test pase.

"Código mínimo" significa EXACTAMENTE eso. No hay que anticipar casos futuros,
no hay que añadir lógica extra, no hay que hacer el método "robusto".
Solo lo suficiente para que el test que escribimos pase.

En este caso: el test llama a puedePedirFiado() con deuda=0 y espera true.
El código mínimo es: return deuda == 0;
Podríamos haber escrito simplemente: return true;
Y el test también pasaría. Pero eso no tendría sentido semánticamente.

¿Por qué no escribir directamente la lógica completa?
Porque cuando haya más tests (deuda > 0, constructoras con muchos albañiles...),
la lógica se irá añadiendo poco a poco, siempre guiada por un test que falla.
Así nunca escribimos código que no está justificado por un test.

Nota técnica: el constructor recibe deuda como double porque la deuda
puede tener céntimos (4999.99 €, por ejemplo). Si fuera int, perdería precisión.
-->

# TDD en acción — Paso 2: GREEN 🟢

Escribimos el **código mínimo** para que el test pase:

```java
public class ClienteParticular {

    private double deuda;

    public ClienteParticular(double deuda) {
        this.deuda = deuda;
    }

    public boolean puedePedirFiado() {
        // Código mínimo: solo lo que el test actual necesita
        return deuda == 0;
    }
}
```

Ejecutamos: el test pasa en **verde**. ✅
**No escribimos nada más de lo necesario.**

---

<!--
NOTA DE PRESENTADOR
-------------------
El paso REFACTOR es el que más se olvida. Los alumnos tienden a
pasar directamente al siguiente test sin revisar el código.

Refactorizar significa mejorar la ESTRUCTURA del código sin cambiar
lo que hace. El comportamiento externo queda igual; solo cambia
cómo está escrito internamente.

Formas de refactorizar:
- Extraer un método con nombre más expresivo (como en el ejemplo)
- Renombrar variables para que sean más claras
- Eliminar duplicación
- Simplificar condicionales

La REGLA es: los tests deben seguir pasando después del refactor.
Si algún test falla, has cambiado el comportamiento (no solo la estructura).

En el ejemplo: noTieneDeuda() no añade funcionalidad, pero hace que
puedePedirFiado() sea más fácil de leer. Un año después, cualquiera
entiende qué hace sin necesidad de comentarios.

Para la práctica: el refactor es opcional si el tiempo aprieta.
Lo importante es RED → GREEN. El REFACTOR es el hábito a largo plazo.
-->

# TDD en acción — Paso 3: REFACTOR 🔵

Revisamos el código. ¿Hay algo que mejorar sin cambiar el comportamiento?

```java
// Antes — correcto pero poco expresivo
public boolean puedePedirFiado() {
    return deuda == 0;
}

// Después — más legible, misma lógica
public boolean puedePedirFiado() {
    return noTieneDeuda();
}

private boolean noTieneDeuda() {
    return deuda == 0.0;
}
```

El test sigue pasando ✅. El código está más claro. **Ciclo completado.**
Ahora volvemos al paso RED con el siguiente caso.

---

<!--
NOTA DE PRESENTADOR
-------------------
Este es el dominio del ejercicio práctico. Lee las reglas con los alumnos
y asegúrate de que las entienden antes de que empiecen a programar.

Aclaración sobre el diseño:
- ClienteParticular y Constructora son dos clases distintas.
- Ambas tienen un método puedePedirFiado() pero con lógica diferente.
- Esto es polimorfismo (concepto de POO que ya conocen de Programación).
- Para los tests: se crea una instancia de cada clase y se prueba por separado.

Si preguntan cómo modelar "número de albañiles":
- El constructor de Constructora recibe (deuda, numAlbaniles).
- O puede ser (deuda) y luego un setter setNumAlbaniles().
- Cualquiera de las dos formas es válida para el ejercicio.

La tabla de la siguiente diapositiva muestra los 6 casos de prueba.
Pide a los alumnos que identifiquen las clases de equivalencia antes
de ver la tabla, como repaso de la sesión 1.
-->

# El ejercicio del fiado — dominio

<div class="highlight">
Una ferretería decide si puede fiar a un cliente según estas reglas:

<ul>
<li><strong>Cliente particular</strong>: solo si su deuda es 0 €.</li>
<li><strong>Constructora con 5 o más albañiles</strong>: puede deber hasta 10.000 €.</li>
<li><strong>Constructora con menos de 5 albañiles</strong>: puede deber hasta 5.000 €.</li>
</ul>
</div>

Hay dos clases: `ClienteParticular` y `Constructora`.
Cada una tiene su propio método `puedePedirFiado()`.

---

<!--
NOTA DE PRESENTADOR
-------------------
Esta tabla recoge los 6 tests que deben escribir los alumnos.
Son las 6 clases de equivalencia del dominio.

Para ClienteParticular:
- Clase válida: deuda = 0 → true
- Clase inválida: deuda > 0 (cualquier valor positivo) → false

Para Constructora con muchos albañiles (>= 5):
- Clase válida: deuda <= 10000 → true
- Clase inválida: deuda > 10000 → false

Para Constructora con pocos albañiles (< 5):
- Clase válida: deuda <= 5000 → true
- Clase inválida: deuda > 5000 → false

Los valores exactos de la tabla son representantes de cada clase,
no los únicos valores posibles. deuda=8000 representa "dentro del límite
para empresa grande"; deuda=12000 representa "fuera del límite".

Nota: los casos límite exactos (deuda=10000 exactamente, deuda=5000 exactamente)
también serían interesantes de probar. Si algún alumno los añade, es correcto.
-->

# Clases de equivalencia del ejercicio

| Escenario | deuda | albañiles | Esperado |
|---|---|---|---|
| Particular sin deuda | 0 € | — | `true` |
| Particular con deuda | 100 € | — | `false` |
| Constructora grande, bajo límite | 8.000 € | 5 | `true` |
| Constructora grande, sobre límite | 12.000 € | 5 | `false` |
| Constructora pequeña, bajo límite | 4.000 € | 4 | `true` |
| Constructora pequeña, sobre límite | 6.000 € | 4 | `false` |

**6 tests en total** — uno por clase de equivalencia.

---

<!--
NOTA DE PRESENTADOR
-------------------
verify() permite comprobar no solo qué devuelve un método, sino
que se invocó de la forma correcta.

Cuándo usar verify() vs assertEquals():
- assertEquals() → comprueba el valor de retorno de la acción
- verify() → comprueba que se realizó una llamada concreta a un mock

Explicación de los modificadores:
- verify(mock).metodo() → se llamó exactamente 1 vez (por defecto)
- verify(mock, times(3)) → se llamó exactamente 3 veces
- verify(mock, never()) → NUNCA se llamó. Útil para comprobar que
  no se envió un email cuando no debía, por ejemplo.
- anyString() es un "matcher": acepta cualquier String como argumento.
  Útil cuando no te importa el valor exacto, solo que se llamó.
  contains("Hola") acepta cualquier String que contenga "Hola".

Para el ejercicio de la ferretería no necesitan verify() porque
ClienteParticular y Constructora no tienen dependencias externas.
verify() es más relevante cuando hay mocks de por medio.
-->

# `verify()` — verificar que se llamó el método

```java
// Verificar que se llamó exactamente una vez
verify(mockSender).enviar("a@a.com", "Hola");

// Verificar que se llamó exactamente N veces
verify(mockSender, times(3)).enviar(any(), any());

// Verificar que NUNCA se llamó (útil para comprobar que NO pasó algo)
verify(mockSender, never()).enviar(any(), any());

// Verificar con argumentos flexibles
verify(mockSender).enviar(anyString(), contains("Hola"));
```

---

<!--
NOTA DE PRESENTADOR
-------------------
Esta es la práctica principal de la sesión. 25 minutos para que
los alumnos implementen el sistema de fiado usando TDD.

Instrucciones para los alumnos:
1. Empezar por ClienteParticular (los 2 tests más simples).
2. Seguir el ciclo RED → GREEN → REFACTOR para cada test.
3. Una vez que ClienteParticular funciona, pasar a Constructora.

Errores frecuentes que verás mientras circulas:
1. Escriben todo el código antes de los tests (no están haciendo TDD).
   Pídeles que borren el código y empiecen por el test.
2. Escriben todos los tests de golpe antes de pasar al código.
   En TDD se escribe UN test → código → siguiente test.
3. El test de "constructora grande, bajo límite" con deuda=8000 pasa,
   pero el de deuda=12000 también pasa si pusieron "return true" como
   código mínimo. El segundo test les forzará a añadir la condición real.

Si algún grupo termina pronto, propón que añadan un caso límite:
¿qué pasa si la deuda es exactamente 10.000 €? ¿Pasa o no pasa?
La respuesta depende de la interpretación de "hasta 10.000 €".
Hay que decidir y escribir un test que lo especifique.
-->

# 🧪 Práctica TDD — el fiado (25 min)

<div class="tag">EJERCICIO</div>

Implementa el sistema de fiado usando TDD estrictamente:

1. Escribe el **primer test** (particular sin deuda) → falla ✅
2. Crea `ClienteParticular` con código mínimo → pasa ✅
3. Añade el segundo test (particular con deuda) → sigue pasando ✅
4. Continúa con los 4 casos de `Constructora`
5. Refactoriza cuando todos los tests estén en verde

<div class="muted">Trabaja en parejas. Alterna: uno escribe el test, el otro escribe el código.</div>

---

# Resumen de la sesión

<div class="tag">CONCEPTOS CLAVE</div>

- **Mock**: objeto falso que sustituye una dependencia externa
- **Inyección de dependencias**: pasar la dependencia por el constructor
- `mock()` / `@Mock` — crear el mock
- `when().thenReturn()` — programar el comportamiento del mock
- `verify()` — comprobar que se invocó el método esperado
- **TDD**: 🔴 escribe el test → 🟢 código mínimo → 🔵 refactoriza

---

<!--
NOTA DE PRESENTADOR
-------------------
Aviso para la sesión 4:
No hay dependencias nuevas que añadir. El depurador de IntelliJ ya viene
integrado, y slf4j + logback se añade en clase.

Aviso importante sobre la evaluación de la sesión 4:
La evaluación práctica dura 20 minutos y está incluida en esa sesión.
Los apuntes están permitidos. El enunciado tiene un código con dos errores
que los alumnos tienen que encontrar y corregir, y además escribir tests.

Si quieres, puedes avisarles ahora para que repasen los patrones de
esta sesión (AAA, assertEquals, assertThrows) antes de la sesión 4.
-->

# Próxima sesión

<div class="tag">SESIÓN 4</div>

## Depuración y evaluación práctica

- Depurador de IntelliJ: breakpoints, step over/into
- Niveles de logging con `slf4j` + `logback`
- **Evaluación práctica al final** (20 min, apuntes permitidos)

<div class="muted">⚠️ Repasa el patrón AAA y las aserciones: serán la base de la evaluación.</div>
