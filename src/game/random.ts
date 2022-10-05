export const randomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

export const randomIntInRange = (min: number, max: number) => {
    const iMin = Math.ceil(min);
    const iMax = Math.floor(max);
    return Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
};

export const randomBool = () => Math.random() >= 0.5;

export const randomChar = () => String.fromCharCode(randomIntInRange(65, 90));
