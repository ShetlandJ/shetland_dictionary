import React, { useState, useCallback } from "react";
import WordResult from './components/WordResult';
import { ShetlandWord } from './types';
import axios from 'axios';

function App() {
  const [foundWords, setFoundWords] = useState<any>([]);

  const fetchWords = useCallback((input: string) => {
    axios.get(`http://localhost:8081/find?searchString=${input.toLowerCase()}`)
      .then(({ data }) => setFoundWords(data));
  }, [])

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const searchWord = debounce((input: string) => {
    if (input) {
      fetchWords(input)
    }
  }, 500)

  const paramWord = window.location.search.split("=")[1];

  if (paramWord) searchWord(paramWord);

  const likeWord = (wordUuid: string) => {
    axios.post(`http://localhost:8081/${wordUuid}/like`)
      .then(function ({ data }) {
        const foundWordsWithoutUpdatedWord = foundWords.filter((word: ShetlandWord) => word.uuid !== wordUuid);

        setFoundWords([...foundWordsWithoutUpdatedWord, data]);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const unlikeWord = (wordUuid: string) => {
    axios.post(`http://localhost:8081/${wordUuid}/unlike`)
      .then(function ({ data }) {
        const foundWordsWithoutUpdatedWord = foundWords.filter((word: ShetlandWord) => word.uuid !== wordUuid);

        setFoundWords([...foundWordsWithoutUpdatedWord, data]);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let mainBodyClasses = '';
  if (foundWords.length === 0) mainBodyClasses = `flex flex-col text-red-300 bg-gradient-to-br from-gray-100 to-blue-500 h-screen`;
  else mainBodyClasses = `flex flex-col text-red-300 bg-gradient-to-br from-gray-100 to-blue-500`;

  return (
    <div className={mainBodyClasses}>
      <div className="flex items-center justify-center mt-4">
        <div className="flex border-2 rounded">
          <input
              type="text"
              className="px-4 py-2 w-80"
              placeholder="Search a Shetland or English word"
              onChange={(event) => searchWord(event.target.value)}
            />
        </div>
      </div>

      <div className="found-words-list">
        {foundWords && foundWords.map((foundWord: ShetlandWord) => (
          <WordResult
            key={foundWord.uuid}
            word={foundWord}
            likeWord={(word: string) => likeWord(word)}
            removeLike={(word: string) => unlikeWord(word)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
