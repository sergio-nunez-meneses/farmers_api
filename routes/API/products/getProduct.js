const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/:id', ash(async function(req, res, next) {
  const product = await db.FarmProduct.findOne({
    where: { id: req.params.id },
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

  if (product.length === 0) {
    res.send({ error: "Nous n'avons pas trouvé le produit recherché" });
    return;
  }

  res.send({
    product: product,
    id: req.session.id
  });
}));

module.exports = router;
