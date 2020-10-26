const db = require('../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/', ash(async function(req, res, next) {
  const farmers = await db.Farmer.findAll({
    include: [
      {
        model: db.Farm,
        include: db.FarmImage
      }
    ]
  });

  if (!farmers) {
    res.send({ error: "Farmers don't exist" });
    return;
  }

  res.send({
    farmers: farmers,
    id: req.session.id
  });
}));

module.exports = router;
