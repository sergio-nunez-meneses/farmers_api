const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/:id', ash(async function(req, res, next) {
  const farmer = await db.Farmer.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.Farm,
        include: db.FarmImage
      }
    ]
  });

  if (!farmer) {
    res.send({ error: "Farmer doesn't exist" });
    return;
  }

  res.send({
    farmer: farmer,
    id: req.session.id
  });
}));

module.exports = router;
