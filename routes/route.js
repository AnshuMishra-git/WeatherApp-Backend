
const middleware = require('../modules/service/middleware');
const { createCity, myCity } = require('../controllers/cityController')
const { userCreate, userLogout } = require('../controllers/userController')
const { jwt } = require('../modules/service/auth');
const cityValidation = require('../models/validatior/City');
const userValidation = require('../models/validatior/User')
module.exports = (app) => {
  // Users
  app.post('/user/create', middleware(userValidation.create), userCreate);
  app.post('/user/logout',jwt, middleware(userValidation.logout), userLogout)
  // City
  app.post('/city/create', jwt, middleware(cityValidation.create), createCity);
  app.post('/mycity', jwt, middleware(cityValidation.mynote), myCity)
};

