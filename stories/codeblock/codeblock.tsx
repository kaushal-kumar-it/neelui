'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#0b0b0d',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid #27272a',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.65rem 0.9rem',
          background: 'linear-gradient(90deg, #18181b 0%, #111827 55%, #1f1d2b 100%)',
          alignItems: 'center',
          borderBottom: '1px solid #27272a',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '999px', backgroundColor: '#ef4444' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '999px', backgroundColor: '#f59e0b' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '999px', backgroundColor: '#22c55e' }} />
          <span style={{ color: '#d4d4d8', fontSize: '0.75rem', marginLeft: '0.4rem', letterSpacing: '0.08em' }}>TSX</span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            background: copied ? '#4ade80' : '#27272a',
            color: copied ? '#052e16' : '#f4f4f5',
            border: '1px solid #3f3f46',
            borderRadius: '8px',
            padding: '6px 10px',
            cursor: 'pointer',
            fontSize: '0.74rem',
            fontWeight: 600,
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div style={{ overflowX: 'auto', maxWidth: '100%', width: '100%', boxSizing: 'border-box', WebkitOverflowScrolling: 'touch' }}>
        <SyntaxHighlighter
          language="tsx"
          style={vscDarkPlus}
          showLineNumbers
          wrapLongLines={false}
          customStyle={{ margin: 0, padding: '0.95rem 1rem', fontSize: '0.8rem', minWidth: '100%', background: '#0b0b0d' }}
          lineNumberStyle={{ minWidth: '2em', color: '#52525b' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};