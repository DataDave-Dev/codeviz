"use client";

type Props = {
  code: string;
  language: string;
  loading: boolean;
  languages: string[];
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onAnalyze: () => void;
};

export default function CodeInput({
  code,
  language,
  loading,
  languages,
  onCodeChange,
  onLanguageChange,
  onAnalyze,
}: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <label htmlFor="language" style={{ fontSize: 14 }}>
          Lenguaje
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: 6 }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <button
          onClick={onAnalyze}
          disabled={loading}
          style={{
            marginLeft: "auto",
            padding: "8px 16px",
            borderRadius: 6,
            background: loading ? "#475569" : "#6366f1",
            color: "white",
            border: "none",
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Analizando…" : "Analizar"}
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        spellCheck={false}
        placeholder="Pega tu código aquí…"
        style={{
          width: "100%",
          height: 320,
          padding: 12,
          fontFamily: "monospace",
          fontSize: 13,
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          resize: "vertical",
        }}
      />
    </div>
  );
}
