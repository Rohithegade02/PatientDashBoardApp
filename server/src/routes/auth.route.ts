import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { errorHandler } from '../middlewares/error.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.use(errorHandler);

export default router;