import React from 'react';
import WordDetails from './WordDetails';

const WordOfTheDay = ({ wordData }) => {
  return (
    <div className="word-of-the-day">
      <h2>Word of the Day</h2>
      <WordDetails wordData={wordData} />
    </div>
  );
};

export default WordOfTheDay;