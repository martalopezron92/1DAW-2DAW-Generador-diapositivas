---
marp: true
theme: default
paginate: true
# header: 'EDES - Unidad 3.3: Identificación de Clases'
# footer: 'UML & Diseño Orientado a Objetos'
style: |
  section {
    font-size: 22px;
  }
  h1 {
    color: #2E86AB;
    font-size: 40px;
  }
  h2 {
    color: #A23B72;
    font-size: 32px;
  }
  h3 {
    color: #F18F01;
    font-size: 26px;
  }
  code {
    font-size: 16px;
  }
  .important {
    background: #FFF3CD;
    padding: 10px;
    border-left: 4px solid #F18F01;
  }
  .warning {
    background: #F8D7DA;
    padding: 10px;
    border-left: 4px solid #DC3545;
  }
  .tip {
    background: #D4EDDA;
    padding: 10px;
    border-left: 4px solid #28A745;
  }
---

# UD 3.3 - Identificación de Clases
## Técnicas, métodos y buenas prácticas para identificar clases a partir de requisitos

**Asignatura:** EDES - Entornos de Desarrollo

---

# 1. Introducción

## ¿Por qué es crucial identificar clases correctamente?

La **identificación de clases** es el paso que diferencia a los buenos diseñadores de los mediocres.

> **Principio fundamental:** Cada comportamiento que requiera el sistema debe ser proporcionado por los objetos de las clases que elijamos.

### Consecuencias de un mal diseño:
- ❌ Olvidar una clase importante → comportamientos no representados
- ❌ Crear clases innecesarias → modelo confuso y difícil de mantener

---

# 1.1 Impacto de la Identificación de Clases

La fase de identificación determina:

| Aspecto | Impacto |
|---------|---------|
| **Arquitectura conceptual** | Define la estructura base del sistema |
| **Mantenibilidad** | Determina facilidad/dificultad de mantener el código |
| **Escalabilidad** | Establece bases para crecimiento futuro |
| **Colaboración** | Facilita o complica el trabajo en equipo |
| **Desempeño** | Afecta eficiencia del sistema resultante |

---

# 2. Fundamentos de la Identificación

## 2.1 ¿Qué buscamos al identificar clases?

### Tres preguntas fundamentales:

1. **¿Qué entidades existen en nuestro dominio?**
   - Ejemplos: Cliente, Producto, Pedido, Empresa

2. **¿Qué responsabilidades tiene cada entidad?**
   - Ejemplo: Un Cliente debe poder realizar una compra

3. **¿Cómo colaboran las entidades?**
   - Ejemplo: Un Cliente crea un Pedido que contiene Productos

---

# 2.2 Consideraciones Importantes

## ⚠️ Los objetos son representaciones digitales

**No modelamos la realidad completa**, solo lo relevante para el sistema.

### La clave:
> Modelar el dominio del problema desde la perspectiva del sistema, no modelar la realidad en su totalidad.

### Ejemplo - Sistema de biblioteca:
- ❌ No necesitamos: color del cartel de la tienda
- ❌ No necesitamos: empleados de mantenimiento (aunque existan)
- ✅ Sí necesitamos: Libro, Usuario, Préstamo

<div class="tip">
💡 <strong>Consejo práctico:</strong> "¿Esta información es necesaria para que el sistema cumpla sus requisitos?"
</div>

---

# 3. Objetivos de un Buen Modelo

## Dos objetivos en tensión:

### 🎯 Objetivo 1: Construcción Eficiente
Construir rápido y barato un sistema que satisfaga requisitos actuales.

**Estrategias:**
- Identificar clases mínimas necesarias
- Enfocarse en requisitos actuales (no anticipar)
- Evitar sobre-ingeniería prematura

---

# 3.1 Objetivo 2: Mantenibilidad

Construir un sistema fácil de mantener y adaptar.

### Características clave:

| Característica | Descripción |
|----------------|-------------|
| **Alta cohesión** | Cada clase tiene responsabilidad clara |
| **Bajo acoplamiento** | Pocas dependencias entre clases |
| **Encapsulamiento** | Detalles internos ocultos |

<div class="important">
⚖️ <strong>El equilibrio:</strong> No tan simple que sea rígido, no tan complejo que sea difícil de entender.
</div>

---

# 4. Proceso Iterativo de Identificación

## El Ciclo del Diseño

La identificación de clases **NO es lineal**. Requiere múltiples refinamientos.

### ¿Por qué es iterativo?
1. **Aprendizaje progresivo** - Descubres nuevas clases al profundizar
2. **Requisitos evolutivos** - Se aclaran durante el proceso
3. **Descubrimiento de relaciones** - Emergen gradualmente
4. **Validación continua** - Cada iteración corrige el modelo

<div class="warning">
❌ <strong>Error común:</strong> Intentar crear el modelo perfecto en el primer intento.
</div>

---

# 4.1 Las 5 Fases del Proceso Iterativo

| Fase | Objetivo | Duración | Resultado |
|------|----------|----------|-----------|
| **1. Identificación Inicial** | Generar candidatos amplios | 30-60 min | Lista de 20-50 candidatos |
| **2. Filtrado y Refinamiento** | Eliminar inapropiados | 60-90 min | 10-20 clases sólidas |
| **3. Identificación de Relaciones** | Establecer colaboraciones | 45-60 min | Diagrama conectado |
| **4. Enriquecimiento** | Añadir atributos y métodos | 60-120 min | Diagrama completo |
| **5. Validación y Revisión** | Verificar requisitos | 30-45 min | Modelo validado |

---

# 4.2 Ejemplo Práctico - Sistema de Biblioteca

### Fase 1: Identificación Inicial

**Candidatos:** Libro, Copia, Usuario, Préstamo, Bibliotecario, Estantería, Editorial, Autor, Catálogo, FichaBibliográfica, CódigoDewey, MultaPorRetraso...

### Fase 2: Filtrado

| Decisión | Clase | Justificación |
|----------|-------|---------------|
| ✅ Mantener | Libro, Copia, Usuario, Préstamo | Entidades principales |
| ❌ Descartar | Bibliotecario | Es un rol de Usuario |
| ❌ Descartar | Estantería | Detalle físico irrelevante |
| ❌ Descartar | FichaBibliográfica | Representación de Libro |
| 🔄 Convertir | MultaPorRetraso → atributo calculado de Préstamo |

**Resultado:** De 12+ candidatos → 4 clases sólidas

---

# 5. Técnica de Análisis de Sustantivos

## El Método Fundamental

**Principio básico:** Los sustantivos representan conceptos (clases), los verbos representan acciones (métodos).

### Base lingüística:
- **Sustantivos** → Potenciales clases u objetos
- **Verbos** → Potenciales métodos o relaciones
- **Adjetivos** → Potenciales atributos
- **Adverbios** → Restricciones

---

# 5.1 Proceso Paso a Paso

### Ejemplo - Sistema de Biblioteca:

> "Una **biblioteca** necesita un **sistema** para gestionar **préstamos** de **libros**. Los **usuarios** se registran proporcionando su **nombre**, **dirección** y **número de identificación**. Cada **libro** tiene un **título**, **autor**, **ISBN** y puede tener múltiples **copias físicas**."

### Paso 1: Extraer sustantivos

**Lista completa:**
1. Biblioteca, 2. Sistema, 3. Préstamo, 4. Libro, 5. Usuario, 6. Nombre, 7. Dirección, 8. Número de identificación, 9. Título, 10. Autor, 11. ISBN, 12. Copia (física)...

---

# 5.2 Criterios de Descarte

## ¿Qué NO es una clase?

### Criterio 1: Redundancia
❌ "Usuario" y "Bibliotecario" → El bibliotecario es un tipo de usuario

### Criterio 2: Atributos disfrazados
❌ "Nombre", "Dirección", "Título", "ISBN" → Son atributos, no clases

### Criterio 3: Valores o estados
❌ "Disponible", "Prestada" → Son estados (atributos booleanos)

### Criterio 4: Detalles de implementación
❌ "Sistema" → Demasiado genérico

### Criterio 5: Entidades externas
❌ "Biblioteca" (el edificio) → Fuera del alcance

---

# 5.3 Regla: ¿Atributo o Clase?

## ¿Cuándo un concepto debe ser atributo vs clase?

| Atributo | Clase |
|----------|-------|
| Solo necesitas el valor | Necesitas múltiples propiedades |
| Sin comportamiento | Tiene comportamiento complejo |
| No puede existir independientemente | Puede existir independientemente |

### Ejemplo - "Autor":
- **Atributo**: Si solo es un String con el nombre
- **Clase**: Si tiene biografía, nacionalidad, otros libros, fechas...

---

# 5.4 Reglas Prácticas para Identificar Clases

### Test 1: "El sustantivo concreto"
¿Puedes señalar ejemplos concretos?
- ✅ "Ese libro" → Es una clase
- ❌ "Ese nombre" → Es un dato simple

### Test 2: "Las múltiples propiedades"
¿Tiene más de 2-3 propiedades relevantes?
- ✅ Libro: título, autor, ISBN, editorial, año → Clase
- ❌ Título: solo es un String → Atributo

### Test 3: "El comportamiento"
¿Tiene comportamiento significativo?
- ✅ Préstamo: calcularRetraso(), devolver(), renovar() → Clase
- ❌ ISBN: no tiene comportamiento → Atributo

<div class="tip">
💡 <strong>Consejo de experto:</strong> Cuando dudes, empieza haciéndolo atributo. Es más fácil convertir atributo en clase después.
</div>

---

# 6. Fuentes de Clases

## Más allá de los sustantivos

### 6.1 Categorías de Objetos según su Origen

| Categoría | Descripción | Ejemplo |
|-----------|-------------|---------|
| **Cosas tangibles** | Objetos físicos | Vehículo, Producto |
| **Roles o papeles** | Funciones de personas | Estudiante, Profesor |
| **Organizaciones** | Grupos, empresas | Universidad, Departamento |
| **Transacciones** | Eventos entre entidades | Venta, Pago, Préstamo |
| **Eventos** | Sucesos a registrar | Vuelo, Cita, Incidente |

---

# 6.2 Ejemplo - Cosas Tangibles

## Sistema de flota de vehículos

```java
public class Vehiculo {
    private String matricula;
    private String modelo;
    private int año;
    private int kilometraje;
    private Coordenadas ubicacionActual;

    public void registrarMantenimiento(String tipo, double costo) { }
    public double calcularDepreciacion() { return 0.0; }

    // Getters y setters...
}
```

---

# 6.3 Ejemplo - Roles

## Sistema educativo - Opciones de diseño:

### Opción A: Roles como clases separadas
```java
public abstract class Persona {
    protected String nombre;
    protected String dni;
}

public class Estudiante extends Persona {
    private String matricula;
}

public class Profesor extends Persona {
    private String departamento;
}
```

### Opción B: Rol como atributo
```java
public class Usuario {
    private String nombre;
    private String dni;
    private List<Rol> roles; // Un usuario puede tener múltiples roles
}

public enum Rol { ESTUDIANTE, PROFESOR, ADMINISTRATIVO }
```

---

# 6.4 Ejemplo - Transacciones

## Sistema de ventas

```java
public class Venta {
    private String numero;
    private LocalDateTime fecha;
    private Cliente cliente;
    private Empleado vendedor;
    private List<ItemVenta> items;
    private EstadoVenta estado;

    public double calcularTotal() {
        return items.stream().mapToDouble(ItemVenta::getSubtotal).sum();
    }

    public void aplicarDescuento(double porcentaje) { }
    public boolean procesar() { return false; }
    public void cancelar(String motivo) { }
}

public enum EstadoVenta { PENDIENTE, PROCESADA, CANCELADA, DEVUELTA }
```

---

# 6.5 Otras Fuentes para Identificar Clases

| Fuente | Qué revela |
|--------|-----------|
| **Diagramas E-R existentes** | Entidades de base de datos |
| **Interfaces de usuario** | Formularios → Clases ("Registro de Cliente" → Cliente) |
| **Casos de uso** | Actores y entidades involucradas |
| **Glosario del dominio** | Términos técnicos específicos |
| **Expertos del dominio** | Conceptos no escritos, reglas de negocio |

### Patrones comunes reconocidos:
- **Entidad-Detalle**: Factura → ItemFactura
- **Contenedor-Contenido**: Carrito → Producto
- **Maestro-Transacción**: Cliente → Venta
- **Catálogo-Instancia**: TipoProducto → Producto

---

# 7. Errores Comunes

## 7.1 Error 1: Sobre-diseño (Too Many Classes)

**Síntomas:**
- Clases con solo 1-2 atributos simples
- Jerarquías de herencia muy profundas (>3 niveles)

### ❌ MAL: Sobre-diseño
```java
public class Nombre {
    private String primer;
    private String segundo;
}

public class Apellido {
    private String paterno;
    private String materno;
}

public class Persona {
    private Nombre nombre;
    private Apellido apellido;
}
```

---

### ✅ MEJOR: Simplificado
```java
public class Persona {
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
}
```

---

# 7.2 Error 2: Sub-diseño (Missing Classes)

**Síntomas:**
- Métodos muy largos con mucha lógica
- Clases "Dios" con decenas de métodos

### ❌ MAL: Falta clase Préstamo
```java
public class Biblioteca {
    public void prestarLibro(Usuario usuario, Libro libro, int dias) {
        // 50 líneas de lógica:
        // validar usuario, verificar disponibilidad,
        // registrar fecha, calcular fecha devolución,
        // actualizar inventario, enviar notificación...
    }
}
```

### ✅ MEJOR: Con clase Préstamo
```java
public class Prestamo {
    private Usuario usuario;
    private Copia copia;
    private LocalDate fechaPrestamo;
    private int diasPrestamo;

    public LocalDate calcularFechaDevolucion() { }
    public boolean estaVencido() { return false; }
    public void devolver() { }
}
```

---

# 7.3 Error 3: Confundir Clases con Atributos

### ❌ MAL: Email como clase innecesaria
```java
public class Email {
    private String direccion;
}

public class Usuario {
    private Email email;
}
```

### ✅ MEJOR: Email como String
```java
public class Usuario {
    private String email;
}
```

### ✅ PERO: Email como clase si tiene validación compleja
```java
public class Email {
    private String direccion;

    public Email(String direccion) {
        if (!direccion.matches("^[^@]+@[^@]+\.[^@]+$")) {
            throw new IllegalArgumentException("Email inválido");
        }
        this.direccion = direccion;
    }

    public String getDominio() {
        return direccion.substring(direccion.indexOf("@") + 1);
    }
}
```

---

# 7.4 Error 4: Modelar Detalles de Implementación

### ❌ MAL: Clases técnicas en modelo de dominio
```java
public class DatabaseConnection { }
public class JSONParser { }
public class HTTPClient { }
public class LoggerService { }
```

<div class="warning">
El diagrama de clases de <strong>dominio</strong> debe representar conceptos del negocio, no detalles técnicos.
</div>

### Solución:
- **Modelo de dominio**: Solo clases del negocio
- **Diagrama de arquitectura**: Clases técnicas aparte

---

# 7.5 Error 5: Nombres Genéricos o Vagos

### ❌ Nombres malos:
- GestorDatos
- ManejadorUsuarios
- ProcesadorInformacion
- ObjetoGeneral

**Problema:** No comunican responsabilidad clara

### ✅ Nombres buenos:
- RepositorioUsuarios (almacenamiento)
- ValidadorCredenciales (validación)
- ServicioAutenticacion (lógica de negocio)
- CalculadoraPrecios (cálculo específico)

<div class="tip">
💡 Si necesitas usar "Gestor" o "Manejador", probablemente no has entendido bien la responsabilidad.
</div>

---

# 7.6 Error 6: Ignorar la Multiplicidad

### ❌ MAL: Sin especificar multiplicidad
```
Usuario ──── Préstamo
```

### ✅ BIEN: Especificar multiplicidad
```
Usuario 1 ────── * Préstamo
(Un usuario puede tener muchos préstamos)
```

### Tabla de multiplicidad:

| Situación | Notación |
|-----------|----------|
| Exactamente uno | `1` |
| Cero o uno (opcional) | `0..1` |
| Uno o más | `1..*` |
| Cero o más | `*` o `0..*` |
| Rango específico | `2..5` |

---

# 7.7 Error 7: No Validar con Escenarios Reales

## Cómo evitarlo:
Recorre el modelo con ejemplos concretos:

**Ejemplo - Sistema de biblioteca:**
> "Ana presta el libro 'Don Quijote' el 1 de febrero"

### Checklist de validación:
- ✅ ¿Tengo clase Usuario para Ana?
- ✅ ¿Tengo clase Libro para Don Quijote?
- ✅ ¿Tengo clase Préstamo para registrar la transacción?
- ✅ ¿Puedo calcular cuándo debe devolverlo?

<div class="warning">
Si no puedes "recorrer" tus casos de uso con el modelo, falta algo.
</div>

---

# 8. Identificación de Relaciones

## 8.1 Tipos de Relaciones

### Herencia ("Es un")
**Palabras clave:** "es un tipo de", "se categoriza como"

```
"Un profesor es un tipo de empleado"

       ┌──────────┐
       │ Empleado │
       └────△─────┘
            │
     ┌──────┴──────┐
     │             │
┌────┴────┐   ┌────┴────┐
│Profesor │   │  Admin  │
└─────────┘   └─────────┘
```

---

# 8.2 Composición vs Agregación

## Composición: "Es parte de" (dependencia fuerte)
- La parte **NO** puede existir sin el todo
- Ejemplo: Motor sin Coche → No tiene sentido

```
┌─────────┐♦──────*┌──────────────┐
│ Factura │        │ LineaFactura │
└─────────┘        └──────────────┘
```

## Agregación: "Tiene un" (dependencia débil)
- La parte **PUEDE** existir independientemente
- Ejemplo: Jugador puede cambiar de Equipo

```
┌────────┐◇──────*┌──────────┐
│ Equipo │        │ Jugador  │
└────────┘        └──────────┘
```

---

# 8.3 Identificar Multiplicidad

### Técnica sistemática:

Para la relación "Cliente ─── Pedido":

1. **De Cliente a Pedido**: "¿Cuántos pedidos puede tener un cliente?"
   - Respuesta: Cero o muchos (`*`)

2. **De Pedido a Cliente**: "¿Cuántos clientes puede tener un pedido?"
   - Respuesta: Exactamente uno (`1`)

### Resultado:
```
Cliente 1 ────── * Pedido
```

---

# 8.4 Relaciones Muchos a Muchos

## El caso especial que requiere clase intermedia

**Ejemplo:**
> "Un estudiante se matricula en varias asignaturas. Una asignatura tiene varios estudiantes."

### Modelado simple (conceptual):
```
Estudiante * ─────── * Asignatura
```

### Modelado detallado (con clase de asociación):
```
┌───────────┐ 1     * ┌─────────────┐
│ Estudiante│─────────│ Matricula   │
└───────────┘         │─────────────│
                    │ - fecha     │
                    │ - semestre  │
                    └──────┬──────┘
                           │
                          *│
                    ┌──────┴──────┐
                    │ Asignatura  │
                    └─────────────┘
```

---

# 8.5 ¿Cuándo crear clase intermedia?

### ✅ Crea clase intermedia si:
- La relación tiene **atributos propios** (fecha, calificación)
- La relación tiene **comportamiento propio** (métodos)
- Necesitas almacenar **información histórica**

### ❌ No crees clase intermedia si:
- La relación es **pura** sin información adicional
- Puedes usar **listas simples** en ambas clases

---

# 8.6 Implementación de Matrícula en Java

```java
// Sin clase intermedia (relación pura)
public class Estudiante {
    private List<Asignatura> asignaturas = new ArrayList<>();
}

public class Asignatura {
    private List<Estudiante> estudiantes = new ArrayList<>();
}

// Con clase intermedia (con información adicional)
public class Matricula {
    private Estudiante estudiante;
    private Asignatura asignatura;
    private LocalDate fecha;
    private String semestre;
    private Double calificacion;

    public boolean aprobo() {
        return calificacion != null && calificacion >= 5.0;
    }
}
```

---

# 9. Buenas Prácticas

## 9.1 Principio de Responsabilidad Única (SRP)

> Una clase debe tener una, y solo una, razón para cambiar.

### ❌ MAL: Múltiples responsabilidades
```java
public class Usuario {
    private String nombre;
    private String email;
    private String password;

    // Responsabilidad 1: Gestión de usuario
    public void cambiarEmail(String nuevoEmail) { }

    // Responsabilidad 2: Autenticación
    public boolean validarPassword(String pass) { }

    // Responsabilidad 3: Envío de emails
    public void enviarEmailBienvenida() { }

    // Responsabilidad 4: Persistencia
    public void guardarEnBaseDatos() { }

    // Responsabilidad 5: Logging
    public void registrarAccion(String accion) { }
}
```

---

# 9.2 SRP - Solución

### ✅ BIEN: Responsabilidades separadas

```java
// Responsabilidad 1: Entidad del dominio
public class Usuario {
    private int id;
    private String nombre;
    private String email;

    public void cambiarEmail(String nuevoEmail) { }
}

// Responsabilidad 2: Autenticación
public class ServicioAutenticacion {
    public boolean validarCredenciales(String email, String password) { }
}

// Responsabilidad 3: Comunicación
public class ServicioEmail {
    public void enviarBienvenida(Usuario usuario) { }
}

// Responsabilidad 4: Persistencia
public class RepositorioUsuarios {
    public void guardar(Usuario usuario) { }
    public Usuario buscarPorEmail(String email) { return null; }
}
```

---

# 9.3 Alta Cohesión

**Definición:** Los elementos dentro de una clase deben estar fuertemente relacionados.

### ❌ MAL: Baja cohesión
```java
public class UtilidadesVarias {
    public double calcularIVA(double precio) { }
    public boolean validarEmail(String email) { }
    public String formatearFecha(LocalDate fecha) { }
    public Connection conectarBaseDatos() { }
}
```

### ✅ BIEN: Alta cohesión
```java
public class CalculadoraPrecios {
    private static final double TASA_IVA = 0.21;

    public double calcularIVA(double precioBase) {
        return precioBase * TASA_IVA;
    }

    public double calcularPrecioFinal(double precioBase) {
        return precioBase + calcularIVA(precioBase);
    }

    public double calcularDescuento(double precio, double porcentaje) {
        return precio * (porcentaje / 100.0);
    }
}
```

---

# 9.4 Bajo Acoplamiento

**Definición:** Las clases deben depender lo menos posible de otras.

### ❌ MAL: Alto acoplamiento
```java
public class Pedido {
    private Cliente cliente;

    public void procesarPago() {
        // Accede directamente a detalles internos del cliente
        if (cliente.getTarjetaCredito().getSaldo() > calcularTotal()) {
            cliente.getTarjetaCredito().setSaldo(
                cliente.getTarjetaCredito().getSaldo() - calcularTotal()
            );
            cliente.getHistorialCompras().add(this);
            cliente.setPuntosFidelidad(cliente.getPuntosFidelidad() + 10);
        }
    }
}
```

---

# 9.5 Bajo Acoplamiento - Solución

### ✅ BIEN: Usando interfaces

```java
public interface ProcesadorPagos {
    boolean procesarPago(double monto);
}

public interface GestorPuntos {
    void agregarPuntos(int puntos);
}

public class Pedido {
    private ProcesadorPagos procesadorPagos;
    private GestorPuntos gestorPuntos;

    public Pedido(ProcesadorPagos procesadorPagos, GestorPuntos gestorPuntos) {
        this.procesadorPagos = procesadorPagos;
        this.gestorPuntos = gestorPuntos;
    }

    public void procesarPago() {
        boolean exito = procesadorPagos.procesarPago(calcularTotal());
        if (exito) {
            gestorPuntos.agregarPuntos(calcularPuntos());
        }
    }
}

public class Cliente implements ProcesadorPagos, GestorPuntos {
    private TarjetaCredito tarjetaCredito;
    private int puntosFidelidad;

    @Override
    public boolean procesarPago(double monto) {
        return tarjetaCredito.cobrar(monto);
    }

    @Override
    public void agregarPuntos(int puntos) {
        puntosFidelidad += puntos;
    }
}
```

---

# 9.6 Ley de Demeter

> "No hables con extraños"

Un objeto solo debería llamar métodos de:
- Sí mismo
- Sus parámetros
- Objetos que crea
- Sus componentes directos

### ❌ MAL: Violación de Ley de Demeter
```java
public class Pedido {
    private Cliente cliente;

    public String obtenerCiudadCliente() {
        // Encadenamiento excesivo: 3 niveles
        return cliente.getDireccion().getCiudad().getNombre();
    }
}
```

---

### ✅ BIEN: Respeta Ley de Demeter
```java
public class Cliente {
    private Direccion direccion;

    // Método de conveniencia que oculta la estructura interna
    public String obtenerCiudad() {
        return direccion.obtenerNombreCiudad();
    }
}

public class Pedido {
    private Cliente cliente;

    public String obtenerCiudadCliente() {
        // Solo un nivel de acceso
        return cliente.obtenerCiudad();
    }
}
```

---

# 9.7 Encapsulamiento Efectivo

### ❌ MAL: Expone demasiado
```java
public class CuentaBancaria {
    public double saldo;  // Público - cualquiera puede modificar
    public List<Double> movimientos;  // Mutable y público
}

// Uso problemático
CuentaBancaria cuenta = new CuentaBancaria();
cuenta.saldo = 1000000.0;  // ¡Fraude!
cuenta.movimientos.clear();  // ¡Borró el historial!
```
---

### ✅ BIEN: Encapsulamiento apropiado
```java
public class CuentaBancaria {
    private double saldo;
    private List<Movimiento> movimientos = new ArrayList<>();

    public double getSaldo() { return saldo; }

    public void depositar(double monto) {
        if (monto <= 0) throw new IllegalArgumentException("Monto debe ser positivo");
        saldo += monto;
        movimientos.add(new Movimiento("DEPOSITO", monto));
    }

    public boolean retirar(double monto) {
        if (monto <= 0) throw new IllegalArgumentException("Monto debe ser positivo");
        if (saldo >= monto) {
            saldo -= monto;
            movimientos.add(new Movimiento("RETIRO", monto));
            return true;
        }
        return false;
    }

    // Vista de solo lectura
    public List<Movimiento> getHistorial() {
        return Collections.unmodifiableList(movimientos);
    }
}
```

---

# 9.8 Favorecer Composición sobre Herencia

### ❌ CUESTIONABLE: Herencia para reutilizar código
```java
public class ArrayList {
    public void add(Object elemento) { }
    public void remove(Object elemento) { }
    public int size() { return 0; }
}

public class Pila extends ArrayList {
    public void push(Object elemento) { add(elemento); }
    public Object pop() {
        if (size() > 0) {
            Object elem = get(size() - 1);
            remove(elem);
            return elem;
        }
        return null;
    }
}
// Problema: Pila expone métodos de ArrayList que no deberían estar disponibles
```
---

### ✅ MEJOR: Composición
```java
public class Pila {
    private List<Object> elementos = new ArrayList<>();

    public void push(Object elemento) {
        elementos.add(elemento);
    }

    public Object pop() {
        if (!elementos.isEmpty()) {
            return elementos.remove(elementos.size() - 1);
        }
        return null;
    }

    public int size() { return elementos.size(); }
    public boolean isEmpty() { return elementos.isEmpty(); }
}
```

# 10 Conclusiones

## Puntos Clave para Recordar

### Sobre el Proceso:
- La identificación de clases es **iterativa**, no lineal
- Empieza simple y refina gradualmente
- No busques la perfección en la primera iteración
- Valida temprano y frecuentemente

### Sobre la Técnica:
- El análisis de sustantivos es una herramienta, no una receta mágica
- Requiere criterio y experiencia para filtrar candidatos
- Los verbos revelan métodos y relaciones
- El contexto del dominio es crucial

### Sobre el Diseño:
- Prioriza simplicidad sobre completitud prematura
- Alta cohesión y bajo acoplamiento son tus guías
- Responsabilidad única evita clases "Dios"
- Favorece composición sobre herencia cuando sea dudoso

---

# 10.1 El Viaje Continuo

No esperes dominar la identificación de clases inmediatamente. Es una habilidad que se desarrolla con:

- **Práctica deliberada** - Analiza múltiples enunciados
- **Estudio de casos** - Aprende de sistemas reales
- **Revisión por pares** - Otros ven lo que tú no ves
- **Refactorización** - Mejora modelos existentes

---

# 10.2 Próximos Pasos

Una vez que domines la identificación de clases, profundiza en:

1. **Patrones de diseño**
   - Creacionales: Factory, Builder, Singleton
   - Estructurales: Adapter, Decorator, Facade
   - Comportamiento: Strategy, Observer, Command

2. **Refactorización**
   - Extract Method, Extract Class
   - Move Method, Move Field

3. **Arquitectura de software**
   - Arquitectura en capas
   - Arquitectura hexagonal
   - Domain-Driven Design (DDD)

4. **Principios SOLID**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

---

# 11. Recursos y Referencias

## Libros Fundamentales

**Para principiantes:**
- **"UML Distilled" - Martin Fowler** (150 páginas, muy accesible)
- **"Head First Object-Oriented Analysis & Design"** (Aprendizaje visual)

**Para nivel intermedio:**
- **"Applying UML and Patterns" - Craig Larman**
- **"Object-Oriented Software Engineering" - Ivar Jacobson**

**Para nivel avanzado:**
- **"Domain-Driven Design" - Eric Evans**
- **"Patterns of Enterprise Application Architecture" - Martin Fowler**

---

# 11.1 Herramientas Recomendadas

## Para aprender:
- **Draw.io** - Gratuito, simple, sin instalación
- **PlantUML** - Texto a diagrama, perfecto para versionado

## Para proyectos profesionales:
- **Visual Paradigm Community Edition** - Completo y gratuito
- **StarUML** - Buena relación calidad-precio

## Recursos Online:
- [Visual Paradigm UML Tutorials](https://www.visual-paradigm.com/tutorials/)
- [Refactoring Guru - Design Patterns](https://refactoring.guru/es/design-patterns)
- Stack Overflow: tags `uml`, `class-diagram`, `oop-design`

---

# 12. Reflexión Final

## El Arte del Buen Diseño

> "Todo el mundo puede crear código que una computadora entienda. Los buenos programadores escriben código que los humanos puedan entender." - Martin Fowler

La identificación de clases es el primer paso para crear código comprensible. No busques la perfección - busca:
- ✅ Claridad
- ✅ Simplicidad
- ✅ Mantenibilidad

---

# 12.1 Última Recomendación

## Comienza tu próximo proyecto dibujando el diagrama de clases ANTES de escribir código.

Verás la diferencia.

---

# ¡Gracias!

## ¿Preguntas?

---
