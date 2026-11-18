---
marp: true
theme: course-theme
paginate: true
size: 16:9
lang: es
html: true
header: 'UD01 · Repaso Práctica 1 CTF'
footer: 'Módulo 5025 · Hacking Ético · Curso de Especialización en Ciberseguridad'
---

<!--
Uso: marp --theme-set ../tema-curso.css --html Repaso-CTF-Practica1-DIAPOSITIVAS.md
La opción --html es necesaria para que se dibujen los diagramas mermaid
(se cargan desde el CDN, así que la presentación necesita conexión).
Soluciones y justificación completa: Repaso-CTF-Practica1-GUIA-DOCENTE.md
-->

<style>
  /* Cadenas proyectadas grandes y legibles desde el fondo del aula */
  section.lead pre { font-size: 1.15em; line-height: 1.35; white-space: pre-wrap; word-break: break-all; }
  section.lead pre code { color: #1e3a8a; font-weight: 600; }
</style>

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
</script>

<!-- _class: lead -->
<!-- _paginate: false -->

# ¿Hash, cifrado o codificación?

## Repaso de la Práctica 1 · CTF

Diez cadenas reales · Justifica tu respuesta · 🍬 por cada respuesta bien argumentada

---

## Reglas del juego

1. Se proyecta una cadena: **60 segundos** de reflexión individual, sin dispositivos.
2. Mano alzada. Tiene prioridad quien aún no ha respondido.
3. Para ganar el caramelo, la respuesta debe incluir:

| Elemento | Ejemplo |
|---|---|
| **Familia** | «Es un hash» |
| **Algoritmo o base** | «SHA-1» |
| **Dos evidencias** como mínimo | «40 caracteres, solo 0-9 y a-f» |
| **Reversibilidad / clave** | «No se puede deshacer, solo buscar en un diccionario» |

> Acertar sin justificar **no** da caramelo. Si la respuesta es incompleta, hay **rebote**.

---

## Las tres familias

| | **Hash** | **Cifrado** | **Codificación** |
|---|---|---|---|
| Objetivo | Integridad, contraseñas | Confidencialidad | Representar datos |
| ¿Reversible? | **No** | **Sí, con clave** | **Sí, sin clave** |
| ¿Necesita clave? | No | **Sí** | No |
| Longitud de salida | **Fija** | ≈ entrada (+ sal/relleno) | Proporcional a la entrada |
| En la práctica | MD5, SHA-1, SHA-256 | ROT13 | Base64, Base32, hex |
| Frase clave | «Se comprueba, no se deshace» | «Se cierra con llave» | «Se cambia de alfabeto» |

---

<!-- _class: small -->

## Pistas que delatan a cada formato

| Formato | Alfabeto | Longitud | Marcas |
|---|---|---|---|
| MD5 · SHA-1 · SHA-256 | 0-9 a-f | **32 · 40 · 64** fija | Bytes «aleatorios» |
| Hexadecimal | 0-9 a-f | Par, variable | 1 byte = 2 caracteres |
| Binario · Octal | 0-1 · 0-7 | Grupos de 8 · de 3 | Espacios entre grupos |
| Base32 | A-Z 2-7 | Múltiplo de 8 | Relleno `=` largo |
| Base58 | Sin `0 O I l` | Variable | Sin `+ / =` |
| Base64 | A-Z a-z 0-9 `+ /` | Múltiplo de 4 | `=` o `==` |
| Base85 | Muchos signos | Variable | `<~ … ~>` |
| ROT13 / César | Letras | = original | Conserva espacios y signos |

---

<!-- _class: tiny -->

## Árbol de decisión (heurística: siempre se comprueba)

<pre class="mermaid">
flowchart LR
    A["Cadena"] --> G{"¿0/1 en<br/>grupos de 8?"}
    G -->|Sí| H["Binario"]
    G -->|No| I{"¿Grupos de<br/>3 dígitos 0-7?"}
    I -->|Sí| J["Octal"]
    I -->|No| B{"¿Solo<br/>0-9 a-f?"}
    B -->|Sí| C{"¿32/40/64 y<br/>no da texto?"}
    C -->|Sí| E["HASH"]
    C -->|No| F["Hexadecimal"]
    B -->|No| K{"¿A-Z 2-7<br/>y ====?"}
    K -->|Sí| L["Base32"]
    K -->|No| M{"¿#lt;~ ~#gt;?"}
    M -->|Sí| N["Base85"]
    M -->|No| O{"¿Base64<br/>válido?"}
    O -->|"Sí, texto"| Q["Base64"]
    O -->|"Sí, Salted__"| R["CIFRADO<br/>en Base64"]
    O -->|"Sin 0 O I l"| S["Base58"]
    O -->|"Conserva<br/>espacios"| T["CIFRADO<br/>clásico"]
    style E fill:#f8d7da,stroke:#dc3545
    style R fill:#fff3cd,stroke:#ffc107
    style T fill:#fff3cd,stroke:#ffc107
</pre>

---

<!-- _class: lead -->

# Pregunta 1

```text
0d107d09f5bbe40cade3de5c71e9e9b7
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P1 · Solución: **hash MD5**

| Familia | Algoritmo | Texto original |
|---|---|---|
| Hash | MD5 | `letmein` |

- Solo `0-9` y `a-f`, **32 caracteres** → 128 bits → MD5.
- Irreversible: no hay clave ni operación inversa.
- Pero `letmein` es una contraseña débil: **CrackStation** la encuentra al instante.

> CrackStation **no invierte** el hash: lo busca en una tabla precalculada (Caso guiado 3).

---

<!-- _class: lead -->

# Pregunta 2

```text
MNXWI2LGNFRWC4S7NZXV6ZLTL5RWSZTSMFZA====
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P2 · Solución: **codificación Base32**

| Familia | Base | Texto original |
|---|---|---|
| Codificación | Base32 | `codificar_no_es_cifrar` |

- **Solo mayúsculas** y dígitos del **2 al 7**.
- Relleno `====`: en Base64 el máximo es `==`.
- 40 caracteres, múltiplo de 8 (5 bytes → 8 caracteres).
- Reversible sin clave: `base32 -d`.

---

<!-- _class: lead -->

# Pregunta 3

```text
Yn pynir rf ry frpergb, ab ry nytbevgzb
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P3 · Solución: **cifrado clásico ROT13**

| Familia | Algoritmo | Texto original |
|---|---|---|
| Cifrado | ROT13 (César, desplazamiento 13) | `La clave es el secreto, no el algoritmo` |

- **Conserva la estructura**: espacios, coma, mayúscula inicial, palabras repetidas (`ry` = «el»).
- Sustitución letra a letra → **cifrado**, no cambio de base.
- Inseguro: **25 claves posibles** y conserva frecuencias del idioma.
- 13 + 13 = 26 → ROT13 es su propia inversa.

> El mensaje es el **principio de Kerckhoffs**.

---

<!-- _class: lead -->

# Pregunta 4

```text
2e69a176f1ed27e5ca52ea4d85327477b3f46bd9
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P4 · Solución: **hash SHA-1**

| Familia | Algoritmo | Texto original |
|---|---|---|
| Hash | SHA-1 | `Kerckhoffs` |

- Hexadecimal, **40 caracteres** → 160 bits → SHA-1 (Reto 5).
- Entrada de 10 letras, salida de 40 caracteres: **longitud fija**.
- SHA-1 está **obsoleto**: colisión práctica *SHAttered* (2017).

---

<!-- _class: lead -->

# Pregunta 5

```text
01000011 01010100 01000110
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P5 · Solución: **codificación binaria (base 2)**

| Familia | Base | Texto original |
|---|---|---|
| Codificación | Binario | `CTF` |

- Solo `0` y `1`, en **octetos**: cada grupo de 8 bits es un carácter ASCII.
- Tres grupos → tres caracteres.

| Bits | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 | Valor | Carácter |
|---|---|---|---|---|---|---|---|---|---|---|
| `01000011` | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 1 | 67 | `C` |

---

<!-- _class: lead -->

# Pregunta 6 ⚠️

```text
4861636b696e67457469636f32303236
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P6 · Solución: **¡trampa! Codificación hexadecimal**

| Familia | Base | Texto original |
|---|---|---|
| Codificación | Hexadecimal | `HackingEtico2026` |

- 32 caracteres hex… **parece MD5, pero no lo es**.
- Por parejas: `48 61 63 6b 69 6e 67…` → todos en el rango **imprimible ASCII** (`3x`–`7x`).
- Un hash real tiene bytes uniformes: `0d`, `e5`, `f1`, `9e`… (compárala con P1).
- Se **comprueba decodificando**: sale texto legible.

> MD5 real de `HackingEtico2026`: `07f117040bcc37f93f7f9e7bd7b9b933`.
> **La longitud sugiere, la comprobación demuestra.**

---

<!-- _class: lead -->

# Pregunta 7

```text
2EeRr3FUWqwNMHDZX
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P7 · Solución: **codificación Base58**

| Familia | Base | Texto original |
|---|---|---|
| Codificación | Base58 | `Autorizacion` |

- Parece Base64, pero: **17 caracteres** (no múltiplo de 4), sin `=`, sin `+` ni `/`.
- **No aparecen `0`, `O`, `I` ni `l`**: Base58 los elimina para evitar confusiones visuales.
- Uso real: direcciones de **Bitcoin**, identificadores de IPFS.
- Reversible sin clave (CyberChef: *From Base58*).

> Sin **autorización** no hay hacking ético.

---

<!-- _class: lead -->

# Pregunta 8

```text
ddc436263f3d6a3f6c2e3fde00cb913c5ee0d9054c53564045d01447cc529cf6
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P8 · Solución: **hash SHA-256**

| Familia | Algoritmo | Texto original |
|---|---|---|
| Hash | SHA-256 | `Atenea` |

- Hexadecimal, **64 caracteres** → 256 bits → SHA-256 (Caso guiado 2).
- 6 letras de entrada, 64 caracteres de salida: la longitud **no depende** de la entrada.
- Bytes `dd c4 36 26 3f 3d 00 cb…`: no imprimibles → no es hex de un texto.

> Para guardar contraseñas, ni MD5 ni SHA-256 a secas: funciones **lentas y con sal** (bcrypt, Argon2).

---

<!-- _class: lead -->

# Pregunta 9

```text
<~:h=NdATMs-DJ&~>
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## P9 · Solución: **codificación Base85 (Ascii85)**

| Familia | Base | Texto original |
|---|---|---|
| Codificación | Base85 (variante Adobe) | `Pentesting` |

- Delimitadores **`<~` `~>`**: firma de Ascii85 (PDF, PostScript).
- Alfabeto con **muchos signos** (`:` `=` `-` `&`): 85 caracteres ASCII imprimibles.
- Más compacta que Base64: **4 bytes → 5 caracteres**.
- Reversible sin clave (CyberChef: *From Base85*).

---

<!-- _class: lead -->

# Pregunta 10 · de oro 🍬🍬

```text
U2FsdGVkX19iO23/W8j/EK0/3ktQoJeR8Og0Simvn0kU2a6cY5hpmkyLE3TCxB14
```

¿Hash, cifrado o codificación? **Cuidado: la respuesta tiene dos capas.**

---

## P10 · Solución: **cifrado AES envuelto en Base64**

| Capa | Qué es | Evidencia |
|---|---|---|
| Exterior | **Codificación Base64** | `A-Z a-z 0-9 + /`, 64 caracteres (múltiplo de 4) |
| Interior | **Cifrado AES-256-CBC** (`openssl enc`) | Al decodificar: `Salted__` + bytes ilegibles |

- `U2FsdGVkX1` = `Salted__` en Base64: cabecera de OpenSSL (marca + sal de 8 bytes).
- **Sin la clave no se abre**: con otra contraseña, `bad decrypt`.
- Con la clave `ClaveDelAula` → `flag{cifrado_de_verdad}`.

> Base64 es solo el **sobre**; la protección la da AES y su clave.

---

<!-- _class: lead -->

# Reserva 1

```text
150 141 163 150
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## R1 · Solución: **codificación octal (base 8)**

| Familia | Base | Texto original |
|---|---|---|
| Codificación | Octal | `hash` |

- Grupos de **3 dígitos**, solo `0-7` (no hay 8 ni 9).
- `150₈` = 1·64 + 5·8 + 0 = 104 = `h`.
- Es la palabra «hash»… **escrita en octal**: no es un hash.

---

<!-- _class: lead -->

# Reserva 2

```text
aW50ZWdyaWRhZA==
```

¿Hash, cifrado o codificación? **Justifícalo.**

---

## R2 · Solución: **codificación Base64**

| Familia | Base | Texto original |
|---|---|---|
| Codificación | Base64 | `integridad` |

- Mayúsculas, minúsculas y dígitos; **16 caracteres** (múltiplo de 4).
- Relleno `==`: la entrada (10 bytes) no es múltiplo de 3.
- Reversible sin clave: `base64 -d` (Caso guiado 4).

---

<!-- _class: small -->

## Resumen

| # | Familia | Algoritmo / base | Evidencia decisiva |
|---|---|---|---|
| P1 | Hash | MD5 | 32 hex, bytes aleatorios |
| P2 | Codificación | Base32 | A-Z 2-7, relleno largo |
| P3 | Cifrado | ROT13 | Conserva espacios y estructura |
| P4 | Hash | SHA-1 | 40 hex |
| P5 | Codificación | Binario | 0/1 en octetos |
| P6 | Codificación | Hexadecimal | 32 hex **pero** bytes imprimibles |
| P7 | Codificación | Base58 | Sin `0 O I l`, sin `+ / =` |
| P8 | Hash | SHA-256 | 64 hex |
| P9 | Codificación | Base85 | `<~ ~>` |
| P10 | Cifrado + codificación | AES + Base64 | `Salted__`, sin clave no se abre |

---

## Tres ideas que deben quedar

<pre class="mermaid">
flowchart LR
    A["1 · Codificar ≠ cifrar<br/>Cambiar de alfabeto<br/>no protege nada"] --> B["2 · Un hash no se descifra<br/>Se compara o se busca<br/>en un diccionario"]
    B --> C["3 · Las pistas sugieren,<br/>la comprobación demuestra"]
    style A fill:#cfe2ff,stroke:#0d6efd
    style B fill:#f8d7da,stroke:#dc3545
    style C fill:#d4edda,stroke:#28a745
</pre>

> **Para pensar:** si la IA os dice que la P6 es un MD5, ¿cómo le demostraríais que se equivoca?
