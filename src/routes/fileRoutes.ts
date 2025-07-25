import { Router } from 'express';
import { FileController } from '../controllers/fileController';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), FileController.uploadFile);
router.get('/', FileController.getFile);

export default router;
