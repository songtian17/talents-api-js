const express = require("express");
const getRepository = require("typeorm").getRepository;
const Post = require("../model/Post");

var router = express.Router();

// get all posts
router.get("/", async (req, res) => {
  let posts;
  let user = req.query.user;
  const limit = req.query.limit ? req.query.limit : 25;
  const page = req.query.page ? req.query.page : 1;

  const postRepository = getRepository(Post);
  if (req.query.user) {
    posts = await postRepository.find({
      relations: ["talent"],
      where: { talentId: user },
      order: {
        id: "DESC"
      },
      take: limit,
      skip: limit * (page - 1)
    });
    res.send(posts);
    return;
  }

  posts = await postRepository.find({
    relations: ["talent"],
    order: {
      id: "DESC"
    },
    take: limit,
    skip: limit * (page - 1)
  });
  res.send(posts);
});

// get one post by id
router.get("/:id([0-9]+)", async (req, res) => {
  const id = Number(req.params.id);

  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOneOrFail(id);
    res.send(post);
  } catch (err) {
    res.status(404).send("Talent not found");
  }
});

// create new post
router.post("/", async (req, res) => {
  let { imageUri, talentId } = req.body;
  let post = new Post();
  post.imageUri = imageUri;
  post.talentId = talentId;

  const postRepository = getRepository(Post);
  try {
    await postRepository.save(post);
  } catch (err) {
    res.status(500).send(err);
  }

  res.status(201).send("Post created");
});

// delete one post
router.delete("/:id([0-9]+)", async (req, res) => {
  const id = Number(req.params.id);

  const postRepository = getRepository(Post);
  let post;

  try {
    post = await postRepository.findOneOrFail(id);
  } catch (err) {
    res.status(404).send("Post not found");
  }
  postRepository.delete(id);

  res.status(200).send("Post deleted");
});

module.exports = router;
