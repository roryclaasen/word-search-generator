import lodash from 'lodash';

type Cell = string | undefined;

export type Grid = Cell[][];

export type GridOptions = {
    size: number | [number, number];
};

export const createGrid = ({ size }: GridOptions): Grid => {
    const width = size instanceof Array ? size[0] : size;
    const height = size instanceof Array ? size[1] : size;
    const grid: Grid = [];
    for (let i = 0; i < height; i++) {
        grid.push(lodash.fill(Array(width), undefined));
    }
    return grid;
};

export const cloneGrid = (grid: Grid): Grid => {
    const newGrid: Grid = [];
    grid.forEach((row) => newGrid.push([...row]));
    return newGrid;
};

export const minRowIndex = () => 0;

export const maxRowIndex = (word: string, grid: Grid) => {
    const wordLength = word.length;
    const gridHeight = grid.length;
    if (wordLength > gridHeight) {
        throw new Error(`Word ${word} is too long to fit in grid`);
    }
    return gridHeight - wordLength;
};

export const minColIndex = () => 0;

export const maxColIndex = (word: string, grid: Grid) => {
    const wordLength = word.length;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const gridWidth = grid[0]!.length;
    if (wordLength > gridWidth) {
        throw new Error(`Word ${word} is too long to fit in grid`);
    }
    return gridWidth - wordLength;
};
