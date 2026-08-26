import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const files = [
  'index.html',
  '1_可点击原型_LitScope.html',
  '0_原型预览.png',
  '2_简短设计说明.md',
  '3_Mock文献数据.json',
  '4_提交说明_README.md',
  '5_需求验收清单.md'
];

if (existsSync('dist')) rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });

for (const file of files) {
  if (existsSync(file)) cpSync(file, `dist/${file}`);
}

mkdirSync('dist/server', { recursive: true });
mkdirSync('dist/.openai', { recursive: true });

writeFileSync('dist/.openai/hosting.json', JSON.stringify({
  project_id: 'appgprj_6a8e3ae2aebc8191b810f37aef80bee1'
}, null, 2));

const html = readFileSync('index.html', 'utf8');
writeFileSync('dist/server/index.js', `
const html = ${JSON.stringify(html)};

export default {
  async fetch() {
    return new Response(html, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }
};
`);

