import { IAmount } from "../types/AmountDTO";

export function integersToCents(amount:number) {
  const value = amount / 100;

  return value;
}