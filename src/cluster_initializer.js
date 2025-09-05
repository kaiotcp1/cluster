// simplified_cluster.js

const cluster = require('cluster');
const os = require('os');
const express = require('express');
const { fork } = require('child_process');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const rawDir = path.join(__dirname, '../uploads/raw');
const processedDir = path.join(__dirname, '../uploads/processed');

fs.mkdirSync(rawDir, { recursive: true });
fs.mkdirSync(processedDir, { recursive: true });

const upload = multer({ dest: 'uploads/raw/' });
const totalCPUs = os.cpus().length;

// -----------------------------------------------------------------
// LÓGICA DO PROCESSO MESTRE
// -----------------------------------------------------------------
if (cluster.isPrimary) {
  console.log(`[Primary PID: ${process.pid}] Está online.`);

  // O processo mestre contrata "Especialista em Imagens.
  const imageWorker = fork('./src/image_worker.js');
  console.log(`[Primary] Contratou um Especialista em Imagens com PID: ${imageWorker.pid}`);

  try {
    // O processo mestre fica ouvindo se o Especialista terminou algum trabalho.
    imageWorker.on('message', (message) => {
      console.log(`[Primary] ✅ O Especialista (PID: ${message.pid}) terminou o trabalho na imagem '${message.originalName}'. Status: ${message.status}`);
    });

    // 2. O processo mestre contrata "Atendentes" (workers do cluster) para lidar com os clientes.
    // Ele cria um atendente para cada núcleo de CPU.
    console.log(`[Primary] Contratando ${totalCPUs} Atendentes (workers web)...`);
    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    // 3. O processo mestre atua como um ROTEADOR. Ele ouve as mensagens dos Atendentes.
    // A função `setupPrimary` garante que a lógica de escuta seja adicionada a todos os workers.
    cluster.on('message', (worker, message) => {
      console.log(`[Primary] O Atendente (PID: ${worker.process.pid}) enviou a imagem: ${message.originalName}`);
      // O processo mestre passa a tarefa para o Especialista de Cálculo.
      imageWorker.send(message);
    });

  } catch (error) {
    console.error(`[Primary] Erro ao iniciar o cluster: ${error.message}`);

  }
} else {
  const app = express();
  const PORT = 3000;

  app.post('/upload', upload.single('image'), (req, res) => {

    if (!req.file) {
      return res.status(400).send('Nenhuma imagem enviada.');
    };


    // Ele apenas envia uma mensagem para o processo mestre com a tarefa.
    process.send({
      originalPath: req.file.path,
      originalName: req.file.originalname
    });
    // E responde IMEDIATAMENTE para o cliente.
    res.status(202).json({ message: "Sua imagem foi recebida e está sendo processada!" });
  });

  app.listen(PORT, () => {
    console.log(`[Atendente PID: ${process.pid}] Servidor web iniciado na porta ${PORT}.`);
  });
}