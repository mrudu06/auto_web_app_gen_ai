import React, { useState } from 'react';
import styles from '../styles/PromptBox.module.css';

const PromptBox: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the prompt submission logic here
    console.log('Prompt submitted:', prompt);
  };

  return (
    <div className={styles.promptBox}>
      <h2>Enter your prompt</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default PromptBox;