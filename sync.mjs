#!/usr/bin/env node
// 每日从 agiscorecard.com 拉最新判定与追踪指数,重建 README 的两张表;无变化则不产生提交。
// 这个仓库是镜像:唯一事实源永远是 agiscorecard.com,这里不手写任何数字。
import { writeFileSync, readFileSync } from 'node:fs';

const base = 'https://agiscorecard.com';
const data = await (await fetch(base + '/data.json')).json();
const history = await (await fetch(base + '/index-history.json')).json();

writeFileSync('data.json', JSON.stringify(data, null, 2) + '\n');
writeFileSync('index-history.json', JSON.stringify(history, null, 2) + '\n');

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|');
const BADGE = { 'On track': '🟢', Exceeded: '🟢', Wrong: '🔴', Open: '🟡', Pending: '⚪' };

const verdictRows = data.predictions
  .map((p) => `| ${BADGE[p.verdict] || ''} ${esc(p.verdict)} | ${esc(p.prediction)} | ${esc(p.target)} | [detail](${p.detail}) |`)
  .join('\n');

const latest = history[history.length - 1];
const historyRows = history
  .map((h) => `| ${h.date} | ${h.score} |`)
  .join('\n');

let readme = readFileSync('README.md', 'utf8');
readme = readme
  .replace(/(<!-- verdicts:start -->\n)([\s\S]*?)(\n<!-- verdicts:end -->)/,
    (_, a, _b, c) => a + verdictRows + c)
  .replace(/(<!-- history:start -->\n)([\s\S]*?)(\n<!-- history:end -->)/,
    (_, a, _b, c) => a + historyRows + c)
  .replace(/<!-- score -->[^<]*<!-- \/score -->/,
    `<!-- score -->${latest.score}<!-- /score -->`)
  .replace(/<!-- asof -->[^<]*<!-- \/asof -->/,
    `<!-- asof -->${data.dateModified}<!-- /asof -->`);
writeFileSync('README.md', readme);

console.log('synced', data.predictions.length, 'verdicts; tracker', latest.score, 'as of', latest.date);
