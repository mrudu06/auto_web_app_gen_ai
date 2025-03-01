import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Preview.module.css';

const Preview: React.FC = () => {
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    // Fetch the generated code from the server
    fetch('/api/generated-code')
      .then(response => response.json())
      .then(data => setCode(data.code))
      .catch(error => console.error('Error fetching generated code:', error));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Preview Generated Code</title>
        <meta name="description" content="Preview the generated code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Preview Generated Code</h1>
      </header>
      <main className={styles.main}>
        <iframe srcDoc={code} className={styles.iframe} />
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 AI-Powered Web App Creator. 🚀 Built with AI and Passion.</p>
      </footer>
    </div>
  );
};

export default Preview;