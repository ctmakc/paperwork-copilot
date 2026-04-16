# Detailed Specification

Last updated: 2026-04-16

## Product working name

Paperwork Copilot

## Product class

Mobile-first AI paperwork assistant for service contractors.

## Strategic frame

Long term, the larger opportunity is full service-business workflow control:

- offer packaging
- ad-driven lead generation
- lead qualification
- deal handling
- estimates
- invoices
- reminders and upsells

That is not this MVP.

This MVP is intentionally narrower:

- simple
- low-risk
- field-friendly
- immediately useful

## MVP thesis

The product should remove the most repetitive admin pain that happens between:

- incoming job request
- first estimate
- completed work
- invoice send
- basic follow-up

It must work in a "field mode", not only in a desktop office mode.

That means the product must feel natural from:

- phone browser
- Telegram bot or similar bot surface
- mobile web app
- quick operator flows with minimal typing

## Core user promise

`Paste the messy job details. Get the paperwork draft back fast.`

## Primary vertical

HVAC contractors in the US and Canada.

Why this wedge:

- repetitive quoting and invoicing
- high use of phone/SMS/manual notes
- strong need for fast response
- easy to demonstrate value

## Product boundaries

The system helps draft paperwork.

The system does not own final business decisions.

### Allowed in MVP

- normalize raw intake
- detect missing information
- draft estimate text
- draft invoice text
- draft follow-up messages
- provide templates
- provide exportable packets

### Not allowed in MVP

- send final estimates automatically without review
- set prices automatically as truth
- create accounting ledger entries in QuickBooks/Xero
- dispatch technicians
- schedule crews
- control inventory
- purchase parts

## User roles

### 1. Owner-operator

Needs:

- speed
- confidence
- low setup burden

Main use:

- paste raw request
- review estimate
- send a cleaned-up message

### 2. Office admin / dispatcher

Needs:

- clarity
- repeatable wording
- less context switching

Main use:

- intake cleanup
- missing-info follow-up
- estimate/invoice prep

### 3. Technician in the field

Needs:

- minimal typing
- quick job-note capture
- mobile-first interactions

Main use:

- submit short completion notes
- trigger invoice draft prep

## Primary jobs to be done

### JTBD 1: Intake to estimate draft

When a messy request arrives from a call, text, or email, I want a structured job summary and a draft estimate so I can respond quickly without manually rebuilding the paperwork.

### JTBD 2: Missing-info follow-up

When the request is incomplete, I want the system to show what is missing and draft the follow-up questions so I do not forget critical assumptions.

### JTBD 3: Job notes to invoice draft

When the technician finishes the job, I want their rough notes turned into a clean invoice draft instead of manually rewriting the work summary.

### JTBD 4: Light follow-up automation

When paperwork is sent, I want ready-to-send follow-up drafts so deals and payments do not stall.

## Core flows

### Flow A: New intake

1. User pastes or forwards messy intake text.
2. System extracts:
   - customer
   - location
   - issue
   - equipment context
   - urgency
   - probable work type
3. System marks missing details.
4. System drafts clarifying questions.
5. User either:
   - sends missing-info message
   - or proceeds to estimate draft

### Flow B: Estimate drafting

1. User opens estimate draft.
2. System shows:
   - short client-facing summary
   - scope draft
   - line items
   - assumptions
   - exclusions
   - optional recommended items
3. User edits wording and pricing.
4. User exports or copies estimate text.

### Flow C: Completion to invoice

1. Technician submits rough completion notes.
2. System normalizes notes into:
   - completed work summary
   - parts/labor breakdown draft
   - invoice notes
3. User edits.
4. User exports or sends invoice draft externally.

### Flow D: Follow-up

1. Estimate or invoice exists.
2. User taps a preset action:
   - request missing info
   - send estimate
   - follow up on estimate
   - send invoice
   - maintenance follow-up
3. System drafts message.
4. User reviews and copies/sends.

## Mobile-first operating model

The product must assume many users will touch it from a phone first.

### Field-mode principles

- one primary action per screen
- no dense desktop tables as the main interaction
- large tap targets
- short summaries before long forms
- copy/send actions within thumb reach
- operator can work in under 30 seconds for simple actions

### Bot-mode principles

The bot should not attempt to reproduce the full app.

The bot should handle only short, high-frequency commands:

- new intake
- summarize this request
- what info is missing
- draft estimate message
- draft invoice message
- save job note

## Input formats

### Intake input

- pasted text
- forwarded email text
- pasted SMS thread
- call transcript
- short form entry

### Completion input

- technician text note
- dispatcher summary
- short structured checklist

## Output artifacts

### Estimate packet

- estimate title
- customer/job summary
- scope of work
- line items
- assumptions
- exclusions
- optional items
- customer-facing message

### Invoice packet

- invoice title
- completed work summary
- line items
- payment notes
- invoice message

### Follow-up packet

- message subject if email
- body
- CTA

## Data model

### Customer

- id
- name
- phone
- email
- address

### Job record

- id
- source type
- raw input
- normalized summary
- extracted fields
- missing fields
- job stage
- linked customer

### Estimate draft

- id
- linked job
- status
- summary
- scope
- line items
- assumptions
- exclusions
- optional items
- message draft

### Invoice draft

- id
- linked job
- status
- completion summary
- line items
- payment notes
- message draft

### Message draft

- id
- type
- channel
- subject
- body
- linked record

## HVAC-specific structured fields for MVP

- customer name
- phone
- address
- residential or commercial
- service category:
  - no cooling
  - no heating
  - maintenance
  - installation
  - diagnostic
  - thermostat / controls
- unit type:
  - AC
  - furnace
  - heat pump
  - rooftop unit
  - mini split
- make/model if known
- system age if known
- urgency
- photos available yes/no

## Rules for AI output

### The model may

- rewrite messy text into cleaner operational language
- extract likely fields
- suggest missing details
- draft human-editable paperwork

### The model may not

- invent exact technical specs if absent
- invent final prices as authoritative
- claim permits, warranties, or code requirements as fact unless supplied
- send anything automatically in MVP

## Trust and safety rules

- every outbound document is review-first
- assumptions must be visible
- uncertain extracted data must be labeled as uncertain
- the user must see missing fields before finalizing

## MVP integrations

V1 should not depend on deep integrations.

### Required

- none

### Nice-to-have later

- Telegram bot
- Twilio/phone transcript intake
- email forwarding intake
- PDF export
- QuickBooks/Xero read-only prep flows

## Functional requirements

### FR1 Intake normalization

The system must accept raw intake text and produce a structured summary plus extracted fields.

### FR2 Missing-info detection

The system must identify likely missing fields before estimate drafting.

### FR3 Clarifying questions

The system must draft concise missing-info questions.

### FR4 Estimate generation

The system must create a human-editable estimate draft with scope, line items, assumptions, and exclusions.

### FR5 Invoice generation

The system must create a human-editable invoice draft from completion notes.

### FR6 Follow-up drafts

The system must generate short outbound message drafts tied to the current record.

### FR7 Mobile usability

The main workflows must be operable from a mobile viewport without requiring desktop-only layouts.

## Non-functional requirements

- fast interaction for seeded demo flows
- clean mobile layout
- no AI black-box feeling
- visible state and stage labels
- export/copy actions are easy to find

## Success criteria for MVP

The MVP is successful if a reviewer can:

1. paste a messy HVAC request
2. see structured intake
3. see missing info
4. generate an estimate draft
5. paste job notes
6. generate an invoice draft
7. draft a follow-up message

all in under 3 minutes.

## Future expansion path

After HVAC-first validation, the same shell can expand into:

- plumbing
- electrical
- handyman
- appliance repair

Later, a larger operations layer can grow around it, but only after this wedge proves demand.
