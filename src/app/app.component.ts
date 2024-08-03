import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, takeWhile, timer } from 'rxjs';
import { CharacterComponent } from './character/character.component';
import { LetterColor } from './letter-color';
import { Score } from './score';
import { ScoreService } from './score.service';

interface ColoredLetter {
    value: string;
    color: LetterColor;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, CharacterComponent],
    providers: [ScoreService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    private countdownInSeconds = 90;
    private textToType = "Les dinosaures forment un super-ordre ainsi qu'un clade extrêmement diversifié de sauropsides de la sous-classe des diapsides et dont les uniques représentants actuels sont les oiseaux. Ce sont des archosauriens ovipares, ayant en commun une posture érigée et partageant un certain nombre de synapomorphies telles que la présence d'une crête deltopectorale allongée au niveau de l'humérus et un acetabulum perforant le bassin. Présentes";
    private wordIndex = 0;
    private characterIndex = 0;
    private mistakeCounter = 0;
    private isMistakeDetected = false;
    private isRunningCountdown = false;
    private isExpiredCountdown = false;
    private mustSaveScore = true;
    private scoreService;

    title = 'dactyl0';
    instruction = "Start to type the text";
    remainingSeconds = this.countdownInSeconds;
    words: ColoredLetter[][] = [];
    scores: Score[] = [];

    constructor(scoreService: ScoreService) {
        this.scoreService = scoreService;
        for (let word of this.textToType.split(" ")) {
            const wordLetters: ColoredLetter[] = [];
            const wordWithSpace = word += " ";
            for (let char of wordWithSpace) {
                wordLetters.push({ value: char, color: LetterColor.FUTURE_LETTER });
            }
            if (wordLetters.length > 0) {
                this.words.push(wordLetters);
            }
        }
        const firstLetter = this.words[0][0];
        firstLetter.color = LetterColor.LETTER_TO_TYPE;
    }

    ngOnInit(): void {
        this.scores = this.scoreService.get();
        console.log("scores: " + this.scores + " (" + this.scores.length + ")");
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        event.preventDefault();
        if (!this.isRunningCountdown) {
            this.isRunningCountdown = true;
            const countdown = timer(0, 1000).pipe(map(n => this.countdownInSeconds - n), takeWhile(n => n > 0));
            countdown.subscribe(() => {
                this.remainingSeconds -= 1;
                if (this.remainingSeconds == 0) {
                    this.isExpiredCountdown = true;
                    const wordNumber = this.wordIndex;
                    let properlyTypedCharacters = 0;
                    for (let i = 0; i < this.wordIndex; i++) {
                        properlyTypedCharacters += this.words[i].length;
                    }
                    properlyTypedCharacters += this.characterIndex;
                    const totalHits = properlyTypedCharacters + this.mistakeCounter;
                    const accuracyPercent = properlyTypedCharacters / totalHits * 100;
                    if (this.mustSaveScore) {
                        console.log("saving score");
                        this.mustSaveScore = false;
                        const myScore: Score = {
                            date: new Date(),
                            accuracy: accuracyPercent,
                            mistakes: this.mistakeCounter,
                            wordNumber: wordNumber,
                            totalSeconds: this.countdownInSeconds,
                            wordsPerMinute: wordNumber * 60 / this.countdownInSeconds
                        };
                        this.scoreService.add(myScore);
                        this.scores.push(myScore);
                    }
                }
            });
        }
        if (!this.isExpiredCountdown) {
            const keyToType = this.words[this.wordIndex][this.characterIndex];
            if (event.key == keyToType.value) {
                const lastWordIndex = this.words.length - 1;
                const lastWordCharaacterIndex = this.words[lastWordIndex].length - 1;
                if (this.wordIndex < lastWordIndex || lastWordCharaacterIndex < this.characterIndex) {
                    this.colorCurrentCharacter(this.isMistakeDetected);
                    this.isMistakeDetected = false;
                    this.selectNextCharacter();
                }
            } else {
                if (!this.isMistakeDetected) {
                    this.mistakeCounter++;
                }
                this.isMistakeDetected = true;
            }
        } else {
            alert("Time is up! Refresh (F5) to restart the timer...");
        }
    }

    private colorCurrentCharacter(isMistakeDetected: boolean) {
        const currentWord = this.words[this.wordIndex];
        if (isMistakeDetected) {
            currentWord[this.characterIndex].color = LetterColor.PAST_LETTER_ERROR;
        } else {
            currentWord[this.characterIndex].color = LetterColor.PAST_LETTER_SUCCESS;
        }
    }

    private selectNextCharacter() {
        if (this.characterIndex < this.words[this.wordIndex].length - 1) {
            this.characterIndex++;
        } else {
            this.wordIndex++;
            this.characterIndex = 0;
        }
        this.words[this.wordIndex][this.characterIndex].color = LetterColor.LETTER_TO_TYPE;
    }
}
