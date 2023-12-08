import * as fs from 'fs'

let result = 0;

const fileContents = fs.readFileSync('day3/day3input.txt', 'utf-8');
const linesArray = fileContents.split('\n');
const pattern = RegExp('[^0-9\.]', 'g');
let symbols: number[][] = [];

const height: number = linesArray.length;
const width: number = linesArray[0].length;

// Identifying location of symbols
for (let i = 0; i < linesArray.length; i++) {
    const line: string = linesArray[i];
    for (let j = 0; j < line.length; j++) {
        if (line[j].match(pattern)) {
            symbols.push([i, j]);
        }
    }
}

// Go to each symbol location and check for adjacent numbers
for (let i = 0; i < symbols.length; i++) {
    const location: number[] = symbols[i];
    const row: number = location[0];
    const col: number = location[1];

    // Search left
    const leftVal = searchLeft(row, col);
    result += leftVal;

    // Search right
    const rightVal = searchRight(row, col);
    result += rightVal;

    // Search up
    if (row > 0) {
        if (linesArray[row - 1][col].match('[0-9]') != null) {
            const upVal = searchBranching(row - 1, col);
            result += upVal;
        } else {
            const leftUpVal = searchLeft(row - 1, col);
            const rightUpVal = searchRight(row - 1, col);
            result += leftUpVal + rightUpVal;
        }
    }

    // Search down
    if (row < height - 1) {
        if (linesArray[row + 1][col].match('[0-9]') != null) {
            const downVal = searchBranching(row + 1, col);
            result += downVal;
        } else {
            const leftDownVal = searchLeft(row + 1, col);
            const rightDownVal = searchRight(row + 1, col);
            result += leftDownVal + rightDownVal;
        }
    }
}

function searchBranching(row: number, col: number): number {
    const leftVal = searchLeft(row, col);
    const rightVal = searchRight(row, col);
    const pow = getPowRight(row, col);
    return rightVal + (+linesArray[row][col]) * Math.pow(10, pow) + leftVal * Math.pow(10, pow + 1);
}

function searchLeft(row: number, col: number): number {
    let value: number = 0;
    if (col > 0) {
        let pos: number = col - 1;
        let place: number = 0;
        let num: string = linesArray[row][pos];
        while (pos >= 0 && num.match('[0-9]') != null) {
            value += +num * Math.pow(10, place);
            pos--;
            place++;
            num = linesArray[row][pos];
        }
    }
    return value;
}

function searchRight(row: number, col: number): number {
    let value: number = 0;
    if (col < width - 1) {
        let pos: number = col + 1;
        let num: string = linesArray[row][pos];
        while (pos < width && num.match('[0-9]') != null) {
            value *= 10;
            value += +num;
            pos++;
            num = linesArray[row][pos];
        }
    }
    return value;
}

function getPowRight(row: number, col: number): number {
    let pow: number = 0;
    if (col < width - 1) {
        let pos: number = col + 1;
        let num: string = linesArray[row][pos];
        while (pos < width && num.match('[0-9]') != null) {
            pow += 1;
            pos++;
            num = linesArray[row][pos];
        }
    }
    return pow;
}

console.log(result);