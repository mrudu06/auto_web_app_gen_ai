import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import styles from '../styles/TabbedPane.module.css';

const TabbedPane: React.FC = () => {
  const [code, setCode] = useState<string>(`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colorful Interactive Website</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            min-height: 100vh;
        }
        header {
            background-color: #4CAF50;
            color: white;
            padding: 1em 0;
            text-align: center;
            width: 100%;
        }
        nav {
            background-color: #f0f0f0;
            padding: 1em;
            width: 200px;
        }
        nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        nav li {
            margin-bottom: 0.5em;
        }
        nav a {
            display: block;
            padding: 0.5em;
            text-decoration: none;
            color: #333;
            background-color: #e0e0e0;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        nav a:hover {
            background-color: #d0d0d0;
        }
        main {
            flex: 1;
            padding: 1em;
            background-image: url("https://source.unsplash.com/random/1600x900");
            background-size: cover;
            color: white;
        }
        section {
            background-color: rgba(0, 0, 0, 0.5);
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1em 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <h1>My Colorful Website</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">Increase Sales</a></li>
            <li><a href="#">Provide Information</a></li>
            <li><a href="#">Build Brand Awareness</a></li>
            <li><a href="#">Offer Customer Support</a></li>
        </ul>
    </nav>
    <main>
        <section>
            <h2>Welcome!</h2>
            <p>This is a sample website with multiple sections.</p>
        </section>
        <section>
          <h2>Another Section</h2>
          <p>More content can be added here.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 My Website</p>
    </footer>
</body>
</html>`);

  return (
    <div className={styles.tabbedPane}>
      <div className={styles.tabs}>
        <button className={styles.tab}>Code</button>
        <button className={styles.tab}>Preview</button>
      </div>
      <div className={styles.tabContent}>
        <div className={styles.codeEditor}>
          <CodeMirror
            value={code}
            extensions={[html()]}
            onChange={(value) => setCode(value)}
          />
        </div>
        <div className={styles.preview}>
          <iframe
            srcDoc={code}
            title="Preview"
            className={styles.iframe}
          />
        </div>
      </div>
    </div>
  );
};

export default TabbedPane;