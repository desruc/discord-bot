export const randomNumber = (min: number, max: number): number => {
  const strictMin: number = Math.ceil(Number(min));
  const strictMax: number = Math.floor(Number(max));
  return Math.floor(Math.random() * (strictMax - strictMin + 1)) + strictMin;
};

export const asyncForEach = async (
  array: Array<any>,
  callback: (el: any, index: number, array: Array<any>) => Promise<any>
): Promise<any> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
