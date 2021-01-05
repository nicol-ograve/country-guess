import { makeAutoObservable } from "mobx";

export class FlagGuess {

    private codeToGuess: string;
    isGuessed = false;
    isFailed = false;
    failedAttempts = 0;

    constructor(codeToGuess: string) {
        this.codeToGuess = codeToGuess;
        makeAutoObservable(this);
    }

    guess(code: string) {
        if (this.isGuessed) {
            return;
        }

        if (code === this.codeToGuess) {
            this.isGuessed = true;
            this.isFailed = false;
        } else {
            this.failedAttempts += 1;
            this.isFailed = true;
            setTimeout(() => {
                this.isFailed = false;
            }, 2000);
        }
    }

}