import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextService {
    private text1 = "Les dinosaures forment un super-ordre ainsi qu'un clade extrêmement diversifié de sauropsides de la sous-classe des diapsides et dont les uniques représentants actuels sont les oiseaux. Ce sont des archosauriens ovipares, ayant en commun une posture érigée et partageant un certain nombre de synapomorphies telles que la présence d'une crête deltopectorale allongée au niveau de l'humérus et un acetabulum perforant le bassin. Présentes";
    private text2 = "Hello World";
    private text3 = "Welcome Home";
    private texts = [this.text1, this.text2, this.text3];
    constructor() { }

    get(index: number): string {
        return this.texts[index];
    }

    getRandom(): string {
        return this.get(this.getRandomInt(this.texts.length));
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }
}
