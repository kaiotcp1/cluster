import { FibonacciService } from "@/application/FibonacciService";
import { FibonacciController, IController } from "@/infra/http/controllers/FibonacciController";


export const makeFibonacciController = (): IController => {
  const fibonacciService = new FibonacciService();
  const fibonacciController = new FibonacciController(fibonacciService);
  return fibonacciController;
};