# Stitch Screen Brief

Last updated: 2026-04-16

## Purpose

Generate a mobile-first product demo for Paperwork Copilot.

This is not a big FSM dashboard.

It is a narrow, field-friendly paperwork assistant for service contractors.

## Product summary

Paperwork Copilot helps service contractors turn messy job requests into:

- structured intake
- missing-info follow-up
- estimate drafts
- invoice drafts
- customer follow-up drafts

First vertical:

- HVAC contractors in the US and Canada

## Design direction

### Overall feel

- practical
- operator-first
- trustworthy
- fast
- not flashy startup theater

### Avoid

- fake enterprise dashboards
- finance-trading visuals
- generic purple AI gradients
- too many small cards
- desktop-first data-table feeling

### Preferred visual language

- mobile operations app
- clean field-tool feel
- muted neutrals with one strong action color
- simple status colors
- compact but readable

### Suggested style

- sturdy, service-business UI
- subtle industrial cues
- clear hierarchy
- strong contrast

## Device target

Primary:

- mobile

Secondary:

- desktop responsive adaptation

## Core UI principle

Each screen should support one clear action.

The user is often:

- on a phone
- in a van
- between jobs
- on a call
- typing with one hand

## Navigation model

Bottom-tab or compact mobile nav preferred.

Suggested core areas:

- Inbox
- Jobs
- Drafts
- Messages
- More

Do not create a complex left-nav enterprise shell as the main design.

## Screen list

Generate these screens.

### 1. Mobile dashboard / inbox

Goal:

- show the day's active paperwork tasks

Must include:

- high-priority jobs needing action
- pending missing-info requests
- estimate drafts ready to review
- invoice drafts ready to review
- quick add intake action

Tone:

- operational
- calm
- clear urgency markers

### 2. New intake screen

Goal:

- let the user paste or forward messy job text

Must include:

- large text input area
- source selector:
  - call transcript
  - SMS
  - email
  - dispatcher note
  - technician note
- analyze button
- recent example snippet chips

### 3. Intake analysis result

Goal:

- show normalized job details and missing info

Must include:

- customer summary card
- extracted fields
- confidence labels
- missing info section
- suggested clarifying questions
- actions:
  - draft missing-info message
  - continue to estimate

This screen is one of the most important.

### 4. Estimate draft screen

Goal:

- review and edit the estimate

Must include:

- client-facing summary
- editable scope section
- line items list
- assumptions
- exclusions
- optional recommended items
- quick actions:
  - copy text
  - preview packet
  - draft send message

Layout should feel like a mobile document editor, not an accounting spreadsheet.

### 5. Invoice draft screen

Goal:

- review and edit invoice draft from completed work notes

Must include:

- job completion summary
- line items
- payment notes
- invoice message draft CTA
- export/copy actions

### 6. Message draft drawer or screen

Goal:

- show a ready-to-send message with minimal friction

Message types:

- missing info request
- estimate sent
- reminder follow-up
- invoice sent

Must include:

- channel selector:
  - SMS
  - email
- editable subject when email
- editable body
- copy/send externally CTA

### 7. Technician quick note screen

Goal:

- fast field input after job completion

Must include:

- short note input
- quick chips:
  - completed
  - follow-up needed
  - parts used
  - customer approved
  - return visit needed
- generate invoice draft CTA

This screen should feel extremely lightweight.

### 8. Jobs list screen

Goal:

- simple mobile list of active records

Must include:

- stage badges
- job title
- customer
- next action
- filter chips

Do not make this a dense CRM board.

### 9. Bot conversation mock screen

Goal:

- show how the product works in a bot-friendly mode

Must include:

- simple chat layout
- example user sends messy text
- bot returns:
  - short summary
  - missing info
  - quick actions

This is important because the product should plausibly extend into Telegram/bot usage.

### 10. Export preview screen

Goal:

- show client-ready estimate/invoice packet preview

Must include:

- clean document preview
- summary header
- line items
- assumptions or payment notes
- message snippet

## Content guidance

Use realistic HVAC demo content:

- AC not cooling
- furnace maintenance
- rooftop unit diagnostic
- mini split install follow-up

Keep copy grounded and concrete.

Avoid fake metrics like:

- 800% efficiency
- AI confidence nonsense
- abstract transformation slogans

## Interaction guidance

The product should feel like:

- paste
- review
- send

not:

- configure 20 objects
- manage a giant operations suite

## Component guidance

Prefer:

- stacked cards
- section headers
- action bars
- large status chips
- sticky bottom actions on mobile

Avoid:

- tiny side panels
- overdesigned charts
- heavy kanban boards
- fake analytics widgets

## Demo emphasis

The strongest demo path should be:

1. paste messy intake
2. see normalized job
3. see missing info
4. open estimate draft
5. open invoice draft
6. open message draft

If a reviewer understands that path in under 60 seconds, the screens are correct.

## Output expectation

Generate the screens as a coherent mobile-first app with shared design language.

The main priority is believable field usability, not visual novelty.
