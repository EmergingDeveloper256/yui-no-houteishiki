"use client";

import "./globals.css";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--background)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <div className="ai-loader"></div>
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <p
          className="scanning-text"
          style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
        >
          CORE_AI_COMPUTING...
        </p>
        <div
          style={{
            width: "200px",
            height: "2px",
            background: "rgba(0, 242, 255, 0.1)",
            margin: "0 auto",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="progress-bar"></div>
        </div>
      </div>

      <style jsx>{`
        .ai-loader {
          width: 60px;
          height: 60px;
          border: 1px solid var(--accent);
          border-radius: 2px;
          position: relative;
          animation: box-glow 2s infinite ease-in-out;
        }
        .ai-loader::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px solid var(--accent-alt);
          animation: box-rotate 4s infinite linear;
        }
        .progress-bar {
          width: 100%;
          height: 100%;
          background: var(--accent);
          position: absolute;
          left: -100%;
          animation: progress 2s infinite ease-in-out;
        }
        @keyframes box-glow {
          0%,
          100% {
            box-shadow: 0 0 10px var(--accent-glow);
            opacity: 0.5;
          }
          50% {
            box-shadow: 0 0 30px var(--accent-glow);
            opacity: 1;
          }
        }
        @keyframes box-rotate {
          100% {
            transform: rotate(180deg);
          }
        }
        @keyframes progress {
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
