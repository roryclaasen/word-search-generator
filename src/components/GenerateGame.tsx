import classNames from 'classnames';
import randomWords from 'random-words';
import type { VoidComponent } from 'solid-js';
import { createSignal } from 'solid-js';

import { useStore } from '@nanostores/solid';

import generateWordSearch from '~game/generate';
import { currentGameStore } from '~store/game';
import { wordList as wordListStore } from '~store/words';

const minSize = 5;
const maxSize = 20;

const GenerateGame: VoidComponent = () => {
    const wordList = useStore(wordListStore);

    const [allowBackwards, setAllowBackwards] = createSignal(true);
    const [allowDiagonals, setAllowDiagonals] = createSignal(true);

    const [width, setWidth] = createSignal(12);
    const [height, setHeight] = createSignal(12);

    const [currentWord, setCurrentWord] = createSignal('');

    const generateGame = (e: SubmitEvent) => {
        e.preventDefault();
        const newGame = generateWordSearch({ words: wordList(), size: [width(), height()], allowBackwards: allowBackwards(), allowDiagonals: allowDiagonals() });
        currentGameStore.set(newGame);
    };

    const isWordValid = (word?: string): word is string => {
        if (word === undefined || word.length === 0) {
            return false;
        }

        return !!word.match(/^[a-z A-Z]+$/);
    };

    const addWord = (e: MouseEvent, type: 'input' | 'random') => {
        e.preventDefault();

        const word = type === 'input' ? currentWord() : randomWords(1)[0];
        if (isWordValid(word)) {
            wordListStore.set([...wordList(), word]);
            if (type === 'input') {
                setCurrentWord('');
            }
        }
    };

    return (
        <form onSubmit={generateGame} class="flex flex-col w-full">
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
            <div class="mb-2 flex">
                <div class="mr-3">
                    <label for="opt-width" class="mb-2 block">
                        Width
                    </label>
                    <input
                        id="opt-width"
                        type="number"
                        class="form-input rounded"
                        min={minSize}
                        max={maxSize}
                        value={width()}
                        onchange={(e) => setWidth(e.currentTarget.valueAsNumber)}
                    />
                </div>
                <div>
                    <label for="opt-height" class="mb-2 block">
                        Height
                    </label>
                    <input
                        id="opt-height"
                        type="number"
                        class="form-input rounded"
                        min={minSize}
                        max={maxSize}
                        value={height()}
                        onchange={(e) => setHeight(e.currentTarget.valueAsNumber)}
                    />
                </div>
            </div>
            <div class="my-3 border-t-2 border-stone-200 flex flex-col">
                <div class="mb-3">
                    <label for="opt-word" class="mt-2 mb-2 block">
                        New Word
                    </label>
                    <input
                        id="opt-word"
                        type="text"
                        class="form-input rounded invalid:border-red-700 focus:invalid:border-red-700 focus:invalid:ring-red-700 uppercase"
                        value={currentWord()}
                        oninput={(e) => setCurrentWord(e.currentTarget.value)}
                        pattern="^[a-z A-Z]+$"
                        autocomplete="off"
                    />
                </div>
                <div>
                    <button
                        class={classNames('bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded mr-3 disabled:opacity-25 disabled:cursor-not-allowed', {
                            'hover:bg-blue-400 hover:border-blue-500': isWordValid(currentWord())
                        })}
                        onclick={(e) => addWord(e, 'input')}
                        disabled={!isWordValid(currentWord())}
                    >
                        Add Word
                    </button>
                    <button
                        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        onclick={(e) => addWord(e, 'random')}
                    >
                        Add Random
                    </button>
                </div>
            </div>
            <div class="pt-3 border-t-2 border-stone-200">
                <button type="submit" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                    Generate Game
                </button>
            </div>
        </form>
    );
};

export default GenerateGame;
