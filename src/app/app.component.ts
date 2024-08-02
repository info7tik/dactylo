import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, takeWhile, timer } from 'rxjs';
import { CharacterComponent } from './character/character.component';

enum LetterColor {
    FUTURE_LETTER = "black",
    LETTER_TO_TYPE = "blue",
    PAST_LETTER_SUCCESS = "grey",
    PAST_LETTER_ERROR = "red"
}

interface ColoredLetter {
    value: string;
    color: LetterColor;
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, CharacterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'dactyl0';
    textToType = "Les dinosaures forment un super-ordre ainsi qu'un clade extrêmement diversifié de sauropsides de la sous-classe des diapsides et dont les uniques représentants actuels sont les oiseaux. Ce sont des archosauriens ovipares, ayant en commun une posture érigée et partageant un certain nombre de synapomorphies telles que la présence d'une crête deltopectorale allongée au niveau de l'humérus et un acetabulum perforant le bassin. Présentes";
    instruction = "Start to type the text";
    wordIndex = 0;
    characterIndex = 0;
    characterToType = "";
    accuracyPercent = 0;
    wordNumber = 0;
    mistakeCounter = 0;
    countdownInSeconds = 10;
    remainingSeconds = this.countdownInSeconds;
    words: ColoredLetter[][] = [];
    private isMistakeDetected = false;
    private isRunningCountdown = false;
    private isExpiredCountdown = false;


    constructor() {
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
        this.characterToType = firstLetter.value;
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
                    this.wordNumber = this.wordIndex;
                    let properlyTypedCharacters = 0;
                    for(let i = 0; i< this.wordIndex; i++){
                        properlyTypedCharacters += this.words[i].length;
                    }
                    properlyTypedCharacters += this.characterIndex;
                    console.log(properlyTypedCharacters);
                    const totalHits = properlyTypedCharacters + this.mistakeCounter;
                    console.log(totalHits);
                    this.accuracyPercent = properlyTypedCharacters / totalHits * 100;
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
            alert("Time is up!");
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
