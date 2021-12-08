const db = require('../../data/db-config');

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('car_id', id).first()
}

const create = async (car) => {
  const [id] = await db('car').insert(car)
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
}