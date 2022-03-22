import React, { useState, useEffect } from "react";
import WordResult from './components/WordResult';
import { ShetlandWord } from './types';
import axios from 'axios';

function App() {
  const [foundWords, setFoundWords] = useState<any>([]);

  const fetchWords = async (searchString: string) => {
      axios.get(`http://localhost:8081/find?searchString=${searchString.toLowerCase()}`)
      .then(({data}) => setFoundWords(data));

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

  const likeWord = (wordUuid: string) => {
    axios.post(`http://localhost:8081/${wordUuid}/like`)
    .then(function ({data}) {
      const foundWordsWithoutUpdatedWord = foundWords.filter((word: ShetlandWord) => word.uuid !== wordUuid);

      setFoundWords([...foundWordsWithoutUpdatedWord, data]);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const unlikeWord = (wordUuid: string) => {
    axios.post(`http://localhost:8081/${wordUuid}/unlike`)
    .then(function ({data}) {
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
        <input
          type="text"
          className="mt-8 h-14 w-full pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-md md:max-w-2xl"
          placeholder="Search a Shetland or English word..."
          onChange={event => searchWord(event.target.value)}
        />

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
