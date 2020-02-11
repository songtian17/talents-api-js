class Talent {
  constructor(id, name, username, profileImageUri, createdAt, updatedAt, posts) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.profileImageUri = profileImageUri;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.posts = posts
  }
}

module.exports = Talent
