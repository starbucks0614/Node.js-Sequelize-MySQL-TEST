const Sequelize = require('sequelize');
require('dotenv').config();
// Option 1: Passing parameters separately
const sequelize = new Sequelize('orm_test', process.env.DB_USER, process.env.DB_PASS, {
  host: '103.29.70.173',
  dialect: 'mysql',
  // Production
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

/*

//You can use the .authenticate() function to test if the connection is OK:
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

*/

const Model = Sequelize.Model;
class User extends Model {}
User.init({
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, 
{
    sequelize,
    modelName: 'user',
    // options,
    // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
    // This was true by default, but now is false by default
    timestamps: false
});


sequelize.sync({ force: false }) ;

// Create Data in User
sequelize.sync().then( () => {
    return User.create({
        firstName: "John",
        lastName: "Hancock",
    })
})





// Querying
// Find all users
User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
});

// Create a new user
User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
});

// Delete everyone named "Jane"
User.destroy({
    where: {
        firstName: "Jane"
    }
}).then(() => {
    console.log("Done");
});

// Change everyone without a last name to "Doe"
User.update({ lastName: "Doe" }, {
    where: {
        lastName: null
    }
}).then(() => {
    console.log("Done");
});