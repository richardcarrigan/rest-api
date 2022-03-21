const { description, version, name } = require('../package.json');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: name,
      description,
      version
    }
  },
  apis: ['./routes/*.js']
};

module.exports = options;
