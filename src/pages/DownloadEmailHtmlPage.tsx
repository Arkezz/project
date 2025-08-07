import React, { useEffect, useState } from "react";
import { render, pretty } from "@react-email/render";
import VerificationEmail from "../../emails/VerificationEmail";
import PasswordReset from "../../emails/PasswordReset";
import LoginLocation from "../../emails/LoginLocation";

const EMAIL_TEMPLATES = [
  {
    label: "Verification Email",
    component: <VerificationEmail />,
    filename: "VerificationEmail.html",
  },
  {
    label: "Password Reset Email",
    component: <PasswordReset />,
    filename: "PasswordReset.html",
  },
  {
    label: "Login Location Email",
    component: (
      <LoginLocation
        loginInfo={{
          location: "New York, USA",
          ip: "127.0.0.1",
          time: "2025-08-07 12:00",
        }}
      />
    ),
    filename: "LoginLocation.html",
  },
];

export default function DownloadEmailHtmlPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [html, setHtml] = useState<string>("");
  const [plainText, setPlainText] = useState<string>("");
  const [tmpl, setTmpl] = useState<string>("");
  const [view, setView] = useState<"preview" | "html" | "text" | "tmpl">(
    "preview"
  );

  useEffect(() => {
    (async () => {
      const html = await pretty(
        await render(EMAIL_TEMPLATES[selectedIdx].component)
      );
      setHtml(html);
      const text = await render(EMAIL_TEMPLATES[selectedIdx].component, {
        plainText: true,
      });
      setPlainText(text);
      let goTmpl = `{{define "email"}}
${html}
{{end}}`;
      setTmpl(goTmpl);
    })();
  }, [selectedIdx]);

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = EMAIL_TEMPLATES[selectedIdx].filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Download Email HTML</h2>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="email-select" style={{ marginRight: 8 }}>
          Choose email template:
        </label>
        <select
          id="email-select"
          value={selectedIdx}
          onChange={(e) => setSelectedIdx(Number(e.target.value))}
        >
          {EMAIL_TEMPLATES.map((tpl, idx) => (
            <option value={idx} key={tpl.label}>
              {tpl.label}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleDownload} style={{ marginBottom: 24 }}>
        Download Email HTML
      </button>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setView("preview")}
          style={{
            marginRight: 8,
            fontWeight: view === "preview" ? "bold" : undefined,
          }}
        >
          Preview
        </button>
        <button
          onClick={() => setView("html")}
          style={{
            marginRight: 8,
            fontWeight: view === "html" ? "bold" : undefined,
          }}
        >
          Raw HTML
        </button>
        <button
          onClick={() => setView("text")}
          style={{
            marginRight: 8,
            fontWeight: view === "text" ? "bold" : undefined,
          }}
        >
          Plain Text
        </button>
        <button
          onClick={() => setView("tmpl")}
          style={{ fontWeight: view === "tmpl" ? "bold" : undefined }}
        >
          Go .tmpl
        </button>
      </div>
      {view === "preview" ? (
        <iframe
          srcDoc={html}
          style={{ width: "100%", height: 400, border: "1px solid #ccc" }}
          title="Email Preview"
        />
      ) : view === "html" ? (
        <textarea
          value={html}
          readOnly
          style={{
            width: "100%",
            height: 400,
            border: "1px solid #ccc",
            fontFamily: "monospace",
            fontSize: 12,
          }}
        />
      ) : view === "text" ? (
        <textarea
          value={plainText}
          readOnly
          style={{
            width: "100%",
            height: 400,
            border: "1px solid #ccc",
            fontFamily: "monospace",
            fontSize: 14,
            background: "#f9f9f9",
          }}
        />
      ) : (
        <textarea
          value={tmpl}
          readOnly
          style={{
            width: "100%",
            height: 400,
            border: "1px solid #ccc",
            fontFamily: "monospace",
            fontSize: 14,
            background: "#f3f3e6",
          }}
        />
      )}
    </div>
  );
}
