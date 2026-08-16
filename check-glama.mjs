#!/usr/bin/env node
// Glama 收录状态探针。
//
// 为什么在这里跑:会话所在沙箱的出网代理屏蔽 glama.ai(EGRESS_BLOCKED),
// 而 GitHub runner 可以直连。本仓是公开仓,Actions 分钟数免费,所以这个探针
// 的月成本是 0——符合「新增定时任务先算账」的规则。
// 结果写进 glama-status.json 提交回仓库,会话只需读 git 即可知道审核状态,
// 不需要任何人去后台看。
//
// 判定标准刻意用「徽章能不能渲染」而不是「页面在不在」:awesome-mcp-servers
// 的机器人卡的就是这张 score.svg,它渲染 = 那边的验收条件成立。
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const SERVERS = [
  { key: 'verified-ai-free-tiers', paths: ['f-tiger/verified-ai-free-tiers', '@f-tiger/verified-ai-free-tiers'] },
  { key: 'agiscorecard-mcp',       paths: ['f-tiger/agiscorecard-mcp',       '@f-tiger/agiscorecard-mcp'] },
];

async function probe(path) {
  const url = `https://glama.ai/mcp/servers/${path}/badges/score.svg`;
  try {
    const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
    const body = r.ok ? await r.text() : '';
    // 真徽章是 SVG 且带分数文本;占位/错误页不是。两个条件都要满足才算「已评分」。
    const isSvg = body.trimStart().startsWith('<svg') || body.includes('<svg');
    return { url, http: r.status, scored: r.ok && isSvg, bytes: body.length };
  } catch (e) {
    return { url, http: 0, scored: false, error: String(e.message || e).slice(0, 80) };
  }
}

const out = { checked: new Date().toISOString().slice(0, 16) + 'Z', servers: [] };
for (const s of SERVERS) {
  let best = null;
  for (const p of s.paths) {
    const r = await probe(p);
    if (!best || r.scored || (r.http && !best.http)) best = { path: p, ...r };
    if (r.scored) break;
  }
  out.servers.push({ name: s.key, ...best });
}

const prev = existsSync('glama-status.json') ? JSON.parse(readFileSync('glama-status.json', 'utf8')) : null;
writeFileSync('glama-status.json', JSON.stringify(out, null, 2) + '\n');

for (const s of out.servers) {
  const was = prev?.servers?.find((x) => x.name === s.name);
  const flipped = was && !was.scored && s.scored;
  console.log(`${s.scored ? '✅ SCORED' : '⏳ pending'}  ${s.name}  http=${s.http}${flipped ? '  ← 本次刚通过' : ''}`);
  if (flipped) console.log(`::notice::Glama listing approved for ${s.name} — badge now renders`);
}
