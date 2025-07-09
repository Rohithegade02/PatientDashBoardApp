import { Router } from 'express';
import { AdminPatientController } from '../controllers/admin/patient.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { UserRole } from '../constants/role';
import { errorHandler } from '../middlewares/error.middleware';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

router.use(authenticate);
router.use(requireRole([UserRole.ADMIN]));
// In admin.routes.ts (protected by admin middleware)
router.post('/register-admin', 
    authenticate, 
    requireRole([UserRole.ADMIN]),
    AuthController.register
  );
router.post('/patients', AdminPatientController.createMedicalRecord);
router.patch('/patients/:id', AdminPatientController.updateMedicalRecord);

router.use(errorHandler);

export default router;