export const toggleElementInArray = function <T>(array: T[], element: T): T[] {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    } else {
        array.push(element);
    }
    console.log(array);

    return array;
};
