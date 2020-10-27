const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/:id', ash(async function(req, res, next) {
  const farm = await db.Farm.findOne({
    where: { id: req.params.id },
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
        include: db.ProductLabel
      }
    ]
  });

  if (!farm) {
    res.send({ error: "Farm doesn't exist" });
    return;
  }

  res.send({
    farm: farm,
    id: req.session.id
  });
}));

module.exports = router;
