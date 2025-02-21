const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log('\n=== Incoming Request ===');
  // console.log(`Incoming request: ${req.method} ${req.url}`);
  // console.log(`Request payload: ${req.body}`);
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  next();
});

app.use(express.json());

/**
 * @swagger
 * /info:
 *   get:
 *     summary: Info endpoint
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 models:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Model'
 */
app.get('/info', (req, res) => {
  const models = [
    {
      name: "code-model",
      max_input_length: 8191,
      max_total_tokens: 8192,
      description: "Code completion model by TNG.",
      capabilities: {
        "chat": "none",
        "code": "partial",
        "fim": "full",
      },
    },
    {
      name: "chat-model",
      max_input_length: 131069,
      max_total_tokens: 131070,
      description: "A model with general chat capability.",
      capabilities: {
        "chat": "full",
        "code": "full",
        "fim": "none",
      }
    },
    {
      name: "chat-model-ten",
      max_input_length: 131069,
      max_total_tokens: 131070,
      description: "A model with general chat capability. Responds with 10 tokens per second.",
      capabilities: {
        "chat": "full",
        "code": "full",
        "fim": "none",
      }
    },
    {
      name: "chat-model-hundred",
      max_input_length: 131069,
      max_total_tokens: 131070,
      description: "A model with general chat capability. Responds with 100 tokens per second.",
      capabilities: {
        "chat": "full",
        "code": "full",
        "fim": "none",
      }
    },
    {
      name: "chat-model-thousand",
      max_input_length: 131069,
      max_total_tokens: 131070,
      description: "A model with general chat capability. Responds with 1000 tokens per second.",
      capabilities: {
        "chat": "full",
        "code": "full",
        "fim": "none",
      }
    }
  ];

  res.json({ models });
});

app.get('/v1/models', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://chat.model.tngtech.com/v1/models',
    headers: {
      'Authorization': req.header('Authorization')
    }
  };

  const axios = require('axios');

  axios(options)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


/**
 * @swagger
 * /v1/chat/completions:
 *   post:
 *     summary: Chat completions endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *                 description: The model to use (ten, hundred, thousand)
 *               streaming:
 *                 type: boolean
 *                 description: Whether to stream the response
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   description: The response from the chat completions endpoint
 *           text/event-stream:
 *             schema:
 *               type: string
 *               description: Streamed response from the chat completions endpoint
 */
app.post('/v1/chat/completions', (req, res) => {
  // Set correct axios configuration
  const options = {
    method: 'POST',
    url: 'https://chat.model.tngtech.com/v1/chat/completions',
    headers: {
      'Authorization': req.header('Authorization'),
      'Content-Type': 'application/json',
      'Accept': req.header('Accept') || '*/*',
      'Accept-Encoding': req.header('Accept-Encoding') || 'gzip'
    },
    data: JSON.stringify(req.body), // Use 'data' instead of 'body'
    responseType: 'stream' // Correct response type handling
  };

  axios(options)
    .then(backendResponse => {
      // Forward headers and status code
      res.writeHead(backendResponse.status, backendResponse.headers);
      backendResponse.data.pipe(res);
    })
    .catch(error => {
      console.error('Proxy error:', error);
      res.status(error.response?.status || 500)
         .json(error.response?.data || { error: 'Internal Server Error' });
    });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});