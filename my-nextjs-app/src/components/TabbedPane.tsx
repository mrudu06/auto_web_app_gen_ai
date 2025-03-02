import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import styles from '../styles/TabbedPane.module.css';

const TabbedPane: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  useEffect(() => {
    // Fetch the generated code from the server
    fetch('http://localhost:5000/api/generated-code')
      .then(response => response.json())
      .then(data => setCode(data.code))
      .catch(error => console.error('Error fetching generated code:', error));
  }, []);

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
        <a href="http://localhost:5000/download" className={styles.downloadButton}>
          <button>Download Code</button>
        </a>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'code' ? (
          <div className={styles.codeEditor}>
            <CodeMirror
              value={code}
              extensions={[html()]}
              onChange={(value) => setCode(value)}
            />
          </div>
        ) : (
          <div className={styles.preview}>
            <iframe
              srcDoc={code}
              title="Preview"
              className={styles.iframe}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabbedPane;