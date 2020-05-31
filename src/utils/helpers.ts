export const randomNumber = (min: number, max: number): number => {
  const strictMin: number = Math.ceil(Number(min));
  const strictMax: number = Math.floor(Number(max));
  return Math.floor(Math.random() * (strictMax - strictMin + 1)) + strictMin;
};
