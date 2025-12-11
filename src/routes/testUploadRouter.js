import express from 'express';
import multer from 'multer';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

const router = express.Router();
const upload = multer(); // зберігає файл у пам'яті, а не на диску

router.post('/test-upload', upload.single('file'), async (req, res) => {
  try {
    console.log('📥 Отримано файл:', req.file);

    const buffer = req.file.buffer;
    const result = await saveFileToCloudinary(buffer);

    res.json(result);
  } catch (err) {
    console.error('❌ Помилка:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
