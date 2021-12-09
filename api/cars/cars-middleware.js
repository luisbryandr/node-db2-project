const { getById, getByVin } = require("./cars-model")
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try{
    const carId  = req.params.id
    const car = await getById(carId)
    if(!car){
      next({
        status: 404,
        message: `car with id ${carId} is not found`
      })
      }
    else {
      next()
    }
  }catch(err){
    next(err)
  }
}

const checkCarPayload =  (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  const error = {status: 400};
  if(vin === undefined){
    error.message = `Vin is missing`
  }  
  else if(make === undefined){
    error.message = `Make is missing`
  }  
  else if(model === undefined){
    error.message = `Model is missing`
  }  
  else if(mileage === undefined){
    error.message = `Mileage is missing`
  }
  
  if(error.message){
    next(error)
  }
    else {
      next()
    }
}


const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin)
  if(isValidVin){
    next()
  }else{
    next({
      status:400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => { 
  try{
    const existingVin = await getByVin(req.body.vin)
    if(existingVin){
        next({
          status: 400,
          message: `vin ${req.body.vin} already exists`
        })
    }else {
        next()
    }
  } 
  catch(err){
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}