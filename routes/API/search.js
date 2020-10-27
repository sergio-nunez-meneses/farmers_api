const db = require('../../models/index');
const { Op } = require('sequelize');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/', ash(async function(req, res, next) {
  let category = req.query.category;
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
          [Op.substring]: value
        }
      });
    }

    if (category === 'farmers') {
      const farmers = await db.Farmer.findAll({
        where: query,
        include: {
          model: db.Farm,
          include: [
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
        }
      });

      if (!farmers) {
        res.send({ error: "Farmers don't exist" });
        return;
      }

      res.send(farmers);
    } else if (category === 'farms') {
      const farms = await db.Farm.findAll({
        where: query,
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

      if (!farms) {
        res.send({ error: "Farms don't exist" });
        return;
      }

      res.send(farms);
    } else if (category === 'products') {
      const products = await db.FarmProduct.findAll({
        where: query,
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

      if (!products) {
        res.send({ error: "Products don't exist" });
        return;
      }

      res.send(products);
    } else if (category === 'labels') {
      const labels = await db.ProductLabel.findAll({
        where: query,
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

      if (!labels) {
        res.send({ error: "Labels don't exist" });
        return;
      }

      res.send(labels);
    }
  }
}));

module.exports = router;
