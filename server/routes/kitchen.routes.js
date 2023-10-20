const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const kitchenController = require('../controllers/kitchen.controller');

router.post('/', kitchenController.createMeal);
router.post('/upload', upload.single('file'), kitchenController.uploadImage);
router.get('/get-meal-image', kitchenController.getMealImage);
router.get('/', kitchenController.getMeals);
router.patch('/meals/:id', kitchenController.updateMeal);
router.delete('/meals/:id', kitchenController.deleteMeal);

module.exports = router;
