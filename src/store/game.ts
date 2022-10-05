import { atom } from 'nanostores';

import type { Grid } from '~game/grid';

export const currentGameStore = atom<Grid | undefined>(undefined);
