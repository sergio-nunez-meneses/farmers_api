const db = require('../../../models/index');
const ash = require('express-async-handler');
const cors = require('cors');
const express = require('express');
const router = express.Router();

router.use(cors());

router.get('/:id', ash(async function(req, res, next) {
  const label = await db.ProductLabel.findOne({
    where: { id: req.params.id },
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

  if (label.length === 0) {
    res.send({ error: "Nous n'avons pas trouvé le label recherché" });
    return;
  }

  res.send({
    label: label,
    id: req.session.id
  });
}));

module.exports = router;
