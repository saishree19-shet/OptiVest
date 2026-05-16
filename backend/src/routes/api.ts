import { Router } from 'express';
import { optimize, simulate, getPortfolio, savePortfolio, getAnalytics } from '../controllers/apiController';

const router = Router();

router.post('/optimize', optimize);
router.post('/simulate', simulate);
router.get('/portfolio', getPortfolio);
router.post('/savePortfolio', savePortfolio);
router.get('/analytics', getAnalytics);

export default router;
