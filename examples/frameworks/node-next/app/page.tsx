"use client";

import { FormEvent, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ChatResult = {
  answer?: string;
  viraMode?: "on" | "off";
  observation?: { state?: string; status?: number | null };
  runtimeCheck?: { state: string; requestId: string; projectionDigest: string } | null;
  status?: string;
  modelInvoked?: boolean;
  error?: string;
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
        headers: {
          "content-type": "application/json",
          "idempotency-key": crypto.randomUUID(),
        },
        body: JSON.stringify({ viraMode, observe, showRuntimeCheck, messages: nextMessages.slice(-20) }),
      });
      const result = await response.json() as ChatResult;
      if (result.answer) setMessages([...nextMessages, { role: "assistant", content: result.answer }]);
      if (result.status === "NO_ACTIVE_PROJECTION") {
        setNotice("Vira did not return an active behavior projection, so the model was not called. Configure an eligible released Behavior Point and try again.");
      } else if (!response.ok) {
        setNotice(`Request stopped: ${result.error ?? result.status ?? `HTTP ${response.status}`}.`);
      } else if (result.observation?.state && result.observation.state !== "not_requested") {
        setNotice(`Reply completed. Optional observation: ${result.observation.state}${result.observation.status ? ` (HTTP ${result.observation.status})` : ""}.`);
      }
      if (result.runtimeCheck) {
        setNotice(`Runtime returned an active projection (${result.runtimeCheck.projectionDigest}). Request ID: ${result.runtimeCheck.requestId}. This confirms the Vira response used for this turn; it does not prove the model followed it.`);
      }
    } catch {
      setNotice("The chat request could not be completed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell">
      <header className="header">
        <a className="brand" href="https://tryvira.xyz" aria-label="Vira home">V<span>·</span></a>
        <div><p className="eyebrow">INTERACTIVE INTEGRATION EXAMPLE</p><h1>Support assistant</h1></div>
        <span className="access">Under active development</span>
      </header>

      <section className="controls" aria-label="Chat settings">
        <fieldset className="mode-picker">
          <legend>Vira behavior</legend>
          <div className="segmented">
            <button type="button" aria-pressed={viraMode === "off"} onClick={() => { setViraMode("off"); setShowRuntimeCheck(false); }}>OFF · baseline</button>
            <button type="button" aria-pressed={viraMode === "on"} onClick={() => setViraMode("on")}>ON · governed</button>
          </div>
        </fieldset>
        <label className="check-option">
          <input type="checkbox" checked={observe} onChange={(event) => setObserve(event.target.checked)} />
          <span><strong>Send observation</strong><small>Optional, metadata only; needs a connected system.</small></span>
        </label>
        <label className={`check-option ${viraMode === "off" ? "muted" : ""}`}>
          <input type="checkbox" checked={showRuntimeCheck} disabled={viraMode === "off"} onChange={(event) => setShowRuntimeCheck(event.target.checked)} />
          <span><strong>Show runtime check</strong><small>Vira ON always gates the model on an active projection.</small></span>
        </label>
      </section>

      <section className="chat" aria-label="Support chat">
        {messages.length === 0 ? (
          <div className="empty"><div className="spark">✳</div><h2>Try the same request both ways.</h2><p>OFF calls the model directly. ON resolves Vira behavior first and stops if no active projection is returned.</p></div>
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
          <button type="submit" disabled={busy || !input.trim()}>{busy ? "Sending…" : "Send"}<span aria-hidden="true"> ↗</span></button>
        </form>
        <p className="footnote">No tools or external actions are enabled in this demo. Add application authentication before exposing the route.</p>
      </section>
    </main>
  );
}
