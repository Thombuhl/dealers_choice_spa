const models = require("./models");
const { faker } = require("@faker-js/faker");
const { connect, auditionee, role } = models;

//create potential cast.
const createPeople = () => {
  let people = [];
  for (let p = 0; p < 25; p++) {
    people.push({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: Math.floor(Math.random() * (60 - 18) + 18),
      height: Math.round((Math.random() * (6.5 - 5) + 5) * 10) / 10,
    });
  }
  return people;
};
const createRoles = () => {
  let roles = [];
  for (let r = 0; r < 28; r++) {
    roles.push({
      rolename: `${faker.name.jobTitle()}`,
      age: Math.floor(Math.random() * (60 - 18) + 18),
      gender: Math.floor(Math.random() * 2) === 1 ? "MALE" : "FEMALE",
    });
  }
  return roles;
};

// prettier-ignore
const syncAndSeed = async () => {
  try {
    await connect.sync({ force: true });

    let auditionees = createPeople();
    auditionees = await Promise.all(auditionees.map((person) => auditionee.create(person))
    );

    let roles = createRoles();
    roles = await Promise.all(roles.map((position) => role.create(position)));
    
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  syncAndSeed,
};
