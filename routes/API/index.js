const db = require('../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/', ash(async function(req, res, next) {
  const token = {};
  token[req.session.id] = new Date(Date.now());
  // await db.Session.create({ token: JSON.stringify(token) });

  res.send({ session_id: token })
}));

module.exports = router;
