import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import IdeaForm from '../components/IdeaForm';
import PromptBox from '../components/PromptBox';
import TabbedPane from '../components/TabbedPane';

const Home: React.FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const messages = [
      "Welcome, visionary! Ready to build something amazing?",
      "Hey innovator! Let’s turn your ideas into reality.",
      "AI-powered magic at your service. Let’s craft your web app!",
      "Your creativity + AI = Limitless Possibilities. Let’s start!",
      "Tell me your idea, and I’ll code it into existence!"
    ];
    setWelcomeMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>🚀 VisionCraft: Your AI-Powered Web App Genius! 🔥</title>
        <meta name="description" content="AI-powered tool to generate and deploy web apps effortlessly." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header} style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "50px 20px",
        textAlign: "center"
      }}>
        <h1 className={`${styles.title} ${styles.fadeIn}`}>VisionCraft: AI Web App Wizard</h1>
        <p className={`${styles.subtitle} ${styles.fadeIn}`}>{welcomeMessage}</p>
      </header>

      <main className={styles.main}>
        <div className={styles.introCard}>
          <p>✨ Just describe your idea and let AI do the coding! 🚀</p>
          <p>Whether you're a startup founder, developer, or just curious—let's bring your vision to life.</p>
        </div>

        <IdeaForm />
        <TabbedPane />
        <PromptBox />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 AI-Powered Web App Creator. 🚀 Built with AI and Passion.</p>
      </footer>
    </div>
  );
};

export default Home;


