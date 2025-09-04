import { IFibonacciService } from '@/domain/services/IFibonacciService';
import { Request, Response } from 'express';

export interface IController {
  handle(request: Request, response: Response): Response;
}

export class FibonacciController implements IController {
  constructor(private readonly fibonacciService: IFibonacciService) { }

  public handle(request: Request, response: Response): Response {
    console.log(`Worker ${process.pid} atendeu a esta requisição!`);

    const numberQuery = Number.parseInt(request.query.number as string);

    if (isNaN(numberQuery) || numberQuery < 0) {
      return response.status(400).send('<h1>Forneça um número válido. Ex: /?number=10</h1>');
    }

    const result = this.fibonacciService.calculate(numberQuery);
    return response.send(`<h1>${result}</h1>`);
  }
}