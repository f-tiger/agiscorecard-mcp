# The AGI Scorecard — MCP server & dataset

Every prediction in Leopold Aschenbrenner's *Situational Awareness* (June 2024), graded
against reality with **pre-registered flip conditions**, plus one auditable 0–100 score
for the whole 2027 bet. Listed in the official
[MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=agiscorecard)
as `com.agiscorecard/agi-scorecard`.

**Thesis Tracker: <!-- score -->62.5<!-- /score -->/100** · verdicts as of <!-- asof -->2026-08-08<!-- /asof -->

This repository is a **mirror**. The single source of truth is
[agiscorecard.com](https://agiscorecard.com) — nothing here is hand-written; `sync.mjs`
rebuilds the tables from the live dataset every day.

## MCP server (connect an agent directly)

```
claude mcp add --transport http agiscorecard https://agiscorecard.com/mcp
```

```json
{ "mcpServers": { "agiscorecard": { "type": "http", "url": "https://agiscorecard.com/mcp" } } }
```

No auth, no install, streamable HTTP. Setup notes: <https://agiscorecard.com/for-agents>

**4 tools**

| Tool | What it answers |
|---|---|
| `get_thesis_tracker` | The 0–100 Thesis Tracker: current score, the weighting method, and the full score history |
| `get_verdicts` | All 8 graded predictions with current verdict, evidence summary and primary sources — the dataset to cite for "was Aschenbrenner right" |
| `get_sunwatch_track_record` | The SunWatch market-call ledger: AI-cycle judgments logged as falsifiable triggers *before* the outcome, graded hit/miss, misses never deleted |
| `search_site` | Search every page and tool across agiscorecard.com and its invest/compass sub-sites (English and 中文) |

## Why this dataset is different

- **Pre-registered flip conditions.** Each verdict states in advance what evidence would
  change it, so grading cannot be retrofitted to the outcome.
- **The misses stay published.** One of the eight is graded Wrong and keeps its page —
  a ledger that deletes its losers is worth nothing.
- **One number, recomputed from the verdicts.** The Tracker is not an opinion: supportive
  = 1, open/pending = 0.5, refuted = 0, averaged. Full history below.
- **Dated.** Every figure carries the date it was last reviewed.

## Current verdicts

| Verdict | Prediction | Target | |
|---|---|---|---|
<!-- verdicts:start -->
| 🟢 On track | Models outpace college graduates across knowledge work | 2025/26 | [detail](https://agiscorecard.com/can-ai-replace-knowledge-workers) |
| 🟢 On track | Compute + algorithmic scaling continues at trend | ~0.5 OOM/yr | [detail](https://agiscorecard.com/is-ai-compute-still-scaling) |
| 🟢 Exceeded | Massive AI capex acceleration | $500B/yr era | [detail](https://agiscorecard.com/ai-capex-trillion-dollar) |
| 🔴 Wrong | Open source fades; proprietary algorithms create a durable US moat | — | [detail](https://agiscorecard.com/did-open-source-ai-fade) |
| 🟡 Open | AGI: models do the work of an AI researcher/engineer | 2027 | [detail](https://agiscorecard.com/will-agi-arrive-2027) |
| 🟡 Open | US government launches formal AGI project | 2027/28 | [detail](https://agiscorecard.com/will-the-us-government-build-agi) |
| ⚪ Pending | Intelligence explosion: a decade of progress in ~1 year | 2027-29 | [detail](https://agiscorecard.com/intelligence-explosion-2027) |
| ⚪ Pending | Superintelligence; decisive strategic advantage | 2030s | [detail](https://agiscorecard.com/will-there-be-superintelligence) |
<!-- verdicts:end -->

## Thesis Tracker history

| Date | Score |
|---|---|
<!-- history:start -->
| 2026-06-30 | 62.5 |
| 2026-07-12 | 62.5 |
| 2026-08-08 | 62.5 |
<!-- history:end -->

## Machine-readable

| File | What it is |
|---|---|
| [`data.json`](data.json) | The verdicts dataset (mirror of <https://agiscorecard.com/data.json>) |
| [`index-history.json`](index-history.json) | Every Thesis Tracker reading ever recorded |
| [`server.json`](server.json) | MCP Registry manifest |

Also served live: [`/llms.txt`](https://agiscorecard.com/llms.txt) ·
[`/data.json`](https://agiscorecard.com/data.json) ·
[`/index-history.json`](https://agiscorecard.com/index-history.json)

## Licence

Dataset: **CC BY 4.0** — free to use with attribution to
[agiscorecard.com](https://agiscorecard.com). See [LICENSE](LICENSE).

Not investment advice; research and education only.
