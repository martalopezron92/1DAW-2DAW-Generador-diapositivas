---
marp: true
theme: default
paginate: true
style: |
  section {
    background: #ffffff;
    color: #1a3a5c;
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 22px;
    padding: 48px 56px;
  }
  section.title {
    background: #1a3a5c; color: #ffffff;
    text-align: center; justify-content: center;
  }
  section.title h1 { font-size: 2em; color: #e07b39; margin-bottom: 0.2em; }
  section.title h2 { font-size: 1.1em; color: #cde; font-weight: 400; }
  section.section-break { background: #e07b39; color: #ffffff; justify-content: center; }
  section.section-break h1 { font-size: 1.8em; }
  h1 { color: #1a3a5c; font-size: 1.4em; border-bottom: 3px solid #e07b39; padding-bottom: 6px; margin-bottom: 0.5em; }
  h2 { color: #e07b39; font-size: 1.1em; margin-top: 0.8em; margin-bottom: 0.3em; }
  code { background: #f0f4f8; color: #c0392b; border-radius: 4px; padding: 1px 5px; font-size: 0.88em; }
  pre { background: #1e2d3d; color: #abb2bf; border-radius: 8px; padding: 18px 22px; font-size: 0.78em; line-height: 1.55; }
  pre code { background: none; color: inherit; padding: 0; }
  ul { margin-left: 1.2em; }
  li { margin-bottom: 0.35em; line-height: 1.5; }
  .callout { background: #fff3e0; border-left: 5px solid #e07b39; padding: 10px 16px; border-radius: 0 6px 6px 0; margin-top: 12px; font-size: 0.9em; }
  .warning { background: #fce4ec; border-left: 5px solid #c62828; padding: 10px 16px; border-radius: 0 6px 6px 0; margin-top: 12px; font-size: 0.9em; }
  table { border-collapse: collapse; width: 100%; font-size: 0.85em; }
  th { background: #1a3a5c; color: #fff; padding: 8px 12px; }
  td { border: 1px solid #dde; padding: 7px 12px; }
  tr:nth-child(even) { background: #f0f4f8; }
---

<!-- _class: title -->

# PL/SQL con Oracle
## Clase 3 — Tipos Compuestos y SQL en PL/SQL

**Programación de Bases de Datos**

---

# Tipos compuestos en PL/SQL

PL/SQL permite agrupar datos relacionados en estructuras:

| Tipo | Analogía | Uso principal |
|---|---|---|
| `RECORD` | Struct (C) / Registro (Ada) | Una fila con varios campos |
| `TABLE` | Array asociativo | Colección de valores del mismo tipo |
| `VARRAY` | Array de tamaño fijo | Colección acotada |

Hoy veremos `RECORD` y `TABLE`, que son los más usados en la práctica.

---

<!-- _class: section-break -->

# Registros PL/SQL: RECORD

---

# Definir y usar un RECORD

**Paso 1:** Definir el tipo en la sección DECLARE:

```sql
TYPE T_Hotel IS RECORD (
  HotelID   Hotel.HotelID%TYPE,
  Nombre    Hotel.Nombre%TYPE,
  Nhabs     Hotel.Nhabs%TYPE
);
```

**Paso 2:** Declarar una variable de ese tipo:

```sql
UnHotel  T_Hotel;
```

**Paso 3:** Acceder a los campos con notación punto:

```sql
UnHotel.HotelID := 99;
UnHotel.Nombre  := 'Costanera';
DBMS_OUTPUT.PUT_LINE('Hotel: ' || UnHotel.Nombre);
```

---

# Cargar un RECORD desde la BD

```sql
DECLARE
  TYPE T_Hotel IS RECORD (
    HotelID   Hotel.HotelID%TYPE,
    Nombre    Hotel.Nombre%TYPE,
    Nhabs     Hotel.Nhabs%TYPE
  );
  UnHotel T_Hotel;
BEGIN
  -- SELECT INTO carga el registro directamente
  SELECT HotelID, Nombre, Nhabs
  INTO   UnHotel              -- Los campos deben ser compatibles y en el mismo orden
  FROM   Hotel
  WHERE  HotelID = 99;

  DBMS_OUTPUT.PUT_LINE(
    'Hotel ' || UnHotel.HotelID || ': ' || UnHotel.Nombre ||
    ' (' || UnHotel.Nhabs || ' habs.)'
  );
END;
/
```

---

# `%ROWTYPE` — registro automático

En lugar de definir el tipo manualmente, PL/SQL puede crearlo con todos los campos de una tabla:

```sql
DECLARE
  UnHotel   Hotel%ROWTYPE;    -- Tiene TODOS los campos de la tabla Hotel
BEGIN
  SELECT *
  INTO   UnHotel
  FROM   Hotel WHERE HotelID = 99;

  -- Acceso igual que con RECORD:
  DBMS_OUTPUT.PUT_LINE('Precio: ' || UnHotel.PrecioHab);
  DBMS_OUTPUT.PUT_LINE('Piscina: ' || UnHotel.TienePiscina);
END;
/
```

<div class="callout">
<strong>%ROWTYPE vs. TYPE IS RECORD:</strong> usa <code>%ROWTYPE</code> cuando quieres todos los campos de la tabla; usa <code>TYPE IS RECORD</code> cuando solo necesitas un subconjunto de campos.
</div>

---

# Asignación entre registros

```sql
DECLARE
  Hotel1   Hotel%ROWTYPE;
  Hotel2   Hotel%ROWTYPE;
BEGIN
  SELECT * INTO Hotel1 FROM Hotel WHERE HotelID = 1;

  -- ✅ Asignación directa si son del MISMO tipo
  Hotel2 := Hotel1;

  -- ⚠️ Si los tipos son DISTINTOS (aunque tengan los mismos campos),
  -- hay que asignar campo a campo:
  -- Hotel2.HotelID  := Hotel1.HotelID;
  -- Hotel2.Nombre   := Hotel1.Nombre;
  -- ...
END;
/
```

---

<!-- _class: section-break -->

# Tablas PL/SQL: TABLE

---

# Definir una tabla PL/SQL

Son como **arrays asociativos** (diccionarios indexados por entero):

```sql
-- Definir el tipo
TYPE T_Lista_Nombres IS TABLE OF VARCHAR2(100)
  INDEX BY BINARY_INTEGER;

-- Declarar la variable
Nombres  T_Lista_Nombres;

-- Asignar valores (el índice puede ser cualquier entero)
Nombres(1) := 'Ana';
Nombres(2) := 'Luis';
Nombres(5) := 'Marta';    -- Los índices no tienen que ser consecutivos
Nombres(-3) := 'Pedro';   -- Pueden ser negativos
```

## Tabla de registros (muy frecuente)
```sql
TYPE T_Tabla_Hoteles IS TABLE OF Hotel%ROWTYPE
  INDEX BY BINARY_INTEGER;

HotelesGuardados  T_Tabla_Hoteles;

-- Acceso a un campo: tabla(índice).campo
HotelesGuardados(1).Nombre := 'Gran Hotel';
```

---

# Atributos de las tablas PL/SQL

Para operar con tablas de forma segura y flexible:

| Atributo | Devuelve | Descripción |
|---|---|---|
| `t.COUNT` | NUMBER | Número de filas almacenadas |
| `t.EXISTS(i)` | BOOLEAN | TRUE si existe el índice `i` |
| `t.FIRST` | BINARY_INTEGER | Primer índice (el menor) |
| `t.LAST` | BINARY_INTEGER | Último índice (el mayor) |
| `t.NEXT(i)` | BINARY_INTEGER | Índice siguiente a `i` |
| `t.PRIOR(i)` | BINARY_INTEGER | Índice anterior a `i` |
| `t.DELETE` | — | Borra todas las filas |
| `t.DELETE(i)` | — | Borra la fila con índice `i` |
| `t.DELETE(i,j)` | — | Borra las filas de índice entre `i` y `j` |

---

# Recorrer una tabla PL/SQL

```sql
DECLARE
  TYPE T_Nums IS TABLE OF NUMBER INDEX BY BINARY_INTEGER;
  Numeros  T_Nums;
  Idx      BINARY_INTEGER;
BEGIN
  -- Cargar algunos valores (índices no consecutivos)
  Numeros(1)  := 100;
  Numeros(5)  := 200;
  Numeros(10) := 300;

  -- Recorrer con FIRST / NEXT (funciona con cualquier índice)
  Idx := Numeros.FIRST;
  WHILE Idx IS NOT NULL LOOP
    DBMS_OUTPUT.PUT_LINE('Índice ' || Idx || ': ' || Numeros(Idx));
    Idx := Numeros.NEXT(Idx);   -- Avanzar al siguiente
  END LOOP;

  DBMS_OUTPUT.PUT_LINE('Total elementos: ' || Numeros.COUNT);
END;
/
```

<div class="callout">
Usa siempre <code>EXISTS(i)</code> antes de acceder a un elemento si no estás seguro de que existe. Acceder a un índice inexistente genera un error.
</div>

---

<!-- _class: section-break -->

# SQL dentro de PL/SQL

---

# Órdenes SQL disponibles en PL/SQL

## DML (con acceso a variables PL/SQL)
```sql
INSERT INTO Pieza (P#, Nombre, Peso) VALUES (NumP, 'Tuerca', 1.5);
UPDATE Hotel SET PrecioHab = PrecioHab * 1.05 WHERE HotelID = IdH;
DELETE FROM Empleados WHERE DNI = DniEmpleado;
```

## Control de transacciones
```sql
COMMIT;            -- Confirma la transacción
ROLLBACK;          -- Deshace la transacción
SAVEPOINT punto1;  -- Establece un punto de retorno
ROLLBACK TO punto1;
```

<div class="warning">
⚠️ No puedes usar variables PL/SQL como nombre de tabla o columna. Para eso se necesita <em>SQL dinámico</em> (<code>DBMS_SQL</code> o <code>EXECUTE IMMEDIATE</code>).
</div>

---

# SELECT INTO — recuperar una sola fila

La cláusula `INTO` indica dónde guardar los resultados:

```sql
SELECT columna1, columna2, ...
INTO   variable1, variable2, ...    -- o un RECORD compatible
FROM   tabla
WHERE  condicion;
```

**Regla fundamental:** la consulta debe devolver **exactamente una fila**.
- 0 filas → excepción `NO_DATA_FOUND`
- Más de 1 fila → excepción `TOO_MANY_ROWS`

<div class="callout">
Para consultas que devuelven múltiples filas, se usan <strong>cursores</strong> (Clase 4).
</div>

---

# SELECT INTO — ejemplo completo

```sql
DECLARE
  Media     NUMBER;
  UnHotel   Hotel%ROWTYPE;
BEGIN
  -- Calcular media de habitaciones de todos los hoteles
  SELECT AVG(Nhabs)
  INTO   Media
  FROM   Hotel;

  DBMS_OUTPUT.PUT_LINE('Media hab.: ' || ROUND(Media, 2));

  -- Recuperar un hotel concreto (devuelve exactamente 1 fila)
  SELECT *
  INTO   UnHotel
  FROM   Hotel WHERE HotelID = 99;

  -- Comparar y actuar
  IF Media > UnHotel.Nhabs THEN
    UPDATE Hotel
    SET    Nhabs = Nhabs + 1
    WHERE  HotelID = 99;
    DBMS_OUTPUT.PUT_LINE('Hotel actualizado.');
  END IF;

  COMMIT;
END;
/
```

---

# Variables en expresiones SQL

PL/SQL integra las variables directamente en las órdenes SQL:

```sql
DECLARE
  DniObjetivo   Empleados.DNI%TYPE    := 99;
  NuevoDpto     Empleados.Dpto%TYPE   := 20;
  Incremento    NUMBER                := 0.10;
BEGIN
  -- La variable actúa como un parámetro en la orden
  UPDATE Empleados
  SET    Dpto    = NuevoDpto,
         Sueldo  = Sueldo * (1 + Incremento)
  WHERE  DNI     = DniObjetivo;

  DBMS_OUTPUT.PUT_LINE('Filas actualizadas: ' || SQL%ROWCOUNT);
  COMMIT;
END;
/
```

<div class="callout">
Consejo: no uses el mismo nombre para una variable y una columna. Oracle puede confundirse y el resultado no será el esperado. Prefijo P_ para parámetros, sin prefijo para variables locales.
</div>

---

# Ejemplo integrador — Registros + SQL

**Objetivo:** leer un empleado y actualizar su salario si gana menos que la media de su departamento.

```sql
DECLARE
  UnEmp     Empleados%ROWTYPE;
  MediaDpto NUMBER;
  DniB      Empleados.DNI%TYPE := 42;
BEGIN
  -- Leer el empleado
  SELECT * INTO UnEmp FROM Empleados WHERE DNI = DniB;

  -- Media del departamento del empleado
  SELECT AVG(Sueldo) INTO MediaDpto
  FROM   Empleados
  WHERE  Dpto = UnEmp.Dpto;

  -- Actualizar si está por debajo de la media
  IF UnEmp.Sueldo < MediaDpto THEN
    UPDATE Empleados
    SET    Sueldo = MediaDpto
    WHERE  DNI = UnEmp.DNI;
    DBMS_OUTPUT.PUT_LINE('Sueldo actualizado a ' || ROUND(MediaDpto, 2));
  ELSE
    DBMS_OUTPUT.PUT_LINE('El sueldo ya supera la media del dpto.');
  END IF;

  COMMIT;
END;
/
```

---

# Resumen de la clase

| Concepto | Clave |
|---|---|
| `TYPE IS RECORD` | Define un tipo con campos de distintos tipos |
| `%ROWTYPE` | Registro con todos los campos de una tabla |
| `notacion.punto` | Para acceder a campos de un registro |
| `TYPE IS TABLE OF … INDEX BY` | Array asociativo indexado por `BINARY_INTEGER` |
| `t.COUNT, FIRST, LAST, NEXT, EXISTS` | Atributos de tabla PL/SQL |
| `SELECT … INTO` | Recupera exactamente 1 fila en variables/registro |
| `NO_DATA_FOUND` | SELECT INTO sin resultado → excepción |
| `TOO_MANY_ROWS` | SELECT INTO con >1 resultado → excepción |

---

<!-- _class: title -->

# Fin de la Clase 3

**Próxima clase:** Cursores explícitos — procesar múltiples filas

*¿Preguntas?*
