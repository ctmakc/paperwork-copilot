# Product Requirements Document

Last updated: 2026-04-16

## Product name

Paperwork Copilot

## One-line pitch

AI paperwork copilot for service businesses that turns messy job intake into estimate drafts, invoice drafts, and customer follow-ups.

## Wedge

Universal product.

First vertical:

- HVAC contractors in the US and Canada

## Problem

Small and mid-sized service contractors lose time and revenue before and after the actual job because paperwork is rebuilt manually from incomplete inputs.

Typical failure points:

- calls, texts, and emails arrive in unstructured form
- key job details are missing
- estimates depend on one estimator or owner
- invoices are delayed because job notes are messy
- office staff rewrites the same email and SMS follow-ups repeatedly

## Product thesis

Do not replace the whole business system.

Instead:

- normalize intake
- catch missing information
- draft paperwork fast
- keep the operator in control

## Target users

Primary users:

- HVAC owner-operators
- office managers
- estimators
- dispatch/admin staff

Secondary future users:

- plumbers
- electricians
- general service contractors
- restoration and maintenance teams

## Jobs to be done

### Job 1

When a messy request comes in, I want it converted into a structured job record so I can prepare a quote without rereading multiple messages.

### Job 2

Before sending an estimate, I want the system to tell me what facts are missing so I do not send a weak or risky quote.

### Job 3

When I have enough information, I want a clean estimate draft that I can review and send quickly.

### Job 4

After the work is done, I want the technician notes turned into a usable invoice draft instead of manually rewriting the work summary.

### Job 5

After sending paperwork, I want follow-up messages drafted quickly so jobs do not stall in admin limbo.

## MVP features

### 1. Intake workspace

Manual paste/import for:

- email text
- SMS text
- call transcript
- dispatcher notes
- technician notes

Outputs:

- structured job summary
- extracted key fields
- confidence score

### 2. Missing info checker

Flags likely missing data and drafts clarifying questions.

Examples for HVAC:

- equipment make/model
- unit count
- residential/commercial
- system age
- access constraints
- urgency window
- photos requested or missing

### 3. Estimate draft generator

Creates:

- client-facing summary
- scope section
- editable line items
- assumptions
- exclusions
- optional recommended items

### 4. Invoice draft generator

Creates:

- work summary
- line items
- invoice notes
- due-date language
- optional deposit/final split

### 5. Follow-up generator

Templates plus AI draft for:

- estimate sent
- missing info request
- reminder follow-up
- invoice sent
- maintenance follow-up

## Explicit non-goals for MVP

- autonomous final pricing
- technician scheduling
- dispatch board
- route optimization
- inventory management
- vendor purchasing
- payroll
- accounting ledger sync with write-back
- insurance claim workflows

## UX principles

- human review before send
- one-screen clarity over complex FSM structure
- easy copy/export even without integrations
- explain assumptions instead of hiding them
- show missing info before pretending certainty

## Data model v1

### Intake record

- source type
- raw text
- normalized summary
- extracted fields
- missing fields
- clarifying questions

### Estimate draft

- customer
- job summary
- scope
- line items
- assumptions
- exclusions
- optional items
- status

### Invoice draft

- linked estimate or intake
- job completion summary
- line items
- payment notes
- status

### Message draft

- type
- subject
- body
- linked estimate or invoice
- send status

## Success metrics

Product metrics:

- time from intake to first estimate draft
- time from completion note to invoice draft
- percentage of drafts edited before send
- percentage of estimates blocked by missing-info checker

Business metrics:

- faster quote turnaround
- faster invoice turnaround
- more consistent client communication
- lower admin time per job

## Technical direction

Preferred starting pattern:

- lightweight web app
- local-first or simple hosted deployment
- provider-agnostic AI interface
- strong export capability

Recommended starter architecture:

- React frontend
- Express or Next backend
- SQLite for initial persistence
- HTML export first, PDF second

## Product promise

`From messy intake to estimate, invoice, and follow-up in one pass.`

## Anti-promise

- not a full ServiceTitan competitor
- not autonomous quoting
- not a black-box pricing engine
- not an ERP replacement
