const { randomNumber } = require('../helpers');

const difference = (a1, a2) => {
  const diff = [];
  a1.forEach(el => {
    if (a2.indexOf(el) === -1) {
      diff.push(el);
    }
  });
  return diff;
};

describe('Random number generator', () => {
  it('Only return numbers between 0 - 10', () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const temp = [];
    let diff = difference(numbers, temp);
    while (diff.length > 0) {
      let rand = randomNumber(0, 10);
      temp.push(rand);
      diff = difference(numbers, temp);
    }
    const over = temp.some(el => el > 10);
    expect(diff.length).toEqual(0);
    expect(over).toEqual(false);
  });
});
