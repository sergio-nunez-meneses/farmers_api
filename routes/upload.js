const db = require('../models/index');
const ash = require('express-async-handler');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('upload');
});

router.post('/', ash(async function(req, res) {
  let imageFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  imageFile = req.files.sampleFile;
  uploadPath = './uploads/' + imageFile.name;

  await imageFile.mv(uploadPath);

  const image = await db.FarmImage.create({
    name: imageFile.name,
  });
  const farm = await db.Farm.findOne({
    where: { id: 1 },
  });

  // await image.setFarm(farm);
  await farm.addFarmImage(image);

  res.redirect('/index');
}));

module.exports = router;
