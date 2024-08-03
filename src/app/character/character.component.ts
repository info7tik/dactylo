import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LetterColor } from '../letter-color';

@Component({
    selector: 'app-character',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './character.component.html',
    styleUrl: './character.component.css'
})
export class CharacterComponent {
    @Input() character: string = "X";
    @Input() color: string = "blue";
    printedSpaceColors: string[] = [LetterColor.PAST_LETTER_ERROR.valueOf(), LetterColor.LETTER_TO_TYPE.valueOf()]
}
