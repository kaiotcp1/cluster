import { IFibonacciService } from "@/domain/services/IFibonacciService";

export class FibonacciService implements IFibonacciService {
  public calculate(num: number): number {
    if (num <= 1) return num;

    let fibNMinus2 = 0;
    let fibNMinus1 = 1;
    let fibN = 1;

    for (let i = 2; i <= num; i++) {
      fibN = fibNMinus1 + fibNMinus2;
      fibNMinus2 = fibNMinus1;
      fibNMinus1 = fibN;
    }
    return fibN;
  }
}