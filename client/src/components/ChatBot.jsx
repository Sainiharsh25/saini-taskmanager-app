import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me about your tasks, deadlines, or project progress." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-6),
          userId: user.id,        // ← fixed: was user._id
          role: user.role,
        }),
      });

      const data = await res.json();
      setMessages([...updatedHistory, { role: "assistant", content: data.reply }]);

    } catch (err) {
      setMessages([...updatedHistory, { role: "assistant", content: "Error getting response. Try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 1000,
          width: 52, height: 52, borderRadius: "50%",
          background: "#534AB7", color: "#fff", border: "none",
          fontSize: 22, cursor: "pointer",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: 88, right: 24, zIndex: 1000,
          width: 340, height: 460, background: "#fff",
          borderRadius: 16, border: "1px solid #e5e7eb",
          display: "flex", flexDirection: "column", overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}>

          <div style={{
            padding: "12px 16px", borderBottom: "1px solid #e5e7eb",
            fontWeight: 500, fontSize: 14, background: "#534AB7", color: "#fff"
          }}>
            AI Project Assistant
          </div>

          <div style={{
            flex: 1, overflowY: "auto", padding: 12,
            display: "flex", flexDirection: "column", gap: 8
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "#534AB7" : "#f3f4f6",
                color: m.role === "user" ? "#fff" : "#111",
                padding: "8px 12px", borderRadius: 12, maxWidth: "85%",
                fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap",
              }}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", color: "#888", fontSize: 13 }}>
                Thinking...
              </div>
            )}
          </div>

          <div style={{
            padding: 10, borderTop: "1px solid #e5e7eb",
            display: "flex", gap: 8
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about your tasks..."
              style={{
                flex: 1, padding: "8px 10px", borderRadius: 8,
                border: "1px solid #e5e7eb", fontSize: 13, outline: "none"
              }}
            />
            <button
              onClick={send}
              style={{
                padding: "8px 14px", background: "#534AB7",
                color: "#fff", border: "none", borderRadius: 8,
                cursor: "pointer", fontSize: 13
              }}
            >
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}