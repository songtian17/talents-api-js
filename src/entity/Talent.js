const EntitySchema = require("typeorm").EntitySchema;
const Talent = require("../model/Talent");

module.exports = new EntitySchema({
  name: "Talent",
  target: Talent,
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true
    },
    name: {
      type: "text"
    },
    username: {
      type: "text"
    },
    profileImageUri: {
      type: "text"
    },
    createdAt: {
      type: "timestamp with time zone",
      createDate: true
    },
    updatedAt: {
      type: "timestamp with time zone",
      updateDate: true
    }
  },
  relations: {
    posts: {
      target: "Post",
      type: "one-to-many",
      joinTable: true,
      cascade: true
    }
  },
  uniques: [
    {
      name: 'UNIQUE_USERNAME',
      columns: ['username']
    }
  ]
});
