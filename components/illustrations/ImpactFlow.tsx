/**
 * Documents → AI engine → structured outputs, with coins and a bar chart.
 * Flat, soft-shadowed shapes to match the light Figma panel.
 */
export function ImpactFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 380" className={className} role="img" aria-label="Documents processed by an AI engine into structured outputs">
      <defs>
        <filter id="if-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0c2631" floodOpacity="0.14" />
        </filter>
        <linearGradient id="if-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef4f6" />
        </linearGradient>
        <radialGradient id="if-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#5fe3f6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5fe3f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* connectors */}
      <g fill="none" stroke="#00b4d8" strokeWidth="1.6" strokeLinecap="round">
        <path d="M150 170 H222" strokeOpacity="0.3" />
        <path d="M150 170 H222" strokeDasharray="4 8" className="animate-dash" />
        {[90, 170, 250].map((y, i) => (
          <g key={y}>
            <path d={`M338 170 H370 V${y} H410`} strokeOpacity="0.3" />
            <path d={`M338 170 H370 V${y} H410`} strokeDasharray="4 8" className="animate-dash" style={{ animationDelay: `${i * 0.2}s` }} />
          </g>
        ))}
        <path d="M280 228 V280" strokeOpacity="0.3" strokeDasharray="3 5" />
      </g>

      {/* document stack */}
      <g filter="url(#if-shadow)">
        {[16, 8, 0].map((o) => (
          <g key={o} transform={`translate(${70 + o} ${118 + o})`}>
            <rect width="72" height="92" rx="5" fill="url(#if-card)" stroke="#c7d6db" />
          </g>
        ))}
        <g transform="translate(70 118)" stroke="#9fb6bd" strokeWidth="2" strokeLinecap="round">
          {[18, 28, 38, 48, 58, 68].map((y, i) => <line key={y} x1="12" y1={y} x2={i % 2 ? 48 : 60} y2={y} />)}
        </g>
      </g>

      {/* AI engine */}
      <ellipse cx="280" cy="168" rx="90" ry="70" fill="url(#if-glow)" className="animate-glow" />
      <g filter="url(#if-shadow)">
        <rect x="222" y="112" width="116" height="116" rx="14" fill="#f7fbfc" stroke="#c7e3ea" />
        <rect x="246" y="136" width="68" height="68" rx="10" fill="#fff" stroke="#00b4d8" strokeWidth="1.5" />
        <g stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round">
          {[150, 160, 170, 180, 190].map((v) => (
            <g key={v}>
              <line x1="238" y1={v} x2="246" y2={v} />
              <line x1="314" y1={v} x2="322" y2={v} />
              <line x1={v + 110} y1="128" x2={v + 110} y2="136" />
              <line x1={v + 110} y1="204" x2={v + 110} y2="212" />
            </g>
          ))}
        </g>
        <text x="280" y="176" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="600" fontSize="18" fill="#0c2631">AI</text>
      </g>

      {/* outputs */}
      {[90, 170, 250].map((y, i) => (
        <g key={y} filter="url(#if-shadow)">
          <rect x="410" y={y - 24} width="86" height="48" rx="8" fill="url(#if-card)" stroke="#c7d6db" />
          {i === 2 ? (
            <path d={`M440 ${y} l8 8 16-16`} fill="none" stroke="#0c2631" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <g stroke="#b6c8ce" strokeWidth="3" strokeLinecap="round">
              <line x1="426" y1={y - 6} x2="478" y2={y - 6} />
              <line x1="426" y1={y + 6} x2="462" y2={y + 6} />
            </g>
          )}
        </g>
      ))}

      {/* coins + chart */}
      <g transform="translate(210 286)">
        {[0, 18, 36, 54].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="18" rx="12" ry="6" fill="#dfe8eb" stroke="#a9bcc2" />
            <ellipse cx={x} cy="14" rx="12" ry="6" fill="#f3f7f8" stroke="#a9bcc2" />
          </g>
        ))}
        <g>
          <rect x="68" y="4" width="20" height="22" rx="3" fill="#f3f7f8" stroke="#a9bcc2" />
          <rect x="70" y="-2" width="16" height="10" rx="3" fill="#e6eef0" stroke="#a9bcc2" />
        </g>
      </g>
      <g transform="translate(330 270)" stroke="#2b4a55" strokeWidth="2">
        <line x1="0" y1="44" x2="64" y2="44" />
        {[[6, 6], [18, 16], [30, 22], [42, 30], [54, 34]].map(([x, top]) => (
          <rect key={x} x={x} y={top} width="8" height={44 - top} fill="#e9f0f2" strokeWidth="1.5" />
        ))}
      </g>
    </svg>
  );
}
