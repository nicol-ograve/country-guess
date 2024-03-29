import { makeAutoObservable } from "mobx";
import { QuestionGuessStatus } from "./question";

export default class WordGuess implements QuestionGuessStatus {

    private wordToGuess: string;
    isGuessed: boolean;
    failedAttempts: number;

    title: string;

    guessedChars: string[];
    focusedCharIndex = -1;

    filled = false;

    isFailed = false;

    private hasFocus = false;

    constructor(wordToGuess: string, title = '', status?: QuestionGuessStatus) {
        this.wordToGuess = wordToGuess.toLowerCase();
        this.title = title;

        this.isGuessed = status?.isGuessed ?? false;
        this.failedAttempts = status?.failedAttempts ?? 0;

        // In "guessedChars" all charactes except white spaces are replaced with empty strings
        this.guessedChars = this.isGuessed
            ? this.wordToGuess.split('')
            : wordToGuess.split('').map(char => char === ' ' ? char : '');
        makeAutoObservable(this);
    }

    moveFocusRight = () => {
        if (this.focusedCharIndex !== -1)
            this.focusedCharIndex = (this.focusedCharIndex + 1) % this.wordToGuess.length;
    };

    moveFocusLeft = () => {
        if (this.focusedCharIndex !== -1)
            this.focusedCharIndex =
                (this.focusedCharIndex + this.wordToGuess.length - 1) % this.wordToGuess.length;
    };

    onCharInput = (input: string) => {
        if (!this.hasFocus) {
            return;
        }
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
        console.log('HasFocus');
        this.hasFocus = true;
        const firstEmptyChar = this.guessedChars.findIndex(char => char === '');
        this.focusedCharIndex = firstEmptyChar > 0 ? firstEmptyChar : 0;
    };

    onFocusLost = () => {
        console.log('LostFocus');
        this.hasFocus = false;
        this.focusedCharIndex = -1;
    };

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