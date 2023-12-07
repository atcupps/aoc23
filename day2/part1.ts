import * as fs from 'fs'

let result = 0;

function possible(matches: RegExpMatchArray[]): boolean {
    for (let i = 0; i < matches.length; i++) {
        const pair = matches[i];
        const amount: number = +pair[1];
        const color: string = pair[2];
        switch (color) {
            case 'red':
                if (amount > 12) {
                    return false;
                }
                break;
            case 'green':
                if (amount > 13) {
                    return false;
                }
                break;
            case 'blue':
                if (amount > 14) {
                    return false;
                }
                break;
        }
    }
    return true;
}

const inputContents = fs.readFileSync('day2/day2input.txt', 'utf-8');
const inputArray: string[] = inputContents.split('\n');
const regex = RegExp('([0-9]+) (red|green|blue)', 'g');
inputArray.forEach((line) => {
    const gameMatch = line.match(/Game ([0-9]+):/);
    if (gameMatch != null) {
        const gameNumber = +gameMatch[1];
        const matches = Array.from(line.matchAll(regex));
        if (possible(matches)) {
            result += gameNumber;
        }
    } else {
        throw new Error("Couldn't parse game number");
    }
});

console.log(result);