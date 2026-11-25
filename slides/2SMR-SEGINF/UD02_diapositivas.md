---
marp: true
theme: course-theme
header: "Seguridad Informática · UD02"
footer: "2SMR · Seguridad Informática"
paginate: true
---

<!-- _class: lead -->

# UD02
## Criptografía

**2 sesiones · RA4 · Criterios RA4.d, RA4.f, RA4.g**

---

## ¿Por qué necesitamos criptografía?

La información viaja por redes que **no controlamos**: wifi del instituto, router de casa, proveedor de Internet, servidores intermedios.

Cualquiera con acceso al medio puede **capturar el tráfico** con un *sniffer* (por ejemplo, Wireshark).

La criptografía no impide que intercepten los datos, pero consigue que:

- lo interceptado **no se pueda leer** (confidencialidad);
- se detecte cualquier **modificación** (integridad);
- se sepa **quién** lo envía y que no pueda negarlo (autenticación y no repudio).

---

## Mapa de la unidad

| Sesión | Contenido |
|---|---|
| **1** | 1 · Conceptos y objetivos |
| **1** | 2 · Criptografía clásica: César y Vigenère |
| **1** | 3 · Criptografía simétrica |
| **1** | 4 · Funciones hash |
| **2** | 5 · Criptografía asimétrica y cifrado híbrido |
| **2** | 6 · Firma digital |
| **2** | 7 · Certificados digitales, CA, HTTPS y DNIe |

<span class="muted">Cada bloque termina con un ejercicio corto. Las prácticas guiadas de CyberChef y GPG desarrollan lo visto.</span>

---

<!-- _class: lead -->

# 1 · Conceptos y objetivos
### UD02-C01

El vocabulario y los objetivos de la criptografía.

---

<!-- content: UD02-C01 -->

## ¿Qué es la criptografía?

La **criptografía** es la técnica que transforma un mensaje para que **solo pueda entenderlo quien posee la clave**.

Forma parte de la **criptología**, que incluye:

| Disciplina | Objetivo |
|---|---|
| **Criptografía** | Diseñar métodos para ocultar el **significado** del mensaje. |
| **Criptoanálisis** | Romper un cifrado **sin conocer la clave**. |
| **Esteganografía** | Ocultar la **existencia** del mensaje (no lo cifra). |

> Ejemplo de esteganografía: un texto escondido dentro de los píxeles de una imagen. Quien no lo sabe, ve solo una foto.

---

<!-- content: UD02-C01 -->

## Vocabulario básico

| Término | Significado | Ejemplo |
|---|---|---|
| **Texto claro** | Mensaje original, legible. | `HOLA MUNDO` |
| **Criptograma** | Mensaje cifrado. | `KROD PXQGR` |
| **Algoritmo** | Método para cifrar. Suele ser público. | César, AES, RSA |
| **Clave** | Dato secreto que usa el algoritmo. | Desplazar 3 letras |
| **Cifrar** | Texto claro → criptograma, con la clave. | |
| **Descifrar** | Criptograma → texto claro, con la clave. | |

```
texto claro ──[ algoritmo + clave ]──► criptograma ──[ algoritmo + clave ]──► texto claro
               cifrar                                 descifrar
```

---

<!-- content: UD02-C01 -->

## Principio de Kerckhoffs

> La seguridad de un sistema de cifrado debe depender **solo del secreto de la clave**, no del secreto del algoritmo.

¿Por qué?

- Un algoritmo secreto acaba descubriéndose (ingeniería inversa, filtraciones).
- Un algoritmo **público** lo revisan miles de expertos: si tuviera fallos, se conocerían.
- Si se compromete la clave, basta con **cambiar la clave**, no todo el sistema.

Por eso **AES** y **RSA** son públicos y estándar, y aun así son seguros.

<span class="muted">Desconfía de productos que basan su seguridad en un "algoritmo propio y secreto".</span>

---

<!-- content: UD02-C01 -->

## Objetivos (servicios de seguridad)

| Objetivo | Pregunta que responde | Herramienta criptográfica |
|---|---|---|
| **Confidencialidad** | ¿Puede leerlo alguien no autorizado? | Cifrado simétrico o asimétrico |
| **Integridad** | ¿Se ha modificado por el camino? | Funciones hash |
| **Autenticación** | ¿Quién lo envía de verdad? | Firma digital, certificados |
| **No repudio** | ¿Puede el emisor negar que lo envió? | Firma digital |

> Ninguna herramienta cubre todos los objetivos por sí sola: en la práctica se **combinan**.

---

<!-- content: UD02-C01 -->

## Ejercicio · ¿qué objetivo se protege?

Indica el objetivo principal en cada caso:

1. Un banco cifra la conexión con su web.
2. Comparas el hash de una ISO descargada con el publicado en la web oficial.
3. Un proveedor firma digitalmente una factura y después no puede negar que la emitió.
4. Un correo llega firmado y compruebas que lo ha enviado tu jefa.

<details><summary>Ver solución</summary>

1. Confidencialidad. 2. Integridad. 3. No repudio. 4. Autenticación (del emisor).

</details>

---

<!-- _class: lead -->

# 2 · Criptografía clásica
### UD02-C01

Sustitución y transposición: César y Vigenère.

---

<!-- content: UD02-C01 -->

## Transposición y sustitución

| Tipo | Qué hace | Ejemplo |
|---|---|---|
| **Transposición** | Cambia el **orden** de las letras. Son las mismas letras, desordenadas. | `HOLA` → `OHAL` |
| **Sustitución** | Cambia **cada letra por otra**. | `HOLA` → `KROD` |

En esta unidad usamos el **alfabeto de 26 letras sin Ñ** (el que usa CyberChef):

```
A  B  C  D  E  F  G  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z
0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
```

---

<!-- content: UD02-C01 -->

## Cifrado César

Sustitución **monoalfabética**: cada letra se desplaza **k posiciones**. La clave es el número **k**. Tras la Z se vuelve a la A.

Con **k = 3**: `A→D`, `B→E`, …, `X→A`, `Y→B`, `Z→C`

```
Texto claro:  H O L A   M U N D O
Criptograma:  K R O D   P X Q G R
```

- **Cifrar:** desplazar k a la derecha.
- **Descifrar:** desplazar k a la izquierda (o 26 − k a la derecha).

<span class="muted">Julio César lo usaba en sus comunicaciones militares, con k = 3.</span>

---

<!-- content: UD02-C01 -->

## ¿Cómo se rompe el César?

**1. Fuerza bruta**
Solo hay **25 claves posibles**. Se prueban todas en segundos, incluso a mano.

**2. Análisis de frecuencias**
Cada letra se sustituye **siempre por la misma**, así que las frecuencias del idioma se mantienen.

| Castellano | E | A | O | S | R | N |
|---|---|---|---|---|---|---|
| Frecuencia aprox. | 13,7 % | 12,5 % | 8,7 % | 8,0 % | 6,9 % | 6,7 % |

Si en el criptograma la letra más frecuente es la **H**, probablemente **H = E** → k = 7 − 4 = **3**.

<span class="muted">Frecuencias orientativas; varían según el texto y el estudio.</span>

---

<!-- content: UD02-C01 -->

## Cifrado Vigenère

Sustitución **polialfabética**: la clave es una **palabra** y cada letra indica un desplazamiento (A = 0, B = 1, C = 2…). La clave se repite; los espacios no consumen letras.

Clave `LIMON` → desplazamientos 11, 8, 12, 14, 13

```
Texto claro:  A T A C A R   A L   A M A N E C E R
Clave:        L I M O N L   I M   O N L I M O N L
Criptograma:  L B M Q N C   I X   O Z L V Q Q R C
```

La misma letra **A** se cifra como **L, M, N, I, O**… según su posición.

→ Las frecuencias del idioma **se reparten**: el análisis simple no funciona.

<span class="muted">Se consideró "indescifrable" durante siglos; hoy se rompe con ordenador (método de Kasiski).</span>

---

<!-- content: UD02-C01 -->

## Espacio de claves

El **espacio de claves** es el número de claves posibles. Cuanto mayor, más difícil la fuerza bruta.

| Cifrado | Claves posibles | Tiempo de fuerza bruta |
|---|---|---|
| César | 25 | Segundos, a mano |
| Vigenère, clave de 5 letras | 26⁵ ≈ 11,8 millones | Instantáneo con ordenador |
| DES (56 bits) | 2⁵⁶ ≈ 7,2 · 10¹⁶ | Horas o días con hardware dedicado |
| **AES-128** | 2¹²⁸ ≈ 3,4 · 10³⁸ | Inviable con la tecnología actual |
| **AES-256** | 2²⁵⁶ ≈ 1,2 · 10⁷⁷ | Inviable con la tecnología actual |

> Cada bit más de clave **duplica** el número de claves posibles.

---

<!-- content: UD02-C01 -->

## Ejercicio · César y Vigenère

1. Cifra `SOL` con César, k = 3.
2. Descifra `DWDFDU DO DPDQHFHU` (César, k = 3).
3. ¿Por qué el análisis de frecuencias funciona con César y no con Vigenère?

<details><summary>Ver solución</summary>

1. `VRO`
2. `ATACAR AL AMANECER`
3. En César cada letra se cifra siempre igual, así que se conservan las frecuencias. En Vigenère una letra se cifra de forma distinta según la letra de la clave que le corresponde, y las frecuencias se reparten.

</details>

---

<!-- _class: lead -->

# 3 · Criptografía simétrica
### UD02-C02

Una sola clave secreta compartida.

---

<!-- content: UD02-C02 -->

## Cifrado simétrico (de clave secreta)

Se usa **la misma clave** para cifrar y para descifrar. Emisor y receptor deben **compartirla** antes de comunicarse.

```
           clave K                              clave K
Texto claro ──► [ CIFRAR ] ──► criptograma ──► [ DESCIFRAR ] ──► Texto claro
   (Ana)                     (viaja por la red)                     (Luis)
```

- Si un atacante captura el criptograma, sin la clave **K** no puede leerlo.
- Si el atacante consigue **K**, puede leer **todo** lo cifrado con ella.

---

<!-- content: UD02-C02 -->

## Algoritmos simétricos

| Algoritmo | Tamaño de clave | Situación |
|---|---|---|
| DES | 56 bits | **Obsoleto.** Roto por fuerza bruta en 1998. |
| 3DES | 112 / 168 bits | **Obsoleto.** Lento; retirado por el NIST. |
| **AES** | 128, 192, 256 bits | **Estándar actual** (2001). |
| ChaCha20 | 256 bits | Moderno; muy usado en móviles y TLS. |

**¿Dónde se usa AES?**

- **WPA2 / WPA3** (wifi) · **HTTPS** (TLS) · **BitLocker**, **VeraCrypt**, FileVault
- **7-Zip** (AES-256) · **GPG** con `gpg -c`

<span class="muted">AES y DES cifran por bloques (128 y 64 bits); ChaCha20 cifra en flujo.</span>

---

<!-- content: UD02-C02 -->

## Ventajas e inconvenientes

**Ventajas**

- **Muy rápido**: cifra gigabytes por segundo (los procesadores tienen instrucciones AES).
- Claves cortas (128–256 bits) con seguridad muy alta.
- Ideal para cifrar **grandes volúmenes**: discos, archivos, vídeo, tráfico de red.

**Inconvenientes**

1. **Distribución de la clave**: ¿cómo envío la clave sin que la intercepten? Si va por el mismo canal que el mensaje, quien capture uno captura los dos.
2. **Número de claves**: una distinta por cada pareja. Para *n* personas: **n·(n−1)/2**.
   100 personas → **4.950 claves**.
3. **No hay no repudio**: los dos tienen la misma clave, cualquiera pudo cifrar.

---

<!-- content: UD02-C02 -->

## En la práctica: `gpg -c`

```bash
gpg -c --cipher-algo AES256 secreto.txt      # cifra con contraseña → secreto.txt.gpg
file secreto.txt.gpg                          # "... AES with 256-bit key ..."
gpgconf --kill gpg-agent                      # olvida la contraseña en memoria
gpg -o recuperado.txt -d secreto.txt.gpg      # descifra
```

- La **frase de contraseña** se transforma en una clave AES de 256 bits.
- Sin la contraseña, el archivo es ilegible.
- Problema: tengo que hacer llegar la contraseña al destinatario **por otro canal seguro**.

<span class="muted">En Windows: Gpg4win (Kleopatra) o 7-Zip con cifrado AES-256.</span>

---

<!-- content: UD02-C02 -->

## Ejercicio · cifrado simétrico

1. Cifras un archivo con `gpg -c` y lo mandas por correo a un compañero. ¿Es seguro escribir la contraseña en el mismo correo? ¿Por qué?
2. Una empresa con 10 empleados quiere que cada pareja tenga una clave simétrica propia. ¿Cuántas claves necesita?
3. ¿Por qué el cifrado simétrico no garantiza el no repudio?

<details><summary>Ver solución</summary>

1. No: quien intercepte el correo tendrá el archivo y la clave. Hay que usar otro canal (en persona, teléfono, SMS) o criptografía asimétrica.
2. 10 · 9 / 2 = **45 claves**.
3. Emisor y receptor tienen la misma clave: cualquiera de los dos pudo cifrar el mensaje, así que el emisor puede negar haberlo hecho.

</details>

---

<!-- _class: lead -->

# 4 · Funciones hash
### UD02-C04

La huella digital de los datos.

---

<!-- content: UD02-C04 -->

## ¿Qué es una función hash?

Una **función hash** (resumen) convierte cualquier dato —una palabra o un archivo de 4 GB— en una **huella de longitud fija**.

```
"hola"  ──► SHA-256 ──► b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79
"Hola"  ──► SHA-256 ──► e633f4fc79badea1dc5db970cf397c8248bac47cc3acf9915ba60b5d76b0e88f
```

- SHA-256 siempre produce **256 bits** = **64 caracteres hexadecimales**.
- Un cambio en **una sola letra** produce un hash totalmente distinto.

> Un hash **no es cifrado**: no usa clave y **no se puede descifrar**.

---

<!-- content: UD02-C04 -->

## Propiedades de un hash criptográfico

| Propiedad | Significado |
|---|---|
| **Longitud fija** | La salida mide siempre lo mismo, sea cual sea la entrada. |
| **Determinista** | La misma entrada da siempre el mismo hash. |
| **Unidireccional** | Del hash **no se puede** obtener el dato original. |
| **Efecto avalancha** | Un cambio mínimo (un bit) cambia por completo el hash. |
| **Resistencia a colisiones** | Es prácticamente imposible encontrar dos entradas con el mismo hash. |

<span class="muted">Las colisiones existen en teoría (infinitas entradas, salidas finitas), pero en un buen algoritmo no se pueden encontrar en la práctica.</span>

---

<!-- content: UD02-C04 -->

## Algoritmos hash

| Algoritmo | Salida | Situación |
|---|---|---|
| MD5 | 128 bits | **Roto**: se fabrican colisiones. Solo para detectar errores accidentales. |
| SHA-1 | 160 bits | **Roto** (colisión práctica en 2017). No usar. |
| **SHA-256 / SHA-512** (SHA-2) | 256 / 512 bits | **Recomendados.** |
| SHA-3 | 224–512 bits | Recomendado; diseño distinto a SHA-2. |

**Usos**

- **Integridad** de archivos descargados (comparar con el hash oficial).
- **Almacenar contraseñas**: se guarda el hash, no la contraseña (con *sal*).
- **Firma digital**: se firma el hash del documento.

---

<!-- content: UD02-C04 -->

## En la práctica: comprobar la integridad

```bash
sha256sum presupuesto.txt                         # Linux
Get-FileHash presupuesto.txt -Algorithm SHA256    # Windows (PowerShell)

echo "HASH_OFICIAL  kali.iso" | sha256sum -c      # comprobación automática
# kali.iso: OK       → íntegro
# kali.iso: FAILED   → modificado o corrupto: no usar
```

> El hash de referencia debe llegar por un **canal distinto y fiable** (la web oficial con HTTPS, por teléfono…). Si un atacante modifica el archivo, también puede modificar un hash que viaje con él.

---

<!-- content: UD02-C04 -->

## Ejercicio · hash

1. Calculas el SHA-256 de un archivo, cambias una coma y lo vuelves a calcular. ¿Qué ocurre?
2. ¿Se puede "descifrar" un hash? ¿Por qué?
3. ¿Por qué no se debe usar MD5 para comprobar si alguien ha manipulado un archivo?

<details><summary>Ver solución</summary>

1. Se obtiene un hash completamente distinto (efecto avalancha), con la misma longitud.
2. No: es unidireccional y no usa clave. Solo se puede probar entradas y comparar (fuerza bruta o diccionario).
3. Porque está roto: un atacante puede fabricar un archivo distinto con el mismo hash MD5.

</details>

---

<!-- _class: lead -->

# 5 · Criptografía asimétrica
### UD02-C03

Un par de claves: pública y privada.

---

<!-- content: UD02-C03 -->

## Cifrado asimétrico (de clave pública)

Cada persona tiene **un par de claves** relacionadas matemáticamente:

| Clave | Quién la tiene | Para qué |
|---|---|---|
| **Pública** | Cualquiera. Se publica o se reparte. | **Cifrar** para su dueño · **verificar** sus firmas |
| **Privada** | **Solo su dueño.** Nunca se comparte. | **Descifrar** lo recibido · **firmar** |

- Lo que se cifra con una clave solo se descifra con **la otra del mismo par**.
- Conociendo la pública **no se puede calcular** la privada.

<span class="muted">Propuesta por Diffie y Hellman en 1976; RSA se publicó en 1977.</span>

---

<!-- content: UD02-C03 -->

## Enviar un mensaje confidencial

Ana quiere enviar a Luis un mensaje que **solo Luis** pueda leer:

```
Ana: texto ──► cifra con la PÚBLICA de Luis ──► criptograma ──► Luis: descifra con su PRIVADA
```

- Solo Luis puede leerlo: solo él tiene su clave privada.
- Ni siquiera Ana puede descifrarlo una vez cifrado.
- La clave pública puede viajar por **cualquier canal**: **se resuelve la distribución de claves**.
- Cada persona necesita **un solo par**: para *n* personas, *n* pares (no n·(n−1)/2).

> **Regla:** para que algo sea **secreto**, cifro con la **clave pública del destinatario**.

---

<!-- content: UD02-C03 -->

## Algoritmos asimétricos y limitaciones

| Algoritmo | Base | Claves habituales |
|---|---|---|
| **RSA** | Dificultad de factorizar números enormes | 2048–4096 bits |
| **ECC** (curvas elípticas: Ed25519, Curve25519) | Problema del logaritmo discreto en curvas | 256 bits ≈ RSA 3072 |
| ElGamal | Logaritmo discreto | 2048+ bits |

**Limitaciones**

- **Muy lento**: cientos o miles de veces más que AES. No sirve para grandes volúmenes.
- **¿De quién es esta clave pública?** Un atacante podría hacerse pasar por Luis con su propia clave → se necesita comprobar la **huella** o un **certificado**.

<span class="muted">GPG 2.4 genera por defecto claves ECC (ed25519 para firmar, cv25519 para cifrar).</span>

---

<!-- content: UD02-C03 -->

## Cifrado híbrido: lo mejor de los dos

1. Se genera una **clave de sesión** simétrica aleatoria.
2. El **mensaje** se cifra con la clave de sesión usando **AES** (rápido).
3. La **clave de sesión** se cifra con la **pública del destinatario** (seguro).
4. Se envían las dos cosas.
5. El destinatario descifra la clave de sesión con su **privada** y, con ella, el mensaje.

```
mensaje ──AES(clave de sesión)──────────────► mensaje cifrado  ┐
clave de sesión ──cifrar con PÚBLICA de Luis─► clave cifrada    ┘──► Luis
```

> La asimétrica **intercambia la clave**; la simétrica **cifra los datos**. Así funcionan **HTTPS, GPG, SSH y WhatsApp**.

---

<!-- content: UD02-C03 -->

## Simétrica frente a asimétrica

| | Simétrica | Asimétrica |
|---|---|---|
| Claves | Una, secreta y compartida | Par: pública y privada |
| Velocidad | Muy rápida | Muy lenta |
| Distribución de claves | Problema principal | Resuelta (la pública se reparte) |
| Nº de claves (n personas) | n·(n−1)/2 | n pares |
| No repudio | No | Sí, con firma digital |
| Ejemplos | AES, ChaCha20 | RSA, ECC |
| Uso típico | Cifrar datos | Intercambiar claves y firmar |

---

<!-- content: UD02-C03 -->

## En la práctica: GPG asimétrico

```bash
gpg --full-generate-key                          # crear mi par de claves
gpg --armor --export yo@centro.es > mi_clave.asc # exportar mi PÚBLICA
gpg --import clave_luis.asc                      # importar la pública de Luis
gpg --fingerprint luis@centro.es                 # comprobar su huella en persona
gpg -a -e -r luis@centro.es -o msg.asc msg.txt   # cifrar para Luis
gpg -d msg.asc                                   # Luis descifra con su privada
```

> ⚠️ **Nunca** exportes ni compartas tu clave privada (`--export-secret-keys`).

---

<!-- content: UD02-C03 -->

## Ejercicio · asimétrica

1. Luis quiere responder a Ana de forma confidencial. ¿Con qué clave cifra?
2. Un atacante intercepta el mensaje cifrado y la clave pública de Ana. ¿Puede leerlo?
3. ¿Por qué HTTPS no cifra toda la conexión con RSA?

<details><summary>Ver solución</summary>

1. Con la **clave pública de Ana**.
2. No: para descifrar hace falta la **privada** de Ana, que solo tiene ella.
3. Porque la asimétrica es muy lenta. Se usa solo para acordar una clave de sesión, y los datos se cifran con AES o ChaCha20 (cifrado híbrido).

</details>

---

<!-- _class: lead -->

# 6 · Firma digital
### UD02-C05

Autenticación, integridad y no repudio.

---

<!-- content: UD02-C05 -->

## ¿Qué es la firma digital?

Usa la criptografía asimétrica **al revés**: se firma con la clave **privada** y cualquiera verifica con la **pública**.

Garantiza:

- **Autenticación**: lo firmó el dueño de la clave privada.
- **Integridad**: el documento no ha cambiado desde que se firmó.
- **No repudio**: el firmante no puede negar haberlo firmado.

> La firma **no da confidencialidad**: un documento firmado se puede leer. Para que además sea secreto hay que **firmar y cifrar**.

---

<!-- content: UD02-C05 -->

## Cómo se firma y se verifica

**Firmar (Ana)**
1. Calcula el **hash** del documento.
2. Lo cifra con su **clave privada** → eso es la **firma**.
3. Envía documento + firma.

**Verificar (Luis)**
1. Descifra la firma con la **pública de Ana** → hash A.
2. Calcula el hash del documento recibido → hash B.
3. Si **hash A = hash B**, la firma es válida.

```
FIRMAR:     documento ─► hash ─► cifrar con PRIVADA de Ana ─► firma
VERIFICAR:  firma ─► PÚBLICA de Ana ─► hash A   ┐
            documento ─► hash ─────────► hash B ┘ ¿iguales?
```

<span class="muted">Se firma el hash porque la asimétrica es lenta. Esquema simplificado: con RSA es así; con ECC (EdDSA) la operación matemática es otra, pero el uso de las claves es el mismo.</span>

---

<!-- content: UD02-C05 -->

## ¿Qué clave uso?

| Quiero… | Uso la clave… |
|---|---|
| Cifrar un mensaje para Luis | **pública de Luis** |
| Descifrar un mensaje que me envían | **mi privada** |
| Firmar un documento | **mi privada** |
| Verificar la firma de Ana | **pública de Ana** |

> Truco: lo **privado** lo uso **yo** (descifrar lo mío, firmar como yo). Lo **público** lo usan **los demás** conmigo (cifrar para mí, verificarme).

---

<!-- content: UD02-C05 -->

## En la práctica: firmar con GPG

```bash
gpg -a -e -s -r luis@centro.es -o msg.asc msg.txt   # cifrar para Luis y firmar
gpg -d msg.asc                                      # descifrar y verificar
# gpg: Good signature from "Ana ... <ana@centro.es>"

gpg --clearsign autorizacion.txt                    # firma legible (sin cifrar)
gpg --verify autorizacion.txt.asc                   # si se modifica: BAD signature

gpg -a --detach-sign aviso.txt                      # firma separada → aviso.txt.asc
gpg --verify aviso.txt.asc aviso.txt
```

<span class="muted">El aviso "This key is not certified with a trusted signature" indica que no has confirmado la identidad del dueño de la clave, no que la firma sea mala.</span>

---

<!-- content: UD02-C05 -->

## Firma electrónica en la ley

Reglamento europeo **eIDAS** (UE 910/2014) y, en España, **Ley 6/2020**:

| Tipo | Ejemplo | Valor |
|---|---|---|
| **Simple** | Nombre al final de un correo, firma escaneada | Bajo |
| **Avanzada** | Firma con certificado digital (FNMT en el navegador) | Identifica al firmante y detecta cambios |
| **Cualificada** | Avanzada + certificado cualificado + dispositivo seguro (**DNIe**) | **Equivale a la firma manuscrita** |

---

<!-- content: UD02-C05 -->

## Ejercicio · firma digital

1. ¿Con qué clave firma Ana? ¿Con cuál verifica Luis?
2. Recibes un contrato firmado, cambias una cifra y verificas la firma. ¿Qué resultado obtienes y por qué?
3. Un documento firmado digitalmente, ¿es confidencial?

<details><summary>Ver solución</summary>

1. Ana firma con **su privada**; Luis verifica con **la pública de Ana**.
2. **Firma no válida** (BAD signature): el hash del documento modificado ya no coincide con el hash firmado.
3. No. La firma da autenticación, integridad y no repudio. Para confidencialidad hay que cifrarlo.

</details>

---

<!-- _class: lead -->

# 7 · Certificados digitales
### UD02-C06

¿De verdad es suya esta clave pública?

---

<!-- content: UD02-C06 -->

## El problema de la confianza

Recibo una clave pública que dice ser **de mi banco**. ¿Y si es de un atacante?

Dos soluciones:

| Modelo | Quién garantiza la identidad | Ejemplo |
|---|---|---|
| **Red de confianza** | Las propias personas comprueban la huella y firman claves ajenas. | PGP / GPG |
| **PKI jerárquica** | Una **Autoridad de Certificación (CA)** de confianza. | Certificados X.509: HTTPS, DNIe, FNMT |

---

<!-- content: UD02-C06 -->

## Certificado digital

Documento electrónico que **une una clave pública con una identidad** (persona, empresa o web) y está **firmado por una CA**.

**Contenido (estándar X.509):**

- **Titular**: nombre, DNI/CIF o dominio web.
- **Clave pública** del titular.
- **Emisor**: la CA que lo firma.
- **Periodo de validez** (desde / hasta).
- Número de serie y algoritmos.
- **Firma digital de la CA**.

> El certificado **nunca contiene la clave privada**: esa solo la guarda el titular.

---

<!-- content: UD02-C06 -->

## Autoridades de Certificación (CA)

Una **CA** comprueba la identidad del solicitante y **firma** su certificado.

Ejemplos: **FNMT-RCM**, **Dirección General de la Policía** (DNIe), Let's Encrypt, DigiCert.

```
CA raíz (en el navegador / sistema)  ──firma──►  CA intermedia  ──firma──►  certificado de la web
```

- El navegador confía en una lista de **CA raíz**.
- Un certificado es válido si su **cadena** llega a una raíz de confianza, no ha caducado y no está **revocado**.
- **Revocación**: anular un certificado antes de que caduque (p. ej., si se roba la clave privada).

---

<!-- content: UD02-C06 -->

## HTTPS: el candado del navegador

1. El servidor envía su **certificado**.
2. El navegador comprueba: firma de una CA de confianza, validez, revocación y que el **dominio coincide**.
3. Se acuerda una **clave de sesión** con criptografía asimétrica.
4. El tráfico se cifra con esa clave simétrica (AES o ChaCha20) → **cifrado híbrido**.

> El candado significa **conexión cifrada con el dominio que ves**, **no** que la web sea honrada.
> Una web de *phishing* puede tener HTTPS: comprueba siempre el **dominio exacto**.

---

<!-- content: UD02-C06 -->

## DNIe, certificado FNMT y Cl@ve

| Sistema | Qué es | Uso |
|---|---|---|
| **DNIe** | Chip con dos certificados: **autenticación** y **firma** (cualificada). Se usa con lector o NFC y un PIN. | Identificarse y firmar con validez legal |
| **Certificado FNMT** (persona física) | Certificado instalado en el navegador u ordenador. | Hacienda, Seguridad Social, sedes electrónicas |
| **Cl@ve** | Identificación de la Administración sin certificado (usuario + PIN o app). | Trámites sencillos |

<span class="muted">Guía de referencia: "Guía para el uso seguro del DNI electrónico en Internet" (carpeta UD02).</span>

---

<!-- content: UD02-C06 -->

## Ejercicio · certificados

1. ¿Qué dato **nunca** aparece en un certificado digital?
2. Entras en `https://agenciatributaria-devoluciones.com` y ves el candado. ¿Es fiable?
3. ¿Qué diferencia hay entre comprobar la huella de una clave GPG y confiar en un certificado de la FNMT?

<details><summary>Ver solución</summary>

1. La **clave privada** del titular.
2. No necesariamente: el candado solo indica que la conexión con ese dominio está cifrada. El dominio no es el oficial (`agenciatributaria.gob.es`): posible phishing.
3. En GPG la identidad la compruebas tú (red de confianza). En el certificado FNMT la garantiza una **CA** de confianza (PKI jerárquica).

</details>

---

<!-- _class: lead -->
<!-- content: UD02-C01, UD02-C02, UD02-C03, UD02-C04, UD02-C05, UD02-C06 -->

# Síntesis

Proteger la información transmitida es **combinar** cifrado, hash, firma y certificados según el objetivo.

---

<!-- content: UD02-C01, UD02-C02, UD02-C03, UD02-C04, UD02-C05, UD02-C06 -->

## Qué herramienta para qué objetivo

| Objetivo | Herramienta | Clave |
|---|---|---|
| Confidencialidad de muchos datos | Simétrica (AES) | Secreta compartida |
| Mensaje secreto sin clave previa | Asimétrica (RSA / ECC) | Pública del destinatario |
| Integridad | Hash (SHA-256) | Ninguna |
| Autenticación, integridad y no repudio | Firma digital | Privada del firmante |
| Confiar en una clave pública | Certificado de una CA | — |

---

<!-- content: UD02-C01, UD02-C02, UD02-C03, UD02-C04, UD02-C05, UD02-C06 -->

## Ideas clave

- **Kerckhoffs**: la seguridad está en la clave, no en el algoritmo.
- **César y Vigenère**: espacio de claves pequeño, se rompen por fuerza bruta o frecuencias.
- **Simétrica**: rápida, pero hay que **distribuir la clave**.
- **Asimétrica**: resuelve la distribución, pero es lenta → **cifrado híbrido**.
- **Hash**: huella fija y unidireccional; detecta cualquier cambio. MD5 y SHA-1 están rotos.
- **Firma**: privada para firmar, pública para verificar. **No** da confidencialidad.
- **Certificado**: une clave pública e identidad, firmado por una **CA**. El candado ≠ web honrada.

> Próximo paso: prácticas guiadas con **CyberChef** y **GPG**.
