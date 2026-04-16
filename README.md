# Paperwork Copilot

Universal AI paperwork copilot for small service businesses.

The product starts with an HVAC-first wedge for the US and Canada:

- turn messy job requests into structured estimate drafts
- flag missing info before a bad quote goes out
- generate invoice drafts from completed job notes
- draft clean customer-facing follow-ups without rebuilding the same paperwork every time

This is intentionally not a full field-service management suite.

The first release is a narrow, low-risk admin accelerator:

- no autonomous pricing without human review
- no dispatching or route optimization
- no direct accounting ledger mutations
- no inventory or procurement automation in v1

Working promise:

`From messy intake to estimate, invoice, and follow-up in one pass.`

## Why this wedge

HVAC shops in the US and Canada often already have some combination of:

- phone calls
- SMS
- email
- handwritten or technician notes
- basic FSM software

The pain is not only "we need software".

The pain is:

- intake is incomplete
- estimators rebuild the same document structure manually
- invoices are delayed because notes are messy
- office staff has to rewrite the same follow-up messages over and over

Paperwork Copilot sits on that pain layer directly.

## Current repo contents

- [docs/market-analysis.md](docs/market-analysis.md) — market and GitHub reference scan
- [docs/prd.md](docs/prd.md) — product requirements document
- [docs/detailed-spec.md](docs/detailed-spec.md) — detailed product specification with mobile and bot operating model
- [docs/stitch-brief.md](docs/stitch-brief.md) — screen brief for Stitch
- [docs/stitch-project-map.md](docs/stitch-project-map.md) — canonical Stitch project and screen inventory
- [docs/grant-positioning.md](docs/grant-positioning.md) — credits/grants narrative
- [docs/mvp-plan.md](docs/mvp-plan.md) — implementation order for the first MVP

## Current state

The repo now includes a runnable frontend demo shell based on the approved Stitch direction.

Current implementation:

- React + Vite frontend
- mobile-first screens adapted from the canonical Stitch project
- HVAC-first seeded content for:
  - inbox / dashboard
  - jobs list
  - new intake
  - intake analysis
  - estimate draft
  - invoice draft
  - message draft
  - technician quick note
  - bot conversation mock
  - export preview

What is still demo-level:

- no backend yet
- no persistence yet
- no real bot integration yet
- no real AI provider wiring yet
- no real export engine yet

## Positioning

Paperwork Copilot is not "AI for everything in field service".

It is the paperwork and communication layer for service businesses:

1. normalize inbound job requests
2. ask for missing facts
3. draft estimate packets
4. draft invoice packets
5. draft customer follow-ups

HVAC is the first wedge because the pain is clear, repetitive, and easy to demo.

## Local run

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```
