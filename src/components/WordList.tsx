import type { VoidComponent } from 'solid-js';
import { For } from 'solid-js';

import { useStore } from '@nanostores/solid';

import { wordList as wordListStore } from '~store/words';

const WordList: VoidComponent = () => {
    const wordList = useStore(wordListStore);

    const removeWord = (index: number) => {
        const list = [...wordList()];
        list.splice(index, 1);
        wordListStore.set(list);
    };

    return (
        <ul role="list" class="space-y-3 w-full words">
            {wordList().length === 0 ? (
                <li class="text-gray-500">No words added yet</li>
            ) : (
                <For each={wordList()}>
                    {(word, index) => (
                        <li class="flex items-center justify-between">
                            <span class="uppercase">{word}</span>
                            <button
                                class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                onclick={() => removeWord(index())}
                            >
                                X
                            </button>
                        </li>
                    )}
                </For>
            )}
        </ul>
    );
};

export default WordList;
