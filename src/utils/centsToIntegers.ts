import { IAmount } from "../types/AmountDTO";

export function centsToIntegers(amount:number) {
  const value = amount * 100;

  return value;
}