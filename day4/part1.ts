import { getLines } from '../common';

let result = 0;

let linesArray: string[] = getLines('day4/day4input.txt');
linesArray.forEach((line) => {
    const splitLine: string[] = (line.split(':')[1]).split('|');
    const pattern = RegExp('([0-9]+)', 'g');

    // Get winning numbers
    let winningNums: number[] = [];
    let winningNum;
    while ((winningNum = pattern.exec(splitLine[0])) != null) {
        winningNums.push(+winningNum[0]);
    }
    
    // Get matching numbers
    let cardValue: number = 0;
    let matchingNum;
    while ((matchingNum = pattern.exec(splitLine[1])) != null) {
        if (winningNums.includes(+matchingNum[0])) {
            if (cardValue == 0) {
                cardValue = 1;
            } else {
                cardValue *= 2;
            }
        }
    }

    result += cardValue;
});

console.log(result);