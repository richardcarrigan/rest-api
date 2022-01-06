const express = require('express');
const swaggerUi = require('swagger-ui-express');
const userRouter = require('./routes/users');
const swaggerJsdoc = require('swagger-jsdoc');
const { description, version, name } = require('./package.json');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: name,
      description,
      version
    },
    servers: [{ url: `http://localhost:${PORT}/api` }]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(swaggerSpec);
});

app.use('/api/users', userRouter);

app.get('*', (req, res) => {
  res.send('Connected');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
