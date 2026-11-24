---
marp: true
theme: course-theme
paginate: true
html: true
header: 'UD01 · Defensa oral del LAB01 (DC-1)'
footer: 'Módulo 5025 · Hacking Ético · Curso de Especialización en Ciberseguridad'
---

<!--
Uso: marp --theme-set ../tema-curso.css --html Defensa-LAB01-DIAPOSITIVAS.md
La opción --html es necesaria para que se dibujen los diagramas mermaid
(se cargan desde el CDN, así que la presentación necesita conexión).
Cada tarjeta ocupa dos diapositivas: preguntas ★ y ★★, y después la respuesta esperada.
La pregunta ★★★ no se proyecta: está en las notas del presentador de cada diapositiva de preguntas.
Banco completo con respuestas ★★★: Defensa-LAB01-banco-preguntas-GUIA-DOCENTE.md
-->

<style>
  /* Diapositivas de pregunta: texto grande y legible desde el fondo del aula */
  section.pregunta { font-size: 30px; }
  section.pregunta h3 { font-size: 0.8em; margin-top: 0.8em; }
  section.pregunta blockquote { font-size: 0.65em; }
  /* Diapositivas de respuesta: franja verde para distinguirlas de un vistazo */
  section.respuesta { border-left: 14px solid #198754; }
  section.respuesta h2 { color: #146c43; border-bottom-color: #a3cfbb; }
  section.respuesta h3 { color: #198754; }
  .alarma { background: #fff3cd; border-left: 6px solid #ffc107; padding: 6px 14px; font-size: 0.8em; margin-top: 0.6em; }
  .etiqueta { color: #6b7280; font-size: 0.75em; }
</style>

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
</script>

<!-- _class: lead -->
<!-- _paginate: false -->

# Defensa oral del LAB01

## Test de intrusión a DC-1 · *Drupalgeddon2*

Una tarjeta por persona · Dos peldaños · Entre todos, el ataque completo

---

## Cómo funciona

Cada persona recibe **una tarjeta** con tres preguntas encadenadas. Se sube de peldaño mientras la respuesta sea correcta.

<div class="mermaid">
flowchart LR
    P1["★ ¿Qué?<br/>qué se hizo,<br/>con qué herramienta"] --> P2["★★ ¿Por qué?<br/>por qué funciona<br/>ese paso"]
    P2
    style P1 fill:#cfe2ff,stroke:#0d6efd
    style P2 fill:#fff3cd,stroke:#ffc107
</div>

| Se valora | Peso |
|---|---|
| Explicas el **qué** | 30 % |
| Explicas el **por qué**| 40 % |
| **Vocabulario** técnico preciso | 30 % |

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bloque A

## Alcance, autorización y ética

---

<!-- _class: pregunta -->

## T1 · La norma de oro

### ★ ¿Qué?
¿Qué comprobasteis **antes** de lanzar el primer escaneo?

### ★★ ¿Por qué?
Si un ciberdelincuente y un hacker ético usan las mismas herramientas, ¿qué los diferencia?

<!-- ★★★ (oral): Si por error escaneas la red del centro, ¿qué consecuencias tendría y qué harías? → Art. 197 bis CP; parar, comunicarlo y documentarlo, nunca ocultarlo. -->

---

<!-- _class: respuesta -->

## T1 · Respuesta esperada

### ★ Antes del primer escaneo
Que la IP de DC-1 (`10.0.1.50`) estaba dentro del rango autorizado `10.0.1.0/24` de `labnet` y dentro del alcance del encargo.

### ★★ Hacker ético frente a ciberdelincuente
La **autorización** expresa y el **alcance** pactado. La técnica es la misma; cambian el permiso, la finalidad (mejorar la seguridad) y el informe al cliente.

<div class="alarma">⚠️ <b>Error frecuente:</b> «No pasa nada si solo es un escaneo» o «si no rompes nada, no es delito».</div>

---

<!-- _class: pregunta -->

## T2 · El aislamiento de la máquina vulnerable

### ★ ¿Qué?
¿A qué red estaba conectada DC-1 y a cuál **no** podía conectarse nunca?

### ★★ ¿Por qué?
¿Qué riesgo concreto habría si DC-1 estuviera en **modo puente**?

<!-- ★★★ (oral): En una auditoría real no hay labnet. ¿Qué documento sustituye a la norma de oro y qué contiene? → Contrato o carta de autorización con reglas de enfrentamiento: objetivos, técnicas permitidas, fechas, contactos de emergencia, tratamiento de la información. -->

---

<!-- _class: respuesta -->

## T2 · Respuesta esperada

### ★ Redes de DC-1
Solo a la red interna `labnet`. Nunca en NAT ni en adaptador puente: sin salida a Internet ni a la red del centro.

### ★★ Riesgo del modo puente
DC-1 es **deliberadamente vulnerable**: cualquier equipo de la red del centro (o un atacante externo) podría comprometerla y usarla como **punto de salto** contra otros equipos.

<div class="alarma">⚠️ <b>Error frecuente:</b> no distinguir la red de Kali (NAT + <code>labnet</code>) de la de DC-1 (solo <code>labnet</code>).</div>

---

<!-- _class: pregunta -->

## T3 · La prohibición de la denegación de servicio

### ★ ¿Qué?
El encargo prohibía los ataques de denegación de servicio. ¿Qué es un ataque **DoS**?

### ★★ ¿Por qué?
¿Qué principio de seguridad rompe y por qué un cliente no lo querría en una auditoría?

<!-- ★★★ (oral): ¿Qué pasaría legalmente contra una web real sin permiso? → Daños informáticos u obstaculización de sistemas (art. 264 CP) y responsabilidad civil, aunque sea «para probar». -->

---

<!-- _class: respuesta -->

## T3 · Respuesta esperada

### ★ Ataque DoS
Un ataque que busca **dejar un servicio inutilizable** para sus usuarios legítimos, saturándolo o haciéndolo fallar.

### ★★ Principio y motivo
Rompe la **disponibilidad**. En producción supone parar el negocio (ventas, atención al cliente). La auditoría debe demostrar el riesgo **sin causar daño**.

<div class="alarma">⚠️ <b>Error frecuente:</b> confundir denegación de servicio con «denegar el acceso a un usuario».</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bloque B

## Fase 1 · Reconocimiento y enumeración

---

<!-- _class: pregunta -->

## T4 · `netdiscover` antes que `nmap`

### ★ ¿Qué?
¿Qué hace `sudo netdiscover -r 10.0.1.0/24`?

### ★★ ¿Por qué?
¿Por qué se usa primero `netdiscover` y después `nmap`? ¿Por qué solo funciona dentro de `labnet`?

<!-- ★★★ (oral): ¿Qué huella deja y cómo la vería un blue team? → Ráfaga de peticiones ARP a todo el rango; monitorización de red o IDS (barrido ARP, MAC desconocida). -->

---

<!-- _class: respuesta -->

## T4 · Respuesta esperada

### ★ `netdiscover`
Descubre qué equipos están **vivos** en `10.0.1.0/24` y muestra su IP y su MAC. Así se localizó DC-1 (`10.0.1.50`).

### ★★ Orden y alcance
Primero hay que saber **qué hay** (qué IP atacar) y luego **qué servicios tiene**. `netdiscover` usa peticiones **ARP**, que funcionan en **capa 2**: solo dentro del mismo segmento de red.

<div class="alarma">⚠️ <b>Error frecuente:</b> «<code>netdiscover</code> busca vulnerabilidades» o «escanea los puertos».</div>

---

<!-- _class: pregunta -->

## T5 · Lo que revela un `ping`

### ★ ¿Qué?
¿Para qué hicisteis `ping -c2 10.0.1.50`?

### ★★ ¿Por qué?
La respuesta tenía **TTL 64**. ¿Qué se deduce y por qué es una **deducción** y no una certeza?

<!-- ★★★ (oral): ¿Qué haría un administrador para que el reconocimiento dé menos información? → Filtrar ICMP, cerrar servicios innecesarios, ocultar banners y versiones: reducir la superficie de exposición (no sustituye a parchear). -->

---

<!-- _class: respuesta -->

## T5 · Respuesta esperada

### ★ El `ping`
Para confirmar que DC-1 **responde** antes de escanearla (conectividad).

### ★★ TTL 64
Probablemente es **Linux**: Linux usa TTL inicial 64 y Windows, 128. No es seguro porque el TTL **se puede configurar** y **disminuye** con cada salto de red.

| Sistema | TTL inicial habitual |
|---|---|
| Linux / Unix | 64 |
| Windows | 128 |

<div class="alarma">⚠️ <b>Error frecuente:</b> «el <code>ping</code> sirve para atacar la máquina».</div>

---

<!-- _class: pregunta -->

## T6 · Las opciones de `nmap`

### ★ ¿Qué?
¿Qué hace cada opción de `nmap -sV -sC -oN dc1_nmap.txt 10.0.1.50`?

### ★★ ¿Por qué?
¿Por qué es tan importante la opción `-sV`?

<!-- ★★★ (oral): ¿Cómo detectaría un blue team este escaneo? ¿Es legal escanear a un tercero? → Muchas conexiones a distintos puertos desde una IP en poco tiempo: IDS (Snort, Suricata), logs del cortafuegos. Sin autorización incumple la norma de oro y puede ser delito. -->

---

<!-- _class: respuesta -->

## T6 · Respuesta esperada

### ★ Opciones de `nmap`

| Opción | Qué hace |
|---|---|
| `-sV` | Detecta la **versión** de cada servicio |
| `-sC` | Lanza los *scripts* por defecto de NSE |
| `-oN` | Guarda la salida en un fichero de texto (**evidencia** para el informe) |

### ★★ Importancia de `-sV`
La **versión** permite buscar vulnerabilidades conocidas (CVE). Saber que hay «un HTTP» no basta; saber que es **Drupal 7** abre la fase 2.

<div class="alarma">⚠️ <b>Error frecuente:</b> lanzar <code>nmap</code> «porque lo dijo la IA» sin saber qué se buscaba.</div>

---

<!-- _class: pregunta -->

## T7 · ¿Qué servicio atacar primero?

### ★ ¿Qué?
¿Qué **tres puertos** estaban abiertos en DC-1 y qué servicio había en cada uno?

### ★★ ¿Por qué?
¿Por qué se priorizó el **puerto 80** y no SSH?

<!-- ★★★ (oral): ¿Qué recomendación darías sobre los servicios expuestos? → Minimizar la superficie de ataque: cerrar rpcbind si no se usa, restringir SSH (claves, IP de administración), mantener actualizado lo expuesto. -->

---

<!-- _class: respuesta -->

## T7 · Respuesta esperada

### ★ Puertos abiertos

| Puerto | Servicio | Versión |
|---|---|---|
| 22/tcp | SSH | OpenSSH 6.0 |
| 80/tcp | HTTP | Apache 2.2.22 + **Drupal 7** |
| 111/tcp | rpcbind | 2-4 |

### ★★ ¿Por qué el 80?
`http-generator` revela **Drupal 7**, un CMS antiguo con vulnerabilidades públicas y *exploits* disponibles. Atacar SSH exigiría **fuerza bruta** (ataque a contraseñas): ruidoso, lento y con riesgo de bloqueos.

<div class="alarma">⚠️ <b>Error frecuente:</b> elegir el puerto «porque es el primero de la lista».</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bloque C

## Fase 2 · Análisis de vulnerabilidades

---

<!-- _class: pregunta -->

## T8 · CVE y CVSS

### ★ ¿Qué?
¿Qué es un **CVE** y qué es el **CVSS**?

### ★★ ¿Por qué?
¿Por qué CVE-2018-7600 tiene un CVSS de **9,8**?

<!-- ★★★ (oral): Eres el administrador de Drupalia y te llega un aviso con CVSS 9,8. ¿Qué haces? → Prioridad máxima: parchear o mitigar ya, revisar registros por si ya fue explotado, comprobar otros sistemas afectados. -->

---

<!-- _class: respuesta -->

## T8 · Respuesta esperada

### ★ CVE y CVSS
**CVE**: identificador único y público de una vulnerabilidad concreta (CVE-2018-7600). **CVSS**: sistema que puntúa su **gravedad** de 0 a 10.

### ★★ Por qué 9,8 · `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`

| Métrica | Valor | Significado |
|---|---|---|
| AV | N | Explotable **por red** |
| AC | L | **Baja** complejidad |
| PR | N | **Sin privilegios** |
| UI | N | **Sin interacción** del usuario |
| C / I / A | H | Impacto **alto** en confidencialidad, integridad y disponibilidad |

<div class="alarma">⚠️ <b>Error frecuente:</b> confundir CVE con <i>exploit</i>, o creer que el CVSS mide «la dificultad del ataque».</div>

---

<!-- _class: pregunta -->

## T9 · `searchsploit` y la verificación de fuentes

### ★ ¿Qué?
¿Qué hace `searchsploit drupal 7`?

### ★★ ¿Por qué?
¿Por qué hay que confirmar el CVE en la **NVD** y no fiarse solo de `searchsploit` o de la IA?

<!-- ★★★ (oral): El fallo es de 2018 y tiene exploit público. ¿Por qué sigue habiendo servidores vulnerables? ¿De quién es la responsabilidad? → Falta de parcheo, sistemas olvidados o fuera de soporte; responsabilidad de la organización. Divulgación responsable. -->

---

<!-- _class: respuesta -->

## T9 · Respuesta esperada

### ★ `searchsploit`
Busca en una **copia local de Exploit-DB** los *exploits* públicos que coinciden con «drupal 7».

### ★★ Verificar en la NVD
La NVD es la **fuente oficial** de la descripción y la puntuación. La IA suele equivocarse en el **número del CVE** o en la **cifra CVSS**, y `searchsploit` solo indica que existe un *exploit*, no si la versión exacta es vulnerable.

<div class="alarma">⚠️ <b>Error frecuente:</b> «<code>searchsploit</code> ataca la máquina» o «busca en Internet en tiempo real».</div>

---

<!-- _class: pregunta -->

## T10 · Qué es Drupalgeddon2

### ★ ¿Qué?
¿Qué significa **RCE** y por qué es peor si es «**sin autenticación**»?

### ★★ ¿Por qué?
¿Qué fallo concreto de Drupal aprovecha Drupalgeddon2?

<!-- ★★★ (oral): ¿Qué principios de seguridad rompe y qué supondría para Drupalia? → Confidencialidad (robo de datos), integridad (alterar la web, malware), disponibilidad (caída). Pérdidas, reputación, sanciones de protección de datos. -->

---

<!-- _class: respuesta -->

## T10 · Respuesta esperada

### ★ RCE sin autenticación
**Ejecución remota de código**: el atacante ejecuta órdenes en el servidor a distancia. «Sin autenticación» significa que **no necesita ninguna cuenta ni contraseña**.

### ★★ El fallo de Drupal
Drupal no **sanea** ciertos parámetros con nombres especiales (que empiezan por `#`) enviados a formularios como `/user/register`. La API de formularios los procesa y acaba **ejecutando el código** que envía el atacante.

<div class="alarma">⚠️ <b>Error frecuente:</b> saber el nombre «Drupalgeddon2» pero no qué hace.</div>

---

<!-- _class: pregunta -->

## T11 · Vulnerabilidad, amenaza, *exploit* y riesgo

### ★ ¿Qué?
Define **vulnerabilidad**, **amenaza** y ***exploit***.

### ★★ ¿Por qué?
Aplica los tres términos a **DC-1**.

<!-- ★★★ (oral): Si Drupalia no puede actualizar hoy, ¿cómo reduce el riesgo? → Mitigaciones temporales: WAF con reglas contra Drupalgeddon2, restringir /user/register, aislar el servidor, vigilar registros. Siempre hasta parchear. -->

---

<!-- _class: respuesta -->

## T11 · Respuesta esperada

### ★ Definiciones y ★★ aplicación a DC-1

| Término | Definición | En DC-1 |
|---|---|---|
| **Vulnerabilidad** | Debilidad del sistema | Drupal 7 sin parchear (CVE-2018-7600) |
| **Amenaza** | Quién o qué puede aprovecharla | Un atacante externo con acceso a la web |
| ***Exploit*** | Código o técnica que la aprovecha | Módulo `drupal_drupalgeddon2` de Metasploit |
| **Riesgo** | Probabilidad × impacto | Probabilidad alta (*exploit* público) × impacto total |

<div class="alarma">⚠️ <b>Error frecuente:</b> usar vulnerabilidad y <i>exploit</i> como sinónimos.</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bloque D

## Fase 3 · Explotación

---

<!-- _class: pregunta -->

## T12 · `RHOSTS`, `LHOST` y la conexión inversa

### ★ ¿Qué?
¿Qué valor pusisteis en `RHOSTS` y en `LHOST`, y qué significa cada uno?

### ★★ ¿Por qué?
¿Por qué hace falta `LHOST`? ¿Qué es una **conexión inversa** y por qué se usa?

<!-- ★★★ (oral): ¿Cómo detectaría y bloquearía un blue team esa conexión? → Un servidor web no debería conectarse al puerto 4444 de otra IP: monitorizar tráfico saliente y aplicar filtrado de salida (egress filtering). -->

---

<!-- _class: respuesta -->

## T12 · Respuesta esperada

### ★ `RHOSTS` y `LHOST`

| Opción | Valor | Significado |
|---|---|---|
| `RHOSTS` | `10.0.1.50` | IP del **objetivo** (DC-1) |
| `LHOST` | `10.0.1.10` | IP de **Kali**, donde se recibe la conexión |

### ★★ Conexión inversa
El *payload* hace que **DC-1 se conecte de vuelta a Kali** (*reverse shell*). Se usa porque los cortafuegos suelen bloquear las conexiones **entrantes** pero permiten las **salientes**.

<div class="alarma">⚠️ <b>Error frecuente:</b> intercambiar <code>RHOSTS</code> y <code>LHOST</code>, o no saber cuál es la IP de Kali.</div>

---

<!-- _class: pregunta -->

## T13 · `check` antes de `run`

### ★ ¿Qué?
¿Qué hace la orden `check` en Metasploit?

### ★★ ¿Por qué?
¿Qué podría pasar en una auditoría real si se lanza `run` **sin comprobar** antes?

<!-- ★★★ (oral): ¿Qué principio ético profesional hay detrás? → No causar daño y proporcionalidad: demostrar el riesgo con el mínimo impacto, respetando las reglas de enfrentamiento. -->

---

<!-- _class: respuesta -->

## T13 · Respuesta esperada

### ★ `check`
Comprueba si el objetivo **parece vulnerable** sin lanzar el ataque completo. En DC-1 devolvió:

```text
[+] 10.0.1.50:80 - The target is vulnerable.
```

### ★★ Lanzar sin comprobar
Se podría **desestabilizar o tumbar** el servicio del cliente (afectar a la **disponibilidad**), generar ruido innecesario o atacar algo que no es lo que se cree.

<div class="alarma">⚠️ <b>Error frecuente:</b> «<code>check</code> sirve para comprobar si el <i>exploit</i> está bien escrito».</div>

---

<!-- _class: pregunta -->

## T14 · El usuario `www-data`

### ★ ¿Qué?
¿Con qué usuario se entra en DC-1 tras el *exploit* y cómo lo comprobasteis?

### ★★ ¿Por qué?
¿Por qué **ese** usuario y por qué **no** es administrador?

<!-- ★★★ (oral): ¿Qué medidas reducen el impacto de un RCE en una web? → Mínimo privilegio, permisos restrictivos, aislamiento (contenedores, AppArmor/SELinux), no dejar SUID innecesarios: defensa en profundidad. -->

---

<!-- _class: respuesta -->

## T14 · Respuesta esperada

### ★ Usuario de entrada
Con **`www-data`**, comprobado con `id`:

```text
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

### ★★ Por qué ese usuario
El código se ejecuta **a través del servidor web** Apache, que funciona como `www-data`. Ese usuario no tiene privilegios por diseño: es el **principio de mínimo privilegio**. Para controlar la máquina hay que **escalar**.

<div class="alarma">⚠️ <b>Error frecuente:</b> «ya somos administradores porque tenemos una <i>shell</i>».</div>

---

<!-- _class: pregunta -->

## T15 · La pista de `settings.php`

### ★ ¿Qué?
La `flag1` decía «*Every good CMS needs a config file*». ¿A qué fichero apunta y qué contiene?

### ★★ ¿Por qué?
¿Por qué eso es un **hallazgo de seguridad** en sí mismo?

<!-- ★★★ (oral): ¿Cómo lo corregirías? → chmod 440 y propietario adecuado, rotar la contraseña de la BBDD, no reutilizarla, mínimos permisos para el usuario de BBDD. -->

---

<!-- _class: respuesta -->

## T15 · Respuesta esperada

### ★ El fichero
**`settings.php`**, el fichero de configuración de Drupal, que contiene las **credenciales de la base de datos**.

### ★★ Por qué es un hallazgo (H3)
Las credenciales están **en claro** y el fichero es **legible por `www-data`**: quien comprometa la web obtiene acceso a la base de datos. Si la contraseña se **reutiliza**, el daño se extiende.

<div class="alarma">⚠️ <b>Error frecuente:</b> no relacionar la <i>flag</i> con ningún fallo del servidor.</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bloque E

## Fase 4 · Posexplotación y escalada

---

<!-- _class: pregunta -->

## T16 · Estabilizar la *shell*

### ★ ¿Qué?
¿Para qué se ejecutó `python -c 'import pty;pty.spawn("/bin/bash")'`?

### ★★ ¿Por qué?
¿Qué problemas tiene una *shell* **no interactiva**?

<!-- ★★★ (oral): ¿Qué le indicaría a un blue team ver un proceso python lanzando bash como www-data? → Comportamiento anómalo; lo detecta un EDR, auditd o la monitorización de procesos. -->

---

<!-- _class: respuesta -->

## T16 · Respuesta esperada

### ★ `pty.spawn`
Para obtener una ***shell* interactiva** estable, con *prompt*, en lugar de la *shell* básica que da el *exploit*.

### ★★ Problemas de una *shell* no interactiva

| Sin *shell* interactiva… |
|---|
| No hay *prompt* |
| No funcionan órdenes que piden contraseña o interacción (como `su`) |
| No hay autocompletado |
| Un `Ctrl+C` puede cerrar la conexión |

<div class="alarma">⚠️ <b>Error frecuente:</b> «sirve para tener permisos de <i>root</i>».</div>

---

<!-- _class: pregunta -->

## T17 · El bit SUID

### ★ ¿Qué?
¿Qué es el bit **SUID**?

### ★★ ¿Por qué?
`passwd` tiene SUID y es normal; `find` tiene SUID y es un fallo. ¿Por qué?

<!-- ★★★ (oral): ¿Cómo se corrige y cómo se detecta? → chmod u-s /usr/bin/find y auditoría periódica de SUID; detección con auditd (cambios de permisos, find -exec por usuarios de servicio). -->

---

<!-- _class: respuesta -->

## T17 · Respuesta esperada

### ★ Bit SUID
Permiso especial de Linux por el que un programa se ejecuta **con los permisos de su propietario**, no con los de quien lo lanza. Si el propietario es `root`, se ejecuta como `root`.

### ★★ `passwd` sí, `find` no

| Binario | ¿Necesita SUID? | Motivo |
|---|---|---|
| `passwd` | **Sí** | Debe escribir en `/etc/shadow`, que solo modifica `root` |
| `find` | **No** | Además puede ejecutar órdenes con `-exec` → cualquiera ejecuta órdenes como `root` |

<div class="alarma">⚠️ <b>Error frecuente:</b> confundir SUID con «ser superusuario» o con <code>sudo</code>.</div>

---

<!-- _class: pregunta -->

## T18 · La búsqueda de binarios SUID

### ★ ¿Qué?
Explica pieza a pieza `find / -perm -4000 -type f 2>/dev/null`.

### ★★ ¿Por qué?
¿Por qué hace falta `2>/dev/null` en este caso?

<!-- ★★★ (oral): ¿Por qué un administrador debería ejecutar este mismo comando? → Es la misma auditoría desde la defensa: conocer la lista base de SUID legítimos y detectar los anómalos antes que un atacante. -->

---

<!-- _class: respuesta -->

## T18 · Respuesta esperada

### ★ Pieza a pieza

| Pieza | Significado |
|---|---|
| `find /` | Busca desde la raíz |
| `-perm -4000` | Ficheros con el bit **SUID** |
| `-type f` | Solo ficheros normales |
| `2>/dev/null` | Descarta los mensajes de error |

### ★★ Por qué `2>/dev/null`
Somos un usuario **sin privilegios**: aparecen cientos de errores *Permission denied* (salida de error, descriptor 2) que taparían los resultados útiles.

<div class="alarma">⚠️ <b>Error frecuente:</b> creer que el comando «da permisos» en lugar de <b>buscar</b>.</div>

---

<!-- _class: pregunta -->

## T19 · La escalada con `find`

### ★ ¿Qué?
¿Qué hace `find . -exec /bin/sh -p \; -quit`?

### ★★ ¿Por qué?
¿Por qué esa *shell* es de `root`? ¿Para qué sirve la opción `-p`?

<!-- ★★★ (oral): ¿Cómo se llama la técnica en MITRE ATT&CK y cómo se evita? → T1548.001 (abuso de elevación de privilegios: SUID). Retirar SUID innecesarios, mínimo privilegio, auditar permisos. -->

---

<!-- _class: respuesta -->

## T19 · Respuesta esperada

### ★ El comando
Usa la opción `-exec` de `find` para **abrir una *shell*** (`/bin/sh`); `-quit` hace que se ejecute solo una vez.

### ★★ Por qué es de `root`
`find` tiene SUID de `root` y la orden lanzada **hereda** sus privilegios efectivos. `-p` evita que la *shell* **descarte** esos privilegios al arrancar:

```text
# id
uid=33(www-data) gid=33(www-data) euid=0(root) groups=33(www-data)
```

<div class="alarma">⚠️ <b>Error frecuente:</b> no distinguir <code>uid</code> (usuario real) de <code>euid</code> (usuario efectivo).</div>

---

<!-- _class: pregunta -->

## T20 · Acceso inicial frente a escalada

### ★ ¿Qué?
Resume la **cadena de ataque** de DC-1 en tres eslabones.

### ★★ ¿Por qué?
¿Qué hallazgo rompe cada eslabón? Si solo se actualiza Drupal, ¿queda resuelto?

<!-- ★★★ (oral): ¿Qué es la defensa en profundidad y cómo se aplica aquí? → Varias capas: parchear (prevención), mínimo privilegio (contención), registros con IDS/auditd (detección). -->

---

<!-- _class: respuesta -->

## T20 · Respuesta esperada

### ★ La cadena

<div class="mermaid">
flowchart LR
    A["Drupal 7 vulnerable<br/>CVE-2018-7600"] -->|RCE| B["www-data<br/>acceso inicial"]
    B -->|SUID en find| C["root<br/>control total"]
    style A fill:#fff3cd,stroke:#ffc107
    style B fill:#f8d7da,stroke:#dc3545
    style C fill:#d1e7dd,stroke:#198754
</div>

### ★★ Qué rompe cada eslabón
**H1** (actualizar Drupal) rompe el acceso inicial; **H2** (quitar el SUID) rompe la escalada. Si solo se corrige H1, el SUID **sigue ahí** para quien entre por otra vía: hay que corregir **ambos**.

<div class="alarma">⚠️ <b>Error frecuente:</b> creer que llegar a <code>root</code> es la primera fase del ataque.</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bloque F

## Hallazgos, recomendaciones y detección

---

<!-- _class: pregunta -->

## T21 · Qué es (y qué no es) un hallazgo

### ★ ¿Qué?
¿Por qué «*Hemos entrado con Metasploit*» **no** es un hallazgo?

### ★★ ¿Por qué?
Redacta oralmente el hallazgo **H1** con **fallo**, **causa** y **gravedad**.

<!-- ★★★ (oral): Da una recomendación de corrección y otra de detección para H1. → Actualizar Drupal a ≥ 7.58 o rama soportada; revisar access.log por POST anómalos a /user/register con element_parents o #post_render, alertas IDS. -->

---

<!-- _class: respuesta -->

## T21 · Respuesta esperada

### ★ No es un hallazgo
Describe lo que hizo el **auditor**, no el **fallo del servidor**. Un hallazgo es una debilidad del sistema auditado.

### ★★ Hallazgo H1

| Campo | Contenido |
|---|---|
| **Fallo** | Drupal 7 vulnerable a *Drupalgeddon2*: ejecución de código sin autenticarse |
| **Causa** | CMS sin actualizar desde 2018 que no sanea los parámetros de formularios |
| **Gravedad** | **Crítica** · CVSS 9,8 · CVE-2018-7600 |

<div class="alarma">⚠️ <b>Error frecuente:</b> recomendaciones genéricas («poner un antivirus», «mejorar la seguridad»).</div>

---

<!-- _class: pregunta -->

## T22 · La huella del ataque

### ★ ¿Qué?
¿Qué **huella** ha dejado vuestro ataque en DC-1?

### ★★ ¿Por qué?
¿**Dónde** buscaría un *blue team* cada una de esas huellas?

<!-- ★★★ (oral): Si Drupalia descubre que la han atacado de verdad, ¿qué debe hacer? → Respuesta a incidentes: contener, conservar evidencias, analizar, erradicar (parchear, quitar SUID, rotar credenciales), recuperar. Datos personales: notificar a la AEPD en 72 h (RGPD). -->

---

<!-- _class: respuesta -->

## T22 · Respuesta esperada

### ★ Huellas y ★★ dónde buscarlas

| Huella | Dónde la busca el *blue team* |
|---|---|
| Peticiones anómalas a `/user/register` | `/var/log/apache2/access.log` |
| **Conexión saliente** de DC-1 hacia Kali (puerto 4444) | Registros del cortafuegos o del IDS |
| Procesos extraños bajo `www-data` (`python`, `sh -p`) | `auditd`, EDR o monitorización de procesos |
| *Shell* con privilegios de `root` | `auditd` y registros del sistema |

<div class="alarma">⚠️ <b>Error frecuente:</b> «no deja huella porque usamos Kali».</div>

---

<!-- _class: pregunta -->

## T23 · El resumen ejecutivo

### ★ ¿Qué?
Explícale a la gerente de Drupalia, **en 30 segundos y sin tecnicismos**, qué habéis encontrado.

### ★★ ¿Por qué?
¿Por qué el resumen ejecutivo no debe llevar comandos ni CVE? ¿Qué **no puede faltar**?

<!-- ★★★ (oral): Si solo pudiera hacer una cosa mañana, ¿cuál le recomendarías? → Actualizar Drupal: es explotable desde la red y sin credenciales (H1, crítico). Después, quitar el SUID de find (H2). -->

---

<!-- _class: respuesta -->

## T23 · Respuesta esperada

### ★ En 30 segundos
> «Hemos conseguido el **control total** de vuestro servidor web **sin conocer ninguna contraseña**, aprovechando que el programa de la web no estaba actualizado y un permiso mal configurado.»

### ★★ Por qué sin tecnicismos
Lo lee alguien que **decide**, no que ejecuta. No puede faltar **qué riesgo** supone para el negocio (robo, alteración, parada) y **qué hacer**, con prioridades.

<div class="alarma">⚠️ <b>Error frecuente:</b> repetir el informe técnico con jerga («hemos usado un <i>payload</i> reverso…»).</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Bloque G

## Uso crítico de la IA y repaso de la UD01

---

<!-- _class: pregunta -->

## T24 · Cuando la IA se equivoca

### ★ ¿Qué?
¿En qué se equivocó la IA durante vuestro laboratorio, o en qué **suele** equivocarse?

### ★★ ¿Por qué?
¿Por qué ocurre y **cómo se verifica**?

<!-- ★★★ (oral): ¿Qué preguntas a la IA son aceptables y cuáles no? ¿Quién es el responsable de lo que se ejecuta? → Aceptable: explicar, interpretar, diagnosticar. No: «resuélveme la máquina» o atacar fuera de alcance. Responsable: siempre quien ejecuta. -->

---

<!-- _class: respuesta -->

## T24 · Respuesta esperada

### ★ Errores típicos de la IA
El **número de CVE**, la **cifra CVSS** (por ejemplo, «10» en lugar de **9,8**) o vías que no aplican (como `sudo -l` en DC-1).

### ★★ Por qué y cómo verificar
La IA genera texto **plausible**, no consultado en una fuente: puede «inventar» datos con total seguridad. Se verifica en **fuentes primarias**: NVD, aviso oficial SA-CORE-2018-002 o comprobándolo en el propio laboratorio.

<div class="alarma">⚠️ <b>Error frecuente:</b> «la IA no se equivocó nunca» sin haber verificado nada.</div>

---

<!-- _class: pregunta -->

## T25 · Las fases del test de intrusión

### ★ ¿Qué?
Enumera **en orden** las fases de un test de intrusión.

### ★★ ¿Por qué?
Sitúa en su fase `netdiscover`, `searchsploit`, `run` y `find / -perm -4000`. ¿Por qué no se puede alterar el orden?

<!-- ★★★ (oral): ¿Por qué un test de intrusión sin informe no le sirve al cliente? → El valor no es «haber entrado», sino saber qué fallos hay, cuánto riesgo suponen y cómo corregirlos y detectarlos. -->

---

<!-- _class: respuesta -->

## T25 · Respuesta esperada

### ★ Las fases
**Alcance y autorización** → reconocimiento → enumeración → explotación → posexplotación → **documentación** (informe).

### ★★ Cada comando en su fase

| Comando | Fase |
|---|---|
| `netdiscover` | Reconocimiento |
| `searchsploit` | Enumeración · análisis de vulnerabilidades |
| `run` | Explotación |
| `find / -perm -4000` | Posexplotación |

Cada fase **usa la información de la anterior**: sin la versión no se busca el CVE; sin acceso no se escala.

---

<!-- _class: pregunta -->

## T26 · De la base de datos a las contraseñas

### ★ ¿Qué?
Con las credenciales de `settings.php` se podrían ver los ***hashes*** de las contraseñas de los usuarios de Drupal. ¿Qué es un *hash*?

### ★★ ¿Por qué?
Entonces, ¿cómo se podría obtener la contraseña **a partir del *hash***?

<!-- ★★★ (oral): ¿Qué recomendarías para que ese ataque fracase? → Contraseñas largas y únicas, hash lento y con sal (Drupal 7: SHA-512 iterado con sal; hoy bcrypt o Argon2), MFA. -->

---

<!-- _class: respuesta -->

## T26 · Respuesta esperada

### ★ *Hash*
Función **unidireccional** que transforma un texto en una huella de longitud fija. **No se puede «descifrar»**: no es cifrado ni codificación.

### ★★ Ataque de diccionario

<div class="mermaid">
flowchart LR
    D["Diccionario<br/>de palabras"] --> H["Calcular el hash<br/>de cada palabra"]
    H --> C{"¿Coincide con<br/>el hash robado?"}
    C -->|sí| P["Contraseña<br/>encontrada"]
    C -->|no| D
</div>

Funciona si la contraseña es **débil** o común, como en el caso guiado 3 de los CTF.

<div class="alarma">⚠️ <b>Error frecuente:</b> «el <i>hash</i> se descifra con la clave» o confundir <i>hash</i> con Base64.</div>

---

<!-- _class: lead -->
<!-- _paginate: false -->

# Fin de la defensa

## ¿Qué tres conceptos os han costado más?

Anótalos en el apartado 5 de tu **ficha de escucha activa** y repásalos antes de la **prueba individual**.
