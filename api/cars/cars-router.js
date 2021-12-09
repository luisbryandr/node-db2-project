const router = require('express').Router();
const md = require('./cars-middleware');
const Cars = require('./cars-model');

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.json(cars)
    } catch(err){
        next(err)
    }
})

router.get('/:id', md.checkCarId, (req, res, next) => {
    res.json(req.car)
})

router.post('/', 
md.checkCarPayload,
 md.checkVinNumberUnique,
 md.checkVinNumberValid, 
 async (req, res, next) => {
    try{
        const car = await Cars.create(req.body)
        res.json(car)
    }catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
      })
})

module.exports = router;