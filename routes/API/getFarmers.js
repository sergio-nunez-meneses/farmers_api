const db = require('../../models/index');
const cors = require('cors');
const ash = require('express-async-handler');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/', ash(async function(req, res, next) {
  const farmers = await db.Farmer.findAll({
    include: db.Farm
  });

  res.send({
    farmers: farmers,
    id: req.session.id
  });
}));

module.exports = router;
