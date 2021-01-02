import { makeAutoObservable } from "mobx";

export class WordGuess {

    private wordToGuess: string;

    // Needed to select the next empty char when the component gain focus
    private nextEmptyCharIndex = 0;

    guessedChars: string[];
    focusedCharIndex = -1;

    constructor(wordToGuess: string) {
        this.wordToGuess = wordToGuess;

        // In "guessedChars" all charactes except white spaces are replaced with empty strings
        this.guessedChars = wordToGuess.split('').map(char => char === ' ' ? char : '');
        makeAutoObservable(this);
    }

    onCharInput = (input: string) => {
        this.guessedChars[this.focusedCharIndex] = input;
        this.focusedCharIndex += 1;

        if(this.nextEmptyCharIndex < this.focusedCharIndex){
            this.nextEmptyCharIndex = this.focusedCharIndex;
        }
    };

    onFocus = () => this.focusedCharIndex = 
        this.nextEmptyCharIndex >= this.wordToGuess.length ? 0 : this.nextEmptyCharIndex;
    onFocusLost = () => this.focusedCharIndex = -1;

}