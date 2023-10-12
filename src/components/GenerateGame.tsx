import { generate } from 'random-words';
import type { VoidComponent } from 'solid-js';
import { createSignal } from 'solid-js';

import { useStore } from '@nanostores/solid';

import generateWordSearch from '~game/generate';
import { currentGameStore } from '~store/game';
import { wordList as wordListStore } from '~store/words';

import Button from './Button';
import GameOption from './GameOption';

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

        const word = type === 'input' ? currentWord() : generate(1)[0];
        if (isWordValid(word)) {
            wordListStore.set([...wordList(), word]);
            if (type === 'input') {
                setCurrentWord('');
            }
        }
    };

    return (
        <form onSubmit={generateGame} class="flex flex-col w-full">
            <div>
                <GameOption
                    label="Allow Backwards"
                    inputClass="form-checkbox rounded checked:bg-blue-500"
                    wrapperClass="mb-2"
                    type="checkbox"
                    checked={allowBackwards()}
                    onChange={(e) => setAllowBackwards(e.currentTarget.checked)}
                />

                <GameOption
                    label="Allow Diagonals"
                    inputClass="form-checkbox rounded checked:bg-blue-500"
                    wrapperClass="mb-2"
                    type="checkbox"
                    checked={allowDiagonals()}
                    onChange={(e) => setAllowDiagonals(e.currentTarget.checked)}
                />
            </div>
            <div class="mb-2 flex">
                <GameOption label="Width" type="number" min={minSize} max={maxSize} value={width()} onchange={(e) => setWidth(e.currentTarget.valueAsNumber)} wrapperClass="mr-3" />
                <GameOption label="Height" type="number" min={minSize} max={maxSize} value={height()} onchange={(e) => setHeight(e.currentTarget.valueAsNumber)} />
            </div>

            <div class="my-3 border-t-2 border-stone-200 flex flex-col">
                <GameOption
                    label="New Word"
                    wrapperClass="mb-3 mt-2"
                    inputClass="form-input rounded invalid:border-red-700 focus:invalid:border-red-700 focus:invalid:ring-red-700 uppercase"
                    value={currentWord()}
                    oninput={(e) => setCurrentWord(e.currentTarget.value)}
                    pattern="^[a-z A-Z]+$"
                    autocomplete="off"
                />

                <div>
                    <Button type="button" onclick={(e) => addWord(e, 'input')} disabled={!isWordValid(currentWord())} class="mr-3">
                        Add Word
                    </Button>

                    <Button type="button" onclick={(e) => addWord(e, 'random')}>
                        Add Random
                    </Button>
                </div>
            </div>
            <div class="pt-3 border-t-2 border-stone-200">
                <Button type="submit">Generate Game</Button>
            </div>
        </form>
    );
};

export default GenerateGame;
