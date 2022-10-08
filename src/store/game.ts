import { atom } from 'nanostores';

import type { GridGame } from '~game/grid';

export const currentGameStore = atom<GridGame | undefined>(undefined);
