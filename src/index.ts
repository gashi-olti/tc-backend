import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';

import { AppDataSource } from './data-source';
import { userRouter } from './routes/user.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);

const { PORT } = process.env ?? 8000;

app.use('/auth', userRouter);

// Catch-all route for undefined routes
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log('Server is running on http://localhost:' + PORT);
    });

    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
