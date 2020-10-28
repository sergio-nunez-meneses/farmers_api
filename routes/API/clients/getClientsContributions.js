const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.get('/', ash(async function (req, res, next) {
  const clients = await db.Client.findAll({
    include: [
      {
        model: db.FarmerContribution,
      },
      {
        model: db.FarmContribution
      }
    ]
  });

  if (clients.length === 0) {
    res.send({ error: 'No clients found' });
    return;
  }

  res.send({clients: clients});
}));

module.exports = router;
