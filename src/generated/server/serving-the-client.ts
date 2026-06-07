import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve as resolvePath, sep } from 'node:path';

export const MIME_TYPES: Readonly<Record<string, string>> = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.cjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map':  'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml; charset=utf-8',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.webp': 'image/webp',
  '.txt':  'text/plain; charset=utf-8',
};

const FALLBACK_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bramble</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.js"></script>
  </body>
</html>`;

export interface ServeOptions {
  /** TCP port to listen on. Defaults to 3000. */
  port?: number;
  /**
   * Absolute (or relative-to-cwd) path to the built client assets directory.
   * Must contain an index.html; falls back to the built-in HTML template when absent.
   */
  clientDir?: string;
}

export interface BrambleServer {
  /** Actual port the server is bound to. */
  readonly port: number;
  /** Gracefully close the server, resolving once all connections have ended. */
  close(): Promise<void>;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function isInsideDir(base: string, candidate: string): boolean {
  const resolved = resolvePath(candidate);
  return resolved === base || resolved.startsWith(base + sep);
}

async function readFileIfExists(filePath: string): Promise<Buffer | null> {
  try {
    const info = await stat(filePath);
    if (!info.isFile()) return null;
    return await readFile(filePath);
  } catch {
    return null;
  }
}

function sendResponse(
  res: ServerResponse,
  status: number,
  contentType: string,
  body: Buffer,
  isHead: boolean,
): void {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': body.byteLength,
  });
  res.end(isHead ? undefined : body);
}

function sendSpaShell(
  res: ServerResponse,
  buf: Buffer | null,
  isHead: boolean,
): void {
  const body = buf ?? Buffer.from(FALLBACK_HTML, 'utf-8');
  sendResponse(res, 200, 'text/html; charset=utf-8', body, isHead);
}

async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
  clientDir: string,
): Promise<void> {
  const method = req.method ?? 'GET';

  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD', 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const isHead = method === 'HEAD';
  const url = new URL(req.url ?? '/', 'http://localhost');
  const pathname = url.pathname;
  const ext = extname(pathname).toLowerCase();

  // Root — always the SPA shell.
  if (pathname === '/') {
    const buf = await readFileIfExists(join(clientDir, 'index.html'));
    sendSpaShell(res, buf, isHead);
    return;
  }

  // Path carries a file extension — attempt static asset delivery.
  if (ext !== '') {
    const assetPath = resolvePath(clientDir, pathname.slice(1));

    if (!isInsideDir(clientDir, assetPath)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end(isHead ? undefined : 'Forbidden');
      return;
    }

    const buf = await readFileIfExists(assetPath);
    if (buf !== null) {
      const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
      sendResponse(res, 200, contentType, buf, isHead);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(isHead ? undefined : 'Not Found');
    }
    return;
  }

  // Extension-less path — SPA client-side route; serve the shell.
  const buf = await readFileIfExists(join(clientDir, 'index.html'));
  sendSpaShell(res, buf, isHead);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Bind an HTTP server that delivers the Bramble single-page client and its
 * static assets from `options.clientDir`.
 *
 * Routing rules:
 *  - `GET /`              → index.html (or built-in fallback template)
 *  - `GET /<file.ext>`    → static asset from clientDir; 404 if absent
 *  - `GET /<route>`       → index.html (SPA client-side routing fallback)
 *  - Any other method     → 405 Method Not Allowed
 */
export function startServer(options: ServeOptions = {}): Promise<BrambleServer> {
  const port = options.port ?? 3000;
  const clientDir = resolvePath(options.clientDir ?? join(process.cwd(), 'client'));

  return new Promise<BrambleServer>((resolvePromise, rejectPromise) => {
    const server = createServer((req, res) => {
      handleRequest(req, res, clientDir).catch((err: unknown) => {
        console.error('[bramble-server] Unhandled request error:', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      });
    });

    server.once('error', rejectPromise);

    server.listen(port, () => {
      resolvePromise({
        port,
        close(): Promise<void> {
          return new Promise<void>((res, rej) => {
            server.close((err) => (err ? rej(err) : res()));
          });
        },
      });
    });
  });
}

/** @internal Phoenix VCS traceability — do not remove. */
export const _phoenix = {
  iu_id: '097b97ee040ad76b8988b0db5e229734414cb8d61dfff56578768eee621ce851',
  name: 'Serving the client',
  risk_tier: 'low',
  canon_ids: [3 as const],
} as const;