import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const STORAGE_KEY = "paperwork-copilot-state-v1";

const NAV_ITEMS = [
  { id: "dashboard", label: "Inbox", icon: "inbox" },
  { id: "jobs", label: "Jobs", icon: "construction" },
  { id: "estimate", label: "Drafts", icon: "description" },
  { id: "messages", label: "Messages", icon: "chat_bubble" },
  { id: "more", label: "More", icon: "more_horiz" }
];

const INITIAL_INTAKE_TEXT =
  "Customer says the AC is not cooling. Outdoor unit starts with a grinding sound. House is at 452 Oak St. Wants same-day visit if possible. Says system is around 5 years old but does not know model.";

const INITIAL_STATE = {
  jobs: [
    {
      id: "oak",
      title: "AC Not Cooling",
      customer: "John Smith",
      location: "452 Oak St, Ottawa",
      status: "urgent",
      nextAction: "Start intake",
      issue: "Outdoor unit starts with a grinding noise and loses cooling after 10 minutes.",
      serviceType: "Repair",
      equipment: "Central AC",
      urgency: "Same day",
      confidence: "High confidence",
      missingInfo: ["Outdoor unit model", "Last service date", "Photos of condenser"],
      questions: [
        "Can you send a photo of the outdoor unit label?",
        "Has the breaker tripped or the unit shut off completely?",
        "When did the grinding noise start?"
      ],
      estimateSummary:
        "Draft a same-day diagnostic and compressor-startup repair estimate with clear assumptions until model details are confirmed.",
      lineItems: [
        { label: "Diagnostic visit", amount: "$149" },
        { label: "Compressor startup troubleshooting", amount: "$220" },
        { label: "Capacitor/contactors allowance", amount: "$165" }
      ],
      approvedScope: [
        "Same-day diagnostic visit to confirm root cause and safe startup path.",
        "Electrical troubleshooting for capacitor, contactor, and compressor-start components.",
        "Customer-facing summary after diagnosis before any major replacement recommendation."
      ],
      optionalItems: [
        { label: "Condenser coil rinse after repair", amount: "$85" },
        { label: "Seasonal maintenance plan enrollment", amount: "$24/mo" }
      ],
      assumptions: [
        "Pricing assumes standard residential access.",
        "Replacement parts beyond common electrical components are excluded until model is confirmed."
      ],
      exclusions: [
        "Full compressor replacement",
        "Refrigerant leak repair beyond initial diagnosis"
      ],
      serviceWindow: "Today, 2:00 PM to 5:00 PM",
      siteContact: "John Smith · 613-555-0149",
      accessNotes: "Customer can meet on site. Backyard gate on left side.",
      estimateStatus: "draft",
      estimateVersion: "v0.3",
      customerDecision: "Awaiting missing details",
      recommendedOption: "Proceed with same-day diagnostic and hold parts allowance until model is confirmed.",
      sourceType: "Call transcript",
      rawIntake: INITIAL_INTAKE_TEXT
    },
    {
      id: "miller",
      title: "Furnace Maintenance",
      customer: "Miller Residence",
      location: "18 Birch Crescent, Kanata",
      status: "missing",
      nextAction: "Request missing info",
      issue: "Annual heating maintenance requested before seasonal startup.",
      serviceType: "Maintenance",
      equipment: "Gas furnace",
      urgency: "This week",
      confidence: "Medium confidence",
      missingInfo: ["Furnace model", "Last filter change", "Basement access instructions"],
      questions: [
        "Do you know the furnace make or model?",
        "Has the filter been changed recently?",
        "Anything special we should know before arrival?"
      ],
      estimateSummary:
        "Draft a maintenance visit estimate with optional blower cleaning and filter replacement upsell.",
      lineItems: [
        { label: "Heating maintenance visit", amount: "$189" },
        { label: "Combustion safety check", amount: "$85" }
      ],
      approvedScope: [
        "Annual maintenance on one gas furnace.",
        "Combustion safety, temperature rise, and visible venting check.",
        "Basic filter and blower condition review with customer summary before departure."
      ],
      optionalItems: [
        { label: "Blower wheel cleaning", amount: "$145" },
        { label: "1-inch pleated filter replacement", amount: "$28" }
      ],
      assumptions: [
        "Single residential furnace.",
        "No major repair work included in this maintenance estimate."
      ],
      exclusions: ["Heat exchanger replacement", "After-hours emergency work"],
      serviceWindow: "Thursday, 9:00 AM to 12:00 PM",
      siteContact: "Miller Residence · 613-555-0162",
      accessNotes: "Basement entry through side door. Dog in home.",
      estimateStatus: "approved",
      estimateVersion: "v1.1",
      customerDecision: "Waiting for appointment confirmation",
      recommendedOption: "Send maintenance estimate with optional filter replacement as a separate add-on.",
      sourceType: "Email",
      rawIntake:
        "Need annual maintenance on a gas furnace before cold weather. Flexible timing this week. Basement access available during business hours."
    },
    {
      id: "mall",
      title: "Rooftop Unit Diagnostic",
      customer: "City Center Mall",
      location: "Downtown Ottawa",
      status: "ready",
      nextAction: "Review estimate",
      issue: "RTU serving west corridor has intermittent cooling failure.",
      serviceType: "Diagnostic",
      equipment: "Rooftop unit",
      urgency: "Next business day",
      confidence: "High confidence",
      missingInfo: ["Unit serial number", "Roof access contact"],
      questions: [
        "Who should we coordinate roof access with?",
        "Can you share the RTU serial number if available?"
      ],
      estimateSummary:
        "Prepare a commercial diagnostic estimate with roof access assumptions and after-visit repair quotation path.",
      lineItems: [
        { label: "Commercial RTU diagnostic", amount: "$320" },
        { label: "Roof access and safety setup", amount: "$95" }
      ],
      approvedScope: [
        "One rooftop unit diagnostic during standard business hours.",
        "Operational testing, electrical checks, and rooftop safety setup.",
        "Post-visit repair quote path once failure point is isolated."
      ],
      optionalItems: [
        { label: "Second RTU same-trip inspection", amount: "$180" },
        { label: "Controls follow-up report", amount: "$120" }
      ],
      assumptions: ["Standard weekday roof access.", "One RTU included in base visit."],
      exclusions: ["Crane coordination", "Controls retrofit scope"],
      serviceWindow: "Tomorrow, 8:00 AM to 10:00 AM",
      siteContact: "Facilities desk · 613-555-0118",
      accessNotes: "Roof sign-in required. Mall escort needed for west corridor access.",
      estimateStatus: "sent",
      estimateVersion: "v1.0",
      customerDecision: "Waiting on facilities approval",
      recommendedOption: "Keep roof access, escort, and after-visit repair quote path explicit in the packet.",
      sourceType: "Dispatcher note",
      rawIntake:
        "Shopping mall west corridor RTU cooling is intermittent. Need commercial diagnostic and roof access coordination."
    }
  ],
  intakeForm: {
    sourceType: "Call transcript",
    rawText: INITIAL_INTAKE_TEXT
  }
};

const TECH_QUICK_CHIPS = [
  "Completed",
  "Follow-up needed",
  "Parts used",
  "Customer approved",
  "Return visit needed"
];
const TECH_MOBILE_BREAKPOINT = "(max-width: 899px)";

const ESTIMATE_STATUS_ORDER = ["draft", "approved", "sent", "exported"];
const DOCUMENT_STATUS_ORDER = ["draft", "approved", "sent", "exported"];
const MESSAGE_STATUS_ORDER = ["draft", "queued", "sent"];
const INITIAL_MESSAGE_STATUSES = {
  missing: "draft",
  estimate: "draft",
  invoice: "draft"
};
const WORKFLOW_STAGES = [
  { id: "intake", label: "Intake", tone: "urgent" },
  { id: "approval", label: "Approval", tone: "soft" },
  { id: "fieldwork", label: "Field work", tone: "ready" },
  { id: "invoicing", label: "Invoicing", tone: "soft" },
  { id: "sent", label: "Sent", tone: "ready" }
];

function App() {
  const [screen, setScreen] = React.useState("dashboard");
  const [activeJobId, setActiveJobId] = React.useState("oak");
  const [state, setState] = React.useState(() => loadState());
  const [toast, setToast] = React.useState("");
  const [jobFilter, setJobFilter] = React.useState("all");
  const [messageChannel, setMessageChannel] = React.useState("sms");
  const [messageFocus, setMessageFocus] = React.useState("missing");
  const [previewMode, setPreviewMode] = React.useState("estimate");
  const [mobileMode, setMobileMode] = React.useState("tech");
  const isMobileViewport = useMediaQuery(TECH_MOBILE_BREAKPOINT);

  const activeJob = state.jobs.find((job) => job.id === activeJobId) ?? state.jobs[0];
  const activeInvoiceDraft = activeJob?.invoiceDraft ?? buildDefaultInvoiceDraft(activeJob);
  const activeMessageDrafts = activeJob?.messageDrafts ?? buildDefaultMessageDrafts(activeJob, activeInvoiceDraft);
  const activeMessageStatuses = activeJob?.messageStatuses ?? INITIAL_MESSAGE_STATUSES;
  const activeTechnicianNote = activeJob?.technicianNote ?? "";
  const isTechnicianMobileMode = isMobileViewport && mobileMode === "tech";
  const workflowCounts = React.useMemo(() => ({
    total: state.jobs.length,
    urgent: state.jobs.filter((job) => job.status === "urgent").length,
    missing: state.jobs.filter((job) => job.status === "missing").length,
    ready: state.jobs.filter((job) => job.status === "ready").length,
    byStage: WORKFLOW_STAGES.map((stage) => ({
      ...stage,
      count: state.jobs.filter((job) => getWorkflowStage(job).id === stage.id).length
    }))
  }), [state.jobs]);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  React.useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  React.useEffect(() => {
    if (!isMobileViewport) {
      setMobileMode("office");
      return;
    }
    setActiveJobId((currentJobId) => {
      const currentJob = state.jobs.find((job) => job.id === currentJobId);
      if (mobileMode === "tech" && (!currentJob || getWorkflowStage(currentJob).id === "sent")) {
        return getTechnicianLeadJob(state.jobs)?.id ?? currentJobId;
      }
      return currentJobId;
    });
  }, [isMobileViewport, mobileMode, state.jobs]);

  const notify = React.useCallback((message) => setToast(message), []);

  const updateJob = React.useCallback((jobId, updater) => {
    setState((current) => ({
      ...current,
      jobs: current.jobs.map((job) => (job.id === jobId ? { ...job, ...updater(job) } : job))
    }));
  }, []);

  const updateEstimateField = React.useCallback((jobId, field, value) => {
    updateJob(jobId, () => ({ [field]: value }));
  }, [updateJob]);

  const updateTextList = React.useCallback((jobId, field, value) => {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    updateJob(jobId, () => ({ [field]: items }));
  }, [updateJob]);

  const updateLineItems = React.useCallback((jobId, value) => {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [label, amount] = item.split("|").map((part) => part.trim());
        return { label: label || "Line item", amount: amount || "$0" };
      });
    updateJob(jobId, () => ({ lineItems: items }));
  }, [updateJob]);

  const updateInvoiceField = React.useCallback((jobId, field, value) => {
    updateJob(jobId, (job) => ({
      invoiceDraft: {
        ...job.invoiceDraft,
        [field]: value
      }
    }));
  }, [updateJob]);

  const updateInvoiceLineItems = React.useCallback((jobId, value) => {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [label, amount] = item.split("|").map((part) => part.trim());
        return { label: label || "Line item", amount: amount || "$0" };
      });
    updateJob(jobId, (job) => ({
      invoiceDraft: {
        ...job.invoiceDraft,
        lineItems: items
      }
    }));
  }, [updateJob]);

  const updateMessageDraft = React.useCallback((jobId, type, value) => {
    updateJob(jobId, (job) => ({
      messageDrafts: {
        ...job.messageDrafts,
        [type]: value
      }
    }));
  }, [updateJob]);

  const advanceJobProcess = React.useCallback((jobId) => {
    let transitionLabel = "Job updated.";
    updateJob(jobId, (job) => {
      const transition = getNextJobTransition(job);
      transitionLabel = transition.label;
      return appendActivityEntry(transition.apply(job), transition.log);
    });
    notify(transitionLabel);
  }, [notify, updateJob]);

  const advanceEstimateStatus = React.useCallback((jobId) => {
    let nextStatus = "draft";
    updateJob(jobId, (job) => {
      nextStatus = advanceStatus(job.estimateStatus, ESTIMATE_STATUS_ORDER);
      return { estimateStatus: nextStatus };
    });
    notify(`Estimate moved to ${formatStatusLabel(nextStatus).toLowerCase()}.`);
  }, [notify, updateJob]);

  const advanceInvoiceStatus = React.useCallback(() => {
    let nextStatus = "draft";
    updateJob(activeJobId, (job) => {
      nextStatus = advanceStatus(job.invoiceDraft?.invoiceStatus, DOCUMENT_STATUS_ORDER);
      return {
        invoiceDraft: {
          ...job.invoiceDraft,
          invoiceStatus: nextStatus
        }
      };
    });
    notify(`Invoice moved to ${formatStatusLabel(nextStatus).toLowerCase()}.`);
  }, [activeJobId, notify, updateJob]);

  const advanceMessageStatus = React.useCallback((type) => {
    let nextStatus = "draft";
    updateJob(activeJobId, (job) => {
      nextStatus = advanceStatus(job.messageStatuses?.[type], MESSAGE_STATUS_ORDER);
      return {
        messageStatuses: {
          ...job.messageStatuses,
          [type]: nextStatus
        }
      };
    });
    notify(`Message moved to ${formatStatusLabel(nextStatus).toLowerCase()}.`);
  }, [activeJobId, notify, updateJob]);

  const updateIntakeForm = React.useCallback((field, value) => {
    setState((current) => ({
      ...current,
      intakeForm: {
        ...current.intakeForm,
        [field]: value
      }
    }));
  }, []);

  const updateTechnicianNote = React.useCallback((jobId, value) => {
    updateJob(jobId, () => ({
      technicianNote: value
    }));
  }, [updateJob]);

  const appendTechnicianNoteChip = React.useCallback((jobId, chip) => {
    updateJob(jobId, (job) => {
      const current = job.technicianNote?.trim();
      const nextValue = current ? `${current}\n${chip}` : chip;
      return { technicianNote: nextValue };
    });
  }, [updateJob]);

  const analyzeIntake = React.useCallback(() => {
    const parsed = parseRawIntake(state.intakeForm.rawText);
    const nextJob = buildJobFromIntake(parsed, state.intakeForm);
    setState((current) => ({
      ...current,
      jobs: [nextJob, ...current.jobs.filter((job) => job.id !== nextJob.id)]
    }));
    setActiveJobId(nextJob.id);
    setPreviewMode("estimate");
    setScreen("intake-analysis");
    notify("New intake converted into a draft job.");
  }, [notify, state.intakeForm]);

  const generateInvoiceFromTechnicianNote = React.useCallback(() => {
    const nextDraft = buildInvoiceFromTechnicianNote(activeTechnicianNote, activeJob);
    updateJob(activeJobId, (job) => ({
      activityLog: [
        makeActivityEntry("Invoice draft regenerated from technician note."),
        ...(job.activityLog ?? [])
      ].slice(0, 8),
      invoiceDraft: nextDraft,
      messageDrafts: {
        ...job.messageDrafts,
        invoice: buildInvoiceMessage(nextDraft)
      },
      messageStatuses: {
        ...job.messageStatuses,
        invoice: "draft"
      }
    }));
    setPreviewMode("invoice");
    setScreen("invoice");
    notify("Invoice draft regenerated from field notes.");
  }, [activeJob, activeJobId, activeTechnicianNote, notify, updateJob]);

  const sendFieldNoteToOffice = React.useCallback((jobId) => {
    updateJob(jobId, (job) => {
      const normalizedNote = job.technicianNote?.trim() || "Field closeout sent to office. Full note still pending.";
      const nextDraft = buildInvoiceFromTechnicianNote(normalizedNote, job);
      return appendActivityEntry({
        ...job,
        waitingOn: "office",
        nextAction: "Office reviewing field closeout",
        technicianNote: normalizedNote,
        invoiceDraft: {
          ...nextDraft,
          invoiceStatus: "draft"
        },
        messageDrafts: {
          ...job.messageDrafts,
          invoice: buildInvoiceMessage(nextDraft)
        },
        messageStatuses: {
          ...job.messageStatuses,
          invoice: "draft"
        }
      }, "Field note sent to office for invoice cleanup.");
    });
    notify("Field note sent to office.");
  }, [notify, updateJob]);

  const copyText = React.useCallback(async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      notify(`${label} copied.`);
    } catch {
      notify(`Could not copy ${label.toLowerCase()}.`);
    }
  }, [notify]);

  const openJob = React.useCallback((jobId, nextScreen) => {
    setActiveJobId(jobId);
    setScreen(nextScreen);
  }, []);

  const content = React.useMemo(() => {
    if (isTechnicianMobileMode) {
      return (
        <TechnicianMobileScreen
          jobs={state.jobs}
          job={activeJob}
          noteValue={activeTechnicianNote}
          onSelectJob={setActiveJobId}
          onOpenOffice={() => setMobileMode("office")}
          onNoteChange={(value) => updateTechnicianNote(activeJob.id, value)}
          onQuickChip={(chip) => appendTechnicianNoteChip(activeJob.id, chip)}
          onAdvanceJob={() => advanceJobProcess(activeJob.id)}
          onSendToOffice={() => sendFieldNoteToOffice(activeJob.id)}
        />
      );
    }
    switch (screen) {
      case "dashboard":
        return <DashboardScreen jobs={state.jobs} counts={workflowCounts} onAdvanceJob={advanceJobProcess} onOpenIntake={() => setScreen("new-intake")} onOpenJob={openJob} />;
      case "jobs":
        return (
          <JobsScreen
            jobs={state.jobs}
            activeJobId={activeJobId}
            filter={jobFilter}
            onFilterChange={setJobFilter}
            onSelectJob={(id) => setActiveJobId(id)}
            onOpen={(jobId, nextScreen) => openJob(jobId, nextScreen)}
          />
        );
      case "new-intake":
        return (
          <NewIntakeScreen
            form={state.intakeForm}
            onChange={updateIntakeForm}
            onAnalyze={analyzeIntake}
            onShortcut={(value) => updateIntakeForm("rawText", value)}
          />
        );
      case "intake-analysis":
        return <IntakeAnalysisScreen job={activeJob} onNext={() => setScreen("estimate")} onMessage={() => setScreen("messages")} />;
      case "estimate":
        return (
          <EstimateDraftScreen
            job={activeJob}
            onMessage={() => setScreen("messages")}
            onPreview={() => { setPreviewMode("estimate"); setScreen("export-preview"); }}
            onAdvanceStatus={() => advanceEstimateStatus(activeJob.id)}
            onFieldChange={updateEstimateField}
            onTextListChange={updateTextList}
            onLineItemsChange={updateLineItems}
            onCopy={(value, label) => copyText(value, label)}
          />
        );
      case "invoice":
        return (
          <InvoiceDraftScreen
            draft={activeInvoiceDraft}
            onMessage={() => setScreen("messages")}
            onPreview={() => { setPreviewMode("invoice"); setScreen("export-preview"); }}
            onAdvanceStatus={advanceInvoiceStatus}
            onFieldChange={(field, value) => updateInvoiceField(activeJob.id, field, value)}
            onLineItemsChange={(value) => updateInvoiceLineItems(activeJob.id, value)}
            onCopy={(value, label) => copyText(value, label)}
          />
        );
      case "messages":
        return (
          <MessageDraftScreen
            job={activeJob}
            channel={messageChannel}
            focus={messageFocus}
            drafts={activeMessageDrafts}
            statuses={activeMessageStatuses}
            invoiceDraft={activeInvoiceDraft}
            onChannelChange={setMessageChannel}
            onFocusChange={setMessageFocus}
            onChange={(type, value) => updateMessageDraft(activeJob.id, type, value)}
            onAdvanceStatus={advanceMessageStatus}
            onRegenerate={(type) => {
              const nextValue = type === "missing"
                ? buildMissingInfoMessage(activeJob)
                : type === "estimate"
                  ? buildEstimateMessage(activeJob)
                  : buildInvoiceMessage(activeInvoiceDraft);
              updateMessageDraft(activeJob.id, type, nextValue);
              notify("Message refreshed from current draft.");
            }}
            onCopy={(value, label) => copyText(value, label)}
          />
        );
      case "tech-note":
        return (
          <TechnicianNoteScreen
            value={activeTechnicianNote}
            onChange={(value) => updateTechnicianNote(activeJob.id, value)}
            onGenerate={generateInvoiceFromTechnicianNote}
          />
        );
      case "bot":
        return <BotMockScreen job={activeJob} onJumpToAnalysis={() => setScreen("intake-analysis")} />;
      case "export-preview":
        return <ExportPreviewScreen job={activeJob} draft={activeInvoiceDraft} mode={previewMode} onModeChange={setPreviewMode} />;
      default:
        return <MoreScreen onTechNote={() => setScreen("tech-note")} onBot={() => setScreen("bot")} onInvoice={() => setScreen("invoice")} />;
    }
  }, [
    activeInvoiceDraft,
    activeJob,
    activeJobId,
    activeMessageDrafts,
    activeMessageStatuses,
    activeTechnicianNote,
    analyzeIntake,
    copyText,
    generateInvoiceFromTechnicianNote,
    jobFilter,
    messageChannel,
    messageFocus,
    openJob,
    previewMode,
    screen,
    state,
    isTechnicianMobileMode,
    advanceEstimateStatus,
    advanceInvoiceStatus,
    advanceJobProcess,
    appendTechnicianNoteChip,
    advanceMessageStatus,
    sendFieldNoteToOffice,
    updateEstimateField,
    updateIntakeForm,
    updateInvoiceField,
    updateInvoiceLineItems,
    updateLineItems,
    updateMessageDraft,
    updateTechnicianNote,
    updateTextList
  ]);

  return (
    <div className="app-shell">
      <TopBar onReset={() => {
        setState(normalizeState(INITIAL_STATE));
        setScreen("dashboard");
        setActiveJobId(getTechnicianLeadJob(normalizeState(INITIAL_STATE).jobs)?.id ?? "oak");
        setJobFilter("all");
        setMessageChannel("sms");
        setMessageFocus("missing");
        setPreviewMode("estimate");
        setMobileMode(isMobileViewport ? "tech" : "office");
        notify("Demo reset.");
      }} isMobileViewport={isMobileViewport} mobileMode={mobileMode} onMobileModeChange={setMobileMode} />
      <div className="workspace-grid page-shell">
        <main>{content}</main>
        <aside className="desktop-sidebar">
          <DesktopSidebar
            jobs={state.jobs}
            job={activeJob}
            counts={workflowCounts}
            invoiceDraft={activeInvoiceDraft}
            onOpenJob={openJob}
            onAdvanceJob={() => advanceJobProcess(activeJob.id)}
            onOpenEstimate={() => setScreen("estimate")}
            onOpenInvoice={() => { setPreviewMode("invoice"); setScreen("invoice"); }}
            onOpenMessages={() => setScreen("messages")}
            onOpenTechNote={() => setScreen("tech-note")}
          />
        </aside>
      </div>
      {!isTechnicianMobileMode ? <BottomNav current={screen} onNavigate={(next) => setScreen(next)} /> : null}
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  );
}

function TopBar({ onReset, isMobileViewport, mobileMode, onMobileModeChange }) {
  return (
    <header className="topbar">
      <button className="icon-button">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className="brand">Paperwork Copilot</div>
      <div className="topbar-actions">
        {isMobileViewport ? (
          <button
            className={`mode-toggle ${mobileMode === "tech" ? "mode-toggle-active" : ""}`}
            onClick={() => onMobileModeChange(mobileMode === "tech" ? "office" : "tech")}
            title={mobileMode === "tech" ? "Open office mode" : "Open field mode"}
          >
            <span className="material-symbols-outlined">{mobileMode === "tech" ? "contract" : "desktop_windows"}</span>
            {mobileMode === "tech" ? "Field" : "Office"}
          </button>
        ) : null}
        <button className="avatar-chip" onClick={onReset} title="Reset demo">
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>
    </header>
  );
}

function DashboardScreen({ jobs, counts, onAdvanceJob, onOpenIntake, onOpenJob }) {
  const urgentJob = jobs.find((job) => getWorkflowStage(job).id === "intake") ?? jobs[0];
  const approvalJob = jobs.find((job) => getWorkflowStage(job).id === "approval") ?? jobs[1] ?? jobs[0];
  const fieldworkJob = jobs.find((job) => getWorkflowStage(job).id === "fieldwork") ?? jobs[2] ?? jobs[0];
  const invoicingJob = jobs.find((job) => getWorkflowStage(job).id === "invoicing") ?? jobs[0];
  const sentJob = jobs.find((job) => getWorkflowStage(job).id === "sent") ?? jobs[0];
  const nowJob = getLeadJobForStage(jobs, "intake") ?? getLeadJobForStage(jobs, "approval") ?? jobs[0];
  const stats = [
    { label: "Active jobs", value: jobs.length },
    { label: "Needs intake work", value: counts.byStage.find((item) => item.id === "intake")?.count ?? 0 },
    { label: "Awaiting approval", value: counts.byStage.find((item) => item.id === "approval")?.count ?? 0 }
  ];

  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Today&apos;s tasks</p>
        <h1>Paperwork queue</h1>
        <p className="page-subtitle">A stage-aware operator surface for intake, approvals, field closeout, and invoice send.</p>
      </div>

      <div className="metrics-grid">
        {stats.map((item) => (
          <div key={item.label} className="mini-card metric-card">
            <span className="field-label">{item.label}</span>
            <strong className="metric-value">{item.value}</strong>
          </div>
        ))}
        <div className="mini-card metric-card">
          <span className="field-label">Ready to send</span>
          <strong className="metric-value">{counts.byStage.find((item) => item.id === "sent")?.count ?? 0}</strong>
        </div>
      </div>

      <div className="card urgent-card">
        <div className="card-topline">
          <div className="chip-row">
            <Chip tone="urgent" icon="bolt">Do this now</Chip>
          </div>
          <StatusPill tone={getWorkflowStage(nowJob).tone}>{getWorkflowStage(nowJob).label}</StatusPill>
        </div>
        <h2>{nowJob.title}</h2>
        <p className="muted-line">
          <span className="material-symbols-outlined">location_on</span>
          {nowJob.location}
        </p>
        <p className="body-copy">{getJobOperatorSummary(nowJob)}</p>
        <div className="focus-grid">
          <div className="focus-pill">
            <span className="field-label">Blocking</span>
            <strong>{getJobBlocker(nowJob)}</strong>
          </div>
          <div className="focus-pill">
            <span className="field-label">Next tap</span>
            <strong>{getPrimaryActionLabel(nowJob)}</strong>
          </div>
        </div>
        <button className="primary-button" onClick={() => onOpenJob(nowJob.id, getPrimaryScreenForJob(nowJob))}>
          <span className="material-symbols-outlined">assignment_turned_in</span>
          {getPrimaryActionLabel(nowJob)}
        </button>
        <button className="secondary-button" onClick={() => onAdvanceJob(nowJob.id)}>
          <span className="material-symbols-outlined">{getNextJobTransition(nowJob).icon}</span>
          {getNextJobTransition(nowJob).label}
        </button>
      </div>

      <div className="card white-card">
        <div className="card-topline">
          <Chip tone="warning" icon="schedule">Approval queue</Chip>
          <StatusPill tone="soft">{getWorkflowStage(approvalJob).label}</StatusPill>
        </div>
        <h2>{approvalJob.title}</h2>
        <p className="muted-line">
          <span className="material-symbols-outlined">person</span>
          {approvalJob.customer}
        </p>
        <div className="mini-list">
          <div className="mini-list-item">Blocking: {getJobBlocker(approvalJob)}</div>
          <div className="mini-list-item">Operator move: {getPrimaryActionLabel(approvalJob)}</div>
          <div className="mini-list-item">Send posture: {formatStatusLabel(approvalJob.messageStatuses.estimate)}</div>
        </div>
        <div className="inline-action-row">
          <button className="secondary-button" onClick={() => onOpenJob(approvalJob.id, "estimate")}>Open estimate</button>
          <button className="secondary-button" onClick={() => onOpenJob(approvalJob.id, "messages")}>Draft follow-up</button>
        </div>
      </div>

      <div className="two-up-grid">
        <button className="mini-card" onClick={() => onOpenJob(fieldworkJob.id, "tech-note")}>
          <Chip tone="ready" icon="construction">Field closeout</Chip>
          <h3>{fieldworkJob.title}</h3>
          <p>{getJobOperatorSummary(fieldworkJob)}</p>
          <StatusPill tone="ready">{getPrimaryActionLabel(fieldworkJob)}</StatusPill>
        </button>
        <button className="mini-card" onClick={() => onOpenJob(invoicingJob.id, "invoice")}>
          <Chip tone="ready" icon="receipt_long">Invoice queue</Chip>
          <h3>{invoicingJob.title}</h3>
          <p>{getJobOperatorSummary(invoicingJob)}</p>
          <StatusPill tone="soft">{getPrimaryActionLabel(invoicingJob)}</StatusPill>
        </button>
      </div>

      <div className="card white-card">
        <div className="card-topline">
          <div>
            <label className="field-label">Quick queue</label>
            <h2>Know what is blocked and what is clean</h2>
          </div>
          <StatusPill tone="soft">MVP</StatusPill>
        </div>
        <div className="quick-queue">
          {[approvalJob, fieldworkJob, invoicingJob, sentJob].filter(Boolean).map((job) => (
            <button key={job.id} className="quick-queue-row" onClick={() => onOpenJob(job.id, getPrimaryScreenForJob(job))}>
              <div className="quick-queue-copy">
                <strong>{job.title}</strong>
                <span>{getJobBlocker(job)}</span>
              </div>
              <StatusPill tone={getWorkflowStage(job).tone}>{getWorkflowStage(job).label}</StatusPill>
            </button>
          ))}
        </div>
      </div>

      <div className="card soft-card">
        <div className="card-topline">
          <div>
            <label className="field-label">Recent activity</label>
            <h2>{nowJob.title}</h2>
          </div>
          <StatusPill tone="soft">Latest 3</StatusPill>
        </div>
        <div className="mini-list">
          {(nowJob.activityLog ?? []).slice(0, 3).map((entry) => (
            <div key={`${entry.ts}-${entry.text}`} className="mini-list-item">{entry.ts} · {entry.text}</div>
          ))}
        </div>
      </div>

      <StickyAction onClick={onOpenIntake} icon="add">New intake</StickyAction>
    </section>
  );
}

function JobsScreen({ jobs, activeJobId, filter, onFilterChange, onSelectJob, onOpen }) {
  const filteredJobs = jobs.filter((job) => {
    const stage = getWorkflowStage(job).id;
    if (filter === "urgent") return stage === "intake";
    if (filter === "missing") return stage === "approval";
    if (filter === "ready") return stage === "invoicing" || stage === "sent";
    return true;
  });

  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Jobs</p>
        <h1>Active paperwork jobs</h1>
        <p className="page-subtitle">Simple list, not a giant CRM board.</p>
      </div>

      <div className="filter-row">
        <button className={`tag ${filter === "all" ? "tag-active" : ""}`} onClick={() => onFilterChange("all")}>All</button>
        <button className={`tag ${filter === "urgent" ? "tag-active" : ""}`} onClick={() => onFilterChange("urgent")}>Intake</button>
        <button className={`tag ${filter === "missing" ? "tag-active" : ""}`} onClick={() => onFilterChange("missing")}>Approval</button>
        <button className={`tag ${filter === "ready" ? "tag-active" : ""}`} onClick={() => onFilterChange("ready")}>Invoice / sent</button>
      </div>

      <div className="list-stack">
        {filteredJobs.length ? filteredJobs.map((job) => (
          <button key={job.id} className={`job-row ${job.id === activeJobId ? "job-row-active" : ""}`} onClick={() => onSelectJob(job.id)}>
            <div className="job-row-main">
              <div className="job-row-top">
                <h3>{job.title}</h3>
                <StatusPill tone={getWorkflowStage(job).tone}>
                  {getWorkflowStage(job).label}
                </StatusPill>
              </div>
              <p>{job.customer}</p>
              <div className="job-next">{job.nextAction}</div>
              <div className="job-operator-line">Blocking: {getJobBlocker(job)}</div>
              <div className="job-operator-line">Do next: {getPrimaryActionLabel(job)}</div>
            </div>
            <div className="job-row-actions">
              <button className="primary-button" onClick={(event) => {
                event.stopPropagation();
                onSelectJob(job.id);
                onOpen(job.id, getPrimaryScreenForJob(job));
              }}>{getPrimaryActionLabel(job)}</button>
            </div>
          </button>
        )) : (
          <div className="card white-card empty-state-card">
            <h2>No jobs in this filter</h2>
            <p className="body-copy">This view stays deliberately simple. If a filter is empty, the operator should know immediately.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function NewIntakeScreen({ form, onChange, onAnalyze, onShortcut }) {
  const shortcuts = [
    "No cooling, same-day. Outdoor fan starts but air is warm. 452 Oak St.",
    "Annual furnace maintenance for residential home this week.",
    "RTU intermittent cooling at shopping mall. Need roof access contact."
  ];

  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">New intake</p>
        <h1>Paste the messy request</h1>
        <p className="page-subtitle">This is the fastest way from raw field input to usable paperwork.</p>
      </div>

      <div className="card soft-card">
        <label className="field-label">Source</label>
        <div className="tag-grid">
          {["Call transcript", "SMS", "Email", "Dispatcher note", "Technician note"].map((source) => (
            <button key={source} className={`tag ${form.sourceType === source ? "tag-active" : ""}`} onClick={() => onChange("sourceType", source)}>
              {source}
            </button>
          ))}
        </div>
      </div>

      <div className="card white-card">
        <label className="field-label">Raw intake</label>
        <textarea className="intake-textarea" value={form.rawText} onChange={(event) => onChange("rawText", event.target.value)} />
      </div>

      <div className="card soft-card">
        <label className="field-label">Recent shortcuts</label>
        <div className="tag-grid">
          {shortcuts.map((item) => (
            <button key={item} className="tag" onClick={() => onShortcut(item)}>{item}</button>
          ))}
        </div>
      </div>

      <StickyAction onClick={onAnalyze} icon="bolt">Analyze intake</StickyAction>
    </section>
  );
}

function IntakeAnalysisScreen({ job, onNext, onMessage }) {
  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Intake analysis</p>
        <h1>Structured job summary</h1>
      </div>

      <div className="card soft-card">
        <div className="card-topline">
          <div>
            <h2>{job.customer}</h2>
            <p className="muted-line"><span className="material-symbols-outlined">location_on</span>{job.location}</p>
          </div>
          <StatusPill tone="ready">{job.confidence}</StatusPill>
        </div>
        <div className="action-pair">
          <button className="secondary-button"><span className="material-symbols-outlined">directions</span>Navigate</button>
          <button className="secondary-button"><span className="material-symbols-outlined">call</span>Call</button>
        </div>
      </div>

      <div className="detail-grid analysis-grid">
        <DetailCard label="Source" value={job.sourceType} />
        <DetailCard label="Next action" value={job.nextAction} />
        <DetailCard label="Confidence" value={job.confidence} />
      </div>

      <div className="card white-card">
        <h3 className="section-title">Service details</h3>
        <div className="detail-grid">
          <DetailCard label="Service type" value={job.serviceType} />
          <DetailCard label="Equipment" value={job.equipment} />
          <DetailCard label="Urgency" value={job.urgency} />
        </div>
        <DetailBlock label="Reported problem" value={job.issue} />
      </div>

      <div className="card callout-card">
        <div className="card-topline">
          <Chip tone="urgent" icon="warning">Missing info</Chip>
        </div>
        <div className="bullet-list">
          {job.missingInfo.map((item) => (
            <div key={item} className="bullet-item">
              <span className="material-symbols-outlined">radio_button_unchecked</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="card white-card">
        <h3 className="section-title">Suggested clarifying questions</h3>
        <div className="question-list">
          {job.questions.map((question, index) => (
            <div key={question} className="question-row">
              <span>{index + 1}</span>
              <p>{question}</p>
            </div>
          ))}
        </div>
      </div>

      <StickyDualAction
        primary={{ label: "Continue to estimate", icon: "arrow_forward", onClick: onNext }}
        secondary={{ label: "Draft missing-info message", icon: "chat", onClick: onMessage }}
      />
    </section>
  );
}

function EstimateDraftScreen({ job, onMessage, onPreview, onAdvanceStatus, onFieldChange, onTextListChange, onLineItemsChange, onCopy }) {
  const total = sumLineItems(job.lineItems);
  const optionalTotal = sumLineItems(job.optionalItems);
  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Estimate draft</p>
        <h1>{job.title}</h1>
        <p className="page-subtitle">Review-first paperwork. Fast, clear, and field-safe.</p>
      </div>

      <div className="three-up-grid">
        <div className="mini-card metric-card">
          <span className="field-label">Customer</span>
          <strong>{job.customer}</strong>
        </div>
        <div className="mini-card metric-card">
          <span className="field-label">Equipment</span>
          <strong>{job.equipment}</strong>
        </div>
        <div className="mini-card metric-card">
          <span className="field-label">Draft total</span>
          <strong>{total}</strong>
        </div>
      </div>

      <div className="card soft-card">
        <div className="card-topline">
          <div>
            <label className="field-label">Estimate posture</label>
            <h2>{formatStatusLabel(job.estimateStatus)}</h2>
          </div>
          <StatusPill tone={getStatusTone(job.estimateStatus)}>{job.estimateVersion}</StatusPill>
        </div>
        <div className="detail-grid">
          <DetailCard label="Service window" value={job.serviceWindow} />
          <DetailCard label="Site contact" value={job.siteContact} />
          <DetailCard label="Customer posture" value={job.customerDecision} />
        </div>
        <DetailBlock label="Access notes" value={job.accessNotes} />
        <DetailBlock label="Recommended next move" value={job.recommendedOption} />
        <div className="inline-action-row">
          <button className="secondary-button" onClick={onPreview}>Open preview</button>
          <button className="secondary-button" onClick={onAdvanceStatus}>{getAdvanceLabel(job.estimateStatus, ESTIMATE_STATUS_ORDER, "estimate")}</button>
        </div>
      </div>

      <div className="card white-card">
        <label className="field-label">Client-facing summary</label>
        <textarea className="message-textarea compact-textarea" value={job.estimateSummary} onChange={(event) => onFieldChange(job.id, "estimateSummary", event.target.value)} />
      </div>

      <div className="card soft-card">
        <label className="field-label">Line items</label>
        <p className="helper-text">One line per item. Format: `Label | $Amount`</p>
        <textarea
          className="message-textarea compact-textarea"
          value={job.lineItems.map((item) => `${item.label} | ${item.amount}`).join("\n")}
          onChange={(event) => onLineItemsChange(job.id, event.target.value)}
        />
      </div>

      <div className="card white-card">
        <h3 className="section-title">Approved scope</h3>
        <div className="mini-list">
          {job.approvedScope.map((item) => (
            <div key={item} className="mini-list-item">{item}</div>
          ))}
        </div>
      </div>

      <div className="card soft-card">
        <div className="card-topline">
          <div>
            <label className="field-label">Optional add-ons</label>
            <h3 className="section-title">Keep outside core approval</h3>
          </div>
          <StatusPill tone="soft">{optionalTotal}</StatusPill>
        </div>
        <div className="mini-list">
          {job.optionalItems.map((item) => (
            <div key={item.label} className="split-row">
              <span>{item.label}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="card white-card">
        <label className="field-label">Assumptions</label>
        <textarea
          className="message-textarea compact-textarea"
          value={job.assumptions.join("\n")}
          onChange={(event) => onTextListChange(job.id, "assumptions", event.target.value)}
        />
      </div>

      <div className="card white-card">
        <label className="field-label">Exclusions</label>
        <textarea
          className="message-textarea compact-textarea"
          value={job.exclusions.join("\n")}
          onChange={(event) => onTextListChange(job.id, "exclusions", event.target.value)}
        />
      </div>

      <div className="card soft-card">
        <h3 className="section-title">Optional recommended item</h3>
        <p className="body-copy">Keep maintenance-plan or filter-change upsell separate from the core approval path. The customer should see what gets them back up today versus what can be scheduled later.</p>
      </div>

      <div className="card white-card">
        <h3 className="section-title">Estimate checklist</h3>
        <div className="mini-list">
          <div className="mini-list-item">Make assumptions explicit before pricing looks final.</div>
          <div className="mini-list-item">Keep replacement scope excluded unless confirmed in writing.</div>
          <div className="mini-list-item">Separate optional upsell from the core repair path.</div>
        </div>
      </div>

      <StickyTripleAction
        items={[
          { label: "Copy estimate", icon: "content_copy", onClick: () => onCopy(buildEstimatePacket(job), "Estimate packet") },
          { label: getAdvanceLabel(job.estimateStatus, ESTIMATE_STATUS_ORDER, "estimate"), icon: getAdvanceIcon(job.estimateStatus, ESTIMATE_STATUS_ORDER), onClick: onAdvanceStatus },
          { label: "Draft send message", icon: "send", onClick: onMessage, primary: true }
        ]}
      />
    </section>
  );
}

function InvoiceDraftScreen({ draft, onMessage, onPreview, onAdvanceStatus, onFieldChange, onLineItemsChange, onCopy }) {
  const total = sumLineItems(draft.lineItems);
  const internalTotal = sumLineItems(draft.internalLineItems);
  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Invoice draft</p>
        <h1>{draft.title}</h1>
        <p className="page-subtitle">Built from rough completion notes, then cleaned for the customer.</p>
      </div>

      <div className="three-up-grid">
        <div className="mini-card metric-card">
          <span className="field-label">Customer</span>
          <strong>{draft.customer}</strong>
        </div>
        <div className="mini-card metric-card">
          <span className="field-label">Line items</span>
          <strong>{draft.lineItems.length}</strong>
        </div>
        <div className="mini-card metric-card">
          <span className="field-label">Draft total</span>
          <strong>{total}</strong>
        </div>
      </div>

      <div className="card soft-card">
        <div className="card-topline">
          <div>
            <label className="field-label">Invoice posture</label>
            <h2>{formatStatusLabel(draft.invoiceStatus)}</h2>
          </div>
          <StatusPill tone={getStatusTone(draft.invoiceStatus)}>{draft.paymentTerms}</StatusPill>
        </div>
        <div className="detail-grid">
          <DetailCard label="Service date" value={draft.serviceDate} />
          <DetailCard label="Technician" value={draft.technician} />
          <DetailCard label="Collection posture" value={draft.invoiceStatus === "sent" ? "Awaiting payment" : "Internal review"} />
        </div>
        <DetailBlock label="Internal billing note" value={draft.internalOnlyNotes} />
        <div className="inline-action-row">
          <button className="secondary-button" onClick={onPreview}>Open preview</button>
          <button className="secondary-button" onClick={onAdvanceStatus}>{getAdvanceLabel(draft.invoiceStatus, DOCUMENT_STATUS_ORDER, "invoice")}</button>
        </div>
      </div>

      <div className="card white-card">
        <label className="field-label">Completion summary</label>
        <textarea className="message-textarea compact-textarea" value={draft.completionSummary} onChange={(event) => onFieldChange("completionSummary", event.target.value)} />
      </div>

      <div className="card soft-card">
        <label className="field-label">Line items</label>
        <p className="helper-text">One line per item. Format: `Label | $Amount`</p>
        <textarea
          className="message-textarea compact-textarea"
          value={draft.lineItems.map((item) => `${item.label} | ${item.amount}`).join("\n")}
          onChange={(event) => onLineItemsChange(event.target.value)}
        />
      </div>

      <div className="card white-card">
        <div className="card-topline">
          <div>
            <label className="field-label">Internal closeout</label>
            <h3 className="section-title">Not customer-facing</h3>
          </div>
          <StatusPill tone="soft">{internalTotal}</StatusPill>
        </div>
        <div className="mini-list">
          {draft.internalLineItems.map((item) => (
            <div key={item.label} className="split-row">
              <span>{item.label}</span>
              <strong>{item.amount}</strong>
            </div>
          ))}
        </div>
        <div className="mini-list">
          {draft.closeoutChecklist.map((item) => (
            <div key={item} className="mini-list-item">{item}</div>
          ))}
        </div>
      </div>

      <div className="card white-card">
        <label className="field-label">Payment notes</label>
        <textarea className="message-textarea compact-textarea" value={draft.paymentNotes} onChange={(event) => onFieldChange("paymentNotes", event.target.value)} />
      </div>

      <div className="card white-card">
        <div className="detail-grid">
          <DetailCard label="Service date" value={draft.serviceDate} />
          <DetailCard label="Technician" value={draft.technician} />
          <DetailCard label="Terms" value={draft.paymentTerms} />
        </div>
      </div>

      <div className="card soft-card">
        <h3 className="section-title">Invoice guardrails</h3>
        <div className="mini-list">
          <div className="mini-list-item">Field note can stay rough. Customer invoice cannot.</div>
          <div className="mini-list-item">Keep warranty and serial caveats outside billed line items.</div>
          <div className="mini-list-item">Leave accounting sync for later; this is still draft-first.</div>
        </div>
      </div>

      <StickyTripleAction
        items={[
          { label: "Copy invoice", icon: "content_copy", onClick: () => onCopy(buildInvoicePacket(draft), "Invoice packet") },
          { label: getAdvanceLabel(draft.invoiceStatus, DOCUMENT_STATUS_ORDER, "invoice"), icon: getAdvanceIcon(draft.invoiceStatus, DOCUMENT_STATUS_ORDER), onClick: onAdvanceStatus },
          { label: "Draft invoice message", icon: "mail", onClick: onMessage, primary: true }
        ]}
      />
    </section>
  );
}

function MessageDraftScreen({ job, channel, focus, drafts, statuses, invoiceDraft, onChannelChange, onFocusChange, onChange, onAdvanceStatus, onRegenerate, onCopy }) {
  const activeDraft = drafts[focus];
  const activeStatus = statuses?.[focus] ?? "draft";
  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Message draft</p>
        <h1>Ready-to-send follow-up</h1>
        <p className="page-subtitle">Minimal friction. Edit, copy, send from your existing channel.</p>
      </div>

      <div className="card white-card">
        <div className="card-topline">
          <div>
            <label className="field-label">Active job</label>
            <h2>{job.title}</h2>
          </div>
          <StatusPill tone={job.status === "ready" ? "ready" : job.status === "urgent" ? "urgent" : "soft"}>
            {job.customer}
          </StatusPill>
        </div>
        <p className="body-copy">{job.issue}</p>
      </div>

      <div className="card soft-card">
        <label className="field-label">Channel</label>
        <div className="tag-grid">
          <button className={`tag ${channel === "sms" ? "tag-active" : ""}`} onClick={() => onChannelChange("sms")}>SMS</button>
          <button className={`tag ${channel === "email" ? "tag-active" : ""}`} onClick={() => onChannelChange("email")}>Email</button>
        </div>
      </div>

      <div className="card white-card">
        <label className="field-label">Send sequence</label>
        <div className="message-sequence">
          {[
            { id: "missing", label: "Missing info", hint: `${job.missingInfo.length} missing items still open` },
            { id: "estimate", label: "Estimate follow-up", hint: `${job.lineItems.length} estimate lines in draft` },
            { id: "invoice", label: "Invoice send", hint: `${invoiceDraft.lineItems.length} invoice lines ready` }
          ].map((item) => (
            <button key={item.id} className={`sequence-row ${focus === item.id ? "sequence-row-active" : ""}`} onClick={() => onFocusChange(item.id)}>
              <div className="sequence-copy">
                <strong>{item.label}</strong>
                <span>{item.hint}</span>
              </div>
              <StatusPill tone={getStatusTone(statuses?.[item.id])}>{formatStatusLabel(statuses?.[item.id])}</StatusPill>
            </button>
          ))}
        </div>
      </div>

      <MessageEditor label="Missing info request" value={drafts.missing} status={statuses?.missing} active={focus === "missing"} helper="Best when the intake is real but the paperwork is still blocked by missing facts." onFocus={() => onFocusChange("missing")} onChange={(value) => onChange("missing", value)} onAdvanceStatus={() => onAdvanceStatus("missing")} onCopy={() => onCopy(drafts.missing, "Missing-info message")} onRegenerate={() => onRegenerate("missing")} />
      <MessageEditor label="Estimate sent follow-up" value={drafts.estimate} status={statuses?.estimate} active={focus === "estimate"} helper="Use after the operator has checked scope, assumptions, and schedule posture." onFocus={() => onFocusChange("estimate")} onChange={(value) => onChange("estimate", value)} onAdvanceStatus={() => onAdvanceStatus("estimate")} onCopy={() => onCopy(drafts.estimate, "Estimate follow-up")} onRegenerate={() => onRegenerate("estimate")} />
      <MessageEditor label="Invoice sent" value={drafts.invoice} status={statuses?.invoice} active={focus === "invoice"} helper="Use after the field note has been cleaned and billing notes are separated from customer copy." onFocus={() => onFocusChange("invoice")} onChange={(value) => onChange("invoice", value)} onAdvanceStatus={() => onAdvanceStatus("invoice")} onCopy={() => onCopy(drafts.invoice, "Invoice message")} onRegenerate={() => onRegenerate("invoice")} />

      <div className="card soft-card">
        <label className="field-label">Context used for drafts</label>
        <div className="mini-list">
          <div className="mini-list-item">Missing info count: {job.missingInfo.length}</div>
          <div className="mini-list-item">Estimate lines: {job.lineItems.length}</div>
          <div className="mini-list-item">Invoice lines: {invoiceDraft.lineItems.length}</div>
          <div className="mini-list-item">Preferred channel: {channel === "sms" ? "Fast reply request" : "Packet + context"}</div>
        </div>
      </div>

      <div className="card white-card">
        <h3 className="section-title">Send posture</h3>
        <div className="mini-list">
          <div className="mini-list-item">SMS stays short and action-oriented.</div>
          <div className="mini-list-item">Email can carry more context and assumptions.</div>
          <div className="mini-list-item">Everything remains copy-first, not provider-bound.</div>
        </div>
      </div>

      <StickyTripleAction
        items={[
          { label: `Copy ${focus} draft`, icon: "content_copy", onClick: () => onCopy(activeDraft, `${focus} draft`) },
          { label: getAdvanceLabel(activeStatus, MESSAGE_STATUS_ORDER, "message"), icon: getAdvanceIcon(activeStatus, MESSAGE_STATUS_ORDER), onClick: () => onAdvanceStatus(focus) },
          { label: "Refresh active draft", icon: "auto_fix_high", onClick: () => onRegenerate(focus), primary: true }
        ]}
      />
    </section>
  );
}

function TechnicianNoteScreen({ value, onChange, onGenerate }) {
  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Technician quick note</p>
        <h1>Close the job in the field</h1>
        <p className="page-subtitle">Lightweight enough to use from a van or mechanical room.</p>
      </div>

      <div className="card white-card">
        <label className="field-label">Quick note</label>
        <textarea className="intake-textarea" value={value} onChange={(event) => onChange(event.target.value)} />
      </div>

      <div className="card soft-card">
        <label className="field-label">Quick chips</label>
        <div className="tag-grid">
          {TECH_QUICK_CHIPS.map((chip, index) => (
            <Tag key={chip} active={index === 0}>{chip}</Tag>
          ))}
        </div>
      </div>

      <StickyAction onClick={onGenerate} icon="receipt_long">Generate invoice draft</StickyAction>
    </section>
  );
}

function TechnicianMobileScreen({ jobs, job, noteValue, onSelectJob, onOpenOffice, onNoteChange, onQuickChip, onAdvanceJob, onSendToOffice }) {
  const visibleJobs = jobs.filter((item) => getWorkflowStage(item).id !== "sent");
  const primaryTransition = getNextJobTransition(job);

  return (
    <section className="stack-page technician-mobile-page">
      <div className="page-header technician-mobile-header">
        <p className="page-kicker">Field mode</p>
        <h1>Technician closeout</h1>
        <p className="page-subtitle">Only the current job, the blocker, one process move, and a fast note back to office.</p>
      </div>

      <div className="field-job-strip">
        {visibleJobs.map((item) => (
          <button
            key={item.id}
            className={`field-job-chip ${item.id === job.id ? "field-job-chip-active" : ""}`}
            onClick={() => onSelectJob(item.id)}
          >
            <strong>{item.title}</strong>
            <span>{getWorkflowStage(item).label}</span>
          </button>
        ))}
      </div>

      <div className="card urgent-card technician-hero-card">
        <div className="card-topline">
          <Chip tone="ready" icon="construction">Current job</Chip>
          <StatusPill tone={getWorkflowStage(job).tone}>{getWorkflowStage(job).label}</StatusPill>
        </div>
        <h2>{job.title}</h2>
        <p className="muted-line">
          <span className="material-symbols-outlined">location_on</span>
          {job.location}
        </p>
        <p className="body-copy">{job.customer} · {job.serviceWindow}</p>
        <button className="secondary-button technician-primary-action" onClick={onAdvanceJob}>
          <span className="material-symbols-outlined">{primaryTransition.icon}</span>
          {primaryTransition.label}
        </button>
      </div>

      <div className="card white-card technician-blocker-card">
        <label className="field-label">Blocker</label>
        <h2>{getJobBlocker(job)}</h2>
        <p className="body-copy">{job.nextAction}</p>
      </div>

      <div className="card white-card">
        <div className="card-topline">
          <div>
            <label className="field-label">Field note</label>
            <h2>Send rough reality, not polished paperwork</h2>
          </div>
          <button className="link-button" onClick={onOpenOffice}>Open office view</button>
        </div>
        <textarea
          className="message-textarea technician-note-textarea"
          value={noteValue}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Compressor started, capacitor replaced, 15 min test passed, customer approved..."
        />
      </div>

      <div className="card soft-card">
        <label className="field-label">Quick chips</label>
        <div className="tag-grid">
          {TECH_QUICK_CHIPS.map((chip) => (
            <button key={chip} className="tag" onClick={() => onQuickChip(chip)}>{chip}</button>
          ))}
        </div>
      </div>

      <StickyDualAction
        primary={{ label: "Send to office", icon: "send", onClick: onSendToOffice }}
        secondary={{ label: primaryTransition.label, icon: primaryTransition.icon, onClick: onAdvanceJob }}
      />
    </section>
  );
}

function BotMockScreen({ job, onJumpToAnalysis }) {
  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Bot mode</p>
        <h1>Telegram-style quick flow</h1>
      </div>

      <div className="chat-shell">
        <ChatBubble own>{job.rawIntake || "New field request pasted into the bot."}</ChatBubble>
        <ChatBubble>
          Summary: {job.serviceType.toLowerCase()} intake for {job.equipment.toLowerCase()}. {job.urgency.toLowerCase()} response target.
        </ChatBubble>
        <ChatBubble>
          Missing info:
          <br />{job.missingInfo.map((item, index) => `${index + 1}. ${item}`).join("\n")}
        </ChatBubble>
        <ChatBubble>
          Next paperwork move: {job.recommendedOption}
        </ChatBubble>
      </div>

      <StickyDualAction
        primary={{ label: "Open full analysis", icon: "open_in_new", onClick: onJumpToAnalysis }}
        secondary={{ label: "Copy questions", icon: "content_copy", onClick: async () => navigator.clipboard.writeText(job.questions.join("\n")) }}
      />
    </section>
  );
}

function ExportPreviewScreen({ job, draft, mode, onModeChange }) {
  const total = mode === "estimate" ? sumLineItems(job.lineItems) : sumLineItems(draft.lineItems);
  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">Export preview</p>
        <h1>Client-ready packet</h1>
      </div>

      <div className="filter-row">
        <button className={`tag ${mode === "estimate" ? "tag-active" : ""}`} onClick={() => onModeChange("estimate")}>Estimate</button>
        <button className={`tag ${mode === "invoice" ? "tag-active" : ""}`} onClick={() => onModeChange("invoice")}>Invoice</button>
      </div>

      <div className="document-shell">
        <div className="document-header">
          <p>Paperwork Copilot</p>
          <h2>{mode === "estimate" ? `${job.title} estimate` : `${draft.title} invoice`}</h2>
          <span>{mode === "estimate" ? job.customer : draft.customer}</span>
        </div>

        <div className="document-meta-grid">
          {mode === "estimate" ? (
            <>
              <div className="document-meta-card">
                <span>Status</span>
                <strong>{formatStatusLabel(job.estimateStatus)}</strong>
              </div>
              <div className="document-meta-card">
                <span>Window</span>
                <strong>{job.serviceWindow}</strong>
              </div>
              <div className="document-meta-card">
                <span>Contact</span>
                <strong>{job.siteContact}</strong>
              </div>
            </>
          ) : (
            <>
              <div className="document-meta-card">
                <span>Status</span>
                <strong>{formatStatusLabel(draft.invoiceStatus)}</strong>
              </div>
              <div className="document-meta-card">
                <span>Service date</span>
                <strong>{draft.serviceDate}</strong>
              </div>
              <div className="document-meta-card">
                <span>Technician</span>
                <strong>{draft.technician}</strong>
              </div>
            </>
          )}
        </div>

        {mode === "estimate" ? (
          <>
            <div className="document-section">
              <h3>Scope summary</h3>
              <p>{job.estimateSummary}</p>
            </div>

            <div className="document-section">
              <h3>Approved scope</h3>
              {job.approvedScope.map((item) => (
                <div key={item} className="document-bullet">{item}</div>
              ))}
            </div>

            <div className="document-section">
              <h3>Site and access notes</h3>
              <p>{job.accessNotes}</p>
            </div>

            <div className="document-section">
              <h3>Estimate lines</h3>
              {job.lineItems.map((item) => (
                <div key={item.label} className="document-row">
                  <span>{item.label}</span>
                  <strong>{item.amount}</strong>
                </div>
              ))}
              <div className="document-total-row">
                <span>Draft total</span>
                <strong>{total}</strong>
              </div>
            </div>

            <div className="document-section">
              <h3>Assumptions</h3>
              {job.assumptions.map((item) => (
                <div key={item} className="document-bullet">{item}</div>
              ))}
            </div>

            <div className="document-section">
              <h3>Exclusions</h3>
              {job.exclusions.map((item) => (
                <div key={item} className="document-bullet">{item}</div>
              ))}
            </div>

            <div className="document-section">
              <h3>Optional add-ons</h3>
              {job.optionalItems.map((item) => (
                <div key={item.label} className="document-row">
                  <span>{item.label}</span>
                  <strong>{item.amount}</strong>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="document-section">
              <h3>Completion summary</h3>
              <p>{draft.completionSummary}</p>
            </div>

            <div className="document-section">
              <h3>Invoice lines</h3>
              {draft.lineItems.map((item) => (
                <div key={item.label} className="document-row">
                  <span>{item.label}</span>
                  <strong>{item.amount}</strong>
                </div>
              ))}
              <div className="document-total-row">
                <span>Draft total</span>
                <strong>{total}</strong>
              </div>
            </div>

            <div className="document-section">
              <h3>Payment notes</h3>
              <p>{draft.paymentNotes}</p>
            </div>

            <div className="document-section">
              <h3>Service metadata</h3>
              <div className="document-bullet">Technician: {draft.technician}</div>
              <div className="document-bullet">Service date: {draft.serviceDate}</div>
              <div className="document-bullet">Terms: {draft.paymentTerms}</div>
            </div>

            <div className="document-section">
              <h3>Internal closeout</h3>
              {draft.internalLineItems.map((item) => (
                <div key={item.label} className="document-row">
                  <span>{item.label}</span>
                  <strong>{item.amount}</strong>
                </div>
              ))}
            </div>

            <div className="document-section">
              <h3>Closeout checklist</h3>
              {draft.closeoutChecklist.map((item) => (
                <div key={item} className="document-bullet">{item}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function MoreScreen({ onTechNote, onBot, onInvoice }) {
  return (
    <section className="stack-page">
      <div className="page-header">
        <p className="page-kicker">More</p>
        <h1>Field tools</h1>
        <p className="page-subtitle">Secondary actions that still fit the paperwork wedge.</p>
      </div>
      <div className="list-stack">
        <button className="job-row" onClick={onTechNote}>
          <div className="job-row-main">
            <h3>Technician quick note</h3>
            <p>Capture rough completion notes and jump straight into invoice drafting.</p>
          </div>
        </button>
        <button className="job-row" onClick={onBot}>
          <div className="job-row-main">
            <h3>Bot conversation mock</h3>
            <p>Show the compact Telegram-style flow for field or dispatcher use.</p>
          </div>
        </button>
        <button className="job-row" onClick={onInvoice}>
          <div className="job-row-main">
            <h3>Invoice draft</h3>
            <p>Open the completion-to-invoice view directly.</p>
          </div>
        </button>
        <div className="card soft-card">
          <h3 className="section-title">What stays out of scope</h3>
          <div className="mini-list">
            <div className="mini-list-item">No dispatch board.</div>
            <div className="mini-list-item">No route optimization.</div>
            <div className="mini-list-item">No autonomous final pricing.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopSidebar({ jobs, job, counts, invoiceDraft, onOpenJob, onAdvanceJob, onOpenEstimate, onOpenInvoice, onOpenMessages, onOpenTechNote }) {
  return (
    <div className="sidebar-stack">
      <div className="card white-card sidebar-card">
        <label className="field-label">Selected job</label>
        <h2>{job.title}</h2>
        <p className="body-copy">{job.customer} · {job.location}</p>
        <div className="focus-stack">
          <div className="focus-pill">
            <span className="field-label">Stage</span>
            <strong>{getWorkflowStage(job).label}</strong>
          </div>
          <div className="focus-pill">
            <span className="field-label">Blocking</span>
            <strong>{getJobBlocker(job)}</strong>
          </div>
          <div className="focus-pill">
            <span className="field-label">Do next</span>
            <strong>{getPrimaryActionLabel(job)}</strong>
          </div>
        </div>
      </div>

      <div className="card soft-card sidebar-card">
        <label className="field-label">Queue health</label>
        <div className="stage-ladder compact-ladder">
          {counts.byStage.map((stage) => (
            <button
              key={stage.id}
              className="stage-ladder-row"
              onClick={() => {
                const targetJob = getLeadJobForStage(jobs, stage.id) ?? job;
                onOpenJob(targetJob.id, getPrimaryScreenForJob(targetJob));
              }}
            >
              <div className="stage-ladder-copy">
                <strong>{stage.label}</strong>
                <span>{stage.count} jobs</span>
              </div>
              <StatusPill tone={stage.tone}>{stage.count}</StatusPill>
            </button>
          ))}
        </div>
      </div>

      <div className="card white-card sidebar-card">
        <label className="field-label">One-tap actions</label>
        <div className="sidebar-actions">
          <button className="primary-button" onClick={() => onOpenJob(job.id, getPrimaryScreenForJob(job))}>{getPrimaryActionLabel(job)}</button>
          <button className="secondary-button" onClick={onAdvanceJob}>{getNextJobTransition(job).label}</button>
          <button className="secondary-button" onClick={onOpenMessages}>Messages</button>
          <button className="secondary-button" onClick={onOpenInvoice}>Invoice</button>
        </div>
      </div>

      <div className="card soft-card sidebar-card">
        <label className="field-label">Ready to send</label>
        <div className="mini-list">
          <div className="mini-list-item">Draft: {invoiceDraft.title}</div>
          <div className="mini-list-item">Customer: {invoiceDraft.customer}</div>
          <div className="mini-list-item">Total: {sumLineItems(invoiceDraft.lineItems)}</div>
          <div className="mini-list-item">Status: {formatStatusLabel(invoiceDraft.invoiceStatus)}</div>
        </div>
      </div>

      <div className="card white-card sidebar-card">
        <label className="field-label">Activity</label>
        <div className="mini-list">
          {(job.activityLog ?? []).slice(0, 4).map((entry) => (
            <div key={`${entry.ts}-${entry.text}`} className="mini-list-item">{entry.ts} · {entry.text}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BottomNav({ current, onNavigate }) {
  const resolvedCurrent = NAV_ITEMS.some((item) => item.id === current)
    ? current
    : current === "new-intake" || current === "intake-analysis"
      ? "dashboard"
      : current === "invoice" || current === "tech-note"
        ? "estimate"
        : current === "bot" || current === "export-preview"
          ? "more"
          : current;

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav-item ${resolvedCurrent === item.id ? "bottom-nav-item-active" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function StickyAction({ onClick, icon, children }) {
  return (
    <div className="sticky-bar">
      <button className="primary-button primary-button-full" onClick={onClick}>
        <span className="material-symbols-outlined">{icon}</span>
        {children}
      </button>
    </div>
  );
}

function StickyDualAction({ primary, secondary }) {
  return (
    <div className="sticky-bar sticky-bar-dual">
      <button className="secondary-button sticky-secondary" onClick={secondary.onClick}>
        <span className="material-symbols-outlined">{secondary.icon}</span>
        {secondary.label}
      </button>
      <button className="primary-button primary-button-full" onClick={primary.onClick}>
        <span className="material-symbols-outlined">{primary.icon}</span>
        {primary.label}
      </button>
    </div>
  );
}

function StickyTripleAction({ items }) {
  return (
    <div className="sticky-bar sticky-bar-triple">
      {items.map((item) => (
        <button key={item.label} className={item.primary ? "primary-button primary-button-full" : "secondary-button sticky-secondary"} onClick={item.onClick}>
          <span className="material-symbols-outlined">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Chip({ tone, icon, children }) {
  return (
    <div className={`chip chip-${tone}`}>
      <span className="material-symbols-outlined">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function StatusPill({ tone, children }) {
  return <div className={`status-pill status-pill-${tone}`}>{children}</div>;
}

function Tag({ children, active }) {
  return <div className={`tag ${active ? "tag-active" : ""}`}>{children}</div>;
}

function DetailCard({ label, value }) {
  return (
    <div className="detail-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function DetailBlock({ label, value }) {
  return (
    <div className="detail-block">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

function ChatBubble({ own, children }) {
  return <div className={`chat-bubble ${own ? "chat-bubble-own" : ""}`}>{children}</div>;
}

function MessageEditor({ label, value, status, active, helper, onFocus, onChange, onAdvanceStatus, onCopy, onRegenerate }) {
  return (
    <div className={`card white-card ${active ? "message-editor-active" : ""}`} onClick={onFocus}>
      <div className="editor-header">
        <div>
          <label className="field-label">{label}</label>
          <p className="helper-text">{helper}</p>
        </div>
        <div className="editor-actions">
          <StatusPill tone={getStatusTone(status)}>{formatStatusLabel(status)}</StatusPill>
          <button className="link-button" onClick={(event) => { event.stopPropagation(); onAdvanceStatus(); }}>{getAdvanceLabel(status, MESSAGE_STATUS_ORDER, "message")}</button>
          <button className="link-button" onClick={(event) => { event.stopPropagation(); onRegenerate(); }}>Refresh</button>
          <button className="link-button" onClick={(event) => { event.stopPropagation(); onCopy(); }}>Copy</button>
        </div>
      </div>
      <textarea className="message-textarea" value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function buildEstimatePacket(job) {
  return [
    `${job.title} — ${job.customer}`,
    "",
    "Client-facing summary",
    job.estimateSummary,
    "",
    "Approved scope",
    ...job.approvedScope.map((item) => `- ${item}`),
    "",
    "Line items",
    ...job.lineItems.map((item) => `- ${item.label}: ${item.amount}`),
    "",
    "Assumptions",
    ...job.assumptions.map((item) => `- ${item}`),
    "",
    "Exclusions",
    ...job.exclusions.map((item) => `- ${item}`),
    "",
    "Optional add-ons",
    ...job.optionalItems.map((item) => `- ${item.label}: ${item.amount}`)
  ].join("\n");
}

function buildInvoicePacket(draft) {
  return [
    `${draft.title} — ${draft.customer}`,
    "",
    "Completion summary",
    draft.completionSummary,
    "",
    "Line items",
    ...draft.lineItems.map((item) => `- ${item.label}: ${item.amount}`),
    "",
    "Payment notes",
    draft.paymentNotes,
    "",
    "Internal closeout",
    ...draft.internalLineItems.map((item) => `- ${item.label}: ${item.amount}`),
    "",
    "Closeout checklist",
    ...draft.closeoutChecklist.map((item) => `- ${item}`)
  ].join("\n");
}

function buildInvoiceFromTechnicianNote(note, job) {
  return {
    title: `${job.title} Follow-up`,
    customer: job.customer,
    completionSummary: note,
    lineItems: [
      { label: `${job.serviceType} labor`, amount: "$420" },
      { label: "Parts and materials allowance", amount: "$180" },
      { label: "Startup / testing / closeout", amount: "$95" }
    ],
    internalLineItems: [
      { label: "Parts reconciliation pending", amount: "$0" },
      { label: "Warranty paperwork hold", amount: "$0" }
    ],
    paymentNotes: "Drafted from technician notes. Review pricing and parts before sending the customer-facing invoice.",
    serviceDate: "2026-04-16",
    technician: "Field tech",
    invoiceStatus: "draft",
    paymentTerms: "Net 7",
    internalOnlyNotes: "Verify actual parts used and attach model/serial support details before final send.",
    closeoutChecklist: [
      "Verify final parts used against truck stock.",
      "Attach serial/model support photo.",
      "Close warranty paperwork before marking job complete."
    ]
  };
}

function buildDefaultInvoiceDraft(jobLike) {
  const title = jobLike?.title ? `${jobLike.title} Follow-up` : "Job Follow-up";
  const customer = jobLike?.customer ?? "Customer";
  const serviceType = jobLike?.serviceType ?? "Service";
  return {
    title,
    customer,
    completionSummary: "Summarize completed work, testing performed, and what the customer approved on site.",
    lineItems: [
      { label: `${serviceType} labor`, amount: "$420" },
      { label: "Parts and materials allowance", amount: "$180" },
      { label: "Startup / testing / closeout", amount: "$95" }
    ],
    internalLineItems: [
      { label: "Parts reconciliation pending", amount: "$0" },
      { label: "Warranty paperwork hold", amount: "$0" }
    ],
    paymentNotes: "Draft invoice only. Review labor, materials, and terms before sending to the customer.",
    serviceDate: "2026-04-16",
    technician: "Field tech",
    invoiceStatus: "draft",
    paymentTerms: "Net 7",
    internalOnlyNotes: "Separate internal paperwork from customer-facing charges.",
    closeoutChecklist: [
      "Verify final parts used against truck stock.",
      "Attach serial/model support photo if needed.",
      "Complete warranty or closeout paperwork before final send."
    ]
  };
}

function buildDefaultMessageDrafts(jobLike, invoiceDraft) {
  return {
    missing: buildMissingInfoMessage(jobLike),
    estimate: buildEstimateMessage(jobLike),
    invoice: buildInvoiceMessage(invoiceDraft)
  };
}

function buildJobFromIntake(parsed, intakeForm) {
  const idBase = `${parsed.title}-${parsed.customer}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const invoiceDraft = buildDefaultInvoiceDraft(parsed);
  const nextJob = {
    id: idBase || `job-${Date.now()}`,
    ...parsed,
    status: parsed.missingInfo.length ? "missing" : "ready",
    nextAction: parsed.missingInfo.length ? "Request missing info" : "Review estimate",
    serviceWindow: parsed.urgency === "Same day" ? "Today, first available slot" : parsed.urgency === "Next day" ? "Tomorrow, scheduling pending" : "This week, scheduling pending",
    siteContact: `${parsed.customer} · phone pending`,
    accessNotes: parsed.equipment === "Rooftop unit" ? "Access coordination still needed before site visit." : "Standard residential access assumed until customer confirms otherwise.",
    estimateStatus: "draft",
    estimateVersion: "v0.1",
    customerDecision: parsed.missingInfo.length ? "Waiting on intake follow-up" : "Ready for operator review",
    recommendedOption: buildRecommendedOption(parsed),
    sourceType: intakeForm.sourceType,
    rawIntake: intakeForm.rawText,
    lineItems: suggestLineItems(parsed),
    approvedScope: buildApprovedScope(parsed),
    optionalItems: buildOptionalItems(parsed),
    invoiceDraft,
    technicianNote: "",
    waitingOn: parsed.missingInfo.length ? "customer" : "office",
    activityLog: [
      makeActivityEntry("Intake converted into a structured paperwork job.")
    ],
    assumptions: buildAssumptions(parsed),
    exclusions: buildExclusions(parsed)
  };
  return {
    ...nextJob,
    messageDrafts: buildDefaultMessageDrafts(nextJob, invoiceDraft),
    messageStatuses: { ...INITIAL_MESSAGE_STATUSES }
  };
}

function suggestLineItems(parsed) {
  const baseVisit = parsed.serviceType === "Maintenance" ? "$189" : parsed.serviceType === "Diagnostic" ? "$320" : "$149";
  const labor = parsed.serviceType === "Installation" ? "$950" : parsed.serviceType === "Maintenance" ? "$85" : "$220";
  const allowance = parsed.equipment === "Rooftop unit" ? "$140" : parsed.equipment === "Mini split" ? "$210" : "$165";
  return [
    { label: `${parsed.serviceType} visit`, amount: baseVisit },
    { label: `${parsed.equipment} labor scope`, amount: labor },
    { label: "Parts / material allowance", amount: allowance }
  ];
}

function buildAssumptions(parsed) {
  return [
    `Pricing assumes standard ${parsed.equipment.toLowerCase()} access and no hidden site constraints.`,
    `Final scope may tighten after model and serial details are confirmed.`,
    parsed.serviceType === "Diagnostic"
      ? "Repair pricing will be confirmed only after the diagnostic isolates the root cause."
      : "Consumables and common hardware are included only where clearly listed in the line items."
  ];
}

function buildExclusions(parsed) {
  return parsed.serviceType === "Installation"
    ? ["Electrical panel upgrades", "Permit coordination unless separately approved"]
    : ["Major equipment replacement", "After-hours emergency surcharge unless requested"];
}

function buildApprovedScope(parsed) {
  if (parsed.serviceType === "Maintenance") {
    return [
      `Scheduled ${parsed.equipment.toLowerCase()} maintenance visit.`,
      "Core safety and performance checks included in base scope.",
      "Customer summary before any repair or cleaning upsell is added."
    ];
  }
  if (parsed.equipment === "Rooftop unit") {
    return [
      "One rooftop unit diagnostic with standard business-hour access.",
      "Electrical and operational checks to isolate failure point.",
      "Repair quote to follow once the failure is confirmed."
    ];
  }
  return [
    `Initial ${parsed.serviceType.toLowerCase()} visit for ${parsed.equipment.toLowerCase()}.`,
    "Core troubleshooting and safe startup path included in the base draft.",
    "Major replacement or leak-repair scope remains separate until confirmed."
  ];
}

function buildOptionalItems(parsed) {
  if (parsed.serviceType === "Maintenance") {
    return [
      { label: "Blower cleaning add-on", amount: "$145" },
      { label: "Filter replacement add-on", amount: "$28" }
    ];
  }
  if (parsed.equipment === "Rooftop unit") {
    return [
      { label: "Second RTU same-trip inspection", amount: "$180" },
      { label: "Controls follow-up report", amount: "$120" }
    ];
  }
  return [
    { label: "Coil rinse after approved repair", amount: "$85" },
    { label: "Maintenance-plan follow-up", amount: "$24/mo" }
  ];
}

function buildMissingInfoMessage(job) {
  const missingList = job.missingInfo.join(", ");
  return `Hi ${job.customer} — before we send the cleanest ${job.serviceType.toLowerCase()} estimate for your ${job.equipment.toLowerCase()}, we still need: ${missingList}. Our current service window is ${job.serviceWindow}. Once you send that over, we can tighten the scope, lock the paperwork, and hold the best slot for you.`;
}

function buildEstimateMessage(job) {
  return `Hi ${job.customer} — your draft ${job.serviceType.toLowerCase()} estimate for ${job.equipment.toLowerCase()} work is ready. We kept the scope clear, separated assumptions from confirmed facts, and held the visit window at ${job.serviceWindow}. If the scope looks right, we can approve and send the customer-ready packet right away.`;
}

function buildInvoiceMessage(draft) {
  return `Hi ${draft.customer} — your invoice draft is ready based on the completed work summary from ${draft.serviceDate}. It includes the job recap, line items, and payment notes under ${draft.paymentTerms} terms. If everything looks good, we can send the final customer-ready invoice immediately.`;
}

function sumLineItems(items) {
  const total = items.reduce((sum, item) => {
    const numeric = Number(String(item.amount).replace(/[^0-9.]/g, ""));
    return sum + (Number.isFinite(numeric) ? numeric : 0);
  }, 0);
  return `$${total.toFixed(0)}`;
}

function parseRawIntake(rawText) {
  const lower = rawText.toLowerCase();
  const serviceType = lower.includes("maintenance")
    ? "Maintenance"
    : lower.includes("install")
      ? "Installation"
      : lower.includes("diagnostic")
        ? "Diagnostic"
        : "Repair";

  const equipment = lower.includes("mini split")
    ? "Mini split"
    : lower.includes("furnace")
      ? "Gas furnace"
      : lower.includes("rooftop")
        ? "Rooftop unit"
        : "Central AC";

  const urgency = lower.includes("same-day") || lower.includes("same day")
    ? "Same day"
    : lower.includes("tomorrow")
      ? "Next day"
      : "This week";

  const customer = /john/i.test(rawText)
    ? "John Smith"
    : /miller/i.test(rawText)
      ? "Miller Residence"
      : "New Customer";

  const location = /oak st/i.test(rawText)
    ? "452 Oak St, Ottawa"
    : /birch/i.test(rawText)
      ? "18 Birch Crescent, Kanata"
      : "Address pending";

  const missingInfo = [];
  if (!/model|serial|label/i.test(rawText)) missingInfo.push("Equipment model or serial");
  if (!/photo/i.test(rawText)) missingInfo.push("Photos of unit or service area");
  if (!/service|maintenance|filter|history|age|years?/i.test(rawText)) missingInfo.push("Recent service history or system age");

  const questions = [
    "Can you share the unit model or serial label?",
    "Can you send one or two photos of the equipment?",
    "Has this issue happened before or after any recent service?"
  ];

  return {
    title: inferTitle(serviceType, equipment, rawText),
    customer,
    location,
    issue: rawText.trim(),
    serviceType,
    equipment,
    urgency,
    confidence: missingInfo.length > 2 ? "Medium confidence" : "High confidence",
    missingInfo,
    questions,
    estimateSummary: `Draft a ${urgency.toLowerCase()} ${serviceType.toLowerCase()} estimate for ${equipment.toLowerCase()} work, with assumptions clearly separated from confirmed facts.`
  };
}

function buildRecommendedOption(parsed) {
  if (parsed.equipment === "Rooftop unit") {
    return "Keep roof access, escort coordination, and after-visit repair quote path explicit before sending.";
  }
  if (parsed.serviceType === "Maintenance") {
    return "Send base maintenance scope first and keep any blower cleaning or filter replacement optional.";
  }
  return "Lead with the minimum paperwork needed to approve the visit, then separate uncertain parts or follow-up work.";
}

function getWorkflowStage(job) {
  if (job.invoiceDraft?.invoiceStatus === "sent" || job.invoiceDraft?.invoiceStatus === "exported" || job.messageStatuses?.invoice === "sent") {
    return WORKFLOW_STAGES[4];
  }
  if (job.waitingOn === "field") {
    return WORKFLOW_STAGES[2];
  }
  if (job.waitingOn === "office" && (job.technicianNote?.trim() || /invoice/i.test(job.nextAction) || job.invoiceDraft?.invoiceStatus === "approved")) {
    return WORKFLOW_STAGES[3];
  }
  if (job.waitingOn === "office" || job.estimateStatus === "draft" || job.estimateStatus === "approved") {
    return WORKFLOW_STAGES[1];
  }
  return WORKFLOW_STAGES[0];
}

function getPrimaryScreenForJob(job) {
  const stage = getWorkflowStage(job).id;
  if (stage === "intake") return job.status === "urgent" ? "new-intake" : "intake-analysis";
  if (stage === "fieldwork") return "tech-note";
  if (stage === "invoicing" || stage === "sent") return "invoice";
  return "estimate";
}

function getLeadJobForStage(jobs, stageId) {
  return jobs.find((job) => getWorkflowStage(job).id === stageId) ?? jobs[0];
}

function getTechnicianLeadJob(jobs) {
  return getLeadJobForStage(jobs, "fieldwork")
    ?? getLeadJobForStage(jobs, "invoicing")
    ?? getLeadJobForStage(jobs, "approval")
    ?? jobs[0];
}

function getNextJobTransition(job) {
  const stage = getWorkflowStage(job).id;
  if (stage === "intake") {
    return {
      label: "Mark info requested",
      icon: "person_alert",
      log: "Marked as waiting on customer intake details.",
      apply: (current) => ({
        ...current,
        waitingOn: "customer",
        nextAction: "Waiting on customer reply"
      })
    };
  }
  if (stage === "approval") {
    return {
      label: "Mark approved",
      icon: "task_alt",
      log: "Estimate approved for field execution.",
      apply: (current) => ({
        ...current,
        status: "ready",
        estimateStatus: current.estimateStatus === "draft" ? "approved" : current.estimateStatus,
        waitingOn: "field",
        nextAction: "Capture field completion note"
      })
    };
  }
  if (stage === "fieldwork") {
    return {
      label: "Mark field done",
      icon: "construction",
      log: "Field work marked complete and moved to invoice review.",
      apply: (current) => ({
        ...current,
        waitingOn: "office",
        nextAction: "Review invoice before send"
      })
    };
  }
  if (stage === "invoicing") {
    return {
      label: "Mark sent",
      icon: "send",
      log: "Invoice marked sent to customer.",
      apply: (current) => ({
        ...current,
        waitingOn: "customer",
        invoiceDraft: {
          ...current.invoiceDraft,
          invoiceStatus: "sent"
        },
        messageStatuses: {
          ...current.messageStatuses,
          invoice: "sent"
        },
        nextAction: "Waiting on payment or customer confirmation"
      })
    };
  }
  return {
    label: "Keep as sent",
    icon: "done_all",
    log: "Confirmed as already sent.",
    apply: (current) => current
  };
}

function makeActivityEntry(text) {
  return {
    ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    text
  };
}

function appendActivityEntry(job, text) {
  return {
    ...job,
    activityLog: [makeActivityEntry(text), ...(job.activityLog ?? [])].slice(0, 8)
  };
}

function getJobBlocker(job) {
  const stage = getWorkflowStage(job).id;
  if (stage === "intake") {
    return job.missingInfo[0] ?? "Messy intake still needs structure";
  }
  if (stage === "approval") {
    return job.customerDecision || "Estimate still needs approval";
  }
  if (stage === "fieldwork") {
    return job.technicianNote?.trim() ? "Field note captured, invoice still not cleaned" : "Technician note still missing";
  }
  if (stage === "invoicing") {
    return job.invoiceDraft?.invoiceStatus === "approved" ? "Invoice is approved but not sent" : "Invoice still needs office review";
  }
  return "Nothing blocking send";
}

function getPrimaryActionLabel(job) {
  const stage = getWorkflowStage(job).id;
  if (stage === "intake") return "Finish intake";
  if (stage === "approval") return "Review estimate";
  if (stage === "fieldwork") return "Close from field";
  if (stage === "invoicing") return "Review invoice";
  return "Open sent packet";
}

function getJobOperatorSummary(job) {
  const stage = getWorkflowStage(job).id;
  if (stage === "intake") {
    return `${job.customer} is waiting on cleaner intake and missing facts before paperwork can move.`;
  }
  if (stage === "approval") {
    return `Estimate is in office review. Keep the scope clear and move approval without reopening the whole job.`;
  }
  if (stage === "fieldwork") {
    return `Work likely happened or is happening now. Capture the rough note fast and let office clean it later.`;
  }
  if (stage === "invoicing") {
    return `The job is close enough to bill. Keep customer charges clear and leave internal closeout internal.`;
  }
  return `Paperwork is already out. Only reopen if the customer or office actually needs a change.`;
}

function inferTitle(serviceType, equipment, rawText) {
  if (/not cooling/i.test(rawText)) return "AC Not Cooling";
  if (/maintenance/i.test(rawText)) return "Furnace Maintenance";
  if (/rooftop/i.test(rawText)) return "Rooftop Unit Diagnostic";
  return `${equipment} ${serviceType}`;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : normalizeState(INITIAL_STATE);
  } catch {
    return normalizeState(INITIAL_STATE);
  }
}

function normalizeState(input) {
  const base = input ?? INITIAL_STATE;
  const legacyInvoiceDraft = base.invoiceDraft;
  const legacyMessageDrafts = base.messageDrafts;
  const legacyMessageStatuses = base.messageStatuses;
  const legacyTechnicianNote = base.technicianNote;
  return {
    ...INITIAL_STATE,
    ...base,
    jobs: (base.jobs ?? INITIAL_STATE.jobs).map((job) => ({
      invoiceDraft: buildDefaultInvoiceDraft(job),
      messageDrafts: buildDefaultMessageDrafts(job, job.invoiceDraft ?? legacyInvoiceDraft ?? buildDefaultInvoiceDraft(job)),
      messageStatuses: { ...INITIAL_MESSAGE_STATUSES },
      technicianNote: "",
      waitingOn: inferWaitingOn(job, legacyMessageStatuses, legacyTechnicianNote, legacyInvoiceDraft),
      activityLog: job.activityLog?.length ? job.activityLog : [makeActivityEntry("Loaded existing paperwork job.")],
      serviceWindow: "This week, scheduling pending",
      siteContact: `${job.customer ?? "Customer"} · phone pending`,
      accessNotes: "Standard site access assumed until confirmed.",
      estimateStatus: "draft",
      estimateVersion: "v0.1",
      customerDecision: "Needs review",
      recommendedOption: "Lead with the minimum paperwork needed to move the job forward.",
      approvedScope: [],
      optionalItems: [],
      ...(job.id === "oak" && legacyMessageDrafts ? { messageDrafts: legacyMessageDrafts } : {}),
      ...(job.id === "oak" && legacyMessageStatuses ? { messageStatuses: legacyMessageStatuses } : {}),
      ...(job.id === "oak" && legacyTechnicianNote ? { technicianNote: legacyTechnicianNote } : {}),
      ...(job.id === "oak" && legacyInvoiceDraft ? { invoiceDraft: legacyInvoiceDraft } : {}),
      ...job
    }))
  };
}

function advanceStatus(current, order) {
  const currentIndex = order.indexOf(current);
  if (currentIndex === -1) return order[0];
  return order[Math.min(currentIndex + 1, order.length - 1)];
}

function inferWaitingOn(job, legacyMessageStatuses, legacyTechnicianNote, legacyInvoiceDraft) {
  if (job.waitingOn) return job.waitingOn;
  const invoiceStatus = job.invoiceDraft?.invoiceStatus ?? legacyInvoiceDraft?.invoiceStatus;
  const invoiceMessageStatus = job.messageStatuses?.invoice ?? legacyMessageStatuses?.invoice;
  const technicianNote = job.technicianNote ?? legacyTechnicianNote;
  if (invoiceStatus === "sent" || invoiceStatus === "exported" || invoiceMessageStatus === "sent") {
    return "customer";
  }
  if (technicianNote?.trim()) {
    return "office";
  }
  if (job.estimateStatus === "approved") {
    return "field";
  }
  if (job.missingInfo?.length) {
    return "customer";
  }
  return "office";
}

function useMediaQuery(query) {
  const getMatches = React.useCallback(() => window.matchMedia(query).matches, [query]);
  const [matches, setMatches] = React.useState(getMatches);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

function formatStatusLabel(status) {
  switch (status) {
    case "approved":
      return "Approved";
    case "sent":
      return "Sent";
    case "exported":
      return "Exported";
    case "queued":
      return "Queued";
    default:
      return "Draft";
  }
}

function getStatusTone(status) {
  if (status === "approved" || status === "queued") return "soft";
  if (status === "sent" || status === "exported") return "ready";
  return "urgent";
}

function getAdvanceLabel(status, order, subject) {
  const next = advanceStatus(status, order);
  if (next === status) {
    return subject === "message" ? "Message sent" : `${subject[0].toUpperCase()}${subject.slice(1)} done`;
  }
  if (next === "approved") return `Approve ${subject}`;
  if (next === "queued") return "Queue send";
  if (next === "sent") return `Mark ${subject} sent`;
  if (next === "exported") return `Mark ${subject} exported`;
  return `Advance ${subject}`;
}

function getAdvanceIcon(status, order) {
  const next = advanceStatus(status, order);
  if (next === "approved") return "task_alt";
  if (next === "queued") return "schedule_send";
  if (next === "sent") return "send";
  if (next === "exported") return "ios_share";
  return "task_alt";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
