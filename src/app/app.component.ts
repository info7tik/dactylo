import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, takeWhile, timer } from 'rxjs';
import { CharacterComponent } from './character/character.component';
import { LetterColor } from './letter-color';
import { Score } from './score';
import { ScoreService } from './score.service';
import { TextService } from './text.service';

interface ColoredLetter {
    value: string;
    color: LetterColor;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, CharacterComponent],
    providers: [TextService, ScoreService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    private countdownInSeconds = 90;
    private wordIndex = 0;
    private characterIndex = 0;
    private mistakeCounter = 0;
    private isMistakeDetected = false;
    private isRunningCountdown = false;
    private isExpiredCountdown = false;
    private isEndOfText = false;
    private mustSaveScore = true;
    private textService;
    private scoreService;

    title = "dactyl0";
    instruction = "Start to type the text";
    remainingSeconds = this.countdownInSeconds;
    words: ColoredLetter[][] = [];
    scores: Score[] = [];

    constructor(textService: TextService, scoreService: ScoreService) {
        this.textService = textService;
        this.scoreService = scoreService;
    }

    ngOnInit(): void {
        this.instruction = "Start to type the text";
        this.scores = this.scoreService.get();
        this.words = [];
        const textToType = this.textService.getRandom();
        this.initializeFromText(textToType);
    }

    private initializeFromText(textToLoad: string) {
        const textWords = textToLoad.split(" ");
        for (const [index, word] of textWords.entries()) {
            const wordLetters: ColoredLetter[] = [];
            let wordWithSpace;
            if (index === textWords.length - 1) {
                wordWithSpace = word;
            } else {
                wordWithSpace = word + " ";
            }
            for (const char of wordWithSpace) {
                wordLetters.push({ value: char, color: LetterColor.FUTURE_LETTER });
            }
            if (wordLetters.length > 0) {
                this.words.push(wordLetters);
            }
        }
        const firstLetter = this.words[0][0];
        firstLetter.color = LetterColor.LETTER_TO_TYPE;
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        event.preventDefault();
        if (!this.isRunningCountdown) {
            this.isRunningCountdown = true;
            const countdown = timer(0, 1000).pipe(map(n => this.countdownInSeconds - n), takeWhile(n => n > 0));
            countdown.subscribe(() => {
                this.remainingSeconds -= 1;
                if (this.remainingSeconds == 0 && !this.isEndOfText) {
                    this.manageEndOfCountdown();
                }
            });
        }
        if (!this.isExpiredCountdown) {
            const keyToType = this.words[this.wordIndex][this.characterIndex];
            if (event.key === keyToType.value) {
                this.manageRightInputCharacter();
            } else {
                this.manageWrongInputCharacter();
            }
        } else {
            this.instruction = "Time is up! Refresh (F5) to restart the timer...";
        }
    }

    private manageEndOfCountdown() {
        this.isExpiredCountdown = true;
        if (this.mustSaveScore) {
            this.mustSaveScore = false;
            const properlyTypedCharacters = this.computeProperlyTypedCharacters(this.words, this.wordIndex, this.characterIndex);
            const myScore = this.computeScore(properlyTypedCharacters, this.mistakeCounter, this.countdownInSeconds);
            this.scoreService.add(myScore);
            this.scores.push(myScore);
        }
    }

    private computeProperlyTypedCharacters(wordList: ColoredLetter[][], wordIndex: number, characterIndex: number): number {
        let properlyTypedCharacters = 0;
        for (let i = 0; i < this.wordIndex; i++) {
            properlyTypedCharacters += this.words[i].length;
        }
        properlyTypedCharacters += this.characterIndex;
        return properlyTypedCharacters;
    }

    private computeScore(properlyTypedCharacters: number, mistakeCounter: number, elapsedTime: number): Score {
        const wordNumber = this.wordIndex;
        const totalHits = properlyTypedCharacters + this.mistakeCounter;
        const accuracyPercent = properlyTypedCharacters / totalHits * 100;
        return {
            date: new Date(),
            accuracy: accuracyPercent,
            mistakes: this.mistakeCounter,
            wordNumber: wordNumber,
            totalSeconds: this.countdownInSeconds,
            wordsPerMinute: wordNumber * 60 / this.countdownInSeconds
        };
    }

    private manageRightInputCharacter() {
        const lastWordIndex = this.words.length - 1;
        const lastWordCharacterIndex = this.words[lastWordIndex].length - 1;
        if (this.hasNextCharacter(lastWordIndex, lastWordCharacterIndex)) {
            this.colorCurrentCharacter(this.isMistakeDetected);
            this.isMistakeDetected = false;
            this.selectNextCharacter();
        } else {
            this.manageEndOfText();
        }
    }

    private hasNextCharacter(lastWordIndex: number, lastWordCharacterIndex: number) {
        return this.wordIndex <= lastWordIndex || lastWordCharacterIndex + 1 < this.characterIndex;
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
            if (this.wordIndex < this.words.length - 1) {
                this.wordIndex++;
                this.characterIndex = 0;
            }
        }
        this.words[this.wordIndex][this.characterIndex].color = LetterColor.LETTER_TO_TYPE;
    }

    private manageEndOfText() {
        this.isEndOfText = true;
        this.instruction = "Congratulations! You finish the text. Your score can not be saved :'(. Try with longer texts!";
    }

    private manageWrongInputCharacter() {
        if (!this.isMistakeDetected) {
            this.mistakeCounter++;
        }
        this.isMistakeDetected = true;
    }

    deleteScore(scoreIndex: number) {
        if (scoreIndex < this.scores.length) {
            this.scores.splice(scoreIndex, 1);
            this.scoreService.delete(scoreIndex);
        }
    }
}
