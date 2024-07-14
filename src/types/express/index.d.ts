// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      currentUser?: Record<string, any>;
    }
  }
}
