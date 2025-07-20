import React from 'react';
import { playAudio } from '../App';

const WordDetails = ({ wordData }) => {
  return (
    <div className="word-details">
      <div className="word-header">
        <h2>{wordData.word}</h2>
        {wordData.phonetics?.length > 0 && (
          <div className="phonetics">
            {wordData.phonetics.map((phonetic, index) => (
              <div key={index} className="phonetic">
                {phonetic.text && <span>{phonetic.text}</span>}
                {phonetic.audio && (
                  <button 
                    onClick={() => playAudio(phonetic.audio)} 
                    className="audio-button"
                    aria-label="Listen pronunciation"
                  >
                    🔊
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {wordData.meanings?.map((meaning, index) => (
        <div key={index} className="meaning">
          <h3 className="part-of-speech">{meaning.partOfSpeech}</h3>
          <ul className="definitions">
            {meaning.definitions.slice(0, 3).map((def, defIndex) => (
              <li key={defIndex}>
                <p><strong>Definition:</strong> {def.definition}</p>
                {def.example && (
                  <p className="example"><em>Example: {def.example}</em></p>
                )}
              </li>
            ))}
          </ul>
          {meaning.synonyms.length > 0 && (
            <div className="synonyms">
              <strong>Synonyms:</strong> {meaning.synonyms.join(', ')}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WordDetails;