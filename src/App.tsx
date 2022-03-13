import React from "react";

function App() {
  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  type ShetlandWord = {
    word: string;
    translation: string;
    example_sentence: string
    type: string
  };

  const words: ShetlandWord[] = [
    {
      word: "a",
      translation: "have",
      example_sentence: "He could a come hed he wantit",
      type: "v",
    },
    {
      word: "boolik",
      translation: "a pimple",
      example_sentence: '',
      type: "n",
    }
  ];

  const searchForWord = (searchString: string) => {
    const foundWords = words.filter(w => `${w.word} ${w.translation} ${w.example_sentence}`.toLowerCase().includes(searchString.toLowerCase()))

    if (foundWords.length === 0) console.log("Not found");
    else console.log(foundWords);
  }

  const searchWord = debounce((searchString: string) => {
    if (!searchString) return;
    searchForWord(searchString)
  }, 500);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-300 bg-gradient-to-br from-gray-100 to-blue-500">
      <div className="relative">
        <input
          type="text"
          className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
          placeholder="Search a Shetland or English word..."
          onChange={event => searchWord(event.target.value)}
        />

        <div className="absolute top-4 right-3">
          <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
        </div>
      </div>

    </div>
  );
}

export default App;
