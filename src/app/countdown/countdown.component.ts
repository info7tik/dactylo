import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { map, takeWhile, timer } from 'rxjs';

@Component({
    selector: 'app-countdown',
    standalone: true,
    imports: [AsyncPipe, DatePipe],
    templateUrl: './countdown.component.html',
    styleUrl: './countdown.component.css'
})
export class CountdownComponent {
    @Input() seconds = 300;

    timeRemaining$ = timer(0, 1000).pipe(
        map(n => (this.seconds - n) * 1000),
        takeWhile(n => n >= 0),
    );
}
