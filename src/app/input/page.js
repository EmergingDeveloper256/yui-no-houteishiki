"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TOPICS } from "../../utils/topics";
import "../globals.css";

function InputForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "love";

  const [selfName, setSelfName] = useState("");
  const [selfDob, setSelfDob] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerDob, setPartnerDob] = useState("");

  const [isScanning, setIsScanning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selfDob) return alert("あなたの生年月日を入力してください");

    setIsScanning(true);
    setTimeout(() => {
      router.push(
        `/result?type=${type}&selfDob=${selfDob}&selfName=${encodeURIComponent(selfName)}&partnerDob=${partnerDob}&partnerName=${encodeURIComponent(partnerName)}`,
      );
    }, 1500);
  };

  const topic = TOPICS[type] || TOPICS.love;

  return (
    <div
      className="mystic-card"
      style={{ maxWidth: "700px", width: "100%", margin: "0 auto" }}
    >
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1.5rem",
          textAlign: "right",
        }}
      >
        <p
          className="scanning-label"
          style={{
            fontSize: "0.6rem",
            color: isScanning ? "var(--accent)" : "rgba(212, 175, 55, 0.4)",
          }}
        >
          {isScanning ? "● CORE_PROCESSING" : "○ INTERFACE_READY"}
        </p>
      </div>

      <header style={{ marginBottom: "2rem" }}>
        <div className="scanning-label" style={{ marginBottom: "0.5rem" }}>
          Establishing Data Channel...
        </div>
        <h1
          className="title-mystic"
          style={{
            textAlign: "left",
            marginBottom: "0.5rem",
            fontSize: "1.5rem",
          }}
        >
          {topic.label} / {topic.mode}
        </h1>
        <p
          style={{
            fontSize: "0.85rem",
            opacity: 0.8,
            lineHeight: "1.6",
            color: "var(--foreground)",
          }}
        >
          あなたの生体データを同期し、九星気学による精密な演算を開始します。
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
        {/* Your Info */}
        <section
          style={{
            padding: "1rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(212, 175, 55, 0.1)",
          }}
        >
          <h3
            className="scanning-label"
            style={{
              marginBottom: "1rem",
              fontSize: "0.7rem",
              borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
              paddingBottom: "0.4rem",
            }}
          >
            &gt; YOUR_PROFILE (あなた)
          </h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label style={{ fontSize: "0.75rem", color: "var(--accent)" }}>
                お名前 / Identifier
              </label>
              <input
                type="text"
                value={selfName}
                onChange={(e) => setSelfName(e.target.value)}
                placeholder="あなた"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  padding: "0.8rem",
                  color: "#fff",
                  outline: "none",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <label style={{ fontSize: "0.75rem", color: "var(--accent)" }}>
                生年月日 / Birthdate *
              </label>
              <input
                type="date"
                required
                value={selfDob}
                onChange={(e) => setSelfDob(e.target.value)}
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                  padding: "0.8rem",
                  color: "#fff",
                  outline: "none",
                  colorScheme: "dark",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        </section>

        {/* Partner Info */}
        {["love", "affair"].includes(type) && (
          <section
            style={{
              padding: "1rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(212, 175, 55, 0.1)",
            }}
          >
            <h3
              className="scanning-label"
              style={{
                marginBottom: "1rem",
                fontSize: "0.7rem",
                borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                paddingBottom: "0.4rem",
              }}
            >
              &gt; TARGET_PROFILE (相手)
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <label style={{ fontSize: "0.75rem", color: "var(--accent)" }}>
                  お名前 / Alias
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="あの人"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    padding: "0.8rem",
                    color: "#fff",
                    outline: "none",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <label style={{ fontSize: "0.75rem", color: "var(--accent)" }}>
                  生年月日 / Birthdate
                </label>
                <input
                  type="date"
                  value={partnerDob}
                  onChange={(e) => setPartnerDob(e.target.value)}
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    padding: "0.8rem",
                    color: "#fff",
                    outline: "none",
                    colorScheme: "dark",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          </section>
        )}

        <button
          type="submit"
          className="mystic-button"
          disabled={isScanning}
          style={{ width: "100%" }}
        >
          {isScanning ? "演算プロトコル実行中..." : "鑑定を開始する"}
        </button>
      </form>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link
          href="/"
          style={{
            fontSize: "0.7rem",
            color: "rgba(212, 175, 55, 0.4)",
            textDecoration: "underline",
          }}
        >
          &lt; RETURN_TO_SYSTEM_CORE
        </Link>
      </div>

      {isScanning && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(5, 5, 16, 0.9)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="flicker"
            style={{
              color: "var(--accent)",
              letterSpacing: "4px",
              fontWeight: "bold",
            }}
          >
            DATA_SYNCHRONIZING...
          </div>
          <div
            style={{
              width: "140px",
              height: "1px",
              background: "var(--accent)",
              marginTop: "15px",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default function InputPage() {
  return (
    <main
      style={{
        padding: "2rem 1rem",
        maxWidth: "900px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Suspense
        fallback={
          <div className="scanning-label" style={{ textAlign: "center" }}>
            INITIALIZING...
          </div>
        }
      >
        <InputForm />
      </Suspense>
    </main>
  );
}
