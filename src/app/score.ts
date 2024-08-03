export interface Score {
    date: Date;
    accuracy: number;
    mistakes: number;
    wordNumber: number;
    wordsPerMinute: number;
    totalSeconds: number;
}