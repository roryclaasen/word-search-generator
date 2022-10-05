import { randomIntInRange } from './random';

export const enum Direction {
    Horizontal,
    Vertical,
    DiagonalUp,
    DiagonalDown
}

export default Direction;

export const randomDirection = (allowDiagonal = true): Direction => randomIntInRange(0, allowDiagonal ? Direction.DiagonalDown : Direction.Vertical);

export const getWordRowCol = (direction: Direction, row: number, col: number, index: number) => {
    let r = row;
    let c = col;

    if (direction === Direction.Horizontal || direction === Direction.DiagonalDown) {
        r += index;
    } else if (direction === Direction.DiagonalUp) {
        r -= index;
    }

    if (direction === Direction.Vertical || direction === Direction.DiagonalDown || direction === Direction.DiagonalUp) {
        c += index;
    }

    return { row: r, col: c };
};
