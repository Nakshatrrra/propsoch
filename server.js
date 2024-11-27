const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Splitwise MVP API',
        version: '1.0.0',
        description: 'API documentation for Splitwise MVP',
      },
      servers: [
        {
          url: 'http://localhost:3000/api', 
        },
      ],
    },
    apis: ['./routes/*.js', './controllers/*.js'],
  };

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/balances', balanceRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
