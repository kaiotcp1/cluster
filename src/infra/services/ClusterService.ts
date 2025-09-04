import cluster from 'cluster';
import os from 'os';

export class ClusterService {
  private readonly totalCPUs = os.cpus().length;

  public start(startServer: () => void): void {
    if (cluster.isPrimary) {
      this.runPrimaryProcess();
    } else {
      this.runWorkerProcess(startServer);
    }
  }

  private runPrimaryProcess(): void {
    console.log(`Processo Primário ${process.pid} está rodando`);
    console.log(`Total de CPUs: ${this.totalCPUs}`);

    for (let i = 0; i < this.totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} morreu. Reiniciando...`);
      cluster.fork();
    });
  }

  private runWorkerProcess(startServer: () => void): void {
    console.log(`Worker ${process.pid} está iniciando...`);
    startServer();
  }
}