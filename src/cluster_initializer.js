// simplified_cluster.js

const cluster = require('cluster');
const os = require('os');
const express = require('express');
const { fork } = require('child_process');

const totalCPUs = os.cpus().length;

// -----------------------------------------------------------------
// LÓGICA DO PROCESSO MESTRE (O GERENTE GERAL)
// -----------------------------------------------------------------
if (cluster.isPrimary) {
  console.log(`[Gerente PID: ${process.pid}] Está online.`);

  // O processo mestre contrata "Especialista em Cálculo" (processo filho) e o mantém pronto.
  const calculator = fork('./src/calculator.js');
  console.log(`[Gerente] Contratou um Calculador com PID: ${calculator.pid}`);

  // O processo mestre fica ouvindo se o Especialista terminou algum trabalho.
  calculator.on('message', (message) => {
    console.log(`[Gerente] ✅ O Calculador (PID: ${message.pid}) terminou o trabalho! Resultado: ${message.result}`);
  });

  // 2. O processo mestre contrata "Atendentes" (workers do cluster) para lidar com os clientes.
  // Ele cria um atendente para cada núcleo de CPU.
  console.log(`[Gerente] Contratando ${totalCPUs} Atendentes (workers web)...`);
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // 3. O processo mestre atua como um ROTEADOR. Ele ouve as mensagens dos Atendentes.
  // A função `setupPrimary` garante que a lógica de escuta seja adicionada a todos os workers.
  cluster.on('message', (worker, message) => {
    console.log(`[Gerente] O Atendente (PID: ${worker.process.pid}) enviou uma tarefa: calcular Fibonacci de ${message.num}`);

    // O processo mestre passa a tarefa para o Especialista de Cálculo.
    calculator.send(message.num);
  });
} else {
  const app = express();
  const PORT = 3000;

  app.get('/', (req, res) => {
    const number = parseInt(req.query.number);
    console.log(`[Atendente PID: ${process.pid}] Recebeu uma requisição para o número ${number}.`);

    // O Atendente NÃO faz o trabalho pesado.
    // Ele apenas envia uma mensagem para o processo mestre com a tarefa.
    process.send({ num: number });

    // E responde IMEDIATAMENTE para o cliente.
    res.send("<h3>Sua requisição foi recebida! O resultado aparecerá no console do servidor.</h3>");
  });

  app.listen(PORT, () => {
    console.log(`[Atendente PID: ${process.pid}] Servidor web iniciado na porta ${PORT}.`);
  });
}