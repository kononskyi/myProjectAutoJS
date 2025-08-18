
export function arraySorting(array: Array<string>, method: string) {
    const direction = method === 'asc' ? 1 : -1;

    return array.sort((a, b) =>
        a.toLocaleLowerCase() > b.toLowerCase() ? direction : -direction);
}

export function checkArraysEquality(array1: Array<string>, array2: Array<string>): boolean {
    if (array1.length !== array2.length) {
        return false;
    } else
        return array1.every((value, index) => value === array2[index]);
}

