const express = require("express");
const getRepository = require("typeorm").getRepository;
const Talent = require("../model/Talent");

var router = express.Router();

// get all talents
router.get("/", async (req, res) => {
  const talentRepository = getRepository("Talent");

  const talents = await talentRepository.find();
  res.send(talents);
});

// get one talent by username
router.get("/username/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();
  const talentRepository = getRepository("Talent");

  try {
    const talent = await talentRepository.findOneOrFail({
      where: { username }
    });
    res.send(talent);
  } catch (err) {
    res.send(404).send("Talent not found");
  }
});

// get one talent
router.get("/:id([0-9]+)", async (req, res) => {
  const id = Number(req.params.id);
  const talentRepository = getRepository("Talent");

  try {
    const talent = await talentRepository.findOneOrFail(id);
    res.send(talent);
  } catch (err) {
    res.status(404).send("Talent not found");
  }
});

// create new talent
router.post("/", async (req, res) => {
  let { name, username, profileImageUri, bio } = req.body;
  let talent = new Talent();
  talent.name = name;
  talent.username = username.toLowerCase();
  talent.profileImageUri = profileImageUri;
  talent.bio = bio;

  const talentRepository = getRepository("Talent");
  try {
    await talentRepository.save(talent);
  } catch (err) {
    res.status(500).send(err);
  }

  res.status(201).send("Talent created");
});

// edit talent by id
router.put("/:id([0-9]+)", async (req, res) => {
  const id = Number(req.params.id);

  const { name, username, profileImageUri, bio } = req.body;

  const talentRepository = getRepository("Talent");
  let talent;
  try {
    talent = await talentRepository.findOneOrFail(id);
  } catch (err) {
    res.status(404).send("Talent not found");
    return;
  }

  talent.name = name;
  talent.username = username.toLowerCase();
  talent.profileImageUri = profileImageUri;
  talent.bio = bio;

  try {
    await talentRepository.save(talent);
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  res.status(200).send("Talent updated");
});

// delete one talent
router.delete("/:id([0-9]+)", async (req, res) => {
  const id = Number(req.params.id);

  const talentRepository = getRepository("Talent");
  let talent;

  try {
    talent = await talentRepository.findOneOrFail(id);
  } catch (err) {
    res.status(404).send("Talent not found");
    return;
  }
  talentRepository.delete(id);

  res.status(200).send("Talent deleted");
});

module.exports = router;
