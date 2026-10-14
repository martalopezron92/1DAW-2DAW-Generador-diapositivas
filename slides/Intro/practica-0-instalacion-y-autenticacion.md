# Práctica 0: Preparar tu entorno de trabajo

**Instalar Visual Studio Code y Git, crear tu cuenta de GitHub y autenticarte**

> ⏱️ **Duración estimada:** 30-40 minutos
> 🎯 **Dificultad:** básica (no necesitas conocimientos previos)

---

## 📋 Índice

1. [Objetivos](#1-objetivos)
2. [Requisitos previos](#2-requisitos-previos)
3. [Paso 1: Instalar Visual Studio Code](#3-paso-1-instalar-visual-studio-code)
4. [Paso 2: Instalar Git](#4-paso-2-instalar-git)
5. [Paso 3: Configurar Git](#5-paso-3-configurar-git)
6. [Paso 4: Crear tu cuenta de GitHub](#6-paso-4-crear-tu-cuenta-de-github)
7. [Paso 5: Autenticarte en GitHub](#7-paso-5-autenticarte-en-github-la-forma-más-sencilla)
8. [Paso 6: Prueba final](#8-paso-6-prueba-final-comprueba-que-todo-funciona)
9. [Problemas frecuentes](#9-problemas-frecuentes)
10. [Checklist de entrega](#10-checklist-de-entrega)

---

## 1. Objetivos

Al terminar esta práctica tendrás:

- ✅ **Visual Studio Code** instalado (tu editor de código y de Markdown)
- ✅ **Git** instalado y configurado con tu nombre y correo
- ✅ Una **cuenta de GitHub** activa y verificada
- ✅ Tu equipo **autenticado en GitHub**, listo para subir tus prácticas
- ✅ Un primer repositorio de prueba subido correctamente

---

## 2. Requisitos previos

| Necesitas | Para qué |
|---|---|
| Un ordenador (Windows, macOS o Linux) | Instalar los programas |
| Conexión a internet | Descargar e iniciar sesión |
| Un **correo electrónico** al que tengas acceso | Crear la cuenta de GitHub |
| Permisos de instalación | Si el equipo es del centro, pide ayuda al profesor |

> 💡 Esta guía usa **Windows** como sistema principal. Al final de cada paso verás notas para **macOS** y **Linux**.

---

## 3. Paso 1: Instalar Visual Studio Code

**Visual Studio Code** (VS Code) es un editor gratuito de Microsoft. Lo usaremos para escribir código y documentos Markdown, y trae terminal y Git integrados.

### 3.1 Descargar

1. Abre tu navegador y entra en: **https://code.visualstudio.com**
2. Pulsa el botón grande de descarga. La web detecta tu sistema operativo automáticamente.
3. Espera a que termine la descarga (archivo `VSCodeUserSetup-...exe` en Windows).

### 3.2 Instalar (Windows)

1. Haz **doble clic** en el archivo descargado.
2. Acepta el acuerdo de licencia → **Siguiente**.
3. Deja la carpeta de destino por defecto → **Siguiente**.
4. En *"Seleccionar tareas adicionales"* **marca estas casillas**:
   - ✅ *Añadir la acción "Abrir con Code" al menú contextual del Explorador de archivos* (archivos)
   - ✅ *Añadir la acción "Abrir con Code" al menú contextual de directorios*
   - ✅ *Añadir a PATH* (suele venir marcada)
5. Pulsa **Instalar** y, al acabar, **Finalizar**.

---

### 3.3 Comprobar que funciona

1. Abre **Visual Studio Code** desde el menú Inicio.
2. Debería aparecer la pantalla de bienvenida.

### 3.4 (Opcional) Poner VS Code en español

1. Pulsa `Ctrl + Shift + X` (abre Extensiones).
2. Busca **Spanish Language Pack for Visual Studio Code**.
3. Pulsa **Install** y después **Restart** cuando lo pida.

---

### 3.5 Extensiones recomendadas para el curso

En el panel de Extensiones (`Ctrl + Shift + X`) busca e instala:

| Extensión | Para qué sirve |
|---|---|
| **Markdown All in One** | Atajos y utilidades para escribir Markdown |
| **Marp for VS Code** | Ver y exportar presentaciones en Markdown |
| **Markdown Preview Mermaid Support** | Ver diagramas Mermaid en la vista previa |

> 🍎 **macOS:** arrastra `Visual Studio Code.app` a la carpeta *Aplicaciones*.
> 🐧 **Linux:** descarga el `.deb` (Ubuntu/Debian) o `.rpm` (Fedora) y ábrelo con el instalador de software, o usa `sudo apt install ./archivo.deb`.

---

## 4. Paso 2: Instalar Git

**Git** es el programa que guarda el historial de tus cambios. Se instala aparte de VS Code.

### 4.1 Descargar (Windows)

1. Entra en: **https://git-scm.com/downloads**
2. Pulsa **Windows** y descarga la versión de **64-bit** (*"Git for Windows Setup"*).

---

### 4.2 Instalar (Windows)

Se abrirá un asistente con muchas pantallas. **Para la mayoría basta con pulsar "Next"**. Estas son las que importan:

| Pantalla | Qué hacer |
|---|---|
| Select Components | Deja las opciones por defecto |
| Choosing the default editor | Elige **Use Visual Studio Code as Git's default editor** |
| Adjusting the name of the initial branch | Elige **Override the default branch name → `main`** |
| Adjusting your PATH environment | Deja **Git from the command line and also from 3rd-party software** (recomendada) |
| Choosing HTTPS transport backend | Deja la opción por defecto |
| Configuring line ending conversions | Deja **Checkout Windows-style, commit Unix-style** |
| Choose a credential helper | Debe estar **Git Credential Manager** ✅ (es lo que nos hará la autenticación fácil) |
| Resto de pantallas | **Next** → **Install** |

3. Al terminar, desmarca *"View Release Notes"* y pulsa **Finish**.

> ⚠️ **Muy importante:** no cambies la opción *Git Credential Manager*. Es la pieza que hace que iniciar sesión en GitHub sea tan sencillo (Paso 5).

---

### 4.3 Comprobar la instalación

1. Abre **VS Code**.
2. Abre la terminal integrada: menú **Terminal → Nueva terminal** (o `` Ctrl + ` ``).
3. Escribe:

```bash
git --version
```

4. Debe aparecer algo parecido a:

```
git version 2.4x.x.windows.1
```

Si aparece, ¡Git está instalado! ✅

> Si dice que no reconoce el comando, **cierra y vuelve a abrir VS Code** (necesita reiniciarse para detectar Git).

> 🍎 **macOS:** abre la Terminal y escribe `git --version`. Si no está instalado, macOS te ofrecerá instalar las *Command Line Tools*: acepta. Alternativa: `brew install git`.
> 🐧 **Linux (Ubuntu/Debian):** `sudo apt update && sudo apt install git`

---

## 5. Paso 3: Configurar Git

Git necesita saber **quién eres** para firmar tus commits. Se hace **una sola vez**.

En la terminal de VS Code escribe (sustituye por tus datos reales):

```bash
git config --global user.name "Tu Nombre y Apellido"
git config --global user.email "tu_correo@ejemplo.com"
git config --global init.defaultBranch main
```

> ⚠️ **Usa el mismo correo con el que crearás tu cuenta de GitHub** (Paso 4). Así tus commits quedarán asociados a tu perfil.

Comprueba que se guardó:

```bash
git config --global user.name
git config --global user.email
```

Deben mostrarte los datos que acabas de escribir. ✅

---

## 6. Paso 4: Crear tu cuenta de GitHub

**GitHub** es la web donde guardarás tus repositorios en la nube y desde donde entregarás las prácticas.

### 6.1 Registrarte

1. Entra en: **https://github.com/signup**
2. Rellena el formulario:
   - **Email:** tu correo (el mismo que en el Paso 3).
   - **Password:** una contraseña segura (mínimo 8 caracteres, con letras y números). Guárdala en un lugar seguro.
   - **Username:** tu nombre de usuario.
3. Resuelve el pequeño **puzzle de verificación**.
4. Pulsa **Create account**.

### 6.2 Elegir un buen nombre de usuario

Tu usuario aparecerá en las URLs de tus prácticas (`github.com/tu-usuario/...`), así que:

- ✅ Profesional y reconocible: `ana-garcia`, `agarcia-dev`, `juan.perez`
- ❌ Evita: `xX_killer_Xx`, `pepito69`, nombres con faltas o bromas

---

### 6.3 Verificar el correo

1. GitHub enviará un **código** a tu correo.
2. Revisa tu bandeja de entrada (y la carpeta de **spam**).
3. Introduce el código en la web.

### 6.4 Finalizar el registro

1. Las preguntas de personalización (*"¿para qué usarás GitHub?"*) puedes **saltarlas**: pulsa *Skip personalization*.
2. Elige el plan **Free** (gratuito). Es más que suficiente.

### 6.5 Comprobar

Deberías ver tu página principal de GitHub (*Dashboard*). Haz clic en tu foto de perfil (arriba a la derecha): debe aparecer tu nombre de usuario. ✅

> 🔐 **Recomendación:** activa la autenticación en dos pasos más adelante (*Settings → Password and authentication*). No es obligatoria para esta práctica.

---

## 7. Paso 5: Autenticarte en GitHub (la forma más sencilla)

Para subir tu trabajo (`git push`), GitHub tiene que saber que **eres tú**. Hay varios métodos; aquí usaremos el más simple: **iniciar sesión desde el navegador**.

> ❌ GitHub **ya no permite usar tu contraseña** en la terminal. Por eso usamos este método.

### 7.1 ¿Cómo funciona?

```
  git push  ──►  Git Credential Manager  ──►  Se abre el navegador
                                                      │
        Tu equipo queda autenticado  ◄──  Tú pulsas "Authorize"
```

Solo tendrás que iniciar sesión **la primera vez**. Después, el equipo recordará tus credenciales.

---

### 7.2 Crear un repositorio de prueba en GitHub

1. En GitHub, pulsa el botón **+** (arriba a la derecha) → **New repository**.
2. Rellena:
   - **Repository name:** `prueba-autenticacion`
   - **Visibility:** Public
   - ✅ Marca **Add a README file**
3. Pulsa **Create repository**.

### 7.3 Clonar el repositorio con VS Code

1. Dentro del repositorio, pulsa el botón verde **`<> Code`**.
2. Asegúrate de que está seleccionada la pestaña **HTTPS** y **copia la URL** (icono de copiar). Será algo así:

```
https://github.com/tu-usuario/prueba-autenticacion.git
```

3. En VS Code abre la terminal y elige una carpeta donde guardar tus prácticas, por ejemplo:

```bash
cd ~/Documents
git clone https://github.com/tu-usuario/prueba-autenticacion.git
cd prueba-autenticacion
code .
```

> `code .` abre la carpeta actual en VS Code. Si no funciona, usa **Archivo → Abrir carpeta**.

---

### 7.4 Hacer un cambio y subirlo (aquí te autenticas)

1. En VS Code, abre el archivo `README.md`.
2. Añade una línea al final, por ejemplo:

```markdown
Hola, soy [tu nombre] y esta es mi primera práctica de Git.
```

3. Guarda el archivo (`Ctrl + S`).
4. En la terminal ejecuta:

```bash
git add .
git commit -m "Añade mi presentación al README"
git push
```
---

### 7.5 ¡Inicio de sesión!

Al ejecutar `git push` ocurrirá lo siguiente:

1. Aparece una **ventana emergente** de *Git Credential Manager* (*"Connect to GitHub"*).
2. Pulsa **Sign in with your browser**.
3. Se abre el navegador. Si no has iniciado sesión, **introduce tu usuario y contraseña de GitHub**.
4. Pulsa el botón verde **Authorize git-ecosystem** (o similar).
5. Verás el mensaje *"Authentication Succeeded"*. **Cierra la pestaña**.
6. Vuelve a VS Code: el `push` terminará por sí solo.

Verás algo parecido a:

```
Enumerating objects: 5, done.
...
To https://github.com/tu-usuario/prueba-autenticacion.git
   a1b2c3d..e4f5g6h  main -> main
```

🎉 **¡Ya estás autenticado!**

---

### 7.6 Alternativa: iniciar sesión desde VS Code

Si la ventana emergente no aparece, o prefieres hacerlo desde VS Code:

1. Abajo a la izquierda, pulsa el icono de **Cuentas** (silueta de persona).
2. Elige **Iniciar sesión con GitHub para usar GitHub Pull Requests...** (o *Sign in with GitHub*).
3. Se abre el navegador → pulsa **Continue** / **Authorize Visual-Studio-Code**.
4. Acepta que el navegador abra VS Code de nuevo.
5. Verás tu usuario en el icono de Cuentas. ✅

> 🍎 **macOS / 🐧 Linux:** si Git no incluye *Git Credential Manager*, este método (7.6) es el más cómodo: inicia sesión en VS Code y haz el commit y el push desde el panel de **Control de código fuente** (icono de ramas, `Ctrl + Shift + G`).

---

## 8. Paso 6: Prueba final (comprueba que todo funciona)

1. Vuelve al navegador y abre tu repositorio `prueba-autenticacion` en GitHub.
2. **Recarga la página** (`F5`).
3. Debes ver:
   - Tu línea nueva en el `README.md`.
   - Tu commit **"Añade mi presentación al README"** en el historial.
   - Tu nombre de usuario como autor.

---

### ✍️ Mini-ejercicio

Repite el ciclo una vez más **sin ayuda**:

1. Crea un archivo `datos.md` con un título `# Mis datos` y una lista con tu nombre, curso y un hobby.
2. Ejecuta `git status` y observa el archivo nuevo (en rojo).
3. `git add datos.md` y `git status` otra vez (ahora en verde).
4. `git commit -m "Añade datos.md"`
5. `git push` *(esta vez no debería pedirte iniciar sesión)*.
6. Comprueba en GitHub que aparece el archivo.

---

## 9. Problemas frecuentes

| Problema | Causa probable | Solución |
|---|---|---|
| `git` no se reconoce como comando | VS Code abierto antes de instalar Git | Cierra y vuelve a abrir VS Code (o reinicia el PC) |
| `Author identity unknown` | No configuraste nombre/correo | Repite el [Paso 3](#5-paso-3-configurar-git) |
| `Authentication failed` / pide contraseña | Contraseña escrita en terminal | GitHub no la acepta. Usa el inicio de sesión por navegador (7.5) |
| No aparece la ventana de inicio de sesión | Git Credential Manager no instalado | Usa la alternativa 7.6 o reinstala Git |
| No me llega el correo de verificación | Correo mal escrito o en spam | Revisa spam; en GitHub pulsa *Resend* |

---

| Problema | Causa probable | Solución |
|---|---|---|
| `Repository not found` | URL mal copiada o repo privado de otra cuenta | Revisa la URL y que estés logueado con tu usuario |
| Quiero cambiar de cuenta de GitHub | Credencial guardada anterior | Windows: *Administrador de credenciales → Credenciales de Windows* → borra las de `git:https://github.com` |
| `fatal: not a git repository` | Terminal fuera de la carpeta del repo | Usa `cd` para entrar en la carpeta del repo |

---

## 10. Checklist de entrega

Marca cada punto cuando lo hayas conseguido:

- [ ] VS Code instalado y abre correctamente
- [ ] Extensiones *Markdown All in One* y *Marp for VS Code* instaladas
- [ ] `git --version` muestra la versión en la terminal
- [ ] `user.name` y `user.email` configurados
- [ ] Cuenta de GitHub creada y correo verificado
- [ ] Repositorio `prueba-autenticacion` creado y clonado
- [ ] Primer `git push` realizado con inicio de sesión por navegador
- [ ] El segundo `git push` (`datos.md`) funciona **sin** pedir credenciales

---

## 📚 Recursos de ayuda

- 🌐 Descargas de VS Code: https://code.visualstudio.com
- 🌐 Descargas de Git: https://git-scm.com/downloads
- 🌐 Registro en GitHub: https://github.com/signup
- 📘 Documentación de GitHub en español: https://docs.github.com/es
- 📘 Libro Pro Git (gratuito): https://git-scm.com/book/es/v2


