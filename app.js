// app.js
const express = require('express');
const client = require('prom-client'); // prom-client para métricas Prometheus
require('dotenv').config();
const cors = require('cors');

// rotas do seu projeto
const router = require('./routes/passageiroRoutes');
const routerauth = require('./routes/authUser');
const routerid = require('./routes/privateRoute');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// --- Prometheus setup ---
// Registra métricas padrão (CPU/mem/processos, etc)
client.collectDefaultMetrics();

// Cria um contador customizado
const requestCounter = new client.Counter({
  name: 'app_requests_total',
  help: 'Contador de requisições recebidas no endpoint / e /teste'
});

// Endpoint raíz simples (incrementa métrica)
app.get('/', (req, res) => {
  requestCounter.inc();
  res.status(200).json({ msg: 'bem vindo a api' });
});

// Endpoint de teste que também incrementa
app.get('/teste', (req, res) => {
  requestCounter.inc();
  res.send('Métrica incrementada!');
});

// --- Nova métrica Counter para cliques ---
const buttonClicks = new client.Counter({
  name: 'app_button_clicks_total',
  help: 'Número total de cliques em um botão simulado'
});

// Endpoint que simula um clique de botão
app.get('/click', (req, res) => {
  buttonClicks.inc(); // incrementa em 1 a cada acesso
  res.send('Clique registrado!');
});

// Registra a métrica no Prometheus
client.register.registerMetric(buttonClicks);

// Endpoint que o Prometheus irá raspar
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// --- suas rotas existentes ---
app.use(router);
app.use(routerauth);
app.use(routerid);

// Start do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
