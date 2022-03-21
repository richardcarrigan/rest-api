const express = require('express');
const swaggerUi = require('swagger-ui-express');
const userRouter = require('./routes/users');
const swaggerJsdoc = require('swagger-jsdoc');
const swagger = require('./config/swagger');
const swaggerSpec = swaggerJsdoc(swagger);
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
