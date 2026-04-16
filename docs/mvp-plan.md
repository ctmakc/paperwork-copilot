# MVP Plan

Last updated: 2026-04-16

## MVP goal

Ship a credible demo that proves one complete paperwork loop:

1. messy intake comes in
2. missing info is surfaced
3. estimate draft is created
4. invoice draft can be created from completion notes
5. follow-up messages can be drafted

## Recommended implementation order

### Phase 1: core model and demo data

- define intake, estimate, invoice, and message draft types
- create seeded HVAC demo records
- create one clean end-to-end happy path

### Phase 2: intake normalizer

- manual paste input
- extraction panel
- structured summary
- missing-info checker

### Phase 3: estimate drafting

- estimate builder
- assumptions and exclusions
- editable line items
- export preview

### Phase 4: invoice drafting

- technician notes input
- invoice summary generation
- editable invoice lines
- export preview

### Phase 5: follow-up drafting

- missing-info message
- estimate-sent email
- invoice-sent email
- reminder message

## Suggested technical base

The strongest local reference is [NorthForge AI](/data/projects/northforge-ai/README.md), because it already proves:

- narrow commercial wedge
- estimate packet generation
- invoice split logic
- outbound follow-up drafting

That means the fastest path is probably:

- reuse the product structure pattern
- adapt the domain language from furniture/manufacturing to HVAC/service
- simplify where needed instead of designing from zero

## First demo scenario

Scenario:

- homeowner calls about AC not cooling
- dispatcher notes are incomplete
- system flags missing model/age details
- operator sends clarifying questions
- estimate draft is created with assumptions
- after service, technician notes are pasted in
- invoice draft is generated

## MVP success criteria

- a reviewer understands the product in under 3 minutes
- the product shows real paperwork acceleration, not vague AI magic
- the workflow remains human-approved
- the same architecture can later support plumbing and electrical with small domain packs

## Immediate next build choice

Best next implementation move:

Build a local demo app around:

- manual intake paste
- extraction result panel
- estimate draft screen
- invoice draft screen
- message draft drawer

This is enough to validate:

- market story
- grant story
- demo quality
- product surface
