import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { router } from './routes/index.js';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.get('/health', (_req, res) => {
	res.status(200).json({
		status: 'ok',
		service: 'iron-stock-api'
	});
});

app.use('/api', router);

export { app };
