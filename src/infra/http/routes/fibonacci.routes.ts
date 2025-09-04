import { makeFibonacciController } from '@/main/factories/makeFibonacciController';
import { Router } from 'express';

const fibonacciRouter = Router();
const fibonacciController = makeFibonacciController();

// O bind(fibonacciController) garante que o `this` dentro do método `handle` seja a instância do controller.
fibonacciRouter.get('/', fibonacciController.handle.bind(fibonacciController));

export { fibonacciRouter };