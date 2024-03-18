const Joi = require('joi');
const joiMiddleware = (schema, property) => {
  return async (req, res, next) => {
    const { error, value }  = await schema.validate(req[property]);

    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',')
      console.log("error", message);
     return res.status(422).json({ error: message })
    }
    req[property]=value;
    next();
  }
}
module.exports = joiMiddleware;