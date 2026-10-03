# The AGI Scorecard — MCP server & dataset

Every prediction in Leopold Aschenbrenner's *Situational Awareness* (June 2024), graded
against reality with **pre-registered flip conditions**, plus one auditable 0–100 score
for the whole 2027 bet. Listed in the official
[MCP Registry](https://registry.modelcontextprotocol.io/v0/servers?search=agiscorecard)
as `com.agiscorecard/agi-scorecard`.

**Thesis Tracker: <!-- score -->62.5<!-- /score -->/100** · verdicts as of <!-- asof -->2026-09-06<!-- /asof -->

This repository is a **mirror**. The single source of truth is
[agiscorecard.com](https://agiscorecard.com). `sync.mjs` rebuilds the dataset tables
from the live source every day; the integration notes and related resources below are curated.

## MCP server (connect an agent directly)

```
claude mcp add --transport http agiscorecard https://agiscorecard.com/mcp
```

```json
{ "mcpServers": { "agiscorecard": { "type": "http", "url": "https://agiscorecard.com/mcp" } } }
```

No auth, no install, streamable HTTP. Setup notes: <https://agiscorecard.com/for-agents>

**8 tools**

| Tool | What it answers |
|---|---|
| `get_thesis_tracker` | The 0–100 Thesis Tracker: current score, the weighting method, and the full score history |
| `get_verdicts` | All 8 graded predictions with current verdict, evidence summary and primary sources — the dataset to cite for "was Aschenbrenner right" |
| `get_sunwatch_track_record` | Editorial market judgments, outcome labels and evidence audit; not a verified prospective trading-return record |
| `get_portfolio_returns` | Twelve-stock model returns versus SPY, QQQ and TQQQ from the fixed October 2, 2026 NY close; dated returns, drawdowns, entry prices, source status and optional daily history |
| `get_invest_positions` | AI-equity thesis mappings, public 13F positioning and filing-date copy comparisons |
| `get_agi_consensus` | Dated public AGI market probabilities, cross-venue comparisons and resolution basis |
| `get_claim_ledger` | Graded money-making claims and their published evidence; optional claimledger.json URL |
| `search_site` | Search every page and tool across agiscorecard.com and its invest/compass sub-sites (English and 中文) |

## Portfolio returns tool

The same source used by the [public tracker](https://agiscorecard.com/portfolio-tracker)
is available as MCP `get_portfolio_returns` with `{}`. Pass
`{"include_history":true}` for normalized daily series.

For scripts, use **GET <https://agiscorecard.com/api/portfolio>** (`?history=1` for series).
The result includes `status`, `entry_session`, `as_of`, `valuation_id`, all twelve
stocks and three separate benchmarks. Read the dates and status before quoting
returns. A fetch timestamp change does not change `valuation_id`; incomplete data
is not a 0% return. The initial October 2 close is the baseline, not an observed gain.

The basket is initially equal-weight, buy-and-hold, using adjusted daily closes.
SPY is an S&P 500 ETF proxy. TQQQ targets 3x **daily** Nasdaq-100 performance, not
3x long-term returns. This public tool is read-only and cannot trade or message anyone.
The existing MCP Registry remote URL is unchanged; reconnect/refresh your client
if its tool list was cached before this addition.

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
| 2026-09-06 | 62.5 |
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

## Related local review tools

The same team maintains [Web3 Workbench](https://web3.agiscorecard.com/), a free
collection of local worksheets for AI and Web3 operational review:

- [Agent Evidence: worked scenarios](https://evidence.agiscorecard.com/examples.html)
  — inspect deduplicated task evidence, version boundaries and conflicting reviews.
- [Route Lab: worked scenarios](https://route.agiscorecard.com/examples.html)
  — compare a fallback's expected cost with its worst-case budget and latency.
- [Protocol Ledger: methods and API](https://protocol.agiscorecard.com/guide.html)
  — read dated protocol profiles with official sources and explicit scope limits.

These tools use a separate service from the dataset MCP above. Browser worksheet
inputs are processed locally; example results are fictional. No wallet connection,
model call, production routing or security certification is provided. See each
tool's method, limits and separate software license.

### Web3 Workbench MCP

Connect to `https://web3.agiscorecard.com/mcp` using Streamable HTTP, without an
API key. [Setup and available tools](https://web3.agiscorecard.com/for-agents.html).

The endpoint exposes ten deterministic calculators plus `search` and `fetch` for
public methods. Results include a canonical method citation, release version,
sources and limitations. Each tool subdomain also provides a scoped `/mcp` endpoint.
These are independent of the eight dataset tools and registry identity above.

Remote MCP calls send the selected arguments to the server; application code does
not persist inputs or results. Client and hosting-provider policies are separate.
Public citations describe the method, not an independently verified private result.
Connecting a client does not imply automatic inclusion in AI search or a registry.

### Market context and task guides

[Market context](https://web3.agiscorecard.com/market.html?via=publisher) provides
BTC/ETH/USDC/USDT reference prices with provider timestamps and explicit stale states.
[Official-source watch](https://web3.agiscorecard.com/briefs.html?via=publisher) links
Ethereum announcements, x402 Foundation commits and EZKL releases to review tasks.

Use the [stablecoin payment checklist](https://web3.agiscorecard.com/stablecoin-payment-check.html?via=publisher),
[gas and proof budget guide](https://web3.agiscorecard.com/gas-budget-check.html?via=publisher),
and [protocol-change review](https://web3.agiscorecard.com/protocol-change-check.html?via=publisher)
to choose a worksheet and preserve its assumptions. Source snapshots are also
available as [JSON](https://web3.agiscorecard.com/api/market) and an
[RSS feed](https://web3.agiscorecard.com/updates.xml); these HTTP feeds are separate
from the deterministic MCP calculators. A price is not proof that an invoice settled.

## Licence

Dataset: **CC BY 4.0** — free to use with attribution to
[agiscorecard.com](https://agiscorecard.com). See [LICENSE](LICENSE).

Not investment advice; research and education only.
