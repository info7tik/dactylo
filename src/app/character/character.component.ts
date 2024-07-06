import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}
