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
