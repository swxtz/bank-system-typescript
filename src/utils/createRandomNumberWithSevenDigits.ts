

export function createRandomNumberWithSevenDigits() {
  const accontNumber = Math.floor(100000 + Math.random() * 900000);

  return accontNumber;
}