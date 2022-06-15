const axios = require("axios");

const auditionee = document.getElementById("auditionees");
const role = document.getElementById("movie-roles");
const tableNameRow = document.getElementById("actor-name");
const tableRoleRow = document.getElementById("actor-role");

const state = {};

//RENDER
const renderTable = () => {
  uncastedPeople();
  movieRoles();
  let names = state.people;
  names = names
    .map((person_with_role) => {
      if (person_with_role.roleId) {
        return `
        <tr>
         <td>${person_with_role.name}</td>
        </tr>
      `;
      }
    })
    .join("");
  tableNameRow.innerHTML = names;

  let roles = state.roles;
  console.log(roles);
  roles = roles
    .map((role_with_person) => {
      if (role_with_person.auditioneeId) {
        return `
        <tr>
          <td>${role_with_person.rolename}</td>
        </tr>
    `;
      }
    })
    .join("");
  tableRoleRow.innerHTML = roles;
};

const renderUncastedPeople = () => {
  const names = state.people
    .map((person) => {
      return `
      <label for="${person.id}">${person.name}</label>
      <input type="checkbox" id="auditionee" value="${person.id}">`;
    })
    .join("");
  auditionee.innerHTML = names;
};

const renderRoles = () => {
  const roles = state.roles
    .map((role) => {
      return `<option value="${role.id}">${role.rolename}</option>`;
    })
    .join("");
  role.innerHTML = roles;
};

const uncastedPeople = async () => {
  //GET Auditionees
  const response = await axios.get("/uncastedPeople");
  const people = response.data;
  state.people = people;
  //Render for Selection
  renderUncastedPeople();
  movieRoles();
  //Update State with Finalist
  let finalist = [];
  let checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", () => {
      finalist = Array.from(checkboxes)
        .filter((f) => f.checked)
        .map((v) => v.value);
      state.finalist = finalist;
    });
  });
};
uncastedPeople();

const movieRoles = async () => {
  const response = await axios.get("/movieroles");
  const roles = response.data;
  state.roles = roles;
  renderRoles();
  let finalistRole = document.querySelector("#movie-roles");
  finalistRole.addEventListener("change", (event) => {
    state.finalistRole = event.target.value;
  });
};

//Assign Role to Finalist.
let trigger = document.querySelector("#shot");
trigger.addEventListener("click", async () => {
  totalNumOfFinailist = state.finalist.length - 1;
  let randomNumber = Math.floor(Math.random() * totalNumOfFinailist);
  let assignedTalentId = state.finalist[randomNumber];
  try {
    //TODO: Fix bug in First role, roleId does not get sent.
    await axios.post("/assign_auditionee_role", {
      auditioneeId: assignedTalentId,
      roleId: state.finalistRole,
    });
    renderTable();
  } catch (e) {
    console.log(e);
  }
});
