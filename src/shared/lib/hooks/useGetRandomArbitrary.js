export const useGetRandomArbitrary = (min, max) =>
  Math.round(Math.random() * (max - min) + min);
