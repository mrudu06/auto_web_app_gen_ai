import React, { useState } from 'react';
import styles from '../styles/IdeaForm.module.css';

const IdeaForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [idea, setIdea] = useState('');
  const [details, setDetails] = useState('');
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ idea?: string; details?: string }>({});
  
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input fields
    const newErrors: { idea?: string; details?: string } = {};
    if (!idea) newErrors.idea = 'Idea is required';
    if (!details) newErrors.details = 'Details are required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

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

    setLoading(false);
    handleNextStep();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhotos(event.target.files);
  };

  return (
    <div className={styles.container}>
      {loading && <div className={styles.spinner}>Loading...</div>}
      {step < 5 && (
        <div className={styles.formContainer}>
          {step === 1 && (
            <div className={`${styles.message} ${styles.fadeIn}`}>
              <p>Hello! I'm here to help you develop your web application. Please let me know what you need to develop.</p>
              <button className={styles.button} onClick={handleNextStep}>Next</button>
            </div>
          )}
          {step === 2 && (
            <div className={`${styles.message} ${styles.fadeIn}`}>
              <p>Great! Can you provide me with details like your shop name, location, phone, and email?</p>
              <label htmlFor="idea" className={styles.label}>Enter your web application idea:</label>
              <input
                type="text"
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className={`${styles.input} ${errors.idea ? styles.error : ''}`}
                required
              />
              {errors.idea && <div className={styles.errorMessage}>{errors.idea}</div>}
              <button className={styles.button} onClick={handleNextStep}>Next</button>
            </div>
          )}
          {step === 3 && (
            <div className={`${styles.message} ${styles.fadeIn}`}>
              <p>Can you provide more details about your idea?</p>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className={`${styles.textarea} ${errors.details ? styles.error : ''}`}
                required
              />
              {errors.details && <div className={styles.errorMessage}>{errors.details}</div>}
              <button className={styles.button} onClick={handleNextStep}>Next</button>
            </div>
          )}
          {step === 4 && (
            <div className={`${styles.message} ${styles.fadeIn}`}>
              <p>Please add images with the add button.</p>
              <input
                type="file"
                id="photos"
                multiple
                onChange={handlePhotoChange}
                className={styles.input}
              />
              {photos && (
                <div className={styles.imagePreview}>
                  {Array.from(photos).map((photo, index) => (
                    <img key={index} src={URL.createObjectURL(photo)} alt="preview" className={styles.previewImage} />
                  ))}
                </div>
              )}
              <button className={styles.button} onClick={handleSubmit}>Generate Web App</button>
            </div>
          )}
        </div>
      )}
      {step === 5 && (
        <div className={`${styles.resultContainer} ${styles.fadeIn}`}>
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
