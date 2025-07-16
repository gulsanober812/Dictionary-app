import React, { useState } from 'react';
import './AboutButton.css';

const AboutButton = () => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="about-container">
      <button 
        className="about-btn"
        onClick={() => setShowAbout(!showAbout)}
      >
        About
      </button>
      
      {showAbout && (
        <div className="about-popup">
          <h3>About WordWave</h3>
          <p>
         Welcome to WordWave {'\u{1F60A}'} <br></br>Your Personal Dictionary Companion.

At WordWave, we believe that words shape the way we think, speak, and connect with the world. Whether you’re a student, writer, language enthusiast, or simply curious, our mission is to make word discovery simple, smart, and enjoyable.

Our app offers quick access to word meanings, phonetics, examples, and pronunciation all in one sleek, user-friendly interface. It's designed to deliver clear, reliable definitions whenever and wherever you need them.

But we’re more than just a dictionary. We’re here to help you explore language, build your vocabulary, and speak with confidence.




          </p>
          <ul>
            <li>Word definitions</li>
            <li>Pronunciations</li>
            <li>Usage examples</li>
            <li>Synonyms and antonyms</li>
            <li>Daily Vocabulary</li>
          </ul>
       
          <button 
            className="close-btn"
            onClick={() => setShowAbout(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutButton;