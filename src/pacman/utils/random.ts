/**
 * -- EXEMPLES --
 *
 * `console.log(getRandomInt(3));`
 * // expected output: 0, 1 or 2
 *
 * `console.log(getRandomInt(1));`
 * // expected output: 0
 *
 * `console.log(Math.random());`
 * // expected output: a number between 0 and 1
 *
 * @param max Number of max random size
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const shuffle = (array: Array<any>) => {
  let ctr = array.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = array[ctr];
    array[ctr] = array[index];
    array[index] = temp;
  }
  return array;
};
