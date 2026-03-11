const fs = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');

const PROJECT_ROOT = process.cwd();
const SLIDES_DIR = path.join(PROJECT_ROOT, 'slides');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const STYLES_DIR = path.join(PROJECT_ROOT, 'styles');
const THEME_FILE = path.join(STYLES_DIR, 'slides-theme.css');
const INDEX_CSS_FILE = path.join(STYLES_DIR, 'index.css');

const SITE_TITLE = process.env.SITE_TITLE || 'Presentaciones docentes';

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function runMarp(inputFile, outputFile) {
  const npxCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const args = [
    'marp',
    inputFile,
    '--html',
    '--allow-local-files',
    '--theme-set',
    THEME_FILE,
    '--theme',
    'course-theme',
    '-o',
    outputFile,
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(npxCommand, args, {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
      shell: false,
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Marp finalizó con código ${code} en ${inputFile}`));
    });
  });
}

function slugToTitle(value) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function toWebPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function encodeWebPathSegments(webPath) {
  return webPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildIndexHtml(items) {
  const grouped = new Map();

  for (const item of items) {
    const parts = item.relativeMd.split('/');
    const subjectSlug = parts.length > 1 ? parts[0] : 'general';
    const subjectTitle = slugToTitle(subjectSlug);

    if (!grouped.has(subjectSlug)) {
      grouped.set(subjectSlug, {
        title: subjectTitle,
        slug: subjectSlug,
        presentations: [],
      });
    }

    grouped.get(subjectSlug).presentations.push({
      title: slugToTitle(path.basename(item.relativeMd, '.md')),
      htmlPath: item.relativeHtml,
    });
  }

  const sortedSubjects = [...grouped.values()].sort((a, b) =>
    a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }),
  );

  const sections = sortedSubjects
    .map((subject) => {
      const sortedPresentations = [...subject.presentations].sort((a, b) =>
        a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }),
      );

      const links = sortedPresentations
        .map((presentation) => {
          const href = encodeWebPathSegments(toWebPath(presentation.htmlPath));
          return `<li><a href="./${href}">${escapeHtml(presentation.title)}</a></li>`;
        })
        .join('');

      return `
        <section class="subject-card">
          <h2>${escapeHtml(subject.title)}</h2>
          <ul>
            ${links}
          </ul>
        </section>
      `;
    })
    .join('');

  const generatedAt = new Date().toLocaleString('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(SITE_TITLE)}</title>
    <meta name="description" content="Índice de presentaciones generado automáticamente" />
    <link rel="stylesheet" href="./assets/index.css" />
  </head>
  <body>
    <header class="hero">
      <div class="container">
        <p class="eyebrow">Repositorio de diapositivas</p>
        <h1>${escapeHtml(SITE_TITLE)}</h1>
        <p class="subtitle">Índice generado automáticamente desde la carpeta <code>slides/</code>.</p>
      </div>
    </header>

    <main class="container subjects-grid">
      ${sections || '<p>No se encontraron presentaciones en <code>slides/</code>.</p>'}
    </main>

    <footer class="container footer-note">
      <p>Última generación: ${escapeHtml(generatedAt)}</p>
    </footer>
  </body>
</html>`;
}

async function ensureFolders() {
  await fs.mkdir(DIST_DIR, { recursive: true });
  await fs.mkdir(path.join(DIST_DIR, 'assets'), { recursive: true });
}

async function main() {
  if (!await pathExists(SLIDES_DIR)) {
    throw new Error('No existe la carpeta slides/. Créala y añade archivos .md.');
  }

  if (!await pathExists(THEME_FILE)) {
    throw new Error('No existe styles/slides-theme.css.');
  }

  if (!await pathExists(INDEX_CSS_FILE)) {
    throw new Error('No existe styles/index.css.');
  }

  await fs.rm(DIST_DIR, { recursive: true, force: true });
  await ensureFolders();

  const markdownFiles = await collectMarkdownFiles(SLIDES_DIR);

  const generatedItems = [];

  for (const mdFile of markdownFiles) {
    const relativeMd = path.relative(SLIDES_DIR, mdFile);
    const outputRelative = relativeMd.replace(/\.md$/i, '.html');
    const outputFile = path.join(DIST_DIR, outputRelative);

    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await runMarp(mdFile, outputFile);

    generatedItems.push({
      relativeMd: toWebPath(relativeMd),
      relativeHtml: toWebPath(outputRelative),
    });
  }

  const indexHtml = buildIndexHtml(generatedItems);
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), indexHtml, 'utf8');
  await fs.copyFile(INDEX_CSS_FILE, path.join(DIST_DIR, 'assets', 'index.css'));
  await fs.writeFile(path.join(DIST_DIR, '.nojekyll'), '', 'utf8');

  console.log(`Build completado. Presentaciones generadas: ${generatedItems.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
