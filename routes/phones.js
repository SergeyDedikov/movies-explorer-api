// -- Тестовые маршруты для номеров телефонов
const router = require('express').Router();

const { createPhone, getPhones, deleteAllPhones } = require('../controllers/phones');

router.post('/phones', createPhone);
router.get('/phones', getPhones);
router.delete('/phones', deleteAllPhones);

module.exports = router;
