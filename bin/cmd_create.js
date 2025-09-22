import { fileURLToPath } from 'url';
import { dirname, join, basename, resolve } from 'path';
import {
  readdir,
  readFile,
  writeFile,
  copyFile,
  mkdir,
} from 'fs/promises';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    const s = join(src, ent.name);
    const d = join(dest, ent.name);
    if (ent.isDirectory()) await copyDir(s, d);
    else await copyFile(s, d);
  }
}

export async function execute([dir = '.']) {
  const root = resolve(dir);
  const files = await readdir(root).catch(() => []);
  if (files.length) {
    console.error('Directory is not empty, aborting.');
    process.exit(1);
  }

  const name = basename(root);
  const templateDir = join(__dirname, '..', 'starter');
  await copyDir(templateDir, root);

  // read the template package.json
  const pkgPath = join(root, 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));

  // overwrite only the dynamic bits
  pkg.name = name;
  pkg.description = name + ': a noxt CLI starter';
  pkg.private = true;
  pkg.version ||= '0.0.0';
  pkg.scripts ||= {};

  // ensure noxt-cli is present
  pkg.devDependencies ||= {};
  pkg.devDependencies['noxt-cli'] = 'latest';

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

  // install prod + peer deps
  spawnSync('npm', ['install'], { cwd: root, stdio: 'inherit' });
}