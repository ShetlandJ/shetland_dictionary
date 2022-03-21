import React, { useState, useEffect } from "react";
import WordResult from './components/WordResult';
import { ShetlandWord } from './types';


function App() {
  const [wordList, setWordList] = useState([]);
  const [foundWords, setFoundWords] = useState<any>([]);

  const fetchWords = async (searchString: string) => {
    fetch(`http://localhost:8081/find?searchString=${searchString}`)
      .then(res => res.json())
      .then(data => setFoundWords(data));
  }

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const searchForWord = (searchString: string) => {
    fetchWords(searchString);
  }

  const searchWord = debounce((searchString: string) => {
    if (!searchString) return;
    searchForWord(searchString)
  }, 500);

  let mainBodyClasses = '';
  if (foundWords.length === 0) mainBodyClasses = `flex flex-col items-center text-red-300 bg-gradient-to-br from-gray-100 to-blue-500 h-screen`;
  else mainBodyClasses = `flex flex-col items-center text-red-300 bg-gradient-to-br from-gray-100 to-blue-500`;

  return (
    <div className={mainBodyClasses}>
      <div className="relative">
        <input
          type="text"
          className="mt-8 h-14 w-full pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
          placeholder="Search a Shetland or English word..."
          onChange={event => searchWord(event.target.value)}
        />

        <div className="found-words-list">
          {foundWords && foundWords.map((foundWord: ShetlandWord) => (
            <WordResult
              key={foundWord.word}
              word={foundWord}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

export default App;
