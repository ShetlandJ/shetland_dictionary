import React from "react";
import { ShetlandWord } from '../types';

function WordResult(props: { word: ShetlandWord }) {
    return (
        <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-md md:max-w-2xl ">
            <div className="flex items-start px-4 py-6">
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 -mt-1">{props.word.word}</h2>
                    </div>
                    <p className="text-gray-700">{props.word.translation} </p>
                    {props.word.example_sentence && (
                        <p className="mt-3 text-gray-700 text-sm">
                            {
                                props.word.example_sentence ?
                                    `Usage: ${props.word.example_sentence}` :
                                    'No example sentence exists'
                            }
                        </p>
                    )}

                    {props.word.see_also.map((seeAlso: string) => (
                        <p>{seeAlso}</p>
                    ))}

                    <div className="mt-4 flex items-center">
                        <div className="flex mr-2 text-gray-700 text-sm mr-3 cursor-pointer">
                            <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordResult;
