import * as fs from 'fs';

let result: number = 0;

function findFirst(line: string, length: number): string {
    for (let i = 0; i < length; i++) {
        let matchResult = line[i].match('[0-9]');
        if (matchResult != null) {
            return matchResult[0];
        }
    }
    return '';
}

function findSecond(line: string, length: number): string {
    for (let i = length - 1; i >= 0; i--) {
        let matchResult = line[i].match('[0-9]');
        if (matchResult != null) {
            return matchResult[0];
        }
    }
    return '';
}

const inputContents = fs.readFileSync('day1/day1input.txt', 'utf-8');
const inputArray = inputContents.split('\n');
inputArray.forEach((line) => {
    const length = line.length;
    const first: number = +findFirst(line, length);
    const second: number = +findSecond(line, length);
    result += first * 10 + second;
})

console.log(result);