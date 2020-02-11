const EntitySchema = require("typeorm").EntitySchema;
const Post = require('../model/Post')

module.exports = new EntitySchema({
  name: "Post",
  target: Post,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    imageUri: {
      type: "text"
    },
    talentId: {
      type: "number"
    },
    createdAt: {
      type: "timestamp with time zone",
      createDate: true
    },
  },
  relations: {
    talent: {
      target: "Talent",
      type: "many-to-one",
      joinTable: true,
      cascade: true
    }
  },
});
