import fs from 'node:fs';

for (const p of ['.next', 'node_modules/.cache']) {
  try {
    fs.rmSync(p, { recursive: true, force: true });
  } catch {}
}
