const sharp = require('sharp');
const path = require('path');

async function processImage(message) {
  const { originalPath, originalName } = message;
  console.log(`[ImgWorker PID: ${process.pid}] Processando: ${originalName}`);

  const thumbnailPath = path.resolve(__dirname, '../uploads/processed', `${new Date().getTime()}-${originalName}`);
  try {
    await sharp(originalPath)
      .resize(200, 200)
      .toFile(thumbnailPath);
    console.log(`[ImgWorker PID: ${process.pid}] Thumbnail criada: ${thumbnailPath}`);

    if (process.send) {
      process.send({ status: 'success', pid: process.pid, ...message });
    }
  } catch (error) {
    console.error(`[ImgWorker PID: ${process.pid}] Erro ao processar imagem: ${error.message}`);
    if (process.send) {
      process.send({ status: 'error', pid: process.pid, error: error.message, ...message });
    }
  }
}

process.on('message', processImage);