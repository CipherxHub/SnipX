'use client';

import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import { toPng } from 'html-to-image';

const themes = [
  {
    value: 'mono',
    label: 'Mono',
    bg: '#1E1E1E',
    text: '#FFFFFF',
    icon: '🎨',
    codeTheme: 'tomorrow',
    syntax: {
      keyword: '#569CD6',
      string: '#CE9178',
      function: '#DCDCAA',
      comment: '#6A9955',
    },
  },
  {
    value: 'bitmap',
    label: 'Bitmap',
    bg: '#2B2B2B',
    text: '#F8F8F2',
    icon: '🖼️',
    codeTheme: 'okaidia',
    syntax: {
      keyword: '#FF79C6',
      string: '#F1FA8C',
      function: '#50FA7B',
      comment: '#6272A4',
    },
  },
  {
    value: 'noir',
    label: 'Noir',
    bg: '#1A1A1A',
    text: '#E0E0E0',
    icon: '🌑',
    codeTheme: 'twilight',
    syntax: {
      keyword: '#CC7832',
      string: '#6A8759',
      function: '#FFC66D',
      comment: '#808080',
    },
  },
  {
    value: 'ice',
    label: 'Ice',
    bg: '#E3F2FD',
    text: '#263238',
    icon: '❄️',
    codeTheme: 'coy',
    syntax: {
      keyword: '#0033B3',
      string: '#067D17',
      function: '#00627A',
      comment: '#8C8C8C',
    },
  },
  {
    value: 'sand',
    label: 'Sand',
    bg: '#F5E6D3',
    text: '#2D2006',
    icon: '🏖️',
    codeTheme: 'solarizedlight',
    syntax: {
      keyword: '#93A1A1',
      string: '#2AA198',
      function: '#268BD2',
      comment: '#657B83',
    },
  },
  {
    value: 'forest',
    label: 'Forest',
    bg: '#2A3B2D',
    text: '#E8F5E9',
    icon: '🌲',
    codeTheme: 'dark',
    syntax: {
      keyword: '#95C07C',
      string: '#C3E88D',
      function: '#82AAFF',
      comment: '#546E7A',
    },
  },
  {
    value: 'ocean',
    label: 'Ocean',
    bg: '#1A2B3C',
    text: '#E3F2FD',
    icon: '🌊',
    codeTheme: 'tomorrow',
    syntax: {
      keyword: '#88C0D0',
      string: '#A3BE8C',
      function: '#81A1C1',
      comment: '#4C566A',
    },
  },
  {
    value: 'sunset',
    label: 'Sunset',
    bg: '#2D1B2C',
    text: '#FFE4E1',
    icon: '🌅',
    codeTheme: 'twilight',
    syntax: {
      keyword: '#F92672',
      string: '#E6DB74',
      function: '#66D9EF',
      comment: '#75715E',
    },
  },
  {
    value: 'matrix',
    label: 'Matrix',
    bg: '#0D1F0D',
    text: '#00FF00',
    icon: '🎮',
    codeTheme: 'okaidia',
    syntax: {
      keyword: '#00FF00',
      string: '#88FF88',
      function: '#00CC00',
      comment: '#006600',
    },
  },
  {
    value: 'cosmic',
    label: 'Cosmic',
    bg: '#1A1B2E',
    text: '#E6E6FA',
    icon: '🌌',
    codeTheme: 'tomorrow',
    syntax: {
      keyword: '#FF79C6',
      string: '#F1FA8C',
      function: '#50FA7B',
      comment: '#6272A4',
    },
  },
];

const paddings = ['16', '32', '64', '128'];

export default function CodeEditor() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [code, setCode] =
    useState(`// Developed in collaboration by CipherxHub & CodexCasper
function calculateFibonacci(n) {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}`);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [showBackground, setShowBackground] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [padding, setPadding] = useState('64');
  const [fileName, setFileName] = useState('SnipX.js');
  const [isExporting, setIsExporting] = useState(false);
  const snippetRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      Prism.highlightAll();
      const codeElement = document.querySelector('#code-snippet pre code');
      if (codeElement) {
        const style = document.createElement('style');
        style.textContent = `
          #code-snippet .token.keyword { color: ${selectedTheme.syntax.keyword} !important; }
          #code-snippet .token.string { color: ${selectedTheme.syntax.string} !important; }
          #code-snippet .token.function { color: ${selectedTheme.syntax.function} !important; }
          #code-snippet .token.comment { color: ${selectedTheme.syntax.comment} !important; }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [code, selectedTheme]);

  const exportImage = async () => {
    if (!snippetRef.current) return;
    setIsExporting(true);

    try {
      // Store original styles
      const element = snippetRef.current;
      const originalStyles = {
        width: element.style.width,
        height: element.style.height,
        maxHeight: element.style.maxHeight,
        maxWidth: element.style.maxWidth,
        overflow: element.style.overflow,
        background: element.style.background,
        padding: element.style.padding
      };

      // Set export styles
      element.style.width = 'auto';
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.style.maxWidth = '800px';
      element.style.overflow = 'visible';
      element.style.background = showBackground
        ? `linear-gradient(135deg, ${selectedTheme.bg} 0%, ${
            isDarkMode ? '#000000' : '#ffffff'
          } 100%)`
        : selectedTheme.bg;
      element.style.padding = `${padding}px`;

      // Generate image
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      });

      // Restore original styles
      Object.entries(originalStyles).forEach(([key, value]) => {
        element.style[key as any] = value;
      });

      // Download image
      const link = document.createElement('a');
      link.download = `${fileName.split('.')[0]}-snippet.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent welcome-animation">
          Welcome to SnipX...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col content-animation">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold text-blue-500">SnipX</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Create beautiful code snippets in seconds
        </p>
      </header>

      <div className="flex-grow w-full max-w-4xl mx-auto px-4">
        <div className="relative mb-6">
          <div className="code-window">
            <div className="window-header">
              <div className="flex items-center gap-4">
                <div className="window-controls">
                  <div className="window-dot dot-red"></div>
                  <div className="window-dot dot-yellow"></div>
                  <div className="window-dot dot-green"></div>
                </div>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="bg-transparent text-sm text-gray-400 border-none focus:outline-none focus:ring-1 focus:ring-blue-500 px-2 py-1 rounded"
                  placeholder="Filename"
                />
              </div>
              <button
                onClick={exportImage}
                disabled={isExporting}
                className="export-button flex items-center gap-2"
              >
                {isExporting ? 'Exporting...' : 'Export PNG'}
              </button>
            </div>

            <div
              ref={snippetRef}
              id="code-snippet"
              className="overflow-hidden"
              style={{
                background: showBackground
                  ? `linear-gradient(135deg, ${selectedTheme.bg} 0%, ${
                      isDarkMode ? '#000000' : '#ffffff'
                    } 100%)`
                  : selectedTheme.bg,
                color: selectedTheme.text,
                padding: `${padding}px`,
              }}
            >
              <pre
                ref={codeContainerRef}
                className="language-javascript"
                style={{ margin: 0, overflow: 'hidden' }}
              >
                <code className="text-sm whitespace-pre-wrap break-words">
                  {code}
                </code>
              </pre>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 mt-4 font-mono text-sm p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Write or paste your code here..."
            style={{
              background: '#1E1E1E',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />

          <div className="controls-box">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-3">
                  Appearance
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Theme</span>
                  <div className="flex flex-wrap gap-2">
                    {themes.map((theme) => (
                      <button
                        key={theme.value}
                        className={`control-button flex items-center gap-1 ${
                          selectedTheme.value === theme.value ? 'active' : ''
                        }`}
                        onClick={() => setSelectedTheme(theme)}
                      >
                        <span>{theme.icon}</span>
                        <span>{theme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-3">
                  Settings
                </h3>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Background</span>
                    <div
                      className={`toggle-switch ${
                        showBackground ? 'active' : ''
                      }`}
                      onClick={() => setShowBackground(!showBackground)}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Dark mode</span>
                    <div
                      className={`toggle-switch ${isDarkMode ? 'active' : ''}`}
                      onClick={() => setIsDarkMode(!isDarkMode)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-gray-400">Padding</span>
                  <div className="flex gap-2">
                    {paddings.map((p) => (
                      <button
                        key={p}
                        className={`control-button ${
                          padding === p ? 'active' : ''
                        }`}
                        onClick={() => setPadding(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-6 text-gray-400">
        <p>
          © 2025{' '}
          <a
            href="https://github.com/CipherxHub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400"
          >
            CipherxHub
          </a>{' '}
          &{' '}
          <a
            href="https://github.com/CodexCasper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400"
          >
            CodexCasper
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}