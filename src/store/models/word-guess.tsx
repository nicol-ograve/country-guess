import { makeAutoObservable } from "mobx";

export class WordGuess {

    private wordToGuess: string;

    title: string;

    guessedChars: string[];
    focusedCharIndex = -1;

    filled = false;

    isGuessed = false;
    isFailed = false;
    failedAttempts = 0;

    constructor(wordToGuess: string, title = '') {
        this.wordToGuess = wordToGuess.toLowerCase();
        this.title = title;

        // In "guessedChars" all charactes except white spaces are replaced with empty strings
        this.guessedChars = wordToGuess.split('').map(char => char === ' ' ? char : '');
        makeAutoObservable(this);
    }

    onCharInput = (input: string) => {

        if (!this.isGuessed && this.focusedCharIndex < this.wordToGuess.length) {

            this.guessedChars[this.focusedCharIndex] = input;
            this.focusedCharIndex += 1;

            while (this.wordToGuess[this.focusedCharIndex] === ' ') {
                this.focusedCharIndex += 1;
            }

        }
    };

    undo = () => {
        if (!this.isGuessed && this.focusedCharIndex > 0) {
            this.focusedCharIndex -= 1;
            this.guessedChars[this.focusedCharIndex] = '';

            this.filled = false;
        }
    };

    onFocus = () => {
        const firstEmptyChar = this.guessedChars.findIndex(char => char === '');
        this.focusedCharIndex = firstEmptyChar > 0 ? firstEmptyChar : 0;
    };
    onFocusLost = () => { this.focusedCharIndex = -1; };

    guess = () => {


        if (this.isGuessed) {
            return;
        }

        if (this.guessedChars.join('').toLowerCase() === this.wordToGuess) {
            this.isGuessed = true;
            this.isFailed = false;
        } else {
            this.failedAttempts += 1;
            this.isFailed = true;
            setTimeout(() => {
                this.isFailed = false;
            }, 2000);
        }
    };
}