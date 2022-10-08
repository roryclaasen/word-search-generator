import classNames from 'classnames';
import type { VoidComponent } from 'solid-js';
import { createSignal } from 'solid-js';
import { createEffect } from 'solid-js';
import { For } from 'solid-js';

import { useStore } from '@nanostores/solid';

import { cleanWord } from '~game/word';
import { currentGameStore } from '~store/game';
import { wordList as wordListStore } from '~store/words';

import Button from './Button';

const WordList: VoidComponent = () => {
    const wordList = useStore(wordListStore);
    const currentGame = useStore(currentGameStore);

    const [words, setWords] = createSignal<
        {
            word: string;
            placed: boolean;
        }[]
    >([]);

    const removeWord = (index: number) => {
        const list = [...wordList()];
        list.splice(index, 1);
        wordListStore.set(list);
    };

    const isWordMissing = (word: string, placedWords?: string[]) => {
        if (placedWords === undefined || placedWords.length === 0) {
            return false;
        }

        return !placedWords.includes(cleanWord(word));
    };

    createEffect(() => {
        const gameWords = [...(currentGame()?.placedWords ?? [])];
        const currentWords = [...wordList()];

        if (gameWords.length === 0) {
            setWords(currentWords.map((word) => ({ word, placed: true })));
        } else {
            setWords(currentWords.map((word) => ({ word, placed: !isWordMissing(word, gameWords) })));
        }
    });

    return (
        <ul role="list" class="space-y-3 w-full words">
            {words().length === 0 ? (
                <li class="text-gray-500">No words added yet</li>
            ) : (
                <For each={words()}>
                    {({ word, placed }, index) => (
                        <li class={classNames('flex items-center justify-between', { 'bg-red-100 rounded': !placed })}>
                            <span class="uppercase">
                                <span class="uppercase">{word}</span>
                                {!placed && <span class="ml-2 text-gray-500">(Word Not Placed)</span>}
                            </span>

                            <Button type="button" onclick={() => removeWord(index())} small>
                                X
                            </Button>
                        </li>
                    )}
                </For>
            )}
        </ul>
    );
};

export default WordList;
