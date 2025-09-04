function calculateFibonacci(num) {
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

// Fica ouvindo por mensagens do processo primário
process.on('message', (num) => {
  console.log(`[Calculador PID: ${process.pid}] Recebeu o número ${num}. Começando a trabalhar...`);
  const result = calculateFibonacci(num);
  // Envia o resultado de volta para o processo primário
  process.send({ result, pid: process.pid });
});