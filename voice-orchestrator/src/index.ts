import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { handleVapiWebhook } from './webhooks/vapi.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for Next.js app on port 3000
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

// Raw body parser for HMAC signature verification
app.use(
  express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf.toString('utf8');
    },
  })
);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'voice-orchestrator',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Vapi Webhook entry point
app.post('/webhooks/vapi', handleVapiWebhook);

export const server = app.listen(PORT, () => {
  console.log(`[Voice Orchestrator] Service listening on port ${PORT}`);
});

export default app;
