---
marp: true
theme: default
paginate: true
size: 16:9
title: Tema 3 - Diseno Fisico de Bases de Datos (DDL) en Oracle
description: 1o DAW - Bases de Datos
---

# Tema 3: Diseno Fisico de Bases de Datos (DDL)
### Del modelo relacional a tablas reales en Oracle

**1o DAW - Bases de Datos**

---

# Objetivos de la unidad

Al terminar este tema, deberias poder:

- Explicar que es el diseno fisico de una BD relacional.
- Diferenciar `DDL`, `DML` y `DCL`.
- Crear y modificar objetos con SQL DDL en Oracle.
- Aplicar restricciones para garantizar integridad.
- Tomar decisiones tecnicas con criterio (tipos, claves, indices, vistas y secuencias).

> Idea clave: no solo memorizar comandos, sino entender por que se usan.

---

# 1) Introduccion al diseno fisico

- **Diseno conceptual**: describe el negocio (modelo E/R).
- **Diseno logico**: transforma a tablas, claves y relaciones (modelo relacional).
- **Diseno fisico**: implementa esa estructura en un SGBD concreto.

En esta fase decidimos:

- Sintaxis real (`Oracle` en nuestro caso).
- Tipos de datos concretos.
- Restricciones, indices, vistas, secuencias y sinonimos.

`Mini recordatorio`: esto afecta a la **estructura**, no a los datos de negocio en si.

---

# Del E/R al SQL real

## Flujo de trabajo

`Modelo E/R -> Modelo relacional -> SQL DDL`

Ejemplo simplificado:

- Entidad `Usuario` (E/R)
- Tabla `usuarios(id_usuario, email, nombre, fecha_alta)` (logico)
- `CREATE TABLE usuarios (...)` (fisico en Oracle)

Implementar una BD = convertir el diseno logico en objetos reales dentro del SGBD.

---

# Logico vs fisico: que decide cada nivel

| Decision | Diseno logico | Diseno fisico |
|---|---|---|
| Que entidades hay | Si | No |
| Que relaciones hay | Si | No |
| Tipo exacto (`VARCHAR2(80)` o `CLOB`) | No | Si |
| Indices concretos | No | Si |
| Nombre final de restricciones | No | Si |

Pregunta rapida:

- Elegir que existe `Pedido` es logico o fisico.
- Elegir un indice en `pedidos(fecha_pedido)` es logico o fisico.

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
    id_categoria NUMBER PRIMARY KEY,
    nombre VARCHAR2(60) NOT NULL
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
- **Sinonimo**: alias de objeto.

`Nota didactica`: en Oracle `CREATE SYNONYM` si existe y se usa mucho para simplificar nombres.

---

# Objetos con ejemplos rapidos

```sql
-- Tabla
CREATE TABLE clientes (
    id_cliente NUMBER PRIMARY KEY,
    nombre VARCHAR2(80) NOT NULL
);

-- Vista
CREATE VIEW v_clientes_activos AS
SELECT id_cliente, nombre
FROM clientes;

-- Indice
CREATE INDEX idx_clientes_nombre ON clientes(nombre);

-- Secuencia
CREATE SEQUENCE seq_facturas START WITH 1 INCREMENT BY 1;

-- Sinonimo
CREATE SYNONYM cli FOR clientes;
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

# 5) Crear estructura de trabajo en Oracle

## En Oracle no se trabaja igual con `CREATE DATABASE`

- En el trabajo diario normalmente usamos una BD Oracle ya creada.
- Lo habitual es crear un **usuario**, que a la vez actua como **esquema**.

```sql
CREATE USER ventas IDENTIFIED BY ventas123;
GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW,
      CREATE SEQUENCE, CREATE SYNONYM, CREATE TRIGGER TO ventas;
ALTER USER ventas QUOTA UNLIMITED ON USERS;
```

> Idea clave: en Oracle, **usuario y esquema** suelen ir juntos.

---

# Equivalente al esquema de trabajo

```sql
-- Opcion habitual: conectarte como el propio usuario ventas
-- O cambiar el esquema actual en la sesion
ALTER SESSION SET CURRENT_SCHEMA = ventas;
```

Comparacion didactica:

- En PostgreSQL era frecuente usar `CREATE SCHEMA` y `SET search_path`.
- En Oracle el concepto equivalente es trabajar dentro del usuario/esquema correcto.

---

# `CREATE TABLE`: estructura basica

```sql
CREATE TABLE usuarios (
    id_usuario NUMBER,
    nombre VARCHAR2(80),
    email VARCHAR2(120)
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
    id_marca NUMBER PRIMARY KEY,
    nombre VARCHAR2(60) NOT NULL
);

-- Tabla mas completa
CREATE TABLE productos (
    id_producto NUMBER PRIMARY KEY,
    nombre VARCHAR2(120) NOT NULL,
    precio NUMBER(10,2) NOT NULL,
    stock NUMBER DEFAULT 0,
    activo NUMBER(1) DEFAULT 1 CHECK (activo IN (0,1))
);
```

---

# Tabla realista (base para todo el tema)

```sql
CREATE TABLE usuarios (
    id_usuario NUMBER PRIMARY KEY,
    nombre VARCHAR2(80) NOT NULL,
    email VARCHAR2(120) NOT NULL UNIQUE,
    fecha_alta DATE DEFAULT SYSDATE,
    activo NUMBER(1) DEFAULT 1 CHECK (activo IN (0,1))
);
```

A partir de aqui iremos construyendo:

- `usuarios`
- `productos`
- `pedidos`
- `lineas_pedido`

---

# 6) Tipos de datos en Oracle

Tipos frecuentes:

- `NUMBER`: enteros y decimales.
- `NUMBER(p,s)`: decimales exactos (dinero).
- `VARCHAR2(n)`: texto con limite.
- `CLOB`: texto largo.
- `DATE`: fecha y hora basica.
- `TIMESTAMP`: fecha y hora con mas precision.
- `NUMBER(1)` o `CHAR(1)`: alternativa habitual para valores tipo verdadero/falso.

`Nota didactica`: en tablas Oracle no usamos `BOOLEAN` como en PostgreSQL.

---

# Cuando usar cada tipo (guia rapida)

| Tipo | Usalo para | Ejemplo |
|---|---|---|
| `NUMBER` | IDs, contadores | `stock` |
| `NUMBER(10,2)` | importes y precios | `precio` |
| `VARCHAR2(120)` | campos con longitud controlada | `email` |
| `CLOB` | descripciones largas | `descripcion` |
| `DATE` | fechas y registros generales | `fecha_nacimiento` |
| `TIMESTAMP` | auditoria mas precisa | `fecha_creacion` |
| `NUMBER(1)` | estados binarios | `activo` |

---

# `VARCHAR2` vs `CLOB`

```sql
CREATE TABLE ejemplo_texto (
    titulo VARCHAR2(150),   -- Limita longitud maxima
    descripcion CLOB        -- Texto largo
);
```

Comparacion simple:

- `VARCHAR2(n)`: util cuando quieres imponer limite por negocio.
- `CLOB`: util cuando el texto puede ser muy extenso.

---

# `DATE` vs `TIMESTAMP` en Oracle

```sql
CREATE TABLE auditoria_demo (
    fecha_evento DATE,
    instante_evento TIMESTAMP
);
```

- `DATE`: guarda fecha y hora con precision de segundos.
- `TIMESTAMP`: guarda fecha y hora con mayor precision.

`Nota importante`: aqui Oracle difiere un poco; `DATE` no es solo dia/mes/ano.

---

# Pregunta de comprobacion

Piensa un momento:

- Para `fecha_nacimiento`, que tipo usarias.
- Para registrar un login exacto, `DATE` o `TIMESTAMP`.

> Lo importante es justificar la decision tecnica.

---

# 7) Valores por defecto (`DEFAULT`)

`DEFAULT` se aplica cuando no envias valor en el `INSERT`.

```sql
CREATE TABLE usuarios (
    id_usuario NUMBER PRIMARY KEY,
    nombre VARCHAR2(80) NOT NULL,
    activo NUMBER(1) DEFAULT 1,
    fecha_alta DATE DEFAULT SYSDATE
);
```

Ventajas:

- Menos errores manuales.
- Comportamiento consistente.
- Codigo de aplicacion mas simple.

`Nota`: `CURRENT_DATE` tambien es valido en Oracle; `SYSDATE` es muy habitual.

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
    id_categoria NUMBER PRIMARY KEY,
    nombre VARCHAR2(60) NOT NULL
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

`UNIQUE` evita repetidos.

```sql
CREATE TABLE usuarios (
    id_usuario NUMBER PRIMARY KEY,
    email VARCHAR2(120) UNIQUE
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
    id_usuario NUMBER PRIMARY KEY,
    nombre VARCHAR2(80) NOT NULL
);
```

```sql
-- Clave primaria compuesta
CREATE TABLE matriculas (
    id_alumno NUMBER,
    id_modulo NUMBER,
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
    id_producto NUMBER PRIMARY KEY,
    nombre VARCHAR2(120) NOT NULL,
    precio NUMBER(10,2) NOT NULL,
    estado VARCHAR2(20) NOT NULL,
    CONSTRAINT ck_productos_precio CHECK (precio > 0),
    CONSTRAINT ck_productos_estado CHECK (estado IN ('pendiente', 'enviado', 'entregado'))
);
```

---

# 13) Restriccion `FOREIGN KEY`

Integridad referencial: el valor hijo debe existir en la tabla padre.

```sql
CREATE TABLE pedidos (
    id_pedido NUMBER PRIMARY KEY,
    id_usuario NUMBER NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_pedidos_usuarios
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);
```

Si `id_usuario` no existe en `usuarios`, el `INSERT` falla.

---

# ON DELETE: `CASCADE`, `SET NULL` y comportamiento por defecto

```sql
-- Opcion 1: borra hijos automaticamente
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE

-- Opcion 2: pone FK a NULL
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL

-- Opcion 3: no indicar nada
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
```

Comparativa:

- `CASCADE`: comodo, pero peligroso si no controlas.
- `SET NULL`: conserva historico, requiere columna nullable.
- Sin clausula: Oracle bloquea el borrado si hay hijos.

---

# 14) Ejemplo completo guiado: modelo tienda

Vamos a crear un ejemplo coherente y evolutivo:

- Un `usuario` hace `pedidos`.
- Cada `pedido` tiene varias `lineas_pedido`.
- Cada linea referencia un `producto`.

Objetivo:

- Aplicar tipos, defaults y restricciones reales.
- Entender el orden correcto de creacion.

---

# Paso 1: crear `usuarios`

```sql
CREATE TABLE usuarios (
    id_usuario NUMBER GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR2(80) NOT NULL,
    email VARCHAR2(120) NOT NULL,
    fecha_alta DATE DEFAULT SYSDATE,
    activo NUMBER(1) DEFAULT 1,
    CONSTRAINT pk_usuarios PRIMARY KEY (id_usuario),
    CONSTRAINT uq_usuarios_email UNIQUE (email),
    CONSTRAINT ck_usuarios_activo CHECK (activo IN (0,1))
);
```

---

# Paso 2: crear `productos`

```sql
CREATE TABLE productos (
    id_producto NUMBER GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR2(120) NOT NULL,
    precio NUMBER(10,2) NOT NULL,
    stock NUMBER DEFAULT 0,
    activo NUMBER(1) DEFAULT 1,
    CONSTRAINT pk_productos PRIMARY KEY (id_producto),
    CONSTRAINT ck_productos_precio CHECK (precio > 0),
    CONSTRAINT ck_productos_stock CHECK (stock >= 0),
    CONSTRAINT ck_productos_activo CHECK (activo IN (0,1))
);
```

---

# Paso 3: crear `pedidos`

```sql
CREATE TABLE pedidos (
    id_pedido NUMBER GENERATED ALWAYS AS IDENTITY,
    id_usuario NUMBER NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR2(20) DEFAULT 'pendiente',
    total NUMBER(12,2) DEFAULT 0,
    CONSTRAINT pk_pedidos PRIMARY KEY (id_pedido),
    CONSTRAINT fk_pedidos_usuarios
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),
    CONSTRAINT ck_pedidos_estado CHECK (estado IN ('pendiente', 'pagado', 'enviado', 'entregado')),
    CONSTRAINT ck_pedidos_total CHECK (total >= 0)
);
```

`Idea clave`: al no poner `ON DELETE CASCADE`, Oracle impedira borrar un usuario con pedidos asociados.

---

# Paso 4: crear `lineas_pedido`

```sql
CREATE TABLE lineas_pedido (
    id_pedido NUMBER NOT NULL,
    id_producto NUMBER NOT NULL,
    cantidad NUMBER NOT NULL,
    precio_unitario NUMBER(10,2) NOT NULL,
    CONSTRAINT pk_lineas_pedido PRIMARY KEY (id_pedido, id_producto),
    CONSTRAINT fk_lineas_pedido_pedidos
        FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido)
        ON DELETE CASCADE,
    CONSTRAINT fk_lineas_pedido_productos
        FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto),
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

Ventajas:

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
ADD telefono VARCHAR2(20);

-- 2) Ampliar longitud
ALTER TABLE usuarios
MODIFY nombre VARCHAR2(120);

-- 3) Eliminar columna innecesaria
ALTER TABLE usuarios
DROP COLUMN telefono;
```

---

# Ejercicios cortos de `ALTER TABLE`

```sql
-- A) Anade una columna de fecha de nacimiento a usuarios
ALTER TABLE usuarios
ADD fecha_nacimiento DATE;

-- B) Amplia email a 180 caracteres
ALTER TABLE usuarios
MODIFY email VARCHAR2(180);

-- C) Elimina una columna de pruebas
ALTER TABLE usuarios
DROP COLUMN columna_test;
```

Pregunta de comprobacion:

- Que comando cambiaria la estructura sin tocar las filas existentes.

---

# 17) Gestion de restricciones con `ALTER TABLE`

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

# Activar y desactivar restricciones en Oracle

En Oracle si existe `ENABLE` / `DISABLE CONSTRAINT`.

```sql
ALTER TABLE pedidos
DISABLE CONSTRAINT fk_pedidos_usuarios;

ALTER TABLE pedidos
ENABLE CONSTRAINT fk_pedidos_usuarios;
```

`Nota didactica`: para casos avanzados tambien existe `ENABLE NOVALIDATE`, pero no funciona igual que el `NOT VALID` de PostgreSQL.

---

# 18) Renombrado y eliminacion de objetos

```sql
-- Renombrar tabla
RENAME productos TO articulos;

-- Volver al nombre original (si quieres)
RENAME articulos TO productos;

-- Borrar tabla completa (estructura + datos)
DROP TABLE lineas_pedido CASCADE CONSTRAINTS;
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
- Similar al indice de un libro: evita leer todo.

Ventajas:

- Mejora rendimiento de `WHERE`, `JOIN` y `ORDER BY` en muchos casos.

Inconvenientes basicos:

- Ocupa espacio.
- Hace mas lentos `INSERT/UPDATE/DELETE` porque tambien hay que mantenerlo.

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
Con indice: acceso mas rapido cuando el optimizador lo considera util.

Mini pregunta:

- Pondrias un indice en una columna con solo dos valores posibles.

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
- Muy util para IDs en Oracle.

```sql
CREATE SEQUENCE seq_facturas START WITH 1000 INCREMENT BY 1;

-- Uso manual
SELECT seq_facturas.NEXTVAL
FROM dual;
```

`Idea clave`: en Oracle `dual` se usa mucho en consultas de apoyo como esta.

---

# Identity vs secuencia + trigger

Dos formas habituales de generar IDs en Oracle:

```sql
-- Opcion actual (Oracle 12c+)
id_usuario NUMBER GENERATED ALWAYS AS IDENTITY
```

```sql
-- Opcion clasica
CREATE SEQUENCE seq_usuarios START WITH 1 INCREMENT BY 1;
```

- **Identity**: mas simple para casos normales.
- **Secuencia + trigger**: muy comun en sistemas heredados.

---

# Ejemplo breve de secuencia + trigger

```sql
CREATE OR REPLACE TRIGGER bi_usuarios
BEFORE INSERT ON usuarios
FOR EACH ROW
BEGIN
    IF :NEW.id_usuario IS NULL THEN
        :NEW.id_usuario := seq_usuarios.NEXTVAL;
    END IF;
END;
/
```

`Pregunta de comprobacion`: si tu version de Oracle es moderna, cual de las dos opciones elegirias.

---

# 22) Diccionario de datos en Oracle

El diccionario de datos guarda metadatos:

- Tablas y vistas existentes.
- Columnas y tipos.
- Restricciones.
- Indices y definiciones.

Por que importa:

- Permite auditar y documentar estructura real.
- Facilita mantenimiento y troubleshooting.

---

# Consultas utiles al diccionario

```sql
-- 1) Ver tablas del usuario actual
SELECT table_name
FROM user_tables
ORDER BY table_name;

-- 2) Ver columnas y tipos de una tabla
SELECT column_name, data_type, nullable
FROM user_tab_columns
WHERE table_name = 'PEDIDOS'
ORDER BY column_id;
```

`Nota`: Oracle suele guardar estos nombres en mayusculas.

---

# Mas consultas de diccionario

```sql
-- 3) Ver restricciones de una tabla
SELECT uc.constraint_name,
       uc.constraint_type,
       ucc.column_name
FROM user_constraints uc
LEFT JOIN user_cons_columns ucc
  ON uc.constraint_name = ucc.constraint_name
WHERE uc.table_name = 'PEDIDOS'
ORDER BY uc.constraint_type, uc.constraint_name;
```

---

# 23) Errores frecuentes del alumnado

- Olvidar una coma entre columnas en `CREATE TABLE`.
- Elegir tipo inadecuado (`CLOB` para importes en vez de `NUMBER`).
- Crear una FK antes de crear la tabla padre.
- Confundir `PRIMARY KEY` con `UNIQUE`.
- Usar `DROP` cuando querian `TRUNCATE`.
- No decidir que columnas deben ser `NOT NULL`.

Consejo docente:

- Lee el error completo del SGBD y localiza la linea exacta.

---

# Ejemplos de errores y correccion

```sql
-- ERROR 1: falta coma
CREATE TABLE prueba (
    id NUMBER PRIMARY KEY
    nombre VARCHAR2(50) NOT NULL
);
```

```sql
-- ERROR 2: FK a tabla inexistente (orden incorrecto)
CREATE TABLE pedidos (
    id_pedido NUMBER PRIMARY KEY,
    id_usuario NUMBER REFERENCES usuarios(id_usuario)
);
```

Solucion: crear primero `usuarios` y luego `pedidos`.

---

# 24) Resumen final

Hoy has visto como:

- El diseno logico se convierte en estructura real con `DDL`.
- `CREATE`, `ALTER`, `DROP` y `TRUNCATE` cambian el esquema.
- Restricciones (`PK`, `FK`, `CHECK`, `NOT NULL`, `UNIQUE`) garantizan integridad.
- Indices mejoran rendimiento y vistas simplifican consultas.
- Secuencias e `IDENTITY` resuelven la generacion de IDs en Oracle.
- El diccionario de datos ayuda a inspeccionar y documentar la BD.

---

# Comandos imprescindibles del tema

```sql
CREATE USER ...;
ALTER SESSION SET CURRENT_SCHEMA = ...;
CREATE TABLE ...;
ALTER TABLE ... ADD ...;
ALTER TABLE ... ADD CONSTRAINT ...;
ALTER TABLE ... DROP CONSTRAINT ...;
CREATE INDEX ... ON ... (...);
CREATE VIEW ... AS SELECT ...;
CREATE SEQUENCE ...;
CREATE SYNONYM ... FOR ...;
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

1. Crear el usuario/esquema `ventas`.
2. Crear tablas `usuarios`, `productos`, `pedidos`, `lineas_pedido`.
3. Usar tipos correctos (`NUMBER`, `VARCHAR2`, `DATE`, `TIMESTAMP`, `NUMBER(1)`).
4. Anadir `NOT NULL`, `UNIQUE`, `PK`, `FK`, `CHECK` y `DEFAULT`.
5. Modificar estructura con `ALTER TABLE` (anadir y cambiar columna).
6. Crear al menos un indice, una vista y una secuencia.
7. Consultar el diccionario para listar tablas, columnas y restricciones.

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
