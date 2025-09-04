import { app } from "@/main/config/app";

const PORT = process.env.PORT || 3000;

export const startServer = (): void => {
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} está rodando na porta: ${PORT}`);
  });
};