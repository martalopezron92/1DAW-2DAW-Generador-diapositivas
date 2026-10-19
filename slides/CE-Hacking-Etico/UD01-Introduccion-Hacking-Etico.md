---
marp: true
theme: default
paginate: true
size: 16:9
lang: es
title: "UD01 · Introducción al hacking ético"
description: "Conceptos de seguridad de la información, amenazas, vulnerabilidades, pentesting y recursos de aprendizaje"
header: "UD01 · Introducción al *hacking* ético"
footer: "Hacking ético · Unidad 1"
style: |
  section {
    font-size: 23px;
    padding: 50px 60px 50px 60px;
    background: #ffffff;
    color: #1f2937;
  }
  h1 { color: #1e3a8a; font-size: 1.7em; }
  h2 { color: #1e40af; font-size: 1.35em; border-bottom: 3px solid #93c5fd; padding-bottom: 4px; }
  h3 { color: #2563eb; font-size: 1.05em; margin-bottom: 0.2em; }
  strong { color: #1e3a8a; }
  em { color: #374151; }
  table { font-size: 0.78em; margin: 0 auto; }
  th { background: #1e40af; color: #fff; }
  code { font-size: 0.9em; }
  pre { font-size: 0.68em; line-height: 1.25; }
  blockquote { border-left: 6px solid #60a5fa; background: #eff6ff; padding: 8px 16px; font-size: 0.9em; color: #1f2937; }
  header, footer { color: #64748b; font-size: 14px; }
  section.lead { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #fff; }
  section.lead h1, section.lead h2, section.lead h3, section.lead strong, section.lead em { color: #fff; border: none; }
  th em, th strong { color: #fff; }
  section.lead::after { color: #bfdbfe; }
  section.lead header, section.lead footer { color: #bfdbfe; }
  section.cols { columns: 2; column-gap: 40px; }
  section.cols h2, section.cols > p:first-of-type { column-span: all; }
  section.small { font-size: 19px; }
  section.tiny { font-size: 17px; }
  .muted { color: #6b7280; }
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _header: "" -->

# Unidad 1
# Introducción al *hacking* ético

Conceptos de seguridad · Amenazas · Vulnerabilidades · *Pentesting* · Cómo formarse

---

## Objetivos de la unidad

Al terminar esta unidad deberías ser capaz de:

1. **Identificar** las necesidades de la seguridad informática y valorar su importancia.
2. **Conocer** los distintos tipos de auditorías de seguridad y su utilidad.
3. **Estudiar** las fases de un *pentest* (test de intrusión) y las metodologías de distintos organismos.
4. **Realizar** retos CTF para el autoaprendizaje como *hacker* ético.

> Idea fuerza: **un *hacker* ético usa las mismas técnicas que un atacante, pero con autorización, con un objetivo de mejora y documentando todo lo que hace.**

---

## Mapa de contenidos

```
                     ┌───────────────────────────────────┐
                     │   UD01 · INTRODUCCIÓN AL HACKING  │
                     └────────────────┬──────────────────┘
     ┌──────────────┬────────────────┼────────────────┬─────────────────┐
     ▼              ▼                ▼                ▼                 ▼
 1.1 Historia   1.2 Conceptos    1.3 Amenazas     1.4 Pentest      1.5 From zero
 · origen       · CIA + Aut.     · intrusos       · tipos de         to hero
 · phreaking      + No repudio   · malware          auditoría      · perfil
 · hackers      · medidas        · ataques        · fases          · CTF
   famosos      · hacking y      · vulnera-       · contrato       · recursos
 · cibercrimen    la ley           bilidades      · metodologías   · certificaciones
   actual       · tipos hacker     (CVE/CVSS/CWE) · Red/Blue/Purple· bug bounty
```

---

<!-- _class: lead -->

# 1.1 Un poco de historia

---

## Origen del término *hacker*

- En inglés, un ***hack*** es una **solución rápida e ingeniosa a un problema**.
- Los primeros ***hackers*** fueron estudiantes e ingenieros que buscaban **mejorar constantemente** las soluciones de los primeros sistemas informáticos.
- Contexto: conexiones telefónicas lentas y caras, mientras las universidades tenían redes rápidas y gran potencia de cálculo.
- Finales de los 60 – principios de los 70: nace el ***phreaking*** → piratear las comunicaciones telefónicas para llamar gratis o conectarse a Internet sin límite.
- Sus acciones, aunque movidas por la **curiosidad**, eran **ilegales** → nace una **subcultura *underground*** (chats, foros privados, ***nicknames***).
- Muchos fueron detenidos; algunos, tras salir de prisión, trabajaron para grandes corporaciones o fundaron sus propias empresas.

---

## El Manifiesto *Hacker* (1986)

- Autor: **Loyd Blankenship**, alias **The Mentor**, miembro de **Legion of Doom**.
- Publicado tras su detención en la revista *online* ***Phrack***: *The Conscience of a Hacker*.
- Expone las **motivaciones éticas** del *hacker*.

> «… Sí, soy un delincuente. Mi delito es la curiosidad. Mi delito es juzgar a la gente por lo que dice y por lo que piensa, no por lo que parece. Mi delito es ser más inteligente que vosotros, algo que nunca me perdonaréis.
> Soy un *hacker*, y este es mi manifiesto. Podéis eliminar a algunos de nosotros, pero no a todos… Después de todo, somos todos iguales.»

**Para reflexionar:** ¿la curiosidad justifica el acceso no autorizado? → La respuesta legal actual es **no** (ver 1.2.3).

---

## Historia del *hacking* en España y *hackers* famosos

**Hackstory.es** — Mercè Molist: *La historia nunca contada del underground hacker en la Península Ibérica* (descarga libre). Primeros grupos, magazines, foros, ingeniería social, *blue boxes*, virus, *crackers*, rivalidades y detenciones.

| Personaje | Alias | Hito |
|---|---|---|
| **John T. Draper** | *Captain Crunch* | Silbato de cereales Cap'n Crunch que emitía **2600 Hz**, la señal que liberaba las líneas de AT&T → llamadas gratis. Trabajó después para Apple. |
| **Vladimir Levin** | — | Considerado el primer *hacker* en robar un banco por Internet: **Citibank**, ~10 M$. Detenido en 1995 en Heathrow. |
| **Kevin Poulsen** | *Dark Dante* | *Phreaker*: manipuló concursos telefónicos. Tras la cárcel, periodista (SecurityFocus, editor de *Wired*). |
| **Kevin Mitnick** | — | Accedió a sistemas de la NASA y del DoD. Fundó Mitnick Security. Libros: *El arte de la intrusión*, *El arte de la invisibilidad*. Película *Takedown* (2000). |

---

## 1.1.3 La ciberdelincuencia en la actualidad

<!-- _class: small -->

Estadísticas de cibercriminalidad en España (Observatorio Español de Delitos Informáticos):

| Tipo de ciberdelito | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 |
|---|---:|---:|---:|---:|---:|---:|
| **Fraude informático** | 45 894 | 60 511 | 88 760 | 192 375 | 257 907 | **267 011** |
| Amenazas y coacciones | 11 473 | 11 270 | 11 906 | 12 782 | 14 066 | 17 319 |
| Falsificación informática | 2697 | 2961 | 3095 | 4275 | 6289 | 10 476 |
| Acceso e interceptación ilícita | 2579 | 2505 | 2750 | 4004 | 4653 | 5342 |
| Contra el honor | 1524 | 1537 | 1423 | 1422 | 1550 | 1426 |
| Delitos sexuales | 1188 | 1312 | 1393 | 1774 | 1783 | 1628 |
| Interferencia en datos y sistema | 1110 | 1102 | 1015 | 1473 | 1590 | 2138 |
| Propiedad intelectual/industrial | 121 | 109 | 217 | 197 | 125 | 137 |
| **TOTAL** | 66 586 | 81 307 | 110 603 | 218 302 | 287 963 | **305 477** |

**Lectura:** el fraude informático se multiplica por **≈ 5,8** (45 894 → 267 011) y el total por **≈ 4,6** entre 2016 y 2021. La pandemia de COVID‑19 aceleró la tendencia.

---

## Casos recientes y consecuencias

- **Twitch (oct. 2021):** filtración de **125 GB** (código fuente y datos económicos, incl. ingresos de *streamers*).
- **CSIC (jul. 2022):** ataque de ***ransomware***, posiblemente desde Rusia; detectado a tiempo.
- **Pegasus:** *spyware* en móviles de miembros del Gobierno → posible robo de **> 2 GB**.
- **Ransomware**: el más común. Cifra la información y paraliza la empresa; se exige rescate y se amenaza con publicar los datos. Muchas empresas pagan porque **no tienen planes de seguridad** adecuados → realimenta el delito.
- **Protección de datos (AEPD):** obligaciones, régimen sancionador y multas millonarias. En Europa las multas **aumentaron un 521 % en 2021** (> 1000 M€).
- **Falta de talento:** según INCIBE, la demanda en ciberseguridad doblaría la oferta en 2024 (≈ **83 000** profesionales necesarios).

---

<!-- _class: lead -->

# 1.2 Conceptos básicos

---

## Seguridad de la información

- **Seguridad:** ausencia de peligro, daño o riesgo.
- **Información:** conjunto organizado de datos que constituye un mensaje.

> **Seguridad de la información** = conjunto de **medidas de prevención, detección y corrección** orientadas a proteger la **confidencialidad, integridad y disponibilidad** de la información.

| Seguridad **defensiva** | Seguridad **ofensiva** |
|---|---|
| Medidas para **proteger** la información y los recursos | Técnicas para **vulnerar** los controles y poner en riesgo los principios |
| *Blue Team* | *Red Team* / *hacker* ético |

Ambos equipos compiten en un "juego del ratón y el gato" → **mejora continua** de la seguridad.

---

## 1.2.1 Principios de la seguridad: la tríada CIA

```
                        ┌──────────────────────┐
                        │   CONFIDENCIALIDAD   │  Solo la conocen las personas
                        │   (confidentiality)  │  autorizadas → evita divulgación
                        └──────────┬───────────┘
                                  ╱ ╲
                                 ╱   ╲
                                ╱ INFO╲
                               ╱       ╲
          ┌──────────────────┐╱─────────╲┌────────────────────┐
          │    INTEGRIDAD    │           │   DISPONIBILIDAD   │
          │    (integrity)   │           │   (availability)   │
          └──────────────────┘           └────────────────────┘
        No se altera sin permiso           Accesible a los autorizados
        ni por accidente → consistencia     de forma inmediata e ininterrumpida
```

| Principio | Amenaza típica | Control típico |
|---|---|---|
| Confidencialidad | *Sniffing*, robo de credenciales | Cifrado (TLS, AES), control de acceso |
| Integridad | Modificación de datos, MitM | *Hash* (SHA‑256), firma digital, HMAC |
| Disponibilidad | DoS/DDoS, *ransomware*, incendio | Redundancia, RAID, SAI, copias de seguridad |

---

## Principios adicionales: autenticación y no repudio

Cuando la información se **comparte e intercambia**, se añaden:

### Autenticación (*authentication*)
Garantiza la **identidad del creador** de la información. Factores de autenticación:

| Factor | Ejemplos |
|---|---|
| Algo que **sabes** | PIN, contraseña |
| Algo que **tienes** | Tarjeta RFID, teléfono, clave privada |
| Algo que **eres** (inherente) | Huella dactilar, iris, rostro |

**MFA** (*multi-factor authentication*): combinar **factores de categorías distintas** → método recomendado hoy. Dos contraseñas **no** son MFA.

### No repudio (*non-repudiation*)
- **De origen:** el emisor no puede negar que envió la información.
- **De destino:** el receptor no puede negar que la recibió. *(Se implementa típicamente con firma digital y acuses firmados.)*

---

## 1.2.2 Clasificación de las medidas de seguridad

```
                     MEDIDAS DE SEGURIDAD
          ┌─────────────────┴──────────────────┐
  Según el MOMENTO de actuación      Según el ELEMENTO protegido
     ┌──────────┴─────────┐            ┌──────────┴──────────┐
  ACTIVA               PASIVA        FÍSICA               LÓGICA
  (prevenir)        (reparar/       (hardware,           (software
                    minimizar)       instalaciones)        y datos)
```

| | Ejemplos |
|---|---|
| **Activa** | Control de acceso, protocolos seguros, cortafuegos |
| **Pasiva** | Copias de seguridad, RAID, SAI |
| **Física** | Frente a incendios, inundaciones, sobrecargas, robo, acceso no autorizado al CPD |
| **Lógica** | Frente a *malware*, pérdida/alteración de datos, DoS |

Una medida puede pertenecer a **varias categorías** (p. ej., *suites* que previenen y reparan).

---

## Ejercicio rápido: clasifica la medida

| Medida | Momento | Elemento |
|---|---|---|
| Cortafuegos perimetral | ? | ? |
| Copia de seguridad diaria en cinta | ? | ? |
| SAI en el CPD | ? | ? |
| Antivirus con desinfección | ? | ? |
| Control biométrico de acceso al CPD | ? | ? |

<br>

<details>
<summary>

**Solución:** cortafuegos → activa/lógica · copia → pasiva/lógica · SAI → pasiva/física · antivirus → **activa y pasiva**/lógica · biométrico → activa/física.

</summary>
</details>

---

## 1.2.3 *Hacking*: definición según la RAE

Desde 2017 (23.ª edición) el DRAE recoge **dos acepciones** de ***hacker*** / ***jáquer***:

1. **Pirata informático:** persona que accede ilegalmente a sistemas ajenos para apropiárselos u obtener información secreta.
2. **Persona con grandes habilidades** en el manejo de computadoras que investiga un sistema para **avisar de los fallos** y desarrollar técnicas de mejora.

La 2.ª acepción corrige la visión puramente negativa → **es la labor del *hacker* ético**.

---

## Tipos de *hacker* según su intención

```
  ◄──────────── Legal / ético ─────────────────────────── Ilegal / malicioso ───────────►
  ┌──────────────────────┐   ┌───────────────────────────┐   ┌──────────────────────────┐
  │  SOMBRERO BLANCO     │   │  SOMBRERO GRIS            │   │  SOMBRERO NEGRO          │
  │  (white hat)         │   │  (gray hat)               │   │  (black hat)             │
  │  Encuentra fallos y  │   │  A medio camino:          │   │  Ciberdelincuente:       │
  │  avisa. Contratado   │   │  · hacktivistas           │   │  robo, extorsión,        │
  │  para auditar.       │   │    (p. ej. Anonymous)     │   │  beneficio propio.       │
  │  = HACKER ÉTICO      │   │  · blanco que deja puerta │   │                          │
  │                      │   │    trasera para venderla  │   │                          │
  │                      │   │  · técnicas de negro para │   │                          │
  │                      │   │    perseguir delitos      │   │                          │
  └──────────────────────┘   └───────────────────────────┘   └──────────────────────────┘
```

- ***Script kiddies***: sin conocimientos; usan herramientas de otros. Pueden tener éxito ante configuraciones muy débiles sin saber cómo lo han conseguido.

---

## Marco legal en España: Código Penal

<!-- _class: small -->

Artículos **197 a 201**; especialmente los incorporados en **2015**:

| Artículo | Conducta | Pena |
|---|---|---|
| **197 bis.1** | **Acceder** (o facilitar acceso) sin autorización a un sistema, **vulnerando medidas de seguridad**, o **mantenerse** contra la voluntad de quien tiene derecho a excluirlo | Prisión **6 meses – 2 años** |
| **197 bis.2** | **Interceptar** transmisiones no públicas de datos (incluidas emisiones electromagnéticas) sin autorización | Prisión **3 meses – 2 años** o multa **3 – 12 meses** |
| **197 ter** | **Producir, adquirir, importar o facilitar** a terceros programas o contraseñas/códigos de acceso con intención de facilitar los delitos anteriores | Prisión **6 meses – 2 años** o multa **3 – 18 meses** |

**Consecuencia práctica:** es **imprescindible una autorización por contrato** que fije el propósito y el ámbito. Sin ella, aunque no haya uso malintencionado, se puede ser denunciado.
**Caso real:** un *hacker* que descubrió y publicó un fallo grave en **LexNET** (Ministerio de Justicia) fue denunciado por el propio Ministerio.

---

<!-- _class: lead -->

# 1.3 Amenazas a la seguridad de la información

---

## Concepto de amenaza (MAGERIT)

> **Amenaza** (*threat*): «Causa potencial de un incidente que puede causar daños a un sistema de información o a una organización».
> — MAGERIT (Metodología de Análisis y Gestión de Riesgos de los Sistemas de Información)

Pueden ser **involuntarias** (desastre natural) o **deliberadas** (DDoS). Tipos según MAGERIT:

| Tipo | Ejemplo | ¿Interés para *hacking* ético? |
|---|---|:---:|
| De origen **natural** | Terremoto, inundación | No |
| Del **entorno** (origen industrial) | Corte de suministro, contaminación | No |
| **Defectos de las aplicaciones** | Vulnerabilidades, errores de diseño | Sí |
| **Personas – accidental** | Errores, ingeniería social | Sí |
| **Personas – deliberada** | Atacantes que buscan beneficio o daño | Sí |

---

## 1.3.1 Tipos de intrusos y motivaciones

<!-- _class: small -->

| Intruso | Descripción / motivación |
|---|---|
| ***Cracker*** | Provoca daños y obtiene beneficio ilegal. Años 80: ingeniería inversa para crear ***keygens*** y ***cracks*** que saltan licencias. |
| ***Phreaker*** | Acceso gratuito a redes telefónicas (años 60, módems analógicos, coste elevado). |
| ***Spammer*** | Envío masivo de correo: beneficio económico o colapso de buzones/servidores. |
| ***Lamer*** | Aparenta ser *hacker* sin conocimientos; copia y pega (*wannabe*, *script‑kiddie*). |
| ***Insider*** | Personal **de la propia empresa** que actúa contra ella (dinero, venganza). |
| **Exempleado** | Motivaciones similares al *insider*. |
| ***Hacktivist*** | Relevancia política, reivindicación (derechos humanos, medio ambiente). Ej.: **Anonymous**. |
| ***State‑sponsored hacker*** | Ataques bajo el paraguas de un Estado contra otras naciones: información valiosa, infraestructuras críticas (centrales, hospitales…). |

---

## 1.3.2 Código dañino: *malware*

***Malware*** (*malicious software*): programa desarrollado para **introducirse en un sistema y causar algún tipo de control o daño** (cifrado, pérdida de datos, espionaje…).

### Vectores y técnicas de propagación / evasión

- **Tiendas de apps**: apps maliciosas con permisos excesivos (¿una linterna que pide contactos?).
- **Software pirata** (activadores de Windows, Spotify…) que "justifica" las alertas del antivirus.
- ***Dropper***: binario inocuo que **comprueba las defensas** y luego descarga el código malicioso.
- **Comprimidos con contraseña**: el antivirus no puede analizarlos.
- ***Stegomalware***: código oculto en imágenes, vídeo o audio mediante **esteganografía** y reconstruido dinámicamente.
- ***Fileless* / *in‑memory***: solo existe en memoria en tiempo de ejecución → análisis forense muy complicado.

---

## Clasificación del *malware* (I)

| Tipo | Funcionamiento |
|---|---|
| ***Exploit*** | Aprovecha una vulnerabilidad; la acción maliciosa es el ***payload*** |
| **Virus** | Se acopla a un programa legítimo y se **replica** al ejecutarse (sector de arranque, ejecutables, macros, *scripts*) |
| ***Ransomware*** | **Cifra** la información y exige rescate (criptomonedas → difícil rastreo) |
| ***Spyware*** | Recopila la actividad del usuario y la envía al atacante |
| ***Adware*** | Muestra publicidad constante; beneficio económico |
| **Troyano** | Se **disfraza** de programa funcional; abre la puerta al atacante |

---

## Clasificación del *malware* (II)

| Tipo | Funcionamiento |
|---|---|
| ***Rootkit*** | Acceso y control remoto **pasando totalmente desapercibido** |
| ***Keylogger*** | Registra las **pulsaciones de teclado** (contraseñas, tarjetas…) |
| **Gusano** | Se **autopropaga** por la red infectando equipos conectados |
| **Bacteria** | Se replica a sí misma para **consumir memoria** |
| **Bomba lógica** | Permanece oculta hasta que se cumple una **condición** |
| ***Cryptojacking*** | Usa la CPU/GPU de las víctimas para **minar criptomonedas** |

Las categorías **no son estancas**: un mismo *malware* suele combinar varias (p. ej., WannaCry = *ransomware* + gusano + *exploit*).

---

## Ejemplo: virus vs gusano vs troyano

```
 VIRUS                         GUSANO                          TROYANO
 ─────                         ──────                          ───────
 programa.exe                  ┌────┐  red   ┌────┐           "juego_gratis.exe"
 ┌──────────┐                  │ PC1│──────►│ PC2│           ┌─────────────────┐
 │ código   │ ◄─ se acopla     └────┘       └─┬──┘           │ parte visible:  │
 │ legítimo │                     ▲           │              │ juego funcional │
 ├──────────┤                     │           ▼              ├─────────────────┤
 │ código   │ ─► al ejecutar,  ┌────┐       ┌────┐           │ parte oculta:   │
 │ vírico   │    infecta otros │ PC4│◄──────│ PC3│           │ puerta trasera  │──► atacante
 └──────────┘    ficheros      └────┘       └────┘           └─────────────────┘
 Necesita que el usuario       NO necesita intervención:      NO se replica: depende
 ejecute el anfitrión          explota servicios de red        de engañar al usuario
```

---

## Breve historia del *malware*

<!-- _class: small -->

| Año | Nombre | Hito |
|---|---|---|
| 1986 | **Brain** | Primer virus difundido fuera de un laboratorio (Pakistán); sector de arranque de disquetes |
| 1987 | **Stoned** / **Jerusalem** | Arranque del disco duro / «Viernes 13»: borraba ficheros ese día |
| 1988 | **Gusano de Morris** | Colapsó ARPANET |
| 1992 | **Michelangelo** | Disquetes y MBR; se activaba el 6 de marzo |
| 1995 | **Concept** | Primer virus de macro de Office |
| 1998 | **Laroux**, **AccesiV** / **Strange Brew** | Macro de Excel y Access / primer virus en Java |
| 1999 | **Chernobyl (CIH)** / **Melissa** | Reescribía la BIOS / 4 M de equipos en 3 días por correo |
| 2000 | **ILoveYou** | VBScript; 40 M de equipos en 6 horas |
| 2010 | **Stuxnet** | Arma de ciberguerra; hasta 4 *zero‑day* |
| 2017 | **WannaCry** | *Ransomware*, ~200 000 equipos; explotaba **EternalBlue** (parche ya publicado); detenido por un ***kill switch*** (dominio registrado por Marcus Hutchins) |

---

## 1.3.3 Tipos de ataques

Según la **Guía de ciberataques del INCIBE**:

```
                          TIPOS DE ATAQUES
   ┌──────────────┬───────────────┬──────────────┬──────────────┐
   ▼              ▼               ▼              ▼              ▼
 A contraseñas  Ingeniería      A las          Por malware    + Ampliación del libro:
                social          conexiones     (ya visto)     · Cadena de suministro
                                                              · Invisibles en código fuente
```

---

## Ataques a contraseñas

**Objetivo:** obtener credenciales. Más éxito si se **reutilizan** o son **poco complejas**.

- **Fuerza bruta:** probar todas las combinaciones posibles.
- **Diccionario:** listas recopiladas, incluidas contraseñas de *leaks* (filtraciones).

**Ejemplo de por qué importa la longitud** (espacio de búsqueda = *alfabeto*^*longitud*):

| Contraseña | Alfabeto | Combinaciones |
|---|---|---|
| 6 dígitos | 10 | 10⁶ = 1 000 000 |
| 8 minúsculas | 26 | 26⁸ ≈ 2,1 × 10¹¹ |
| 12 caracteres (may+min+dígitos+símbolos) | ~94 | 94¹² ≈ 4,8 × 10²³ |

**Defensas:** MFA + **gestor de contraseñas** (p. ej., **GuardedBox**, de DinoSec, con cifrado *End‑to‑End*). Comprobar exposición en **Have I been pwned?**

---

## Ataques de ingeniería social

Manipulación del usuario **mediante el engaño** para que realice una acción perjudicial.

| Técnica | Descripción |
|---|---|
| **Fraude *online*** | El ciberdelito más frecuente: falsas ventas, alquileres, tiendas clonadas |
| ***Phishing*** / ***vishing*** / ***smishing*** | Suplantación de un emisor legítimo por **correo/redes**, **llamada** o **SMS** con URL manipulada |
| ***Baiting*** (gancho) | Cebo para que la víctima descargue *malware* o haga clic (titulares *clickbait*) |
| ***Shoulder surfing*** | Mirar por encima del hombro (aún usado en ejercicios de *Red Team*) |
| ***Dumpster diving*** | Rebuscar en la basura: papeles, discos, USB no formateados |

**Ejemplo de *phishing*:**
```
De: Soporte <no-reply@bancosantander-seguridad.com>
Asunto: ⚠ Su cuenta será bloqueada en 24 h
Pulse aquí para verificar: https://santander.verificar-cliente.xyz/login
```
Señales: urgencia y amenaza; remitente y enlace con dominios que **no son** los oficiales. En la URL, el dominio registrado es `verificar-cliente.xyz`: «santander» es solo un subdominio que controla el atacante.

---

## Ataques a las conexiones (I)

- **DDoS** (*Distributed Denial of Service*): colapsar un servicio con un volumen ingente de peticiones desde muchos orígenes. Récords: Cloudflare **17,2 Mrps** (2021) → Google Cloud **46 Mrps** (2022) → Google **398 Mrps** (ago. 2023).
- **MitM** (*Man‑in‑the‑Middle*): el atacante se sitúa en medio de la comunicación y puede **ver y modificar** el tráfico no cifrado.

```
   Comunicación normal:     Víctima ─────────────────────────► Router/Servidor

   Ataque MitM (ARP spoofing):
                            Víctima ──┐                  ┌──► Router/Servidor
                                      ▼                  │
                               ┌──────────────────────────┐
                               │ Atacante: "yo soy el     │
                               │ router" / "yo soy la     │  lee y modifica
                               │ víctima" (ARP falsos)    │  el tráfico
                               └──────────────────────────┘
```

---

## Ataques a las conexiones (II)

- **Suplantación (*spoofing*)**: falsificar un dato de la conexión → *ARP*, *IP*, *MAC*, *DNS spoofing*. Suele ser el medio para lograr el MitM.
- **Escucha (*sniffing*)**: capturar tráfico en un canal compartido; riesgo mucho mayor en **Wi‑Fi**.
  - Prevención: protocolos seguros

    | Inseguro | Seguro |
    |---|---|
    | HTTP | HTTPS |
    | Telnet | SSH |
    | FTP | SFTP |

- **Redes trampa (*Rogue AP*)**: punto de acceso falso que simula uno legítimo (aeropuertos, estaciones, cafeterías). **Desconfiar siempre de redes abiertas.**

---

## Ataques a la cadena de suministro

***Supply chain attack***: vulnerar el **hardware o software de un tercero** de la cadena de suministro del objetivo, que **confía** en ese proveedor y apenas lo revisa.

```
  Atacante ──► Proveedor de software ──► Actualización firmada ──► 18 000 clientes
               (SolarWinds, Orion)        con código malicioso      (NASA, Dpto. Estado,
                                                                     Defensa, Justicia…)
```

**Defensa → *Zero Trust Security***: «**nunca confiar, siempre comprobar**».
- NIST: *white paper* (2022) y **SP 800‑207** (arquitectura *zero trust*).
- Redefine el perímetro clásico: teletrabajo, oficinas remotas, *cloud*, terceros.

---

## Ataques invisibles en el código fuente

- Se insertan **caracteres Unicode especiales no visibles** en el editor (p. ej., caracteres de control bidireccional).
- El revisor ve código inofensivo; el **compilador** interpreta una lógica distinta.
- Descubierto en **2021** (*Trojan Source*). Muy propicio para ataques a la cadena de suministro.

**Ejemplo conceptual:**
```
Lo que ve el revisor:       if (acceso != "usuario") { // comprobar admin
Lo que interpreta el        if (acceso != "usuario// comprobar admin") {
compilador (orden lógico)   → la comparación nunca coincide como se espera
```

**Defensa:** compiladores/linters que avisen de caracteres bidireccionales y revisión de código con herramientas que los muestren.

---

## 1.3.4 Vulnerabilidades

**Vulnerabilidad o *bug***: fallo de diseño de un sistema que pone en riesgo su funcionamiento y su seguridad.

**Origen del término:** 9 de septiembre de 1947, Universidad de Harvard. **Grace Murray Hopper** anotó en el diario del **Mark II** un fallo causado por una **polilla** atrapada en un relé: *"First actual case of bug being found"*.

```
                    VULNERABILIDADES
           ┌───────────────┴────────────────┐
       SOFTWARE                          HARDWARE
  · errores de programación         · ejecución fuera de orden
  · fallos de configuración         · ejecución especulativa
  · mal uso de la criptografía      · memorias DRAM
  · backdoors intencionadas         · consolas de videojuegos
```

---

## Vulnerabilidades de software

Basta **un único componente inseguro** para comprometer todo el sistema.

**Ejemplo — aplicación web ficticia en Java:**
```
 ┌───────────────────────────────────────────────────────────────┐
 │ Nuestro código (seguro)                                       │
 ├───────────────────────────────────────────────────────────────┤
 │ Librería log4j ─────────► Log4Shell  CVE-2021-44228  (RCE)    │
 │ Framework Spring ───────► Spring4Shell CVE-2022-22965 (RCE)   │
 ├───────────────────────────────────────────────────────────────┤
 │ Servidor web (Apache, IIS, Nginx) ─► acceso inicial           │
 ├───────────────────────────────────────────────────────────────┤
 │ Sistema operativo ─► ESCALADA DE PRIVILEGIOS                  │
 │   · Linux:   PwnKit      CVE-2021-4034                        │
 │   · Windows: HiveNightmare CVE-2021-36934                     │
 └───────────────────────────────────────────────────────────────┘
```

**Mal uso de la criptografía:** **Zerologon** (CVE‑2020‑1472) → fallo en el vector de inicialización de **AES‑CFB8** en Netlogon: cualquier usuario de la red llega a **administrador del dominio**.

---

## Vulnerabilidades de hardware

Permiten **saltarse las protecciones del SO** y del software.

| Vulnerabilidad | CVE | Afecta a |
|---|---|---|
| **Meltdown** | CVE‑2017‑5754 | Ejecución fuera de orden |
| **Spectre** | CVE‑2017‑5753 / ‑5715 | Ejecución especulativa |
| **Retbleed** (2022) | CVE‑2022‑29900 / ‑29901 | Ataca *retpoline* (mitigación de Spectre) |
| **Zenbleed** (2023) | CVE‑2023‑20593 | AMD Zen 2 |
| **Inception** (2023) | CVE‑2023‑20569 | AMD Zen 3 y Zen 4 |
| **Rowhammer** | — | Memorias DDR DRAM: accesos repetidos modifican bits vecinos |

También: **FreeHDBoot**, **FreeDVDBoot** en consolas (usadas por *crackers* contra sistemas anticopia).

---

## *Zero‑day*, *brokers* y *bug bounty*

- **Vulnerabilidad de día cero (*0‑day*)**: no reportada oficialmente o publicada **sin parche** disponible.

```
  Descubrimiento ──┬──► Reporte responsable ──► Fabricante parchea ──► Divulgación
                   │     (bug bounty: $)                                 (CVE)
                   │
                   └──► Venta a un broker ──► ¿Gobiernos? ¿NSO Group (Pegasus)?
                         (Zerodium: hasta 2,5 M$ por un zero-click Android)
```

- ***Zero clic***: el usuario **no interviene en absoluto**. Zerodium pagaba hasta **2,5 M$ (Android)** y **2 M$ (iOS)**.
- ***Broker* de vulnerabilidades**: compra para revender → se desconoce el destino final.

---

## Documentación de vulnerabilidades: CVE

**CVE** (*Common Vulnerabilities and Exposures*): identificador público asignado a cada vulnerabilidad. Mantenido por **MITRE** (www.cve.org).

```
        CVE - 2021 - 44228
         │     │      │
         │     │      └── Identificador secuencial dentro del año (4 o más dígitos)
         │     └───────── Año en que se hace pública (se asigna)
         └─────────────── Prefijo fijo
```

**Ejemplos ya vistos:** CVE‑2021‑44228 (Log4Shell) · CVE‑2020‑1472 (Zerologon) · CVE‑2017‑5754 (Meltdown).

---

## Gravedad: CVSS

**CVSS** (*Common Vulnerability Scoring System*), última versión **4.0**. Métricas:
- **Base** (obligatoria, 0–10) · **Temporal / de amenaza** y **de entorno** (opcionales, la ajustan).

| Gravedad | Rango CVSS |
|---|---|
| Ninguna | 0.0 |
| **Baja** | 0.1 – 3.9 |
| **Media** | 4.0 – 6.9 |
| **Alta** | 7.0 – 8.9 |
| **Crítica** | 9.0 – 10.0 |

<span class="muted">(El libro agrupa 0.0 dentro de "Baja"; la especificación oficial distingue "Ninguna" = 0.0.)</span>

---

## Ejemplo resuelto: vector CVSS 3.1 = 9.4 (Crítica)

`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:H/A:H`

| Métrica | Valor | Significado |
|---|---|---|
| **AV** *Attack Vector* | **N** (Network) | Explotable a través de la red |
| **AC** *Attack Complexity* | **L** (Low) | Sencilla de explotar |
| **PR** *Privileges Required* | **N** (None) | Sin privilegios |
| **UI** *User Interaction* | **N** (None) | Sin intervención de otros usuarios |
| **S** *Scope* | **U** (Unchanged) | No afecta a otro componente distinto |
| **C** Confidencialidad | **L** (Low) | Impacto bajo |
| **I** Integridad | **H** (High) | Impacto alto |
| **A** Disponibilidad | **H** (High) | Impacto alto |

Cálculo: *Impact* = 6.42 × [1 − (1−0.22)(1−0.56)(1−0.56)] ≈ **5.45** · *Exploitability* = 8.22 × 0.85 × 0.77 × 0.85 × 0.85 ≈ **3.89** → *Base* = ↑(5.45 + 3.89) = **9.4**

---

## Clasificación de debilidades: CWE

**CWE** (*Common Weakness Enumeration*, MITRE): clasificación exhaustiva de **tipos** de vulnerabilidades HW/SW. Publica el **CWE Top 25**:

| CWE | Debilidad |
|---|---|
| CWE‑79 | *Cross‑site Scripting* (XSS) |
| CWE‑89 | *SQL Injection* |
| CWE‑20 | *Improper Input Validation* |
| CWE‑352 | CSRF (*Cross‑Site Request Forgery*) |
| CWE‑22 | *Path Traversal* |
| CWE‑77 | *Command Injection* |
| CWE‑918 | SSRF (*Server‑Side Request Forgery*) |

**Relación:** CWE = *tipo de fallo* (la "enfermedad") · CVE = *caso concreto* en un producto (el "paciente") · CVSS = *gravedad*.
Por estadística, en una auditoría aparecerán con frecuencia similar → se estudian en la Unidad 4 (*hacking* web).

---

<!-- _class: lead -->

# 1.4 Test de intrusión o *pentest*

---

## ¿Qué es un *pentest*?

**Test de intrusión** (*penetration testing*): actuación **legítima** de un *hacker* que trata de vulnerar los servicios de una empresa **para hacerse con su control**, con **objetivos y alcance fijados por contrato** (incluida cláusula de confidencialidad).

- **Objetivo:** analizar el estado de seguridad mediante la **búsqueda activa** de vulnerabilidades → anticiparse a los ciberdelincuentes.
- **Resultado:** **informe** que describe y analiza los problemas y **propone soluciones**.
- Existen informes públicos de *pentest* (transparencia), útiles para aprender.

---

## 1.4.1 Tipos de auditoría (I): conocimiento del auditor

```
   Conocimiento interno ──►  NINGUNO              PARCIAL               TOTAL
                         ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
                         │ CAJA NEGRA   │   │ CAJA GRIS    │   │ CAJA BLANCA  │
                         │ ▓▓▓▓▓▓▓▓▓▓▓▓ │   │ ▒▒▒▒▒▒▒▒▒▒▒▒ │   │ ░░░░░░░░░░░░ │
                         └──────────────┘   └──────────────┘   └──────────────┘
                          Simula un atacante  Ciertos permisos,   Acceso a sistemas,
                          externo real        sin código fuente   versiones, config.,
                                                                  políticas y código
```

| | Ventaja | Inconveniente |
|---|---|---|
| **Negra** | Realismo frente a atacante externo | Más tiempo en reconocimiento; menor cobertura |
| **Gris** | Equilibrio realismo/cobertura | Depende de qué información se entrega |
| **Blanca** | Máxima cobertura (revisión de código) | Menos realista respecto a un atacante externo |

---

## Tipos de auditoría (II): posición y alcance

### Según la posición del *pentester*
- **Perimetral:** desde fuera; analiza DNS, rangos IP, servicios expuestos, redes inalámbricas.
- **Interna:** rol de empleado/*insider* o invitado con escasos privilegios, *in situ*, desde un segmento alejado de servicios críticos.
- **Interna con privilegios:** además accede a configuraciones, código fuente, políticas.

### Según el alcance
- **Web** (externa sin permisos, con credenciales o de código).
- **Aplicaciones móviles.**
- ***Wireless* y VoIP.**
- **Prueba de estrés DoS/DDoS.**

---

## Ejemplo: elegir el tipo de auditoría

| Necesidad de la organización | Auditoría adecuada |
|---|---|
| "¿Resiste nuestro perímetro ante un atacante desconocido?" | **Perimetral de caja negra** |
| "¿Qué daño podría hacer un empleado descontento?" | **Interna** o **perimetral de caja gris** |
| "Queremos revisar a fondo nuestra app antes de publicarla" | **Web de caja blanca** (con código fuente) |
| "¿Aguantará la tienda online el Black Friday?" | **Prueba de estrés DoS/DDoS** |

Los tipos **no son compartimentos estancos**: cada *pentest* combina los que necesitan sus objetivos.

---

## 1.4.2 Fases de un test de intrusión

```
 ┌───────────────┐   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
 │ 1.RECONOCI-   │   │ 2.ENUMERACIÓN │   │ 3.EXPLOTACIÓN │   │ 4.POSEXPLO-   │   │ 5.DOCUMEN-    │
 │   MIENTO      │──►│ fingerprinting│──►│               │──►│   TACIÓN      │──►│   TACIÓN      │
 │ footprinting  │   │               │   │               │   │               │   │               │
 │ PASIVO        │   │ ACTIVO        │   │ vector de     │   │ escalada de   │   │ informe       │
 │ fuentes       │   │ escaneo de    │   │ ataque:       │   │ privilegios,  │   │ ejecutivo +   │
 │ públicas,     │   │ puertos,      │   │ configs, pwd  │   │ pivoting a    │   │ informe       │
 │ no intrusivo  │   │ vulnerabil.   │   │ débiles, vuln │   │ otros equipos │   │ técnico       │
 │  (Unidad 2)   │   │  (Unidad 3)   │   │ (Ud. 4, 5, 7) │   │  (Unidad 6)   │   │               │
 └───────────────┘   └───────────────┘   └───────────────┘   └───────────────┘   └───────────────┘
        A partir de la fase 2 se interactúa con el objetivo → IMPRESCINDIBLE el permiso
```

**Ciberdelincuentes:** mismo esquema salvo la última fase → **borran huellas** y aseguran acceso futuro (***rootkits***, ***Command & Control – C2***) para manejar equipos o exfiltrar información y extorsionar.

---

## Ejemplo de flujo: de la información al informe

| Fase | Acción de ejemplo | Hallazgo |
|---|---|---|
| Reconocimiento | Buscar subdominios y empleados en fuentes públicas | `intranet.empresa.es`, formato de correo `nombre.apellido@` |
| Enumeración | Escanear puertos de `intranet.empresa.es` | 443/tcp con Apache y app Java |
| Explotación | Probar vulnerabilidad conocida en una librería | RCE vía Log4Shell |
| Posexplotación | Comprobar privilegios y SO; escalar | `root` vía PwnKit; acceso a otra subred |
| Documentación | Redactar riesgos, evidencias y soluciones | Actualizar log4j, parchear polkit, segmentar la red |

---

## 1.4.3 El contrato: *rules of engagement*

Acuerdo **firmado por ambas partes** antes de empezar. Debe responder a preguntas como:

- ¿En qué **horario** se realiza? ¿Hay **servicios críticos** con umbrales de carga?
- ¿Se harán pruebas de **denegación de servicio**?
- ¿Está permitida la **ingeniería social** a empleados?
- ¿El personal (o el de IT) **sabrá** que se está haciendo el test?
- ¿Se permite instalar ***backdoors*** o usar ***exploits*** peligrosos?

Además: servicios auditados, duración, alcance, confidencialidad.
Ejemplo público: pliego de contratación de un test de intrusión de **Loterías y Apuestas del Estado**.

---

## 1.4.4 Metodologías de *pentesting*

Una **metodología** es un **documento de referencia** que mejora la calidad de los procesos y orienta la auditoría. **No es normativa**: cada organización la adapta.

| Metodología | Organismo | Enfoque |
|---|---|---|
| **PTES** | Expertos del sector (2009) | *Pentest* general, 7 fases |
| **OSSTMM v3** | ISECOM (2010) | Pruebas de seguridad operacional, 5 canales |
| **WSTG / MASTG / FSTM** | OWASP | Web / móvil / *firmware* |
| **PCI DSS** | PCI SSC | Datos de sistemas de pago |
| **PTF** | — | Recopilatorio de herramientas por fase |
| **NIST SP 800‑115** | NIST | Guía técnica de pruebas y evaluación |
| **CSF 2.0** | NIST | Marco de ciberseguridad y resiliencia |
| **CAF** | NCSC (Reino Unido) | Marco de evaluación |

Recomendado: **OWASP WSTG**, sección 3.8 (revisión de metodologías).

---

## PTES (*Penetration Testing Execution Standard*)

<!-- _class: small -->

```
 1 Interacciones previas ─► 2 Recopilación de ─► 3 Modelado de ─► 4 Análisis de ─► 5 Explotación ─► 6 Posexplotación ─► 7 Informe
   (pre-engagement)         inteligencia          amenazas         vulnerabilidades
```

| # | Fase | Contenido |
|---|---|---|
| 1 | **Interacciones previas** | Estimación de tiempo y coste, cuestionarios, ámbito, alcance, objetivos y **contrato** |
| 2 | **Recopilación de inteligencia** | Tres niveles: **L1** (automático), **L2** (+ análisis manual), **L3** (análisis manual profundo: relaciones empresariales y de negocio) |
| 3 | **Modelado de amenazas** | Identificar activos principales (con la empresa; en caja negra, a partir de lo recopilado) |
| 4 | **Análisis de vulnerabilidades** | Descubrir fallos aprovechables |
| 5 | **Explotación** | Acceso evitando restricciones; priorizar el punto de entrada a los **activos de mayor valor** |
| 6 | **Posexplotación** | Valorar el sistema comprometido, accesos futuros, pivotaje, exfiltración |
| 7 | **Informe** | **Resumen ejecutivo** + **informe técnico** |

Versión 1.0 (se esperaba 2.0 con **niveles** de intensidad según la sofisticación del adversario). Incluye guía técnica de herramientas.

---

## OSSTMM v3 (*Open Source Security Testing Methodology Manual*)

<!-- _class: small -->

- ISECOM, acceso libre desde 2001; versión **3.0** (diciembre de 2010).
- Certificación mediante el **STAR** (*Security Test Audit Report*).
- Mide la superficie de exposición con el **rav**: valor ±(positivo = exceso de controles; negativo = faltan controles) o porcentaje logarítmico (base 10) donde **100 = balance perfecto**.

| 5 canales | Qué cubre |
|---|---|
| **Humana** | Interacción con personas, ingeniería social, regulación, políticas |
| **Física** | Elementos físicos y presencia de un individuo |
| **Inalámbrica** | Comunicaciones en rango de proximidad |
| **Telecomunicaciones** | Red cableada: analógica y digital |
| **Redes de datos** | Comunicaciones entre computadoras y SO en red |

**4 fases:** **Inducción** (requisitos, ámbito, restricciones) → **Interacción** (sistemas y relaciones) → **Encuesta** (la más extensa: información desconocida) → **Intervención** (penetración y mal funcionamiento de servicios).

---

## Metodologías del OWASP

| Guía | Ámbito | Claves |
|---|---|---|
| **WSTG** (*Web Security Testing Guide*) | Aplicaciones web | Sección 4: 12 apartados → recolección de información, autenticación y autorización, sesiones, validación de entradas, errores, criptografía débil, APIs… (**Unidad 4**) |
| **MASTG** (*Mobile Application Security Testing Guide*, antes MSTG) | Apps móviles | Pruebas e ingeniería inversa; verifica controles de **MASVS**; apartados para Android e iOS |
| **FSTM** (*Firmware Security Testing Methodology*) | *Firmware* / IoT | **9 etapas**: recolección → obtención → análisis → extracción del sistema de ficheros → análisis de contenido → emulación → análisis dinámico → análisis en ejecución → explotación binaria. VM **EmbedOS** |

---

## 1.4.5 Equipos de seguridad: *Red*, *Blue*, *Purple*

```
     ┌───────────────────────┐                     ┌───────────────────────┐
     │      RED TEAM         │   ataca / emula     │      BLUE TEAM        │
     │  Seguridad OFENSIVA   │ ──────────────────► │  Seguridad DEFENSIVA  │
     │  hacker ético, APT,   │                     │  respuesta a          │
     │  TTP MITRE ATT&CK     │ ◄────────────────── │  incidentes, forense, │
     │                       │   detecta / bloquea │  threat hunting,      │
     └──────────┬────────────┘                     │  bastionado, SecOps   │
                │                                  └──────────┬────────────┘
                │          ┌───────────────────────┐          │
                └────────► │     PURPLE TEAM       │ ◄────────┘
                           │ pone en común ambos   │
                           │ trabajos → mejoras    │
                           └───────────────────────┘
```

| *Pentesting* | *Red teaming* |
|---|---|
| Acción **concreta**, objetivo definido, **duración reducida** | Ejercicio **continuo**; superar defensas **sin ser descubierto** |
| Encontrar el máximo de vulnerabilidades | Emular a un **APT** (*Advanced Persistent Threat*) con sus **TTP** (MITRE ATT&CK) |

---

## La pirámide BAD (*Build, Attack, Defend*)

<!-- _class: small -->

Daniel Miessler, a partir de April Wright (*Orange is the new purple*, BlackHat 2017):

```
                               YELLOW (build)
                                   ▲
                                  ╱ ╲              Constructores: desarrolladores
         ORANGE                  ╱   ╲                 GREEN
  builder cambia según el       ╱BUILD╲        builder cambia según el
  conocimiento del atacante    ╱ ATTACK╲       conocimiento del defensor
                              ╱  DEFEND ╲
                             ╱───────────╲
                       RED (attack) ─── PURPLE ─── BLUE (defend)
                               defensor cambia según el
                               conocimiento del atacante
```

| Color | Mezcla | Función |
|---|---|---|
| **Yellow** | — | Construir (desarrollo) |
| **Red** / **Blue** | — | Atacar / Defender |
| **Orange** | Red + Yellow | Los constructores aprenden de los atacantes |
| **Green** | Blue + Yellow | Los constructores aprenden de los defensores |
| **Purple** | Red + Blue | Los defensores aprenden de los atacantes |

---

<!-- _class: lead -->

# 1.5 Cómo convertirse en *hacker*
## *from zero to hero*

---

## Actitud y método de aprendizaje

- Los conocimientos **no se adquieren en semanas**: trabajo, esfuerzo, dedicación y experiencia → **paciencia** para evitar la frustración.
- **Aprendizaje en espiral**: dejar lo más técnico para revisiones posteriores y volver a los fundamentos cuando haga falta.
- **Repetir** laboratorios tras un tiempo, **sin mirar las soluciones**, e interiorizar los **patrones** que se repiten.
- Desarrollar **pensamiento crítico** y "fuera de la caja", y aprender de forma **continua**.

---

## 1.5.1 Perfil del *hacker* o ciberinvestigador

```
                          ┌───────────────┐
                          │  PENTESTING   │  ← lo que se ve
                          ├───────────────┤
                        ┌─┴───────────────┴─┐
                        │ Criptografía      │
                      ┌─┴───────────────────┴─┐
                      │ Programación/scripting│
                    ┌─┴───────────────────────┴─┐
                    │ Bases de datos (SQL/NoSQL)│
                  ┌─┴───────────────────────────┴─┐
                  │ Administración de SO (Win/Lin)│
                ┌─┴───────────────────────────────┴─┐
                │ Redes y protocolos (TCP/IP, OSI)  │
              ┌─┴───────────────────────────────────┴─┐
              │ Arquitectura de computadores y ASM    │  ← base sólida
              └───────────────────────────────────────┘
```

Sin base, avanzar es mucho más difícil (meme del "*n00b hacker*" que salta escalones). **Si no entiendes algo, vuelve a la base antes de continuar.**

---

## Áreas de conocimiento en detalle

<!-- _class: small -->

| Área | Contenido |
|---|---|
| **Arquitectura y ensamblador** | Base del funcionamiento HW y SW |
| **Redes y protocolos** | Cableadas, inalámbricas, fibra; dispositivos; TCP/IP y OSI; encaminamiento |
| **Administración de SO** | Windows y GNU/Linux: políticas, permisos, usuarios y grupos, servicios (DHCP, DNS, FTP, HTTP, SSH), dominios, cuotas, cortafuegos |
| **Bases de datos** | Lenguajes (SQL, NoSQL), SGBD relacionales y orientados a objetos, comandos de administración |
| **Programación** | Bajo nivel (C, C++, Go, Rust), POO (Java, C#), móvil (Android, iOS), web (JavaScript, Jakarta EE, PHP, ASP, NodeJS), *scripting* (Python, Bash, PowerShell) |
| **Criptografía** | Fundamentos matemáticos de los algoritmos + aplicación práctica |

---

## 1.5.2 Aprendizaje continuo: retos CTF

***Capture The Flag***: obtener un **código oculto (*flag*)** solo accesible a quien descubre la vulnerabilidad. **Prima el resultado sobre el proceso.**
Practicar *hacking* sin permiso es delito → los CTF son **entornos legales** diseñados para ser explotados.
Código de conducta: **no publicar** la solución (*writeup* / *walkthrough*) mientras el reto esté activo.

| Tipo | Descripción |
|---|---|
| **Retos (*challenges*)** | Modelo *Jeopardy*: retos por categorías y puntos. Categorías: *Crypto*, *Stego*, Web, *Forensics*, *Reversing*, *Pwn*, Hardware, *Misc* |
| **Máquinas (*boxes*)** | Caja negra; enumeración clave. Dos banderas: **usuario** y **administrador** (escalada). Incluye **ataque y defensa** (*king of the hill*) |
| **Redes (*networks/labs*)** | Red empresarial simulada; **pivotaje** entre máquinas hasta el objetivo final |

---

## Ejemplo: un reto CTF *Jeopardy* sencillo

**Categoría:** *Crypto* · **Puntos:** 50
> "Hemos interceptado este mensaje: `ZmxhZ3toYWNraW5nX2V0aWNvfQ==`"

**Razonamiento:**
1. Alfabeto `A‑Z a‑z 0‑9`, longitud múltiplo de 4 y relleno `==` → probablemente **Base64**.
2. Decodificar:
```bash
$ echo 'ZmxhZ3toYWNraW5nX2V0aWNvfQ==' | base64 -d
flag{hacking_etico}
```
3. Se envía `flag{hacking_etico}` a la plataforma → +50 puntos.

**Lección:** Base64 es una **codificación**, no un cifrado: no aporta confidencialidad.

---

## Plataformas de práctica

<!-- _class: small -->

| Orientadas a retos | Orientadas a máquinas |
|---|---|
| **Atenea** (CCN‑CERT): retos por categorías + sección «Academia» | **HackTheBox**: referente, > 2 M usuarios; dificultad *easy → insane*; *ranking*; **Seasonal**; Fortress, Endgames, Pro Labs; **HTB Academy** (*tiers* 0–IV, *cubes*), certificaciones **CPTS** y **CBBS** |
| **Academia Hacker** (INCIBE): retos por niveles con *writeups*, talleres y CTF para el equipo nacional | **TryHackMe**: ***rooms*** guiados paso a paso + máquinas y redes; se pueden publicar soluciones |
| **Una al mes** (Hispasec): un reto mensual | **VulnHub**: > 700 VM vulnerables (OVA), libre |
| **PicoCTF** (Carnegie Mellon): competición anual para estudiantes | **HackMyVM**: > 200 VM, 3 niveles |
| **CTFtime**: calendario y *rankings* de CTF | **Proving Grounds** (Offensive Security): *Play* (gratis) y *Practice* (pago) |

---

## 1.5.3 Recursos de aprendizaje

<!-- _class: small -->

**Guías** (orientadas a la certificación **OSCP**):
- **TJNull** – *The Journey to Try Harder* (NetSec Focus): 20 secciones; famosa lista de máquinas (PG, HTB, VulnHub).
- **John Jackson** – consejos para principiantes (TryHackMe, TCM Academy).

**Formadores y comunidades:**
- **The Cyber Mentor** (TCM Academy, certificación **PNPT**).
- **s4vitar** (Marcelo Vázquez): directos en Twitch, academia **Hack4u**.
- **C1b3rWall** (Policía Nacional): formación gratuita y congreso anual en Ávila.
- **HackTricks** (Carlos Polop): libro *online* de técnicas; **HackTricks Cloud**; herramientas **PEASS‑NG** (Unidad 6).

**Canales:** **Ippsec** (resoluciones de HTB), **John Hammond**, **LiveOverflow** (academia Hextree), **HackerSploit**.

---

## 1.5.4 Certificaciones de ciberseguridad

<!-- _class: small -->

*Roadmap* de Paul Jeremy: **473** certificaciones (enero 2023) por nivel y categoría. Las ofensivas: *penetration testing* y *exploitation*.

| Certificación | Entidad | Nivel / nota |
|---|---|---|
| **eJPT** | eLearnSecurity | Básico, para quien empieza |
| **Pentest+** | CompTIA | Intermedio; cubre todas las fases del *pentest* |
| **CEH** | EC‑Council | Muy demandada; criticada por poco práctica (mejora en CEH v12) |
| **PNPT** | TCM Security | Práctica, *pentest* de red |
| **HTB CPTS** | HackTheBox | Práctica, *pentest* |
| **eCPPT** | eLearnSecurity | Avanzado |
| **OSCP** | Offensive Security | La más temida y codiciada; lema **«*Try Harder*»** |

Consejo: no obsesionarse con certificar; **el aprendizaje es largo, gana experiencia primero**.

---

## 1.5.5 Plataformas de recompensas (*bug bounty*)

**Programa de recompensas**: la empresa **paga** al *hacker* por **reportar** vulnerabilidades → incentiva la búsqueda ética antes de que caigan en malas manos. Pueden ser **públicos** o **privados** (normalmente empiezan privados).

**RFC 9116 (2022) – `security.txt`**: indica cómo reportar fallos; en la raíz o en `/.well-known/`. **No es obligatorio**.

```
# https://www.google.com/.well-known/security.txt
Contact: https://g.co/vulnz
Contact: mailto:security@google.com
Encryption: https://services.google.com/corporate/publickey.txt
Acknowledgements: https://bughunters.google.com/
Policy: https://g.co/vrp
Hiring: https://g.co/SecurityPrivacyEngJobs
```

**Plataformas:** **Bugcrowd** · **HackerOne** · **Intigriti** (Bélgica, fondos UE) · **Immunefi** (DeFi, *smart contracts*, Web3).

---

## 1.5.6 Distribuciones para *pentesting*

Usar una distribución específica ahorra mucho tiempo frente a instalar herramientas a mano.

| Distribución | Base | Características |
|---|---|---|
| **Kali Linux** | Debian | Offensive Security; ARM, *cloud*, VM, WSL, contenedores, móvil (**NetHunter**), USB. **Usada en este libro** |
| **ParrotOS** | Debian | Alianza con HackTheBox (2022) |
| **BlackArch** | Arch Linux | > 2800 herramientas |
| **CommandoVM** | Windows | *Scripts* de Mandiant que convierten Windows en distribución ofensiva |

---

## 1.5.7 Mantenerse bien informado

La ciberseguridad avanza a pasos agigantados → **actualización constante**.

| Blog | Autor / organización |
|---|---|
| **Una al día** | Hispasec — > 24 años publicando a diario |
| **Un informático en el lado del mal** | Chema Alonso |
| **Flu Project** | Pablo González y Juan Antonio Calles |
| **Hackplayers** | Comunidad en castellano, muchos colaboradores |

---

<!-- _class: lead -->

# Repaso y autoevaluación

---

## Resumen de la unidad

- El *hacker* nace de la **curiosidad**; hoy la ciberdelincuencia crece (fraude, *ransomware*) y faltan profesionales.
- Seguridad de la información = proteger **C‑I‑D** (+ autenticación y no repudio) con medidas **activas/pasivas** y **físicas/lógicas**.
- *Hacker* ético = **sombrero blanco** con **autorización por contrato** (CP arts. 197 bis y 197 ter).
- Amenazas: **intrusos**, ***malware***, **ataques** (contraseñas, ingeniería social, conexiones, cadena de suministro, Unicode) y **vulnerabilidades** (SW/HW, *0‑day*).
- Las vulnerabilidades se **identifican (CVE)**, **puntúan (CVSS)** y **clasifican (CWE)**.
- *Pentest*: caja negra/gris/blanca · 5 fases · *rules of engagement* · PTES, OSSTMM, OWASP.
- *Red*, *Blue* y *Purple Team*; pirámide BAD.
- Formación continua: **base sólida → CTF → recursos → certificaciones → *bug bounty***.

---

## Autoevaluación (I)

1. ¿Qué principio de seguridad se ve afectado principalmente por un ataque DDoS? ¿Y por un *sniffing* sobre HTTP?
2. Un usuario se autentica con contraseña y con un PIN. ¿Es MFA? Justifica.
3. Clasifica un sistema RAID 1 según el momento de actuación y según el elemento protegido.
4. ¿Qué artículo del Código Penal se aplica a quien **vende** un *exploit* para acceder a sistemas ajenos?
5. Diferencia entre virus, gusano y troyano.
6. ¿Por qué WannaCry se propagó a pesar de que el parche de EternalBlue ya existía?
7. ¿Qué indica cada componente de `CVE-2022-22965`?

---

## Autoevaluación (II)

8. Una vulnerabilidad tiene CVSS 7.5. ¿Qué gravedad tiene?
9. Una empresa quiere saber qué podría hacer un empleado descontento. ¿Qué tipo de auditoría propones?
10. ¿En qué fase del *pentest* comienza la interacción directa con el objetivo y qué implica legalmente?
11. ¿Qué fase añaden los ciberdelincuentes en lugar de la documentación?
12. Ordena las 7 fases de PTES.
13. Diferencia entre *pentesting* y *red teaming*.
14. ¿Para qué sirve el fichero `security.txt` y dónde se ubica?

---

<details>
<summary>

## Soluciones

<!-- _class: tiny -->

1. DDoS → **disponibilidad**; *sniffing* sobre HTTP → **confidencialidad**.
2. **No**: ambos son "algo que sabes" (mismo factor).
3. **Pasiva** (minimiza el daño de un fallo de disco) y **física/lógica** (protege el hardware y los datos; el libro lo cita como ejemplo de seguridad pasiva).
4. **197 ter** (producir, adquirir, facilitar programas para cometer los delitos del 197).
5. Virus: se acopla a un anfitrión y requiere su ejecución · Gusano: se autopropaga por la red · Troyano: se disfraza de software legítimo y no se replica.
6. Porque **muchos sistemas no tenían aplicado el parche** publicado meses antes.
7. `CVE` prefijo · `2022` año de publicación · `22965` identificador dentro del año (Spring4Shell).
8. **Alta** (7.0 – 8.9).
9. **Interna** o **perimetral de caja gris**.
10. En la **enumeración/fingerprinting** (fase 2): interacción activa → **imprescindible el permiso**.
11. **Borrado de huellas** y persistencia (*rootkits*, C2) para exfiltrar o extorsionar.
12. Interacciones previas → Recopilación de inteligencia → Modelado de amenazas → Análisis de vulnerabilidades → Explotación → Posexplotación → Informe.
13. *Pentest*: puntual, objetivo concreto, corta duración · *Red teaming*: continuo, emula APT, evitando ser detectado.
14. Indica cómo **reportar vulnerabilidades** (RFC 9116); en la raíz del dominio o en `/.well-known/`.

</summary>
</details>
---

## Glosario rápido

<!-- _class: small -->

| Término | Definición breve |
|---|---|
| **APT** | *Advanced Persistent Threat*: grupo organizado y persistente de ciberdelincuentes |
| **C2** | *Command & Control*: infraestructura para controlar equipos comprometidos |
| **CVE / CVSS / CWE** | Identificador / puntuación de gravedad / tipo de debilidad |
| ***Exploit* / *payload*** | Código que aprovecha una vulnerabilidad / acción maliciosa que ejecuta |
| ***Footprinting* / *fingerprinting*** | Reconocimiento pasivo / enumeración activa |
| **MFA** | Autenticación con factores de distintas categorías |
| **MitM** | Atacante interpuesto en una comunicación |
| ***Pivoting*** | Usar un equipo comprometido para alcanzar otros |
| **RCE** | *Remote Code Execution*: ejecución remota de código |
| **TTP** | Tácticas, técnicas y procedimientos (MITRE ATT&CK) |
| ***Zero‑day*** | Vulnerabilidad sin parche publicado |
| ***Zero Trust*** | «Nunca confiar, siempre comprobar» |

---

<!-- _class: lead -->
<!-- _paginate: false -->

# ¡Gracias!

### Próxima unidad: Reconocimiento (*footprinting*)

*«Try Harder»*
