---
marp: true
theme: default
paginate: true
size: 16:9
title: Tema 3 - Diseno Fisico de Bases de Datos (DDL)
description: 1o DAW - Bases de Datos
---

# Tema 3: Diseno Fisico de Bases de Datos (DDL)
### Del modelo relacional a tablas reales en PostgreSQL

**1o DAW - Bases de Datos**

---

# Objetivos de la unidad

Al terminar este tema, deberias poder:

- Explicar que es el diseno fisico de una BD relacional.
- Diferenciar `DDL`, `DML` y `DCL`.
- Crear y modificar objetos con SQL DDL.
- Aplicar restricciones para garantizar integridad.
- Tomar decisiones tecnicas con criterio (tipos, claves, indices, vistas).

> Idea clave: no solo memorizar comandos, sino entender por que se usan.

---

# 1) Introduccion al diseno fisico

- **Diseno conceptual**: describe el negocio (modelo E/R).
- **Diseno logico**: transforma a tablas, claves y relaciones (modelo relacional).
- **Diseno fisico**: implementa esa estructura en un SGBD concreto.

En esta fase decidimos:

- Sintaxis real (`PostgreSQL` en nuestro caso).
- Tipos de datos concretos.
- Restricciones, indices, vistas, secuencias.

`Mini recordatorio`: esto afecta a la **estructura**, no a los datos de negocio en si.

---

# Del E/R al SQL real

## Flujo de trabajo

`Modelo E/R -> Modelo relacional -> SQL DDL`

Ejemplo simplificado:

- Entidad `Usuario` (E/R)
- Tabla `usuarios(id_usuario, email, nombre, fecha_alta)` (logico)
- `CREATE TABLE usuarios (...)` (fisico en PostgreSQL)

Implementar una BD = convertir el diseno logico en objetos reales dentro del SGBD.

---

# Logico vs fisico: que decide cada nivel

| Decision | Diseno logico | Diseno fisico |
|---|---|---|
| Que entidades hay | Si | No |
| Que relaciones hay | Si | No |
| Tipo exacto (`VARCHAR(80)` o `TEXT`) | No | Si |
| Indices concretos | No | Si |
| Nombre final de restricciones | No | Si |

Pregunta rapida:

- Elegir que existe `Pedido` es logico o fisico.
- Elegir indice en `pedidos(fecha_pedido)` es logico o fisico.

---

# 2) Que es DDL y diferencia con DML y DCL

- `DDL` (**Data Definition Language**): crea o modifica estructura.
- `DML` (**Data Manipulation Language**): inserta, actualiza, elimina o consulta datos.
- `DCL` (**Data Control Language**): gestiona permisos.

| Lenguaje | Para que sirve | Ejemplo |
|---|---|---|
| `DDL` | Estructura | `CREATE TABLE` |
| `DML` | Datos | `INSERT`, `UPDATE`, `SELECT` |
| `DCL` | Seguridad | `GRANT`, `REVOKE` |

---

# Ejemplos minimos DDL, DML y DCL

```sql
-- DDL: crea estructura
CREATE TABLE categorias (
    id_categoria INTEGER PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL
);

-- DML: inserta datos
INSERT INTO categorias (id_categoria, nombre)
VALUES (1, 'Informatica');

-- DCL: da permiso de lectura
GRANT SELECT ON categorias TO alumno_lectura;
```

---

# 3) Objetos de base de datos

Objetos DDL habituales:

- **Tabla**: almacena datos en filas y columnas.
- **Vista**: consulta guardada que se usa como tabla virtual.
- **Indice**: estructura para acelerar busquedas.
- **Secuencia**: generador de numeros consecutivos.
- **Sinonimo**: alias de objeto (comun en Oracle).

`Nota`: PostgreSQL no tiene `CREATE SYNONYM` nativo como Oracle.

---

# Objetos con ejemplos rapidos

```sql
-- Tabla
CREATE TABLE clientes (
    id_cliente INTEGER PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL
);

-- Vista
CREATE VIEW v_clientes_activos AS
SELECT id_cliente, nombre
FROM clientes;

-- Indice
CREATE INDEX idx_clientes_nombre ON clientes(nombre);

-- Secuencia
CREATE SEQUENCE seq_facturas START 1 INCREMENT 1;
```

---

# 4) Reglas de nomenclatura y buenas practicas

Buenas practicas:

- Nombres descriptivos y consistentes.
- `snake_case` para tablas y columnas.
- Evitar palabras reservadas (`user`, `order`, `select`, ...).
- Mantener coherencia entre claves relacionadas (`id_usuario` en ambas tablas).
- Nombrar restricciones (`pk_`, `fk_`, `ck_`, `uq_`).

---

# Nombres recomendados vs poco recomendables

| Correcto | Poco recomendable | Motivo |
|---|---|---|
| `usuarios` | `tabla1` | No describe contenido |
| `fecha_alta` | `f1` | Poco legible |
| `id_producto` | `idprod` | Inconsistencia |
| `fk_pedidos_usuarios` | `fk1` | Dificil de mantener |

`Error tipico`: mezclar singular y plural sin criterio.

---

# 5) Crear base de datos y tablas

## `CREATE DATABASE`

```sql
-- Suele ejecutarse con usuario administrador
CREATE DATABASE tienda_daw;
```

## Conectar y crear esquema de trabajo

```sql
-- Ya dentro de la BD tienda_daw
CREATE SCHEMA IF NOT EXISTS ventas;
SET search_path TO ventas;
```

---

# `CREATE TABLE`: estructura basica

```sql
CREATE TABLE usuarios (
    id_usuario INTEGER,
    nombre VARCHAR(80),
    email VARCHAR(120)
);
```

Estructura general:

- Nombre de tabla.
- Lista de columnas.
- Tipo por columna.
- Restricciones opcionales.

`Mini recordatorio`: una mala estructura inicial cuesta mucho corregir despues.

---

# Tabla simple y tabla mas completa

```sql
-- Tabla simple
CREATE TABLE marcas (
    id_marca INTEGER PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL
);

-- Tabla mas completa
CREATE TABLE productos (
    id_producto INTEGER PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT true
);
```

---

# Tabla realista (base para todo el tema)

```sql
CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    fecha_alta DATE DEFAULT CURRENT_DATE,
    activo BOOLEAN DEFAULT true
);
```

A partir de aqui iremos construyendo:

- `usuarios`
- `productos`
- `pedidos`
- `lineas_pedido`

---

# 6) Tipos de datos en PostgreSQL

Tipos frecuentes:

- `INTEGER`: enteros.
- `NUMERIC(p,s)`: decimales exactos (dinero).
- `VARCHAR(n)`: texto con limite.
- `TEXT`: texto sin limite practico.
- `DATE`: fecha.
- `TIMESTAMP`: fecha y hora.
- `BOOLEAN`: `true` / `false`.

`Esto garantiza integridad`: elegir bien el tipo evita errores futuros.

---

# Cuando usar cada tipo (guia rapida)

| Tipo | Usalo para | Ejemplo |
|---|---|---|
| `INTEGER` | IDs, contadores | `stock` |
| `NUMERIC(10,2)` | importes y precios | `precio` |
| `VARCHAR(120)` | campos con longitud controlada | `email` |
| `TEXT` | descripciones largas | `descripcion` |
| `DATE` | solo fecha | `fecha_nacimiento` |
| `TIMESTAMP` | fecha y hora | `fecha_creacion` |
| `BOOLEAN` | estados binarios | `activo` |

---

# `VARCHAR` vs `TEXT`

```sql
CREATE TABLE ejemplo_texto (
    titulo VARCHAR(150),     -- Limita longitud maxima
    descripcion TEXT         -- Texto largo sin limite declarado
);
```

Comparacion simple:

- `VARCHAR(n)`: util cuando quieres imponer limite por negocio.
- `TEXT`: util cuando no quieres fijar limite estricto.

En PostgreSQL, rendimiento similar en muchos casos.

---

# `DATE` vs `TIMESTAMP`

```sql
CREATE TABLE auditoria_demo (
    fecha_evento DATE,               -- Ej: 2026-03-24
    instante_evento TIMESTAMP        -- Ej: 2026-03-24 10:15:00
);
```

- `DATE`: cuando la hora no importa.
- `TIMESTAMP`: cuando necesitas orden exacto en el tiempo.

Pregunta de comprobacion:

- Para fecha de nacimiento, que usarias.
- Para registro de login, que usarias.

---

# 7) Valores por defecto (`DEFAULT`)

`DEFAULT` se aplica cuando no envias valor en el `INSERT`.

```sql
CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    activo BOOLEAN DEFAULT true,
    fecha_alta DATE DEFAULT CURRENT_DATE
);
```

Ventajas:

- Menos errores manuales.
- Comportamiento consistente.
- Codigo de aplicacion mas simple.

---

# 8) Restricciones: vision general

Una restriccion es una regla que la BD obliga a cumplir.

- Protege integridad de datos.
- Evita datos invalidos.
- Reduce errores en aplicacion.

Puede declararse:

- A nivel de columna.
- A nivel de tabla.

`Mini recordatorio`: esto garantiza integridad.

---

# Resumen de restricciones clave

| Restriccion | Funcion |
|---|---|
| `NOT NULL` | Obliga a informar valor |
| `UNIQUE` | Evita duplicados |
| `PRIMARY KEY` | Identifica cada fila |
| `FOREIGN KEY` | Asegura relacion valida |
| `CHECK` | Valida condiciones personalizadas |
| `DEFAULT` | Asigna valor automatico |

---

# 9) Restriccion `NOT NULL`

```sql
CREATE TABLE categorias (
    id_categoria INTEGER PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL
);
```

Error tipico:

```sql
INSERT INTO categorias (id_categoria, nombre)
VALUES (10, NULL); -- ERROR: viola NOT NULL
```

Caso practico: `email`, `nombre`, `precio` suelen ser `NOT NULL`.

---

# 10) Restriccion `UNIQUE`

`UNIQUE` evita repetidos, pero permite varios `NULL` segun SGBD.

```sql
CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY,
    email VARCHAR(120) UNIQUE
);
```

Diferencia con `PRIMARY KEY`:

- `PRIMARY KEY`: unica + no nula + una por tabla.
- `UNIQUE`: unica, puede haber varias por tabla.

---

# 11) Restriccion `PRIMARY KEY`

```sql
-- Clave primaria simple
CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL
);
```

```sql
-- Clave primaria compuesta
CREATE TABLE matriculas (
    id_alumno INTEGER,
    id_modulo INTEGER,
    curso CHAR(9),
    CONSTRAINT pk_matriculas PRIMARY KEY (id_alumno, id_modulo, curso)
);
```

---

# PK simple vs PK compuesta

| Tipo | Cuando usar |
|---|---|
| Simple (`id_usuario`) | Una sola columna identifica de forma natural o artificial |
| Compuesta (`id_pedido, id_producto`) | La unicidad depende de combinacion de columnas |

`Error tipico`: poner PK compuesta cuando realmente conviene un ID artificial + `UNIQUE`.

---

# 12) Restriccion `CHECK`

Sirve para validar reglas de negocio.

```sql
CREATE TABLE productos (
    id_producto INTEGER PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    CONSTRAINT ck_productos_precio CHECK (precio > 0),
    CONSTRAINT ck_productos_estado CHECK (estado IN ('pendiente', 'enviado', 'entregado'))
);
```

---

# 13) Restriccion `FOREIGN KEY`

Integridad referencial: el valor hijo debe existir en tabla padre.

```sql
CREATE TABLE pedidos (
    id_pedido INTEGER PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pedidos_usuarios
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);
```

Si `id_usuario` no existe en `usuarios`, el `INSERT` falla.

---

# ON DELETE: CASCADE, SET NULL, RESTRICT

```sql
-- Opcion 1: borra hijos automaticamente
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE

-- Opcion 2: pone FK a NULL
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL

-- Opcion 3: bloquea borrado si hay hijos
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT
```

Comparativa:

- `CASCADE`: comodo, pero peligroso si no controlas.
- `SET NULL`: conserva historico, requiere columna nullable.
- `RESTRICT` (o comportamiento por defecto en muchos casos): mas seguro.

---

# 14) Ejemplo completo guiado: modelo tienda

Vamos a crear un ejemplo coherente y evolutivo:

- Un `usuario` hace `pedidos`.
- Cada `pedido` tiene varias `lineas_pedido`.
- Cada linea referencia un `producto`.

Objetivo:

- Aplicar tipos, defaults y restricciones reales.
- Entender orden correcto de creacion.

---

# Paso 1: crear `usuarios`

```sql
CREATE TABLE usuarios (
    id_usuario INTEGER GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL,
    fecha_alta DATE DEFAULT CURRENT_DATE,
    activo BOOLEAN DEFAULT true,
    CONSTRAINT pk_usuarios PRIMARY KEY (id_usuario),
    CONSTRAINT uq_usuarios_email UNIQUE (email)
);
```

---

# Paso 2: crear `productos`

```sql
CREATE TABLE productos (
    id_producto INTEGER GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR(120) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT true,
    CONSTRAINT pk_productos PRIMARY KEY (id_producto),
    CONSTRAINT ck_productos_precio CHECK (precio > 0),
    CONSTRAINT ck_productos_stock CHECK (stock >= 0)
);
```

---

# Paso 3: crear `pedidos`

```sql
CREATE TABLE pedidos (
    id_pedido INTEGER GENERATED ALWAYS AS IDENTITY,
    id_usuario INTEGER NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente',
    total NUMERIC(12,2) DEFAULT 0,
    CONSTRAINT pk_pedidos PRIMARY KEY (id_pedido),
    CONSTRAINT fk_pedidos_usuarios
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE RESTRICT,
    CONSTRAINT ck_pedidos_estado CHECK (estado IN ('pendiente', 'pagado', 'enviado', 'entregado')),
    CONSTRAINT ck_pedidos_total CHECK (total >= 0)
);
```

---

# Paso 4: crear `lineas_pedido`

```sql
CREATE TABLE lineas_pedido (
    id_pedido INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL,
    CONSTRAINT pk_lineas_pedido PRIMARY KEY (id_pedido, id_producto),
    CONSTRAINT fk_lineas_pedido_pedidos
        FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido)
        ON DELETE CASCADE,
    CONSTRAINT fk_lineas_pedido_productos
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
        ON DELETE RESTRICT,
    CONSTRAINT ck_lineas_cantidad CHECK (cantidad > 0),
    CONSTRAINT ck_lineas_precio CHECK (precio_unitario > 0)
);
```

`Esto garantiza integridad`: no hay linea sin pedido ni sin producto.

---

# Mini ejercicio integrado (2 min)

1. Que pasaria si intentas crear `pedidos` antes de `usuarios`.
2. Que `ON DELETE` pondrias entre `pedidos` y `lineas_pedido`.
3. Que campo marcarias como `UNIQUE` en `usuarios` y por que.

Comprobacion rapida con datos:

```sql
-- Inserta un usuario valido
INSERT INTO usuarios (nombre, email) VALUES ('Ana Ruiz', 'ana@daw.test');

-- Prueba error de FK (id_usuario inexistente)
INSERT INTO pedidos (id_usuario) VALUES (9999); -- Debe fallar
```

---

# 15) Comentarios sobre tablas y columnas

Los comentarios documentan el esquema dentro de la BD.

```sql
COMMENT ON TABLE pedidos IS
'Tabla de pedidos de clientes de la tienda online';

COMMENT ON COLUMN pedidos.estado IS
'Estado del pedido: pendiente, pagado, enviado o entregado';
```

Ventaja:

- Facilita mantenimiento.
- Ayuda al equipo y a herramientas de documentacion.

---

# 16) Modificacion con `ALTER TABLE`

Operaciones frecuentes:

- Anadir columnas.
- Cambiar tipo de dato.
- Establecer o quitar `NOT NULL`.
- Eliminar columnas.

```sql
-- 1) Anadir columna
ALTER TABLE usuarios
ADD COLUMN telefono VARCHAR(20);

-- 2) Ampliar longitud
ALTER TABLE usuarios
ALTER COLUMN nombre TYPE VARCHAR(120);

-- 3) Eliminar columna innecesaria
ALTER TABLE usuarios
DROP COLUMN telefono;
```

---

# Ejercicios cortos de ALTER TABLE

```sql
-- A) Anade una columna de fecha de nacimiento a usuarios
ALTER TABLE usuarios
ADD COLUMN fecha_nacimiento DATE;

-- B) Amplia email a 180 caracteres
ALTER TABLE usuarios
ALTER COLUMN email TYPE VARCHAR(180);

-- C) Elimina una columna de pruebas
ALTER TABLE usuarios
DROP COLUMN IF EXISTS columna_test;
```

Pregunta de comprobacion:

- Que comando cambiaria estructura sin tocar filas existentes.

---

# 17) Gestion de restricciones con ALTER TABLE

`ADD CONSTRAINT` y `DROP CONSTRAINT`:

```sql
-- Anadir restriccion despues de crear la tabla
ALTER TABLE productos
ADD CONSTRAINT uq_productos_nombre UNIQUE (nombre);

-- Eliminar restriccion
ALTER TABLE productos
DROP CONSTRAINT uq_productos_nombre;
```

Crear dentro de `CREATE TABLE` vs despues:

- Dentro: mas limpio al crear desde cero.
- Despues: util en migraciones y cambios evolutivos.

---

# Nota sobre ENABLE / DISABLE

- En Oracle se puede `ENABLE` / `DISABLE CONSTRAINT`.
- En PostgreSQL no existe ese comando igual.
- Alternativas en PostgreSQL:

```sql
-- Crear FK sin validar historico al principio
ALTER TABLE pedidos
ADD CONSTRAINT fk_pedidos_usuarios
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
NOT VALID;

-- Validar cuando te convenga
ALTER TABLE pedidos
VALIDATE CONSTRAINT fk_pedidos_usuarios;
```

---

# 18) Renombrado y eliminacion de objetos

```sql
-- Renombrar tabla
ALTER TABLE productos RENAME TO articulos;

-- Volver al nombre original (si quieres)
ALTER TABLE articulos RENAME TO productos;

-- Borrar tabla completa (estructura + datos)
DROP TABLE IF EXISTS lineas_pedido;
```

`Cuidado`: `DROP` elimina el objeto completo.

---

# `DROP TABLE` vs `TRUNCATE`

| Comando | Que elimina | Estructura |
|---|---|---|
| `TRUNCATE TABLE pedidos;` | Filas | Se mantiene |
| `DROP TABLE pedidos;` | Filas + tabla | Se elimina |

`Error tipico`: usar `DROP` cuando solo querias vaciar datos de pruebas.

---

# 19) Indices

Que es un indice:

- Estructura auxiliar que acelera busquedas.
- Similar a indice de libro: evita leer todo.

Ventajas:

- Mejora rendimiento de `WHERE`, `JOIN`, `ORDER BY` (segun caso).

Inconvenientes basicos:

- Ocupa espacio.
- Hace mas lentos `INSERT/UPDATE/DELETE` al tener que mantenerlo.

`Mini recordatorio`: esto mejora rendimiento.

---

# Crear indices con criterio

```sql
-- Indice para busquedas por email
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Indice para consultas por fecha de pedido
CREATE INDEX idx_pedidos_fecha ON pedidos(fecha_pedido);
```

Sin indice: escaneo completo de tabla.
Con indice: acceso mas rapido (cuando el planificador lo considera util).

Mini pregunta:

- Pondrias indice en una columna booleana con solo dos valores.

---

# 20) Vistas

Una vista es una consulta guardada.

- Simplifica consultas repetidas.
- Puede ocultar complejidad.
- Puede limitar acceso a columnas sensibles.

```sql
CREATE VIEW v_resumen_pedidos AS
SELECT p.id_pedido,
       u.nombre AS cliente,
       p.fecha_pedido,
       p.estado,
       p.total
FROM pedidos p
JOIN usuarios u ON u.id_usuario = p.id_usuario;
```

---

# 21) Secuencias

Que es una secuencia:

- Objeto que genera numeros incrementales.
- Muy util para IDs.

```sql
CREATE SEQUENCE seq_facturas START WITH 1000 INCREMENT BY 1;

-- Uso manual
SELECT nextval('seq_facturas');
```

En PostgreSQL tambien puedes usar:

- `GENERATED ... AS IDENTITY` (recomendado hoy).
- `SERIAL` (forma historica).

---

# 22) Diccionario de datos

El diccionario de datos guarda metadatos:

- Tablas y vistas existentes.
- Columnas y tipos.
- Restricciones.
- Indices y definiciones.

Por que importa:

- Permite auditar y documentar estructura real.
- Facilita mantenimiento y troubleshooting.

Conceptualmente equivalente a vistas de catalogo en Oracle.

---

# Consultas utiles al diccionario (PostgreSQL)

```sql
-- 1) Ver tablas del esquema actual
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'ventas'
ORDER BY table_name;

-- 2) Ver columnas y tipos de una tabla
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'ventas'
  AND table_name = 'pedidos'
ORDER BY ordinal_position;
```

---

# Mas consultas de diccionario

```sql
-- 3) Ver restricciones de una tabla
SELECT tc.constraint_name,
       tc.constraint_type,
       kcu.column_name
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
 AND tc.table_schema = kcu.table_schema
WHERE tc.table_schema = 'ventas'
  AND tc.table_name = 'pedidos'
ORDER BY tc.constraint_type, tc.constraint_name;
```

---

# 23) Errores frecuentes del alumnado

- Olvidar una coma entre columnas en `CREATE TABLE`.
- Elegir tipo inadecuado (`TEXT` para importes en vez de `NUMERIC`).
- Crear una FK antes de crear la tabla padre.
- Confundir `PRIMARY KEY` con `UNIQUE`.
- Usar `DROP` cuando querian `TRUNCATE`.
- No decidir que columnas deben ser `NOT NULL`.

Consejo docente:

- Lee el error completo del SGBD y localiza linea exacta.

---

# Ejemplos de errores y correccion

```sql
-- ERROR 1: falta coma
CREATE TABLE prueba (
    id INTEGER PRIMARY KEY
    nombre VARCHAR(50) NOT NULL
);
```

```sql
-- ERROR 2: FK a tabla inexistente (orden incorrecto)
CREATE TABLE pedidos (
    id_pedido INTEGER PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id_usuario)
);
```

Solucion: crear primero `usuarios` y luego `pedidos`.

---

# 24) Resumen final

Hoy has visto como:

- El diseno logico se convierte en estructura real con `DDL`.
- `CREATE`, `ALTER`, `DROP`, `TRUNCATE` cambian el esquema.
- Restricciones (`PK`, `FK`, `CHECK`, `NOT NULL`, `UNIQUE`) garantizan integridad.
- Indices mejoran rendimiento y vistas simplifican consultas.
- El diccionario de datos ayuda a inspeccionar y documentar la BD.

---

# Comandos imprescindibles del tema

```sql
CREATE DATABASE ...;
CREATE TABLE ...;
ALTER TABLE ... ADD COLUMN ...;
ALTER TABLE ... ADD CONSTRAINT ...;
ALTER TABLE ... DROP CONSTRAINT ...;
CREATE INDEX ... ON ... (...);
CREATE VIEW ... AS SELECT ...;
CREATE SEQUENCE ...;
COMMENT ON TABLE ... IS '...';
DROP TABLE ...;
TRUNCATE TABLE ...;
```

Checklist mental:

- Estructura correcta.
- Restricciones bien pensadas.
- Orden de creacion coherente.

---

# 25) Actividad final propuesta (practica guiada)

Contexto: tienda online de material informatico.

Tareas:

1. Crear BD y esquema `ventas`.
2. Crear tablas `usuarios`, `productos`, `pedidos`, `lineas_pedido`.
3. Usar tipos correctos (`NUMERIC`, `DATE`, `TIMESTAMP`, `BOOLEAN`).
4. Anadir `NOT NULL`, `UNIQUE`, `PK`, `FK`, `CHECK`, `DEFAULT`.
5. Modificar estructura con `ALTER TABLE` (anadir y cambiar columna).
6. Crear al menos un indice y una vista de resumen.
7. Consultar diccionario para listar tablas, columnas y restricciones.

Entrega:

- Script SQL comentado y ordenado por fases.
- Capturas o salida de consultas de verificacion.

---

# Mini autoevaluacion final

Responde sin mirar apuntes:

- Que diferencia exacta hay entre `UNIQUE` y `PRIMARY KEY`.
- Cuando usarias `TRUNCATE` en vez de `DROP`.
- Que `ON DELETE` pondrias en `lineas_pedido` y por que.
- Que decision es logica y cual fisica en tu propio ejemplo.

Si puedes justificar cada respuesta, vas por buen camino.
