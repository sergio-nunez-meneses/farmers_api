const db = require('../../models/index');
const { Op } = require('sequelize');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/*', ash(async function(req, res, next) {
  // let category = req.query.category;
  let values = req.query.value;
  let query = {};

  if (values && values !== '') {
    query = {
      [Op.or]: []
    }

    values = values.split(' ');

    for (let value of values) {
      query[Op.or].push({
        name: {
          [Op.iLike]: '%' + value + '%'
        }
      });
    }

    req.query = query;
    next();
  }
}));

router.get('/farmers', ash(async function(req, res, next) {
  const farmers = await db.Farmer.findAll({
    where: req.query,
    include: {
      model: db.Farm,
      include: [
        {
          model: db.FarmImage
        },
        {
          model: db.FarmSchedule
        },
        {
          model: db.FarmProduct,
          include: db.ProductLabel
        }
      ]
    }
  });

  if (farmers.length === 0) {
    res.send({ error: "Farmers don't exist" });
    return;
  }

  res.send(farmers);
}));

router.get('/farms', ash(async function(req, res, next) {
  const farms = await db.Farm.findAll({
    where: req.query,
    include: [
      {
        model: db.Farmer
      },
      {
        model: db.FarmImage,
        model: db.FarmSchedule
      },
      {
        model: db.FarmProduct,
        include: {
          model: db.ProductLabel
        }
      }
    ]
  });

  if (farms.length === 0) {
    res.send({ error: "Farms don't exist" });
    return;
  }

  res.send(farms);
}));

router.get('/products', ash(async function(req, res, next) {
  const products = await db.FarmProduct.findAll({
    where: req.query,
    include: [
      {
        model: db.ProductLabel,
      },
      {
        model: db.Farm,
        include: [
          {
            model: db.FarmImage,
            model: db.FarmSchedule,
            model: db.Farmer
          },
        ]
      }
    ]
  });

  if (products.length === 0) {
    res.send({ error: "Products don't exist" });
    return;
  }

  res.send(products);
}));

router.get('/labels', ash(async function(req, res, next) {
  const labels = await db.ProductLabel.findAll({
    where: req.query,
    include: [
      {
        model: db.FarmProduct,
        include: [
          {
            model: db.Farm,
            include: [
              {
                model: db.FarmImage,
                model: db.FarmSchedule,
                model: db.Farmer
              },
            ]
          }
        ]
      }
    ]
  });

  if (labels.length === 0) {
    res.send({ error: "Labels don't exist" });
    return;
  }

  res.send(labels);
}));

module.exports = router;
