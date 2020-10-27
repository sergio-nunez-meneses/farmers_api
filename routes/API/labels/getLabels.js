const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/', ash(async function(req, res, next) {
  const labels = await db.ProductLabel.findAll({
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

  if (labels.length === 0) {
    res.send({ error: "Nous n'avons pas trouvé des labels" });
    return;
  }

  res.send({
    labels: labels,
    id: req.session.id
  });
}));

module.exports = router;
