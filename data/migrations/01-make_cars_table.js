exports.up = async function (knex) {
  await knex.schema.createTable('cars', table => {
    table.increments('car_id')

    table.text('vin')
      .unique()
      .notNullable()

    table.text('make')
      .notNullable()

    table.text('model')
      .notNullable()

    table.integer('mileage')
      .notNullable()

    table.string('title')

    table.string('transmission')
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
};
