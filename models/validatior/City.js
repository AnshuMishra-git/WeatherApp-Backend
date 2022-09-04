const joi = require('joi');


exports.create = joi.object({
  country: joi.string().required(),
  city: joi.string().required(),
  userId: joi.string().optional(),
});


exports.mynote=  joi.object({
  isShowAll: joi.number().required(),
  userId: joi.string().optional(),
  // userId: joi.string().required(),
});
