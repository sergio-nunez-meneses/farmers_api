const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/', ash(async function(req, res, next) {
  const products = await db.FarmProduct.findAll({
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
    res.send({ error: "Nous n'avons pas trouvé des produits" });
    return;
  }

  res.send({
    products: products,
    id: req.session.id
  });
}));

module.exports = router;
