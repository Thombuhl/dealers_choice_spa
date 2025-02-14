const express = require("express");
const router = express.Router();
const path = require("path");
const models = require("../../db/models");

const { auditionee, role } = models;

router.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

router.get("/uncastedPeople", async (req, res, next) => {
  try {
    const uncastedPeople = await auditionee.findAll();
    res.send(uncastedPeople);
  } catch (err) {
    next(err);
  }
});

router.get("/movieroles", async (req, res, next) => {
  try {
    const movieRoles = await role.findAll();
    res.send(movieRoles);
  } catch (err) {
    next(err);
  }
});

router.post("/assign_auditionee_role", async (req, res, next) => {
  try {
    const { roleId, auditioneeId } = req.body;
    if (!roleId || !auditioneeId) {
      throw Error("Missing Required Params");
    }
    const roleIdExist = await auditionee.findOne({
      where: { roleId: roleId },
    });
    const actorIdExist = await role.findOne({
      where: { auditioneeId: auditioneeId },
    });
    if (roleIdExist && actorIdExist) {
      throw Error("Already assigned");
    } else {
      await auditionee.update(
        { roleId },
        {
          where: {
            id: auditioneeId,
          },
        }
      );
      await role.update(
        { auditioneeId },
        {
          where: {
            id: roleId,
          },
        }
      );
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
