import React from "react";
import { ShetlandWord } from '../types';

function WordResult(props: {word: ShetlandWord}) {
    return (
        <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-md md:max-w-2xl ">
            <div className="flex items-start px-4 py-6">
                <img className="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
                <div className="">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1">{props.word.word}</h2>
                        {/* <small className="text-sm text-gray-700">22h ago</small> */}
                    </div>
                    <p className="text-gray-700">{props.word.translation} </p>
                    <p className="mt-3 text-gray-700 text-sm">
                        {props.word.example_sentence ? props.word.example_sentence : 'No example sentence exists'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default WordResult;
