---
marp: true
title: "UD 2.5 – Creación de imágenes Docker"
description: Crear imágenes personalizadas con Dockerfile
author: Eduardo Fdez
date: 2025-01-23
theme: default
paginate: true
style: |
  section {
    font-size: 1.1rem;
  }
  section.lead h1 {
    font-size: 2.2rem;
  }
  h1 { color: #1a73e8; }
  h2 { color: #2c3e50; border-bottom: 2px solid #1a73e8; padding-bottom: 4px; }
  h3 { color: #34495e; }
  code { background: #f4f4f4; }
  pre { font-size: 0.78rem; }
  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  table { font-size: 0.85rem; }
  .ok { color: #27ae60; }
  .bad { color: #e74c3c; }
---

<!-- _class: lead -->

# 🐳 Creación de Imágenes Docker
## Unidad 2.5 – DAW

Dockerfile · docker build · Buenas prácticas · Distribución

---

## 📋 Contenidos de la unidad

1. Métodos de creación de imágenes
2. `docker commit` — crear desde contenedor
3. **Dockerfile** — el método correcto
4. Instrucciones principales del Dockerfile
5. Multi-stage builds
6. Buenas prácticas
7. Construir y distribuir imágenes

---

## 1. Métodos de creación de imágenes

Existen **dos métodos** para crear imágenes Docker personalizadas:

| Método | ¿Cómo? | ¿Cuándo? |
|--------|--------|----------|
| `docker commit` | Modificar un contenedor y guardarlo | Debugging, experimentación |
| **Dockerfile** ✅ | Definir la construcción en un archivo de texto | **Siempre** en producción |

> Hasta ahora usábamos imágenes de Docker Hub. Ahora aprenderemos a crear las nuestras propias.

---

<!-- _class: lead -->

# 2. `docker commit`
### Crear imágenes desde un contenedor

---

## docker commit — Proceso (1/2)

**Paso 1: Crear un contenedor base**
```bash
$ docker run -it --name mi_contenedor ubuntu bash
root@abc123:/#
```

**Paso 2: Instalar software dentro del contenedor**
```bash
root@abc123:/# apt-get update
root@abc123:/# apt-get install -y apache2
root@abc123:/# echo "Hola desde mi servidor" > /var/www/html/index.html
root@abc123:/# exit
```

---

## docker commit — Proceso (2/2)

**Paso 3: Guardar los cambios como imagen**
```bash
$ docker commit mi_contenedor mi_apache:v1
sha256:1234567890abcdef...
```

**Paso 4: Verificar y probar**
```bash
$ docker images
REPOSITORY   TAG   IMAGE ID      CREATED        SIZE
mi_apache    v1    1234567890ab  5 seconds ago  200MB

$ docker run -d -p 8080:80 mi_apache:v1 apache2ctl -D FOREGROUND
$ curl http://localhost:8080
Hola desde mi servidor
```

---

## docker commit — Opciones útiles

```bash
$ docker commit \
  --author "Tu Nombre <tu@email.com>" \
  --message "Instalado Apache 2.4 con página personalizada" \
  mi_contenedor \
  mi_apache:v1
```

Con `--change` para añadir instrucciones Dockerfile:
```bash
$ docker commit \
  --change='CMD ["apache2ctl", "-D", "FOREGROUND"]' \
  --change='EXPOSE 80' \
  mi_contenedor \
  mi_apache:v2
```

---

## ❌ Limitaciones de docker commit

<div class="columns">

<div>

**No es reproducible**
```bash
$ docker history mi_apache:v1
IMAGE     CREATED BY    SIZE   COMMENT
abc123    /bin/bash     127MB  # ¿Qué se hizo aquí?
```
Tu compañero no sabe cómo la creaste.

**No es versionable**
No se puede ver qué cambió entre v1 y v2.

</div>

<div>

**No es automatizable**
No encaja en CI/CD porque requiere intervención manual.

**Difícil de mantener**
```
mi_apache:v1  # ¿Qué había?
mi_apache:v2  # ¿Qué cambió?
mi_apache:v3  # ¿Esta es la buena?
```

</div>

</div>

---

## ✅ ¿Cuándo usar docker commit?

**Casos válidos:**
- 🔍 **Debugging rápido**: tomar una instantánea de un contenedor con problemas
- 🧪 **Experimentación**: probar configuraciones temporalmente
- 💾 **Backup temporal**: antes de cambios arriesgados

```bash
# Tu app falla en producción
$ docker commit contenedor_produccion debug:snapshot
$ docker run -it debug:snapshot bash
# Investigas el problema...
```

> ⚠️ **Nunca** usar para producción, compartir con el equipo, ni nada que necesite mantenimiento. **Usa siempre Dockerfile.**

---

<!-- _class: lead -->

# 3. Dockerfile
### El método correcto ✅

---

## ¿Qué es un Dockerfile?

Un **archivo de texto** que contiene instrucciones para construir una imagen Docker de forma **automatizada y reproducible**.

| | `docker commit` | **Dockerfile** |
|--|:-:|:-:|
| Reproducible | ❌ | ✅ |
| Versionable en Git | ❌ | ✅ |
| Documentado | ❌ | ✅ |
| Automatizable (CI/CD) | ❌ | ✅ |
| Fácil de mantener | ❌ | ✅ |

---

## Estructura básica — ejemplo completo

```dockerfile
# Imagen base (obligatorio)
FROM ubuntu:22.04

# Metadatos
LABEL maintainer="tu@email.com"

# Instalar paquetes (todo en un RUN para minimizar capas)
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar archivos al contenedor
COPY index.html /var/www/html/

# Documentar el puerto que usa la aplicación
EXPOSE 80

# Comando al iniciar el contenedor
CMD ["nginx", "-g", "daemon off;"]
```

---

## Construir la imagen — Paso a paso

```bash
# 1. Crear el directorio de trabajo
$ mkdir mi-nginx && cd mi-nginx

# 2. Crear los archivos necesarios
$ nano Dockerfile
$ echo "<h1>¡Hola desde mi Dockerfile!</h1>" > index.html
```

Estructura del directorio:
```
mi-nginx/
├── Dockerfile
└── index.html
```

```bash
# 3. Construir la imagen
$ docker build -t mi-nginx:v1 .
```

---

## Salida de docker build (analizada)

```
[+] Building 45.3s (9/9) FINISHED
 => [internal] load build definition from Dockerfile    0.0s  ← Lee Dockerfile
 => [internal] load metadata for ubuntu:22.04           1.2s  ← Info imagen base
 => [1/4] FROM docker.io/library/ubuntu:22.04           5.3s  ← Descarga Ubuntu
 => [2/4] RUN apt-get update && apt-get install nginx  35.2s  ← Lo más lento
 => [3/4] COPY index.html /var/www/html/                0.1s  ← Muy rápido
 => exporting to image                                  3.3s  ← Guarda imagen
 => naming to docker.io/library/mi-nginx:v1             0.0s
```

```bash
$ docker run -d -p 8080:80 --name test mi-nginx:v1
$ curl http://localhost:8080
<h1>¡Hola desde mi Dockerfile!</h1>
```

---

<!-- _class: lead -->

# 4. Instrucciones del Dockerfile

---

## FROM — Imagen base

```dockerfile
FROM ubuntu:22.04       # Ubuntu completo  (~72MB)
FROM debian:11          # Debian           (~124MB)
FROM alpine:3.18        # Alpine (ligero)  (~5MB)
FROM scratch            # Vacío            (0MB)

FROM python:3.11        # Python completo  (~900MB)
FROM python:3.11-slim   # Python reducido  (~120MB)
FROM python:3.11-alpine # Python en Alpine (~50MB)

FROM nginx:1.25
FROM node:18
FROM php:8.2-fpm
```

**¿Cuál elegir?**
- 🏔️ **Alpine**: mínima, pero puede tener problemas de compatibilidad
- ⚖️ **Slim**: equilibrio entre tamaño y compatibilidad ← recomendada
- 📦 **Completa**: cuando necesitas todas las herramientas

---

## LABEL — Metadatos de la imagen

```dockerfile
LABEL maintainer="admin@ejemplo.com"
LABEL version="1.0"
LABEL description="Mi aplicación web"

# Múltiples labels en una sola instrucción
LABEL version="1.0" \
      description="API REST usuarios" \
      author="Tu Nombre"

# Estándar OCI (recomendado)
LABEL org.opencontainers.image.authors="equipo@empresa.com"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.source="https://github.com/user/repo"
```

```bash
# Consultar los labels de una imagen
$ docker inspect mi-imagen | grep -A 10 Labels
```

> No afecta al funcionamiento — es solo información, pero muy útil.

---

## RUN — Ejecutar comandos en el build

Cada `RUN` crea una **nueva capa** inmutable en la imagen:

```
Imagen final
├── Capa 3: RUN npm install        (100MB)
├── Capa 2: RUN pip install flask  ( 50MB)
├── Capa 1: RUN apt-get update     ( 40MB)
└── Capa 0: FROM ubuntu            ( 72MB)
```

**⚠️ Las capas no se pueden borrar en pasos posteriores — solo ocultar.**

---

## RUN — ❌ MAL vs ✅ BIEN

<div class="columns">

<div>

**❌ MAL — 4 capas, imagen grande**
```dockerfile
RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
# Resultado: ~140MB
# La capa 2 sigue ocupando 100MB
# aunque limpies en capas posteriores
```

</div>

<div>

**✅ BIEN — 1 capa, imagen pequeña**
```dockerfile
RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
# Resultado: ~60MB
# Los temporales se eliminan
# en la MISMA capa
```

</div>

</div>

---

## RUN — Buenas prácticas

```dockerfile
# ✅ Ordenar paquetes alfabéticamente (fácil de mantener)
RUN apt-get update && apt-get install -y \
    curl \
    git \
    nginx \
    vim \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# ✅ Usar && para que el build falle si algo sale mal
RUN cd /app && npm install

# ✅ pip sin caché (imagen más pequeña)
RUN pip install --no-cache-dir flask==2.3.0 gunicorn==20.1.0
```

---

## COPY — Copiar archivos a la imagen

```dockerfile
COPY app.py /usr/src/app/app.py           # Un archivo
COPY config.yml /etc/myapp/config.yaml   # Con nombre diferente
COPY src/ /usr/src/app/                   # Directorio completo
COPY . /usr/src/app/                      # Todo el contexto

# Con permisos de usuario
COPY --chown=www-data:www-data html/ /var/www/html/
```

**El orden importa — aprovecha la caché:**

```dockerfile
# ❌ MAL: invalida la caché cada vez que cambias código
COPY . /app/
RUN pip install -r requirements.txt

# ✅ BIEN: caché solo se invalida si cambian las dependencias
COPY requirements.txt /app/
RUN pip install -r /app/requirements.txt
COPY . /app/
```

---

## ADD vs COPY

```dockerfile
ADD archivo.tar.gz /app/           # Descomprime automáticamente
ADD https://ejemplo.com/file /tmp/ # Descarga URLs (NO descomprime)
```

| Característica | COPY | ADD |
|---|:-:|:-:|
| Copiar archivos locales | ✅ | ✅ |
| Descomprimir `.tar.gz` | ❌ | ✅ |
| Descargar URLs | ❌ | ✅ |
| Simplicidad | ✅ | ❌ |
| **Recomendado** | **✅** | Solo si necesitas sus features |

> 💡 **Regla de oro**: usa `COPY` siempre. Usa `ADD` solo para descomprimir archives locales.

---

## WORKDIR — Directorio de trabajo

```dockerfile
# ❌ MAL: RUN cd no persiste entre instrucciones
RUN cd /app
RUN ls   # Se ejecuta en /, no en /app

# ✅ BIEN: WORKDIR persiste para todas las instrucciones siguientes
WORKDIR /app
RUN ls   # Se ejecuta en /app ✓
```

```dockerfile
FROM node:18
WORKDIR /usr/src/app   # Crea el directorio si no existe

COPY package*.json ./  # Copia a /usr/src/app/
RUN npm install        # Se ejecuta en /usr/src/app/
COPY . .               # Copia a /usr/src/app/
CMD ["node", "server.js"]
```

> `WORKDIR` crea el directorio automáticamente si no existe.

---

## ENV — Variables de entorno

```dockerfile
ENV APP_DIR=/usr/src/app
ENV PORT=8080

# Múltiples variables
ENV VAR1=valor1 \
    VAR2=valor2

# Usar la variable en instrucciones posteriores
WORKDIR ${APP_DIR}
```

**Variables comunes por lenguaje:**
```dockerfile
# Python
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1

# Node.js
ENV NODE_ENV=production NPM_CONFIG_LOGLEVEL=warn
```

```bash
# Se puede sobrescribir en docker run
$ docker run -e DATABASE_HOST=production-db mi-app
```

---

## EXPOSE — Documentar puertos

```dockerfile
EXPOSE 80       # HTTP  (TCP por defecto)
EXPOSE 443      # HTTPS
EXPOSE 53/udp   # DNS
EXPOSE 80 443   # Múltiples en una línea
```

> ⚠️ **EXPOSE NO abre puertos**. Solo los documenta.

Para abrir el puerto **sí** hay que usar `-p` en `docker run`:
```bash
$ docker run -p 8080:80 mi-app   # SÍ expone el puerto
```

Con `-P` Docker mapea automáticamente todos los `EXPOSE`:
```bash
$ docker run -P mi-app
# Mapea EXPOSE 80 → puerto aleatorio del host (ej: 49153)
```

---

## USER — Ejecutar sin privilegios

Por defecto los contenedores ejecutan como **root** — un riesgo de seguridad.

<div class="columns">

<div>

**❌ MAL (root)**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
CMD ["node", "server.js"]
# Ejecuta como root
```

</div>

<div>

**✅ BIEN (usuario sin privilegios)**
```dockerfile
FROM node:18

RUN useradd -m appuser

WORKDIR /app
COPY --chown=appuser:appuser . .

USER appuser
CMD ["node", "server.js"]
```

</div>

</div>

---

## CMD — Comando por defecto

```dockerfile
CMD ["nginx", "-g", "daemon off;"]   # exec form (recomendado)
CMD nginx -g "daemon off;"           # shell form
```

- Es el comando que se ejecuta al iniciar el contenedor
- **Solo cuenta el último CMD** si hay varios
- Se puede **sobrescribir fácilmente** en `docker run`

```bash
$ docker run mi-imagen
Hola desde CMD

$ docker run mi-imagen echo "Otro mensaje"
Otro mensaje   # CMD se reemplazó
```

---

## ENTRYPOINT — Punto de entrada fijo

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]   # Argumento por defecto
```

```bash
$ docker run mi-imagen          # → python app.py
$ docker run mi-imagen otro.py  # → python otro.py
$ docker run mi-imagen -m pytest # → python -m pytest
```

| | CMD | ENTRYPOINT |
|--|-----|-----------|
| Se sobrescribe con `docker run` | ✅ Fácil | ❌ Difícil (`--entrypoint`) |
| Uso típico | Comando por defecto | Punto de entrada fijo |
| Combinación | Argumentos por defecto | Ejecutable fijo |

---

## VOLUME — Datos persistentes

```dockerfile
VOLUME /data
VOLUME ["/var/log", "/var/db"]
```

Define directorios que **deben persistir** fuera del contenedor.

```dockerfile
FROM postgres:15
VOLUME /var/lib/postgresql/data   # Los datos persisten al reiniciar
```

```bash
# Docker crea un volumen anónimo automáticamente
$ docker run -d postgres
$ docker volume ls
local    abc123def456...

# Mejor: usar volumen nombrado
$ docker run -v pg_data:/var/lib/postgresql/data postgres
```

---

## ARG — Argumentos de construcción

```dockerfile
FROM ubuntu:22.04

ARG VERSION=1.0      # Valor por defecto
ARG USER=appuser

ENV APP_VERSION=${VERSION}
RUN useradd -m ${USER}
USER ${USER}
LABEL version=${VERSION}
```

```bash
# Pasar valores en el build
$ docker build --build-arg VERSION=2.0 --build-arg USER=admin -t mi_app .
```

> 💡 **Diferencia**: `ARG` solo existe durante el build. `ENV` persiste en el contenedor en ejecución.

---

<!-- _class: lead -->

# 5. Ejemplos prácticos
### Aplicaciones reales con Dockerfile

---

## Sitio web estático con Nginx

```dockerfile
FROM nginx:alpine

# Copiar archivos del sitio
COPY html/ /usr/share/nginx/html/

# Configuración personalizada (opcional)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
$ docker build -t mi_web:1.0 .
$ docker run -d -p 8080:80 --name web mi_web:1.0
```

> ✅ Imagen mínima usando `nginx:alpine` (~23MB)

---

## Aplicación Python con Flask

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# 1. Dependencias primero (aprovechar caché)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. Código de la aplicación
COPY . .

# 3. Usuario sin privilegios
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 5000
ENV FLASK_APP=app.py FLASK_ENV=production

CMD ["flask", "run", "--host=0.0.0.0"]
```

---

## Aplicación Node.js

```dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# 1. Dependencias (npm ci es más estricto que npm install)
COPY package*.json ./
RUN npm ci --only=production

# 2. Código
COPY . .

# 3. Usuario sin privilegios (node ya existe en la imagen)
USER node

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Aplicación PHP con Apache

```dockerfile
FROM php:8.2-apache

# Extensiones PHP necesarias para MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Módulo Apache para URLs amigables
RUN a2enmod rewrite

# Código fuente
COPY src/ /var/www/html/

# Permisos correctos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
```

---

<!-- _class: lead -->

# 6. Multi-stage builds
### Imágenes más pequeñas y seguras

---

## ¿Qué son los multi-stage builds?

Permiten usar **múltiples FROM** en un mismo Dockerfile. Cada etapa puede copiar artefactos de la anterior.

**Caso de uso típico**: compilar en una imagen grande y ejecutar en una imagen mínima.

```
Etapa 1 (builder):  golang:1.20 → 800MB  [solo para compilar]
                              ↓  (solo el binario)
Etapa 2 (final):    alpine     → 12MB   [lo que se despliega]
```

---

## Multi-stage build — Ejemplo con Go

```dockerfile
# ── Etapa 1: Compilación ──────────────────────────────────────
FROM golang:1.20 AS builder

WORKDIR /app
COPY . .
RUN go build -o myapp

# ── Etapa 2: Imagen final (mínima) ───────────────────────────
FROM alpine:latest

RUN apk --no-cache add ca-certificates
WORKDIR /root/

# Solo copiamos el binario de la etapa anterior
COPY --from=builder /app/myapp .

CMD ["./myapp"]
```

> **Resultado**: imagen de ~12MB en lugar de ~800MB con el entorno completo de Go.

---

## Multi-stage — Ejemplo con Node.js + React

```dockerfile
# ── Etapa 1: Build del frontend ──────────────────────────────
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build    # Genera /app/dist

# ── Etapa 2: Servir con Nginx ────────────────────────────────
FROM nginx:alpine

# Solo copiamos los estáticos generados
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

<!-- _class: lead -->

# 7. Buenas prácticas
### Imágenes optimizadas, seguras y mantenibles

---

## Buenas prácticas — Resumen visual

| Práctica | ¿Por qué? |
|----------|-----------|
| Combinar `RUN` con `&&` | Menos capas → imagen más pequeña |
| Copiar dependencias antes que código | Aprovechar caché del build |
| Usar imágenes `alpine` o `slim` | Menor superficie de ataque y tamaño |
| Ejecutar con `USER` sin privilegios | Seguridad |
| Usar `.dockerignore` | Build más rápido, no incluir datos sensibles |
| Versionar las imágenes base | Reproducibilidad |
| Multi-stage builds | Separar build/runtime |

---

## Optimización del orden de instrucciones

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# ── Primero: lo que cambia MENOS frecuentemente ──────────────
COPY requirements.txt .
RUN pip install -r requirements.txt   # Usa caché si no cambiaron

# ── Después: lo que cambia MÁS frecuentemente ────────────────
COPY . .

CMD ["python", "app.py"]
```

**¿Por qué importa el orden?**

Cuando cambias tu código, Docker reutiliza la caché del `pip install` → **builds mucho más rápidos**.

---

## Seguridad — checklist

```dockerfile
# 1. Imagen base con versión fija (no :latest)
FROM python:3.11-slim

# 2. Actualizar paquetes del sistema
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

# 3. No ejecutar como root
RUN useradd -m -u 1000 appuser
USER appuser

# 4. No incluir secretos en la imagen
# ❌ ENV DB_PASSWORD=secreto123
# ✅ Pasar en docker run: -e DB_PASSWORD=secreto123

# 5. EXPOSE solo los puertos necesarios
EXPOSE 8080
```

---

## .dockerignore — No enviar todo al daemon

Crea un archivo `.dockerignore` junto al Dockerfile:

```
# Dependencias (se instalan en el contenedor)
node_modules/
__pycache__/
*.pyc

# Control de versiones
.git/
.gitignore

# Entornos y secretos
.env
*.env.local

# Logs y temporales
*.log
tmp/

# Documentación (no necesaria en la imagen)
README.md
docs/
```

---

<!-- _class: lead -->

# 8. Construir y distribuir imágenes

---

## docker build — Opciones útiles

```bash
# Básico
$ docker build -t mi_app:1.0 .

# Especificar Dockerfile diferente
$ docker build -t mi_app:prod -f Dockerfile.prod .

# Sin caché (construcción limpia)
$ docker build --no-cache -t mi_app .

# Pasar argumentos de construcción
$ docker build --build-arg VERSION=2.0 -t mi_app .

# Especificar plataforma
$ docker build --platform linux/amd64 -t mi_app .

# Ver salida detallada
$ docker build --progress=plain -t mi_app .
```

---

## Etiquetar y subir a Docker Hub

```bash
# 1. Etiquetar para Docker Hub (usuario/repositorio:tag)
$ docker tag mi_app:1.0 miusuario/mi_app:1.0
$ docker tag mi_app:1.0 miusuario/mi_app:latest

# 2. Login en Docker Hub
$ docker login

# 3. Subir la imagen
$ docker push miusuario/mi_app:1.0
$ docker push miusuario/mi_app:latest
```

---

## Registro privado

```bash
# 1. Levantar un registro privado con Docker
$ docker run -d -p 5000:5000 --name registry registry:2

# 2. Etiquetar para el registro privado
$ docker tag mi_app:1.0 localhost:5000/mi_app:1.0

# 3. Subir al registro privado
$ docker push localhost:5000/mi_app:1.0

# 4. Descargar desde el registro privado
$ docker pull localhost:5000/mi_app:1.0
```

---

## ✅ Resumen — Lo que hemos aprendido

- 🔹 **Dos métodos** de crear imágenes: `docker commit` (experimental) y **Dockerfile** (producción)
- 🔹 **Instrucciones clave**: `FROM`, `RUN`, `COPY`, `WORKDIR`, `ENV`, `EXPOSE`, `USER`, `CMD`, `ENTRYPOINT`
- 🔹 **Capas**: cada instrucción `RUN` crea una capa → minimizar capas con `&&`
- 🔹 **Caché**: ordenar instrucciones de menos a más cambiante
- 🔹 **Multi-stage builds**: separar compilación de ejecución
- 🔹 **Seguridad**: usuario sin privilegios, sin secretos en la imagen
- 🔹 **Distribución**: Docker Hub y registros privados

---

## 📚 Referencias

- [Documentación oficial Dockerfile](https://docs.docker.com/engine/reference/builder/)
- [Best practices — Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
- [Docker Hub](https://hub.docker.com/)

---

<!-- _class: lead -->

# 🎉 ¡Fin de la unidad!
### Ahora ya puedes crear, optimizar y distribuir tus propias imágenes Docker
