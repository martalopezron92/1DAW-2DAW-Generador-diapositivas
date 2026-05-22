---
marp: true
theme: default
paginate: true
style: |
  section {
    background: #ffffff; color: #1a3a5c;
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 22px; padding: 48px 56px;
  }
  section.title { background: #1a3a5c; color: #ffffff; text-align: center; justify-content: center; }
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
## Clase 5 — Cursores Implícitos, FOR UPDATE y Excepciones

**Programación de Bases de Datos**

---

# Cursores implícitos (SQL cursor)

PL/SQL gestiona automáticamente un cursor para cada orden DML y para `SELECT INTO`. Se llama **cursor SQL** o **cursor implícito**.

- No requiere `OPEN`, `FETCH` ni `CLOSE`
- Solo tiene atributos disponibles **inmediatamente después** de la orden

```sql
UPDATE Hotel SET PrecioHab = PrecioHab + 10 WHERE HotelID = 99;

IF SQL%NOTFOUND THEN
  -- No existía ese hotel: insertarlo
  INSERT INTO Hotel (HotelID, PrecioHab, Nhabs, TienePiscina)
  VALUES (99, 110, 60, 'S');
END IF;
```

```sql
UPDATE Hotel SET PrecioHab = PrecioHab + 5 WHERE Nhabs > 50;
DBMS_OUTPUT.PUT_LINE('Hoteles actualizados: ' || SQL%ROWCOUNT);
```

<div class="callout">
<code>SQL%ISOPEN</code> siempre devuelve FALSE para cursores implícitos: PL/SQL los cierra automáticamente.
</div>

---

# Atributos del cursor implícito SQL

| Atributo | Devuelve |
|---|---|
| `SQL%FOUND` | TRUE si la última DML/SELECT afectó al menos 1 fila |
| `SQL%NOTFOUND` | TRUE si la última DML/SELECT afectó 0 filas |
| `SQL%ROWCOUNT` | Número de filas afectadas por la última orden |
| `SQL%ISOPEN` | Siempre FALSE (Oracle cierra el cursor automáticamente) |

## SELECT INTO y cursores implícitos

Con `SELECT INTO`, los atributos `SQL%FOUND/NOTFOUND` existen pero **no tienen sentido práctico**: si no hay filas se lanza directamente `NO_DATA_FOUND` antes de poder comprobarlos.

```sql
-- ❌ Este IF nunca se ejecuta con un SELECT INTO
SELECT * INTO Hotel99 FROM Hotel WHERE Nombre = 'Costanera';
IF SQL%NOTFOUND THEN ...  -- Nunca llega aquí si hay error
```

---

<!-- _class: section-break -->

# SELECT FOR UPDATE y WHERE CURRENT OF

---

# El problema de la modificación concurrente

Un cursor explícito evalúa la consulta al hacer `OPEN`, pero **no bloquea** las filas. Otro usuario puede modificar esas filas mientras las procesamos.

```
Sesión A:                              Sesión B:
OPEN HotelesGrandes;                   ─────────────────────
FETCH → Hotel 101 (Nhabs=60)
                                       UPDATE Hotel
                                       SET Nhabs=45
                                       WHERE HotelID=101;
                                       COMMIT;
UPDATE Hotel SET PrecioHab=...         ← Actualiza sobre datos incorrectos
WHERE HotelID=101;
```

**Solución:** cursor `FOR UPDATE` → bloquea las filas al hacer `OPEN`.

---

# SELECT FOR UPDATE

```sql
CURSOR HotelesC IS
  SELECT * FROM Hotel
  WHERE Nombre LIKE 'C%'
  FOR UPDATE;           -- Bloquea las filas al hacer OPEN

-- Con lista de columnas (más restrictivo, documenta qué se va a modificar):
CURSOR HotelesG IS
  SELECT * FROM Hotel WHERE Nhabs > 30
  FOR UPDATE OF PrecioHab, Calif;
```

## Opción NOWAIT

```sql
CURSOR HotelesC IS
  SELECT * FROM Hotel WHERE Nombre LIKE 'C%'
  FOR UPDATE NOWAIT;   -- Si las filas ya están bloqueadas, error ORA-54
                        -- Sin NOWAIT: espera indefinidamente
```

<div class="callout">
Los bloqueos se adquieren al hacer <code>OPEN</code> y se liberan con <code>COMMIT</code> o <code>ROLLBACK</code>. <code>CLOSE</code> <strong>no libera</strong> los bloqueos.
</div>

---

# WHERE CURRENT OF

Tras un `FETCH`, la cláusula `WHERE CURRENT OF cursor` apunta a la última fila leída. Evita tener que especificar la clave primaria:

```sql
DECLARE
  UnHotel Hotel%ROWTYPE;
  CURSOR HotelesC IS
    SELECT * FROM Hotel WHERE Nombre LIKE 'C%'
    FOR UPDATE;
BEGIN
  OPEN HotelesC;
  LOOP
    FETCH HotelesC INTO UnHotel;
    EXIT WHEN HotelesC%NOTFOUND;

    IF UnHotel.Calif > 0 THEN
      UPDATE Hotel
      SET    Calif = Calif + 1
      WHERE  CURRENT OF HotelesC;   -- ← sin necesidad de WHERE HotelID = ...
    ELSE
      DELETE Hotel
      WHERE  CURRENT OF HotelesC;
    END IF;
  END LOOP;
  CLOSE HotelesC;   -- Los bloqueos siguen activos
  COMMIT;           -- Aquí se liberan los bloqueos
END;
/
```

---

# COMMIT dentro del bucle — reglas

| Situación | ¿COMMIT dentro del bucle? |
|---|---|
| Cursor `FOR UPDATE` | ❌ **No**: invalida el cursor → error en el siguiente FETCH |
| Cursor normal (sin FOR UPDATE) | ✅ Sí: sin bloqueos, sin problema |

```sql
-- ✅ Cursor sin FOR UPDATE: COMMIT por iteración es posible
DECLARE
  UnEmp Empleados%ROWTYPE;
  CURSOR Empl IS SELECT * FROM Empleados WHERE Dpto = 10;
BEGIN
  OPEN Empl;
  LOOP
    FETCH Empl INTO UnEmp;
    EXIT WHEN Empl%NOTFOUND;
    UPDATE Empleados SET Sueldo = Sueldo * 1.1 WHERE DNI = UnEmp.DNI;
    COMMIT;   -- Confirma cada fila individualmente
  END LOOP;
  CLOSE Empl;
END;
/
```

---

<!-- _class: section-break -->

# Tratamiento de errores: Excepciones

---

# ¿Por qué excepciones?

En lenguajes sin excepciones (como C):
```c
result = consulta();
if (result == ERROR_NO_DATA) { ... }
result = actualizacion();
if (result == ERROR_CONSTRAINT) { ... }
// La lógica real queda enterrada bajo el control de errores
```

Con excepciones PL/SQL:
```sql
BEGIN
  -- Lógica principal limpia, sin IF de error
  SELECT ... INTO ...;
  UPDATE ...;
  COMMIT;
EXCEPTION
  -- Errores agrupados al final, fáciles de leer y mantener
  WHEN NO_DATA_FOUND THEN ...
  WHEN DUP_VAL_ON_INDEX THEN ...
END;
```

---

# Estructura de la sección EXCEPTION

```sql
EXCEPTION
  WHEN excepcion1 THEN
    -- gestión del error 1
  WHEN excepcion2 OR excepcion3 THEN
    -- gestión de los errores 2 y 3 conjuntamente
  WHEN OTHERS THEN
    -- captura cualquier excepción no tratada anteriormente
    -- debe ser siempre el ÚLTIMO gestor
END;
```

<div class="callout">
Cuando se produce un error, la ejecución salta a la sección EXCEPTION. <strong>No es posible</strong> volver a la instrucción que generó el error ni continuar desde donde se dejó.
</div>

---

# Excepciones predefinidas más importantes

| Excepción | Cuándo se produce |
|---|---|
| `NO_DATA_FOUND` | `SELECT INTO` sin filas; o acceso a tabla PL/SQL sin ese índice |
| `TOO_MANY_ROWS` | `SELECT INTO` devuelve más de 1 fila |
| `DUP_VAL_ON_INDEX` | INSERT viola restricción UNIQUE (ORA-1) |
| `ZERO_DIVIDE` | División por cero |
| `VALUE_ERROR` | Error aritmético, de conversión o de truncamiento |
| `INVALID_NUMBER` | Conversión fallida en orden SQL |
| `INVALID_CURSOR` | Operación ilegal sobre cursor (p.ej. FETCH sin OPEN) |
| `CURSOR_ALREADY_OPEN` | OPEN sobre un cursor ya abierto |
| `STORAGE_ERROR` | PL/SQL sin memoria (error interno) |
| `PROGRAM_ERROR` | Fallo en el motor PL/SQL (error interno) |

---

# Excepciones de usuario — declarar y lanzar

```sql
DECLARE
  Demasiados_Empleados EXCEPTION;   -- Declarar la excepción
  Num_Emp  NUMBER;
  Depart   Empleados.Dpto%TYPE;
BEGIN
  SELECT Dpto INTO Depart FROM Empleados WHERE DNI = 99;
  SELECT COUNT(*) INTO Num_Emp FROM Empleados WHERE Dpto = Depart;

  IF Num_Emp > 20 THEN
    RAISE Demasiados_Empleados;     -- Lanzar explícitamente
  END IF;

  DBMS_OUTPUT.PUT_LINE('Todo correcto: ' || Num_Emp || ' empleados.');

EXCEPTION
  WHEN Demasiados_Empleados THEN
    INSERT INTO Tabla_Avisos(msg)
    VALUES ('Dpto ' || Depart || ' tiene ' || Num_Emp || ' empleados');
  WHEN NO_DATA_FOUND THEN
    INSERT INTO Tabla_Avisos(msg) VALUES ('No existe empleado con DNI 99');
END;
/
```

---

# El gestor OTHERS y SQLCODE / SQLERRM

```sql
DECLARE
  Cod_Error  NUMBER;
  Msg_Error  VARCHAR2(512);
BEGIN
  -- operaciones que podrían fallar
  ...
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.PUT_LINE('Sin datos.');

  WHEN OTHERS THEN
    -- Capturar información del error desconocido
    Cod_Error := SQLCODE;                      -- Número del error (negativo)
    Msg_Error := SUBSTR(SQLERRM, 1, 200);      -- Mensaje (máx 512 chars)

    INSERT INTO Log_Errores (Codigo, Mensaje, Fecha)
    VALUES (Cod_Error, Msg_Error, SYSDATE);

    RAISE;  -- Re-lanzar la misma excepción al bloque superior
END;
/
```

<div class="callout">
<code>SQLCODE</code> y <code>SQLERRM</code> solo se pueden usar en código procedimental PL/SQL, <strong>no dentro de órdenes SQL</strong>.
</div>

---

# RAISE_APPLICATION_ERROR

Permite generar errores personalizados con el mismo mecanismo que Oracle:

```sql
RAISE_APPLICATION_ERROR(numero_error, mensaje [, preservar_pila]);
```

- `numero_error`: entre **-20000** y **-20999** (reservado para usuarios)
- `mensaje`: hasta 512 caracteres
- `preservar_pila` (opcional): TRUE = acumula en la pila de errores; FALSE (defecto) = reemplaza

```sql
CREATE OR REPLACE PROCEDURE CambiaDpto(
  P_DNI   Empleados.DNI%TYPE,
  P_Dpto  Empleados.Dpto%TYPE) AS
  Num_Emp NUMBER;
BEGIN
  SELECT COUNT(*) INTO Num_Emp FROM Empleados WHERE Dpto = P_Dpto;
  IF Num_Emp + 1 > 20 THEN
    RAISE_APPLICATION_ERROR(-20000, 'Dpto. ' || P_Dpto || ' está lleno');
  END IF;
  UPDATE Empleados SET Dpto = P_Dpto WHERE DNI = P_DNI;
  IF SQL%NOTFOUND THEN
    RAISE_APPLICATION_ERROR(-20001, 'No existe empleado DNI=' || P_DNI);
  END IF;
END CambiaDpto;
/
```

---

# Propagación de excepciones

Si un bloque no tiene gestor para la excepción, **se propaga al bloque exterior**:

```
Bloque A (exterior)
├── BEGIN
│   ├── Bloque B (interior)
│   │   ├── BEGIN
│   │   │   └── ← Error aquí → NO_DATA_FOUND
│   │   ├── EXCEPTION
│   │   │   └── WHEN TOO_MANY_ROWS ...   ← No coincide
│   │   └── END
│   └── ...
├── EXCEPTION
│   └── WHEN NO_DATA_FOUND ...  ← Se captura aquí
└── END
```

- Excepción en **sección ejecutable**: busca gestor en el bloque actual, si no, propaga
- Excepción en **sección DECLARE**: va directamente al bloque exterior (el bloque actual no llegó a ejecutarse)
- Excepción en **sección EXCEPTION**: va directamente al bloque exterior (solo puede haber una excepción activa)

---

# Resumen de la clase

| Concepto | Clave |
|---|---|
| Cursor implícito `SQL` | Atributos automáticos tras DML o SELECT INTO |
| `SQL%ROWCOUNT` | Filas afectadas por la última DML |
| `FOR UPDATE` | Bloquea filas al hacer OPEN |
| `WHERE CURRENT OF` | Actualiza/borra la fila actual del cursor |
| COMMIT con FOR UPDATE | ❌ Nunca dentro del bucle |
| Excepción predefinida | Lanzada automáticamente por Oracle |
| Excepción de usuario | Declarar en DECLARE, lanzar con RAISE |
| `OTHERS` | Captura cualquier excepción no tratada (siempre al final) |
| `SQLCODE / SQLERRM` | Código y mensaje del error actual |
| `RAISE_APPLICATION_ERROR` | Error personalizado (-20000 a -20999) |

---

<!-- _class: title -->

# Fin de la Clase 5

**Próxima clase:** Subprogramas — Procedimientos, Funciones y Paquetes

*¿Preguntas?*
