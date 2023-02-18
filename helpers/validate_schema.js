const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    name:Joi.string().max(10).required(),
    description:Joi.string().max(50).required(),
    benefit:Joi.string().max(50).required()
})
module.exports ={
    authSchema
}