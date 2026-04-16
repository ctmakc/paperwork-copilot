# Market Analysis

Last updated: 2026-04-16

## Goal

Define a product wedge that is:

- small enough to ship quickly
- clearly useful for HVAC contractors in the US and Canada
- credible for AI credits / startup support applications
- differentiated from large field-service suites

## Core observation

The market already has many full-stack field-service products.

Most of them bundle:

- CRM
- dispatch
- scheduling
- technician tracking
- payments
- estimates
- invoicing
- reporting

That means we should not build "another ServiceTitan".

The better wedge is the paperwork layer that sits between messy intake and clean client-facing documents.

## What large competitors already cover

These products already cover broad FSM workflows, including estimates and invoices:

- ServiceTitan
- Housecall Pro
- Jobber
- FieldPulse
- Joist
- Workiz

Their product direction is broad operations software, not a narrow AI-first paperwork wedge.

Official references:

- Housecall Pro: https://www.housecallpro.com/
- Jobber: https://www.getjobber.com/
- Joist: https://www.joist.com/
- FieldPulse: https://www.fieldpulse.com/
- ServiceTitan: https://www.servicetitan.com/

Inference:

- trying to beat them on scheduling, dispatch, payments, or ERP breadth is a bad first move
- helping contractors prepare cleaner paperwork faster is a much better opening

Specific market signals from current public product surfaces:

- Housecall Pro publicly emphasizes quotes, proposals, invoices, HVAC templates, and an internal "AI Team"
- Jobber publicly emphasizes beautiful quotes, converting quotes to booked jobs, sending invoices faster, and AI features
- Joist stays especially close to the paperwork wedge itself: estimates, invoices, payments, and contractor speed on mobile

Takeaway:

- paperwork is a real buying category
- AI is already entering the category
- the differentiation must be narrow, faster, and easier than a full FSM rollout

## Strong market gap

The gap is not "can software create an estimate".

The gap is:

- intake arrives as messy email, SMS, phone transcript, or dispatcher notes
- key facts are missing
- office staff rebuilds quote language manually
- invoice wording is delayed until the technician notes are cleaned up
- follow-up communication is repetitive but still customer-sensitive

This is where AI has a clear job:

1. normalize messy inputs
2. surface missing facts
3. draft structured paperwork
4. keep the human in control

## Recommended wedge

Paperwork Copilot for service businesses.

HVAC-first MVP.

Why HVAC first:

- high frequency of repetitive estimate and invoice work
- many small operators still run on mixed manual workflows
- strong North American market
- easy to explain in one sentence
- easy to show ROI in a demo

## Product shape to avoid

Do not start with:

- autonomous price calculation without operator approval
- route optimization
- dispatch board
- inventory management
- payroll
- accounting sync with write access
- full CRM replacement

Those features increase implementation scope and business risk without improving the wedge story.

## Low-risk, high-value MVP jobs

### 1. Intake normalizer

Input:

- phone transcript
- email
- SMS
- dispatcher notes
- technician notes

Output:

- customer
- service address
- equipment type
- issue summary
- urgency
- probable job type
- confidence

### 2. Missing info checker

Before estimate generation, flag missing fields such as:

- make/model
- system age
- residential vs commercial
- tonnage
- access constraints
- urgency window
- permit or inspection assumptions

Then draft 3-5 clarifying questions.

### 3. Estimate draft generator

Generate a human-editable estimate draft with:

- scope summary
- line items
- labor / materials / travel split
- optional upsell items
- assumptions and exclusions

### 4. Invoice draft generator

Turn completed job notes into:

- clean invoice summary
- line items
- deposit/completion split when applicable
- due date text
- notes for the customer

### 5. Follow-up generator

Draft:

- estimate sent email
- reminder follow-up
- invoice sent message
- maintenance plan upsell

## Grant / credits fit

This wedge is stronger for AI credits than a generic "AI consulting platform" because:

- one clear job-to-be-done
- real and repeated document drafting workload
- easy provider benchmarking story
- obvious cost/quality metrics
- low compliance and autonomy risk in v1

## GitHub scan

The open-source ecosystem is much stronger on broad FSM/ERP than on narrow paperwork copilots.

### Relevant open-source references

- OCA Field Service for Odoo
  - Repo: https://github.com/OCA/field-service
  - Relevance: broad field-service modules, including sales and invoice links
  - Takeaway: open source exists for operations breadth, but not as a focused AI paperwork layer

- Beveren FSM for ERPNext
  - Repo: https://github.com/Beveren-Software-Inc/Field_Service_Management
  - Relevance: service request -> quotation -> order -> appointment -> invoice workflow
  - Takeaway: strong evidence that the existing open-source market thinks in end-to-end FSM, not AI-first paperwork acceleration

- ASAP HVAC web demo
  - Repo: https://github.com/cybervisionis/asap-hvac-web-demo
  - Relevance: lightweight HVAC quote/invoice/admin demo
  - Takeaway: useful UI reference, but not a production-grade product or AI wedge

### Local references in this workspace

- [NorthForge AI](/data/projects/northforge-ai/README.md)
  - Existing local wedge for furniture manufacturers:
  - lead intake
  - quote block builder
  - contract highlights
  - invoice split
  - follow-up drafting
  - Takeaway: the commercial admin wedge already works well in another vertical and can be adapted

- [Proposal Factory MVP](/data/projects/proposal-factory-mvp/README.md)
  - Existing local proposal assembly prototype
  - Takeaway: reusable pattern for scope blocks and human-edited pricing

## Competitive stance

Paperwork Copilot should position itself as:

- an AI admin layer
- not a field-service operating system
- not a bookkeeping system
- not a dispatch tool

Good positioning line:

`Use your existing phone, FSM, and bookkeeping stack. We handle the messy paperwork in between.`

## What is easiest to sell

The easiest first customer promise is not "save your whole business".

It is:

- faster estimate turnaround
- fewer missing details
- faster invoice issuance
- less rewriting of client communication

That is concrete, believable, and easy to measure.
