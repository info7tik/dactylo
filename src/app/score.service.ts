import { Injectable } from '@angular/core';
import { Score } from './score';

@Injectable({
    providedIn: 'root'
})
export class ScoreService {
    private SCORE_KEY = "score";
    constructor() { }

    get(): Score[] {
        const scoresToParse = localStorage.getItem(this.SCORE_KEY);
        console.log(scoresToParse);
        if (scoresToParse) {
            return JSON.parse(scoresToParse) as Score[];
        } else {
            console.log("score key does not exist");
            return [];
        }
    }

    add(score: Score) {
        const existingScores = this.get();
        existingScores.push(score);
        localStorage.setItem(this.SCORE_KEY, JSON.stringify(existingScores));
    }

    delete(scoreIndex: number) {
        const existingScores = this.get();
        if (scoreIndex < existingScores.length) {
            existingScores.splice(scoreIndex, 1);
            localStorage.setItem(this.SCORE_KEY, JSON.stringify(existingScores));
        } else {
            throw Error("no score at index '" + scoreIndex + "'");
        }
    }
}
