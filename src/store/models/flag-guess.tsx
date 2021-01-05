import { makeAutoObservable } from "mobx";

export class FlagGuess {

    private codeToGuess: string;
    guessed = false;
    failedAttempts = 0;

    constructor(codeToGuess: string) {
        this.codeToGuess = codeToGuess;
        makeAutoObservable(this);
    }

    guess(code: string) {
        if (this.guessed) {
            return;
        }

        if (code === this.codeToGuess) {
            this.guessed = true;
        } else {
            this.failedAttempts += 1;
        }
    }

}