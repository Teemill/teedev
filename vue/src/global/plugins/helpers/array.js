export const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);

  return array;
};

export default [
  shuffle,
];
