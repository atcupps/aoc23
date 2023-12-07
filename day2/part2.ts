import * as fs from 'fs'

let result = 0;

function getPower(matchArray: RegExpMatchArray[]): number {
    let minRed: number = 0;
    let minGreen: number = 0;
    let minBlue: number = 0;
    for (let i = 0; i < matchArray.length; i++) {
        const pair = matchArray[i];
        const amount: number = +pair[1];
        const color: string = pair[2];
        switch (color) {
            case 'red':
                minRed = Math.max(minRed, amount);
                break;
            case 'green':
                minGreen = Math.max(minGreen, amount);
                break;
            case 'blue':
                minBlue = Math.max(minBlue, amount);
                break;
        }
    }
    return minRed * minGreen * minBlue;
}

const inputContents = fs.readFileSync('day2/day2input.txt', 'utf-8');
const inputLines = inputContents.split('\n');
inputLines.forEach((line) => {
    const regex = RegExp('([0-9]+) (red|green|blue)', 'g');
    const matchArray = Array.from(line.matchAll(regex));
    result += getPower(matchArray);
});

console.log(result);