import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

// In-Memory fallback store for server-side shortlink redirects
interface ShortLinkRecord {
  code: string;
  destination: string;
  clicks: number;
  geoRouting?: Array<{ countryCode: string; destinationUrl: string }>;
  deviceRouting?: Array<{ deviceType: string; destinationUrl: string }>;
}

const SERVER_SHORTLINKS: Record<string, ShortLinkRecord> = {
  spring26: {
    code: 'spring26',
    destination: 'https://anchrr.com/masterclass?utm_source=social&utm_medium=smartlink',
    clicks: 1420,
    geoRouting: [
      { countryCode: 'US', destinationUrl: 'https://anchrr.com/masterclass?region=us' },
      { countryCode: 'GB', destinationUrl: 'https://anchrr.com/masterclass?region=uk' }
    ]
  },
  desk2026: {
    code: 'desk2026',
    destination: 'https://amazon.com/shop/alexariver',
    clicks: 980
  },
  'figma-free': {
    code: 'figma-free',
    destination: 'https://figma.com/@alexariver',
    clicks: 2310
  }
};

async function startServer() {
  const app = express();
  app.use(express.json());

  // Healthcheck endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', app: 'Anchrr Full-Stack SaaS', timestamp: new Date().toISOString() });
  });

  // Short URL Redirect Engine (/s/:code)
  app.get('/s/:code', (req: Request, res: Response) => {
    const code = req.params.code.toLowerCase();
    const link = SERVER_SHORTLINKS[code];

    if (!link) {
      // If code not in server memory, fallback to client route where LocalStorage can resolve or show 404
      return res.redirect(`/#/s/${code}`);
    }

    // Increment click count
    link.clicks += 1;

    // Check device routing based on user-agent
    const ua = req.headers['user-agent'] || '';
    const isMobile = /mobile|android|iphone|ipad/i.test(ua);
    let targetUrl = link.destination;

    if (link.deviceRouting) {
      const match = link.deviceRouting.find(d => (isMobile ? d.deviceType === 'mobile' : d.deviceType === 'desktop'));
      if (match) targetUrl = match.destinationUrl;
    }

    // Redirect to final destination
    return res.redirect(302, targetUrl);
  });

  // API to register a new short link on the server for instant redirecting
  app.post('/api/shortlinks/register', (req: Request, res: Response) => {
    const { shortCode, destinationUrl, geoRouting, deviceRouting } = req.body;
    if (!shortCode || !destinationUrl) {
      return res.status(400).json({ error: 'Missing shortCode or destinationUrl' });
    }

    SERVER_SHORTLINKS[shortCode.toLowerCase()] = {
      code: shortCode.toLowerCase(),
      destination: destinationUrl,
      clicks: 0,
      geoRouting,
      deviceRouting
    };

    return res.json({ success: true, code: shortCode });
  });

  // Serve Vite / SPA
  if (!IS_PROD) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Anchrr Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
