import { makeAutoObservable } from "mobx";
import { QuestionGuessStatus } from "./question";

export class FlagGuess implements QuestionGuessStatus {

    codeToGuess: string;

    isGuessed: boolean;
    failedAttempts: number;

    selectedFlagCode = '';

    isFailed = false;

    constructor(codeToGuess: string, status?: QuestionGuessStatus) {
        this.codeToGuess = codeToGuess;
        this.isGuessed = status?.isGuessed ?? false;
        this.failedAttempts = status?.failedAttempts ?? 0;

        if(this.isGuessed) {
            this.selectedFlagCode = codeToGuess;
        }

        makeAutoObservable(this);
    }

    selectFlag = (code: string) => {
        this.selectedFlagCode = code;
    };

    guess = () => {
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