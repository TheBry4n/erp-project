import { Injectable, NestMiddleware } from '@nestjs/common';
import pako from 'pako'; // Importa la libreria pako

@Injectable()
export class DecompressionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    //console.log(req)
    if (req.headers['content-encoding'] === 'gzip' || req.headers['content-encoding'] === 'deflate') {
      console.log(req.body)
      const buffer = Buffer.from(JSON.parse(req.body), 'base64');
      try {
        req.body = pako.inflate(buffer, { to: 'string' });
      } catch (error) {
        // Gestisci eventuali errori di decompressione
        console.error('Errore durante la decompressione dei dati:', error);
      }
    }
    next(); // Passa alla prossima funzione middleware o al gestore della route
  }
}