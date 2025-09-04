import { router } from '@/infra/http/routes';
import express from 'express';

const app = express();

app.use(express.json());
app.use(router);

export { app };