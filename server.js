const admin = require('firebase-admin');
const functions = require('firebase-functions');
const next = require('next');

// Inicialização do Firebase Admin SDK
admin.initializeApp();

// Verificação do ambiente de execução
const env = process.env.NODE_ENV !== 'production';

// Carregamento da configuração do Next.js
const config = require('./next.config');

// Configuração do aplicativo Next.js
const app = next({
  dev: env,
  conf: config,
});

// Manipulador de requisições Next.js
const handle = app.getRequestHandler();

// Função Cloud Function para manipular requisições HTTP
exports.nextjsServer = functions.https.onRequest((request, response) => {
  console.log(`File: ${request.originalUrl}`);

  return app.prepare()
    .then(() => handle(request, response))
    .catch((error) => {
      console.error('Error during request processing:', error);
      response.status(500).send('Internal server error');
    });
});
