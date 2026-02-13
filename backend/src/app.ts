import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import ImageRouter from "./routes/images";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.url);
  next();
});

// Routes
app.use("/api/images", ImageRouter);

// Error handling middleware
app.use((
  err: Error & { status?: number },
  req: Request,
  res: Response,
  next: NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({ error: 'Internal server error' });
  });

export default app;