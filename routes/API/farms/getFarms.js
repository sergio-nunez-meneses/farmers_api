const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/', ash(async function(req, res, next) {
  const farms = await db.Farm.findAll({
    include: [
      {
        model: db.FarmImage
      },
      {
        model: db.Farmer
      }
    ]
  });

  if (!farms) {
    res.send({ error: "Farms don't exist" });
    return;
  }

  res.send({
    farms: farms,
    id: req.session.id
  });
}));

module.exports = router;
