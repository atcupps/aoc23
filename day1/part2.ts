import * as fs from 'fs';

let result: number = 0;

let mapping: Record<string, number> = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
};

const matchingRegex = '[0-9]|one|two|three|four|five|six|seven|eight|nine';

function findFirst(line: string, length: number): number {
    const matchResult = line.match(matchingRegex);
    if (matchResult != null) {
        return mapping[matchResult[0]];
    }
    throw new Error("Couldn't identify first number.");
}

function findSecond(line: string, length: number): number {
    for (let i = length - 1; i >= 0; i--) {
        const matchResult = (line.slice(i, length)).match(matchingRegex);
        if (matchResult != null) {
            return mapping[matchResult[0]];
        }
    }
    throw new Error("Couldn't identify second number.");
}

const inputContents = fs.readFileSync('day1/day1input.txt', 'utf-8');
const inputArray = inputContents.split('\n');
inputArray.forEach((line) => {
    const length = line.length;
    const first = findFirst(line, length);
    const second = findSecond(line, length);
    result += first * 10 + second;
});

console.log(result);