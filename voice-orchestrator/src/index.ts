import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { handleVapiWebhook } from './webhooks/vapi.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'https://tripspree-prod.vercel.app',
  'http://tripspree-prod.vercel.app',
  'http://localhost:3000',
  process.env.CLIENT_APP_URL,
].filter(Boolean) as string[];

// Enable CORS for Next.js frontend (production Vercel and local dev)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server webhooks)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive fallback for Vapi and preview deployments
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
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

// Health check endpoint (for Vercel deployment verification)
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'voice-orchestrator',
    timestamp: new Date().toISOString(),
  });
});

// Vapi Webhook entry point
app.post('/webhooks/vapi', handleVapiWebhook);

// Start server only for local development (skipped on Vercel Fluid Compute)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Voice Orchestrator] Service listening on port ${PORT}`);
  });
}

export default app;
