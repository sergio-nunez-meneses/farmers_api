const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

const Joi = require('joi');
const farmerSchema = Joi.object({
  farmerName: Joi.string()
    .min(2)
    .max(20)
    .required(),
  farmerEmail: Joi.string()
    .min(5)
    .email({ minDomainSegments: 2, tlds: { allow: ['fr', 'com', 'org', 'net', 'it'] } })
    .required(),
  farmerPhone: Joi.string()
    .min(8)
    .required(),
})
const farmSchema = Joi.object({
  farmName: Joi.string()
    .min(2)
    .max(20)
    .required(),
  farmAddress: Joi.string()
    .min(5)
    .required(),
  farmCity: Joi.string()
    .min(2)
    .required(),
  farmPostalCode: Joi.string()
    .min(5)
    .required()
})

router.use(cors());

router.post('/', ash(async function(req, res, next) {
  if (req.body !== '') {
    const farmerValidation = farmerSchema.validate({
      farmerName: req.body.farmerName,
      farmerEmail: req.body.farmerEmail,
      farmerPhone: req.body.farmerPhone
    });
    const farmValidation = farmSchema.validate({
      farmName: req.body.farmName,
      farmAddress: req.body.farmAddress,
      farmCity: req.body.farmCity,
      farmPostalCode: req.body.farmPostalCode
    });

    if (farmerValidation.error && farmValidation.error) {
      res.send({ input: req.body, error: [farmerValidation.error.details[0].message, farmValidation.error.details[0].message] });
      return;
    }

    const client = await db.Client.findAll({
      limit: 1,
      order: [[ 'createdAt', 'DESC' ]]
    });
    console.log('last inserted client', client);

    // if (!client) {
    //   res.send({ error: 'Vous devez vous enregistrer pour contribuer à notre appli!' });
    //   return;
    // }

    // const farmer = await db.FarmerContribution.findOne({ where: { email: req.body.farmerEmail }});
    // const farm = await db.FarmContribution.findOne({ where: { name: req.body.farmName }});

    // if (farmer && farm) {
    //   res.send({ warning: 'Les contributions que vous venez de nous adresser existent déjà sur nos registres!' });
    //   return;
    // }

    const newFarmer = await client.createFarmerContribution({
      name: req.body.farmerName,
      email: req.body.farmerEmail,
      phone: req.body.farmerPhone
    });

    const newFarm = await client.createFarmContribution({
      name: req.body.farmName,
      address: req.body.farmAddress,
      city: req.body.farmCity,
      postal_code: req.body.farmPostalCode
    });
    console.log('new contributions', newFarmer, newFarm);

    req.session = null
    res.send({ message: 'Nous avons bien reçu vos contributions!' });
  }
}));

module.exports = router;
