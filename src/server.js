import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(notesRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Notes API 🚀',
    availableRoutes: ['/notes', '/notes/:noteId'],
  });
});

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
