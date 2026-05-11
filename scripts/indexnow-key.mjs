#!/usr/bin/env node
// Generate a fresh IndexNow key (32-char hex) + the verification file.
// Run once at deploy time:
//   node scripts/indexnow-key.mjs
// Outputs: prints key to stdout + writes public/<key>.txt
// Then: set INDEXNOW_KEY=<key> in Vercel Production env vars and redeploy.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const key = crypto.randomBytes(16).toString('hex');
const fileName = `${key}.txt`;
const fullPath = path.join(process.cwd(), 'public', fileName);
fs.writeFileSync(fullPath, key);

console.log(`Generated IndexNow key: ${key}`);
console.log(`Wrote verification file: public/${fileName}`);
console.log('');
console.log('Next steps:');
console.log(
  `  1. Set INDEXNOW_KEY=${key} in Vercel Project Settings → Environment Variables → Production`,
);
console.log(
  `  2. Commit public/${fileName} (this is public information per IndexNow spec)`,
);
console.log(
  '  3. Redeploy. Verify file is reachable at https://visitisrael.site/' +
    fileName,
);
console.log(
  '  4. Call lib/indexnow.ts → indexNowPing() from content-publish flow (Phase 6 wiring).',
);
