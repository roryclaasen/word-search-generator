import { Direction, getWordRowCol, randomDirection } from './direction';
import type { Grid, GridOptions } from './grid';
import { maxColIndex } from './grid';
import { maxRowIndex, minRowIndex } from './grid';
import { cloneGrid, createGrid, minColIndex } from './grid';
import { randomBool, randomIntInRange } from './random';
import { cleanWord, reverseWord, sortWordList } from './word';

type PlaceOptions = {
    allowBackwards?: boolean;
    allowDiagonals?: boolean;
    maxAttempts?: number;
};

type GenerateOptions = {
    words: string[];
} & GridOptions &
    PlaceOptions;

const placeWordRandom = (grid: Grid, word: string, { allowBackwards = true, allowDiagonals = true, maxAttempts = 1000 }: PlaceOptions): Grid => {
    const placeWordInner = () => {
        const isReversed = allowBackwards && randomBool();
        const direction = randomDirection(allowDiagonals);

        const clonedGrid = cloneGrid(grid);
        const wordToPlace = isReversed ? reverseWord(word) : word;

        let row = randomIntInRange(minRowIndex(), maxRowIndex(word, clonedGrid));
        if (direction === Direction.DiagonalUp) {
            row = grid.length - row - 1;
        }
        const col = randomIntInRange(minColIndex(), maxColIndex(word, clonedGrid));

        const canPlaceWord = () => {
            for (let i = 0; i < wordToPlace.length; i++) {
                const { row: r, col: c } = getWordRowCol(direction, row, col, i);

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const cell = clonedGrid[r]![c];
                if (cell !== undefined && wordToPlace[i] != cell) {
                    return false;
                }
            }

            return true;
        };

        if (canPlaceWord()) {
            for (let i = 0; i < wordToPlace.length; i++) {
                const { row: r, col: c } = getWordRowCol(direction, row, col, i);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                clonedGrid[r]![c] = wordToPlace[i];
            }
            return clonedGrid;
        }

        return undefined;
    };

    let newGrid: undefined | Grid = undefined;
    let attempt = 1;
    do {
        newGrid = placeWordInner();
    } while (newGrid === undefined && attempt++ < maxAttempts);

    if (newGrid !== undefined) {
        return newGrid;
    }

    throw new Error(`Could not place word ${word} in grid after ${maxAttempts} attempts`);
};

const generateWordSearch = ({ words, size, ...rest }: GenerateOptions): Grid => {
    const sortedWords = sortWordList(words.map(cleanWord));

    let grid = createGrid({ size });
    sortedWords.forEach((w) => {
        try {
            grid = placeWordRandom(grid, w, rest);
        } catch (e) {
            console.error(e);
            // Faling to place a word is not a fatal error, just log it and continue
        }
    });
    return grid;
};

export default generateWordSearch;
