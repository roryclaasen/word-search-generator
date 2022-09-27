import type { VoidComponent } from 'solid-js';

import generateWordSearch from '~game/generate';
import { currentGameStore } from '~store/game';

const GenerateGame: VoidComponent = () => {
    const generateGame = (e: SubmitEvent) => {
        e.preventDefault();
        const newGame = generateWordSearch({ words: ['cat', 'dog', 'fish', 'ranger'], size: 10 });
        currentGameStore.set(newGame);
    };

    return (
        <form onSubmit={generateGame}>
            <button type="submit">Generate Game</button>
        </form>
    );
};

export default GenerateGame;
