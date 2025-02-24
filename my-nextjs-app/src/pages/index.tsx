import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import IdeaForm from '../components/IdeaForm';
import PromptBox from '../components/PromptBox';
import TabbedPane from '../components/TabbedPane';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>AI assistant Rapid Web App Developer</title>
        <meta name="description" content="Generate and deploy web app ideas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>AI assistant Rapid Web App Developer</h1>
        <p className={styles.subtitle}>Generate and deploy your web app ideas effortlessly</p>
      </header>
      <main className={styles.main}>
        <IdeaForm />
        <TabbedPane />
        <PromptBox />
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 AI assistant Rapid Web App Developer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;