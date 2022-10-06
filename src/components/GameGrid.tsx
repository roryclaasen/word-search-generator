import type { VoidComponent } from 'solid-js';
import { Show } from 'solid-js';
import { For } from 'solid-js';

import { useStore } from '@nanostores/solid';

import type { Grid } from '~game/grid';
import { createGrid } from '~game/grid';
import { currentGameStore } from '~store/game';

const GameGrid: VoidComponent = () => {
    const currentGame = useStore(currentGameStore);

    const blankGame = createGrid({ size: 12 });

    const renderGrid = (grid: Grid) => (
        <table class="border border-collapse border-zinc-800 table-fixed font-mono">
            <tbody>
                <For each={grid}>
                    {(row) => (
                        <tr>
                            <For each={row}>{(cell) => <td class="border border-zinc-700 w-[2rem] h-[2rem] inline-flex items-center justify-center">{cell}</td>}</For>
                        </tr>
                    )}
                </For>
            </tbody>
        </table>
    );

    return (
        <Show when={currentGame()} fallback={renderGrid(blankGame)} keyed>
            {({ grid }) => renderGrid(grid)}
        </Show>
    );
};

export default GameGrid;
