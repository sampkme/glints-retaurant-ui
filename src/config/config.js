const convict = require('convict');

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'REACT_APP_ENVIRONMENT'
  },
  api_url: {
    doc: 'API URL',
    format: String,
    default: 'http://localhost:4000/api/'
  },
});

// Load environment dependent configuration
var env = config.get('env');
config.loadFile(`./src/config/${env}.json`);

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;