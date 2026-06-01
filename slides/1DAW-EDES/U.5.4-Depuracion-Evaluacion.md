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
  h1 { color: #e2b96f; font-size: 2em; border-bottom: 2px solid #e2b96f; padding-bottom: 12px; margin-bottom: 24px; }
  h2 { color: #e2b96f; font-size: 1.4em; margin-bottom: 16px; }
  h3 { color: #f0d090; font-size: 1.1em; margin-bottom: 10px; }
  code { background: #1e2330; color: #7ee8a2; padding: 2px 8px; border-radius: 4px; font-size: 0.9em; }
  pre { background: #1e2330; border-left: 4px solid #e2b96f; padding: 20px; border-radius: 4px; font-size: 0.8em; overflow: auto; }
  pre code { background: transparent; padding: 0; color: #e8e6df; }
  ul { margin-left: 1.2em; }
  li { margin-bottom: 10px; line-height: 1.6; }
  .tag { background: #e2b96f; color: #0f1117; padding: 4px 14px; border-radius: 20px; font-size: 0.75em; font-weight: bold; display: inline-block; margin-bottom: 18px; }
  .tag-eval { background: #f97583; color: #0f1117; padding: 4px 14px; border-radius: 20px; font-size: 0.75em; font-weight: bold; display: inline-block; margin-bottom: 18px; }
  .highlight { background: #1e2330; border-left: 4px solid #e2b96f; padding: 14px 20px; border-radius: 0 6px 6px 0; margin: 16px 0; font-size: 0.9em; }
  .muted { color: #888; font-size: 0.85em; }
  section.portada { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
  section.portada h1 { font-size: 2.6em; border: none; margin-bottom: 8px; }
  section.portada p { color: #888; font-size: 0.9em; margin: 4px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 0.82em; }
  th { background: #1e2330; color: #e2b96f; padding: 10px 14px; text-align: left; border: 1px solid #2a2f40; }
  td { padding: 10px 14px; border: 1px solid #2a2f40; }
  tr:nth-child(even) { background: #161a24; }
---

<!--
NOTA GENERAL — SESIÓN 4
========================
Esta sesión tiene tres bloques muy distintos:
1. Depurador de IntelliJ (15 min): teoría + demo en vivo.
2. Logging con slf4j/logback (15 min): teoría + añadir al proyecto.
3. Evaluación práctica (20 min): los alumnos trabajan solos.

La demo del depurador es lo más visual de toda la unidad.
Vale mucho la pena hacerla en vivo con el proyector: abre IntelliJ,
pon un breakpoint, ejecuta en modo debug y muestra el panel de variables.
Es algo que los alumnos no olvidarán fácilmente.

Para el logging: ten preparado el pom.xml con las dependencias de
slf4j y logback. Es mejor copiarlas en clase que dictarlas.

Tiempos orientativos:
- Portada + ¿qué es depurar?: 5 min
- El depurador de IntelliJ (tabla): 5 min
- Cómo poner un breakpoint: 3 min + demo 5 min
- Ejemplo práctico depuración: 5 min
- println vs logging: 5 min
- Niveles de logging: 5 min
- Configurar slf4j: 5 min + añadir al proyecto 3 min
- Usar el logger: 5 min
- logback.xml: 5 min
- Técnicas rápidas: 3 min
- EVALUACIÓN: 20 min (los alumnos trabajan, tú circulas)
- Resumen final: 5 min (si sobra tiempo)
TOTAL: ~74 min — recorta técnicas de depuración si es necesario
-->

<!-- _class: portada -->

# Depuración y evaluación

<div class="tag">SESIÓN 4 DE 4</div>

**EDES · 1ºDAW**
Debugger · Logging · Evaluación práctica
*~55 minutos*

---

<!--
NOTA DE PRESENTADOR
-------------------
"Depurar" viene del inglés "debug" (eliminar bugs).
La leyenda dice que el primer bug documentado de la historia fue
una polilla real atrapada en un relé del ordenador Mark II en 1947.
Grace Hopper la pegó en el cuaderno de registro. Si quieres,
es una buena anécdota para arrancar la clase.

Los tipos de error son importantes para entender por qué el depurador
es necesario: el compilador solo detecta errores de sintaxis. Los errores
de lógica (el código hace algo distinto de lo que debería) no los detecta
nadie hasta que se ejecuta el programa, y ahí es donde entra el depurador.

NullPointerException es el error más frecuente en Java para principiantes.
Ocurre cuando intentas usar un objeto que vale null: llamar a un método
de algo que no existe. El depurador te permite ver exactamente qué variable
era null en el momento del error.

Off-by-one ("error de uno"): los bucles que iteran una vez de más o de menos.
Por ejemplo: for(int i=0; i<=array.length; i++) en lugar de i<array.length.
Muy frecuente y a veces difícil de ver leyendo el código; el depurador lo hace obvio.
-->

# ¿Qué es depurar?

> Identificar y **corregir errores** en el código de forma sistemática.

Como un trabajo de detective: tienes pistas y debes inferir qué las causó.

**Tipos de error habituales:**
- **Lógica**: el código funciona pero hace algo incorrecto
- **NullPointerException**: se accede a un objeto que vale `null`
- **Tipo de dato**: se mezclan tipos incompatibles
- **Off-by-one**: bucles que iteran una vez de más o de menos

---

<!--
NOTA DE PRESENTADOR
-------------------
Esta tabla es la referencia del depurador. Explícala y luego
haz una demo en vivo en IntelliJ: eso vale más que cualquier explicación.

Demo sugerida (5 minutos):
1. Abre la clase Calculadora del ejercicio de la sesión 2.
2. Introduce un error de lógica: cambia return a + b; por return a * b;
3. Pon un breakpoint en la línea del return.
4. Ejecuta el test sumar_dosPositivos en modo Debug (Shift+F9 o el botón del bicho).
5. Cuando se pause en el breakpoint, muestra el panel de Variables:
   a=3, b=5, y el valor de retorno será 15 (incorrecto).
6. Usa Step Over para avanzar y ver cómo el test falla con "Expected: 8 but was: 15".
7. Corrige el error y vuelve a ejecutar: ahora pasa.

Iconos del depurador en IntelliJ (por si los alumnos preguntan):
- ▶ Resume: continúa hasta el próximo breakpoint
- ↷ Step Over: siguiente línea (sin entrar en métodos)
- ↓ Step Into: entra dentro del método que se llama
- ↑ Step Out: sale del método actual y vuelve al que lo llamó
-->

# El depurador de IntelliJ

Permite **pausar** la ejecución en cualquier punto y examinar el estado.

| Herramienta | Tecla | Qué hace |
|---|---|---|
| **Breakpoint** | clic en el margen | Pausa aquí la ejecución |
| **Step Over** | F8 | Siguiente línea (sin entrar en métodos) |
| **Step Into** | F7 | Entra dentro del método llamado |
| **Step Out** | Shift+F8 | Sale del método actual |
| **Resume** | F9 | Continúa hasta el próximo breakpoint |

---

<!--
NOTA DE PRESENTADOR
-------------------
Instrucciones exactas para poner un breakpoint:
1. Haz clic en el margen izquierdo de la línea (la zona gris junto al número).
   Aparece un círculo rojo. Eso es el breakpoint.
2. Para eliminarlo, vuelve a hacer clic en el círculo rojo.
3. Para desactivarlo temporalmente (sin borrarlo), clic derecho → Disable.

Panel "Variables" del depurador:
Cuando el programa está pausado, en el panel inferior aparecen todas las
variables locales con sus valores actuales. Puedes expandir objetos
para ver sus campos internos. Esto es enormemente útil para ver si una
variable tiene el valor que esperas o algo inesperado.

Panel "Frames" (pila de llamadas):
Muestra qué métodos están activos y en qué orden se llamaron.
Por ejemplo: main() llamó a calcularPromedio(), que está en la línea 7.
Puedes hacer clic en cada frame para ver el estado de ese método.

El error del ejemplo es sutil: suma = n en lugar de suma += n.
Eso hace que en cada iteración del bucle, suma se sobreescriba con
el último valor en lugar de acumular. El depurador lo hace obvio
porque puedes ver suma cambiar en cada iteración.
-->

# Cómo poner un breakpoint y usarlo

1. Haz **clic en el margen gris** junto al número de línea → aparece 🔴
2. Ejecuta en modo **Debug** (icono del bicho 🐛 o `Shift+F9`)
3. El programa se pausa en esa línea
4. Panel **Variables** (abajo): valores actuales de todas las variables
5. Usa **F8** para avanzar línea a línea y observar cómo cambian

```java
public int calcularPromedio(int[] numeros) {
    int suma = 0;
    for (int n : numeros) {  // ← pon el breakpoint aquí
        suma = n;            // ← BUG: debería ser suma += n
    }
    return suma / numeros.length;
}
```

---

<!--
NOTA DE PRESENTADOR
-------------------
Este ejemplo muestra el proceso completo de depuración.
Es el mismo código de la diapositiva anterior pero con el contexto
de uso y la solución explícita.

Si haces la demo en vivo, sigue estos pasos:
1. Crea el método calcularPromedio en cualquier clase.
2. Pon el breakpoint dentro del bucle (en la línea suma = n).
3. Crea un test o un main que lo llame con {6, 7, 8, 9}.
4. Ejecuta en modo Debug.
5. Observa en el panel Variables:
   - Primera iteración: n=6, suma=6 (correcto hasta aquí)
   - Segunda iteración: n=7, suma=7 (¡suma no acumuló! debería ser 13)
6. Ahí está el bug: suma se sobreescribe en cada iteración.
7. Corrige a suma += n y ejecuta de nuevo.

Lo que verán en el panel cuando esté corregido:
- Primera iteración: n=6, suma=6
- Segunda iteración: n=7, suma=13
- Tercera iteración: n=8, suma=21
- Cuarta iteración: n=9, suma=30
- return 30/4 = 7 (resultado correcto)
-->

# Ejemplo — depurar un error de lógica

**El bug:**

```java
int[] notas = {6, 7, 8, 9};
System.out.println(calcularPromedio(notas)); // imprime 2, no 7
```

**Proceso con el depurador:**

1. Breakpoint dentro del bucle
2. Ejecutar en modo Debug
3. Observar en "Variables": `suma` no acumula, se sobreescribe cada vez
4. Corregir: `suma = n` → `suma += n`
5. Volver a ejecutar: resultado correcto ✅

---

<!--
NOTA DE PRESENTADOR
-------------------
Esta diapositiva justifica por qué usar logging en lugar de println.

El problema de System.out.println:
- Hay que añadirlos y quitarlos manualmente para depurar.
- Si te olvidas de quitar alguno, van a producción y ensucian la salida.
- No puedes filtrarlos: o todos o ninguno.
- No tienen marca de tiempo ni información de contexto.

Las ventajas del logging:
- Puedes configurar qué nivel mostrar sin cambiar el código.
  En desarrollo: DEBUG (ves todo). En producción: INFO o WARN (solo lo importante).
- Los mensajes incluyen automáticamente la hora, la clase, el hilo...
- Los logs se pueden enviar a ficheros, bases de datos, servicios externos.

La "variable de sustitución" {} en slf4j:
logger.info("Procesando pedido {}", id);
El {} se reemplaza por el valor de id al formatear el mensaje.
Esto es más eficiente que concatenar Strings ("Procesando pedido " + id)
porque si el nivel no está activo, el mensaje no se formatea.
-->

# `System.out.println` vs Logging

**println** — la forma de principiante:
```java
System.out.println("Suma = " + suma); // hay que borrarlo antes de entregar
```

**Logging** — la forma profesional:
```java
logger.debug("Suma = {}", suma);  // se activa/desactiva sin tocar el código
logger.info("Pedido {} completado", id);
logger.error("Error inesperado en cálculo");
```

**Por qué logging:**
- Puedes filtrar qué mensajes aparecen según el nivel
- Incluye automáticamente hora, clase y contexto
- No hay que modificar el código para activarlo o desactivarlo

---

<!--
NOTA DE PRESENTADOR
-------------------
Los niveles de logging son como un dial de volumen:
cuanto más alto el nivel, menos mensajes aparecen, solo los más importantes.

Analogía útil: los avisos de tu móvil.
- TRACE/DEBUG: modo desarrollador, ves absolutamente todo (solo en desarrollo).
- INFO: notificaciones normales del sistema (la app se inició, el usuario se logó).
- WARN: una batería al 10% — algo que puede ser un problema pero la app sigue.
- ERROR: la app no puede hacer algo importante (no pudo guardar el fichero).
- FATAL: la app va a cerrar por un error crítico (sin memoria, sin disco).

En producción se suele configurar INFO o WARN para no saturar los logs.
En desarrollo se usa DEBUG para ver todo el flujo.

Para el ejercicio: los alumnos solo necesitan INFO y DEBUG.
No hace falta que usen TRACE, WARN, ERROR o FATAL en la práctica.
-->

# Niveles de logging — de menos a más grave

| Nivel | Cuándo usarlo |
|---|---|
| `TRACE` | Trazas muy detalladas (solo en desarrollo puntual) |
| `DEBUG` | Información de depuración durante desarrollo |
| `INFO` | Flujo normal: inicio de procesos, operaciones completadas |
| `WARN` | Algo raro pero la app sigue funcionando |
| `ERROR` | Error que requiere atención, la operación falló |
| `FATAL` | Error crítico que detiene la aplicación |

<div class="highlight">
En producción: solo <code>INFO</code> o <code>WARN</code>.
En desarrollo: <code>DEBUG</code> para ver todo el flujo.
</div>

---

<!--
NOTA DE PRESENTADOR
-------------------
slf4j y logback son dos cosas distintas:

slf4j (Simple Logging Facade for Java):
Es una FACHADA, es decir, una capa de abstracción.
Tu código usa las clases de slf4j (Logger, LoggerFactory).
slf4j en sí mismo no hace nada; delega en una implementación concreta.

logback:
Es la IMPLEMENTACIÓN concreta que hace el trabajo real de escribir los logs.
Es el sucesor del famoso log4j, creado por el mismo autor.

¿Por qué esta separación?
Si en el futuro quieres cambiar de logback a otra implementación (log4j2, jul...),
solo cambias la dependencia en pom.xml. Tu código (que usa slf4j) no cambia nada.

Para los alumnos: solo necesitan saber que hay que añadir LAS DOS dependencias.
slf4j es la interfaz que usan en el código; logback es el motor que la hace funcionar.
Si solo añaden slf4j, los logs no aparecen. Si solo añaden logback, el código no compila.
-->

# Configurar `slf4j` + `logback`

Dos dependencias que trabajan juntas — añade las dos al `pom.xml`:

```xml
<!-- La interfaz que usamos en el código -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>2.0.12</version>
</dependency>

<!-- El motor que escribe los logs de verdad -->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.5.3</version>
</dependency>
```

---

<!--
NOTA DE PRESENTADOR
-------------------
Explicación línea a línea del código:

1. import org.slf4j.Logger → la interfaz que define los métodos log.debug(), log.info()...
2. import org.slf4j.LoggerFactory → la factoría que crea el logger.

3. private static final Logger log = LoggerFactory.getLogger(ServicioPedidos.class);
   - static: existe una sola instancia del logger por clase (no una por objeto).
   - final: el logger no se cambia nunca después de crearse.
   - getLogger(ServicioPedidos.class): el logger sabe qué clase lo usa
     y añade el nombre de la clase a cada mensaje de log.
   Esta línea es un patrón fijo: se copia igual en cada clase que quiera loggear,
   cambiando solo el nombre de la clase entre paréntesis.

4. Los {} son placeholders: se reemplazan por los argumentos en orden.
   logger.info("Procesando pedido {} para cliente {}", id, nombreCliente);
   Es más eficiente que concatenar: si el nivel INFO está desactivado,
   ni siquiera se forma el String.

Para la práctica: los alumnos solo tienen que copiar el patrón del logger
y añadir un log.info() donde corresponda.
-->

# Usar el logger en el código

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServicioPedidos {

    // Una sola instancia por clase — copiar este patrón siempre igual
    private static final Logger log =
        LoggerFactory.getLogger(ServicioPedidos.class);

    public void procesarPedido(int id) {
        log.info("Procesando pedido {}", id);        // {} se reemplaza por id

        if (id <= 0) {
            log.warn("ID de pedido inválido: {}", id);
            return;
        }

        log.debug("Entrando en lógica interna del pedido {}", id);
        log.info("Pedido {} completado correctamente", id);
    }
}
```

---

<!--
NOTA DE PRESENTADOR
-------------------
logback.xml es el fichero de configuración de logback.
Debe estar en src/main/resources/ (IntelliJ la crea junto al proyecto;
si no existe, hay que crearla: clic derecho sobre src/main → New → Directory).

Si no existe el fichero logback.xml, logback usa una configuración por defecto
que muestra los logs en consola con nivel DEBUG. Para este curso es suficiente,
pero hay que tener el fichero para poder ajustar el nivel fácilmente.

Explicación del XML:
- <appender>: define DÓNDE se escriben los logs (consola, fichero, base de datos...).
  ConsoleAppender → escribe en System.out (la consola de IntelliJ).
- <pattern>: el formato de cada línea de log.
  %d{HH:mm:ss} → hora (ejemplo: 14:35:22)
  %-5level → nivel con 5 caracteres de ancho (DEBUG, INFO , WARN , ERROR)
  %logger{20} → nombre de la clase (máximo 20 caracteres)
  %msg → el mensaje
  %n → salto de línea
- <root level="DEBUG">: nivel mínimo global. Solo aparecen mensajes de
  ese nivel o superior. Cambiar a "INFO" para producción.

Para la práctica: los alumnos no necesitan modificar este fichero.
Solo asegurarse de que existe y tiene el nivel DEBUG para ver los mensajes.
-->

# `logback.xml` — configuración mínima

Crea el fichero en `src/main/resources/logback.xml`:

```xml
<configuration>
  <appender name="CONSOLA"
            class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
      <!-- Formato: hora  nivel  clase - mensaje -->
      <pattern>%d{HH:mm:ss} %-5level %logger{20} - %msg%n</pattern>
    </encoder>
  </appender>

  <!-- Nivel mínimo: DEBUG en desarrollo, INFO en producción -->
  <root level="DEBUG">
    <appender-ref ref="CONSOLA"/>
  </root>
</configuration>
```

---

<!--
NOTA DE PRESENTADOR
-------------------
Tres técnicas rápidas que no requieren herramientas especiales.

1. El patito de goma (Rubber Duck Debugging):
Es una técnica real, ampliamente usada por desarrolladores profesionales.
La idea es que al explicar el código en voz alta (aunque sea a un pato de goma,
un bolígrafo, o a un compañero que no sepa programar), activas otra parte del
cerebro. Al verbalizar lo que "debería" hacer el código, tu cerebro detecta
la discrepancia con lo que realmente hace.

2. Chequeo de sanidad (Sanity Check):
Antes de asumir que el algoritmo está mal, comprueba los datos de entrada.
El 50% de los bugs "misteriosos" son que los datos de entrada no son lo que
el programador pensaba. Un log.debug() o un breakpoint en el primer paso
del método suele revelar el problema en segundos.

3. Bisección (Binary Search de bugs):
Si tienes un método largo y no sabes dónde está el bug, pon un breakpoint
en el punto medio. ¿El estado es correcto ahí? Entonces el bug está en la
segunda mitad. ¿Ya está mal? Está en la primera mitad. Repite hasta encontrarlo.
Es el algoritmo de búsqueda binaria aplicado a bugs.
-->

# Técnicas de depuración rápidas

**1. El patito de goma 🦆**
Explica el código en voz alta, línea a línea. Al verbalizarlo,
tu cerebro detecta la discrepancia entre lo que "debería" pasar y lo que pasa.

**2. Chequeo de sanidad**
Antes de asumir que el algoritmo está mal, verifica que las variables
de entrada tienen el valor que esperas. Un `log.debug()` en el primer
paso del método suele revelar el problema en segundos.

**3. Bisección**
Si no sabes dónde está el bug, pon un breakpoint en el punto medio del código.
¿El estado ya está mal? El bug está antes. ¿Está bien? Está después.
Repite hasta encontrarlo: es una búsqueda binaria de bugs.

---

<!--
NOTA DE PRESENTADOR
-------------------
EVALUACIÓN — instrucciones para la profesora:

Distribución de tiempo: 20 minutos para los alumnos, 5 minutos al final
para la puesta en común (revelar los errores y los tests esperados).

Los dos errores del código son:
1. if (precio < 0) debería ser if (precio <= 0)
   → Con precio=0, el método no lanza excepción pero debería.
2. double total = precio + cantidad debería ser precio * cantidad
   → La suma en lugar del producto hace que el resultado sea incorrecto.

Tests mínimos esperados (los alumnos deberían escribir al menos estos):

Test 1 — caso normal:
assertEquals(9.0, gestor.calcularTotal(1.0, 9), 0.001); // 1*9=9, sin descuento

Test 2 — con descuento (cantidad > 10):
assertEquals(9.9, gestor.calcularTotal(1.0, 11), 0.001); // 1*11=11, -10%=9.9

Test 3 — precio cero lanza excepción:
assertThrows(IllegalArgumentException.class, () -> gestor.calcularTotal(0.0, 5));

Test 4 — cantidad cero lanza excepción:
assertThrows(IllegalArgumentException.class, () -> gestor.calcularTotal(10.0, 0));

El 0.001 en assertEquals para doubles es el delta de tolerancia:
con doubles puede haber imprecisión de coma flotante, así que
assertEquals(esperado, real, tolerancia) acepta diferencias menores que tolerancia.

Para la nota: si los alumnos encuentran los dos bugs Y escriben 2 tests correctos,
es suficiente para aprobar. Los 4 tests completos es la nota máxima.
-->

# 📝 Evaluación práctica (20 min)

<div class="tag-eval">EVALUACIÓN — apuntes permitidos</div>

Dado el siguiente código con **2 errores**, debes:

1. **Escribir al menos 2 tests** con JUnit 5 que fallen con el código actual
2. **Corregir los errores** para que todos tus tests pasen
3. **Añadir un `log.info()`** cuando el total se calcula correctamente

Se valorará: patrón AAA · nombres descriptivos · clases de equivalencia · tests que realmente detectan los errores.

---

<!--
NOTA DE PRESENTADOR
-------------------
Los dos errores están marcados con comentarios en el código.
En la copia que das a los alumnos, elimina los comentarios "← ERROR"
para que tengan que encontrarlos ellos.

Error 1: precio < 0 en lugar de precio <= 0
El test que lo detecta: calcularTotal(0.0, 5) debería lanzar
IllegalArgumentException pero no lo hace con precio < 0.

Error 2: precio + cantidad en lugar de precio * cantidad
El test que lo detecta: calcularTotal(2.0, 3) debería dar 6.0
pero da 5.0 (2+3 en lugar de 2*3).

El tercer requisito (añadir un log.info) comprueba que saben usar
el logger básico. Basta con añadir una línea como:
log.info("Total calculado: {} para precio={} cantidad={}", total, precio, cantidad);
-->

# Enunciado de la evaluación

```java
public class GestorPedidos {

    // Calcula el precio total con posible descuento.
    // Si precio <= 0  → lanza IllegalArgumentException
    // Si cantidad <= 0 → lanza IllegalArgumentException
    // Si cantidad > 10 → aplica 10% de descuento al total

    public double calcularTotal(double precio, int cantidad) {

        if (precio < 0) {               // ← ERROR 1 (encuentra el bug)
            throw new IllegalArgumentException("Precio inválido");
        }
        if (cantidad <= 0) {
            throw new IllegalArgumentException("Cantidad inválida");
        }

        double total = precio + cantidad; // ← ERROR 2 (encuentra el bug)

        if (cantidad > 10) {
            total = total * 0.9;
        }
        return total;
    }
}
```

---

# Resumen del tema completo

<div class="tag">UNIDAD 3 COMPLETADA</div>

| Sesión | Contenido |
|---|---|
| 1 | Teoría: tipos, niveles, TDD, AAA, clases equivalencia |
| 2 | JUnit 5: `@Test`, `@BeforeEach`, aserciones, práctica |
| 3 | Mockito: mocks, `when/verify`, TDD aplicado |
| 4 | Depurador IntelliJ, logging slf4j/logback, evaluación |

**Herramientas:** JUnit 5 · Mockito · slf4j + logback · IntelliJ Debugger

<!--
NOTA FINAL PARA LA PROFESORA
============================
Felicidades por llegar al final del tema. Algunos apuntes post-sesión:

- Si la evaluación fue bien: la mayoría de los alumnos debería haber
  encontrado al menos uno de los dos errores y escrito algún test.
  El error 2 (+ en lugar de *) suele ser el más fácil de detectar
  con un test. El error 1 (< en lugar de <=) requiere pensar en el
  caso límite, que es exactamente lo que trabajamos con clases de equivalencia.

- Si los resultados fueron flojos: considera revisar el patrón AAA
  en la siguiente sesión de otro tema y reforzar la idea de que un test
  no es "código que comprueba que el código funciona", sino
  "código que especifica el comportamiento esperado".

- El ejercicio del fiado de la sesión 3 es reutilizable para evaluaciones
  futuras añadiendo nuevos tipos de cliente o nuevas reglas de negocio.
-->
