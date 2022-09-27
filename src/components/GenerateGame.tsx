import type { VoidComponent } from 'solid-js';
import { createSignal } from 'solid-js';

import generateWordSearch from '~game/generate';
import { currentGameStore } from '~store/game';

const GenerateGame: VoidComponent = () => {
    const [allowBackwards, setAllowBackwards] = createSignal(true);
    const [allowDiagonals, setAllowDiagonals] = createSignal(true);

    const generateGame = (e: SubmitEvent) => {
        e.preventDefault();
        const newGame = generateWordSearch({ words: ['cat', 'dog', 'fish', 'ranger'], size: 10, allowBackwards: allowBackwards(), allowDiagonals: allowDiagonals() });
        currentGameStore.set(newGame);
    };

    return (
        <form onSubmit={generateGame} class="flex flex-col">
            <div class="mb-2">
                <input
                    id="opt-back"
                    type="checkbox"
                    class="form-checkbox rounded  checked:bg-blue-500"
                    checked={allowBackwards()}
                    onChange={(e) => setAllowBackwards(e.currentTarget.checked)}
                />
                <label for="opt-back" class="ml-2">
                    Allow Backwards
                </label>
            </div>
            <div class="mb-2">
                <input
                    id="opt-diag"
                    type="checkbox"
                    class="form-checkbox rounded checked:bg-blue-500"
                    checked={allowDiagonals()}
                    onChange={(e) => setAllowDiagonals(e.currentTarget.checked)}
                />
                <label for="opt-diag" class="ml-2">
                    Allow Diagonals
                </label>
            </div>
            <div class="mt-3">
                <button type="submit" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Generate Game
                </button>
            </div>
        </form>
    );
};

export default GenerateGame;
