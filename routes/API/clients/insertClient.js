const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

const Joi = require('joi');
const schema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .required(),
  email: Joi.string()
    .min(5)
    .email({ minDomainSegments: 2, tlds: { allow: ['fr', 'com', 'org', 'net'] } })
    .required(),
  phone: Joi.string()
    .min(8)
    .required(),
})

router.use(cors());

router.post('/', ash(async function(req, res, next) {
  if (req.body !== '') {
    const formValidation = schema.validate(req.body);

    if (formValidation.error) {
      res.send({ input: req.body, error: formValidation.error.details[0].message });
      return;
    }

    const client = db.Client.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    });

    res.send({ message: 'Nous avons bien reçu vos contributions!' });
  }
}));

module.exports = router;
