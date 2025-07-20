import React from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const WordDetails = ({ wordData, playAudio }) => {
  return (
    <div className="word-details">
      {/* Word Header with Phonetics */}
      <div className="word-header">
        <h1 className="word-title">{wordData.word}</h1>
        
        {wordData.phonetics?.length > 0 && (
          <div className="phonetics-container">
            {wordData.phonetics.map((phonetic, index) => (
              <div key={index} className="phonetic-group">
                {phonetic.text && (
                  <span className="phonetic-text">{phonetic.text}</span>
                )}
                {phonetic.audio && (
                  <button
                    onClick={() => playAudio(phonetic.audio)}
                    className="audio-button"
                    aria-label={`Pronounce ${wordData.word}`}
                    title="Listen pronunciation"
                  >
                    <FaVolumeUp />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Meanings and Definitions */}
      <div className="meanings-container">
        {wordData.meanings?.map((meaning, index) => (
          <div key={index} className="meaning-card">
            <div className="part-of-speech-header">
              <h3 className="part-of-speech">{meaning.partOfSpeech}</h3>
              <span className="divider"></span>
            </div>

            <h4 className="definitions-title">Definitions</h4>
            <ul className="definitions-list">
              {meaning.definitions.slice(0, 3).map((def, defIndex) => (
                <li key={defIndex} className="definition-item">
                  <p className="definition-text">
                    <span className="definition-number">{defIndex + 1}.</span> {def.definition}
                  </p>
                  {def.example && (
                    <p className="example">
                      <IoMdInformationCircleOutline className="example-icon" />
                      <em>"{def.example}"</em>
                    </p>
                  )}
                </li>
              ))}
            </ul>

            {meaning.synonyms.length > 0 && (
              <div className="synonyms-container">
                <span className="synonyms-label">Synonyms:</span>
                <div className="synonyms-list">
                  {meaning.synonyms.slice(0, 5).map((synonym, synIndex) => (
                    <span key={synIndex} className="synonym-badge">
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// CSS Styles (can be moved to a separate file)
const styles = `
  .word-details {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem;
    color: #333;
  }

  .word-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eaeaea;
  }

  .word-title {
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    color: #2d3748;
  }

  .phonetics-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .phonetic-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .phonetic-text {
    font-size: 1.1rem;
    color: #4a5568;
    font-style: italic;
  }

  .audio-button {
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .audio-button:hover {
    background: #3182ce;
    transform: scale(1.05);
  }

  .meanings-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .meaning-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .part-of-speech-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .part-of-speech {
    font-size: 1.25rem;
    margin: 0;
    color: #2b6cb0;
    text-transform: capitalize;
  }

  .divider {
    flex-grow: 1;
    height: 1px;
    background: #eaeaea;
  }

  .definitions-title {
    font-size: 1rem;
    color: #4a5568;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
  }

  .definitions-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .definition-item {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed #eaeaea;
  }

  .definition-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .definition-text {
    margin: 0 0 0.5rem 0;
    line-height: 1.5;
  }

  .definition-number {
    color: #4299e1;
    font-weight: bold;
  }

  .example {
    margin: 0.5rem 0 0 0;
    padding: 0.5rem;
    background: #f7fafc;
    border-radius: 4px;
    color: #4a5568;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .example-icon {
    color: #4299e1;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  .synonyms-container {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eaeaea;
  }

  .synonyms-label {
    font-weight: 600;
    color: #4a5568;
    margin-right: 0.5rem;
  }

  .synonyms-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .synonym-badge {
    background: #ebf8ff;
    color: #3182ce;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    .word-details {
      padding: 1rem;
    }
    
    .word-title {
      font-size: 2rem;
    }
    
    .meaning-card {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .word-title {
      font-size: 1.75rem;
    }
    
    .phonetic-text {
      font-size: 1rem;
    }
    
    .audio-button {
      width: 36px;
      height: 36px;
    }
  }
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

export default WordDetails;