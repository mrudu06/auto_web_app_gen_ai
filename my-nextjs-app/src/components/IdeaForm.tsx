import React, { useState } from 'react';
import styles from '../styles/IdeaForm.module.css';

const IdeaForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [idea, setIdea] = useState('');
  const [details, setDetails] = useState('');
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [response, setResponse] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the idea submission logic here
    console.log('User idea:', idea);
    console.log('User details:', details);
    console.log('User photos:', photos);

    // Prepare photos data
    const photosData = photos ? Array.from(photos).map(photo => URL.createObjectURL(photo)) : [];

    try {
      // Call the Flask API
      const res = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea, details, photos: photosData }),
      });

      const data = await res.json();
      if (data.code) {
        setResponse(data.code);
      } else {
        console.error('Error from API:', data.error);
        setResponse('Failed to generate code');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setResponse('Failed to generate code');
    }

    handleNextStep();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhotos(event.target.files);
  };

  return (
    <div className={styles.container}>
      {step < 5 && (
        <div className={styles.formContainer}>
          {step === 1 && (
            <div className={styles.message}>
              <p>Hello! I'm here to help you develop your web application. Please let me know what you need to develop.</p>
              <button className={styles.button} onClick={handleNextStep}>Next</button>
            </div>
          )}
          {step === 2 && (
            <div className={styles.message}>
              <p>Great! Can you provide me with details like your shop name, location, phone, and email?</p>
              <label htmlFor="idea" className={styles.label}>Enter your web application idea:</label>
              <input
                type="text"
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                required
                className={styles.input}
              />
              <button className={styles.button} onClick={handleNextStep}>Next</button>
            </div>
          )}
          {step === 3 && (
            <div className={styles.message}>
              <p>Can you provide more details about your idea?</p>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                className={styles.textarea}
              />
              <button className={styles.button} onClick={handleNextStep}>Next</button>
            </div>
          )}
          {step === 4 && (
            <div className={styles.message}>
              <p>Please add images with the add button.</p>
              <input
                type="file"
                id="photos"
                multiple
                onChange={handlePhotoChange}
                className={styles.input}
              />
              <button className={styles.button} onClick={handleSubmit}>Generate Web App</button>
            </div>
          )}
        </div>
      )}
      {step === 5 && (
        <div className={styles.resultContainer}>
          <div className={styles.codeContainer}>
            <h2>AI Generated Frontend Code:</h2>
            <pre className={styles.codeBlock}>{response}</pre>
          </div>
          <div className={styles.previewContainer}>
            <div className={styles.preview} dangerouslySetInnerHTML={{ __html: response }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaForm;