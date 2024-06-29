import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountdownComponent } from './countdown/countdown.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CountdownComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'dactylo';
    beginText: string = "Les dinosaures forment un super-ordre ainsi qu'un clade extrêmement diversifié de sauropsides de la sous-classe des diapsides et dont les uniques représentants actuels sont les oiseaux. Ce sont des archosauriens ovipares, ayant en commun une posture érigée et partageant un certain nombre de synapomorphies telles que la présence   d'une crête deltopectorale allongée au niveau de l'humérus et un acetabulum perforant le bassi";
    blueLetter = "n";
    endText = ". Présentes";
    countdownInSeconds = 30;
    private isTimeoutRunning = false;

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (!this.isTimeoutRunning) {
            this.isTimeoutRunning = true;
            setTimeout(this.decreaseTimeout, 1000);
        }
        if (event.key == this.blueLetter) {
            this.setNextCharInBlue();
            if (this.endText.length == 0) {
                this.endText = this.beginText.substring(1) + this.blueLetter
                this.blueLetter = this.beginText[0]
                this.beginText = ""
            }
        } else {
            console.log(event);
        }
    }

    setNextCharInBlue() {
        this.beginText += this.blueLetter;
        this.blueLetter = this.endText[0];
        this.endText = this.endText.substring(1);
    }

    decreaseTimeout() {
        console.log("decreasing...");
        this.countdownInSeconds = 10;
        console.log(this.countdownInSeconds)
    }
}
