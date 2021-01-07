import { makeAutoObservable } from "mobx";

export class FlagGuess {

    private codeToGuess: string;

    selectedFlagCode = '';

    isGuessed = false;
    isFailed = false;
    failedAttempts = 0;

    constructor(codeToGuess: string) {
        this.codeToGuess = codeToGuess;
        makeAutoObservable(this);
    }

    selectFlag = (code: string) => {
        this.selectedFlagCode = code;
    };

    guess= () => {
        if (this.isGuessed) {
            return;
        }

        if (this.selectedFlagCode === this.codeToGuess) {
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