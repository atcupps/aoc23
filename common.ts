import * as fs from 'fs'

export function getLines(filename: string): string[] {
    const fileContents = fs.readFileSync(filename, 'utf-8');
    const linesArray = fileContents.split('\n');
    return linesArray;
}