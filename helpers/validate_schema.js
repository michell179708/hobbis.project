const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    name:Joi.string().max(10).required(),
    description:Joi.string().max(150).required(),
    benefit:Joi.string().max(80).required()
})
module.exports ={
    authSchema
}