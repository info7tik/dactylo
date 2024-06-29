import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, takeWhile, timer } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'dactyl0';
    beginText: string = "";
    blueLetter = "L";
    endText = "es dinosaures forment un super-ordre ainsi qu'un clade extrêmement diversifié de sauropsides de la sous-classe des diapsides et dont les uniques représentants actuels sont les oiseaux. Ce sont des archosauriens ovipares, ayant en commun une posture érigée et partageant un certain nombre de synapomorphies telles que la présence d'une crête deltopectorale allongée au niveau de l'humérus et un acetabulum perforant le bassin. Présentes";
    instruction = "Start to type the text";
    accuracyPercent = 0;
    wordNumber = 0;
    mistakeCounter = 0;
    countdownInSeconds = 90;
    remainingSeconds = this.countdownInSeconds;
    private isRunningCountdown = false;
    private isExpiredCountdown = false;

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (!this.isRunningCountdown) {
            this.isRunningCountdown = true;
            const countdown = timer(0, 1000).pipe(map(n => this.countdownInSeconds - n), takeWhile(n => n > 0));
            countdown.subscribe(() => {
                this.remainingSeconds -= 1;
                if (this.remainingSeconds == 0) {
                    this.isExpiredCountdown = true;
                    const properlyTypedWords: string[] = this.beginText.split(" ");
                    if (properlyTypedWords.length == 0) {
                        this.wordNumber = 0;
                    } else {
                        this.wordNumber = this.getLastElement(properlyTypedWords).length > 0 ?
                            properlyTypedWords.length : properlyTypedWords.length - 1;
                    }
                    const properlyTypedCharacters = this.beginText.length;
                    const totalHits = properlyTypedCharacters + this.mistakeCounter;
                    this.accuracyPercent = properlyTypedCharacters / totalHits * 100;
                }
            });
        }
        if (!this.isExpiredCountdown) {
            if (event.key == this.blueLetter) {
                this.setNextCharInBlue();
                if (this.endText.length == 0) {
                    this.endText = this.beginText.substring(1) + this.blueLetter;
                    this.blueLetter = this.beginText[0];
                    this.beginText = "";
                }
            } else {
                this.mistakeCounter++;
            }
        } else {
            alert("Time is up!");
        }
    }

    setNextCharInBlue() {
        this.beginText += this.blueLetter;
        this.blueLetter = this.endText[0];
        this.endText = this.endText.substring(1);
    }

    private getLastElement(array: any[]): any {
        return array[array.length - 1];
    }
}
