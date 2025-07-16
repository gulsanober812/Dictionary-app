import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import './Header.css';
import AboutButton from './AboutButton';
import { SiDictionarydotcom } from "react-icons/si";
import DailyVocabulary from './DailyVocabulary';



const Header = ({ darkMode, toggleDarkMode , setWord }) => {
  return (
    <header>
<h1> <SiDictionarydotcom /> <span>WordWave</span></h1>
      <div className="header-controls">
        <AboutButton />
          <DailyVocabulary setWord={setWord} />
        <button 
          onClick={toggleDarkMode}
          className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FiSun  className="icon" size={18} /> : <FiMoon className="icon" size={18} />}
          
        </button>
      </div>
    </header>
  );
};

export default Header;



// import React from 'react';
// import AboutButton from './AboutButton';
// import './Header.css';
// import { SiDictionarydotcom } from "react-icons/si";
// import { WiDaySunny } from "react-icons/wi";
// import { MdOutlineNightlight } from "react-icons/md";
// const Header = ({ darkMode, toggleDarkMode }) => {
//   return (
//     <header>
//       <h1> <SiDictionarydotcom /> <span>WordWave</span></h1>
//       <div className="header-controls">
//         <AboutButton />
//         <button onClick={toggleDarkMode} className="theme-toggle">
//           <MdOutlineNightlight />
//           <WiDaySunny />
//           {darkMode ? '' : ''}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;