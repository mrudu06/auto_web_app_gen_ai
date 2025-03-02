import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Preview.module.css';

const Preview: React.FC = () => {
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
        <iframe src="/preview.html" className={styles.iframe} />
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 AI-Powered Web App Creator. 🚀 Built with AI and Passion.</p>
      </footer>
    </div>
  );
};

export default Preview;