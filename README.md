# Generador de diapositivas con Markdown + Marp + GitHub Pages

Sistema automático para generar presentaciones HTML desde archivos Markdown organizados por asignaturas, con despliegue automático en GitHub Pages mediante GitHub Actions.

## 1) Estructura de trabajo (`slides/`)

La carpeta de trabajo principal es `slides/`.

```text
slides/
  bases-de-datos/
    modelo-relacional.md
    normalizacion.md
  entornos-de-desarrollo/
    git-y-github.md
    pull-request.md
  inteligencia-artificial/
    modelos-supervisados.md
```

- Cada subcarpeta dentro de `slides/` se interpreta como una asignatura.
- Cada archivo `.md` se interpreta como una presentación independiente.
- No hay listas manuales de archivos ni rutas hardcodeadas.

## 2) Cómo crear una nueva asignatura

1. Crea una carpeta nueva dentro de `slides/`.
2. Añade uno o más archivos `.md` dentro de esa carpeta.
3. Ejecuta `npm run build` o haz push a `main` para despliegue automático.

Ejemplo:

```text
slides/programacion/
  introduccion-a-js.md
  funciones.md
```

## 3) Cómo añadir una nueva presentación `.md`

- Añade un nuevo archivo Markdown dentro de cualquier asignatura en `slides/`.
- En el próximo build se generará automáticamente su `.html` equivalente en `dist/`.
- El índice principal `dist/index.html` se regenerará automáticamente con el nuevo enlace.

## 4) Ejecución local

### Instalar dependencias

```bash
npm install
```

### Generar todas las presentaciones

```bash
npm run build
```

### Vista previa local

```bash
npm run preview
```

Esto levanta un servidor estático sobre `dist/` en `http://localhost:4173`.

## 5) Proceso completo de build

El script `scripts/build.js` hace automáticamente:

1. Limpia `dist/`.
2. Recorre recursivamente `slides/` para detectar todos los `.md`.
3. Compila cada Markdown a HTML con Marp.
4. Mantiene la estructura de carpetas en salida (`dist/<asignatura>/<presentacion>.html`).
5. Genera `dist/index.html` de forma dinámica.
6. Copia estilos del índice en `dist/assets/index.css`.
7. Crea `dist/.nojekyll` para compatibilidad con Pages.

## 6) Índice general automático

El índice principal se genera en cada build y:

- Muestra título general del sitio.
- Agrupa por asignaturas detectadas automáticamente.
- Lista presentaciones disponibles por asignatura.
- Genera enlaces relativos correctos para GitHub Pages.
- Tiene diseño responsive y estilo docente/profesional.

No se edita a mano: siempre se regenera desde el árbol de `slides/`.

## 7) Estilos

- `styles/slides-theme.css`: tema Marp reutilizable para las presentaciones.
- `styles/index.css`: estilo visual del índice general.

Puedes personalizarlos sin tocar la lógica de generación.

## 8) GitHub Actions

Workflow: `.github/workflows/deploy-pages.yml`

Se ejecuta en cada push a `main` (y manualmente con `workflow_dispatch`) y realiza:

1. Checkout del repo.
2. Instalación de Node.js y dependencias (`npm install`).
3. Build completo (`npm run build`).
4. Publicación de `dist/` en GitHub Pages.

## 9) Publicación en GitHub Pages

La solución está preparada para Pages desplegado desde Actions:

- Usa rutas relativas para navegar correctamente en subrutas de repositorio.
- Mantiene enlaces válidos entre `index.html` y presentaciones en subcarpetas.
- Incluye `.nojekyll` en `dist/`.

## 10) Estructura de salida generada (`dist/`)

```text
dist/
  index.html
  .nojekyll
  assets/
    index.css
  bases-de-datos/
    modelo-relacional.html
    normalizacion.html
  entornos-de-desarrollo/
    git-y-github.html
    pull-request.html
  inteligencia-artificial/
    modelos-supervisados.html
```

## Scripts npm disponibles

- `npm run build`: genera todas las presentaciones y el índice.
- `npm run preview`: build + servidor local sobre `dist/`.
- `npm run serve`: servidor local para un `dist/` ya generado.

## Requisitos

- Node.js 20+ recomendado.
- npm 9+ recomendado.
