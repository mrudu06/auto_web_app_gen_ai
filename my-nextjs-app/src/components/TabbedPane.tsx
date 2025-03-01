import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import styles from '../styles/TabbedPane.module.css';

const TabbedPane: React.FC = () => {
  const [code, setCode] = useState<string>(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Webpage</title>
    <style>
        body { font-family: sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; min-height: 100vh; }
        header { background-color: #4CAF50; color: white; padding: 1em 0; text-align: center; width: 100%; }
        main { flex: 1; padding: 1em; }
        footer { background-color: #333; color: white; text-align: center; padding: 1em 0; width: 100%; }
    </style>
</head>
<body>
    <header><h1>My Interactive Website</h1></header>
    <main><h2>Welcome!</h2><p>Edit the code on the left and see changes here.</p></main>
    <footer><p>&copy; 2025 My Website</p></footer>
</body>
</html>`);

  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  return (
    <div className={styles.tabbedPane}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'preview' ? styles.active : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'code' ? (
          <CodeMirror
            value={code}
            extensions={[html()]}
            onChange={(value) => setCode(value)}
          />
        ) : (
          <iframe
            srcDoc={code}
            title="Preview"
            className={styles.iframe}
            sandbox="allow-scripts allow-modals allow-forms"
            style={{ width: '100%', height: '100vh', border: 'none' }}
          />
        )}
      </div>
    </div>
  );
};

export default TabbedPane;
