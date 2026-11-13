"use client";

import { FormEvent, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };
type TaskRunResult = { id: string; status: string; selectedMode: string };
type ChatResult = {
  answer?: string;
  viraMode?: "on" | "off";
  observation?: { state?: string; status?: number | null };
  runtimeCheck?: { state: string; taskRunId?: string; mode?: string; status?: string; verification?: string } | null;
  taskRun?: TaskRunResult;
  status?: string;
  modelInvoked?: boolean;
  error?: string;
  note?: string;
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [viraMode, setViraMode] = useState<"off" | "on">("off");
  const [observe, setObserve] = useState(false);
  const [showRuntimeCheck, setShowRuntimeCheck] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || busy) return;
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "content-type": "application/json", "idempotency-key": crypto.randomUUID() },
        body: JSON.stringify({ viraMode, observe, showRuntimeCheck, messages: nextMessages.slice(-20) }),
      });
      const result = await response.json() as ChatResult;
      if (result.answer && response.ok) setMessages([...nextMessages, { role: "assistant", content: result.answer }]);
      if (result.status === "TASKRUN_ACCEPTED_PENDING_VERIFIED_CHAT_RESPONSE") {
        setNotice(`AUTO TaskRun admitted (${result.taskRun?.selectedMode ?? "mode pending"}; ${result.taskRun?.status ?? "pending"}). No verified model answer was returned. TaskRun ID: ${result.taskRun?.id ?? "unknown"}. The example never bypasses runtime verification.`);
      } else if (result.status === "TASKRUN_NOT_ADMITTED") {
        setNotice("AUTO TaskRun was not admitted. No model call was made.");
      } else if (!response.ok) {
        setNotice(`Request stopped: ${result.error ?? result.status ?? `HTTP ${response.status}`}.`);
      } else if (result.observation?.state && result.observation.state !== "not_requested") {
        setNotice(`Baseline completed. Optional observation: ${result.observation.state}.`);
      }
      if (result.runtimeCheck) {
        setNotice(`TaskRun ${result.runtimeCheck.taskRunId ?? ""}: ${result.runtimeCheck.mode ?? ""} / ${result.runtimeCheck.status ?? ""}. Post-model verification is not exposed by this public sample; execution status is not a verified answer.`);
      }
    } catch {
      setNotice("The request could not be completed.");
    } finally { setBusy(false); }
  }

  return (
    <main className="shell">
      <header className="header">
        <a className="brand" href="https://tryvira.xyz" aria-label="Vira home">vira</a>
        <div><p className="eyebrow">CANONICAL TASKRUN INTEGRATION EXAMPLE</p><h1>Support assistant</h1></div>
        <span className="access">Under active development</span>
      </header>
      <section className="controls" aria-label="Chat settings">
        <fieldset className="mode-picker">
          <legend>Vira behavior</legend>
          <div className="segmented">
            <button type="button" aria-pressed={viraMode === "off"} onClick={() => { setViraMode("off"); setShowRuntimeCheck(false); }}>OFF · baseline</button>
            <button type="button" aria-pressed={viraMode === "on"} onClick={() => setViraMode("on")}>ON · AUTO TaskRun</button>
          </div>
        </fieldset>
        <label className="check-option">
          <input type="checkbox" checked={observe} disabled={viraMode === "on"} onChange={(event) => setObserve(event.target.checked)} />
          <span><strong>Send baseline observation</strong><small>Optional, metadata-only, for OFF baseline.</small></span>
        </label>
        <label className={`check-option ${viraMode === "off" ? "muted" : ""}`}>
          <input type="checkbox" checked={showRuntimeCheck} disabled={viraMode === "off"} onChange={(event) => setShowRuntimeCheck(event.target.checked)} />
          <span><strong>Show TaskRun state</strong><small>Admission/status, not a verified chatbot answer.</small></span>
        </label>
      </section>
      <section className="chat" aria-label="Support chat">
        {messages.length === 0 ? (
          <div className="empty"><h2>Two paths, without inventing success.</h2><p>OFF calls your configured model. ON submits AUTO TaskRun and shows its real status. A verified chatbot response requires the full provider and post-model verification handoff, which this public sample does not claim.</p></div>
        ) : (
          <ol className="messages" aria-live="polite">
            {messages.map((message, index) => <li className={message.role} key={`${index}-${message.role}`}><span>{message.role === "user" ? "You" : "Assistant"}</span><p>{message.content}</p></li>)}
            {busy && <li className="assistant"><span>Assistant</span><p className="pending">Working…</p></li>}
          </ol>
        )}
        {notice && <p className="notice" role="status">{notice}</p>}
        <form className="composer" onSubmit={submit}>
          <label className="sr-only" htmlFor="message">Message</label>
          <textarea id="message" value={input} onChange={(event) => setInput(event.target.value)} maxLength={4000} placeholder="Ask a support question…" rows={2} required />
          <button type="submit" disabled={busy || !input.trim()}>{busy ? "Sending…" : "Send"}</button>
        </form>
        <p className="footnote">Local-only integration sample. No tools or external actions enabled. Add application authentication and a verified answer retrieval contract before public deployment.</p>
      </section>
    </main>
  );
}
