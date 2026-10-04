import fs from 'node:fs';const meta=JSON.parse(fs.readFileSync('content/meta.json','utf8'));fs.writeFileSync('public/content-revision.json',JSON.stringify({revision:meta.revision})+'\n');
