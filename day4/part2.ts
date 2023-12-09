import * as fs from 'fs'
import { getLines } from '../common'

let result: number = 0;
const linesArray: string[] = getLines('day4/day4input.txt');
const ticketMultiplier: number[] = Array(linesArray.length).fill(1);
const pattern = RegExp('([0-9]+)', 'g');
for (let i = 0; i < linesArray.length; i++) {
    const line = linesArray[i].split(':')[1];
    const splitLine = line.split('|');

    // Get winning numbers
    let winningNums: number[] = [];
    let winningNum;
    while ((winningNum = pattern.exec(splitLine[0])) != null) {
        winningNums.push(+winningNum[0]);
    }
    
    // Get matching numbers
    let numMatches = 0;
    let matchingNum;
    while ((matchingNum = pattern.exec(splitLine[1])) != null) {
        if (winningNums.includes(+matchingNum[0])) {
            numMatches += 1;
        }
    }

    for (let j = 1; j < numMatches + 1; j++) {
        ticketMultiplier[i + j] += ticketMultiplier[i];
    }

    result += ticketMultiplier[i];
}

console.log(result);