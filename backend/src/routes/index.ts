import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
	res.json({
		name: 'Iron-Stock API',
		version: '1.0.0'
	});
});
