# Stitch Project Map

Last updated: 2026-04-16

## Canonical Stitch project

Title:

- `Paperwork Copilot Mobile Demo`

Project ID:

- `projects/15170395976270262062`

Use this as the canonical visual and structural basis for the Paperwork Copilot frontend.

Rule:

- keep Stitch layout, visual language, and structural rhythm as the base
- adjust content, labels, and blocks where they drift from the product docs
- prefer correcting the product copy and workflow semantics over redesigning the UI from scratch

## Why this project is the right base

The project matches the intended product direction well:

- mobile-first
- field-friendly
- operator-oriented
- rugged but clean visual language
- not generic SaaS card soup

The design system is aligned with the intended "field authority" direction:

- industrial orange action color
- slate structural tones
- heavy editorial hierarchy
- sticky command bar logic
- mobile-first substantial cards

## Screen inventory

### Mobile screens

1. Inbox / Dashboard
   - Screen ID: `c896d57d1ab6413fa727684dd33bc194`
   - Title: `Inbox / Dashboard`

2. New Intake
   - Screen ID: `9d31ed039ea942a7904ebf58cfc222cf`
   - Title: `New Intake`

3. Intake Analysis Result
   - Screen ID: `c7930e38d90745f397cf0e68009a0550`
   - Title: `Intake Analysis Result`

4. Estimate Draft
   - Screen ID: `b86516f88ace4b698dd19f341488cb90`
   - Title: `Estimate Draft`

5. Invoice Draft
   - Screen ID: `c56b6add44604641aae20ad5c973fd0e`
   - Title: `Invoice Draft`

6. Message Draft
   - Screen ID: `85287759478f4a78803d1bc77e7a8df5`
   - Title: `Message Draft`

7. Technician Quick Note
   - Screen ID: `dcb3dee3bfbd4817a26fa34070f9d929`
   - Title: `Technician Quick Note`

8. Jobs List
   - Screen ID: `2bd9a89b4858434d872477d9709e10f4`
   - Title: `Jobs List`

9. Bot Conversation Mock
   - Screen ID: `a5d5c353ec604e968d0354b211a6a79b`
   - Title: `Bot Conversation Mock`

10. Export Preview
   - Screen ID: `00765c291a9e45f7adf965d76bb1d397`
   - Title: `Export Preview`

### Desktop companion screens

1. Desktop Dashboard
   - Screen ID: `ffb13d5f10a74c7583c8f7022edfee28`
   - Title: `Desktop Dashboard`

2. Intake Analysis (Desktop)
   - Screen ID: `583e5db9d7664d96a6cd54874fa653b6`
   - Title: `Intake Analysis (Desktop)`

3. Estimate Draft (Desktop)
   - Screen ID: `eb6c97593d9549448a86ccd34f9b22c1`
   - Title: `Estimate Draft (Desktop)`

## Implementation guidance

### Keep as-is

- overall art direction
- spacing rhythm
- card density
- sticky bottom action pattern
- field-tool personality

### Review and correct during implementation

- product copy that becomes too generic
- labels that imply a broader FSM system than intended
- any line items or blocks that pretend autonomous pricing
- any content that drifts away from HVAC-first paperwork workflows

### Main semantic anchor

The frontend must stay aligned with:

- [detailed-spec.md](/data/projects/paperwork-copilot/docs/detailed-spec.md:1)
- [prd.md](/data/projects/paperwork-copilot/docs/prd.md:1)
- [stitch-brief.md](/data/projects/paperwork-copilot/docs/stitch-brief.md:1)

## Recommended implementation order from Stitch base

1. Inbox / Dashboard
2. New Intake
3. Intake Analysis Result
4. Estimate Draft
5. Message Draft
6. Technician Quick Note
7. Invoice Draft
8. Jobs List
9. Export Preview
10. Bot Conversation Mock

This order follows the strongest demo path and keeps the core paperwork loop intact.
