const config = {
  "development": {
    "api_url": "http://localhost:4000/api/",
  },
  "production": {
    "api_url": "http://localhost:4000/api/",
  },
  "test": {
    "api_url": "http://localhost:4000/api/",
  }
};


// Load environment dependent configuration
const mainConfig = config[process.env.REACT_APP_ENVIRONMENT];

module.exports = mainConfig;