import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, takeWhile, timer } from 'rxjs';
import { CharacterComponent } from './character/character.component';

enum LetterColor {
    FUTURE_LETTER = "black",
    LETTER_TO_TYPE = "blue",
    PAST_LETTER_SUCCESS ="grey",
    PAST_LETTER_ERROR =  "red"
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
    countdownInSeconds = 90;
    remainingSeconds = this.countdownInSeconds;
    words: ColoredLetter[][] = [];
    private isRunningCountdown = false;
    private isExpiredCountdown = false;


    constructor() {
        for (let word of this.textToType.split(" ")) {
            let wordLetters: ColoredLetter[] = [];
            for (let char of word) {
                wordLetters.push({ value: char, color: LetterColor.FUTURE_LETTER });
            }
            if (wordLetters.length > 0) {
                this.words.push(wordLetters);
            }
        }
        this.words[0][0].color = LetterColor.LETTER_TO_TYPE;
    }


    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (!this.isRunningCountdown) {
            this.isRunningCountdown = true;
            const countdown = timer(0, 1000).pipe(map(n => this.countdownInSeconds - n), takeWhile(n => n > 0));
            countdown.subscribe(() => {
                this.remainingSeconds -= 1;
                if (this.remainingSeconds == 0) {
                    this.isExpiredCountdown = true;
                    this.wordNumber = this.wordIndex;
                    const properlyTypedCharacters = this.wordIndex * 2;
                    const totalHits = properlyTypedCharacters + this.mistakeCounter;
                    this.accuracyPercent = properlyTypedCharacters / totalHits * 100;
                }
            });
        }
        if (!this.isExpiredCountdown) {
            let keyTotype = this.words[this.wordIndex][this.characterIndex];
            if (event.key == keyTotype.value) {
                const lastWordIndex = this.words.length - 1;
                const lastWordCharaacterIndex = this.words[lastWordIndex].length - 1;
                if (this.wordIndex < lastWordIndex || lastWordCharaacterIndex < this.characterIndex) {
                    this.selectNextCharacter();
                }
            } else {
                this.mistakeCounter++;
            }
        } else {
            alert("Time is up!");
        }
    }

    selectNextCharacter() {
        const currentWord = this.words[this.wordIndex];
        if (this.characterIndex < currentWord.length) {
            currentWord[this.characterIndex].color = LetterColor.PAST_LETTER_ERROR;
            this.characterIndex++;
            currentWord[this.characterIndex].color = LetterColor.LETTER_TO_TYPE;
        }
    }
}
