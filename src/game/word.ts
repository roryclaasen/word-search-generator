import { reverse } from 'lodash';

export const reverseWord = (word: string): string => reverse(word.split('')).join('');

export const cleanWord = (word: string): string => word.split(' ').join('').toUpperCase();

export const sortWordList = (words: string[]): string[] => words.sort((a, b) => b.length - a.length);
